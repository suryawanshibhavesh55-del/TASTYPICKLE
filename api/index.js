// server/index.ts
import express2 from "express";
import cors from "cors";
import dotenv4 from "dotenv";

// server/db.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
var MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn("WARNING: MONGODB_URI is not defined in environment variables.");
}
var cachedConnection = global.mongooseConnection;
if (!cachedConnection) {
  cachedConnection = global.mongooseConnection = null;
}
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable in Vercel settings.");
  }
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }
  if (!cachedConnection) {
    cachedConnection = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 6e3,
      connectTimeoutMS: 6e3
    });
    global.mongooseConnection = cachedConnection;
  }
  try {
    const conn = await cachedConnection;
    console.log(`[MongoDB] Connected to database: ${conn.connection.name}`);
    return conn;
  } catch (err) {
    global.mongooseConnection = null;
    cachedConnection = null;
    console.error("[MongoDB] Connection error:", err);
    throw err;
  }
}

// server/models/Product.ts
import mongoose2, { Schema } from "mongoose";

// server/data/products.ts
var products = [
  // ===================== NON-VEG PICKLES =====================
  {
    id: "tp-nv-01",
    slug: "boneless-chicken-pickle",
    name: "Boneless Chicken Pickle",
    teluguName: "\u0C1A\u0C3F\u0C15\u0C46\u0C28\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "non-veg",
    subCategory: "Chicken",
    images: [
      encodeURI("/assets/non veg/WhatsApp Image 2026-09-30 at 2.43.37 PM.jpeg")
    ],
    price: 275,
    pricePlaceholder: "\u20B9275",
    shortDescription: "Tender juicy boneless chicken morsels cooked to perfection in aromatic Andhra spices and pure edible oils.",
    description: "Our signature Boneless Chicken Pickle is slow-cooked using prime tender chicken cuts, infused with roasted fenugreek seeds, fragrant spices, and a dash of vinegar for a robust, tangy, and savoury punch that elevates any meal.",
    ingredients: [
      "Prime Boneless Chicken",
      "Edible Oils",
      "Hand-ground Spices",
      "Fenugreek Seeds",
      "Salt",
      "Vinegar",
      "Condiments"
    ],
    highlights: [
      "100% Tender Boneless Chicken",
      "Traditional Andhra Style Preparation",
      "No Artificial Additives",
      "Packed with Authentic Spices"
    ],
    tasteProfile: "Rich, savoury, spicy with a pleasant aromatic tanginess",
    spiceLevel: "Spicy",
    servingSuggestions: ["Steaming hot white rice with ghee", "Crispy dosas", "Hot rotis or parathas", "Biryani side"],
    storage: "Store in a cool, dry place. Use a clean, dry spoon. Refrigeration extends freshness naturally.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "250g", price: 275, pricePlaceholder: "\u20B9275", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-nv-02",
    slug: "gongura-chicken-pickle",
    name: "Gongura Chicken Pickle",
    teluguName: "\u0C17\u0C4B\u0C02\u0C17\u0C42\u0C30 \u0C1A\u0C3F\u0C15\u0C46\u0C28\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "non-veg",
    subCategory: "Chicken",
    images: [
      encodeURI("/assets/non veg/WhatsApp Image 2026-09-30 at 2.43.59 PM.jpeg")
    ],
    price: 275,
    pricePlaceholder: "\u20B9275",
    shortDescription: "Fresh sour gongura (sorrel leaves) combined with succulent chicken pieces and traditional stone-ground masalas.",
    description: "A celebrated Telugu culinary masterpiece. Freshly picked gongura leaves are slowly saut\xE9ed and amalgamated with tender chicken, red chillies, crushed garlic, and whole mustard seeds for an unforgettable tart and fiery flavour profile.",
    ingredients: [
      "Boneless Chicken",
      "Fresh Gongura (Sorrel Leaves)",
      "Red Chilli",
      "Garlic",
      "Mustard Seeds",
      "Ground Spices",
      "Edible Oil",
      "Salt"
    ],
    highlights: [
      "Authentic Sour Sorrel Leaf Base",
      "Slow-Cooked Meat",
      "Rich in Iron and Flavours",
      "Heirloom Village Recipe"
    ],
    tasteProfile: "Distinctively tangy, herbal, and spicy",
    spiceLevel: "Spicy",
    servingSuggestions: ["Plain steamed rice with melted ghee", "Ragi sankati", "Warm flatbreads"],
    storage: "Store in a cool, dry place. Refrigeration preserves the fresh gongura aroma.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "250g", price: 275, pricePlaceholder: "\u20B9275", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-nv-03",
    slug: "prawns-pickle",
    name: "Prawns Pickle",
    teluguName: "\u0C30\u0C4A\u0C2F\u0C4D\u0C2F\u0C32 \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "non-veg",
    subCategory: "Prawns",
    images: [
      encodeURI("/assets/non veg/WhatsApp Image 2026-09-30 at 2.44.12 PM.jpeg")
    ],
    price: 350,
    pricePlaceholder: "\u20B9350",
    shortDescription: "Fresh coastal prawns gently fried and preserved in a rich, deeply aromatic spice blend and seasoned oil.",
    description: "Crafted with premium cleaned coastal prawns, crisped to the right bite and blended into a fragrant medley of ginger, garlic, toasted mustard, and aromatic spices. An absolute must-have for seafood enthusiasts.",
    ingredients: [
      "Cleaned Fresh Prawns",
      "Red Chilli Powder",
      "Ginger & Garlic Paste",
      "Mustard Seeds",
      "Edible Oil",
      "Fenugreek Powder",
      "Salt & Spices"
    ],
    highlights: [
      "Premium Coastal Quality Prawns",
      "Authentic Coastal Masala Recipe",
      "Tender yet Firm Texture",
      "Rich Seafood Umami"
    ],
    tasteProfile: "Bold coastal spice with deep seafood sweetness",
    spiceLevel: "Spicy",
    servingSuggestions: ["Ghee rice", "Jeera rice", "Curd rice", "Appams"],
    storage: "Store in a cool, dry place. Always use a clean dry spoon. Refrigerate after opening.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "250g", price: 350, pricePlaceholder: "\u20B9350", isPopular: true }
    ],
    featured: true,
    bestSeller: false
  },
  {
    id: "tp-nv-04",
    slug: "boneless-mutton-pickle",
    name: "Boneless Mutton Pickle",
    teluguName: "\u0C2E\u0C1F\u0C28\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "non-veg",
    subCategory: "Mutton",
    images: [
      encodeURI("/assets/non veg/WhatsApp Image 2026-09-30 at 2.44.36 PM.jpeg")
    ],
    price: 425,
    pricePlaceholder: "\u20B9425",
    shortDescription: "Tender boneless mutton slow-cooked in pure groundnut oil with zero preservatives and authentic Indian spices.",
    description: "Prepared using traditional slow-braising methods. Selected cuts of boneless mutton are cooked with groundnut oil, freshly roasted spices, ginger, and garlic. Made strictly without preservatives, artificial colours, or acidity regulators.",
    ingredients: [
      "Selected Boneless Mutton",
      "Pure Cold-Pressed Groundnut Oil",
      "Red Chilli",
      "Fresh Garlic & Ginger",
      "Fenugreek & Mustard",
      "Salt & Condiments"
    ],
    highlights: [
      "Made with 100% Pure Groundnut Oil",
      "No Preservatives or Artificial Colours",
      "No Acidity Regulators",
      "Rich Royal Taste"
    ],
    tasteProfile: "Deeply savoury, robust meat flavours with warming spice",
    spiceLevel: "Extra Spicy",
    servingSuggestions: ["Basmati rice with a dollop of ghee", "Flaky parathas", "Phulkas"],
    storage: "Store in a cool, dry place. Keep container tightly sealed.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "250g", price: 425, pricePlaceholder: "\u20B9425", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-nv-05",
    slug: "apollo-fish-pickle",
    name: "Apollo Fish Pickle",
    teluguName: "\u0C05\u0C2A\u0C4B\u0C32\u0C4B \u0C2B\u0C3F\u0C37\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "non-veg",
    subCategory: "Fish",
    images: [
      encodeURI("/assets/non veg/WhatsApp Image 2026-09-30 at 2.44.51 PM.jpeg")
    ],
    price: 275,
    pricePlaceholder: "\u20B9275",
    shortDescription: "Fresh fish fillets cured with garlic, mustard, fenugreek, and red chillies in fragrant edible oils.",
    description: "Featuring firm, delicate fish fillets seasoned with our signature spice mixture, toasted whole spices, and fragrant oil. Every jar captures coastal indulgence with balanced heat and homestyle integrity.",
    ingredients: [
      "Selected Fresh Fish Fillets",
      "Red Chilly Powder",
      "Salt",
      "Garlic",
      "Mustard Seeds",
      "Fenugreek Seeds",
      "Edible Oil"
    ],
    highlights: [
      "Firm & Flavorful Fish Morsels",
      "100% Homemade Preparation",
      "Rich in Coastal Spices",
      "Hygienically Packed"
    ],
    tasteProfile: "Tangy, pungent garlic notes, warm coastal spice",
    spiceLevel: "Spicy",
    servingSuggestions: ["South Indian curd rice", "Hot steamed rice", "Pulao"],
    storage: "Store in a cool, dry place away from direct sunlight. Refrigeration recommended.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "250g", price: 275, pricePlaceholder: "\u20B9275", isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  // ===================== VEG PICKLES =====================
  {
    id: "tp-vg-01",
    slug: "mango-pickle",
    name: "Mango Pickle (Avakaya)",
    teluguName: "\u0C06\u0C35\u0C15\u0C3E\u0C2F",
    category: "veg",
    subCategory: "Mango",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.52 PM.jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "The king of Indian pickles \u2014 crisp raw green mangoes infused with pungent mustard, garlic, and fiery red chillies.",
    description: "Authentic Andhra Avakaya prepared strictly in the traditional way. Hand-cut raw sour mango pieces with hard shells intact are marinated with pungent ground mustard (aava pindi), sun-dried Guntur chillies, garlic, and cold-pressed oil.",
    ingredients: [
      "Raw Green Mango",
      "Mustard Powder",
      "Red Chilli",
      "Salt",
      "Garlic",
      "Fenugreek",
      "Ground Spices",
      "Edible Oil"
    ],
    highlights: [
      "Authentic Andhra Avakaya Style",
      "Crisp Raw Green Mango Cubes",
      "Pungent Mustard Kick",
      "Zero Artificial Preservatives"
    ],
    tasteProfile: "Boldly tangy, pungent mustard heat, deeply comforting",
    spiceLevel: "Spicy",
    servingSuggestions: ["Hot rice with ghee and mudda pappu (dal)", "Upma", "Curd rice"],
    storage: "Store in a cool, dry location. Always use a dry wooden or steel spoon.",
    shelfLife: "12 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-vg-02",
    slug: "tomato-pickle",
    name: "Tomato Pickle",
    teluguName: "\u0C1F\u0C4A\u0C2E\u0C3E\u0C1F\u0C4B \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Tomato",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM (1).jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Sun-ripened farm tomatoes slow-reduced with tamarind, fenugreek, garlic, and pure groundnut oil.",
    description: "Juicy ripe tomatoes are gently simmered until thick and luscious, then blended with toasted fenugreek, mustard, red chilli, and a fragrant garlic tempering. Pairs seamlessly with both breakfast tiffins and full meals.",
    ingredients: [
      "Farm Fresh Tomatoes",
      "Red Chilli",
      "Mustard Seeds",
      "Fenugreek",
      "Ground Spices",
      "Groundnut Oil",
      "Salt"
    ],
    highlights: [
      "Farm Fresh Ripe Tomatoes",
      "Slow-Cooked Reduction",
      "Perfect Tiffin Companion",
      "Homestyle Tempering"
    ],
    tasteProfile: "Pleasantly tangy, mildly sweet undertones with spicy garlic warmth",
    spiceLevel: "Medium",
    servingSuggestions: ["Idli and Dosa", "Hot rice with ghee", "Parathas and sandwiches"],
    storage: "Store in a cool, dry place. Keep container tightly closed.",
    shelfLife: "6 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: true,
    bestSeller: false
  },
  {
    id: "tp-vg-03",
    slug: "lemon-pickle",
    name: "Lemon Pickle",
    teluguName: "\u0C28\u0C3F\u0C2E\u0C4D\u0C2E\u0C15\u0C3E\u0C2F \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Lemon",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM (2).jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Juicy yellow lemons cured naturally in their own juices with red chillies, mustard, and groundnut oil.",
    description: "Thin-skinned juicy lemons cured patiently to tenderize the peel naturally. Infused with coarse salt, roasted fenugreek powder, and aromatic groundnut oil for that timeless zing that refreshes your palate.",
    ingredients: [
      "Fresh Yellow Lemons",
      "Red Chilli",
      "Mustard Seeds",
      "Fenugreek",
      "Ground Spices",
      "Pure Groundnut Oil",
      "Salt"
    ],
    highlights: [
      "Naturally Cured Thin-Skin Lemons",
      "Rich in Citrus Zing",
      "Traditional Sun-Cured Recipe",
      "Aids Natural Palate Cleansing"
    ],
    tasteProfile: "Sharp, vibrant citrus acidity with warming spices",
    spiceLevel: "Medium",
    servingSuggestions: ["Curd rice", "Khichdi", "Dal chawal", "Theplas"],
    storage: "Keep in a dry environment. Ensure oil layer remains over the surface.",
    shelfLife: "12 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: false,
    bestSeller: true
  },
  {
    id: "tp-vg-04",
    slug: "red-chilli-pickle",
    name: "Red Chilli Pickle (Pandu Mirapa)",
    teluguName: "\u0C2A\u0C02\u0C21\u0C41 \u0C2E\u0C3F\u0C30\u0C2A \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Chilli",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM (3).jpeg"),
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.55 PM.jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Ripe red chillies stone-ground with tamarind, garlic, and spices for an intensely bold Andhra experience.",
    description: "Made from handpicked fresh crimson ripe chillies (Pandu Mirapakayalu) ground with aged tamarind and garlic cloves. A fiery, flavourful classic of Andhra households that delivers unmistakable pungency and aroma.",
    ingredients: [
      "Fresh Red Ripe Chillies",
      "Mustard Seeds",
      "Fenugreek Seeds",
      "Salt",
      "Garlic",
      "Spices & Condiments",
      "Edible Oil"
    ],
    highlights: [
      "Available in 250g and 500g Glass Jars",
      "Authentic Pandu Mirapa Recipe",
      "Fiery Red Colour Naturally",
      "Rich Garlic Infusion"
    ],
    tasteProfile: "Intensely spicy, deep tamarind tang, garlicky warmth",
    spiceLevel: "Extra Spicy",
    servingSuggestions: ["Warm rice with cow ghee", "Idli, vada, and dosa", "Crispy rotis"],
    storage: "Store in a cool dry cupboard. Avoid introducing moisture.",
    shelfLife: "9 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-vg-05",
    slug: "gongura-pickle",
    name: "Gongura Pickle",
    teluguName: "\u0C17\u0C4B\u0C02\u0C17\u0C42\u0C30 \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Gongura",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.53 PM.jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "The pride of Andhra Pradesh \u2014 tart sorrel leaves cooked with red chillies, garlic, and groundnut oil.",
    description: 'Often called "Andhra Matha", Gongura is an indispensable culinary staple. Fresh red-stem sorrel leaves are gently saut\xE9ed and spiced with roasted coriander, fenugreek, mustard, and garlic cloves.',
    ingredients: [
      "Raw Fresh Gongura Leaves",
      "Chilli Powder",
      "Mustard Seeds",
      "Fenugreek",
      "Spices",
      "Groundnut Oil",
      "Salt"
    ],
    highlights: [
      "Authentic Andhra Gongura",
      "Tangy Sorrel Leaf Texture",
      "Rich in Minerals",
      "Traditional Heritage Recipe"
    ],
    tasteProfile: "Tart, earthy, spicy and aromatic",
    spiceLevel: "Spicy",
    servingSuggestions: ["Steamed rice with raw onions and ghee", "Sambar rice", "Rotis"],
    storage: "Store in a cool, dry place. Use dry spoon only.",
    shelfLife: "9 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-vg-06",
    slug: "bitter-gourd-pickle",
    name: "Bitter Gourd Pickle",
    teluguName: "\u0C15\u0C3E\u0C15\u0C30\u0C15\u0C3E\u0C2F \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Bitter Gourd",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.54 PM (1).jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Crisp bitter gourd roundels expertly seasoned with tamarind, spices, and mustard to balance natural bitterness.",
    description: "Carefully sliced bitter gourds (Karela) are seasoned with sour tamarind and roasted spices that soften the bitterness into an appetizing, complex savoury pickle with satisfying crunch.",
    ingredients: [
      "Fresh Bitter Gourd",
      "Mustard Seeds",
      "Spices & Condiments",
      "Edible Oil",
      "Salt",
      "Tamarind"
    ],
    highlights: [
      "Perfect Harmony of Bitter & Tangy",
      "Crisp Bite in Every Spoon",
      "Traditional Digestive Tonic Recipe",
      "Homemade Style"
    ],
    tasteProfile: "Subtle pleasant bitterness balanced with tangy, spicy notes",
    spiceLevel: "Medium",
    servingSuggestions: ["Plain rice with ghee", "Curd rice", "Phulkas"],
    storage: "Store in an airtight container in a cool dry space.",
    shelfLife: "6 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: "tp-vg-07",
    slug: "amla-pickle",
    name: "Amla Pickle",
    teluguName: "\u0C09\u0C38\u0C3F\u0C30\u0C3F\u0C15\u0C3E\u0C2F \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Amla",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.54 PM (2).jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Whole Indian gooseberries steeped in cold-pressed oil, mustard, and fragrant spices.",
    description: "Whole plump Amla (Usirikaya) steeped in spiced oil until thoroughly softened and infused. Celebrated across Indian households for its unique tart-astringent profile and rich taste.",
    ingredients: [
      "Fresh Amla (Gooseberry)",
      "Red Chilli",
      "Mustard",
      "Fenugreek",
      "Salt",
      "Spices & Condiments",
      "Edible Oil"
    ],
    highlights: [
      "Whole Indian Gooseberries",
      "Traditional Usirikaya Flavours",
      "Rich Homestyle Marination",
      "Zero Chemical Additives"
    ],
    tasteProfile: "Tangy, slightly astringent, deeply spiced",
    spiceLevel: "Medium",
    servingSuggestions: ["Dal chawal", "Curd rice", "Khichdi"],
    storage: "Store in a cool dry cupboard. Refrigerate after opening.",
    shelfLife: "12 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: "tp-vg-08",
    slug: "ginger-pickle",
    name: "Ginger Pickle (Allam)",
    teluguName: "\u0C05\u0C32\u0C4D\u0C32\u0C02 \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Ginger",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.54 PM.jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Fresh aromatic ginger roots ground with tamarind, jaggery, and red chillies for sweet-spicy perfection.",
    description: "The iconic South Indian Allam Pachadi. Freshly peeled ginger roots are crushed with tamarind pulp, organic jaggery, and fragrant spices, creating an irresistible sweet, sour, and fiery symphony.",
    ingredients: [
      "Fresh Ginger Root",
      "Red Chilli",
      "Mustard Seeds",
      "Fenugreek",
      "Salt",
      "Spices and Condiments",
      "Edible Oil"
    ],
    highlights: [
      "Freshly Peeled Ginger Roots",
      "Classic Pesarattu & Dosa Pairing",
      "Zesty and Warming",
      "Authentic Recipe"
    ],
    tasteProfile: "Zesty ginger warmth, sweet-tangy tamarind balance",
    spiceLevel: "Medium",
    servingSuggestions: ["Pesarattu", "Ghee Roast Dosa", "Rice with dal", "Upma"],
    storage: "Keep in a cool dry place. Keep spoon dry.",
    shelfLife: "6 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: true,
    bestSeller: false
  },
  {
    id: "tp-vg-09",
    slug: "garlic-pickle",
    name: "Garlic Pickle",
    teluguName: "\u0C35\u0C46\u0C32\u0C4D\u0C32\u0C41\u0C32\u0C4D\u0C32\u0C3F \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Garlic",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.55 PM (1).jpeg")
    ],
    price: 115,
    pricePlaceholder: "\u20B9115",
    shortDescription: "Whole peeled garlic cloves saut\xE9ed gently and preserved in rich spiced oil with roasted mustard seeds.",
    description: "Generous whole garlic cloves simmered until mellow and soft, then steeped in roasted fenugreek, mustard, red chilli, and pure groundnut oil. A punchy pickle that garlic lovers adore.",
    ingredients: [
      "Whole Peeled Garlic Cloves",
      "Red Chilli Powder",
      "Mustard Seeds",
      "Fenugreek",
      "Salt",
      "Edible Groundnut Oil",
      "Spices"
    ],
    highlights: [
      "Loaded with Whole Garlic Cloves",
      "Robust Pungent Aroma",
      "Mellow Melt-in-Mouth Texture",
      "Cold-Pressed Oil Base"
    ],
    tasteProfile: "Deep garlic umami, spicy, pungent and aromatic",
    spiceLevel: "Spicy",
    servingSuggestions: ["Parathas", "Jeera rice", "Roti sabzi", "Curd rice"],
    storage: "Store in a cool dry place. Stir occasionally with a dry spoon.",
    shelfLife: "9 Months from packing",
    weightOptions: [
      { size: "250g", price: 115, pricePlaceholder: "\u20B9115", isPopular: true }
    ],
    featured: false,
    bestSeller: true
  },
  {
    id: "tp-vg-10",
    slug: "beetroot-pickle",
    name: "Beetroot Pickle",
    teluguName: "\u0C2C\u0C40\u0C1F\u0C4D\u200C\u0C30\u0C42\u0C1F\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Beetroot",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.56 PM (1).jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Tender ruby-red beetroot cubes pickled in sun-dried spices and mustard oil for earthy vibrancy.",
    description: "An innovative homestyle delicacy. Hand-diced tender beetroots paired with freshly crushed spices and tangy notes for a wonderfully balanced crunch with natural earthy sweetness.",
    ingredients: [
      "Fresh Beetroots",
      "Red Chilli Powder",
      "Mustard Seeds",
      "Fenugreek",
      "Salt",
      "Spices and Condiments",
      "Edible Oil"
    ],
    highlights: [
      "Farm Fresh Crunchy Beetroots",
      "Vibrant Natural Ruby Colour",
      "Unique Sweet-Tangy-Spicy Balance",
      "Modern Artisanal Twist"
    ],
    tasteProfile: "Earthy sweetness meets lively pickle spices and tang",
    spiceLevel: "Medium",
    servingSuggestions: ["Rice bowls", "Curd rice", "Wraps and rotis"],
    storage: "Store in a dry cool cabinet. Use clean dry spoon.",
    shelfLife: "6 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: "tp-vg-11",
    slug: "cabbage-pickle",
    name: "Cabbage Pickle",
    teluguName: "\u0C15\u0C4D\u0C2F\u0C3E\u0C2C\u0C47\u0C1C\u0C40 \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Cabbage",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.56 PM (2).jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "Finely shredded crisp cabbage tossed in mustard tempering, lemon juice, and aromatic spice masala.",
    description: "Fresh crisp cabbage finely chopped and cured with mustard, turmeric, green chillies, and sun-warmed oil. Delivers a refreshing crunch and instant appetite appeal.",
    ingredients: [
      "Fresh Shredded Cabbage",
      "Mustard Seeds",
      "Red Chilli Powder",
      "Spices & Condiments",
      "Salt",
      "Edible Oil"
    ],
    highlights: [
      "Extra Crunchy Texture",
      "Light and Refreshing Pickle",
      "Homestyle Fresh Preparation",
      "Zero Preservatives"
    ],
    tasteProfile: "Crisp, tangy, light and lively spices",
    spiceLevel: "Medium",
    servingSuggestions: ["Dal rice", "Biryani side", "Warm phulkas"],
    storage: "Store in a cool dry space. Refrigerate after opening.",
    shelfLife: "4 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: false,
    bestSeller: false
  },
  {
    id: "tp-vg-12",
    slug: "mix-vegetable-pickle",
    name: "Mix Vegetable Pickle",
    teluguName: "\u0C2E\u0C3F\u0C15\u0C4D\u0C38\u0C4D \u0C35\u0C46\u0C1C\u0C3F\u0C1F\u0C2C\u0C41\u0C32\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F",
    category: "veg",
    subCategory: "Mixed",
    images: [
      encodeURI("/assets/veg/WhatsApp Image 2026-09-30 at 2.46.56 PM.jpeg")
    ],
    price: 95,
    pricePlaceholder: "\u20B995",
    shortDescription: "A colourful blend of cauliflower, carrots, beans, and raw mangoes drenched in traditional mustard masala.",
    description: "The quintessential North-South fusion favorite. Selected cauliflower florets, crunchy carrots, green chillies, and green mangoes come together in a fragrant bath of crushed mustard, fenugreek, and cold-pressed oil.",
    ingredients: [
      "Assorted Garden Vegetables (Cauliflower, Carrot, Beans, Mango)",
      "Mustard Powder",
      "Red Chilli",
      "Salt",
      "Fenugreek",
      "Edible Oil",
      "Spices"
    ],
    highlights: [
      "500g Large Pantry Jar",
      "Assortment of Farm Vegetables",
      "Multi-Textured Crunch",
      "All-Time Crowd Favourite"
    ],
    tasteProfile: "Robust, multi-textured, tangy and spicy",
    spiceLevel: "Medium",
    servingSuggestions: ["Poori and Chhole", "Stuffed Parathas", "Khichdi", "Rice and Dal"],
    storage: "Store in a cool, dry place. Ensure a thin protective layer of oil remains on top.",
    shelfLife: "9 Months from packing",
    weightOptions: [
      { size: "250g", price: 95, pricePlaceholder: "\u20B995", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  // ===================== COMBO PACKS =====================
  {
    id: "tp-combo-01",
    slug: "chicken-and-prawns-pickle-combo",
    name: "Chicken and Prawns Pickle Combo",
    teluguName: "\u0C1A\u0C3F\u0C15\u0C46\u0C28\u0C4D & \u0C30\u0C4A\u0C2F\u0C4D\u0C2F\u0C32 \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F \u0C15\u0C3E\u0C02\u0C2C\u0C4B",
    category: "combo",
    subCategory: "Duo Pack",
    images: [
      encodeURI("/assets/combo/WhatsApp Image 2026-10-07 at 2.29.26 PM.jpeg")
    ],
    price: 625,
    pricePlaceholder: "\u20B9625",
    shortDescription: "The ultimate coastal and poultry duo: Andhra Boneless Chicken Pickle (250g) + Juicy Prawns Pickle (250g).",
    description: "Experience two of our best-selling non-veg signatures together! Includes 1 jar of Boneless Chicken Pickle (250g) and 1 jar of coastal Prawns Pickle (250g), handcrafted with roasted Andhra spices, stone-ground masalas, and pure cold-pressed groundnut oil.",
    ingredients: [
      "Prime Boneless Chicken",
      "Fresh Cleaned Prawns (Royyalu)",
      "Pure Groundnut Oil",
      "Guntur Red Chillies",
      "Ginger-Garlic Paste",
      "Roasted Mustard Seeds",
      "Fenugreek",
      "Salt",
      "Aromatic Spices"
    ],
    highlights: [
      "Pack of 2 Full Jars (250g + 250g = 500g Total)",
      "100% Boneless Chicken & Cleaned De-veined Prawns",
      "Authentic Telugu Style Preparation",
      "Value Combo Discounted Price"
    ],
    tasteProfile: "Savoury tender chicken paired with spicy, tangy coastal prawns",
    spiceLevel: "Spicy",
    servingSuggestions: ["Steaming hot rice with ghee", "Biryani accompaniment", "Crispy dosas and idlis", "Rotis and parathas"],
    storage: "Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening for extended freshness.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "500g (2x250g)", price: 625, pricePlaceholder: "\u20B9625", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-combo-02",
    slug: "prawns-and-mutton-pickle-combo",
    name: "Prawns and Mutton Pickle Combo",
    teluguName: "\u0C30\u0C4A\u0C2F\u0C4D\u0C2F\u0C32\u0C41 & \u0C2E\u0C1F\u0C28\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F \u0C15\u0C3E\u0C02\u0C2C\u0C4B",
    category: "combo",
    subCategory: "Duo Pack",
    images: [
      encodeURI("/assets/combo/WhatsApp Image 2026-10-07 at 2.29.56 PM.jpeg")
    ],
    price: 775,
    pricePlaceholder: "\u20B9775",
    shortDescription: "Royal gourmet duo: Tender Boneless Mutton Pickle (250g) + succulent coastal Prawns Pickle (250g).",
    description: "A royal feast for meat and seafood lovers! Combines 1 jar of our slow-cooked Boneless Mutton Pickle (250g) with 1 jar of fresh coastal Prawns Pickle (250g). Each jar is loaded with rich authentic masalas, curry leaves, and traditional garlic-ginger seasoning.",
    ingredients: [
      "Prime Boneless Mutton",
      "Fresh De-veined Prawns",
      "Pure Groundnut Oil",
      "Guntur Red Chilli Powder",
      "Mustard Seeds",
      "Fenugreek",
      "Fresh Garlic",
      "Ginger",
      "Sea Salt",
      "Spices"
    ],
    highlights: [
      "Pack of 2 Premium Jars (250g + 250g = 500g Total)",
      "Tender Boneless Mutton & Juicy Prawns",
      "Traditional Heritage Andhra Recipes",
      "Gourmet Value Saver Bundle"
    ],
    tasteProfile: "Deep, earthy slow-cooked mutton harmonized with vibrant, tangy spiced prawns",
    spiceLevel: "Spicy",
    servingSuggestions: ["Hot rice with melted ghee", "Mutton pulav or biryani", "Chapati and parathas", "Snack pairing"],
    storage: "Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "500g (2x250g)", price: 775, pricePlaceholder: "\u20B9775", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-combo-03",
    slug: "chicken-and-mutton-pickle-combo",
    name: "Chicken and Mutton Pickle Combo",
    teluguName: "\u0C1A\u0C3F\u0C15\u0C46\u0C28\u0C4D & \u0C2E\u0C1F\u0C28\u0C4D \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F \u0C15\u0C3E\u0C02\u0C2C\u0C4B",
    category: "combo",
    subCategory: "Duo Pack",
    images: [
      encodeURI("/assets/combo/WhatsApp Image 2026-10-07 at 2.30.23 PM.jpeg")
    ],
    price: 700,
    pricePlaceholder: "\u20B9700",
    shortDescription: "The carnivore\u2019s delight: Boneless Chicken Pickle (250g) + Boneless Mutton Pickle (250g).",
    description: "The two undisputed champions of Telugu meat pickling in one delightful bundle! Enjoy 1 jar of tender Boneless Chicken Pickle (250g) and 1 jar of melt-in-mouth Boneless Mutton Pickle (250g). Packed with robust aromatic spices that deliver an irresistible punch.",
    ingredients: [
      "Prime Boneless Chicken",
      "Tender Boneless Mutton",
      "Cold-pressed Groundnut Oil",
      "Hand-ground Andhra Masala",
      "Guntur Chillies",
      "Ginger-Garlic",
      "Mustard Seeds",
      "Fenugreek",
      "Salt"
    ],
    highlights: [
      "Pack of 2 Meat Jars (250g + 250g = 500g Total)",
      "100% Boneless Chicken & Mutton Cuts",
      "Slow-cooked for Maximum Flavour Absorption",
      "Customer Favourite Value Pack"
    ],
    tasteProfile: "Succulent, deeply savoury meat flavours with spicy Andhra notes",
    spiceLevel: "Spicy",
    servingSuggestions: ["Hot steamed rice with dollop of ghee", "Flaky parathas", "Dosa or idli", "Bagara rice"],
    storage: "Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "500g (2x250g)", price: 700, pricePlaceholder: "\u20B9700", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-combo-04",
    slug: "prawns-and-fish-pickle-combo",
    name: "Prawns and Fish Pickle Combo",
    teluguName: "\u0C30\u0C4A\u0C2F\u0C4D\u0C2F\u0C32\u0C41 & \u0C1A\u0C47\u0C2A\u0C32 \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F \u0C15\u0C3E\u0C02\u0C2C\u0C4B",
    category: "combo",
    subCategory: "Duo Pack",
    images: [
      encodeURI("/assets/combo/WhatsApp Image 2026-10-07 at 2.30.47 PM.jpeg")
    ],
    price: 625,
    pricePlaceholder: "\u20B9625",
    shortDescription: "Coastal seafood master-pack: Fresh Prawns Pickle (250g) + Apollo Fish Pickle (250g).",
    description: "Celebrate the coastal heritage of Andhra Pradesh with our Seafood Special Combo! Contains 1 jar of juicy Prawns Pickle (250g) and 1 jar of succulent Apollo Fish Pickle (250g), marinated in tangy tamarind, garlic, whole mustard, and fiery red chillies.",
    ingredients: [
      "Fresh Cleaned Prawns",
      "Apollo Fish Fillets",
      "Pure Edible Oil",
      "Guntur Red Chillies",
      "Curry Leaves",
      "Garlic",
      "Mustard Seeds",
      "Fenugreek",
      "Salt",
      "Spices"
    ],
    highlights: [
      "Pack of 2 Seafood Jars (250g + 250g = 500g Total)",
      "De-veined Clean Prawns & Boneless Fish Fillets",
      "Authentic Coastal Andhra Seasoning",
      "Exceptional Seafood Value"
    ],
    tasteProfile: "Tangy, zesty coastal spices with distinct ocean freshness and crisp bite",
    spiceLevel: "Spicy",
    servingSuggestions: ["Hot rice with ghee or sambar", "Fish curry rice side", "Crispy curd rice accompaniment", "Snack spread"],
    storage: "Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "500g (2x250g)", price: 625, pricePlaceholder: "\u20B9625", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-combo-05",
    slug: "chicken-mutton-and-prawns-pickle-combo",
    name: "Chicken Mutton and Prawns Pickle Combo",
    teluguName: "\u0C1A\u0C3F\u0C15\u0C46\u0C28\u0C4D, \u0C2E\u0C1F\u0C28\u0C4D & \u0C30\u0C4A\u0C2F\u0C4D\u0C2F\u0C32 \u0C2A\u0C1A\u0C4D\u0C1A\u0C21\u0C3F \u0C24\u0C4D\u0C30\u0C3F\u0C2C\u0C41\u0C32\u0C4D \u0C15\u0C3E\u0C02\u0C2C\u0C4B",
    category: "combo",
    subCategory: "Trio Pack",
    images: [
      encodeURI("/assets/combo/WhatsApp Image 2026-10-07 at 2.31.12 PM.jpeg")
    ],
    price: 1050,
    pricePlaceholder: "\u20B91,050",
    shortDescription: "The Grand Trio Hamper: Boneless Chicken (250g) + Boneless Mutton (250g) + Prawns Pickle (250g).",
    description: "Why choose when you can savour all three! This blockbuster 3-jar bundle delivers the ultimate non-veg feast: 1 jar of Boneless Chicken Pickle (250g), 1 jar of Boneless Mutton Pickle (250g), and 1 jar of Prawns Pickle (250g). Packed with flavour and unbeatable savings.",
    ingredients: [
      "Prime Boneless Chicken",
      "Tender Boneless Mutton",
      "Fresh Coastal Prawns",
      "Pure Groundnut Oil",
      "Guntur Red Chillies",
      "Ginger-Garlic Paste",
      "Roasted Mustard & Fenugreek",
      "Sea Salt",
      "Selected Spices"
    ],
    highlights: [
      "Pack of 3 Full-size Jars (250g x 3 = 750g Total)",
      "Chicken + Mutton + Prawns in One Bundle",
      "Big Savings Compared to Single Jars",
      "Ideal for Festive Gifting & Family Feasts"
    ],
    tasteProfile: "A complete spectrum of tender poultry, rich mutton, and zesty seafood flavours",
    spiceLevel: "Spicy",
    servingSuggestions: ["Everyday gourmet dining with hot rice", "Biryani & Pulao feasts", "Weekend family gatherings", "Gift hampers"],
    storage: "Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "750g (3x250g)", price: 1050, pricePlaceholder: "\u20B91,050", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: "tp-combo-06",
    slug: "chicken-mutton-prawns-and-fish-pickle-combo",
    name: "Chicken Mutton Prawns and Fish Pickle Combo",
    teluguName: "\u0C30\u0C3E\u0C2F\u0C32\u0C4D 4-\u0C07\u0C28\u0C4D-1 \u0C28\u0C3E\u0C28\u0C4D-\u0C35\u0C46\u0C1C\u0C4D \u0C15\u0C3E\u0C02\u0C2C\u0C4B (1KG)",
    category: "combo",
    subCategory: "Grand 4-in-1",
    images: [
      encodeURI("/assets/combo/WhatsApp Image 2026-10-07 at 2.31.44 PM.jpeg")
    ],
    price: 1325,
    pricePlaceholder: "\u20B91,325",
    shortDescription: "The Complete 4-in-1 Royal Non-Veg Feast: Chicken (250g) + Mutton (250g) + Prawns (250g) + Apollo Fish (250g) \u2014 Full 1KG!",
    description: "The pinnacle of Telugu non-veg craftsmanship! Our grand 4-jar luxury hamper brings together all 4 iconic non-veg master recipes in 250g jars: Boneless Chicken Pickle, Boneless Mutton Pickle, Prawns Pickle, and Apollo Fish Pickle. A massive 1KG feast offering the ultimate variety and highest savings.",
    ingredients: [
      "Boneless Chicken",
      "Boneless Mutton",
      "Fresh Cleaned Prawns",
      "Apollo Fish Fillets",
      "Pure Groundnut Oil",
      "Guntur Red Chillies",
      "Ginger-Garlic Paste",
      "Roasted Mustard Seeds",
      "Fenugreek",
      "Curry Leaves",
      "Sea Salt",
      "Artisanal Spices"
    ],
    highlights: [
      "Grand 4-Jar Hamper (4 x 250g = 1KG Full Weight)",
      "All 4 Iconic Non-Veg Varieties Included",
      "Maximum Value Savings",
      "Perfect Gift for Non-Veg Lovers & Foodies"
    ],
    tasteProfile: "The grand tour of authentic Andhra non-veg pickles: fiery, robust, aromatic, and deeply satisfying",
    spiceLevel: "Spicy",
    servingSuggestions: ["Grand family banquets", "Premium gifting for festivals and celebrations", "Ultimate dining table centerpiece with rice, ghee, and parathas"],
    storage: "Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening for extended freshness.",
    shelfLife: "3 Months from packing",
    weightOptions: [
      { size: "1kg (4x250g)", price: 1325, pricePlaceholder: "\u20B91,325", isPopular: true }
    ],
    featured: true,
    bestSeller: true
  }
];

// server/models/Product.ts
var ProductVariantSchema = new Schema({
  size: { type: String, required: true },
  price: { type: Number },
  pricePlaceholder: { type: String },
  isPopular: { type: Boolean, default: false }
}, { _id: false });
var ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    teluguName: { type: String },
    category: { type: String, enum: ["veg", "non-veg", "combo"], required: true },
    subCategory: { type: String },
    images: { type: [String], default: [] },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    pricePlaceholder: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    ingredients: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    tasteProfile: { type: String, default: "" },
    spiceLevel: {
      type: String,
      enum: ["Mild", "Medium", "Spicy", "Extra Spicy"],
      default: "Medium"
    },
    servingSuggestions: { type: [String], default: [] },
    storage: { type: String, default: "Store in a cool dry place" },
    shelfLife: { type: String, default: "3 Months" },
    weightOptions: { type: [ProductVariantSchema], default: [] },
    stock: { type: Number, default: 50 },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);
if (mongoose2.models && mongoose2.models.Product) {
  delete mongoose2.models.Product;
}
var ProductModel = mongoose2.model("Product", ProductSchema);
async function seedProductsIfEmpty() {
  try {
    for (const p of products) {
      await ProductModel.findOneAndUpdate(
        { id: p.id },
        {
          $setOnInsert: {
            ...p,
            stock: 50,
            isActive: true
          }
        },
        { upsert: true }
      );
    }
  } catch (err) {
    console.error("[Seed] Error checking or seeding products:", err);
  }
}

// server/routes/admin.ts
import { Router } from "express";

// server/auth.ts
import jwt from "jsonwebtoken";
import dotenv2 from "dotenv";
dotenv2.config();
var ADMIN_ID = process.env.ADMIN_ID || "admin";
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
var JWT_SECRET = process.env.JWT_SECRET || "tastypickle_jwt_secret_dev_key";
function validateAdminCredentials(id, pass) {
  if (!ADMIN_PASSWORD) {
    console.error("[Auth] ADMIN_PASSWORD environment variable is not configured");
    return false;
  }
  return id === ADMIN_ID && pass === ADMIN_PASSWORD;
}
function generateAdminToken(adminId) {
  return jwt.sign({ adminId, role: "admin" }, JWT_SECRET, {
    expiresIn: "7d"
  });
}
function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token"
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin" || decoded.adminId !== ADMIN_ID) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid admin privileges"
      });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Session expired or invalid token"
    });
  }
}

