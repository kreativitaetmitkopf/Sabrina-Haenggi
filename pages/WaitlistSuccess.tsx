import React from 'react';
import { CheckCircle2, Download, Home as HomeIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, TRANSLATIONS } from '../lib/translations';

export const WaitlistSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  const handleDownload = () => {
    const fileName = 'ebook-entlastung.pdf'; 
    alert(t.waitlistSuccess.alertMsg.replace('{file}', fileName));
  };

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

        <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
            <h3 className="font-bold text-primary mb-2">{t.waitlistSuccess.infoBoxTitle}</h3>
            <p className="text-sm text-gray-600 mb-4">
                {t.waitlistSuccess.infoBoxDesc}
            </p>
            <Button onClick={handleDownload} fullWidth variant="primary">
              <Download className="mr-2 h-5 w-5" />
              {t.waitlistSuccess.btnDownload}
            </Button>
        </div>

        <p className="text-xs text-gray-400 mb-8">
            {t.waitlistSuccess.subtext}
        </p>

        <Button onClick={() => navigate(`/${currentLang}`)} variant="outline" fullWidth>
          <HomeIcon className="mr-2 h-4 w-4" />
          {t.waitlistSuccess.btnHome}
        </Button>
      </div>
    </div>
  );
};
