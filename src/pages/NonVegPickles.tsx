import React, { useState } from 'react';
import { useLiveProducts } from '../context/ProductContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Flame, Sparkles } from 'lucide-react';

export const NonVegPickles: React.FC = () => {
  const { products } = useLiveProducts();
  const nonVegProducts = products.filter(p => p.category === 'non-veg');
  const [selectedSub, setSelectedSub] = useState<string>('all');

  const subCategories = ['all', 'Chicken', 'Mutton', 'Prawns', 'Fish'];

  const filtered = selectedSub === 'all'
    ? nonVegProducts
    : nonVegProducts.filter(p => p.subCategory?.toLowerCase() === selectedSub.toLowerCase());

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#700E0F] to-[#8E1616] text-white p-8 sm:p-12 mb-10 shadow-lg">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-amber-200">
            <Flame className="w-3.5 h-3.5" />
            Speciality Non-Veg Delicacies
          </span>
          <h1 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight">
            Non Veg Pickles
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            Slow-cooked tender meats and fresh seafood marinated in roasted Andhra spices and pure groundnut oil. Made strictly without artificial preservatives, acidity regulators, or food colours.
          </p>
        </div>

        {/* Ambient Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <Sparkles className="w-64 h-64 text-white -mr-16 -mt-16" />
        </div>
      </div>

      {/* Subcategory Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2 flex-shrink-0">
          Filter By:
        </span>
        {subCategories.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSub(sub)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSub === sub
                ? 'bg-spicered text-white shadow-sm'
                : 'bg-white border border-[#D6CFC4] text-stone-700 hover:border-spicered'
            }`}
          >
            {sub === 'all' ? 'All Non-Veg Pickles (5)' : `${sub} Pickles`}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filtered} />
    </div>
  );
};
