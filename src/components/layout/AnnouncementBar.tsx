import React from 'react';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#8B0000] text-[#FFF5F5] text-xs font-medium tracking-wider uppercase border-b border-red-950/40 overflow-hidden py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop View: Clean centered announcement with subtle spice accent */}
        <div className="hidden md:flex items-center justify-center w-full space-x-6 text-[12px] tracking-wide font-normal">
          <span className="flex items-center gap-1.5 opacity-90">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            Freshly Made Homemade Indian Pickles
          </span>
          <span className="text-red-300/40">•</span>
          <span className="opacity-90">Authentic Heirloom Recipes & Pure Spices</span>
          <span className="text-red-300/40">•</span>
          <span className="text-[#FDE047] font-semibold">Standard Delivery ₹80 Across India</span>
          <span className="text-red-300/40">•</span>
          <a
            href="https://wa.me/919121382438"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors decoration-dotted"
          >
            Direct WhatsApp Orders: +91 91213 82438
          </a>
        </div>

        {/* Mobile View: Smooth continuous marquee so no text overflows */}
        <div className="md:hidden w-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-left flex items-center space-x-6 text-[11px] font-normal tracking-wide">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FDE047]" />
              Freshly Made Indian Pickles
            </span>
            <span className="text-red-300/50">•</span>
            <span>Authentic Andhra Taste</span>
            <span className="text-red-300/50">•</span>
            <span className="text-[#FDE047] font-semibold">Standard Delivery ₹80</span>
            <span className="text-red-300/50">•</span>
            <span>Order on WhatsApp: +91 91213 82438</span>
            <span className="text-red-300/50">•</span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FDE047]" />
              Freshly Made Indian Pickles
            </span>
            <span className="text-red-300/50">•</span>
            <span>Authentic Andhra Taste</span>
            <span className="text-red-300/50">•</span>
            <span className="text-[#FDE047] font-semibold">Standard Delivery ₹80</span>
            <span className="text-red-300/50">•</span>
            <span>Order on WhatsApp: +91 91213 82438</span>
          </div>
        </div>
      </div>
    </div>
  );
};