// server/models/Order.ts
import mongoose3, { Schema as Schema2 } from "mongoose";
var OrderItemSchema = new Schema2(
  {
    productId: { type: String, required: true },
    slug: { type: String },
    name: { type: String, required: true },
    size: { type: String, default: "250g" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String }
  },
  { _id: false }
);
var CustomerSchema = new Schema2(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String },
    email: { type: String },
    address: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, default: "Andhra Pradesh" },
    pincode: { type: String, required: true },
    notes: { type: String }
  },
  { _id: false }
);
var TrackingSchema = new Schema2(
  {
    courierName: { type: String, default: "" },
    trackingId: { type: String, default: "" },
    trackingUrl: { type: String, default: "" },
    updatedAt: { type: Date }
  },
  { _id: false }
);
var StatusHistorySchema = new Schema2(
  {
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    note: { type: String }
  },
  { _id: false }
);
var OrderSchema = new Schema2(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: { type: CustomerSchema, required: true },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 80 },
    grandTotal: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    paymentProvider: { type: String, default: "Razorpay" },
    paymentMethod: { type: String, default: "Online Payment" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
      index: true
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending",
      index: true
    },
    tracking: { type: TrackingSchema, default: {} },
    statusHistory: { type: [StatusHistorySchema], default: [] },
    ownerNotificationSent: { type: Boolean, default: false, index: true },
    ownerNotificationSentAt: { type: Date },
    customerNotificationSent: { type: Boolean, default: false, index: true },
    customerNotificationSentAt: { type: Date },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String, index: true },
    razorpaySignature: { type: String },
    razorpaySignatureVerified: { type: Boolean, default: false },
    paidAt: { type: Date },
    paymentVerificationError: { type: String },
    discount: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);
