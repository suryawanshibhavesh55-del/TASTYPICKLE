import React, { useState } from 'react';
import { useLiveProducts } from '../context/ProductContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Leaf, Sparkles } from 'lucide-react';

export const VegPickles: React.FC = () => {
  const { products } = useLiveProducts();
  const vegProducts = products.filter(p => p.category === 'veg');
  const [selectedSub, setSelectedSub] = useState<string>('all');

  const subCategories = [
    'all',
    'Mango',
    'Chilli',
    'Gongura',
    'Tomato',
    'Lemon',
    'Garlic',
    'Ginger',
    'Mixed',
  ];

  const filtered = selectedSub === 'all'
    ? vegProducts
    : vegProducts.filter(p => p.subCategory?.toLowerCase() === selectedSub.toLowerCase());

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#800709] to-[#B91C1C] text-white p-8 sm:p-12 mb-10 shadow-lg">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white">
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            100% Vegetarian Range
          </span>
          <h1 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight text-white">
            Traditional Veg Pickles
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            Time-honoured South Indian recipes prepared with sun-ripened green mangoes, sour gongura leaves, ripe tomatoes, fresh garlic, and whole roasted spices in pure groundnut oil.
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
                ? 'bg-pickle-800 text-white shadow-sm'
                : 'bg-white border border-[#D6CFC4] text-stone-700 hover:border-pickle-700'
            }`}
          >
            {sub === 'all' ? 'All Veg Pickles (12)' : sub}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filtered} />
    </div>
  );
};
