import React from 'react';
import { CheckCircle2, Mail, Home as HomeIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, TRANSLATIONS } from '../lib/translations';

export const WaitlistSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" id="waitlist-success-page">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 animate-in fade-in zoom-in duration-300">

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold text-dark mb-4">{t.waitlistSuccess.thanks}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {t.waitlistSuccess.desc}
        </p>

        {/* Hinweis auf die versendete E-Mail.
            Ersetzt den frueheren Download-Knopf, der nur ein alert() ausgeloest hat. */}
        <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100 flex items-start gap-4 text-left">
          <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="text-primary w-5 h-5" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {t.waitlistSuccess.subtext}
          </p>
        </div>

        <Button onClick={() => navigate(`/${currentLang}`)} variant="outline" fullWidth>
          <HomeIcon className="mr-2 h-4 w-4" />
          {t.waitlistSuccess.btnHome}
        </Button>
      </div>
    </div>
  );
};
