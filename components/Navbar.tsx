import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_ITEMS, SITE_CONFIG } from '../constants';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative">
          {/* Logo */}
          <NavLink to="/" className="flex flex-col" onClick={handleNavClick}>
            <span className="text-xl font-bold text-dark tracking-tight">
              Sabrina Hänggi
            </span>
            <span className="text-xs text-primary font-medium tracking-wide uppercase">
              Pflege auf Lanzarote
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
               const finalTo = item.href.replace('/#', '/');
               return (
                <NavLink
                  key={item.label}
                  to={item.href.startsWith('/#') && location.pathname === '/' ? item.href.substring(1) : finalTo}
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                  onClick={(e) => {
                     if (item.href.startsWith('/#') && location.pathname === '/') {
                        e.preventDefault();
                        const id = item.href.substring(2);
                        const element = document.getElementById(id);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                     }
                  }}
                >
                  {item.label}
                </NavLink>
              );
            })}
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Phone size={16} />
              <span>Notfall: 112</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-dark focus:outline-none p-2"
              aria-label="Menü öffnen"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

           {/* Mobile Menu Dropdown (Rechte obere Ecke) */}
          {isOpen && (
            <div className="absolute top-full right-0 w-72 bg-white shadow-2xl rounded-bl-2xl border-l border-b border-gray-100 md:hidden animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col p-6 space-y-4 items-end">
                {NAV_ITEMS.map((item) => {
                   const finalTo = item.href.replace('/#', '/');
                   return (
                      <NavLink
                        key={item.label}
                        to={finalTo}
                        onClick={() => {
                            handleNavClick();
                            if (item.href.startsWith('/#') && location.pathname === '/') {
                                 const id = item.href.substring(2);
                                 setTimeout(() => {
                                     const element = document.getElementById(id);
                                     if (element) element.scrollIntoView({ behavior: 'smooth' });
                                 }, 100);
                            }
                        }}
                        className="text-lg font-medium text-gray-700 hover:text-primary text-right w-full block"
                      >
                        {item.label}
                      </NavLink>
                   );
                })}
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  className="bg-accent text-dark px-5 py-3 rounded-lg text-center font-bold w-full mt-4 block"
                >
                  Jetzt anrufen
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};