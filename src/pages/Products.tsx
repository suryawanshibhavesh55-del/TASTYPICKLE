import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLiveProducts } from '../context/ProductContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Search, X, Filter } from 'lucide-react';

export const Products: React.FC = () => {
  const { products } = useLiveProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'veg' | 'non-veg' | 'combo' | 'kharam-podi'>('all');
  const [selectedSpice, setSelectedSpice] = useState<string>('all');

  useEffect(() => {
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    const matchesSpice =
      selectedSpice === 'all' || p.spiceLevel === selectedSpice;

    return matchesSearch && matchesCategory && matchesSpice;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSpice('all');
    setSearchParams({});
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent">
          Complete Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-bold text-stone-900 tracking-tight">
          All Pickles ({products.length})
        </h1>
        <p className="text-stone-600 text-sm">
          Browse our entire range of traditional Veg pickles, speciality Non-Veg delicacies, and value-saver Combo packs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E7E2DA] shadow-sm mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 bg-[#EFE9DF] p-1.5 rounded-2xl w-full md:w-auto flex-wrap">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-pickle-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Pickles ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('veg')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'veg'
                  ? 'bg-pickle-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Veg ({products.filter((p) => p.category === 'veg').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('non-veg')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'non-veg'
                  ? 'bg-spicered text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Non-Veg ({products.filter((p) => p.category === 'non-veg').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('combo')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'combo'
                  ? 'bg-gradient-to-r from-purple-800 to-indigo-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Combo Packs ({products.filter((p) => p.category === 'combo').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('kharam-podi')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'kharam-podi'
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Kharam Podi ({products.filter((p) => p.category === 'kharam-podi').length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ingredient or name..."
              className="w-full bg-[#FAF7F2] text-xs sm:text-sm text-stone-800 placeholder-stone-400 pl-9 pr-8 py-2.5 rounded-2xl border border-[#DCD6CA] focus:outline-none focus:border-pickle-700"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Spice Level Sub-filter & Active Filter Counter */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-stone-100 gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-stone-500">Spice Heat:</span>
            {['all', 'Medium', 'Spicy', 'Extra Spicy'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedSpice(lvl)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedSpice === lvl
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white border-stone-300 text-stone-600 hover:border-stone-400'
                }`}
              >
                {lvl === 'all' ? 'All Heat Levels' : lvl}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedSpice !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="text-spicered font-semibold hover:underline flex items-center gap-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Product List */}
      <ProductGrid
        products={filteredProducts}
        emptyMessage={`No pickles found matching "${searchQuery}".`}
      />
    </div>
  );
};
