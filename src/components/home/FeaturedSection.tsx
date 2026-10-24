import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLiveProducts } from '../../context/ProductContext';
import { ProductGrid } from '../product/ProductGrid';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const { products } = useLiveProducts();
  const [activeTab, setActiveTab] = useState<'all' | 'veg' | 'non-veg' | 'combo' | 'kharam-podi'>('all');

  const filtered = products.filter(p => {
    if (activeTab === 'all') return p.featured || p.bestSeller;
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Customer Favourites
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Our Bestselling Pickles
          </h2>
          <p className="text-stone-600 text-sm max-w-md">
            Prepared fresh in small batches using traditional stone-ground masalas and pure cold-pressed oils.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-[#EFE9DF] p-1.5 rounded-2xl self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-pickle-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Top Picks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('veg')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'veg'
                ? 'bg-pickle-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Veg Pickles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('non-veg')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'non-veg'
                ? 'bg-spicered text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Non-Veg Pickles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('combo')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'combo'
                ? 'bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Combo Packs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kharam-podi')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'kharam-podi'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Kharam Podi
          </button>
        </div>
      </div>

      {/* Grid */}
      <ProductGrid products={filtered} />

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-semibold hover:bg-pickle-800 transition-all duration-200 shadow-sm hover:gap-3"
        >
          <span>View All 17 Pickles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
