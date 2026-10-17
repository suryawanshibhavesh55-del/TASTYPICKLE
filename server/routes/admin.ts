import { Router, Request, Response } from 'express';
import {
  validateAdminCredentials,
  generateAdminToken,
  requireAdmin,
  AuthenticatedRequest,
} from '../auth';
import { ProductModel } from '../models/Product';
import { OrderModel, OrderStatus } from '../models/Order';
import { CustomerModel } from '../models/Customer';
import { upload, uploadBufferToCloudinary } from '../cloudinary';
import { sendTestEmail, sendOrderNotificationEmail, DEFAULT_OWNER_EMAIL } from '../email';

export const adminRouter = Router();

// ==================== AUTHENTICATION ====================

adminRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { adminId, password } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Admin ID and password are required',
      });
    }

    if (!validateAdminCredentials(adminId, password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin ID or Password',
      });
    }

    const token = generateAdminToken(adminId);

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        adminId,
        role: 'admin',
      },
    });
  } catch (err: any) {
    console.error('[Admin Login Error]:', err);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

adminRouter.get('/me', requireAdmin, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
});

adminRouter.post('/logout', (_req: Request, res: Response) => {
  return res.json({ success: true, message: 'Logged out successfully' });
});

// ==================== DASHBOARD ====================

adminRouter.get('/dashboard', requireAdmin, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const [totalProducts, orders] = await Promise.all([
      ProductModel.countDocuments(),
      OrderModel.find().sort({ createdAt: -1 }),
    ]);

    const totalOrders = orders.length;

    const statusCounts: Record<string, number> = {
      Pending: 0,
      Confirmed: 0,
      Processing: 0,
      Shipped: 0,
      'Out for Delivery': 0,
      Delivered: 0,
      Cancelled: 0,
    };

    let totalRevenue = 0;
    const uniquePhones = new Set<string>();

    orders.forEach((order) => {
      const status = order.orderStatus || 'Pending';
      statusCounts[status] = (statusCounts[status] || 0) + 1;

      if (status !== 'Cancelled') {
        totalRevenue += order.grandTotal || 0;
      }

      if (order.customer?.phone) {
        uniquePhones.add(order.customer.phone.replace(/\D/g, ''));
      }
    });

    const recentOrders = orders.slice(0, 8);

    return res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        statusCounts,
        totalCustomers: uniquePhones.size,
        totalRevenue,
        recentOrders,
      },
    });
  } catch (err: any) {
    console.error('[Admin Dashboard Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch dashboard metrics' });
  }
});

// ==================== IMAGE UPLOAD ====================

adminRouter.post(
  '/upload',
  requireAdmin,
  upload.single('image'),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file uploaded' });
      }

      const result = await uploadBufferToCloudinary(req.file.buffer);

      return res.json({
        success: true,
        message: 'Image uploaded successfully',
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (err: any) {
      console.error('[Admin Upload Error]:', err);
      return res.status(500).json({
        success: false,
        message: err.message || 'Failed to upload image to Cloudinary',
      });
    }
  }
);

// ==================== PRODUCT MANAGEMENT ====================

adminRouter.get('/products', requireAdmin, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: products });
  } catch (err: any) {
    console.error('[Admin Get Products Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

adminRouter.post('/products', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const body = req.body;

    if (!body.name || !body.price || !body.category) {
      return res.status(400).json({
        success: false,
        message: 'Product name, price, and category are required',
      });
    }

    // Generate clean slug and ID if not provided
    const baseSlug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const uniqueSuffix = Date.now().toString().slice(-4);
    const slug = body.slug || `${baseSlug}-${uniqueSuffix}`;
    const id = body.id || `tp-prod-${Date.now().toString(36)}`;

    const newProduct = new ProductModel({
      ...body,
      id,
      slug,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      stock: body.stock !== undefined ? Number(body.stock) : 50,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      pricePlaceholder: `₹${body.price}`,
      weightOptions: body.weightOptions || [
        { size: '250g', price: Number(body.price), pricePlaceholder: `₹${body.price}`, isPopular: true },
      ],
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (err: any) {
    console.error('[Admin Create Product Error]:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to create product',
    });
  }
});

adminRouter.put('/products/:id', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const body = req.body;

    if (body.price) {
      body.price = Number(body.price);
      body.pricePlaceholder = `₹${body.price}`;
    }
    if (body.originalPrice) {
      body.originalPrice = Number(body.originalPrice);
    }
    if (body.stock !== undefined) {
      body.stock = Number(body.stock);
    }

    const updated = await ProductModel.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }] },
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({
      success: true,
      message: 'Product updated successfully',
      data: updated,
    });
  } catch (err: any) {
    console.error('[Admin Update Product Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

adminRouter.delete('/products/:id', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const permanent = req.query.permanent === 'true';

    if (permanent) {
      const deleted = await ProductModel.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
      });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      return res.json({ success: true, message: 'Product permanently deleted' });
    } else {
      // Soft-delete: toggle or set isActive to false
      const product = await ProductModel.findOne({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
      });
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      product.isActive = !product.isActive; // Toggle active status
      await product.save();

      return res.json({
        success: true,
        message: `Product ${product.isActive ? 'activated' : 'deactivated/archived'} successfully`,
        data: product,
      });
    }
  } catch (err: any) {
    console.error('[Admin Delete Product Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

// ==================== ORDER MANAGEMENT ====================

adminRouter.get('/orders', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, search } = req.query;

    const filter: any = {};

    if (status && status !== 'All') {
      filter.orderStatus = status;
    }

    if (search && typeof search === 'string' && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { orderId: regex },
        { 'customer.fullName': regex },
        { 'customer.phone': regex },
        { 'customer.email': regex },
        { 'tracking.trackingId': regex },
      ];
    }

    const orders = await OrderModel.find(filter).sort({ createdAt: -1 });

    return res.json({ success: true, data: orders });
  } catch (err: any) {
    console.error('[Admin Get Orders Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

adminRouter.get('/orders/:id', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const order = await OrderModel.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.json({ success: true, data: order });
  } catch (err: any) {
    console.error('[Admin Get Single Order Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch order details' });
  }
});

