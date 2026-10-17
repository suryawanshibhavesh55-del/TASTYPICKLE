import express, { Request, Response } from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { connectDB } from '../db';
import { OrderModel } from '../models/Order';
import { ProductModel } from '../models/Product';
import { CustomerModel } from '../models/Customer';
import { sendOrderNotificationEmail, sendCustomerOrderConfirmationEmail } from '../email';
import { products as fallbackProducts } from '../data/products';

export const paymentRouter = express.Router();

function cleanIndianMobile(raw: string): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const digits = raw.replace(/\D/g, '');
  if (/^[6-9]\d{9}$/.test(digits)) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    return `+91${digits.slice(2)}`;
  }
  if (digits.length === 11 && digits.startsWith('0') && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`;
  }
  return null;
}

/**
 * Initialize Razorpay client using environment variables
 */
function getRazorpayInstance(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are missing in environment variables.');
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

/**
 * Helper to determine canonical price from database or catalog
 */
async function resolveProductPrice(productId: string, slug?: string, size?: string): Promise<{ price: number; name: string; image?: string; slug?: string }> {
  // 1. Try finding in MongoDB
  let product: any = null;
  try {
    product = await ProductModel.findOne({
      $or: [{ id: productId }, { slug: slug || productId }],
    }).lean();
  } catch (err) {
    // MongoDB lookup failure fallback
  }

  // 2. Fallback to bundled products list if not in DB
  if (!product) {
    product = fallbackProducts.find(
      (p) => p.id === productId || (slug && p.slug === slug)
    );
  }

  if (!product) {
    throw new Error(`Product not found in catalog: ${productId}`);
  }

  let finalPrice = Number(product.price);

  // Check if size variant has custom price
  if (size && Array.isArray(product.weightOptions) && product.weightOptions.length > 0) {
    const variant = product.weightOptions.find((w: any) => w.size === size);
    if (variant && typeof variant.price === 'number') {
      finalPrice = Number(variant.price);
    }
  }

  return {
    price: finalPrice,
    name: product.name,
    image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : undefined,
    slug: product.slug,
  };
}

/**
 * GET /api/payment/config
 * Returns public Razorpay key ID for frontend checkout modal
 */
paymentRouter.get('/config', (_req: Request, res: Response) => {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  if (!keyId) {
    return res.status(500).json({ success: false, message: 'Razorpay Key ID not configured' });
  }
  return res.json({ success: true, keyId });
});

/**
 * POST /api/payment/create-order
 * Validates cart, verifies trusted server-side prices, creates Razorpay Order in integer paise
 */
paymentRouter.post('/create-order', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { customer, items, notes } = req.body;

    if (!customer?.fullName || !customer?.phone || !customer?.address) {
      return res.status(400).json({
        success: false,
        message: 'Customer full name, mobile number, and delivery address are required.',
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order items cannot be empty.',
      });
    }

    // SERVER-SIDE CANONICAL PRICE RESOLUTION (Prevents price manipulation)
    const verifiedItems = [];
    let calculatedSubtotal = 0;

    for (const item of items) {
      const pid = item.productId || item.id;
      const size = item.size || item.selectedSize || '250g';
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);

      const resolved = await resolveProductPrice(pid, item.slug, size);
      const itemSubtotal = resolved.price * quantity;
      calculatedSubtotal += itemSubtotal;

      verifiedItems.push({
        productId: pid,
        slug: resolved.slug || item.slug,
        name: resolved.name,
        size,
        price: resolved.price,
        quantity,
        image: resolved.image || item.image,
      });
    }

    const deliveryCharge = 80; // Flat ₹80 standard delivery
    const grandTotal = calculatedSubtotal + deliveryCharge;
    const amountInPaise = Math.round(grandTotal * 100);

    // Generate internal TastyPickle Order ID
    const internalOrderId = `TP-${Math.floor(10000 + Math.random() * 90000)}`;

    // Create Razorpay Order
    const razorpay = getRazorpayInstance();
    const rzpOrderOptions = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: internalOrderId,
      notes: {
        orderId: internalOrderId,
        customerName: customer.fullName.trim(),
        customerPhone: customer.phone.trim(),
        notes: (notes || customer.notes || '').slice(0, 100),
      },
    };

    const rzpOrder = await razorpay.orders.create(rzpOrderOptions);

    if (!rzpOrder || !rzpOrder.id) {
      throw new Error('Razorpay order creation returned an empty response.');
    }

    // Pre-create or persist MongoDB Order in 'Pending' payment status
    const newOrder = new OrderModel({
      orderId: internalOrderId,
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
        notes: customer.notes?.trim() || notes?.trim() || undefined,
      },
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      grandTotal,
      currency: 'INR',
      paymentProvider: 'Razorpay',
      paymentMethod: 'Online Payment',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      razorpayOrderId: rzpOrder.id,
      ownerNotificationSent: false,
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date(),
          note: `Checkout initiated. Razorpay Order ${rzpOrder.id} created.`,
        },
      ],
    });

    await newOrder.save();

    // Synchronize customer activity
    const cleanPhone = cleanIndianMobile(customer.phone);
    if (cleanPhone) {
      await CustomerModel.findOneAndUpdate(
        { phoneNumber: cleanPhone },
        {
          $set: {
            lastOrderId: internalOrderId,
            lastActivityAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    return res.status(201).json({
      success: true,
      orderId: rzpOrder.id, // Razorpay Order ID (order_xxx)
      internalOrderId, // TP-xxxxx
      amount: rzpOrder.amount, // in paise
      currency: rzpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      grandTotal,
    });
  } catch (err: any) {
    console.error('[Razorpay Create Order Error]:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Failed to initiate secure Razorpay checkout.',
    });
  }
});

/**
 * POST /api/payment/verify
 * Validates HMAC SHA-256 signature, marks order 'Paid', updates customer, and sends Resend notification email
 */
paymentRouter.post('/verify', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing Razorpay signature verification parameters.',
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error('[Payment Verification] RAZORPAY_KEY_SECRET is not configured.');
      return res.status(500).json({
        success: false,
        message: 'Payment verification secret is unconfigured on server.',
      });
    }

    // Cryptographic HMAC SHA-256 verification
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isSignatureValid =
      generatedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(generatedSignature, 'utf-8'),
        Buffer.from(razorpay_signature, 'utf-8')
      );

    // Locate order by Razorpay Order ID or internal orderId
    const order = await OrderModel.findOne({
      $or: [
        { razorpayOrderId: razorpay_order_id },
        ...(orderId ? [{ orderId }] : []),
      ],
    });

    if (!isSignatureValid) {
      console.error(`[Razorpay Signature Mismatch] Order: ${orderId || razorpay_order_id}`);
      if (order) {
        order.paymentStatus = 'Failed';
        order.paymentVerificationError = 'Signature mismatch';
        order.statusHistory.push({
          status: 'Cancelled',
          timestamp: new Date(),
          note: `Payment signature verification failed. Generated: ${generatedSignature.slice(0, 10)}... Received: ${razorpay_signature.slice(0, 10)}...`,
        });
        await order.save();
      }
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Signature mismatch.',
      });
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order for Razorpay reference ${razorpay_order_id} not found.`,
      });
    }

    // IDEMPOTENCY: Check if already verified and marked Paid
    if (order.paymentStatus === 'Paid') {
      console.log(`[Payment Verify] Order #${order.orderId} is already marked as Paid. Returning success.`);
      return res.json({
        success: true,
        message: 'Payment already verified.',
        orderId: order.orderId,
      });
    }

    // Update order status to Paid & Confirmed
    order.paymentStatus = 'Paid';
    order.orderStatus = 'Confirmed';
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.razorpaySignatureVerified = true;
    order.paidAt = new Date();
    order.statusHistory.push({
      status: 'Confirmed',
      timestamp: new Date(),
      note: `Online payment of ₹${order.grandTotal} captured via Razorpay (Payment ID: ${razorpay_payment_id}).`,
    });

    await order.save();

    // Update customer status to Ordered & clear their saved cart
    const cleanPhone = cleanIndianMobile(order.customer.phone);
    if (cleanPhone) {
      await CustomerModel.findOneAndUpdate(
        { phoneNumber: cleanPhone },
        {
          $set: {
            status: 'Ordered',
            lastOrderId: order.orderId,
            lastActivityAt: new Date(),
            cartItems: [],
          },
          $inc: {
            totalOrders: 1,
            totalSpent: order.grandTotal,
          },
        },
        { upsert: true }
      );
    }

    // TRIGGER RESEND EMAIL: Only after verified payment and if not already sent
    if (!order.ownerNotificationSent) {
      sendOrderNotificationEmail(order.orderId).catch((emailErr) => {
        console.error(`[Resend Error on Payment Verification for #${order.orderId}]:`, emailErr);
      });
    }

    // TRIGGER CUSTOMER CONFIRMATION EMAIL: If customer provided email and not already sent
    if (order.customer?.email && !order.customerNotificationSent) {
      sendCustomerOrderConfirmationEmail(order.orderId).catch((cErr) => {
        console.error(`[Customer Email Error on Payment Verification for #${order.orderId}]:`, cErr);
      });
    }

    return res.json({
      success: true,
      message: 'Payment successfully verified and order confirmed!',
      orderId: order.orderId,
      paymentId: razorpay_payment_id,
    });
  } catch (err: any) {
    console.error('[Razorpay Verify Error]:', err);
    return res.status(500).json({
      success: false,
      message: err?.message || 'Internal error verifying payment signature.',
    });
  }
});

