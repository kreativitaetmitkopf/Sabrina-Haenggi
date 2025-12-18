import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEAD_MAGNETS } from '../constants';
import { LeadForm } from '../components/LeadForm';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export const DownloadDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const magnet = LEAD_MAGNETS.find(m => m.slug === slug);

  if (!magnet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <SEO title="Download nicht gefunden" description="Fehlerseite" path={`/download/${slug}`} />
        <h1 className="text-2xl font-bold text-dark mb-4">Download nicht gefunden</h1>
        <button onClick={() => navigate('/downloads')} className="text-primary hover:underline">
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  const handleSuccess = () => {
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <SEO 
        title={magnet.title}
        description={`Kostenloser Download: ${magnet.description} Sichern Sie sich jetzt das PDF von Sabrina Hänggi.`}
        path={`/download/${magnet.slug}`}
        type="article"
      />
      
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/downloads')}
          className="flex items-center text-gray-500 hover:text-dark mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2" />
          Zurück zur Übersicht
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content Side */}
          <div>
             <div className="inline-block px-3 py-1 bg-accent/20 text-yellow-800 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
               Kostenloser Download
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark mb-6 leading-tight">
               {magnet.title}
             </h1>
             <p className="text-lg text-gray-600 mb-8 leading-relaxed">
               {magnet.description}
             </p>

             <div className="bg-white p-6 rounded-xl border border-gray-100 mb-8">
               <h3 className="font-bold text-dark mb-4">Was Sie in diesem PDF erwartet:</h3>
               <ul className="space-y-3">
                 {[
                   'Kompaktes Wissen auf einen Blick',
                   'Druckfreundliches Format (A4)',
                   'Sofort umsetzbare Tipps',
                   'Aktualisiert für das aktuelle Jahr'
                 ].map((item, idx) => (
                   <li key={idx} className="flex items-start text-gray-700">
                     <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                     <span>{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>

          {/* Form Side */}
          <div className="lg:sticky lg:top-28">
            <LeadForm magnet={magnet} onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};