import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Leaf, Flame, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isVeg = product.category === 'veg';
  const isCombo = product.category === 'combo';
  const isKharamPodi = product.category === 'kharam-podi';

  const whatsappMessage = encodeURIComponent(
    `Hello TastyPickle, I am interested in ${product.name}. Please share the price and availability.`
  );

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#E7E2DA] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg card-shadow">
      
      {/* Top Image Area */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#F7F5F0]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {isCombo ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Combo Pack
            </span>
          ) : isKharamPodi ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm bg-amber-800 text-white">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Kharam Podi
            </span>
          ) : (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm ${
                isVeg
                  ? 'bg-emerald-900/90 text-white'
                  : 'bg-spicered/95 text-white'
              }`}
            >
              {isVeg ? (
                <Leaf className="w-3 h-3 text-emerald-300" />
              ) : (
                <Flame className="w-3 h-3 text-amber-300" />
              )}
              {isVeg ? 'Veg' : 'Non-Veg'}
            </span>
          )}

          {product.bestSeller && (
            <span className="bg-[#D97706] text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider uppercase shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Hover quick action overlay button */}
        <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10">
          <span className="w-9 h-9 rounded-full bg-white/95 text-stone-900 flex items-center justify-center shadow-md hover:bg-pickle-800 hover:text-white transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </Link>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
              {product.teluguName || (isCombo ? 'Value Combo Pack' : isVeg ? 'Traditional Veg' : 'Speciality Non-Veg')}
            </span>
            <span className="text-[11px] font-semibold text-stone-600 bg-cream-200/80 px-2 py-0.5 rounded-md">
              {product.weightOptions[0]?.size || '250g'}
            </span>
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug group-hover:text-pickle-800 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Buttons */}
        <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
              250g Bottle
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-serif font-bold text-stone-900">
                ₹{product.price}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp enquire icon button */}
            <a
              href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#25D366] hover:bg-emerald-50 rounded-xl transition-colors"
              title="Enquire on WhatsApp"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* View Product CTA */}
            <Link
              to={`/product/${product.slug}`}
              className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-pickle-800 transition-colors"
            >
              View
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
