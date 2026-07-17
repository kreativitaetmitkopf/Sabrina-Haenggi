import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { FileText, Download } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Language, TRANSLATIONS } from '../lib/translations';

export const Downloads: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <SEO 
        title={t.meta.downloads.title}
        description={t.meta.downloads.description}
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-dark mb-6" id="wissenswertes">{t.downloads.title}</h1>
          <p className="text-lg text-gray-600">
            {t.downloads.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.downloads.magnets.map((magnet) => (
            <div key={magnet.slug} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <FileText size={32} />
              </div>
              
              <h3 className="text-xl font-bold text-dark mb-4">{magnet.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">
                {magnet.description}
              </p>

              <Button 
                onClick={() => navigate(`/${currentLang}/download/${magnet.slug}`)} 
                variant="primary" 
                fullWidth
                className="group"
              >
                <Download size={18} className="mr-2 group-hover:translate-y-0.5 transition-transform" />
                {t.downloads.ctaDownload}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-2xl p-8 lg:p-12 text-center border border-gray-100">
           <h3 className="text-2xl font-bold text-dark mb-4">{t.downloads.missingInfoTitle}</h3>
           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.downloads.missingInfoDesc}
           </p>
           <Button variant="outline" onClick={() => window.location.href = "mailto:haenggi.sabrina@gmail.com"}>
              {t.downloads.askQuestion}
           </Button>
        </div>
      </div>
    </div>
  );
};
