import React from 'react';
import { CheckCircle2, Download, Home } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const WaitlistSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    // Hier den Namen der spezifischen Wartelisten-Broschüre eintragen
    // Falls keine existiert, nutzen wir erstmal den Placeholder oder das E-Book
    const fileName = 'ebook-entlastung.pdf'; 
    alert(`Download für ${fileName} startet...`);
    // window.open(`/pdfs/${fileName}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 animate-in fade-in zoom-in duration-300">
        
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>
        
        <h1 className="text-2xl font-bold text-dark mb-4">Vielen Dank!</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Wir haben Sie erfolgreich auf die Warteliste gesetzt. Wir melden uns persönlich bei Ihnen, 
          sobald sich eine Möglichkeit ergibt.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
            <h3 className="font-bold text-primary mb-2">Ihr Info-Paket liegt bereit</h3>
            <p className="text-sm text-gray-600 mb-4">
                Hier finden Sie erste Informationen zur Pflege-WG und unseren Abläufen.
            </p>
            <Button onClick={handleDownload} fullWidth variant="primary">
              <Download className="mr-2 h-5 w-5" />
              Broschüre herunterladen
            </Button>
        </div>

        <p className="text-xs text-gray-400 mb-8">
            Wir haben Ihnen diese Informationen zusätzlich an Ihre angegebene E-Mail-Adresse gesendet.
        </p>

        <Button onClick={() => navigate('/')} variant="outline" fullWidth>
          <Home className="mr-2 h-4 w-4" />
          Zurück zur Startseite
        </Button>
      </div>
    </div>
  );
};