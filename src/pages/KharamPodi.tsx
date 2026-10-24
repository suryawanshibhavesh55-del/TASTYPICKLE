import React from 'react';
import { useLiveProducts } from '../context/ProductContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Sparkles } from 'lucide-react';

export const KharamPodi: React.FC = () => {
  const { products } = useLiveProducts();
  const podiProducts = products.filter((p) => p.category === 'kharam-podi');

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#5B1012] via-[#851113] to-[#B42318] text-white p-8 sm:p-12 mb-10 shadow-lg">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Traditional Andhra Podi & Masala
          </span>
          <h1 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white">
            Authentic Kharam Podi
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            Handcrafted traditional stone-ground Andhra podis made with whole slow-roasted Guntur red chillies, fragrant coriander seeds, cumin, fresh curry leaves, and roasted garlic. Coarsely ground for rich authentic texture and bursting aroma.
          </p>
        </div>

        {/* Ambient Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <Sparkles className="w-64 h-64 text-white -mr-16 -mt-16" />
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={podiProducts} />
    </div>
  );
};
