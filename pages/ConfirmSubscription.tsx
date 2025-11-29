import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Download, AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';
import { LEAD_MAGNETS } from '../constants';

export const ConfirmSubscription: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  
  // Im echten System käme hier ein ?token=XYZ Parameter. 
  // Für die Demo nutzen wir den 'slug', um zu wissen, welches PDF gemeint ist.
  const slug = searchParams.get('slug');
  const magnet = LEAD_MAGNETS.find(m => m.slug === slug);

  useEffect(() => {
    // Simuliert die API-Anfrage zur Token-Validierung
    const verifyToken = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 Sekunden Wartezeit simulieren
      
      if (magnet) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    };

    verifyToken();
  }, [magnet]);

  const handleDownload = () => {
    // Hier würde der echte Download starten (z.B. window.open oder hidden a tag)
    // Für Demo-Zwecke:
    alert(`Der Download für "${magnet?.fileName}" wird gestartet...`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100">
        
        {status === 'verifying' && (
          <div className="py-12">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-bold text-dark">E-Mail wird bestätigt...</h2>
            <p className="text-gray-500 mt-2">Bitte haben Sie einen Moment Geduld.</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">Link ungültig</h2>
            <p className="text-gray-600 mb-8">
              Der Bestätigungslink ist abgelaufen oder ungültig. Bitte fordern Sie den Download erneut an.
            </p>
            <Button onClick={() => navigate('/downloads')}>
              Zurück zu den Downloads
            </Button>
          </div>
        )}

        {status === 'success' && magnet && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-600 w-10 h-10" />
            </div>
            
            <h1 className="text-2xl font-bold text-dark mb-2">Anmeldung erfolgreich!</h1>
            <p className="text-gray-600 mb-8">
              Vielen Dank für Ihre Bestätigung. Ihr Download steht nun bereit.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100">
                <p className="font-semibold text-dark mb-1">{magnet.title}</p>
                <p className="text-xs text-gray-500">{magnet.fileName}</p>
            </div>

            <Button onClick={handleDownload} fullWidth size="lg" className="shadow-lg shadow-blue-500/20">
              <Download className="mr-2 h-5 w-5" />
              Jetzt PDF herunterladen
            </Button>
            
            <button 
                onClick={() => navigate('/')}
                className="mt-6 text-sm text-gray-400 hover:text-dark transition-colors"
            >
                Zurück zur Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};