adminRouter.put('/orders/:id/status', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { status, note } = req.body;

    const validStatuses: OrderStatus[] = [
      'Pending',
      'Confirmed',
      'Processing',
      'Shipped',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid order status' });
    }

    const order = await OrderModel.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.orderStatus = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || undefined,
    });

    await order.save();

    return res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order,
    });
  } catch (err: any) {
    console.error('[Admin Update Order Status Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
});

adminRouter.put('/orders/:id/tracking', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { courierName, trackingId, trackingUrl } = req.body;

    const order = await OrderModel.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : undefined }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.tracking = {
      courierName: (courierName || '').trim(),
      trackingId: (trackingId || '').trim(),
      trackingUrl: (trackingUrl || '').trim(),
      updatedAt: new Date(),
    };

    // If order was pending/confirmed, moving tracking usually implies it's shipped or in transit
    if (order.orderStatus === 'Pending' || order.orderStatus === 'Confirmed') {
      order.orderStatus = 'Shipped';
      order.statusHistory.push({
        status: 'Shipped',
        timestamp: new Date(),
        note: `Tracking added: ${courierName} (${trackingId})`,
      });
    }

    await order.save();

    return res.json({
      success: true,
      message: 'Tracking details updated successfully',
      data: order,
    });
  } catch (err: any) {
    console.error('[Admin Update Tracking Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to update tracking info' });
  }
});

// ==================== CUSTOMER MANAGEMENT ====================

adminRouter.get('/customers', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, search } = req.query;

    const query: any = {};

    if (search && typeof search === 'string') {
      const cleanDigits = search.replace(/\D/g, '');
      if (cleanDigits) {
        query.phoneNumber = { $regex: cleanDigits, $options: 'i' };
      }
    }

    if (status && typeof status === 'string' && status !== 'All' && status !== 'All Customers') {
      if (status === 'Cart Abandoned') {
        // Abandoned cart: items in cart and status not Ordered
        query['cartItems.0'] = { $exists: true };
        query.status = { $ne: 'Ordered' };
      } else {
        query.status = status;
      }
    }

    const customers = await CustomerModel.find(query).sort({ lastActivityAt: -1 }).lean();

    // Map customers and compute current cart total
    const enriched = customers.map((c: any) => {
      const cartTotal = (c.cartItems || []).reduce(
        (sum: number, item: any) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0
      );
      const isCartAbandoned = (c.cartItems && c.cartItems.length > 0 && c.status !== 'Ordered');

      return {
        ...c,
        cartTotal,
        isCartAbandoned,
        cartItemsCount: (c.cartItems || []).reduce((sum: number, it: any) => sum + (it.quantity || 1), 0),
      };
    });

    return res.json({ success: true, data: enriched });
  } catch (err: any) {
    console.error('[Admin Get Customers Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch customers' });
  }
});

adminRouter.get('/customers/:idOrPhone', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const idOrPhone = String(req.params.idOrPhone);
    let customer: any = null;

    // Check if valid MongoDB ObjectId
    if (/^[0-9a-fA-F]{24}$/.test(idOrPhone)) {
      customer = await CustomerModel.findById(idOrPhone).lean();
    }

    // Otherwise check by phone number (handles both +91 and 10-digit formats)
    if (!customer) {
      const cleanDigits = idOrPhone.replace(/\D/g, '');
      const last10 = cleanDigits.slice(-10);
      customer = await CustomerModel.findOne({
        $or: [
          { phoneNumber: idOrPhone },
          { phoneNumber: `+91${last10}` },
          { phoneNumber: last10 },
        ],
      }).lean();
    }

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const cleanPhoneDigits = (customer.phoneNumber || '').replace(/\D/g, '').slice(-10);

    // Fetch all orders for this customer phone
    const orders = await OrderModel.find({
      'customer.phone': { $regex: cleanPhoneDigits },
    })
      .sort({ createdAt: -1 })
      .lean();

    const cartTotal = (customer.cartItems || []).reduce(
      (sum: number, item: any) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );

    return res.json({
      success: true,
      data: {
        ...customer,
        cartTotal,
        orders,
      },
    });
  } catch (err: any) {
    console.error('[Admin Get Customer Details Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch customer details' });
  }
});

// ==================== EMAIL NOTIFICATIONS (ADMIN ONLY) ====================

// Test Resend integration directly to owner email
adminRouter.post('/email/test', requireAdmin, async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await sendTestEmail();
    return res.json(result);
  } catch (err: any) {
    console.error('[Admin Email Test Error]:', err);
    return res.status(500).json({
      success: false,
      recipient: process.env.OWNER_EMAIL || DEFAULT_OWNER_EMAIL,
      error: err?.message || 'Failed to dispatch test email',
    });
  }
});

// Manually trigger or resend order notification email for a specific order
adminRouter.post('/orders/:orderId/send-notification', requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orderId = String(req.params.orderId);
    const { force } = req.body;

    if (force) {
      await OrderModel.updateOne({ orderId }, { $set: { ownerNotificationSent: false } });
    }

    const result = await sendOrderNotificationEmail(orderId);
    return res.json(result);
  } catch (err: any) {
    console.error('[Admin Resend Order Email Error]:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Failed to send notification email',
    });
  }
});
