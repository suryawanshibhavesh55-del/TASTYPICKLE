import { Router, Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { OrderModel } from '../models/Order';
import { CustomerModel } from '../models/Customer';
import { sendOrderNotificationEmail } from '../email';

export const publicRouter = Router();

export function cleanIndianMobile(raw: string): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const digits = raw.replace(/\D/g, '');
  // Standard 10-digit Indian mobile starting with 6, 7, 8, or 9
  if (/^[6-9]\d{9}$/.test(digits)) {
    return `+91${digits}`;
  }
  // With 91 country code prefix (12 digits)
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    return `+91${digits.slice(2)}`;
  }
  // With 0 prefix (11 digits)
  if (digits.length === 11 && digits.startsWith('0') && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`;
  }
  return null;
}

// ==================== PRODUCTS ====================

publicRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const filter: any = { isActive: true };

    if (category && (category === 'veg' || category === 'non-veg' || category === 'combo')) {
      filter.category = category;
    }

    const products = await ProductModel.find(filter).sort({ createdAt: 1 });
    return res.json({ success: true, data: products });
  } catch (err: any) {
    console.error('[Public Get Products Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

publicRouter.get('/products/:slug', async (req: Request, res: Response) => {
  try {
    const slug = String(req.params.slug);
    const product = await ProductModel.findOne({
      slug,
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.json({ success: true, data: product });
  } catch (err: any) {
    console.error('[Public Get Single Product Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
});

// ==================== CUSTOMER CONTACT CAPTURE ====================

const handleCustomerSave = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, marketingConsent, initialCartItem } = req.body;
    const cleanPhone = cleanIndianMobile(phoneNumber);

    if (!cleanPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)',
      });
    }

    let customer = await CustomerModel.findOne({ phoneNumber: cleanPhone });

    if (!customer) {
      customer = new CustomerModel({
        phoneNumber: cleanPhone,
        firstVisitAt: new Date(),
        lastActivityAt: new Date(),
        status: 'Cart Added',
        marketingConsent: Boolean(marketingConsent),
        cartItems: initialCartItem ? [initialCartItem] : [],
      });
      await customer.save();
    } else {
      customer.lastActivityAt = new Date();
      if (marketingConsent !== undefined) {
        customer.marketingConsent = Boolean(marketingConsent);
      }
      if (customer.status === 'Visitor') {
        customer.status = 'Cart Added';
      }
      if (initialCartItem) {
        const existingIdx = customer.cartItems.findIndex(
          (item: any) =>
            item.productId === initialCartItem.productId &&
            item.size === initialCartItem.size
        );
        if (existingIdx > -1) {
          customer.cartItems[existingIdx].quantity += initialCartItem.quantity || 1;
        } else {
          customer.cartItems.push(initialCartItem);
        }
      }
      await customer.save();
    }

    return res.json({
      success: true,
      message: 'Mobile number captured successfully',
      customerId: customer._id,
      data: {
        customerId: customer._id,
        phoneNumber: customer.phoneNumber,
        status: customer.status,
      },
    });
  } catch (err: any) {
    console.error('[Public Customer Capture Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to save your number. Please try again.',
    });
  }
};

publicRouter.post('/customers', handleCustomerSave);
publicRouter.post('/customer/capture', handleCustomerSave);

publicRouter.post('/customer/sync-cart', async (req: Request, res: Response) => {
  try {
    const { phoneNumber, cartItems } = req.body;
    const cleanPhone = cleanIndianMobile(phoneNumber);

    if (!cleanPhone) {
      return res.status(400).json({ success: false, message: 'Valid mobile number required' });
    }

    const formattedItems = Array.isArray(cartItems)
      ? cartItems.map((item: any) => ({
          productId: item.product?.id || item.productId,
          slug: item.product?.slug || item.slug,
          name: item.product?.name || item.name,
          size: item.selectedSize || item.size || '250g',
          price: Number(item.product?.price || item.price || 95),
          quantity: Number(item.quantity || 1),
          image: item.product?.images?.[0] || item.image,
        }))
      : [];

    const customer = await CustomerModel.findOne({ phoneNumber: cleanPhone });
    if (customer) {
      customer.cartItems = formattedItems;
      customer.lastActivityAt = new Date();
      if (customer.status === 'Visitor' && formattedItems.length > 0) {
        customer.status = 'Cart Added';
      }
      await customer.save();
    }

    return res.json({ success: true, message: 'Cart synchronized' });
  } catch (err: any) {
    console.error('[Public Sync Cart Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to sync cart' });
  }
});

publicRouter.post('/customer/activity', async (req: Request, res: Response) => {
  try {
    const { phoneNumber, action } = req.body;
    const cleanPhone = cleanIndianMobile(phoneNumber);

    if (cleanPhone) {
      await CustomerModel.updateOne(
        { phoneNumber: cleanPhone },
        { $set: { lastActivityAt: new Date() } }
      );
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ success: false });
  }
});

// ==================== ORDER CREATION ====================

publicRouter.post('/orders', async (req: Request, res: Response) => {
  try {
    const {
      orderId,
      customer,
      items,
      subtotal,
      deliveryCharge,
      grandTotal,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
      discount,
    } = req.body;

    if (!customer?.fullName || !customer?.phone || !customer?.address || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, phone, address and order items are required',
      });
    }

    // Generate or format unique order ID
    const finalOrderId = orderId || `TP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = new OrderModel({
      orderId: finalOrderId,
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        altPhone: customer.altPhone?.trim() || undefined,
        email: customer.email?.trim() || undefined,
        address: customer.address.trim(),
        landmark: customer.landmark?.trim() || undefined,
        city: customer.city.trim(),
        state: customer.state || 'Andhra Pradesh',
        pincode: customer.pincode.trim(),
        notes: customer.notes?.trim() || undefined,
      },
      items: items.map((item: any) => ({
        productId: item.productId || item.id,
        slug: item.slug,
        name: item.name,
        size: item.size || '250g',
        price: Number(item.price || 95),
        quantity: Number(item.quantity || 1),
        image: item.image,
      })),
      subtotal: Number(subtotal),
      deliveryCharge: deliveryCharge !== undefined ? Number(deliveryCharge) : 80,
      grandTotal: Number(grandTotal || Number(subtotal) + 80),
      discount: discount !== undefined ? Number(discount) : 0,
      paymentMethod: paymentMethod || 'Online Payment',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      razorpayOrderId: razorpayOrderId || undefined,
      razorpayPaymentId: razorpayPaymentId || undefined,
      ownerNotificationSent: false,
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date(),
          note: 'Order placed by customer',
        },
      ],
    });

    // 1. Save order to MongoDB first
    await newOrder.save();

    // 2. Update or create Customer record with 'Ordered' status
    const cleanPhone = cleanIndianMobile(customer.phone);
    if (cleanPhone) {
      await CustomerModel.findOneAndUpdate(
        { phoneNumber: cleanPhone },
        {
          $set: {
            status: 'Ordered',
            lastOrderId: finalOrderId,
            lastActivityAt: new Date(),
            cartItems: [], // Cart converted into placed order
          },
          $inc: {
            totalOrders: 1,
            totalSpent: Number(grandTotal || Number(subtotal) + 80),
          },
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }

    // 3. Send email notification to owner via Resend ONLY after payment is confirmed as Paid
    if (newOrder.paymentStatus === 'Paid' && !newOrder.ownerNotificationSent) {
      sendOrderNotificationEmail(finalOrderId).catch((emailErr) => {
        console.error(`[Order Email] Background dispatch error for Order #${finalOrderId}:`, emailErr);
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (err: any) {
    console.error('[Public Create Order Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

// ==================== ORDER TRACKING ====================

publicRouter.get('/orders/:orderId/track', async (req: Request, res: Response) => {
  try {
    const rawOrderId = String(req.params.orderId).trim();
    // Allow searching with or without "TP-" prefix, case-insensitive
    const regex = new RegExp(`^${rawOrderId.replace(/^#/, '')}$`, 'i');

    const order = await OrderModel.findOne({
      $or: [{ orderId: regex }, { orderId: `TP-${rawOrderId.replace(/^(TP-|#)/i, '')}` }],
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${rawOrderId} not found. Please verify your Order ID.`,
      });
    }

    // Return tracking information
    return res.json({
      success: true,
      data: {
        orderId: order.orderId,
        customerName: order.customer.fullName,
        city: order.customer.city,
        state: order.customer.state,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        grandTotal: order.grandTotal,
        itemsCount: order.items.length,
        items: order.items,
        tracking: order.tracking,
        statusHistory: order.statusHistory,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });
  } catch (err: any) {
    console.error('[Public Track Order Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch order tracking info' });
  }
});
