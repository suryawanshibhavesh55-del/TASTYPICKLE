export type ProductCategory = 'veg' | 'non-veg' | 'combo';

export interface ProductVariant {
  size: string;
  price?: number;
  pricePlaceholder?: string;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  teluguName?: string;
  category: ProductCategory;
  subCategory?: string; // e.g. "Chicken", "Mutton", "Fish", "Prawns", "Mango", "Lemon", "Chilli"
  images: string[];
  price: number;
  originalPrice?: number;
  pricePlaceholder: string;
  shortDescription: string;
  description: string;
  ingredients: string[];
  highlights: string[];
  tasteProfile: string;
  spiceLevel: 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy';
  servingSuggestions: string[];
  storage: string;
  shelfLife: string;
  weightOptions: ProductVariant[];
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}
