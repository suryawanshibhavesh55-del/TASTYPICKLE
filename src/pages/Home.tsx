import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeSection } from '../components/home/MarqueeSection';
import { CollectionSection } from '../components/home/CollectionSection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { BrandStorySection } from '../components/home/BrandStorySection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { BusinessVideoSection } from '../components/home/BusinessVideoSection';

export const Home: React.FC = () => {
  return (
    <main>
      {/* 3 Promotional / Hero Image Banners */}
      <HeroSection />

      {/* Running Marquee Animation */}
      <MarqueeSection />

      {/* Explore Our Pickles Category Showcase */}
      <CollectionSection />

      {/* Bestseller & Featured Showcase */}
      <FeaturedSection />

      {/* Brand Heritage Story */}
      <BrandStorySection />

      {/* 6 Value Pillars */}
      <WhyChooseUsSection />

      {/* Behind the Scenes Business Video Showcase */}
      <BusinessVideoSection />
    </main>
  );
};
