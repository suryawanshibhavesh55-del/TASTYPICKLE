import React, { useState } from 'react';
import { Product } from '../../types/product';
import { ChevronDown, Utensils, ShieldAlert, Sparkles, Layers, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductAccordionsProps {
  product: Product;
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({ product }) => {
  const [openSection, setOpenSection] = useState<string | null>('description');

  const toggle = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections = [
    {
      id: 'description',
      title: 'Detailed Product Description',
      icon: Layers,
      content: (
        <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
          <p>{product.description}</p>
          <div className="flex items-center gap-3 pt-2 text-xs">
            <span className="font-semibold text-stone-900">Taste Profile:</span>
            <span className="text-stone-600 bg-cream-200 px-2.5 py-1 rounded-md">{product.tasteProfile}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-stone-900">Spice Level:</span>
            <span className="text-spicered font-semibold bg-red-50 border border-red-200 px-2.5 py-1 rounded-md">{product.spiceLevel}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'ingredients',
      title: 'Ingredients & Flavour Composition',
      icon: Sparkles,
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-500">
            Crafted with authentic ingredients strictly based on the jar specification:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
            {product.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center gap-2 bg-cream-100/70 p-2 rounded-lg border border-[#E7E2DA]/60">
                <span className="w-1.5 h-1.5 rounded-full bg-pickle-700 flex-shrink-0" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'serving',
      title: 'How To Enjoy & Serving Suggestions',
      icon: Utensils,
      content: (
        <div className="space-y-3">
          <p className="text-xs text-stone-500">
            This pickle pairs exceptionally well with traditional Indian meals:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
            {product.servingSuggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-pickle-800 font-bold">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'storage',
      title: 'Storage & Shelf Life Instructions',
      icon: ShieldAlert,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 space-y-1">
            <p className="font-semibold text-amber-900">Storage Guidelines</p>
            <p className="text-stone-700">{product.storage}</p>
          </div>
          <div className="flex items-center gap-2 text-stone-600">
            <Clock className="w-4 h-4 text-stone-400" />
            <span><strong>Shelf Life:</strong> {product.shelfLife}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="border-t border-[#E7E2DA] divide-y divide-[#E7E2DA] mt-8">
      {sections.map((sec) => {
        const isOpen = openSection === sec.id;
        const Icon = sec.icon;

        return (
          <div key={sec.id} className="py-4">
            <button
              type="button"
              onClick={() => toggle(sec.id)}
              className="flex items-center justify-between w-full text-left font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-pickle-800 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-pickle-700" />
                <span>{sec.title}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-pickle-800' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-1">{sec.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