if (mongoose3.models && mongoose3.models.Order) {
  delete mongoose3.models.Order;
}
var OrderModel = mongoose3.model("Order", OrderSchema);

// server/models/Customer.ts
import mongoose4, { Schema as Schema3 } from "mongoose";
var CartProductSchema = new Schema3(
  {
    productId: { type: String, required: true },
    slug: { type: String },
    name: { type: String, required: true },
    size: { type: String, default: "250g" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String }
  },
  { _id: false }
);
var CustomerSchema2 = new Schema3(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    firstVisitAt: {
      type: Date,
      default: Date.now
    },
    lastActivityAt: {
      type: Date,
      default: Date.now
    },
    cartItems: {
      type: [CartProductSchema],
      default: []
    },
    totalOrders: {
      type: Number,
      default: 0
    },
    totalSpent: {
      type: Number,
      default: 0
    },
    lastOrderId: {
      type: String
    },
    status: {
      type: String,
      enum: ["Visitor", "Cart Added", "Ordered"],
      default: "Visitor",
      index: true
    },
    marketingConsent: {
      type: Boolean,
      default: false
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
var CustomerModel = mongoose4.models.Customer || mongoose4.model("Customer", CustomerSchema2);

// server/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv3 from "dotenv";
dotenv3.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});
var storage = multer.memoryStorage();
var upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  }
});
function uploadBufferToCloudinary(buffer, folder = "tastypickle_products") {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: "auto:good" },
          { fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload returned empty result"));
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

// server/email.ts
import { Resend } from "resend";
var DEFAULT_OWNER_EMAIL = "mohammedshariq2013@gmail.com";
function getResendClient() {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const ownerEmail = (process.env.OWNER_EMAIL || DEFAULT_OWNER_EMAIL).trim();
  const fromEmail = (process.env.RESEND_FROM_EMAIL || "TastyPickle Orders <onboarding@resend.dev>").trim();
  if (!apiKey) {
    return { client: null, ownerEmail, fromEmail };
  }
  return {
    client: new Resend(apiKey),
    ownerEmail,
    fromEmail
  };
}
function buildOrderEmailHtml(order) {
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short"
  });
  const itemsRows = (order.items || []).map(
    (item) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b;">
          <strong>${escapeHtml(item.name)}</strong>
          <div style="font-size: 12px; color: #64748b;">Variant / Size: ${escapeHtml(item.size || "250g")}</div>
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: right;">
          \u20B9${item.price}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; font-weight: bold; color: #991b1b; text-align: right;">
          \u20B9${item.price * item.quantity}
        </td>
      </tr>
    `
  ).join("");
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order #${escapeHtml(order.orderId)}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #1e293b;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        
        <!-- Header Banner -->
        <tr>
          <td style="background: linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #7f1d1d 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; margin-bottom: 4px;">
              \u{1F336}\uFE0F TastyPickle
            </div>
            <div style="font-size: 15px; font-weight: 600; color: #fee2e2; letter-spacing: 0.5px;">
              New Order Received
            </div>
            <div style="display: inline-block; background-color: #ffffff; color: #991b1b; font-weight: 800; font-size: 16px; padding: 6px 16px; border-radius: 9999px; margin-top: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              Order #${escapeHtml(order.orderId)}
            </div>
          </td>
        </tr>

        <!-- Order Timestamp & Quick Alert -->
        <tr>
          <td style="padding: 20px 24px 10px 24px; background-color: #fef2f2; border-bottom: 1px solid #fee2e2;">
            <table width="100%">
              <tr>
                <td style="font-size: 13px; color: #991b1b; font-weight: 700;">
                  \u23F0 Date & Time:
                </td>
                <td style="font-size: 13px; color: #7f1d1d; font-weight: 600; text-align: right;">
                  ${orderDate}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Customer & Delivery Address -->
        <tr>
          <td style="padding: 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="top" width="50%" style="padding-right: 12px;">
                  <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
                    \u{1F464} Customer Details
                  </div>
                  <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">
                    ${escapeHtml(order.customer.fullName)}
                  </div>
                  <div style="font-size: 13px; color: #334155; margin-bottom: 3px;">
                    \u{1F4DE} <a href="tel:${escapeHtml(order.customer.phone)}" style="color: #991b1b; text-decoration: none; font-weight: 600;">${escapeHtml(order.customer.phone)}</a>
                  </div>
                  ${order.customer.altPhone ? `<div style="font-size: 12px; color: #64748b; margin-bottom: 3px;">Alt Phone: ${escapeHtml(order.customer.altPhone)}</div>` : ""}
                  <div style="font-size: 13px; color: #334155;">
                    \u2709\uFE0F ${order.customer.email ? `<a href="mailto:${escapeHtml(order.customer.email)}" style="color: #0369a1; text-decoration: none;">${escapeHtml(order.customer.email)}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
                  </div>
                </td>
                <td valign="top" width="50%" style="padding-left: 12px; border-left: 1px solid #e2e8f0;">
                  <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
                    \u{1F4CD} Delivery Address
                  </div>
                  <div style="font-size: 13px; color: #334155; line-height: 1.5;">
                    ${escapeHtml(order.customer.address)}<br>
                    ${order.customer.landmark ? `Landmark: ${escapeHtml(order.customer.landmark)}<br>` : ""}
                    ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.state || "Andhra Pradesh")}<br>
                    <strong>PIN: ${escapeHtml(order.customer.pincode)}</strong>
                  </div>
                  ${order.customer.notes ? `<div style="margin-top: 8px; font-size: 12px; background: #fffbeb; padding: 6px 10px; border-radius: 6px; color: #92400e; border: 1px solid #fef3c7;"><strong>Note:</strong> ${escapeHtml(order.customer.notes)}</div>` : ""}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Ordered Items Table -->
        <tr>
          <td style="padding: 0 24px 24px 24px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              \u{1F6CD}\uFE0F Order Items
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1;">
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: left; color: #475569; text-transform: uppercase;">Product</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: center; color: #475569; text-transform: uppercase;">Qty</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Price</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>
          </td>
        </tr>

        <!-- Payment & Financial Summary -->
        <tr>
          <td style="padding: 0 24px 28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="top" width="55%" style="padding-right: 12px;">
                  <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
                    \u{1F4B3} Payment Details
                  </div>
                  <div style="font-size: 13px; color: #1e293b; margin-bottom: 4px;">
                    <strong>Method:</strong> ${escapeHtml(order.paymentMethod || "Online Payment")}
                  </div>
                  <div style="font-size: 13px; color: #1e293b; margin-bottom: 4px;">
                    <strong>Status:</strong>
                    <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; ${order.paymentStatus === "Paid" ? "background-color: #dcfce7; color: #15803d;" : "background-color: #fef3c7; color: #b45309;"}">
                      ${escapeHtml(order.paymentStatus || "Pending")}
                    </span>
                  </div>
                  ${order.razorpayOrderId ? `<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Razorpay Order ID: <code style="background: #f1f5f9; padding: 2px 4px; border-radius: 4px;">${escapeHtml(order.razorpayOrderId)}</code></div>` : ""}
                  ${order.razorpayPaymentId ? `<div style="font-size: 12px; color: #64748b; margin-top: 2px;">Razorpay Payment ID: <code style="background: #f1f5f9; padding: 2px 4px; border-radius: 4px;">${escapeHtml(order.razorpayPaymentId)}</code></div>` : ""}
                </td>

                <td valign="top" width="45%" style="background-color: #f8fafc; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
                  <table width="100%" style="font-size: 13px;">
                    <tr>
                      <td style="color: #64748b; padding-bottom: 6px;">Subtotal:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 6px;">\u20B9${order.subtotal}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b; padding-bottom: 6px;">Delivery Charge:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 6px;">\u20B9${order.deliveryCharge}</td>
                    </tr>
                    ${order.discount && order.discount > 0 ? `<tr>
                            <td style="color: #15803d; padding-bottom: 6px;">Discount:</td>
                            <td style="text-align: right; font-weight: 600; color: #15803d; padding-bottom: 6px;">-\u20B9${order.discount}</td>
                          </tr>` : ""}
                    <tr style="border-top: 2px solid #cbd5e1;">
                      <td style="padding-top: 8px; font-weight: 800; font-size: 15px; color: #0f172a;">Final Total:</td>
                      <td style="padding-top: 8px; text-align: right; font-weight: 900; font-size: 17px; color: #991b1b;">\u20B9${order.grandTotal}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; text-align: center; font-size: 12px; color: #64748b;">
            TastyPickle Notification System \u2022 Automatic Order Dispatcher<br>
            <span style="font-size: 11px; color: #94a3b8;">This is an automated operational notification sent to the store owner.</span>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
