import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLiveProducts } from '../context/ProductContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductOptions } from '../components/product/ProductOptions';
import { ProductAccordions } from '../components/product/ProductAccordions';
import { ProductGrid } from '../components/product/ProductGrid';
import { useCart, TASTYPICKLE_WHATSAPP_NUMBER } from '../context/CartContext';
import { OrderModal } from '../components/checkout/OrderModal';
import {
  Leaf,
  Flame,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  HeartHandshake,
  ArrowLeft,
  Share2,
  Check,
  Zap,
  Sparkles,
} from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, getProductBySlug } = useLiveProducts();

  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      const defaultVariant = product.weightOptions.find((v) => v.isPopular) || product.weightOptions[0];
      setSelectedSize(defaultVariant ? defaultVariant.size : '250g');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Pickle Not Found</h1>
        <p className="text-sm text-stone-600">The product you are looking for does not exist or has been relocated.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pickle-800 text-white text-xs font-semibold hover:bg-pickle-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Pickles
        </Link>
      </div>
    );
  }

  const isVeg = product.category === 'veg';
  const isCombo = product.category === 'combo';
  const isKharamPodi = product.category === 'kharam-podi';
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const directWhatsAppUrl = `https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello TastyPickle, I am interested in ${product.name} (${selectedSize}, Qty: ${quantity}). Please share the price and availability.`
  )}`;

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 font-medium">
        <Link to="/" className="hover:text-pickle-800">Home</Link>
        <span>/</span>
        <Link
          to={isCombo ? '/combo-packs' : isKharamPodi ? '/kharam-podi' : isVeg ? '/veg-pickle' : '/non-veg-pickle'}
          className="hover:text-pickle-800"
        >
          {isCombo ? 'Combo Packs' : isKharamPodi ? 'Kharam Podi' : isVeg ? 'Veg Pickle' : 'Non Veg Pickle'}
        </Link>
        <span>/</span>
        <span className="text-stone-800 font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Two-Column Layout matching Spicewale PDP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LEFT COLUMN: Dominant Image Gallery (Col span 7) */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* RIGHT COLUMN: Product Details, Actions & Accordions (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header & Badges */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isCombo ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-300">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    Combo Pack
                  </span>
                ) : isKharamPodi ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Kharam Podi
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isVeg
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-red-100 text-red-900 border border-red-300'
                    }`}
                  >
                    {isVeg ? (
                      <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                    ) : (
                      <Flame className="w-3.5 h-3.5 text-spicered" />
                    )}
                    {isVeg ? 'Veg Pickle' : 'Non Veg Pickle'}
                  </span>
                )}
                {product.teluguName && (
                  <span className="text-xs font-semibold text-stone-500 bg-cream-200/90 px-2.5 py-1 rounded-full">
                    {product.teluguName}
                  </span>
                )}
              </div>

              {/* Share link button */}
              <button
                type="button"
                onClick={handleShare}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-cream-200 rounded-full transition-colors relative"
                title="Share link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                {copiedLink && (
                  <span className="absolute -top-7 right-0 bg-stone-900 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                    Link copied!
                  </span>
                )}
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3.5xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-stone-600 text-sm leading-relaxed pt-1">
              {product.shortDescription}
            </p>
          </div>

          {/* Price Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#F4EFE6] border border-[#E2DBD0] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">
                Standard 250g Jar Price
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl sm:text-3.5xl font-serif font-bold text-stone-900">
                  ₹{product.price}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  / 250g bottle
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2.5 py-1 rounded-full">
                Inclusive of all taxes
              </span>
              <p className="text-[11px] font-medium text-stone-700 mt-1">
                + ₹80 Delivery Charges
              </p>
            </div>
          </div>

          {/* Size Variant Selector */}
          <ProductOptions
            variants={product.weightOptions}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />

          {/* Quantity Selector and Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Quantity:
              </label>
              <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-semibold text-stone-900 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-pickle-900 text-white text-xs sm:text-sm font-semibold hover:bg-pickle-800 shadow-md transition-colors active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOrderModalOpen(true)}
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-spicered text-white text-xs sm:text-sm font-bold hover:bg-red-700 shadow-md transition-all active:scale-[0.99]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Order Now</span>
              </button>
            </div>
          </div>

          {/* Trust Highlights Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E7E2DA] text-center">
            <div className="flex flex-col items-center gap-1 text-[11px] font-medium text-stone-700">
              <ShieldCheck className="w-4 h-4 text-pickle-700" />
              <span>100% Traditional</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-[11px] font-medium text-stone-700">
              <Truck className="w-4 h-4 text-pickle-700" />
              <span>Pan-India Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-[11px] font-medium text-stone-700">
              <HeartHandshake className="w-4 h-4 text-pickle-700" />
              <span>Zero Preservatives</span>
            </div>
          </div>

          {/* Information Accordions (Description, Ingredients, How to enjoy, Storage) */}
          <ProductAccordions product={product} />

        </div>
      </div>

      {/* Related Products Section ("You May Also Like") */}
      <div className="mt-20 pt-12 border-t border-[#E7E2DA]">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-spicered font-accent">
            Handcrafted Suggestions
          </span>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-stone-900 tracking-tight">
            You May Also Like
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm">
            Explore complementary pickles made with the same traditional passion and authentic ingredients.
          </p>
        </div>

        <ProductGrid products={relatedProducts} />
      </div>

      {/* Order Now Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={[{ product, selectedSize, quantity }]}
      />
    </div>
  );
};
