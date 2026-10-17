import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, X, MessageCircle, Truck, ShieldCheck } from 'lucide-react';
import { useCart, TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';
import { useLiveProducts } from '../../context/ProductContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { products } = useLiveProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter products for instant dropdown
  const filteredProducts = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-cream-50/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#E7E2DA] transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* LEFT: Search Bar (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center flex-1 md:max-w-xs">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 -ml-2 text-stone-700 hover:text-pickle-800 focus:outline-none"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Search Bar matching Spicewale's round input */}
            <div ref={searchRef} className="hidden md:block w-full relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search pickles (e.g. Mango, Chicken)..."
                  className="w-full bg-[#FAF7F2] text-sm text-stone-800 placeholder-stone-400 pl-10 pr-9 py-2.5 rounded-full border border-[#DCD6CA] focus:outline-none focus:border-pickle-700 focus:ring-1 focus:ring-pickle-700/30 transition-all duration-200"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Live search dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50 animate-fadeIn">
                  {filteredProducts.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-1 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                        Matching Pickles
                      </div>
                      {filteredProducts.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          onClick={() => {
                            setIsSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-cream-100 transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg bg-stone-100 flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-stone-800 truncate">{p.name}</p>
                            <p className="text-xs text-pickle-700 uppercase font-semibold text-[10px]">
                              {p.category === 'veg' ? 'Veg Pickle' : 'Non-Veg Pickle'}
                            </p>
                          </div>
                        </Link>
                      ))}
                      <div className="px-4 pt-2 pb-1 border-t border-stone-100">
                        <button
                          onClick={handleSearchSubmit}
                          className="text-xs text-pickle-800 font-semibold hover:underline block w-full text-center"
                        >
                          View all results for "{searchQuery}" →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-stone-500">
                      No pickles found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CENTER: TastyPickle Typographic Logo */}
          <div className="flex-1 text-center flex flex-col items-center justify-center">
            <Link to="/" className="group inline-flex flex-col items-center">
              <span className="font-serif text-2xl sm:text-3xl md:text-3.5xl tracking-tight font-bold text-[#A30813] group-hover:text-pickle-700 transition-colors duration-200">
                TastyPickle
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-stone-500 font-medium -mt-1 group-hover:text-stone-700 transition-colors">
                Authentic Indian Pickles
              </span>
            </Link>
          </div>

          {/* RIGHT: Actions (WhatsApp, Account, Cart) */}
          <div className="flex items-center justify-end flex-1 md:max-w-xs space-x-2 sm:space-x-4">
            {/* Quick WhatsApp button on desktop */}
            <a
              href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-green-700 py-1.5 px-3 rounded-full hover:bg-green-50 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="hidden xl:inline">Order via WhatsApp</span>
            </a>

            {/* Account & Tracking Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-stone-700 hover:text-pickle-800 hover:bg-cream-200/60 rounded-full transition-colors relative"
                title="Account & Order Tracking"
                aria-label="Account & Order Tracking"
              >
                <User className="w-5 h-5" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-left animate-fadeIn">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-900">TastyPickle Account</p>
                    <p className="text-[10px] text-stone-400">Order tracking & quick help</p>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      to="/track-order"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-800 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <Truck className="w-4 h-4 text-red-700" />
                      <span>Track Order / My Orders</span>
                    </Link>

                    <a
                      href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello TastyPickle, I would like to inquire about customer support and my orders.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp Support</span>
                    </a>

                    <div className="pt-1 border-t border-stone-100">
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                        <span>Admin Console</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon with Live Count */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-stone-800 hover:text-pickle-800 hover:bg-cream-200/60 rounded-full transition-colors relative flex items-center justify-center"
              aria-label={`Shopping Cart with ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#700E0F] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-cream-50 animate-scaleIn">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Row */}
        <div className="md:hidden pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pickles..."
              className="w-full bg-[#FAF7F2] text-sm text-stone-800 placeholder-stone-400 pl-10 pr-9 py-2 rounded-full border border-[#DCD6CA] focus:outline-none focus:border-pickle-700"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};