function escapeHtml(text) {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
async function sendOrderNotificationEmail(orderId) {
  try {
    await connectDB();
    const order = await OrderModel.findOne({ orderId });
    if (!order) {
      console.warn(`[Resend] Order #${orderId} not found for notification email.`);
      return { success: false, error: "Order not found" };
    }
    if (order.ownerNotificationSent) {
      console.log(`[Resend] Duplicate prevented: Notification for Order #${orderId} was already sent.`);
      return { success: true, skipped: true };
    }
    const { client, ownerEmail, fromEmail } = getResendClient();
    if (!client) {
      console.warn(
        `[Resend] RESEND_API_KEY is not configured in environment variables. Email notification for Order #${orderId} skipped.`
      );
      return { success: false, error: "RESEND_API_KEY is not configured" };
    }
    const subject = `\u{1F514} New Tastypickle Order \u2014 #${order.orderId}`;
    const html = buildOrderEmailHtml(order);
    console.log(`[Resend] Sending order notification email for Order #${order.orderId} to ${ownerEmail}...`);
    const result = await client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject,
      html
    });
    if (result.error) {
      console.error(`[Resend] Failed to send email for Order #${order.orderId}:`, result.error);
      return { success: false, error: result.error.message };
    }
    await OrderModel.updateOne(
      { orderId },
      {
        $set: {
          ownerNotificationSent: true,
          ownerNotificationSentAt: /* @__PURE__ */ new Date()
        }
      }
    );
    console.log(
      `[Resend] Order notification email successfully sent for Order #${order.orderId} (Message ID: ${result.data?.id})`
    );
    return { success: true, messageId: result.data?.id };
  } catch (err) {
    console.error(`[Resend] Unexpected error sending email for Order #${orderId}:`, err);
    return { success: false, error: err?.message || "Unexpected email error" };
  }
}
async function sendTestEmail() {
  const { client, ownerEmail, fromEmail } = getResendClient();
  if (!client) {
    return {
      success: false,
      recipient: ownerEmail,
      error: "RESEND_API_KEY is not configured in environment variables."
    };
  }
  try {
    const result = await client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: "\u{1F9EA} Tastypickle Resend Integration Test",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #991b1b;">\u{1F336}\uFE0F TastyPickle Email Integration Active</h2>
          <p>This is a test notification confirming that Resend is properly configured for TastyPickle.</p>
          <p><strong>Configured Owner Email:</strong> ${ownerEmail}</p>
          <p><strong>Timestamp:</strong> ${(/* @__PURE__ */ new Date()).toISOString()}</p>
        </div>
      `
    });
    if (result.error) {
      console.error("[Resend Test Error]:", result.error);
      return { success: false, recipient: ownerEmail, error: result.error.message };
    }
    return { success: true, recipient: ownerEmail, messageId: result.data?.id };
  } catch (err) {
    console.error("[Resend Test Exception]:", err);
    return { success: false, recipient: ownerEmail, error: err?.message || "Failed to send test email" };
  }
}
function buildCustomerOrderEmailHtml(order) {
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short"
  });
  const firstName = escapeHtml((order.customer.fullName || "Valued Customer").split(" ")[0]);
  const itemsRows = (order.items || []).map(
    (item) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b;">
          <strong>${escapeHtml(item.name)}</strong>
          <div style="font-size: 12px; color: #64748b;">Weight / Bottle: ${escapeHtml(item.size || "250g")}</div>
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: right;">
          \u20B9${item.price}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; font-weight: bold; color: #991b1b; text-align: right;">
          \u20B9${item.price * item.quantity}
        </td>
      </tr>
    `
  ).join("");
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation #${escapeHtml(order.orderId)}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #1e293b;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        
        <!-- Header Banner -->
        <tr>
          <td style="background: linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #7f1d1d 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; margin-bottom: 4px;">
              \u{1F336}\uFE0F TastyPickle
            </div>
            <div style="font-size: 15px; font-weight: 600; color: #fee2e2; letter-spacing: 0.5px;">
              Order Confirmed & Payment Received!
            </div>
            <div style="display: inline-block; background-color: #ffffff; color: #991b1b; font-weight: 800; font-size: 16px; padding: 6px 16px; border-radius: 9999px; margin-top: 14px;">
              Order Reference: #${escapeHtml(order.orderId)}
            </div>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding: 24px 24px 12px 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0;">
              Hello ${firstName},
            </h2>
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0;">
              Thank you for choosing <strong>TastyPickle</strong>! Your online payment of <strong>\u20B9${order.grandTotal}</strong> has been successfully verified via Razorpay. Our kitchen team is now slow-cooking and hand-packing your pickles to ensure maximum taste and freshness.
            </p>
          </td>
        </tr>

        <!-- Order Summary & Delivery Address -->
        <tr>
          <td style="padding: 12px 24px 24px 24px;">
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top" width="50%" style="padding-right: 12px;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">
                      \u{1F4CD} Shipping Address
                    </div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.5;">
                      <strong>${escapeHtml(order.customer.fullName)}</strong><br>
                      ${escapeHtml(order.customer.address)}<br>
                      ${order.customer.landmark ? `Landmark: ${escapeHtml(order.customer.landmark)}<br>` : ""}
                      ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.state || "Andhra Pradesh")} - ${escapeHtml(order.customer.pincode)}<br>
                      Phone: ${escapeHtml(order.customer.phone)}
                    </div>
                  </td>
                  <td valign="top" width="50%" style="padding-left: 12px; border-left: 1px solid #e2e8f0;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">
                      \u{1F4B3} Payment Receipt
                    </div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.6;">
                      Status: <span style="background-color: #dcfce7; color: #15803d; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 11px;">PAID &amp; VERIFIED</span><br>
                      Method: Online Payment (Razorpay)<br>
                      ${order.razorpayPaymentId ? `Payment ID: <code style="font-size: 11px; background: #e2e8f0; padding: 2px 4px; border-radius: 4px;">${escapeHtml(order.razorpayPaymentId)}</code><br>` : ""}
                      Date: ${orderDate}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Ordered Items Table -->
        <tr>
          <td style="padding: 0 24px 20px 24px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              \u{1F6CD}\uFE0F Your Ordered Pickles
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1;">
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: left; color: #475569; text-transform: uppercase;">Pickle</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: center; color: #475569; text-transform: uppercase;">Qty</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Price</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>
          </td>
        </tr>

        <!-- Price Breakdown -->
        <tr>
          <td style="padding: 0 24px 28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%"></td>
                <td width="50%" style="background-color: #f8fafc; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
                  <table width="100%" style="font-size: 13px;">
                    <tr>
                      <td style="color: #64748b; padding-bottom: 4px;">Subtotal:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 4px;">\u20B9${order.subtotal}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b; padding-bottom: 4px;">Standard Delivery:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 4px;">\u20B9${order.deliveryCharge}</td>
                    </tr>
                    <tr style="border-top: 2px solid #cbd5e1;">
                      <td style="padding-top: 8px; font-weight: 800; font-size: 14px; color: #0f172a;">Total Paid:</td>
                      <td style="padding-top: 8px; text-align: right; font-weight: 900; font-size: 16px; color: #991b1b;">\u20B9${order.grandTotal}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Track Order Live CTA -->
        <tr>
          <td style="padding: 0 24px 28px 24px; text-align: center;">
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 12px; padding: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 800; color: #991b1b;">
                \u{1F69A} Track Your Order Live
              </h3>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #7f1d1d;">
                You can monitor live preparation and courier tracking status anytime with your Order ID:
              </p>
              <div style="display: inline-block; background-color: #991b1b; color: #ffffff; font-weight: 800; font-size: 14px; padding: 10px 24px; border-radius: 10px; text-decoration: none;">
                Order ID: #${escapeHtml(order.orderId)}
              </div>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b;">
            <strong>TastyPickle \u2014 Authentic Homemade Andhra Pickles</strong><br>
            Freshly prepared with love & authentic spices \u2022 No artificial preservatives<br>
            Need assistance? Reach our dispatch team on WhatsApp or reply to this email.
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
async function sendCustomerOrderConfirmationEmail(orderId) {
  try {
    await connectDB();
    const order = await OrderModel.findOne({ orderId });
    if (!order) {
      return { success: false, error: "Order not found" };
    }
    const customerEmail = order.customer?.email?.trim();
    if (!customerEmail) {
      console.log(`[Customer Email] No email address for Order #${orderId}. Skipping customer confirmation email.`);
      return { success: true, skipped: true };
    }
    if (order.customerNotificationSent) {
      console.log(`[Customer Email] Duplicate prevented: Customer notification for Order #${orderId} was already sent.`);
      return { success: true, skipped: true };
    }
    const { client, fromEmail } = getResendClient();
    if (!client) {
      console.warn(`[Customer Email] RESEND_API_KEY is not configured.`);
      return { success: false, error: "RESEND_API_KEY is not configured" };
    }
    const subject = `\u2728 Order Confirmed: #${order.orderId} \u2014 TastyPickle`;
    const html = buildCustomerOrderEmailHtml(order);
    console.log(`[Customer Email] Sending order confirmation email for Order #${order.orderId} to customer ${customerEmail}...`);
    const result = await client.emails.send({
      from: fromEmail,
      to: [customerEmail],
      subject,
      html
    });
    if (result.error) {
      console.error(`[Customer Email] Failed to send to ${customerEmail} for Order #${order.orderId}:`, result.error);
      return { success: false, error: result.error.message };
    }
    await OrderModel.updateOne(
      { orderId },
      {
        $set: {
          customerNotificationSent: true,
          customerNotificationSentAt: /* @__PURE__ */ new Date()
        }
      }
    );
    console.log(
      `[Customer Email] Successfully sent confirmation email to ${customerEmail} for Order #${order.orderId} (Message ID: ${result.data?.id})`
    );
    return { success: true, messageId: result.data?.id };
  } catch (err) {
    console.error(`[Customer Email] Unexpected error sending customer email for Order #${orderId}:`, err);
    return { success: false, error: err?.message || "Unexpected email error" };
  }
}

