import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';
import { Language, TRANSLATIONS } from '../lib/translations';
import { SEO } from '../components/SEO';

export const Legal: React.FC = () => {
  const location = useLocation();
  
  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  const isPrivacy = location.pathname.endsWith('/datenschutz');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const pageTitle = isPrivacy ? t.legal.privacyTitle : t.legal.impressumTitle;

  return (
    <div className="min-h-screen bg-white py-20 px-4" id="legal-page">
      <SEO 
        title={pageTitle}
        description={pageTitle}
      />
      
      <div className="max-w-3xl mx-auto prose prose-blue">
        {isPrivacy ? (
          <>
            <h1 className="text-3xl font-bold text-dark mb-4">{t.legal.privacyTitle}</h1>
            <p className="text-gray-500 mb-8 font-medium">{t.legal.lastUpdated.replace('{year}', new Date().getFullYear().toString())}</p>
            
            <h3 className="text-xl font-bold text-dark mt-8 mb-2">{t.legal.p1Title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t.legal.p1Desc}
            </p>

            <h3 className="text-xl font-bold text-dark mt-8 mb-2">{t.legal.p2Title}</h3>
            <p 
              className="text-gray-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: t.legal.p2Desc.replace('{email}', SITE_CONFIG.email) }}
            />

            <h3 className="text-xl font-bold text-dark mt-8 mb-2">{t.legal.p3Title}</h3>
            <h4 className="text-lg font-bold text-primary mt-4 mb-2">{t.legal.p3Sub1}</h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t.legal.p3Desc1}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t.legal.p3Desc2}
            </p>

            <h4 className="text-lg font-bold text-primary mt-4 mb-2">{t.legal.p3Sub2}</h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t.legal.p3Desc3}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-dark mb-8">{t.legal.impressumTitle}</h1>
            
            <h3 className="text-xl font-bold text-dark mt-6 mb-2">{t.legal.impSub1}</h3>
            <p 
              className="text-gray-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: t.legal.impDesc1 }}
            />

            <h3 className="text-xl font-bold text-dark mt-6 mb-2">{t.legal.impSub2}</h3>
            <p 
              className="text-gray-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ 
                __html: t.legal.impDesc2
                  .replace('{phone}', SITE_CONFIG.phone)
                  .replace('{email}', SITE_CONFIG.email) 
              }}
            />

            <h3 className="text-xl font-bold text-dark mt-6 mb-2">{t.legal.impSub3}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{t.legal.impDesc3}</p>

            <h3 className="text-xl font-bold text-dark mt-6 mb-2">{t.legal.impSub4}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{t.legal.impDesc4}</p>

            <h3 className="text-xl font-bold text-dark mt-6 mb-2">{t.legal.impSub5}</h3>
            <p 
              className="text-gray-600 leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: t.legal.impDesc5 }}
            />
          </>
        )}
      </div>
    </div>
  );
};
