import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Loader2, Download, AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';
import { LEAD_MAGNETS } from '../constants';
import { Language, TRANSLATIONS } from '../lib/translations';

export const ConfirmSubscription: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  
  const slug = searchParams.get('slug');
  
  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  // Get the translated magnet info
  const magnet = t.downloads.magnets.find(m => m.slug === slug);
  // Get the physical magnet to find the exact fileName
  const physicalMagnet = LEAD_MAGNETS.find(m => m.slug === slug);

  useEffect(() => {
    const verifyToken = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (magnet) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    };

    verifyToken();
  }, [magnet]);

  const handleDownload = () => {
    if (!physicalMagnet) return;

    const link = document.createElement('a');
    link.href = `/pdfs/${physicalMagnet.fileName}`;
    link.download = physicalMagnet.fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" id="confirm-subscription-page">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100">
        
        {status === 'verifying' && (
          <div className="py-12">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-bold text-dark">{t.confirmSubscription.verifying}</h2>
            <p className="text-gray-500 mt-2">{t.confirmSubscription.verifyingDesc}</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">{t.confirmSubscription.errorTitle}</h2>
            <p className="text-gray-600 mb-8">
              {t.confirmSubscription.errorDesc}
            </p>
            <Button onClick={() => navigate(`/${currentLang}/downloads`)}>
              {t.confirmSubscription.btnError}
            </Button>
          </div>
        )}

        {status === 'success' && magnet && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600 w-10 h-10" />
            </div>
            
            <h1 className="text-2xl font-bold text-dark mb-2">{t.confirmSubscription.thanks}</h1>
            <p className="text-gray-600 mb-8">
              {t.confirmSubscription.confirmed}
            </p>

            <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100 text-left">
                <p className="font-bold text-primary mb-1">{t.confirmSubscription.ready}</p>
                <p className="font-medium text-dark">{magnet.title}</p>
            </div>

            <Button onClick={handleDownload} fullWidth size="lg" className="shadow-lg shadow-blue-500/20 bg-accent text-dark hover:bg-yellow-400">
              <Download className="mr-2 h-5 w-5" />
              {t.confirmSubscription.btnDownload}
            </Button>
            
            <div className="mt-8 text-xs text-gray-400">
               {t.confirmSubscription.popupAlert}
            </div>
            
            <button 
                onClick={() => navigate(`/${currentLang}`)}
                className="mt-6 text-sm text-gray-500 hover:text-primary transition-colors underline"
            >
                {t.confirmSubscription.btnHome}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