// server/routes/admin.ts
var adminRouter = Router();
adminRouter.post("/login", async (req, res) => {
  try {
    const { adminId, password } = req.body;
    if (!adminId || !password) {
      return res.status(400).json({
        success: false,
        message: "Admin ID and password are required"
      });
    }
    if (!validateAdminCredentials(adminId, password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin ID or Password"
      });
    }
    const token = generateAdminToken(adminId);
    return res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        adminId,
        role: "admin"
      }
    });
  } catch (err) {
    console.error("[Admin Login Error]:", err);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
});
adminRouter.get("/me", requireAdmin, (req, res) => {
  return res.json({
    success: true,
    admin: req.admin
  });
});
adminRouter.post("/logout", (_req, res) => {
  return res.json({ success: true, message: "Logged out successfully" });
});
adminRouter.get("/dashboard", requireAdmin, async (_req, res) => {
  try {
    const [totalProducts, orders] = await Promise.all([
      ProductModel.countDocuments(),
      OrderModel.find().sort({ createdAt: -1 })
    ]);
    const totalOrders = orders.length;
    const statusCounts = {
      Pending: 0,
      Confirmed: 0,
      Processing: 0,
      Shipped: 0,
      "Out for Delivery": 0,
      Delivered: 0,
      Cancelled: 0
    };
    let totalRevenue = 0;
    const uniquePhones = /* @__PURE__ */ new Set();
    orders.forEach((order) => {
      const status = order.orderStatus || "Pending";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      if (status !== "Cancelled") {
        totalRevenue += order.grandTotal || 0;
      }
      if (order.customer?.phone) {
        uniquePhones.add(order.customer.phone.replace(/\D/g, ""));
      }
    });
    const recentOrders = orders.slice(0, 8);
    return res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        statusCounts,
        totalCustomers: uniquePhones.size,
        totalRevenue,
        recentOrders
      }
    });
  } catch (err) {
    console.error("[Admin Dashboard Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch dashboard metrics" });
  }
});
adminRouter.post(
  "/upload",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No image file uploaded" });
      }
      const result = await uploadBufferToCloudinary(req.file.buffer);
      return res.json({
        success: true,
        message: "Image uploaded successfully",
        url: result.secure_url,
        publicId: result.public_id
      });
    } catch (err) {
      console.error("[Admin Upload Error]:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to upload image to Cloudinary"
      });
    }
  }
);
adminRouter.get("/products", requireAdmin, async (_req, res) => {
  try {
    const products2 = await ProductModel.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: products2 });
  } catch (err) {
    console.error("[Admin Get Products Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});
adminRouter.post("/products", requireAdmin, async (req, res) => {
  try {
    const body = req.body;
    if (!body.name || !body.price || !body.category) {
      return res.status(400).json({
        success: false,
        message: "Product name, price, and category are required"
      });
    }
    const baseSlug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const uniqueSuffix = Date.now().toString().slice(-4);
    const slug = body.slug || `${baseSlug}-${uniqueSuffix}`;
    const id = body.id || `tp-prod-${Date.now().toString(36)}`;
    const newProduct = new ProductModel({
      ...body,
      id,
      slug,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : void 0,
      stock: body.stock !== void 0 ? Number(body.stock) : 50,
      isActive: body.isActive !== void 0 ? Boolean(body.isActive) : true,
      pricePlaceholder: `\u20B9${body.price}`,
      weightOptions: body.weightOptions || [
        { size: "250g", price: Number(body.price), pricePlaceholder: `\u20B9${body.price}`, isPopular: true }
      ]
    });
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (err) {
    console.error("[Admin Create Product Error]:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to create product"
    });
  }
});
adminRouter.put("/products/:id", requireAdmin, async (req, res) => {
  try {
    const id = String(req.params.id);
    const body = req.body;
    if (body.price) {
      body.price = Number(body.price);
      body.pricePlaceholder = `\u20B9${body.price}`;
    }
    if (body.originalPrice) {
      body.originalPrice = Number(body.originalPrice);
    }
    if (body.stock !== void 0) {
      body.stock = Number(body.stock);
    }
    const updated = await ProductModel.findOneAndUpdate(
      { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : void 0 }] },
      { $set: body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.json({
      success: true,
      message: "Product updated successfully",
      data: updated
    });
  } catch (err) {
    console.error("[Admin Update Product Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to update product" });
  }
});
adminRouter.delete("/products/:id", requireAdmin, async (req, res) => {
  try {
    const id = String(req.params.id);
    const permanent = req.query.permanent === "true";
    if (permanent) {
      const deleted = await ProductModel.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : void 0 }]
      });
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.json({ success: true, message: "Product permanently deleted" });
    } else {
      const product = await ProductModel.findOne({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : void 0 }]
      });
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      product.isActive = !product.isActive;
      await product.save();
      return res.json({
        success: true,
        message: `Product ${product.isActive ? "activated" : "deactivated/archived"} successfully`,
        data: product
      });
    }
  } catch (err) {
    console.error("[Admin Delete Product Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to delete product" });
  }
});
adminRouter.get("/orders", requireAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status && status !== "All") {
      filter.orderStatus = status;
    }
    if (search && typeof search === "string" && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { orderId: regex },
        { "customer.fullName": regex },
        { "customer.phone": regex },
        { "customer.email": regex },
        { "tracking.trackingId": regex }
      ];
    }
    const orders = await OrderModel.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: orders });
  } catch (err) {
    console.error("[Admin Get Orders Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});
adminRouter.get("/orders/:id", requireAdmin, async (req, res) => {
  try {
    const id = String(req.params.id);
    const order = await OrderModel.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : void 0 }]
    });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.json({ success: true, data: order });
  } catch (err) {
    console.error("[Admin Get Single Order Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch order details" });
  }
});
adminRouter.put("/orders/:id/status", requireAdmin, async (req, res) => {
  try {
    const id = String(req.params.id);
    const { status, note } = req.body;
    const validStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid order status" });
    }
    const order = await OrderModel.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : void 0 }]
    });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.orderStatus = status;
    order.statusHistory.push({
      status,
      timestamp: /* @__PURE__ */ new Date(),
      note: note || void 0
    });
    await order.save();
    return res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order
    });
  } catch (err) {
    console.error("[Admin Update Order Status Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to update order status" });
  }
});
adminRouter.put("/orders/:id/tracking", requireAdmin, async (req, res) => {
  try {
    const id = String(req.params.id);
    const { courierName, trackingId, trackingUrl } = req.body;
    const order = await OrderModel.findOne({
      $or: [{ orderId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : void 0 }]
    });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.tracking = {
      courierName: (courierName || "").trim(),
      trackingId: (trackingId || "").trim(),
      trackingUrl: (trackingUrl || "").trim(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (order.orderStatus === "Pending" || order.orderStatus === "Confirmed") {
      order.orderStatus = "Shipped";
      order.statusHistory.push({
        status: "Shipped",
        timestamp: /* @__PURE__ */ new Date(),
        note: `Tracking added: ${courierName} (${trackingId})`
      });
    }
    await order.save();
    return res.json({
      success: true,
      message: "Tracking details updated successfully",
      data: order
    });
  } catch (err) {
    console.error("[Admin Update Tracking Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to update tracking info" });
  }
});
adminRouter.get("/customers", requireAdmin, async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};
    if (search && typeof search === "string") {
      const cleanDigits = search.replace(/\D/g, "");
      if (cleanDigits) {
        query.phoneNumber = { $regex: cleanDigits, $options: "i" };
      }
    }
    if (status && typeof status === "string" && status !== "All" && status !== "All Customers") {
      if (status === "Cart Abandoned") {
        query["cartItems.0"] = { $exists: true };
        query.status = { $ne: "Ordered" };
      } else {
        query.status = status;
      }
    }
    const customers = await CustomerModel.find(query).sort({ lastActivityAt: -1 }).lean();
    const enriched = customers.map((c) => {
      const cartTotal = (c.cartItems || []).reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
        0
      );
      const isCartAbandoned = c.cartItems && c.cartItems.length > 0 && c.status !== "Ordered";
      return {
        ...c,
        cartTotal,
        isCartAbandoned,
        cartItemsCount: (c.cartItems || []).reduce((sum, it) => sum + (it.quantity || 1), 0)
      };
    });
    return res.json({ success: true, data: enriched });
  } catch (err) {
    console.error("[Admin Get Customers Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }
});
adminRouter.get("/customers/:idOrPhone", requireAdmin, async (req, res) => {
  try {
    const idOrPhone = String(req.params.idOrPhone);
    let customer = null;
    if (/^[0-9a-fA-F]{24}$/.test(idOrPhone)) {
      customer = await CustomerModel.findById(idOrPhone).lean();
    }
    if (!customer) {
      const cleanDigits = idOrPhone.replace(/\D/g, "");
      const last10 = cleanDigits.slice(-10);
      customer = await CustomerModel.findOne({
        $or: [
          { phoneNumber: idOrPhone },
          { phoneNumber: `+91${last10}` },
          { phoneNumber: last10 }
        ]
      }).lean();
    }
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    const cleanPhoneDigits = (customer.phoneNumber || "").replace(/\D/g, "").slice(-10);
    const orders = await OrderModel.find({
      "customer.phone": { $regex: cleanPhoneDigits }
    }).sort({ createdAt: -1 }).lean();
    const cartTotal = (customer.cartItems || []).reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    return res.json({
      success: true,
      data: {
        ...customer,
        cartTotal,
        orders
      }
    });
  } catch (err) {
    console.error("[Admin Get Customer Details Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch customer details" });
  }
});
adminRouter.post("/email/test", requireAdmin, async (_req, res) => {
  try {
    const result = await sendTestEmail();
    return res.json(result);
  } catch (err) {
    console.error("[Admin Email Test Error]:", err);
    return res.status(500).json({
      success: false,
      recipient: process.env.OWNER_EMAIL || DEFAULT_OWNER_EMAIL,
      error: err?.message || "Failed to dispatch test email"
    });
  }
});
adminRouter.post("/orders/:orderId/send-notification", requireAdmin, async (req, res) => {
  try {
    const orderId = String(req.params.orderId);
    const { force } = req.body;
    if (force) {
      await OrderModel.updateOne({ orderId }, { $set: { ownerNotificationSent: false } });
    }
    const result = await sendOrderNotificationEmail(orderId);
    return res.json(result);
  } catch (err) {
    console.error("[Admin Resend Order Email Error]:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Failed to send notification email"
    });
  }
});

