
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Waitlist: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Warteliste & Broschüre Pflege-WG" 
        description="Melden Sie sich für die Warteliste unserer exklusiven Pflege-WG auf Lanzarote an und erhalten Sie sofort unser Whitepaper."
        path="/warteliste"
      />

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-500 hover:text-dark mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2" />
          Zurück zur Startseite
        </button>
      </div>

      <section id="kontakt-warteliste" style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '28px', lineHeight: '1.2', fontWeight: '800', color: '#0B1220' }}>
            Warteliste / Kontakt
          </h2>
          <p style={{ margin: '0 0 18px', fontSize: '16px', opacity: 0.9, color: '#4B5563' }}>
            Trage dich ein und erhalte das Whitepaper automatisch per E-Mail. Deswegen hast du alles sofort griffbereit.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '760px', border: '1px solid rgba(0,0,0,.10)', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff' }}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScMak3YAUCWt2fdBmY2b_CKgX8LCTqCQTcismqDxABx0tOxWA/viewform?embedded=true"
                style={{ border: 0, width: '100%', height: '980px' }}
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                loading="lazy"
                title="Warteliste Formular"
              >
                Wird geladen…
              </iframe>
            </div>
          </div>

          <p style={{ margin: '12px 0 0', fontSize: '13px', opacity: 0.8, color: '#6B7280' }}>
            Hinweis: Deine Angaben nutzen wir nur für Rückmeldung, Warteliste und den Versand des Whitepapers. Deswegen bekommst du genau das, was du angefragt hast.
          </p>
        </div>
      </section>
      
      {/* Spacer for bottom */}
      <div className="pb-20"></div>
    </div>
  );
};