/**
 * POST /api/payment/webhook
 * Handles asynchronous Razorpay webhooks (e.g. payment.captured, order.paid, payment.failed)
 */
paymentRouter.post('/webhook', async (req: Request, res: Response) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // If webhook secret is configured, perform HMAC SHA-256 verification on raw buffer
    if (webhookSecret) {
      const signature = req.headers['x-razorpay-signature'] as string;
      const rawBody = (req as any).rawBody;

      if (!signature || !rawBody) {
        console.error('[Razorpay Webhook] Missing signature header or raw request body');
        return res.status(400).json({ success: false, message: 'Missing signature or body' });
      }

      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody)
        .digest('hex');

      const isSignatureValid =
        expectedSignature.length === signature.length &&
        crypto.timingSafeEqual(
          Buffer.from(expectedSignature, 'utf-8'),
          Buffer.from(signature, 'utf-8')
        );

      if (!isSignatureValid) {
        console.error('[Razorpay Webhook] Invalid webhook signature received');
        return res.status(400).json({ success: false, message: 'Invalid webhook signature' });
      }
    }

    await connectDB();
    const event = req.body;
    const eventType = event?.event;

    console.log(`[Razorpay Webhook] Received event: ${eventType}`);

    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const payment = event.payload?.payment?.entity;
      const rzpOrderId = payment?.order_id || event.payload?.order?.entity?.id;
      const rzpPaymentId = payment?.id;

      if (rzpOrderId) {
        const order = await OrderModel.findOne({ razorpayOrderId: rzpOrderId });
        if (order && order.paymentStatus !== 'Paid') {
          order.paymentStatus = 'Paid';
          if (order.orderStatus === 'Pending') {
            order.orderStatus = 'Confirmed';
          }
          if (rzpPaymentId) {
            order.razorpayPaymentId = rzpPaymentId;
          }
          order.paidAt = new Date();
          order.statusHistory.push({
            status: 'Confirmed',
            timestamp: new Date(),
            note: `Payment confirmed via Razorpay Webhook (${eventType}).`,
          });
          await order.save();

          // Idempotent Resend notification dispatch
          if (!order.ownerNotificationSent) {
            sendOrderNotificationEmail(order.orderId).catch((err) => {
              console.error(`[Webhook Email Error for #${order.orderId}]:`, err);
            });
          }

          if (order.customer?.email && !order.customerNotificationSent) {
            sendCustomerOrderConfirmationEmail(order.orderId).catch((err) => {
              console.error(`[Webhook Customer Email Error for #${order.orderId}]:`, err);
            });
          }
        }
      }
    } else if (eventType === 'payment.failed') {
      const payment = event.payload?.payment?.entity;
      const rzpOrderId = payment?.order_id;
      if (rzpOrderId) {
        const order = await OrderModel.findOne({ razorpayOrderId: rzpOrderId });
        if (order && order.paymentStatus === 'Pending') {
          order.paymentStatus = 'Failed';
          order.paymentVerificationError = payment?.error_description || 'Payment failed';
          await order.save();
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('[Razorpay Webhook Error]:', err);
    return res.status(500).json({ received: false, error: err?.message });
  }
});
