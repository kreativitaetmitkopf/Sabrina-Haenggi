import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Download, AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';
import { LEAD_MAGNETS } from '../constants';

export const ConfirmSubscription: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  
  const slug = searchParams.get('slug');
  const magnet = LEAD_MAGNETS.find(m => m.slug === slug);

  useEffect(() => {
    // Hier wird simuliert, dass der Token (in der echten Welt) gegen eine Datenbank geprüft wird.
    // Da wir keinen Server haben, "vertrauen" wir dem Link, wenn ein gültiger Slug dabei ist.
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
    if (!magnet) return;

    // Erstellt einen unsichtbaren Link und klickt ihn, um den Download zu erzwingen
    // Die PDF-Datei muss im Ordner /public/pdfs/ liegen!
    // Beispiel: /public/pdfs/pflege-checkliste.pdf
    const link = document.createElement('a');
    
    // Hinweis: In einer reinen Vite/React App ist der public folder root '/'
    // Wir nehmen an, die PDFs liegen in einem Unterordner 'pdfs' oder direkt im Root.
    // Passen wir es auf 'pdfs/' an, da dies sauberer ist.
    link.href = `/pdfs/${magnet.fileName}`;
    link.download = magnet.fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100">
        
        {status === 'verifying' && (
          <div className="py-12">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-bold text-dark">E-Mail wird bestätigt...</h2>
            <p className="text-gray-500 mt-2">Wir prüfen Ihre Anfrage.</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-4">Link ungültig oder abgelaufen</h2>
            <p className="text-gray-600 mb-8">
              Wir konnten den Download nicht finden. Bitte starten Sie den Vorgang erneut.
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
            
            <h1 className="text-2xl font-bold text-dark mb-2">Vielen Dank!</h1>
            <p className="text-gray-600 mb-8">
              Ihre E-Mail wurde bestätigt.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100 text-left">
                <p className="font-bold text-primary mb-1">Ihr Download ist bereit:</p>
                <p className="font-medium text-dark">{magnet.title}</p>
            </div>

            <Button onClick={handleDownload} fullWidth size="lg" className="shadow-lg shadow-blue-500/20 bg-accent text-dark hover:bg-yellow-400">
              <Download className="mr-2 h-5 w-5" />
              Jetzt PDF herunterladen
            </Button>
            
            <div className="mt-8 text-xs text-gray-400">
               Sollte der Download nicht starten, prüfen Sie bitte, ob Sie einen Pop-up Blocker aktiviert haben.
            </div>
            
            <button 
                onClick={() => navigate('/')}
                className="mt-6 text-sm text-gray-500 hover:text-primary transition-colors underline"
            >
                Zurück zur Startseite
            </button>
          </div>
        )}

      </div>
    </div>
  );
};