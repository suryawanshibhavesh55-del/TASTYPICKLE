import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { heroImages, HeroBannerConfig } from '../../data/heroImages';

export const HeroSection: React.FC = () => {
  return (
    <section className="py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 
        Hero Grid Composition matching Spicewale:
        Desktop: 12-column grid. Left 7 or 8 cols = Main Large Hero (aspect-[2/1] matching poster proportions).
        Right 5 or 4 cols = Two stacked secondary hero cards.
        Mobile: Vertical stack with exact aspect-[2/1] so both poster images are 100% visible with zero cropping.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* MAIN HERO BANNER (All Pickles Poster) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center"
        >
          <HeroCard
            banner={heroImages.main}
            isPrimary={true}
          />
        </motion.div>

        {/* SECONDARY HERO PROMOTIONAL BANNERS */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 sm:gap-5 justify-between">
          
          {/* Card 1: Non-Veg Pickles Poster */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="flex-1 flex flex-col justify-center"
          >
            <HeroCard
              banner={heroImages.secondaryOne}
              isPrimary={false}
            />
          </motion.div>

          {/* Card 2: Veg Pickles Placeholder (until 3rd poster is provided) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="flex-1 flex flex-col justify-center"
          >
            <HeroCard
              banner={heroImages.secondaryTwo}
              isPrimary={false}
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};

interface HeroCardProps {
  banner: HeroBannerConfig;
  isPrimary: boolean;
}

const HeroCard: React.FC<HeroCardProps> = ({ banner, isPrimary }) => {
  // If an actual poster image is provided
  if (banner.image) {
    const isNonVeg = banner.ctaLink.includes('non-veg');
    const isVeg = banner.ctaLink.includes('veg');

    return (
      <Link
        to={banner.ctaLink}
        className="group relative w-full aspect-[2/1] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DCD6CA] shadow-sm hover:shadow-xl bg-[#FAF7F2] block transition-all duration-300"
        aria-label={`${banner.title} - ${banner.ctaText}`}
      >
        {/* 
          100% visible on both desktop & mobile with ZERO cropping:
          The container aspect-[2/1] matches the 2048x1024 poster exactly.
          object-contain ensures that even on unusual or sub-pixel screen sizes, every millimeter of the image is shown.
        */}
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />

        {/* Subtle, sleek floating action button in bottom right corner */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-10">
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-stone-900/90 text-white text-[10px] sm:text-xs font-semibold shadow-lg transition-all duration-200 backdrop-blur-sm group-hover:gap-2.5 ${
              isNonVeg
                ? 'group-hover:bg-spicered'
                : 'group-hover:bg-pickle-800'
            }`}
          >
            <span>{banner.ctaText}</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  // Otherwise render the intentional, elegant neutral placeholder (Secondary Banners)
  return (
    <div
      className="relative w-full h-full min-h-[175px] sm:min-h-[185px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DCD6CA] flex flex-col justify-between p-4 sm:p-5 lg:p-6 group transition-all duration-300 bg-[#E8E8E8] shadow-sm"
    >
      {/* Subtle ornamental pattern without overlapping center text */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#B91C1C_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Banner Tag / Badge */}
      <div className="relative z-10 flex items-center justify-between">
        {banner.badge && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-stone-900/10 text-stone-800 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            {banner.badge}
          </span>
        )}
        <span className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-stone-500">
          TastyPickle
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 mt-auto pt-2 space-y-1 sm:space-y-1.5">
        <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-spicered font-accent">
          {banner.tagline}
        </p>

        <h3 className="font-serif font-bold text-stone-900 leading-snug tracking-tight text-base sm:text-lg lg:text-xl">
          {banner.title}
        </h3>

        <p className="text-stone-700 leading-relaxed text-xs line-clamp-1 sm:line-clamp-2 max-w-sm">
          {banner.subtitle}
        </p>

        <div className="pt-1.5">
          <Link
            to={banner.ctaLink}
            className="inline-flex items-center gap-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group-hover:gap-2.5 px-3.5 py-2 bg-stone-900/10 hover:bg-stone-900 text-stone-900 hover:text-white backdrop-blur-sm"
          >
            <span>{banner.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
