import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { SITE_CONFIG } from '../constants';
import { Language, TRANSLATIONS, LANGUAGE_LABELS } from '../lib/translations';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  const localizedNavItems = [
    { label: t.nav.services, href: `/${currentLang}#services`, id: 'services' },
    { label: t.nav.about, href: `/${currentLang}#about`, id: 'about' },
    { label: t.nav.families, href: `/${currentLang}#families`, id: 'families' },
    { label: t.nav.news, href: `/${currentLang}#news`, id: 'news' },
    { label: t.nav.downloads, href: `/${currentLang}/downloads` },
    { label: t.nav.contact, href: `/${currentLang}#contact`, id: 'contact' },
  ];

  const switchLanguage = (newLang: Language) => {
    const pathParts = location.pathname.split('/');
    // Check if the current URL starts with a valid language prefix
    if (pathParts[1] === 'de' || pathParts[1] === 'es' || pathParts[1] === 'en') {
      pathParts[1] = newLang;
    } else {
      pathParts.unshift(newLang);
    }
    const newPath = pathParts.join('/');
    localStorage.setItem('user-language', newLang);
    navigate(`${newPath}${location.search}${location.hash}`);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative">
          {/* Logo */}
          <NavLink to={`/${currentLang}`} className="flex flex-col" onClick={handleNavClick}>
            <span className="text-xl font-bold text-dark tracking-tight">
              Sabrina Hänggi
            </span>
            <span className="text-xs text-primary font-medium tracking-wide uppercase">
              {t.nav.brandSub}
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {localizedNavItems.map((item) => {
              const isHash = item.href.includes('#');
              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                  onClick={(e) => {
                    if (isHash && location.pathname.startsWith(`/${currentLang}`) && !location.pathname.includes('/downloads') && !location.pathname.includes('/download/') && !location.pathname.includes('/warteliste') && !location.pathname.includes('/thank-you') && !location.pathname.includes('/confirm') && !location.pathname.includes('/impressum') && !location.pathname.includes('/datenschutz')) {
                      e.preventDefault();
                      const element = document.getElementById(item.id || '');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', item.href);
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
              className="bg-primary text-white px-3 py-2 rounded-full text-xs font-bold hover:bg-blue-600 transition-colors flex items-center gap-1.5"
            >
              <Phone size={14} />
              <span>{t.nav.emergency}</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
              {(['de', 'es', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                    currentLang === lang
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-500 hover:text-dark hover:bg-gray-100'
                  }`}
                  title={LANGUAGE_LABELS[lang]}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Quick Lang Switcher for Mobile */}
            <div className="flex items-center bg-gray-50 p-0.5 rounded-lg border border-gray-100">
              {(['de', 'es', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={`px-2 py-0.5 text-[10px] font-black rounded transition-all ${
                    currentLang === lang
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-500 hover:text-dark'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-dark focus:outline-none p-2"
              aria-label="Menü öffnen"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isOpen && (
            <div className="absolute top-full right-0 w-72 bg-white shadow-2xl rounded-bl-2xl border-l border-b border-gray-100 md:hidden animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col p-6 space-y-4 items-end">
                {localizedNavItems.map((item) => {
                  const isHash = item.href.includes('#');
                  return (
                    <NavLink
                      key={item.label}
                      to={item.href}
                      onClick={() => {
                        handleNavClick();
                        if (isHash && location.pathname.startsWith(`/${currentLang}`) && !location.pathname.includes('/downloads') && !location.pathname.includes('/download/') && !location.pathname.includes('/warteliste') && !location.pathname.includes('/thank-you') && !location.pathname.includes('/confirm') && !location.pathname.includes('/impressum') && !location.pathname.includes('/datenschutz')) {
                          const element = document.getElementById(item.id || '');
                          if (element) {
                            setTimeout(() => {
                              element.scrollIntoView({ behavior: 'smooth' });
                              window.history.pushState(null, '', item.href);
                            }, 100);
                          }
                        }
                      }}
                      className="text-lg font-semibold text-gray-700 hover:text-primary text-right w-full block"
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  className="bg-accent text-dark px-5 py-3 rounded-xl text-center font-bold w-full mt-4 block text-sm"
                >
                  {t.nav.callNow}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
