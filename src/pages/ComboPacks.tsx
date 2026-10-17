import React, { useState } from 'react';
import { useLiveProducts } from '../context/ProductContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Sparkles, Gift, ShieldCheck, Truck, Percent } from 'lucide-react';

export const ComboPacks: React.FC = () => {
  const { products } = useLiveProducts();
  const comboProducts = products.filter((p) => p.category === 'combo');
  const [selectedSub, setSelectedSub] = useState<string>('all');

  const subCategories = ['all', 'Duo Pack', 'Trio Pack', 'Grand 4-in-1'];

  const filtered =
    selectedSub === 'all'
      ? comboProducts
      : comboProducts.filter((p) => p.subCategory?.toLowerCase() === selectedSub.toLowerCase());

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#660C0D] via-[#851113] to-[#A30813] text-white p-8 sm:p-12 mb-10 shadow-lg">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Special Value Bundles • Save More
          </span>
          <h1 className="font-serif text-3xl sm:text-4.5xl font-bold tracking-tight">
            Pickle Combo Packs
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            Handpicked pairings of our most popular Andhra pickles packed together with special combo pricing.
            Indulge in our dynamic 2-jar duos, the grand 3-jar trio, or the ultimate 1KG royal non-veg feast.
          </p>
        </div>

        {/* Ambient Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <Gift className="w-64 h-64 text-white -mr-16 -mt-16" />
        </div>
      </div>

      {/* Subcategory Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-500 mr-2 flex-shrink-0">
          Filter Combos:
        </span>
        {subCategories.map((sub) => {
          const count =
            sub === 'all'
              ? comboProducts.length
              : comboProducts.filter((p) => p.subCategory?.toLowerCase() === sub.toLowerCase()).length;

          return (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSub === sub
                  ? 'bg-spicered text-white shadow-sm'
                  : 'bg-white border border-[#D6CFC4] text-stone-700 hover:border-spicered'
              }`}
            >
              {sub === 'all' ? `All Combo Packs (${comboProducts.length})` : `${sub}s (${count})`}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filtered} />

      {/* Combo Value Highlights Section */}
      <div className="mt-16 pt-12 border-t border-[#E7E2DA]">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-spicered font-accent">
            Why Choose Our Combos
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            More Flavour. Better Savings.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-spicered flex items-center justify-center mx-auto">
              <Percent className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Exclusive Combo Savings</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Save more compared to buying individual jars separately with built-in bundle discounts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Ideal for Gifting</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Curated gift combinations loved by families, pickle connoisseurs, and festive gatherings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">100% Authentic Quality</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Slow-cooked tender meats, ocean-fresh prawns, and pure groundnut oil in every single jar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E7E2DA] space-y-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Flat ₹80 Delivery</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Pay just flat ₹80 delivery fee across India, whether ordering a 2-jar duo or a 1KG royal hamper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
