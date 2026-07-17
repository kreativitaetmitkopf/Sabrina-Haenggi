import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../constants';

interface SEOProps {
  title: string;
  description: string;
  schema?: Record<string, any>;
  type?: 'website' | 'article';
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  schema, 
  type = 'website' 
}) => {
  const siteUrl = 'https://sabrinahaenggi.com'; // In Production from ENV if needed
  
  // Extract active language and subpath directly from browser location
  const pathname = window.location.pathname;
  const parts = pathname.split('/');
  const currentLang = (parts[1] === 'de' || parts[1] === 'es' || parts[1] === 'en') ? parts[1] : 'en';
  const subpath = '/' + parts.slice(2).join('/');
  
  // Construct canonical URL matching the exact active language route
  const formattedSubpath = subpath === '/' ? '' : subpath;
  const canonicalUrl = `${siteUrl}/${currentLang}${formattedSubpath}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const imageUrl = `${siteUrl}/og-image.jpg`;

  useEffect(() => {
    // 1. Set Document Title
    document.title = fullTitle;

    // 2. Set HTML tag's lang attribute dynamically
    const htmlElement = document.documentElement;
    if (htmlElement) {
      htmlElement.setAttribute('lang', currentLang);
    }

    // 3. Helper for Meta Tags
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard meta description
    setMetaTag('name', 'description', description);

    // Open Graph
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', imageUrl);

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', imageUrl);

    // Canonical Link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Alternate Hreflang Tags (critical for multilingual SEO)
    const languages: ('de' | 'es' | 'en')[] = ['de', 'es', 'en'];
    
    // Remove stale hreflang alternate tags to prevent build-up
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // Inject language alternate links
    languages.forEach(lang => {
      const altLink = document.createElement('link');
      altLink.setAttribute('rel', 'alternate');
      altLink.setAttribute('hreflang', lang);
      altLink.setAttribute('href', `${siteUrl}/${lang}${formattedSubpath}`);
      document.head.appendChild(altLink);
    });

    // Inject x-default alternate link (English as fallback)
    const defaultAltLink = document.createElement('link');
    defaultAltLink.setAttribute('rel', 'alternate');
    defaultAltLink.setAttribute('hreflang', 'x-default');
    defaultAltLink.setAttribute('href', `${siteUrl}/en${formattedSubpath}`);
    document.head.appendChild(defaultAltLink);

    // Structured Data (JSON-LD)
    const SCRIPT_ID = 'json-ld-data';
    let script = document.getElementById(SCRIPT_ID);
    
    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else {
        if (script) script.remove();
    }

  }, [fullTitle, description, canonicalUrl, type, schema, imageUrl, currentLang, formattedSubpath]);

  return null;
};
