import React from 'react';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-primary w-10 h-10" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-4">Nur noch ein Schritt!</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left">
          <h3 className="font-bold text-yellow-800 text-sm mb-1 uppercase tracking-wide">Double Opt-In Erforderlich</h3>
          <p className="text-yellow-900 text-sm leading-relaxed">
            Um Missbrauch zu vermeiden und Ihre Daten zu schützen, haben wir Ihnen soeben eine Bestätigungs-E-Mail gesendet.
          </p>
        </div>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Bitte öffnen Sie Ihr E-Mail-Postfach und klicken Sie auf den Link in der E-Mail. <br/>
          <strong>Erst danach startet Ihr Download automatisch.</strong>
        </p>

        <div className="text-sm text-gray-400 mb-8">
          Keine E-Mail erhalten? Bitte prüfen Sie auch den Spam-Ordner.
        </div>

        <Button onClick={() => navigate('/')} variant="outline">
          Zurück zur Startseite <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};