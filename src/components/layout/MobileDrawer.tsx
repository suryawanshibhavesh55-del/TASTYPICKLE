import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Phone, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Veg Pickle', path: '/veg-pickle', count: '12 Items' },
  { name: 'Non Veg Pickle', path: '/non-veg-pickle', count: '5 Items' },
  { name: 'Combo Packs', path: '/combo-packs', count: '6 Combos' },
  { name: 'All Pickles', path: '/products' },
  { name: 'Track Order', path: '/track-order' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-y-0 left-0 max-w-[320px] w-full bg-cream-50 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7E2DA]">
                <div>
                  <span className="font-serif text-xl font-bold tracking-tight text-pickle-900 block">
                    TastyPickle
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-stone-500 font-medium">
                    Menu & Navigation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 -mr-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-cream-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-4 px-4">
                <p className="px-3 text-[11px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                  Explore Flavours
                </p>
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-pickle-800 text-white font-semibold'
                            : 'text-stone-700 hover:bg-cream-200/70 hover:text-stone-900'
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      <div className="flex items-center gap-2">
                        {link.count && (
                          <span className="text-[10px] opacity-75 font-normal px-2 py-0.5 rounded-full bg-black/5">
                            {link.count}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </div>
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Quick Trust Badges in Drawer */}
              <div className="mx-4 p-4 rounded-2xl bg-cream-200/70 border border-[#E7E2DA] space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-pickle-700 flex-shrink-0" />
                  <span>100% Traditional Homemade Recipes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700">
                  <Heart className="w-4 h-4 text-spicered flex-shrink-0" />
                  <span>Pure Cold-Pressed Oils & Spices</span>
                </div>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 border-t border-[#E7E2DA] bg-cream-100">
              <p className="text-[11px] text-stone-500 font-medium uppercase tracking-wider mb-2">
                Order & Enquire Directly
              </p>
              <a
                href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello TastyPickle, I have an enquiry regarding your pickles.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] text-white text-sm font-semibold shadow hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-stone-500">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 91213 82438</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
