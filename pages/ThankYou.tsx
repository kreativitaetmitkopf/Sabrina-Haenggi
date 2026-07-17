import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, TRANSLATIONS } from '../lib/translations';

export const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  const formatMsg = (text: string) => {
    return {
      __html: text
        .replace('{br}', '<br/>')
        .replace('{strongStart}', '<strong>')
        .replace('{strongEnd}', '</strong>')
    };
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" id="thank-you-page">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-primary w-10 h-10" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-4">{t.thankYou.title}</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left">
          <h3 className="font-bold text-yellow-800 text-sm mb-1 uppercase tracking-wide">{t.thankYou.optInTitle}</h3>
          <p className="text-yellow-900 text-sm leading-relaxed">
            {t.thankYou.optInDesc}
          </p>
        </div>

        <p 
          className="text-gray-600 text-lg mb-8 leading-relaxed"
          dangerouslySetInnerHTML={formatMsg(t.thankYou.msg)}
        />

        <div className="text-sm text-gray-400 mb-8">
          {t.thankYou.noEmail}
        </div>

        <Button onClick={() => navigate(`/${currentLang}`)} variant="outline">
          {t.thankYou.btnHome} <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
