import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { LeadMagnet, LeadFormData } from '../types';
import { Lock, ShieldCheck, Download } from 'lucide-react';

interface LeadFormProps {
  magnet: LeadMagnet;
  onSuccess: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ magnet, onSuccess }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false,
    honeypot: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Helper to detect repetitive numbers
  const isFakeNumber = (str: string) => {
    const clean = str.replace(/\D/g, '');
    if (/^(\d)\1+$/.test(clean)) return true;
    const sequence = "01234567890123456789";
    if (sequence.includes(clean)) return true;
    return false;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};
    
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = "Bitte geben Sie Ihren Vornamen an.";
    }
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Bitte geben Sie Ihren Nachnamen an.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    } else if (formData.email.toLowerCase().includes("test")) {
       // Einfacher Spam-Check
       newErrors.email = "Bitte geben Sie eine echte E-Mail-Adresse ein.";
    }
    
    const phoneRegex = /^(\+|00|0)[1-9][0-9 \-\(\)\.]{7,20}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone) || isFakeNumber(formData.phone)) {
      newErrors.phone = "Bitte geben Sie eine gültige Handynummer an.";
    }

    if (!formData.consent) {
      newErrors.consent = "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (formData.honeypot) return; // Silent fail
    if (!validate()) return;

    setIsLoading(true);

    try {
      // API Aufruf anstatt Client-Side Email
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          magnetSlug: magnet.slug
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ein Fehler ist aufgetreten.');
      }

      // ERFOLG: Sofortige Weiterleitung zum Download
      if (data.downloadUrl) {
        onSuccess(); // Optional: UI State Update
        // Kurze Verzögerung für UX, dann Redirect zum PDF Stream
        setTimeout(() => {
          window.location.href = data.downloadUrl;
        }, 500);
      }

    } catch (err: any) {
      console.error("Submission Error:", err);
      setServerError(err.message || "Verbindung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="bg-blue-50 p-3 rounded-full mr-4">
          <Lock className="text-primary w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark">Jetzt kostenlos anfordern</h3>
          <p className="text-sm text-gray-500">Sicherer Download via SSL.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot - hidden */}
        <input
          type="text"
          value={formData.honeypot}
          onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
          className="hidden"
          autoComplete="off"
          tabIndex={-1}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="firstName"
              label="Vorname"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              error={errors.firstName}
              placeholder="Max"
            />
            <Input
              id="lastName"
              label="Nachname"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              error={errors.lastName}
              placeholder="Mustermann"
            />
        </div>

        <Input
          id="email"
          type="email"
          label="E-Mail-Adresse"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={errors.email}
          placeholder="max@beispiel.de"
        />

        <Input
          id="phone"
          type="tel"
          label="Handynummer"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          error={errors.phone}
          placeholder="+49 170 ..."
        />

        <Checkbox
          id="consent"
          checked={formData.consent}
          onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
          error={errors.consent}
          label={
            <span className="text-gray-600">
              Ich stimme der Datenverarbeitung zu. <a href="/datenschutz" target="_blank" className="text-primary underline">Datenschutz</a>
            </span>
          }
        />

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
            {serverError}
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
            <Download className="mr-2 h-5 w-5" />
            Kostenpflichtig bestellen (0€)
        </Button>

        <p className="text-xs text-center text-gray-400 mt-4 leading-snug">
          Der Download startet automatisch nach dem Klick. Zusätzlich erhalten Sie den Link per E-Mail.
        </p>
      </form>
    </div>
  );
};
