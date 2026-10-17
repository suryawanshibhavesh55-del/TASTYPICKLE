import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No pickles found matching your criteria.',
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-3xl border border-[#E7E2DA] max-w-lg mx-auto p-8 space-y-3">
        <p className="font-serif text-lg font-bold text-stone-800">{emptyMessage}</p>
        <p className="text-xs text-stone-500">
          Try adjusting your search terms or clearing selected category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
