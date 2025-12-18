
import React, { useState } from 'react';
import { ArrowLeft, Clock, Send, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';

export const Waitlist: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    interest: '24/7 Pflege-WG',
    desired_timeframe: '',
    message: '',
    consent_privacy: false,
    consent_contact: false,
    company: '', // Honeypot
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'website_waitlist_page'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ein Fehler ist aufgetreten.');
      }

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600 w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-dark mb-4">Vielen Dank!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Ihre Anfrage wurde erfolgreich gespeichert. Sie stehen nun auf unserer priorisierten Warteliste.
          </p>
          <div className="bg-blue-50 p-6 rounded-xl mb-8 border border-blue-100">
            <h3 className="font-bold text-primary mb-2">Broschüre jetzt verfügbar</h3>
            <p className="text-sm text-gray-600 mb-4">
              Als Dankeschön können Sie sich hier unsere detaillierte Info-Broschüre zur Pflege-WG als PDF herunterladen.
            </p>
            <a 
              href="https://docs.google.com/document/d/1Xs3JbwtMFbjLZXlyFChOMUspMT_Ht-ZnWIVdxTMSrsE/export?format=pdf"
              className="w-full inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
            >
              <Download className="mr-2 h-5 w-5" />
              Broschüre herunterladen (PDF)
            </a>
          </div>
          <Button onClick={() => navigate('/')} variant="outline" fullWidth>
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

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
            Sichern Sie sich einen Platz auf unserer Warteliste. Nach dem Absenden erhalten Sie sofortigen Zugriff auf unsere Info-Broschüre.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot */}
            <input 
              type="text" 
              name="company" 
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="hidden" 
              tabIndex={-1} 
              autoComplete="off" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Vorname *" 
                required 
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              />
              <Input 
                label="Nachname *" 
                required 
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              />
            </div>

            <Input 
              type="email" 
              label="E-Mail-Adresse *" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <Input 
              type="tel" 
              label="Telefonnummer / WhatsApp" 
              placeholder="+49..." 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interesse an *</label>
              <select 
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
              >
                <option>24/7 Pflege-WG</option>
                <option>Mobile Pflege zu Hause</option>
                <option>Beides</option>
              </select>
            </div>

            <Input 
              label="Wunschtermin (Monat/Jahr)" 
              placeholder="z.B. Oktober 2024"
              value={formData.desired_timeframe}
              onChange={(e) => setFormData({...formData, desired_timeframe: e.target.value})}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nachricht (optional)</label>
              <textarea
                rows={3}
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Checkbox 
                id="privacy"
                label={<span className="text-gray-600 text-xs">Ich akzeptiere die <a href="/datenschutz" target="_blank" className="text-primary underline">Datenschutzerklärung</a>. Meine Daten werden zur Bearbeitung der Warteliste gespeichert. *</span>}
                required
                checked={formData.consent_privacy}
                onChange={(e) => setFormData({...formData, consent_privacy: e.target.checked})}
              />
              <Checkbox 
                id="contact"
                label={<span className="text-gray-600 text-xs">Ich möchte per E-Mail oder Telefon über freie Plätze informiert werden.</span>}
                checked={formData.consent_contact}
                onChange={(e) => setFormData({...formData, consent_contact: e.target.checked})}
              />
            </div>

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <Button type="submit" fullWidth isLoading={isSubmitting} size="lg">
              <Send className="mr-2 h-5 w-5" />
              Unverbindlich eintragen & Broschüre freischalten
            </Button>
            
            <p className="text-center text-[10px] text-gray-400">
              Hinweis: Ihre Daten werden SSL-verschlüsselt übertragen und ausschließlich für die Wartelisten-Organisation verwendet.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
