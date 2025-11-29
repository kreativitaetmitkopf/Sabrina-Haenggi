import React from 'react';
import { NavLink } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';
import { Facebook, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">{SITE_CONFIG.name}</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Professionelle Pflege mit Herz auf Lanzarote. 
              Sicherheit und Lebensqualität für Sie und Ihre Angehörigen. 
              Rund um die Uhr erreichbar.
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
            <h4 className="text-lg font-semibold mb-4 text-accent">Navigation</h4>
            <ul className="space-y-3">
              <li><NavLink to="/" className="text-gray-400 hover:text-white transition-colors">Startseite</NavLink></li>
              <li><NavLink to="/downloads" className="text-gray-400 hover:text-white transition-colors">Downloads & Checklisten</NavLink></li>
              <li><NavLink to="/impressum" className="text-gray-400 hover:text-white transition-colors">Impressum</NavLink></li>
              <li><NavLink to="/datenschutz" className="text-gray-400 hover:text-white transition-colors">Datenschutz</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400">
                <MapPin className="mr-3 h-6 w-6 shrink-0" />
                <span>Mobile Pflege auf Lanzarote<br />Costa Teguise & ganze Insel</span>
              </li>
              <li className="flex items-center text-gray-400">
                 <span className="font-semibold text-white mr-2">Tel:</span>
                 <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                   {SITE_CONFIG.phone}
                 </a>
              </li>
              <li className="flex items-center text-gray-400">
                 <span className="font-semibold text-white mr-2">E-Mail:</span>
                 <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-primary transition-colors">
                   {SITE_CONFIG.email}
                 </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sabrina Hänggi. Alle Rechte vorbehalten.</p>
          <p className="mt-2">
            Dies ist keine Rechtsberatung. Für medizinische Notfälle wählen Sie immer die 112.
          </p>
          <p className="mt-6 text-xs text-gray-600 font-medium">
            Erstellt mit 🩷 von Marion Hänggi... beim Kaffee ☕ und mit Blick darauf, wie KI-Tools diese Website zum Leben erweckt
          </p>
        </div>
      </div>
    </footer>
  );
};