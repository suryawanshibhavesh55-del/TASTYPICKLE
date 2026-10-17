import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  productId: string;
  slug?: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ICustomer {
  fullName: string;
  phone: string;
  altPhone?: string;
  email?: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface ITracking {
  courierName?: string;
  trackingId?: string;
  trackingUrl?: string;
  updatedAt?: Date;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface IOrder extends Document {
  orderId: string;
  customer: ICustomer;
  items: IOrderItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  currency?: string;
  paymentProvider?: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  tracking: ITracking;
  statusHistory: {
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }[];
  ownerNotificationSent?: boolean;
  ownerNotificationSentAt?: Date;
  customerNotificationSent?: boolean;
  customerNotificationSentAt?: Date;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  razorpaySignatureVerified?: boolean;
  paidAt?: Date;
  paymentVerificationError?: string;
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    slug: { type: String },
    name: { type: String, required: true },
    size: { type: String, default: '250g' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
  },
  { _id: false }
);

const CustomerSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String },
    email: { type: String },
    address: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, default: 'Andhra Pradesh' },
    pincode: { type: String, required: true },
    notes: { type: String },
  },
  { _id: false }
);

const TrackingSchema = new Schema(
  {
    courierName: { type: String, default: '' },
    trackingId: { type: String, default: '' },
    trackingUrl: { type: String, default: '' },
    updatedAt: { type: Date },
  },
  { _id: false }
);

const StatusHistorySchema = new Schema(
  {
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    note: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: { type: CustomerSchema, required: true },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 80 },
    grandTotal: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentProvider: { type: String, default: 'Razorpay' },
    paymentMethod: { type: String, default: 'Online Payment' },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
      index: true,
    },
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Confirmed',
        'Processing',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
      ],
      default: 'Pending',
      index: true,
    },
    tracking: { type: TrackingSchema, default: {} },
    statusHistory: { type: [StatusHistorySchema], default: [] },
    ownerNotificationSent: { type: Boolean, default: false, index: true },
    ownerNotificationSentAt: { type: Date },
    customerNotificationSent: { type: Boolean, default: false, index: true },
    customerNotificationSentAt: { type: Date },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String, index: true },
    razorpaySignature: { type: String },
    razorpaySignatureVerified: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentVerificationError: { type: String },
    discount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models && mongoose.models.Order) {
  delete (mongoose.models as any).Order;
}
export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
