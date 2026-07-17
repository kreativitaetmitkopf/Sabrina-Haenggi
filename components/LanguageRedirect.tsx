import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, Language } from '../lib/translations';

export const LanguageRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const detectLanguage = async (): Promise<Language> => {
      // 1. Check localStorage/Cookie first (Manual selection takes precedence)
      const stored = localStorage.getItem('user-language');
      if (stored && (stored === 'de' || stored === 'es' || stored === 'en')) {
        return stored as Language;
      }

      // 2. Optional: Try IP-based detection (country check)
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (res.ok) {
          const data = await res.json();
          const country = data.country_code; // e.g., "DE", "ES", "CH"
          
          if (country === 'DE' || country === 'AT' || country === 'CH') {
            localStorage.setItem('user-language', 'de');
            return 'de';
          } else if (country === 'ES') {
            localStorage.setItem('user-language', 'es');
            return 'es';
          } else {
            localStorage.setItem('user-language', 'en');
            return 'en';
          }
        }
      } catch (err) {
        console.warn('IP-based language detection failed. Falling back to browser language.', err);
      }

      // 3. Fallback to Browser language detection
      const browserLang = navigator.language || (navigator as any).userLanguage || '';
      const lower = browserLang.toLowerCase();
      if (lower.startsWith('de')) {
        localStorage.setItem('user-language', 'de');
        return 'de';
      }
      if (lower.startsWith('es')) {
        localStorage.setItem('user-language', 'es');
        return 'es';
      }

      localStorage.setItem('user-language', 'en');
      return 'en';
    };

    detectLanguage().then((lang) => {
      const path = location.pathname;
      const firstSegment = path.split('/')[1];

      // If already prefixed, do nothing
      if (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') {
        return;
      }

      // Redirect to language-prefixed version of current path
      const remainingPath = path === '/' ? '' : path;
      navigate(`/${lang}${remainingPath}${location.search}${location.hash}`, { replace: true });
    });
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-gray-500 font-medium">Detecting language...</div>
      </div>
    </div>
  );
};
