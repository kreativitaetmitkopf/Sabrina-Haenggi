import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Checkbox } from './Checkbox';
import { LeadMagnet, LeadFormData } from '../types';
import { Lock, Download } from 'lucide-react';
import { Language, TRANSLATIONS } from '../lib/translations';

interface LeadFormProps {
  magnet: {
    slug: string;
    title: string;
    description: string;
  };
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

  // Determine active language
  const firstSegment = window.location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

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
    const valMsg = t.downloadDetail.validation;
    
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = valMsg.firstName;
    }
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      newErrors.lastName = valMsg.lastName;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = valMsg.email;
    } else if (formData.email.toLowerCase().includes("test")) {
       newErrors.email = valMsg.emailReal;
    }
    
    const phoneRegex = /^(\+|00|0)[1-9][0-9 \-\(\)\.]{7,20}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone) || isFakeNumber(formData.phone)) {
      newErrors.phone = valMsg.phone;
    }

    if (!formData.consent) {
      newErrors.consent = valMsg.consent;
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
        throw new Error(data.error || 'An error occurred.');
      }

      // Success: Proceed to Download
      if (data.downloadUrl) {
        onSuccess();
        setTimeout(() => {
          window.location.href = data.downloadUrl;
        }, 500);
      }

    } catch (err: any) {
      console.error("Submission Error:", err);
      setServerError(err.message || "Connection failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const consentText = t.downloadDetail.consent;
  const linkIndexStart = consentText.indexOf('{linkStart}');
  const linkIndexEnd = consentText.indexOf('{linkEnd}');
  
  const renderConsentLabel = () => {
    if (linkIndexStart !== -1 && linkIndexEnd !== -1) {
      const before = consentText.substring(0, linkIndexStart);
      const linkText = consentText.substring(linkIndexStart + 11, linkIndexEnd);
      const after = consentText.substring(linkIndexEnd + 9);
      return (
        <span className="text-gray-600">
          {before}
          <a href={`/${currentLang}/datenschutz`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            {linkText}
          </a>
          {after}
        </span>
      );
    }
    return <span className="text-gray-600">{consentText}</span>;
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100" id="lead-form-container">
      <div className="flex items-center mb-6">
        <div className="bg-blue-50 p-3 rounded-full mr-4">
          <Lock className="text-primary w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-dark">{t.downloadDetail.formTitle}</h3>
          <p className="text-sm text-gray-500">{t.downloadDetail.formSubtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
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
              label={t.downloadDetail.firstName}
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              error={errors.firstName}
              placeholder="Max"
            />
            <Input
              id="lastName"
              label={t.downloadDetail.lastName}
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              error={errors.lastName}
              placeholder="Mustermann"
            />
        </div>

        <Input
          id="email"
          type="email"
          label={t.downloadDetail.email}
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={errors.email}
          placeholder="max@beispiel.de"
        />

        <Input
          id="phone"
          type="tel"
          label={t.downloadDetail.phone}
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
          label={renderConsentLabel()}
        />

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
            {serverError}
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
            <Download className="mr-2 h-5 w-5" />
            {t.downloadDetail.orderBtn}
        </Button>

        <p className="text-xs text-center text-gray-400 mt-4 leading-snug">
          {t.downloadDetail.subtext}
        </p>
      </form>
    </div>
  );
};
