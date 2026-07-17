import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';
import { Facebook, Mail, MapPin } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

export const Footer: React.FC = () => {
  const location = useLocation();
  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-dark text-white pt-16 pb-8" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t.footer.brandDesc}
            </p>
            <div className="flex space-x-4">
              <a href={SITE_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={24} />
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">{t.footer.navTitle}</h4>
            <ul className="space-y-3">
              <li><NavLink to={`/${currentLang}`} className="text-gray-400 hover:text-white transition-colors">{t.footer.startpage}</NavLink></li>
              <li><NavLink to={`/${currentLang}/downloads`} className="text-gray-400 hover:text-white transition-colors">{t.footer.downloadsAndChecklists}</NavLink></li>
              <li><NavLink to={`/${currentLang}/impressum`} className="text-gray-400 hover:text-white transition-colors">{t.footer.impressum}</NavLink></li>
              <li><NavLink to={`/${currentLang}/datenschutz`} className="text-gray-400 hover:text-white transition-colors">{t.footer.privacy}</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">{t.footer.contactTitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400">
                <MapPin className="mr-3 h-6 w-6 shrink-0" />
                <span>{t.footer.mobileCare}<br />{t.footer.wholeIsland}</span>
              </li>
              <li className="flex items-center text-gray-400">
                <span className="font-semibold text-white mr-2">{t.footer.tel}</span>
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <span className="font-semibold text-white mr-2">{t.footer.email}</span>
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-primary transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>{t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
          <p className="mt-2">
            {t.footer.notLegalAdvice}
          </p>
          <p className="mt-6 text-xs text-gray-600 font-medium">
            {t.footer.createdWithLove}
          </p>
        </div>
      </div>
    </footer>
  );
};
