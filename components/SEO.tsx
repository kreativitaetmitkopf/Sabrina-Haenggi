import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../constants';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  schema?: Record<string, any>;
  type?: 'website' | 'article';
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  path, 
  schema, 
  type = 'website' 
}) => {
  const siteUrl = 'https://sabrinahaenggi.com'; // In Production aus ENV laden
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const imageUrl = `${siteUrl}/og-image.jpg`;

  useEffect(() => {
    // 1. Set Title
    document.title = fullTitle;

    // 2. Helper for Meta Tags
    const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard
    setMetaTag('name', 'description', description);

    // Open Graph
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', imageUrl);

    // Twitter (uses name usually)
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', url);
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
    link.setAttribute('href', url);

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
        // Remove if no schema on this page, to avoid stale data
        if (script) script.remove();
    }

  }, [fullTitle, description, url, type, schema, imageUrl]);

  return null;
};