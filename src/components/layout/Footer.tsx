import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#450A0A] text-[#FAF7F2] border-t border-red-950 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-red-900/50">
          
          {/* Col 1 & 2: Brand Heritage & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white block">
                TastyPickle
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-pickle-300 font-medium">
                Traditional Indian Pickles
              </span>
            </Link>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Handcrafted homemade-style Indian pickles prepared with authentic regional recipes, sun-dried spices, and pure cold-pressed groundnut oil. Made with deep love for Indian culinary tradition.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Direct Orders
              </a>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pickle-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">All Pickles</Link>
              </li>
              <li>
                <Link to="/veg-pickle" className="hover:text-white transition-colors">Veg Pickle</Link>
              </li>
              <li>
                <Link to="/non-veg-pickle" className="hover:text-white transition-colors">Non Veg Pickle</Link>
              </li>
              <li>
                <Link to="/combo-packs" className="hover:text-white transition-colors">Combo Packs</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pickle-200">
              Pickle Categories
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              <li>
                <Link to="/veg-pickle" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Veg Pickles</span>
                  <span className="text-xs text-pickle-400">12 Types</span>
                </Link>
              </li>
              <li>
                <Link to="/non-veg-pickle" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Non-Veg Pickles</span>
                  <span className="text-xs text-pickle-400">5 Types</span>
                </Link>
              </li>
              <li>
                <Link to="/combo-packs" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Combo Packs</span>
                  <span className="text-xs text-amber-400 font-semibold">6 Packs</span>
                </Link>
              </li>
              <li>
                <Link to="/product/mango-pickle" className="hover:text-white transition-colors">Avakaya Mango</Link>
              </li>
              <li>
                <Link to="/product/boneless-chicken-pickle" className="hover:text-white transition-colors">Chicken Pickle</Link>
              </li>
              <li>
                <Link to="/product/boneless-mutton-pickle" className="hover:text-white transition-colors">Mutton Pickle</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-pickle-200">
              Customer Support
            </h4>
            <div className="space-y-2.5 text-sm text-stone-300">
              <a
                href={`https://wa.me/${TASTYPICKLE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-pickle-400 flex-shrink-0" />
                <span>+91 91213 82438</span>
              </a>
              <div className="flex items-center gap-2 text-stone-400">
                <Mail className="w-4 h-4 text-pickle-400 flex-shrink-0" />
                <span>orders@tastypickle.in</span>
              </div>
              <p className="text-xs text-stone-400 pt-1 leading-relaxed">
                Dispatching pan-India. For bulk orders & custom gifting, contact us via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-pickle-400" />
            <span>Pure Ingredients • Homemade Heritage • Sealed For Freshness</span>
          </div>
          <div>
            <p>© 2026 TastyPickle. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
