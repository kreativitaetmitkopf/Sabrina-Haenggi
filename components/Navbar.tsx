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
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex flex-col z-50" onClick={handleNavClick}>
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
               // Handle anchor links on home page vs other pages
               const isAnchor = item.href.startsWith('/#');
               const to = isAnchor ? item.href.substring(1) : item.href;
               
               // Use a simple logic: if it's an anchor and we are on home, we just scroll. 
               // If we are not on home, we link to /.
               // Since we use HashRouter, anchors are tricky. 
               // For this implementation, we will treat internal anchors as standard Links if not on home.
               
               // Simplified for HashRouter compatibility:
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
          <div className="flex md:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-dark focus:outline-none"
              aria-label="Menü öffnen"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-20 bg-white z-40 md:hidden animate-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col p-6 space-y-6">
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
                    className="text-xl font-medium text-dark hover:text-primary"
                  >
                    {item.label}
                  </NavLink>
               );
            })}
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
              className="bg-accent text-dark px-6 py-4 rounded-lg text-center font-bold"
            >
              Jetzt anrufen
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};