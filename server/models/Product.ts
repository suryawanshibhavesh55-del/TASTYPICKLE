import mongoose, { Schema, Document } from 'mongoose';
import { products as initialProducts } from '../data/products';

export interface IProduct extends Document {
  id: string;
  slug: string;
  name: string;
  teluguName?: string;
  category: 'veg' | 'non-veg' | 'combo';
  subCategory?: string;
  images: string[];
  price: number;
  originalPrice?: number;
  pricePlaceholder?: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  highlights: string[];
  tasteProfile: string;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy';
  servingSuggestions: string[];
  storage: string;
  shelfLife: string;
  weightOptions: {
    size: string;
    price?: number;
    pricePlaceholder?: string;
    isPopular?: boolean;
  }[];
  stock: number;
  isActive: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductVariantSchema = new Schema({
  size: { type: String, required: true },
  price: { type: Number },
  pricePlaceholder: { type: String },
  isPopular: { type: Boolean, default: false },
}, { _id: false });

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    teluguName: { type: String },
    category: { type: String, enum: ['veg', 'non-veg', 'combo'], required: true },
    subCategory: { type: String },
    images: { type: [String], default: [] },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    pricePlaceholder: { type: String, default: '' },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    ingredients: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    tasteProfile: { type: String, default: '' },
    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
      default: 'Medium',
    },
    servingSuggestions: { type: [String], default: [] },
    storage: { type: String, default: 'Store in a cool dry place' },
    shelfLife: { type: String, default: '3 Months' },
    weightOptions: { type: [ProductVariantSchema], default: [] },
    stock: { type: Number, default: 50 },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models && mongoose.models.Product) {
  delete (mongoose.models as any).Product;
}
export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

// Auto-seed function to ensure all catalog products (including new combos) exist in MongoDB
export async function seedProductsIfEmpty() {
  try {
    for (const p of initialProducts) {
      await ProductModel.findOneAndUpdate(
        { id: p.id },
        {
          $setOnInsert: {
            ...p,
            stock: 50,
            isActive: true,
          },
        },
        { upsert: true }
      );
    }
  } catch (err) {
    console.error('[Seed] Error checking or seeding products:', err);
  }
}
