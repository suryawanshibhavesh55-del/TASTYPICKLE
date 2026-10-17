import React from 'react';
import { BookOpen, Sparkles, Award, HeartHandshake, PackageCheck, UtensilsCrossed } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Traditional Recipes',
    description: 'Heirloom Andhra formulations passed down through generations for genuine regional authenticity.',
  },
  {
    icon: Sparkles,
    title: 'Bold Authentic Taste',
    description: 'No watered-down compromises. Freshly ground spices deliver rich aromas and deep comforting heat.',
  },
  {
    icon: Award,
    title: 'Quality Ingredients',
    description: 'Sun-dried Guntur chillies, organic tamarind, pure cold-pressed groundnut oil, and garden-fresh produce.',
  },
  {
    icon: HeartHandshake,
    title: 'Made With Care',
    description: 'Cooked and cured patiently in small artisan batches with zero chemical shortcuts or artificial colours.',
  },
  {
    icon: PackageCheck,
    title: 'Packed Fresh',
    description: 'Hygienically sealed in food-grade airtight jars to preserve original crunch, aroma, and longevity.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Perfect With Every Meal',
    description: 'A single spoonful turns everyday steamed rice, idlis, dosas, parathas, or biryani into a feast.',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent">
          The TastyPickle Promise
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Why Choose TastyPickle?
        </h2>
        <p className="text-stone-600 text-sm sm:text-base">
          Every jar reflects our unyielding commitment to heritage recipes, pure ingredients, and homestyle honesty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E7E2DA] shadow-sm hover:border-pickle-700/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-xl bg-pickle-50 border border-pickle-100 flex items-center justify-center text-pickle-800">
                  <Icon className="w-6 h-6 text-pickle-800 stroke-[1.8]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
