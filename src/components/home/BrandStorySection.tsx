import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#EDE7DC]/80 backdrop-blur-sm border-y border-[#DCD6CA]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#DCD6CA] bg-white aspect-[4/3] sm:aspect-square">
              <img
                src={encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.52 PM.jpeg')}
                alt="TastyPickle Authentic Heritage"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-pickle-800 text-white px-3 py-1 rounded-full mb-2 inline-block">
                  Homemade Heritage
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold">
                  Slow-cured with patience and passion.
                </p>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-white p-4 rounded-2xl shadow-xl border border-[#E7E2DA] items-center gap-3 max-w-[220px]">
              <div className="w-10 h-10 rounded-xl bg-pickle-100 flex items-center justify-center text-pickle-800 flex-shrink-0">
                <Heart className="w-5 h-5 text-spicered fill-spicered" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-stone-900 leading-tight">100% Traditional</p>
                <p className="text-[11px] text-stone-500">Heirloom kitchen recipes</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent">
                Our Story & Tradition
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-4.5xl font-bold text-stone-900 tracking-tight leading-tight">
                Authentic Indian Pickles, Made to Bring Every Meal Alive.
              </h2>
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              From traditional kitchens to your dining table, <strong>TastyPickle</strong> brings the bold, comforting taste of authentic Indian pickles. Born from a profound reverence for time-tested recipes, we believe great pickle is an art of patience — sun-cured spices, hand-selected seasonal ingredients, and pure cold-pressed oils.
            </p>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Whether it is the sharp pungent tang of traditional Andhra Avakaya Mango, the tart herbal soul of Gongura, or the rich savoury indulgence of slow-cooked Boneless Mutton and Chicken, each jar is seasoned without shortcut chemicals.
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-pickle-700 flex-shrink-0" />
                <span>Zero Artificial Preservatives</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-pickle-700 flex-shrink-0" />
                <span>Pure Groundnut Oil Base</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-pickle-700 flex-shrink-0" />
                <span>Authentic Guntur Red Chillies</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-pickle-700 flex-shrink-0" />
                <span>Small Batch Quality Control</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pickle-900 text-white text-xs sm:text-sm font-semibold hover:bg-pickle-800 transition-colors"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-400 text-stone-800 text-xs sm:text-sm font-semibold hover:bg-white transition-colors"
              >
                Explore Catalogue
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
