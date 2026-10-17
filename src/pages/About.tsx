import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, Award, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent">
          Our Heritage & Passion
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
          Bringing Traditional Indian Pickles Alive, One Jar at a Time.
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          From traditional kitchens to your dining table, TastyPickle brings the bold, comforting taste of authentic Indian pickles crafted with uncompromised devotion to heirloom recipes.
        </p>
      </div>

      {/* Main Two Column Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#DCD6CA] aspect-[4/3] bg-white">
            <img
              src={encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.52 PM.jpeg')}
              alt="TastyPickle Tradition"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 sm:left-6 bg-pickle-900 text-white p-4 sm:p-5 rounded-2xl shadow-xl max-w-xs space-y-1">
            <p className="font-serif text-lg font-bold">Heirloom Recipes</p>
            <p className="text-xs text-pickle-200">
              Preserving culinary wisdom passed through generations.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-stone-900 tracking-tight">
            The Philosophy of Genuine Indian Taste
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            In an era of mass-manufactured, chemically accelerated condiments, TastyPickle was established to preserve what truly makes Indian pickles magical: patience, sunlight, pure cold-pressed groundnut oil, and carefully chosen spices.
          </p>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Every pickle batch starts with seasonal raw ingredients — sour green raw mangoes cut cleanly with shells intact, freshly picked Gongura leaves, whole garlic cloves, succulent cuts of chicken and mutton, or plump coastal prawns.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-cream-200/80 border border-[#E7E2DA] space-y-1">
              <span className="font-serif text-2xl font-bold text-pickle-800">100%</span>
              <p className="text-xs font-semibold text-stone-800">Homestyle Preparation</p>
              <p className="text-[11px] text-stone-500">No automated industrial shortcuts</p>
            </div>
            <div className="p-4 rounded-2xl bg-cream-200/80 border border-[#E7E2DA] space-y-1">
              <span className="font-serif text-2xl font-bold text-spicered">Zero</span>
              <p className="text-xs font-semibold text-stone-800">Artificial Additives</p>
              <p className="text-[11px] text-stone-500">Pure oil, salt, and spice preservation</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="bg-white rounded-3xl border border-[#E7E2DA] p-8 sm:p-12 shadow-sm space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            What Sets TastyPickle Apart
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Our uncompromised standards from raw material procurement to final sealing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-pickle-100 mx-auto flex items-center justify-center text-pickle-800 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">Authentic Andhra Spices</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We exclusively use select sun-ripened red chillies and freshly ground mustard for quintessential Andhra punch.
            </p>
          </div>

          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-pickle-100 mx-auto flex items-center justify-center text-pickle-800 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">Cold-Pressed Oils</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Traditional groundnut oil provides the classic aroma, velvety consistency, and natural preservation.
            </p>
          </div>

          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-pickle-100 mx-auto flex items-center justify-center text-pickle-800 mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">Small Artisanal Batches</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every jar is checked for perfect spice equilibrium, texture, and homestyle cleanliness.
            </p>
          </div>

          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-pickle-100 mx-auto flex items-center justify-center text-pickle-800 mb-3">
              <Heart className="w-6 h-6 text-spicered" />
            </div>
            <h4 className="font-serif text-base font-bold text-stone-900">Comfort of Home</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Crafted to bring back fond memories of grandmother's kitchen ceramic jars basking in the sun.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          Ready to Taste the Heritage?
        </h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Explore our range of 17 handcrafted veg and non-veg pickles, freshly packed and delivered to your doorstep.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-pickle-800 text-white text-xs sm:text-sm font-semibold hover:bg-pickle-700 transition-colors shadow-md"
        >
          <span>Explore All Pickles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
