import React from 'react';
import { Sparkles } from 'lucide-react';

const marqueeItems = [
  'FRESH PICKLES',
  'AUTHENTIC FLAVOUR',
  'TRADITIONAL RECIPES',
  'HOMEMADE STYLE',
  'COLD-PRESSED OILS',
  'BOLD ANDHRA TASTE',
  'MADE WITH LOVE',
  'ZERO CHEMICAL PRESERVATIVES',
];

export const MarqueeSection: React.FC = () => {
  return (
    <div className="py-4 bg-[#A30813] text-white overflow-hidden border-y border-[#88060F] select-none my-8 shadow-inner">
      <div className="flex w-max animate-marquee-left">
        {/* Render twice for continuous loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center space-x-6 mx-4">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase font-sans text-white">
              {item}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047] opacity-90" />
          </div>
        ))}
      </div>
    </div>
  );
};