// server/routes/public.ts
import { Router as Router2 } from "express";
var publicRouter = Router2();
function cleanIndianMobile(raw) {
  if (!raw || typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("91") && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    return `+91${digits.slice(2)}`;
  }
  if (digits.length === 11 && digits.startsWith("0") && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`;
  }
  return null;
}
publicRouter.get("/products", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && (category === "veg" || category === "non-veg" || category === "combo")) {
      filter.category = category;
    }
    const products2 = await ProductModel.find(filter).sort({ createdAt: 1 });
    return res.json({ success: true, data: products2 });
  } catch (err) {
    console.error("[Public Get Products Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});
publicRouter.get("/products/:slug", async (req, res) => {
  try {
    const slug = String(req.params.slug);
    const product = await ProductModel.findOne({
      slug,
      isActive: true
    });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error("[Public Get Single Product Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
});
var handleCustomerSave = async (req, res) => {
  try {
    const { phoneNumber, marketingConsent, initialCartItem } = req.body;
    const cleanPhone = cleanIndianMobile(phoneNumber);
    if (!cleanPhone) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)"
      });
    }
    let customer = await CustomerModel.findOne({ phoneNumber: cleanPhone });
    if (!customer) {
      customer = new CustomerModel({
        phoneNumber: cleanPhone,
        firstVisitAt: /* @__PURE__ */ new Date(),
        lastActivityAt: /* @__PURE__ */ new Date(),
        status: "Cart Added",
        marketingConsent: Boolean(marketingConsent),
        cartItems: initialCartItem ? [initialCartItem] : []
      });
      await customer.save();
    } else {
      customer.lastActivityAt = /* @__PURE__ */ new Date();
      if (marketingConsent !== void 0) {
        customer.marketingConsent = Boolean(marketingConsent);
      }
      if (customer.status === "Visitor") {
        customer.status = "Cart Added";
      }
      if (initialCartItem) {
        const existingIdx = customer.cartItems.findIndex(
          (item) => item.productId === initialCartItem.productId && item.size === initialCartItem.size
        );
        if (existingIdx > -1) {
          customer.cartItems[existingIdx].quantity += initialCartItem.quantity || 1;
        } else {
          customer.cartItems.push(initialCartItem);
        }
      }
      await customer.save();
    }
    return res.json({
      success: true,
      message: "Mobile number captured successfully",
      customerId: customer._id,
      data: {
        customerId: customer._id,
        phoneNumber: customer.phoneNumber,
        status: customer.status
      }
    });
  } catch (err) {
    console.error("[Public Customer Capture Error]:", err);
    return res.status(500).json({
      success: false,
      message: "Unable to save your number. Please try again."
    });
  }
};
publicRouter.post("/customers", handleCustomerSave);
publicRouter.post("/customer/capture", handleCustomerSave);
publicRouter.post("/customer/sync-cart", async (req, res) => {
  try {
    const { phoneNumber, cartItems } = req.body;
    const cleanPhone = cleanIndianMobile(phoneNumber);
    if (!cleanPhone) {
      return res.status(400).json({ success: false, message: "Valid mobile number required" });
    }
    const formattedItems = Array.isArray(cartItems) ? cartItems.map((item) => ({
      productId: item.product?.id || item.productId,
      slug: item.product?.slug || item.slug,
      name: item.product?.name || item.name,
      size: item.selectedSize || item.size || "250g",
      price: Number(item.product?.price || item.price || 95),
      quantity: Number(item.quantity || 1),
      image: item.product?.images?.[0] || item.image
    })) : [];
    const customer = await CustomerModel.findOne({ phoneNumber: cleanPhone });
    if (customer) {
      customer.cartItems = formattedItems;
      customer.lastActivityAt = /* @__PURE__ */ new Date();
      if (customer.status === "Visitor" && formattedItems.length > 0) {
        customer.status = "Cart Added";
      }
      await customer.save();
    }
    return res.json({ success: true, message: "Cart synchronized" });
  } catch (err) {
    console.error("[Public Sync Cart Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to sync cart" });
  }
});
publicRouter.post("/customer/activity", async (req, res) => {
  try {
    const { phoneNumber, action } = req.body;
    const cleanPhone = cleanIndianMobile(phoneNumber);
    if (cleanPhone) {
      await CustomerModel.updateOne(
        { phoneNumber: cleanPhone },
        { $set: { lastActivityAt: /* @__PURE__ */ new Date() } }
      );
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});
publicRouter.post("/orders", async (req, res) => {
  try {
    const {
      orderId,
      customer,
      items,
      subtotal,
      deliveryCharge,
      grandTotal,
      paymentMethod,
      razorpayOrderId,
      razorpayPaymentId,
      discount
    } = req.body;
    if (!customer?.fullName || !customer?.phone || !customer?.address || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "Customer name, phone, address and order items are required"
      });
    }
    const finalOrderId = orderId || `TP-${Math.floor(1e4 + Math.random() * 9e4)}`;
    const newOrder = new OrderModel({
      orderId: finalOrderId,
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        altPhone: customer.altPhone?.trim() || void 0,
        email: customer.email?.trim() || void 0,
        address: customer.address.trim(),
        landmark: customer.landmark?.trim() || void 0,
        city: customer.city.trim(),
        state: customer.state || "Andhra Pradesh",
        pincode: customer.pincode.trim(),
        notes: customer.notes?.trim() || void 0
      },
      items: items.map((item) => ({
        productId: item.productId || item.id,
        slug: item.slug,
        name: item.name,
        size: item.size || "250g",
        price: Number(item.price || 95),
        quantity: Number(item.quantity || 1),
        image: item.image
      })),
      subtotal: Number(subtotal),
      deliveryCharge: deliveryCharge !== void 0 ? Number(deliveryCharge) : 80,
      grandTotal: Number(grandTotal || Number(subtotal) + 80),
      discount: discount !== void 0 ? Number(discount) : 0,
      paymentMethod: paymentMethod || "Online Payment",
      paymentStatus: "Pending",
      orderStatus: "Pending",
      razorpayOrderId: razorpayOrderId || void 0,
      razorpayPaymentId: razorpayPaymentId || void 0,
      ownerNotificationSent: false,
      statusHistory: [
        {
          status: "Pending",
          timestamp: /* @__PURE__ */ new Date(),
          note: "Order placed by customer"
        }
      ]
    });
    await newOrder.save();
    const cleanPhone = cleanIndianMobile(customer.phone);
    if (cleanPhone) {
      await CustomerModel.findOneAndUpdate(
        { phoneNumber: cleanPhone },
        {
          $set: {
            status: "Ordered",
            lastOrderId: finalOrderId,
            lastActivityAt: /* @__PURE__ */ new Date(),
            cartItems: []
            // Cart converted into placed order
          },
          $inc: {
            totalOrders: 1,
            totalSpent: Number(grandTotal || Number(subtotal) + 80)
          }
        },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }
    if (newOrder.paymentStatus === "Paid" && !newOrder.ownerNotificationSent) {
      sendOrderNotificationEmail(finalOrderId).catch((emailErr) => {
        console.error(`[Order Email] Background dispatch error for Order #${finalOrderId}:`, emailErr);
      });
    }
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder
    });
  } catch (err) {
    console.error("[Public Create Order Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to place order" });
  }
});
publicRouter.get("/orders/:orderId/track", async (req, res) => {
  try {
    const rawOrderId = String(req.params.orderId).trim();
    const regex = new RegExp(`^${rawOrderId.replace(/^#/, "")}$`, "i");
    const order = await OrderModel.findOne({
      $or: [{ orderId: regex }, { orderId: `TP-${rawOrderId.replace(/^(TP-|#)/i, "")}` }]
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order #${rawOrderId} not found. Please verify your Order ID.`
      });
    }
    return res.json({
      success: true,
      data: {
        orderId: order.orderId,
        customerName: order.customer.fullName,
        city: order.customer.city,
        state: order.customer.state,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        grandTotal: order.grandTotal,
        itemsCount: order.items.length,
        items: order.items,
        tracking: order.tracking,
        statusHistory: order.statusHistory,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }
    });
  } catch (err) {
    console.error("[Public Track Order Error]:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch order tracking info" });
  }
});

