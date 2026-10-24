import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'VEG PICKLE', path: '/veg-pickle', badge: '12 Varieties' },
  { name: 'NON VEG PICKLE', path: '/non-veg-pickle', badge: 'Popular' },
  { name: 'KHARAM PODI', path: '/kharam-podi', badge: 'New' },
  { name: 'COMBO PACKS', path: '/combo-packs', badge: 'Save More' },
  { name: 'ALL PICKLES', path: '/products' },
  { name: 'ABOUT US', path: '/about' },
  { name: 'CONTACT', path: '/contact' },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="hidden md:block bg-[#A30813] text-white shadow-sm border-b border-[#88060F] transition-colors select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center justify-center space-x-4 lg:space-x-8 py-2.5 text-xs font-bold tracking-[0.14em]">
          {navItems.map((item) => (
            <li key={item.path} className="relative group">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1.5 px-3.5 rounded-full transition-all duration-200 uppercase outline-none focus:outline-none ${
                    isActive
                      ? 'bg-white text-[#A30813] font-extrabold shadow-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/10 font-medium'
                  }`
                }
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="hidden xl:inline-block px-2 py-0.5 text-[9px] font-bold rounded-full bg-black/20 text-white group-hover:bg-white/20 transition-colors normal-case tracking-normal">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
