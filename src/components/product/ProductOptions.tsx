import React from 'react';
import { ProductVariant } from '../../types/product';

interface ProductOptionsProps {
  variants: ProductVariant[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  variants,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
          Bottle Size / Pack:
        </label>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          In Stock • 250g Bottle
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {variants.map((v) => {
          const isSelected = selectedSize === v.size;
          return (
            <button
              key={v.size}
              type="button"
              onClick={() => onSelectSize(v.size)}
              className={`relative px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isSelected
                  ? 'bg-pickle-900 border-pickle-900 text-white shadow-sm'
                  : 'bg-white border-[#D6CFC4] text-stone-700 hover:border-pickle-700 hover:bg-cream-100'
              }`}
            >
              <span>{v.size} Bottle</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${
                  isSelected ? 'bg-[#F59E0B] text-stone-950' : 'bg-cream-300 text-stone-800'
                }`}
              >
                Standard
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