// server/routes/payment.ts
import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
var paymentRouter = express.Router();
function cleanIndianMobile2(raw) {
  if (!raw || typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("91") && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    return `+91${digits.slice(2)}`;
  }
  if (digits.length === 11 && digits.startsWith("0") && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    return `+91${digits.slice(1)}`;
  }
  return null;
}
function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are missing in environment variables.");
  }
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
}
async function resolveProductPrice(productId, slug, size) {
  let product = null;
  try {
    product = await ProductModel.findOne({
      $or: [{ id: productId }, { slug: slug || productId }]
    }).lean();
  } catch (err) {
  }
  if (!product) {
    product = products.find(
      (p) => p.id === productId || slug && p.slug === slug
    );
  }
  if (!product) {
    throw new Error(`Product not found in catalog: ${productId}`);
  }
  let finalPrice = Number(product.price);
  if (size && Array.isArray(product.weightOptions) && product.weightOptions.length > 0) {
    const variant = product.weightOptions.find((w) => w.size === size);
    if (variant && typeof variant.price === "number") {
      finalPrice = Number(variant.price);
    }
  }
  return {
    price: finalPrice,
    name: product.name,
    image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : void 0,
    slug: product.slug
  };
}
paymentRouter.get("/config", (_req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  if (!keyId) {
    return res.status(500).json({ success: false, message: "Razorpay Key ID not configured" });
  }
  return res.json({ success: true, keyId });
});
paymentRouter.post("/create-order", async (req, res) => {
  try {
    await connectDB();
    const { customer, items, notes } = req.body;
    if (!customer?.fullName || !customer?.phone || !customer?.address) {
      return res.status(400).json({
        success: false,
        message: "Customer full name, mobile number, and delivery address are required."
      });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items cannot be empty."
      });
    }
    const verifiedItems = [];
    let calculatedSubtotal = 0;
    for (const item of items) {
      const pid = item.productId || item.id;
      const size = item.size || item.selectedSize || "250g";
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const resolved = await resolveProductPrice(pid, item.slug, size);
      const itemSubtotal = resolved.price * quantity;
      calculatedSubtotal += itemSubtotal;
      verifiedItems.push({
        productId: pid,
        slug: resolved.slug || item.slug,
        name: resolved.name,
        size,
        price: resolved.price,
        quantity,
        image: resolved.image || item.image
      });
    }
    const deliveryCharge = 80;
    const grandTotal = calculatedSubtotal + deliveryCharge;
    const amountInPaise = Math.round(grandTotal * 100);
    const internalOrderId = `TP-${Math.floor(1e4 + Math.random() * 9e4)}`;
    const razorpay = getRazorpayInstance();
    const rzpOrderOptions = {
      amount: amountInPaise,
      currency: "INR",
      receipt: internalOrderId,
      notes: {
        orderId: internalOrderId,
        customerName: customer.fullName.trim(),
        customerPhone: customer.phone.trim(),
        notes: (notes || customer.notes || "").slice(0, 100)
      }
    };
    const rzpOrder = await razorpay.orders.create(rzpOrderOptions);
    if (!rzpOrder || !rzpOrder.id) {
      throw new Error("Razorpay order creation returned an empty response.");
    }
    const newOrder = new OrderModel({
      orderId: internalOrderId,
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        altPhone: customer.altPhone?.trim() || void 0,
        email: customer.email?.trim() || void 0,
        address: customer.address.trim(),
        landmark: customer.landmark?.trim() || void 0,
        city: customer.city.trim(),
        state: customer.state || "Andhra Pradesh",
        pincode: customer.pincode.trim(),
        notes: customer.notes?.trim() || notes?.trim() || void 0
      },
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      grandTotal,
      currency: "INR",
      paymentProvider: "Razorpay",
      paymentMethod: "Online Payment",
      paymentStatus: "Pending",
      orderStatus: "Pending",
      razorpayOrderId: rzpOrder.id,
      ownerNotificationSent: false,
      statusHistory: [
        {
          status: "Pending",
          timestamp: /* @__PURE__ */ new Date(),
          note: `Checkout initiated. Razorpay Order ${rzpOrder.id} created.`
        }
      ]
    });
    await newOrder.save();
    const cleanPhone = cleanIndianMobile2(customer.phone);
    if (cleanPhone) {
      await CustomerModel.findOneAndUpdate(
        { phoneNumber: cleanPhone },
        {
          $set: {
            lastOrderId: internalOrderId,
            lastActivityAt: /* @__PURE__ */ new Date()
          }
        },
        { upsert: true }
      );
    }
    return res.status(201).json({
      success: true,
      orderId: rzpOrder.id,
      // Razorpay Order ID (order_xxx)
      internalOrderId,
      // TP-xxxxx
      amount: rzpOrder.amount,
      // in paise
      currency: rzpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      subtotal: calculatedSubtotal,
      deliveryCharge,
      grandTotal
    });
  } catch (err) {
    console.error("[Razorpay Create Order Error]:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to initiate secure Razorpay checkout."
    });
  }
});
paymentRouter.post("/verify", async (req, res) => {
  try {
    await connectDB();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing Razorpay signature verification parameters."
      });
    }
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      console.error("[Payment Verification] RAZORPAY_KEY_SECRET is not configured.");
      return res.status(500).json({
        success: false,
        message: "Payment verification secret is unconfigured on server."
      });
    }
    const generatedSignature = crypto.createHmac("sha256", keySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const isSignatureValid = generatedSignature.length === razorpay_signature.length && crypto.timingSafeEqual(
      Buffer.from(generatedSignature, "utf-8"),
      Buffer.from(razorpay_signature, "utf-8")
    );
    const order = await OrderModel.findOne({
      $or: [
        { razorpayOrderId: razorpay_order_id },
        ...orderId ? [{ orderId }] : []
      ]
    });
    if (!isSignatureValid) {
      console.error(`[Razorpay Signature Mismatch] Order: ${orderId || razorpay_order_id}`);
      if (order) {
        order.paymentStatus = "Failed";
        order.paymentVerificationError = "Signature mismatch";
        order.statusHistory.push({
          status: "Cancelled",
          timestamp: /* @__PURE__ */ new Date(),
          note: `Payment signature verification failed. Generated: ${generatedSignature.slice(0, 10)}... Received: ${razorpay_signature.slice(0, 10)}...`
        });
        await order.save();
      }
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Signature mismatch."
      });
    }
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order for Razorpay reference ${razorpay_order_id} not found.`
      });
    }
    if (order.paymentStatus === "Paid") {
      console.log(`[Payment Verify] Order #${order.orderId} is already marked as Paid. Returning success.`);
      return res.json({
        success: true,
        message: "Payment already verified.",
        orderId: order.orderId
      });
    }
    order.paymentStatus = "Paid";
    order.orderStatus = "Confirmed";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.razorpaySignatureVerified = true;
    order.paidAt = /* @__PURE__ */ new Date();
    order.statusHistory.push({
      status: "Confirmed",
      timestamp: /* @__PURE__ */ new Date(),
      note: `Online payment of \u20B9${order.grandTotal} captured via Razorpay (Payment ID: ${razorpay_payment_id}).`
    });
    await order.save();
    const cleanPhone = cleanIndianMobile2(order.customer.phone);
    if (cleanPhone) {
      await CustomerModel.findOneAndUpdate(
        { phoneNumber: cleanPhone },
        {
          $set: {
            status: "Ordered",
            lastOrderId: order.orderId,
            lastActivityAt: /* @__PURE__ */ new Date(),
            cartItems: []
          },
          $inc: {
            totalOrders: 1,
            totalSpent: order.grandTotal
          }
        },
        { upsert: true }
      );
    }
    if (!order.ownerNotificationSent) {
      sendOrderNotificationEmail(order.orderId).catch((emailErr) => {
        console.error(`[Resend Error on Payment Verification for #${order.orderId}]:`, emailErr);
      });
    }
    if (order.customer?.email && !order.customerNotificationSent) {
      sendCustomerOrderConfirmationEmail(order.orderId).catch((cErr) => {
        console.error(`[Customer Email Error on Payment Verification for #${order.orderId}]:`, cErr);
      });
    }
    return res.json({
      success: true,
      message: "Payment successfully verified and order confirmed!",
      orderId: order.orderId,
      paymentId: razorpay_payment_id
    });
  } catch (err) {
    console.error("[Razorpay Verify Error]:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Internal error verifying payment signature."
    });
  }
});
paymentRouter.post("/webhook", async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers["x-razorpay-signature"];
      const rawBody = req.rawBody;
      if (!signature || !rawBody) {
        console.error("[Razorpay Webhook] Missing signature header or raw request body");
        return res.status(400).json({ success: false, message: "Missing signature or body" });
      }
      const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
      const isSignatureValid = expectedSignature.length === signature.length && crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(signature, "utf-8")
      );
      if (!isSignatureValid) {
        console.error("[Razorpay Webhook] Invalid webhook signature received");
        return res.status(400).json({ success: false, message: "Invalid webhook signature" });
      }
    }
    await connectDB();
    const event = req.body;
    const eventType = event?.event;
    console.log(`[Razorpay Webhook] Received event: ${eventType}`);
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const payment = event.payload?.payment?.entity;
      const rzpOrderId = payment?.order_id || event.payload?.order?.entity?.id;
      const rzpPaymentId = payment?.id;
      if (rzpOrderId) {
        const order = await OrderModel.findOne({ razorpayOrderId: rzpOrderId });
        if (order && order.paymentStatus !== "Paid") {
          order.paymentStatus = "Paid";
          if (order.orderStatus === "Pending") {
            order.orderStatus = "Confirmed";
          }
          if (rzpPaymentId) {
            order.razorpayPaymentId = rzpPaymentId;
          }
          order.paidAt = /* @__PURE__ */ new Date();
          order.statusHistory.push({
            status: "Confirmed",
            timestamp: /* @__PURE__ */ new Date(),
            note: `Payment confirmed via Razorpay Webhook (${eventType}).`
          });
          await order.save();
          if (!order.ownerNotificationSent) {
            sendOrderNotificationEmail(order.orderId).catch((err) => {
              console.error(`[Webhook Email Error for #${order.orderId}]:`, err);
            });
          }
          if (order.customer?.email && !order.customerNotificationSent) {
            sendCustomerOrderConfirmationEmail(order.orderId).catch((err) => {
              console.error(`[Webhook Customer Email Error for #${order.orderId}]:`, err);
            });
          }
        }
      }
    } else if (eventType === "payment.failed") {
      const payment = event.payload?.payment?.entity;
      const rzpOrderId = payment?.order_id;
      if (rzpOrderId) {
        const order = await OrderModel.findOne({ razorpayOrderId: rzpOrderId });
        if (order && order.paymentStatus === "Pending") {
          order.paymentStatus = "Failed";
          order.paymentVerificationError = payment?.error_description || "Payment failed";
          await order.save();
        }
      }
    }
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("[Razorpay Webhook Error]:", err);
    return res.status(500).json({ received: false, error: err?.message });
  }
});

