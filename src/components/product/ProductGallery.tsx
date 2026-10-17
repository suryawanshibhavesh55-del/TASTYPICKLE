import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const activeImage = images[selectedImageIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Primary Dominant Image */}
      <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden bg-white border border-[#E7E2DA] shadow-sm flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={productName}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain p-2 sm:p-4 hover:scale-105 transition-transform duration-500 ease-out cursor-zoom-in"
          />
        </AnimatePresence>

        {/* Small brand watermark pill */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200 text-[10px] uppercase font-bold text-stone-600 tracking-wider">
          TastyPickle • Authentic Batch
        </div>
      </div>

      {/* Thumbnails if multiple images exist */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white p-1 ${
                selectedImageIndex === idx
                  ? 'border-pickle-800 ring-2 ring-pickle-700/20 shadow-md'
                  : 'border-[#E7E2DA] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
