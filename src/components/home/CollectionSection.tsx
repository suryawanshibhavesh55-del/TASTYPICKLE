import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Flame, Sparkles } from 'lucide-react';

export const CollectionSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent">
          Handcrafted Varieties
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-bold text-stone-900 tracking-tight">
          Explore Our Collections
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          Authentic Taste. Traditional Recipes. Handcrafted With Love.
        </p>
      </div>

      {/* Four Primary Category Cards in specified order: Non-Veg -> Veg -> Combo -> Kharam Podi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. NON VEG PICKLE CARD (FIRST) */}
        <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7E2DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
            <img
              src={encodeURI('/assets/non veg/WhatsApp Image 2026-09-30 at 2.43.37 PM.jpeg')}
              alt="Non Veg Pickles Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-spicered text-white shadow-md">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                5 Non-Veg Delicacies
              </span>
            </div>
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-widest font-medium text-amber-200">
                Non-Vegetarian Collection
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Non Veg Pickle
              </h3>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-cream-50/50 space-y-4">
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Slow-cooked juicy Boneless Chicken, Gongura Chicken, tender Boneless Mutton, coastal Prawns, and Apollo Fish marinated in authentic masalas.
            </p>

            <div className="pt-2">
              <Link
                to="/non-veg-pickle"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-spicered text-white text-xs sm:text-sm font-semibold hover:bg-spicered-light transition-colors group-hover:shadow-md"
              >
                <span>Explore Non-Veg (5)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 2. VEG PICKLE CARD (SECOND) */}
        <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7E2DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
            <img
              src={encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.52 PM.jpeg')}
              alt="Veg Pickles Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-800 text-white shadow-md">
                <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                12 Pure Veg Varieties
              </span>
            </div>
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-widest font-medium text-red-200">
                Vegetarian Collection
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Veg Pickle
              </h3>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-cream-50/50 space-y-4">
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              From celebrated heirloom Avakaya Mango and tangy Gongura to fiery Red Chilli and crunchy Mix Veg, prepared with sun-dried spices.
            </p>

            <div className="pt-2">
              <Link
                to="/veg-pickle"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-spicered text-white text-xs sm:text-sm font-semibold hover:bg-spicered-light transition-colors group-hover:shadow-md"
              >
                <span>Explore Veg Pickles (12)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. COMBO PACKS CARD (THIRD) */}
        <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7E2DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
            <img
              src={encodeURI('/assets/combo/WhatsApp Image 2026-10-07 at 2.31.44 PM.jpeg')}
              alt="Pickle Combo Packs Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                6 Value Bundles
              </span>
            </div>
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-widest font-medium text-purple-200">
                Special Value Packs
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Combo Packs
              </h3>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-cream-50/50 space-y-4">
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Curated bundles of Chicken, Mutton, Prawns & Fish in 2-jar duos, 3-jar trios, and 1KG grand feasts with maximum savings.
            </p>

            <div className="pt-2">
              <Link
                to="/combo-packs"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-spicered text-white text-xs sm:text-sm font-semibold hover:bg-spicered-light transition-colors group-hover:shadow-md"
              >
                <span>Explore Combos (6)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. KHARAM PODI CARD (FOURTH) */}
        <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#E7E2DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden bg-[#F3EFEA]">
            <img
              src={encodeURI('/assets/kharam podi/WhatsApp Image 2026-10-24 at 2.34.30 PM.jpeg')}
              alt="Kharam Podi Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-800 text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Authentic Podi
              </span>
            </div>
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <p className="text-xs uppercase tracking-widest font-medium text-amber-200">
                Traditional Andhra Podi
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                Kharam Podi
              </h3>
            </div>
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-cream-50/50 space-y-4">
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Legendary stone-ground Nalla Karam made with slow-roasted Guntur chillies, garlic, lentils, and hand-pounded aromatic spices.
            </p>

            <div className="pt-2">
              <Link
                to="/kharam-podi"
                className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-spicered text-white text-xs sm:text-sm font-semibold hover:bg-spicered-light transition-colors group-hover:shadow-md"
              >
                <span>Explore Podi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
