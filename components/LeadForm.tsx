import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { LeadMagnet, LeadFormData } from '../types';
import { Lock, Mail, User, ShieldCheck } from 'lucide-react';

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

  // Helper to detect repetitive numbers (e.g., 1111111) or sequences (1234567)
  const isFakeNumber = (str: string) => {
    const clean = str.replace(/\D/g, '');
    if (/^(\d)\1+$/.test(clean)) return true; // All same digits
    const sequence = "01234567890123456789";
    if (sequence.includes(clean)) return true; // Sequential
    return false;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};
    
    // Name Validation
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = "Bitte geben Sie Ihren Vornamen an.";
    }
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Bitte geben Sie Ihren Nachnamen an.";
    }

    // Strict Email Validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const blockedDomains = ['test.com', 'example.com', 'test.de', 'mail.com'];
    const domain = formData.email.split('@')[1];

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    } else if (blockedDomains.includes(domain)) {
      newErrors.email = "Diese E-Mail-Domain ist nicht zulässig.";
    } else if (formData.email.toLowerCase().startsWith("test@") || formData.email.toLowerCase().startsWith("info@test")) {
       newErrors.email = "Bitte geben Sie eine echte E-Mail-Adresse ein.";
    }
    
    // Strict Phone Validation
    // Allows international formats, requires at least 9 digits, blocks repeating/sequential numbers
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const phoneRegex = /^(\+|00|0)[1-9][0-9 \-\(\)\.]{7,20}$/; // Basic structural check

    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Bitte geben Sie eine gültige Telefonnummer inkl. Vorwahl an (z.B. 0170...)";
    } else if (cleanPhone.length < 9) {
      newErrors.phone = "Die Telefonnummer ist zu kurz.";
    } else if (isFakeNumber(formData.phone)) {
      newErrors.phone = "Bitte geben Sie eine gültige Rufnummer an.";
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

    // Honeypot check
    if (formData.honeypot) {
      console.log("Bot detected");
      return;
    }

    if (!validate()) return;

    setIsLoading(true);

    try {
      // Simulation of Supabase/Resend interaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`Lead captured for ${magnet.slug}:`, formData);
      // In a real app, this triggers the backend to send the email with the link to /confirm?slug=...
      onSuccess();
    } catch (err) {
      setServerError("Es gab ein technisches Problem. Bitte versuchen Sie es später erneut.");
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
          <p className="text-sm text-gray-500">Ihre Daten sind sicher. SSL-verschlüsselt.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
        <input
          type="text"
          name="website_url_hp"
          value={formData.honeypot}
          onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
          className="hidden"
          autoComplete="off"
          tabIndex={-1}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="firstName"
              type="text"
              label="Vorname"
              placeholder="Max"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              error={errors.firstName}
            />
            <Input
              id="lastName"
              type="text"
              label="Nachname"
              placeholder="Mustermann"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              error={errors.lastName}
            />
        </div>

        <Input
          id="email"
          type="email"
          label="E-Mail-Adresse"
          placeholder="max.mustermann@beispiel.de"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={errors.email}
        />

        <Input
          id="phone"
          type="tel"
          label="Handynummer (für Rückfragen)"
          placeholder="+49 170 1234567"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          error={errors.phone}
        />

        <Checkbox
          id="consent"
          checked={formData.consent}
          onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
          error={errors.consent}
          label={
            <span className="text-gray-600">
              Ich stimme zu, dass Sabrina Hänggi mich per E-Mail kontaktieren darf. Ich habe die <a href="/datenschutz" target="_blank" className="text-primary underline hover:text-blue-700">Datenschutzerklärung</a> gelesen.
            </span>
          }
        />

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {serverError}
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
            <ShieldCheck className="mr-2 h-5 w-5" />
            Bestätigungs-Link anfordern
        </Button>

        <p className="text-xs text-center text-gray-400 mt-4">
          Wir senden Ihnen einen Bestätigungs-Link per E-Mail (Double Opt-In), bevor der Download startet.
        </p>
      </form>
    </div>
  );
};