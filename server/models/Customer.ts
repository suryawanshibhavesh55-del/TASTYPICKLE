import mongoose, { Schema, Document } from 'mongoose';

export interface ICartProduct {
  productId: string;
  slug?: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image?: string;
}

export type CustomerStatus = 'Visitor' | 'Cart Added' | 'Ordered';

export interface ICustomer extends Document {
  phoneNumber: string;
  firstVisitAt: Date;
  lastActivityAt: Date;
  cartItems: ICartProduct[];
  totalOrders: number;
  totalSpent: number;
  lastOrderId?: string;
  status: CustomerStatus;
  marketingConsent: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CartProductSchema = new Schema(
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

const CustomerSchema = new Schema<ICustomer>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    firstVisitAt: {
      type: Date,
      default: Date.now,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
    cartItems: {
      type: [CartProductSchema],
      default: [],
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    lastOrderId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Visitor', 'Cart Added', 'Ordered'],
      default: 'Visitor',
      index: true,
    },
    marketingConsent: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const CustomerModel =
  mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);
