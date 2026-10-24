import { Product, ProductCategory } from '../types/product';

export const products: Product[] = [
  // ===================== NON-VEG PICKLES =====================
  {
    id: 'tp-nv-01',
    slug: 'boneless-chicken-pickle',
    name: 'Boneless Chicken Pickle',
    teluguName: 'చికెన్ పచ్చడి',
    category: 'non-veg',
    subCategory: 'Chicken',
    images: [
      encodeURI('/assets/non veg/WhatsApp Image 2026-09-30 at 2.43.37 PM.jpeg')
    ],
    price: 275,
    pricePlaceholder: '₹275',
    shortDescription: 'Tender juicy boneless chicken morsels cooked to perfection in aromatic Andhra spices and pure edible oils.',
    description: 'Our signature Boneless Chicken Pickle is slow-cooked using prime tender chicken cuts, infused with roasted fenugreek seeds, fragrant spices, and a dash of vinegar for a robust, tangy, and savoury punch that elevates any meal.',
    ingredients: [
      'Prime Boneless Chicken',
      'Edible Oils',
      'Hand-ground Spices',
      'Fenugreek Seeds',
      'Salt',
      'Vinegar',
      'Condiments'
    ],
    highlights: [
      '100% Tender Boneless Chicken',
      'Traditional Andhra Style Preparation',
      'No Artificial Additives',
      'Packed with Authentic Spices'
    ],
    tasteProfile: 'Rich, savoury, spicy with a pleasant aromatic tanginess',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Steaming hot white rice with ghee', 'Crispy dosas', 'Hot rotis or parathas', 'Biryani side'],
    storage: 'Store in a cool, dry place. Use a clean, dry spoon. Refrigeration extends freshness naturally.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '250g', price: 275, pricePlaceholder: '₹275', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-nv-02',
    slug: 'gongura-chicken-pickle',
    name: 'Gongura Chicken Pickle',
    teluguName: 'గోంగూర చికెన్ పచ్చడి',
    category: 'non-veg',
    subCategory: 'Chicken',
    images: [
      encodeURI('/assets/non veg/WhatsApp Image 2026-09-30 at 2.43.59 PM.jpeg')
    ],
    price: 275,
    pricePlaceholder: '₹275',
    shortDescription: 'Fresh sour gongura (sorrel leaves) combined with succulent chicken pieces and traditional stone-ground masalas.',
    description: 'A celebrated Telugu culinary masterpiece. Freshly picked gongura leaves are slowly sautéed and amalgamated with tender chicken, red chillies, crushed garlic, and whole mustard seeds for an unforgettable tart and fiery flavour profile.',
    ingredients: [
      'Boneless Chicken',
      'Fresh Gongura (Sorrel Leaves)',
      'Red Chilli',
      'Garlic',
      'Mustard Seeds',
      'Ground Spices',
      'Edible Oil',
      'Salt'
    ],
    highlights: [
      'Authentic Sour Sorrel Leaf Base',
      'Slow-Cooked Meat',
      'Rich in Iron and Flavours',
      'Heirloom Village Recipe'
    ],
    tasteProfile: 'Distinctively tangy, herbal, and spicy',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Plain steamed rice with melted ghee', 'Ragi sankati', 'Warm flatbreads'],
    storage: 'Store in a cool, dry place. Refrigeration preserves the fresh gongura aroma.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '250g', price: 275, pricePlaceholder: '₹275', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-nv-03',
    slug: 'prawns-pickle',
    name: 'Prawns Pickle',
    teluguName: 'రొయ్యల పచ్చడి',
    category: 'non-veg',
    subCategory: 'Prawns',
    images: [
      encodeURI('/assets/non veg/WhatsApp Image 2026-09-30 at 2.44.12 PM.jpeg')
    ],
    price: 350,
    pricePlaceholder: '₹350',
    shortDescription: 'Fresh coastal prawns gently fried and preserved in a rich, deeply aromatic spice blend and seasoned oil.',
    description: 'Crafted with premium cleaned coastal prawns, crisped to the right bite and blended into a fragrant medley of ginger, garlic, toasted mustard, and aromatic spices. An absolute must-have for seafood enthusiasts.',
    ingredients: [
      'Cleaned Fresh Prawns',
      'Red Chilli Powder',
      'Ginger & Garlic Paste',
      'Mustard Seeds',
      'Edible Oil',
      'Fenugreek Powder',
      'Salt & Spices'
    ],
    highlights: [
      'Premium Coastal Quality Prawns',
      'Authentic Coastal Masala Recipe',
      'Tender yet Firm Texture',
      'Rich Seafood Umami'
    ],
    tasteProfile: 'Bold coastal spice with deep seafood sweetness',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Ghee rice', 'Jeera rice', 'Curd rice', 'Appams'],
    storage: 'Store in a cool, dry place. Always use a clean dry spoon. Refrigerate after opening.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '250g', price: 350, pricePlaceholder: '₹350', isPopular: true }
    ],
    featured: true,
    bestSeller: false
  },
  {
    id: 'tp-nv-04',
    slug: 'boneless-mutton-pickle',
    name: 'Boneless Mutton Pickle',
    teluguName: 'మటన్ పచ్చడి',
    category: 'non-veg',
    subCategory: 'Mutton',
    images: [
      encodeURI('/assets/non veg/WhatsApp Image 2026-09-30 at 2.44.36 PM.jpeg')
    ],
    price: 425,
    pricePlaceholder: '₹425',
    shortDescription: 'Tender boneless mutton slow-cooked in pure groundnut oil with zero preservatives and authentic Indian spices.',
    description: 'Prepared using traditional slow-braising methods. Selected cuts of boneless mutton are cooked with groundnut oil, freshly roasted spices, ginger, and garlic. Made strictly without preservatives, artificial colours, or acidity regulators.',
    ingredients: [
      'Selected Boneless Mutton',
      'Pure Cold-Pressed Groundnut Oil',
      'Red Chilli',
      'Fresh Garlic & Ginger',
      'Fenugreek & Mustard',
      'Salt & Condiments'
    ],
    highlights: [
      'Made with 100% Pure Groundnut Oil',
      'No Preservatives or Artificial Colours',
      'No Acidity Regulators',
      'Rich Royal Taste'
    ],
    tasteProfile: 'Deeply savoury, robust meat flavours with warming spice',
    spiceLevel: 'Extra Spicy',
    servingSuggestions: ['Basmati rice with a dollop of ghee', 'Flaky parathas', 'Phulkas'],
    storage: 'Store in a cool, dry place. Keep container tightly sealed.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '250g', price: 425, pricePlaceholder: '₹425', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-nv-05',
    slug: 'apollo-fish-pickle',
    name: 'Apollo Fish Pickle',
    teluguName: 'అపోలో ఫిష్ పచ్చడి',
    category: 'non-veg',
    subCategory: 'Fish',
    images: [
      encodeURI('/assets/non veg/WhatsApp Image 2026-09-30 at 2.44.51 PM.jpeg')
    ],
    price: 275,
    pricePlaceholder: '₹275',
    shortDescription: 'Fresh fish fillets cured with garlic, mustard, fenugreek, and red chillies in fragrant edible oils.',
    description: 'Featuring firm, delicate fish fillets seasoned with our signature spice mixture, toasted whole spices, and fragrant oil. Every jar captures coastal indulgence with balanced heat and homestyle integrity.',
    ingredients: [
      'Selected Fresh Fish Fillets',
      'Red Chilly Powder',
      'Salt',
      'Garlic',
      'Mustard Seeds',
      'Fenugreek Seeds',
      'Edible Oil'
    ],
    highlights: [
      'Firm & Flavorful Fish Morsels',
      '100% Homemade Preparation',
      'Rich in Coastal Spices',
      'Hygienically Packed'
    ],
    tasteProfile: 'Tangy, pungent garlic notes, warm coastal spice',
    spiceLevel: 'Spicy',
    servingSuggestions: ['South Indian curd rice', 'Hot steamed rice', 'Pulao'],
    storage: 'Store in a cool, dry place away from direct sunlight. Refrigeration recommended.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '250g', price: 275, pricePlaceholder: '₹275', isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },

  // ===================== VEG PICKLES =====================
  {
    id: 'tp-vg-01',
    slug: 'mango-pickle',
    name: 'Mango Pickle (Avakaya)',
    teluguName: 'ఆవకాయ',
    category: 'veg',
    subCategory: 'Mango',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.52 PM.jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'The king of Indian pickles — crisp raw green mangoes infused with pungent mustard, garlic, and fiery red chillies.',
    description: 'Authentic Andhra Avakaya prepared strictly in the traditional way. Hand-cut raw sour mango pieces with hard shells intact are marinated with pungent ground mustard (aava pindi), sun-dried Guntur chillies, garlic, and cold-pressed oil.',
    ingredients: [
      'Raw Green Mango',
      'Mustard Powder',
      'Red Chilli',
      'Salt',
      'Garlic',
      'Fenugreek',
      'Ground Spices',
      'Edible Oil'
    ],
    highlights: [
      'Authentic Andhra Avakaya Style',
      'Crisp Raw Green Mango Cubes',
      'Pungent Mustard Kick',
      'Zero Artificial Preservatives'
    ],
    tasteProfile: 'Boldly tangy, pungent mustard heat, deeply comforting',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Hot rice with ghee and mudda pappu (dal)', 'Upma', 'Curd rice'],
    storage: 'Store in a cool, dry location. Always use a dry wooden or steel spoon.',
    shelfLife: '12 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-vg-02',
    slug: 'tomato-pickle',
    name: 'Tomato Pickle',
    teluguName: 'టొమాటో పచ్చడి',
    category: 'veg',
    subCategory: 'Tomato',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM (1).jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Sun-ripened farm tomatoes slow-reduced with tamarind, fenugreek, garlic, and pure groundnut oil.',
    description: 'Juicy ripe tomatoes are gently simmered until thick and luscious, then blended with toasted fenugreek, mustard, red chilli, and a fragrant garlic tempering. Pairs seamlessly with both breakfast tiffins and full meals.',
    ingredients: [
      'Farm Fresh Tomatoes',
      'Red Chilli',
      'Mustard Seeds',
      'Fenugreek',
      'Ground Spices',
      'Groundnut Oil',
      'Salt'
    ],
    highlights: [
      'Farm Fresh Ripe Tomatoes',
      'Slow-Cooked Reduction',
      'Perfect Tiffin Companion',
      'Homestyle Tempering'
    ],
    tasteProfile: 'Pleasantly tangy, mildly sweet undertones with spicy garlic warmth',
    spiceLevel: 'Medium',
    servingSuggestions: ['Idli and Dosa', 'Hot rice with ghee', 'Parathas and sandwiches'],
    storage: 'Store in a cool, dry place. Keep container tightly closed.',
    shelfLife: '6 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: true,
    bestSeller: false
  },
  {
    id: 'tp-vg-03',
    slug: 'lemon-pickle',
    name: 'Lemon Pickle',
    teluguName: 'నిమ్మకాయ పచ్చడి',
    category: 'veg',
    subCategory: 'Lemon',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM (2).jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Juicy yellow lemons cured naturally in their own juices with red chillies, mustard, and groundnut oil.',
    description: 'Thin-skinned juicy lemons cured patiently to tenderize the peel naturally. Infused with coarse salt, roasted fenugreek powder, and aromatic groundnut oil for that timeless zing that refreshes your palate.',
    ingredients: [
      'Fresh Yellow Lemons',
      'Red Chilli',
      'Mustard Seeds',
      'Fenugreek',
      'Ground Spices',
      'Pure Groundnut Oil',
      'Salt'
    ],
    highlights: [
      'Naturally Cured Thin-Skin Lemons',
      'Rich in Citrus Zing',
      'Traditional Sun-Cured Recipe',
      'Aids Natural Palate Cleansing'
    ],
    tasteProfile: 'Sharp, vibrant citrus acidity with warming spices',
    spiceLevel: 'Medium',
    servingSuggestions: ['Curd rice', 'Khichdi', 'Dal chawal', 'Theplas'],
    storage: 'Keep in a dry environment. Ensure oil layer remains over the surface.',
    shelfLife: '12 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: false,
    bestSeller: true
  },
  {
    id: 'tp-vg-04',
    slug: 'red-chilli-pickle',
    name: 'Red Chilli Pickle (Pandu Mirapa)',
    teluguName: 'పండు మిరప పచ్చడి',
    category: 'veg',
    subCategory: 'Chilli',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM (3).jpeg'),
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.55 PM.jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Ripe red chillies stone-ground with tamarind, garlic, and spices for an intensely bold Andhra experience.',
    description: 'Made from handpicked fresh crimson ripe chillies (Pandu Mirapakayalu) ground with aged tamarind and garlic cloves. A fiery, flavourful classic of Andhra households that delivers unmistakable pungency and aroma.',
    ingredients: [
      'Fresh Red Ripe Chillies',
      'Mustard Seeds',
      'Fenugreek Seeds',
      'Salt',
      'Garlic',
      'Spices & Condiments',
      'Edible Oil'
    ],
    highlights: [
      'Available in 250g and 500g Glass Jars',
      'Authentic Pandu Mirapa Recipe',
      'Fiery Red Colour Naturally',
      'Rich Garlic Infusion'
    ],
    tasteProfile: 'Intensely spicy, deep tamarind tang, garlicky warmth',
    spiceLevel: 'Extra Spicy',
    servingSuggestions: ['Warm rice with cow ghee', 'Idli, vada, and dosa', 'Crispy rotis'],
    storage: 'Store in a cool dry cupboard. Avoid introducing moisture.',
    shelfLife: '9 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-vg-05',
    slug: 'gongura-pickle',
    name: 'Gongura Pickle',
    teluguName: 'గోంగూర పచ్చడి',
    category: 'veg',
    subCategory: 'Gongura',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM.jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'The pride of Andhra Pradesh — tart sorrel leaves cooked with red chillies, garlic, and groundnut oil.',
    description: 'Often called "Andhra Matha", Gongura is an indispensable culinary staple. Fresh red-stem sorrel leaves are gently sautéed and spiced with roasted coriander, fenugreek, mustard, and garlic cloves.',
    ingredients: [
      'Raw Fresh Gongura Leaves',
      'Chilli Powder',
      'Mustard Seeds',
      'Fenugreek',
      'Spices',
      'Groundnut Oil',
      'Salt'
    ],
    highlights: [
      'Authentic Andhra Gongura',
      'Tangy Sorrel Leaf Texture',
      'Rich in Minerals',
      'Traditional Heritage Recipe'
    ],
    tasteProfile: 'Tart, earthy, spicy and aromatic',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Steamed rice with raw onions and ghee', 'Sambar rice', 'Rotis'],
    storage: 'Store in a cool, dry place. Use dry spoon only.',
    shelfLife: '9 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-vg-06',
    slug: 'bitter-gourd-pickle',
    name: 'Bitter Gourd Pickle',
    teluguName: 'కాకరకాయ పచ్చడి',
    category: 'veg',
    subCategory: 'Bitter Gourd',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.54 PM (1).jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Crisp bitter gourd roundels expertly seasoned with tamarind, spices, and mustard to balance natural bitterness.',
    description: 'Carefully sliced bitter gourds (Karela) are seasoned with sour tamarind and roasted spices that soften the bitterness into an appetizing, complex savoury pickle with satisfying crunch.',
    ingredients: [
      'Fresh Bitter Gourd',
      'Mustard Seeds',
      'Spices & Condiments',
      'Edible Oil',
      'Salt',
      'Tamarind'
    ],
    highlights: [
      'Perfect Harmony of Bitter & Tangy',
      'Crisp Bite in Every Spoon',
      'Traditional Digestive Tonic Recipe',
      'Homemade Style'
    ],
    tasteProfile: 'Subtle pleasant bitterness balanced with tangy, spicy notes',
    spiceLevel: 'Medium',
    servingSuggestions: ['Plain rice with ghee', 'Curd rice', 'Phulkas'],
    storage: 'Store in an airtight container in a cool dry space.',
    shelfLife: '6 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: 'tp-vg-07',
    slug: 'amla-pickle',
    name: 'Amla Pickle',
    teluguName: 'ఉసిరికాయ పచ్చడి',
    category: 'veg',
    subCategory: 'Amla',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.54 PM (2).jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Whole Indian gooseberries steeped in cold-pressed oil, mustard, and fragrant spices.',
    description: 'Whole plump Amla (Usirikaya) steeped in spiced oil until thoroughly softened and infused. Celebrated across Indian households for its unique tart-astringent profile and rich taste.',
    ingredients: [
      'Fresh Amla (Gooseberry)',
      'Red Chilli',
      'Mustard',
      'Fenugreek',
      'Salt',
      'Spices & Condiments',
      'Edible Oil'
    ],
    highlights: [
      'Whole Indian Gooseberries',
      'Traditional Usirikaya Flavours',
      'Rich Homestyle Marination',
      'Zero Chemical Additives'
    ],
    tasteProfile: 'Tangy, slightly astringent, deeply spiced',
    spiceLevel: 'Medium',
    servingSuggestions: ['Dal chawal', 'Curd rice', 'Khichdi'],
    storage: 'Store in a cool dry cupboard. Refrigerate after opening.',
    shelfLife: '12 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: 'tp-vg-08',
    slug: 'ginger-pickle',
    name: 'Ginger Pickle (Allam)',
    teluguName: 'అల్లం పచ్చడి',
    category: 'veg',
    subCategory: 'Ginger',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.54 PM.jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Fresh aromatic ginger roots ground with tamarind, jaggery, and red chillies for sweet-spicy perfection.',
    description: 'The iconic South Indian Allam Pachadi. Freshly peeled ginger roots are crushed with tamarind pulp, organic jaggery, and fragrant spices, creating an irresistible sweet, sour, and fiery symphony.',
    ingredients: [
      'Fresh Ginger Root',
      'Red Chilli',
      'Mustard Seeds',
      'Fenugreek',
      'Salt',
      'Spices and Condiments',
      'Edible Oil'
    ],
    highlights: [
      'Freshly Peeled Ginger Roots',
      'Classic Pesarattu & Dosa Pairing',
      'Zesty and Warming',
      'Authentic Recipe'
    ],
    tasteProfile: 'Zesty ginger warmth, sweet-tangy tamarind balance',
    spiceLevel: 'Medium',
    servingSuggestions: ['Pesarattu', 'Ghee Roast Dosa', 'Rice with dal', 'Upma'],
    storage: 'Keep in a cool dry place. Keep spoon dry.',
    shelfLife: '6 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: true,
    bestSeller: false
  },
  {
    id: 'tp-vg-09',
    slug: 'garlic-pickle',
    name: 'Garlic Pickle',
    teluguName: 'వెల్లుల్లి పచ్చడి',
    category: 'veg',
    subCategory: 'Garlic',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.55 PM (1).jpeg')
    ],
    price: 115,
    pricePlaceholder: '₹115',
    shortDescription: 'Whole peeled garlic cloves sautéed gently and preserved in rich spiced oil with roasted mustard seeds.',
    description: 'Generous whole garlic cloves simmered until mellow and soft, then steeped in roasted fenugreek, mustard, red chilli, and pure groundnut oil. A punchy pickle that garlic lovers adore.',
    ingredients: [
      'Whole Peeled Garlic Cloves',
      'Red Chilli Powder',
      'Mustard Seeds',
      'Fenugreek',
      'Salt',
      'Edible Groundnut Oil',
      'Spices'
    ],
    highlights: [
      'Loaded with Whole Garlic Cloves',
      'Robust Pungent Aroma',
      'Mellow Melt-in-Mouth Texture',
      'Cold-Pressed Oil Base'
    ],
    tasteProfile: 'Deep garlic umami, spicy, pungent and aromatic',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Parathas', 'Jeera rice', 'Roti sabzi', 'Curd rice'],
    storage: 'Store in a cool dry place. Stir occasionally with a dry spoon.',
    shelfLife: '9 Months from packing',
    weightOptions: [
      { size: '250g', price: 115, pricePlaceholder: '₹115', isPopular: true }
    ],
    featured: false,
    bestSeller: true
  },
  {
    id: 'tp-vg-10',
    slug: 'beetroot-pickle',
    name: 'Beetroot Pickle',
    teluguName: 'బీట్‌రూట్ పచ్చడి',
    category: 'veg',
    subCategory: 'Beetroot',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.56 PM (1).jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Tender ruby-red beetroot cubes pickled in sun-dried spices and mustard oil for earthy vibrancy.',
    description: 'An innovative homestyle delicacy. Hand-diced tender beetroots paired with freshly crushed spices and tangy notes for a wonderfully balanced crunch with natural earthy sweetness.',
    ingredients: [
      'Fresh Beetroots',
      'Red Chilli Powder',
      'Mustard Seeds',
      'Fenugreek',
      'Salt',
      'Spices and Condiments',
      'Edible Oil'
    ],
    highlights: [
      'Farm Fresh Crunchy Beetroots',
      'Vibrant Natural Ruby Colour',
      'Unique Sweet-Tangy-Spicy Balance',
      'Modern Artisanal Twist'
    ],
    tasteProfile: 'Earthy sweetness meets lively pickle spices and tang',
    spiceLevel: 'Medium',
    servingSuggestions: ['Rice bowls', 'Curd rice', 'Wraps and rotis'],
    storage: 'Store in a dry cool cabinet. Use clean dry spoon.',
    shelfLife: '6 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: 'tp-vg-11',
    slug: 'cabbage-pickle',
    name: 'Cabbage Pickle',
    teluguName: 'క్యాబేజీ పచ్చడి',
    category: 'veg',
    subCategory: 'Cabbage',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.56 PM (2).jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'Finely shredded crisp cabbage tossed in mustard tempering, lemon juice, and aromatic spice masala.',
    description: 'Fresh crisp cabbage finely chopped and cured with mustard, turmeric, green chillies, and sun-warmed oil. Delivers a refreshing crunch and instant appetite appeal.',
    ingredients: [
      'Fresh Shredded Cabbage',
      'Mustard Seeds',
      'Red Chilli Powder',
      'Spices & Condiments',
      'Salt',
      'Edible Oil'
    ],
    highlights: [
      'Extra Crunchy Texture',
      'Light and Refreshing Pickle',
      'Homestyle Fresh Preparation',
      'Zero Preservatives'
    ],
    tasteProfile: 'Crisp, tangy, light and lively spices',
    spiceLevel: 'Medium',
    servingSuggestions: ['Dal rice', 'Biryani side', 'Warm phulkas'],
    storage: 'Store in a cool dry space. Refrigerate after opening.',
    shelfLife: '4 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: 'tp-vg-12',
    slug: 'mix-vegetable-pickle',
    name: 'Mix Vegetable Pickle',
    teluguName: 'మిక్స్ వెజిటబుల్ పచ్చడి',
    category: 'veg',
    subCategory: 'Mixed',
    images: [
      encodeURI('/assets/veg/WhatsApp Image 2026-09-30 at 2.46.56 PM.jpeg')
    ],
    price: 95,
    pricePlaceholder: '₹95',
    shortDescription: 'A colourful blend of cauliflower, carrots, beans, and raw mangoes drenched in traditional mustard masala.',
    description: 'The quintessential North-South fusion favorite. Selected cauliflower florets, crunchy carrots, green chillies, and green mangoes come together in a fragrant bath of crushed mustard, fenugreek, and cold-pressed oil.',
    ingredients: [
      'Assorted Garden Vegetables (Cauliflower, Carrot, Beans, Mango)',
      'Mustard Powder',
      'Red Chilli',
      'Salt',
      'Fenugreek',
      'Edible Oil',
      'Spices'
    ],
    highlights: [
      '500g Large Pantry Jar',
      'Assortment of Farm Vegetables',
      'Multi-Textured Crunch',
      'All-Time Crowd Favourite'
    ],
    tasteProfile: 'Robust, multi-textured, tangy and spicy',
    spiceLevel: 'Medium',
    servingSuggestions: ['Poori and Chhole', 'Stuffed Parathas', 'Khichdi', 'Rice and Dal'],
    storage: 'Store in a cool, dry place. Ensure a thin protective layer of oil remains on top.',
    shelfLife: '9 Months from packing',
    weightOptions: [
      { size: '250g', price: 95, pricePlaceholder: '₹95', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },

  // ===================== COMBO PACKS =====================
  {
    id: 'tp-combo-01',
    slug: 'chicken-and-prawns-pickle-combo',
    name: 'Chicken and Prawns Pickle Combo',
    teluguName: 'చికెన్ & రొయ్యల పచ్చడి కాంబో',
    category: 'combo',
    subCategory: 'Duo Pack',
    images: [
      encodeURI('/assets/combo/WhatsApp Image 2026-10-07 at 2.29.26 PM.jpeg')
    ],
    price: 625,
    pricePlaceholder: '₹625',
    shortDescription: 'The ultimate coastal and poultry duo: Andhra Boneless Chicken Pickle (250g) + Juicy Prawns Pickle (250g).',
    description: 'Experience two of our best-selling non-veg signatures together! Includes 1 jar of Boneless Chicken Pickle (250g) and 1 jar of coastal Prawns Pickle (250g), handcrafted with roasted Andhra spices, stone-ground masalas, and pure cold-pressed groundnut oil.',
    ingredients: [
      'Prime Boneless Chicken',
      'Fresh Cleaned Prawns (Royyalu)',
      'Pure Groundnut Oil',
      'Guntur Red Chillies',
      'Ginger-Garlic Paste',
      'Roasted Mustard Seeds',
      'Fenugreek',
      'Salt',
      'Aromatic Spices'
    ],
    highlights: [
      'Pack of 2 Full Jars (250g + 250g = 500g Total)',
      '100% Boneless Chicken & Cleaned De-veined Prawns',
      'Authentic Telugu Style Preparation',
      'Value Combo Discounted Price'
    ],
    tasteProfile: 'Savoury tender chicken paired with spicy, tangy coastal prawns',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Steaming hot rice with ghee', 'Biryani accompaniment', 'Crispy dosas and idlis', 'Rotis and parathas'],
    storage: 'Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening for extended freshness.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '500g (2x250g)', price: 625, pricePlaceholder: '₹625', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-combo-02',
    slug: 'prawns-and-mutton-pickle-combo',
    name: 'Prawns and Mutton Pickle Combo',
    teluguName: 'రొయ్యలు & మటన్ పచ్చడి కాంబో',
    category: 'combo',
    subCategory: 'Duo Pack',
    images: [
      encodeURI('/assets/combo/WhatsApp Image 2026-10-07 at 2.29.56 PM.jpeg')
    ],
    price: 775,
    pricePlaceholder: '₹775',
    shortDescription: 'Royal gourmet duo: Tender Boneless Mutton Pickle (250g) + succulent coastal Prawns Pickle (250g).',
    description: 'A royal feast for meat and seafood lovers! Combines 1 jar of our slow-cooked Boneless Mutton Pickle (250g) with 1 jar of fresh coastal Prawns Pickle (250g). Each jar is loaded with rich authentic masalas, curry leaves, and traditional garlic-ginger seasoning.',
    ingredients: [
      'Prime Boneless Mutton',
      'Fresh De-veined Prawns',
      'Pure Groundnut Oil',
      'Guntur Red Chilli Powder',
      'Mustard Seeds',
      'Fenugreek',
      'Fresh Garlic',
      'Ginger',
      'Sea Salt',
      'Spices'
    ],
    highlights: [
      'Pack of 2 Premium Jars (250g + 250g = 500g Total)',
      'Tender Boneless Mutton & Juicy Prawns',
      'Traditional Heritage Andhra Recipes',
      'Gourmet Value Saver Bundle'
    ],
    tasteProfile: 'Deep, earthy slow-cooked mutton harmonized with vibrant, tangy spiced prawns',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Hot rice with melted ghee', 'Mutton pulav or biryani', 'Chapati and parathas', 'Snack pairing'],
    storage: 'Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '500g (2x250g)', price: 775, pricePlaceholder: '₹775', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-combo-03',
    slug: 'chicken-and-mutton-pickle-combo',
    name: 'Chicken and Mutton Pickle Combo',
    teluguName: 'చికెన్ & మటన్ పచ్చడి కాంబో',
    category: 'combo',
    subCategory: 'Duo Pack',
    images: [
      encodeURI('/assets/combo/WhatsApp Image 2026-10-07 at 2.30.23 PM.jpeg')
    ],
    price: 700,
    pricePlaceholder: '₹700',
    shortDescription: 'The carnivore’s delight: Boneless Chicken Pickle (250g) + Boneless Mutton Pickle (250g).',
    description: 'The two undisputed champions of Telugu meat pickling in one delightful bundle! Enjoy 1 jar of tender Boneless Chicken Pickle (250g) and 1 jar of melt-in-mouth Boneless Mutton Pickle (250g). Packed with robust aromatic spices that deliver an irresistible punch.',
    ingredients: [
      'Prime Boneless Chicken',
      'Tender Boneless Mutton',
      'Cold-pressed Groundnut Oil',
      'Hand-ground Andhra Masala',
      'Guntur Chillies',
      'Ginger-Garlic',
      'Mustard Seeds',
      'Fenugreek',
      'Salt'
    ],
    highlights: [
      'Pack of 2 Meat Jars (250g + 250g = 500g Total)',
      '100% Boneless Chicken & Mutton Cuts',
      'Slow-cooked for Maximum Flavour Absorption',
      'Customer Favourite Value Pack'
    ],
    tasteProfile: 'Succulent, deeply savoury meat flavours with spicy Andhra notes',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Hot steamed rice with dollop of ghee', 'Flaky parathas', 'Dosa or idli', 'Bagara rice'],
    storage: 'Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '500g (2x250g)', price: 700, pricePlaceholder: '₹700', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-combo-04',
    slug: 'prawns-and-fish-pickle-combo',
    name: 'Prawns and Fish Pickle Combo',
    teluguName: 'రొయ్యలు & చేపల పచ్చడి కాంబో',
    category: 'combo',
    subCategory: 'Duo Pack',
    images: [
      encodeURI('/assets/combo/WhatsApp Image 2026-10-07 at 2.30.47 PM.jpeg')
    ],
    price: 625,
    pricePlaceholder: '₹625',
    shortDescription: 'Coastal seafood master-pack: Fresh Prawns Pickle (250g) + Apollo Fish Pickle (250g).',
    description: 'Celebrate the coastal heritage of Andhra Pradesh with our Seafood Special Combo! Contains 1 jar of juicy Prawns Pickle (250g) and 1 jar of succulent Apollo Fish Pickle (250g), marinated in tangy tamarind, garlic, whole mustard, and fiery red chillies.',
    ingredients: [
      'Fresh Cleaned Prawns',
      'Apollo Fish Fillets',
      'Pure Edible Oil',
      'Guntur Red Chillies',
      'Curry Leaves',
      'Garlic',
      'Mustard Seeds',
      'Fenugreek',
      'Salt',
      'Spices'
    ],
    highlights: [
      'Pack of 2 Seafood Jars (250g + 250g = 500g Total)',
      'De-veined Clean Prawns & Boneless Fish Fillets',
      'Authentic Coastal Andhra Seasoning',
      'Exceptional Seafood Value'
    ],
    tasteProfile: 'Tangy, zesty coastal spices with distinct ocean freshness and crisp bite',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Hot rice with ghee or sambar', 'Fish curry rice side', 'Crispy curd rice accompaniment', 'Snack spread'],
    storage: 'Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '500g (2x250g)', price: 625, pricePlaceholder: '₹625', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-combo-05',
    slug: 'chicken-mutton-and-prawns-pickle-combo',
    name: 'Chicken Mutton and Prawns Pickle Combo',
    teluguName: 'చికెన్, మటన్ & రొయ్యల పచ్చడి త్రిబుల్ కాంబో',
    category: 'combo',
    subCategory: 'Trio Pack',
    images: [
      encodeURI('/assets/combo/WhatsApp Image 2026-10-07 at 2.31.12 PM.jpeg')
    ],
    price: 1050,
    pricePlaceholder: '₹1,050',
    shortDescription: 'The Grand Trio Hamper: Boneless Chicken (250g) + Boneless Mutton (250g) + Prawns Pickle (250g).',
    description: 'Why choose when you can savour all three! This blockbuster 3-jar bundle delivers the ultimate non-veg feast: 1 jar of Boneless Chicken Pickle (250g), 1 jar of Boneless Mutton Pickle (250g), and 1 jar of Prawns Pickle (250g). Packed with flavour and unbeatable savings.',
    ingredients: [
      'Prime Boneless Chicken',
      'Tender Boneless Mutton',
      'Fresh Coastal Prawns',
      'Pure Groundnut Oil',
      'Guntur Red Chillies',
      'Ginger-Garlic Paste',
      'Roasted Mustard & Fenugreek',
      'Sea Salt',
      'Selected Spices'
    ],
    highlights: [
      'Pack of 3 Full-size Jars (250g x 3 = 750g Total)',
      'Chicken + Mutton + Prawns in One Bundle',
      'Big Savings Compared to Single Jars',
      'Ideal for Festive Gifting & Family Feasts'
    ],
    tasteProfile: 'A complete spectrum of tender poultry, rich mutton, and zesty seafood flavours',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Everyday gourmet dining with hot rice', 'Biryani & Pulao feasts', 'Weekend family gatherings', 'Gift hampers'],
    storage: 'Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '750g (3x250g)', price: 1050, pricePlaceholder: '₹1,050', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-combo-06',
    slug: 'chicken-mutton-prawns-and-fish-pickle-combo',
    name: 'Chicken Mutton Prawns and Fish Pickle Combo',
    teluguName: 'రాయల్ 4-ఇన్-1 నాన్-వెజ్ కాంబో (1KG)',
    category: 'combo',
    subCategory: 'Grand 4-in-1',
    images: [
      encodeURI('/assets/combo/WhatsApp Image 2026-10-07 at 2.31.44 PM.jpeg')
    ],
    price: 1325,
    pricePlaceholder: '₹1,325',
    shortDescription: 'The Complete 4-in-1 Royal Non-Veg Feast: Chicken (250g) + Mutton (250g) + Prawns (250g) + Apollo Fish (250g) — Full 1KG!',
    description: 'The pinnacle of Telugu non-veg craftsmanship! Our grand 4-jar luxury hamper brings together all 4 iconic non-veg master recipes in 250g jars: Boneless Chicken Pickle, Boneless Mutton Pickle, Prawns Pickle, and Apollo Fish Pickle. A massive 1KG feast offering the ultimate variety and highest savings.',
    ingredients: [
      'Boneless Chicken',
      'Boneless Mutton',
      'Fresh Cleaned Prawns',
      'Apollo Fish Fillets',
      'Pure Groundnut Oil',
      'Guntur Red Chillies',
      'Ginger-Garlic Paste',
      'Roasted Mustard Seeds',
      'Fenugreek',
      'Curry Leaves',
      'Sea Salt',
      'Artisanal Spices'
    ],
    highlights: [
      'Grand 4-Jar Hamper (4 x 250g = 1KG Full Weight)',
      'All 4 Iconic Non-Veg Varieties Included',
      'Maximum Value Savings',
      'Perfect Gift for Non-Veg Lovers & Foodies'
    ],
    tasteProfile: 'The grand tour of authentic Andhra non-veg pickles: fiery, robust, aromatic, and deeply satisfying',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Grand family banquets', 'Premium gifting for festivals and celebrations', 'Ultimate dining table centerpiece with rice, ghee, and parathas'],
    storage: 'Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening for extended freshness.',
    shelfLife: '3 Months from packing',
    weightOptions: [
      { size: '1kg (4x250g)', price: 1325, pricePlaceholder: '₹1,325', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  // ===================== KHARAM PODI (6 VARIETIES) =====================
  {
    id: 'tp-kp-01',
    slug: 'nalla-karam-podi',
    name: 'Nalla Karam',
    teluguName: 'నల్ల కారం',
    category: 'kharam-podi',
    subCategory: 'Podi',
    images: [
      encodeURI('/assets/kharam podi/WhatsApp Image 2026-10-24 at 2.34.30 PM.jpeg')
    ],
    price: 80,
    originalPrice: 99,
    pricePlaceholder: '₹80',
    shortDescription: 'Authentic Andhra style Nalla Karam Podi, hand-crafted with dry-roasted chillies, garlic, coriander seeds, and traditional stone-ground spices.',
    description: 'TastyPickle authentic Nalla Karam is a legendary Andhra podi crafted following time-tested kitchen traditions. Made from superior quality dry red chillies, fragrant coriander seeds, cumin, garlic, and lentils slow-roasted to dark aromatic perfection and coarsely ground. Ideal companion for piping hot rice, idlis, dosas, and upma paired with a generous spoonful of pure ghee.',
    ingredients: [
      'Dry Red Chillies',
      'Coriander Seeds (Dhania)',
      'Cumin Seeds (Jeera)',
      'Garlic Cloves',
      'Curry Leaves',
      'Urad Dal & Chana Dal',
      'Tamarind',
      'Rock Salt',
      'Edible Oil'
    ],
    highlights: [
      '100% Homemade Traditional Andhra Recipe',
      'Coarsely Ground for Maximum Texture & Aroma',
      'No Added Artificial Flavours or Preservatives',
      'Rich Garlic & Roasted Spice Punch'
    ],
    tasteProfile: 'Fiery, pungent, aromatic with a deep roasted garlic and earthy spice undertone',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Piping hot rice with pure desi ghee', 'Hot fluffy idlis', 'Crispy dosas and pesrattu', 'Upma and Pongal'],
    storage: 'Store in an airtight container in a cool, dry place. Use a dry spoon. Keep away from moisture.',
    shelfLife: '4 Months from packing',
    weightOptions: [
      { size: '100g', price: 80, pricePlaceholder: '₹80', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-kp-02',
    slug: 'palli-karam-podi',
    name: 'Palli Karam',
    teluguName: 'పల్లీ కారం',
    category: 'kharam-podi',
    subCategory: 'Podi',
    images: [
      encodeURI('/assets/kharam podi/WhatsApp Image 2026-10-24 at 2.34.30 PM (1).jpeg')
    ],
    price: 80,
    originalPrice: 99,
    pricePlaceholder: '₹80',
    shortDescription: 'Roasted peanut podi infused with dry red chillies, garlic, and cumin. Crunchy, nutty, and irresistibly aromatic.',
    description: 'TastyPickle Palli Karam (Peanut Podi) is prepared with premium slow-roasted peanuts, dry red chillies, garlic, and traditional South Indian spices. Crunchy, nutty, and mildly fiery, it adds an irresistible nutty flavour to hot idlis, crispy dosas, and steamed white rice with ghee.',
    ingredients: [
      'Roasted Peanuts (Groundnuts)',
      'Dry Red Chillies',
      'Garlic Cloves',
      'Cumin Seeds',
      'Curry Leaves',
      'Rock Salt',
      'Edible Oil'
    ],
    highlights: [
      '100% Natural Slow-Roasted Peanuts',
      'Rich in Plant Protein & Healthy Fats',
      'No Preservatives Added',
      'Nutty, Crunchy & Perfectly Spiced'
    ],
    tasteProfile: 'Nutty, savory, crunchy with roasted peanut richness and a warm chili kick',
    spiceLevel: 'Medium',
    servingSuggestions: ['Hot ghee rice', 'Dosas and idlis', 'Uttappam topping', 'Paratha sprinkle'],
    storage: 'Store in an airtight container in a cool, dry place. Use a dry spoon.',
    shelfLife: '4 Months from packing',
    weightOptions: [
      { size: '100g', price: 80, pricePlaceholder: '₹80', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-kp-03',
    slug: 'nuvvula-karam-podi',
    name: 'Nuvvula Karam',
    teluguName: 'నువ్వుల కారం',
    category: 'kharam-podi',
    subCategory: 'Podi',
    images: [
      encodeURI('/assets/kharam podi/WhatsApp Image 2026-10-24 at 2.34.30 PM (2).jpeg')
    ],
    price: 80,
    originalPrice: 99,
    pricePlaceholder: '₹80',
    shortDescription: 'Traditional sesame seed podi crafted with roasted white sesame, red chillies, and garlic. Rich in aroma and calcium.',
    description: 'TastyPickle Nuvvula Karam (Sesame Seed Podi) is made from nutrient-rich white sesame seeds dry-roasted until popping and fragrant, blended with sun-dried red chillies and garlic. Packed with earthy aroma, natural calcium, and rich nutty warmth.',
    ingredients: [
      'Dry Roasted White Sesame Seeds (Til)',
      'Dry Red Chillies',
      'Garlic',
      'Cumin Seeds',
      'Curry Leaves',
      'Salt'
    ],
    highlights: [
      '100% Pure Sesame Seeds',
      'Rich in Calcium & Natural Minerals',
      'Authentic Telangana & Andhra Recipe',
      'Zero Preservatives'
    ],
    tasteProfile: 'Earthy, deeply nutty, warm, and aromatic with balanced chili spice',
    spiceLevel: 'Medium',
    servingSuggestions: ['Hot rice with melted ghee', 'Ragi Sankati side', 'Idli and dosa spread'],
    storage: 'Store in an airtight container in a cool, dry place. Keep away from moisture.',
    shelfLife: '4 Months from packing',
    weightOptions: [
      { size: '100g', price: 80, pricePlaceholder: '₹80', isPopular: true }
    ],
    featured: true,
    bestSeller: false
  },
  {
    id: 'tp-kp-04',
    slug: 'karivepaku-karam-podi',
    name: 'Karivepaku Karam',
    teluguName: 'కరివేపాకు కారం',
    category: 'kharam-podi',
    subCategory: 'Podi',
    images: [
      encodeURI('/assets/kharam podi/WhatsApp Image 2026-10-24 at 2.34.31 PM.jpeg')
    ],
    price: 80,
    originalPrice: 99,
    pricePlaceholder: '₹80',
    shortDescription: 'Authentic curry leaf podi prepared from fresh sun-dried curry leaves, roasted lentils, and Guntur chillies.',
    description: 'TastyPickle Karivepaku Karam (Curry Leaf Podi) is made from fresh, carefully washed and sun-dried organic curry leaves slow-roasted with roasted lentils, cumin, and fiery Guntur chillies. Renowned for its intense herbal aroma and exceptional digestive benefits.',
    ingredients: [
      'Fresh Sun-Dried Curry Leaves',
      'Dry Red Chillies',
      'Urad Dal & Chana Dal',
      'Coriander Seeds',
      'Cumin Seeds',
      'Garlic',
      'Tamarind',
      'Salt'
    ],
    highlights: [
      'Loaded with Fresh Curry Leaf Goodness',
      'Natural Source of Iron & Antioxidants',
      'Heirloom Village Recipe',
      'No Artificial Additives'
    ],
    tasteProfile: 'Intense herbal curry leaf aroma, tangy tamarind notes, and deep roasted spice warmth',
    spiceLevel: 'Medium',
    servingSuggestions: ['Hot rice with ghee', 'Fluffy idlis', 'Upma and Pongal', 'Buttermilk sprinkle'],
    storage: 'Store in a cool, dry place in an airtight jar.',
    shelfLife: '4 Months from packing',
    weightOptions: [
      { size: '100g', price: 80, pricePlaceholder: '₹80', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-kp-05',
    slug: 'idly-karam-podi',
    name: 'Idly Karam',
    teluguName: 'ఇడ్లీ కారం',
    category: 'kharam-podi',
    subCategory: 'Podi',
    images: [
      encodeURI('/assets/kharam podi/WhatsApp Image 2026-10-24 at 2.34.31 PM (1).jpeg')
    ],
    price: 80,
    originalPrice: 99,
    pricePlaceholder: '₹80',
    shortDescription: 'The classic South Indian gunpowder podi! Perfectly roasted lentils and chillies for dipping idlis and dosas.',
    description: 'The iconic South Indian breakfast essential! TastyPickle Idly Karam (Gunpowder) is a perfectly balanced coarsely ground blend of roasted chana dal, urad dal, red chillies, and asafoetida. Mix with melted ghee or gingelly oil for the ultimate soft idli and crispy dosa accompaniment.',
    ingredients: [
      'Roasted Chana Dal',
      'Roasted Urad Dal',
      'Dry Red Chillies',
      'Sesame Seeds',
      'Curry Leaves',
      'Hing (Asafoetida)',
      'Salt'
    ],
    highlights: [
      'Classic Tiffin Style Gunpowder',
      'Coarse Crunchy Texture',
      'Irresistible Ghee Pairing',
      '100% Vegetarian & Natural'
    ],
    tasteProfile: 'Crisp roasted lentil crunch with savory warmth and gentle hing aroma',
    spiceLevel: 'Medium',
    servingSuggestions: ['Steaming idlis with desi ghee', 'Ghee roast dosas', 'Crispy uttapams'],
    storage: 'Store in an airtight jar in a cool, dry place. Use a dry spoon.',
    shelfLife: '4 Months from packing',
    weightOptions: [
      { size: '100g', price: 80, pricePlaceholder: '₹80', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'tp-kp-06',
    slug: 'vellulli-karam-podi',
    name: 'Vellulli Karam',
    teluguName: 'వెల్లుల్లి కారం',
    category: 'kharam-podi',
    subCategory: 'Podi',
    images: [
      encodeURI('/assets/kharam podi/WhatsApp Image 2026-10-24 at 2.34.32 PM.jpeg')
    ],
    price: 80,
    originalPrice: 99,
    pricePlaceholder: '₹80',
    shortDescription: 'Pungent, fiery garlic podi made with generous heaps of desi garlic, red chillies, cumin, and rock salt.',
    description: 'For garlic lovers! TastyPickle Vellulli Karam is an intensely aromatic, spicy garlic podi made with generous heaps of freshly crushed desi garlic cloves, fiery Guntur chillies, cumin seeds, and rock salt. Enhances curries, fries, and tastes heavenly with hot rice and ghee.',
    ingredients: [
      'Fresh Desi Garlic Cloves',
      'Guntur Red Chillies',
      'Cumin Seeds (Jeera)',
      'Curry Leaves',
      'Rock Salt',
      'Cold Pressed Oil'
    ],
    highlights: [
      'Intense Fresh Garlic Flavour',
      'Slow-Pounded Rustic Texture',
      'Great for Curries, Fries & Rice',
      'No Added Preservatives'
    ],
    tasteProfile: 'Robust, pungent roasted garlic punch with bold chili fire',
    spiceLevel: 'Spicy',
    servingSuggestions: ['Piping hot rice with ghee', 'Curry and stir-fry seasoning', 'Crispy potato fry sprinkle'],
    storage: 'Store in an airtight container in a cool, dry place.',
    shelfLife: '4 Months from packing',
    weightOptions: [
      { size: '100g', price: 80, pricePlaceholder: '₹80', isPopular: true }
    ],
    featured: true,
    bestSeller: true
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(p => p.category === category);
};

export const getRelatedProducts = (currentProduct: Product, limit: number = 4): Product[] => {
  // First match same category, excluding current product
  const sameCategory = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherCategory = products.filter(p => p.category !== currentProduct.category);
  return [...sameCategory, ...otherCategory].slice(0, limit);
};