// server/index.ts
dotenv4.config();
var app = express2();
var PORT = process.env.PORT || 5e3;
app.use(cors({ origin: true, credentials: true }));
app.use(
  express2.json({
    limit: "15mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    }
  })
);
app.use(express2.urlencoded({ extended: true, limit: "15mb" }));
var healthHandler = (_req, res) => {
  res.json({
    status: "ok",
    service: "TastyPickle API",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
};
app.get("/api/health", healthHandler);
app.get("/health", healthHandler);
var isSeeded = false;
app.use(async (_req, _res, next) => {
  try {
    await connectDB();
    if (!isSeeded) {
      isSeeded = true;
      seedProductsIfEmpty().catch((err) => console.error("[Seed Error]:", err));
    }
  } catch (err) {
    console.error("[MongoDB Serverless Middleware]:", err);
  }
  next();
});
app.use("/api/payment", paymentRouter);
app.use("/payment", paymentRouter);
app.use("/api/admin", adminRouter);
app.use("/admin", adminRouter);
app.use("/api", publicRouter);
app.use("/", publicRouter);
app.use((err, _req, res, _next) => {
  console.error("[API Server Error]:", err);
  if (!res.headersSent) {
    res.status(500).json({
      success: false,
      message: err?.message || "Internal server error"
    });
  }
});
var server_default = app;
async function initDB() {
  try {
    await connectDB();
    await seedProductsIfEmpty();
  } catch (err) {
    console.error("Failed to initialize database:", err);
  }
}
if (process.env.RUN_SERVER === "true") {
  initDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[TastyPickle Backend] Server running on http://localhost:${PORT}`);
    });
  });
}

// api/index.ts
var index_default = server_default;
export {
  index_default as default
};
