import React from 'react';
import { MessageCircle } from 'lucide-react';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover (desktop) */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-full bg-stone-900 text-white text-xs font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us on WhatsApp
      </span>

      {/* Button */}
      <a
        href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello TastyPickle, I would like to enquire about your pickles.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order or Chat on WhatsApp with TastyPickle"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:bg-[#1EBE5D] hover:scale-105 active:scale-95 transition-all duration-200 relative"
      >
        {/* Subtle pulsing outer ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </a>
    </aside>
  );
};
