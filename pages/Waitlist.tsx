import React, { useState, useRef } from 'react';
import { ArrowLeft, Clock, Send, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';

export const Waitlist: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // =================================================================================
  // KONFIGURATION FÜR GOOGLE FORMS
  // =================================================================================
  // 1. Öffnen Sie Ihr Google Formular (Vorschau-Modus).
  // 2. Rechtsklick -> "Seitenquelltext anzeigen".
  // 3. Suchen Sie nach "action=" (beginnt mit https://docs.google.com/.../formResponse).
  // 4. Suchen Sie nach den entry-IDs für jedes Feld (z.B. entry.123456789).
  
  const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD_J1tMk5YjC6zX2lKz3rJ9X7wG3y5uQ8fL4a1s2d3f4g5h/formResponse"; // Beispiel URL - Bitte ersetzen!
  
  const GOOGLE_FORM_ENTRY_IDS = {
    firstName: "entry.123456789", // Bitte echte ID für Vorname eintragen
    lastName: "entry.987654321",  // Bitte echte ID für Nachname eintragen
    email: "entry.111222333",     // Bitte echte ID für E-Mail eintragen
    phone: "entry.444555666",     // Bitte echte ID für Telefon eintragen
    message: "entry.777888999",   // Bitte echte ID für Nachricht/Zeitpunkt eintragen
  };
  // =================================================================================

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Wir warten kurz, damit der Request an Google im Hintergrund rausgehen kann,
    // bevor wir zur Danke-Seite weiterleiten. Das Hidden-Iframe fängt den Redirect ab.
    setTimeout(() => {
      navigate('/warteliste-danke');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-500 hover:text-dark mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2" />
          Zurück zur Startseite
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">
            Warteliste 24/7 Pflege-WG
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aktuell sind alle Plätze belegt. Tragen Sie sich unverbindlich ein, um als Erste informiert zu werden, 
            sobald Kapazitäten frei werden.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          {/* 
            TRICK: Das iframe ist unsichtbar (hidden). Das Formular sendet die Daten an "target=hidden_iframe".
            Dadurch wird die Seite nicht neu geladen und wir bleiben auf der React-App.
          */}
          <iframe 
            name="hidden_iframe" 
            id="hidden_iframe" 
            style={{ display: 'none' }} 
            onLoad={() => {
              if (isSubmitting) {
                // Optional: Hier könnte man Logik einbauen, wenn Google antwortet
              }
            }}
          />

          <form 
            ref={formRef}
            action={GOOGLE_FORM_ACTION_URL} 
            method="POST" 
            target="hidden_iframe"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                id="firstName" 
                name={GOOGLE_FORM_ENTRY_IDS.firstName}
                label="Vorname" 
                placeholder="Max" 
                required 
              />
              <Input 
                id="lastName" 
                name={GOOGLE_FORM_ENTRY_IDS.lastName}
                label="Nachname" 
                placeholder="Mustermann" 
                required 
              />
            </div>

            <Input 
              id="email" 
              type="email"
              name={GOOGLE_FORM_ENTRY_IDS.email}
              label="E-Mail-Adresse" 
              placeholder="max.mustermann@beispiel.de" 
              required 
            />

            <Input 
              id="phone" 
              type="tel"
              name={GOOGLE_FORM_ENTRY_IDS.phone}
              label="Telefonnummer (optional)" 
              placeholder="+49 170 1234567" 
            />

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Wunschtermin / Nachricht
                </label>
                <textarea
                    id="message"
                    name={GOOGLE_FORM_ENTRY_IDS.message}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 outline-none transition-all"
                    placeholder="Ab wann wird der Platz benötigt?"
                />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <ShieldCheck className="text-primary w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600">
                    Mit dem Absenden erklären Sie sich damit einverstanden, dass wir Ihre Daten zur Kontaktaufnahme bezüglich eines Pflegeplatzes speichern. Ihre Daten werden sicher über Google Forms verarbeitet.
                </p>
            </div>

            <Button type="submit" fullWidth isLoading={isSubmitting} size="lg">
              <Send className="mr-2 h-5 w-5" />
              Auf Warteliste setzen
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};