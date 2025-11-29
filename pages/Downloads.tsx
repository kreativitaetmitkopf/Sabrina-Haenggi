import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LEAD_MAGNETS } from '../constants';
import { Button } from '../components/Button';
import { FileText, Download } from 'lucide-react';

export const Downloads: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-dark mb-6">Wissenswertes & Checklisten</h1>
          <p className="text-lg text-gray-600">
            Nutzen Sie unsere kostenlosen Vorlagen, um Sicherheit und Klarheit zu gewinnen. 
            Speziell für die Pflege-Situation auf den Kanaren entwickelt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEAD_MAGNETS.map((magnet) => (
            <div key={magnet.slug} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <FileText size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-dark mb-4">{magnet.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                {magnet.description}
              </p>

              <Button 
                onClick={() => navigate(`/download/${magnet.slug}`)} 
                variant="primary" 
                fullWidth
                className="group"
              >
                <Download size={18} className="mr-2 group-hover:translate-y-0.5 transition-transform" />
                Jetzt herunterladen
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-2xl p-8 lg:p-12 text-center border border-gray-100">
           <h3 className="text-2xl font-bold text-dark mb-4">Fehlt Ihnen eine Information?</h3>
           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Wir erweitern unsere Bibliothek ständig. Wenn Sie eine spezifische Frage haben, schreiben Sie uns direkt.
           </p>
           <Button variant="outline" onClick={() => window.location.href = "mailto:office@sabrinahaenggi.com"}>
              Frage stellen
           </Button>
        </div>
      </div>
    </div>
  );
};