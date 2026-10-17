/**
 * Hero and Promotional Banners Configuration
 * 
 * Replace the values below with image URLs/paths when actual promotional images are ready.
 * If empty or null, an elegant, professionally designed neutral placeholder will be rendered.
 */

export interface HeroBannerConfig {
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  image: string | null;
  badge?: string;
}

export const heroImages = {
  // Main prominent promotional banner
  main: {
    title: "Handcrafted Indian Pickles",
    subtitle: "Made with heirloom family recipes, sun-dried spices, and pure cold-pressed groundnut oil.",
    tagline: "Authentic Homemade Taste",
    ctaText: "Explore Collection",
    ctaLink: "/products",
    image: encodeURI('/assets/hero/Tastypickle Indian Pickles Banner.png'),
    badge: "100% Homemade Style"
  } as HeroBannerConfig,

  // Secondary promotional card 1 (e.g. Non-Veg spotlight)
  secondaryOne: {
    title: "Rich Non-Veg Delicacies",
    subtitle: "Boneless Chicken, Tender Mutton & Apollo Fish slow-cooked in traditional fiery masalas.",
    tagline: "Speciality Non-Veg",
    ctaText: "Explore Non-Veg",
    ctaLink: "/non-veg-pickle",
    image: encodeURI('/assets/hero/Traditional Non-Veg Pickles Banner.png'),
    badge: "Customer Favourite"
  } as HeroBannerConfig,

  // Secondary promotional card 2 (Traditional Veg heritage)
  secondaryTwo: {
    title: "Timeless Veg Classics",
    subtitle: "Sun-ripened Avakaya Mango, Tangy Gongura, and Fiery Red Chilli crafted to perfection.",
    tagline: "Traditional Veg",
    ctaText: "Explore Veg",
    ctaLink: "/veg-pickle",
    image: encodeURI('/assets/hero/Veg Pickles_ Pure Goodness in Every Bite.png'),
    badge: "100% Pure Veg"
  } as HeroBannerConfig,
};
