import React, { useState } from 'react';
import { ArrowLeft, Clock, Shield, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Language, TRANSLATIONS } from '../lib/translations';

export const Waitlist: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const firstSegment = location.pathname.split('/')[1];
  const currentLang: Language = (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') ? firstSegment : 'en';
  const t = TRANSLATIONS[currentLang];

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    interest: 'pflege-wg',
    desired_timeframe: 'so-bald-wie-möglich',
    message: '',
    consent_privacy: false,
    consent_contact: false,
    company: '', // honeypot
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: `website_waitlist_page_${currentLang}`
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t.waitlist.errorConnection);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate(`/${currentLang}/warteliste-danke`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || t.waitlist.errorConnection);
    } finally {
      setIsLoading(false);
    }
  };

  const consentText = t.waitlist.consent;
  const linkIndexStart = consentText.indexOf('{linkStart}');
  const linkIndexEnd = consentText.indexOf('{linkEnd}');
  
  const renderConsentLabel = () => {
    if (linkIndexStart !== -1 && linkIndexEnd !== -1) {
      const before = consentText.substring(0, linkIndexStart);
      const linkText = consentText.substring(linkIndexStart + 11, linkIndexEnd);
      const after = consentText.substring(linkIndexEnd + 9);
      return (
        <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
          {before}
          <a href={`/${currentLang}/datenschutz`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            {linkText}
          </a>
          {after}
        </span>
      );
    }
    return <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">{consentText}</span>;
  };

  return (
    <div className="min-h-screen bg-background" id="waitlist-page">
      <SEO 
        title={t.meta.waitlist.title} 
        description={t.meta.waitlist.description}
      />

      <div className="max-w-7xl mx-auto px-4 pt-12">
        <button 
          onClick={() => navigate(`/${currentLang}`)}
          className="flex items-center text-gray-500 hover:text-dark mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t.waitlist.backButton}
        </button>
      </div>

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Sidebar Info */}
              <div className="lg:col-span-2 bg-dark p-8 md:p-12 text-white flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl mb-8">
                    <Clock className="text-primary w-8 h-8" />
                  </div>
                  <h1 className="text-3xl font-bold mb-6">{t.waitlist.title}</h1>
                  <p className="text-gray-400 mb-10 leading-relaxed">
                    {t.waitlist.desc}
                  </p>
                  
                  <div className="space-y-6">
                    {t.waitlist.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10 flex items-center gap-3">
                  <Shield className="text-gray-500" size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">{t.waitlist.sslBadge}</span>
                </div>
              </div>

              {/* Form Area */}
              <div className="lg:col-span-3 p-8 md:p-12">
                {success ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-green-600 w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-2">{t.waitlist.successTitle}</h2>
                    <p className="text-gray-600">{t.waitlist.successDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot */}
                    <input 
                      type="text" 
                      className="hidden" 
                      value={formData.company} 
                      onChange={e => setFormData({...formData, company: e.target.value})} 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.waitlist.firstName}</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all"
                          value={formData.first_name}
                          onChange={e => setFormData({...formData, first_name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.waitlist.lastName}</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all"
                          value={formData.last_name}
                          onChange={e => setFormData({...formData, last_name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.waitlist.email}</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.waitlist.phone}</label>
                      <input 
                        type="tel" 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.waitlist.interestLabel}</label>
                      <select 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                        value={formData.interest}
                        onChange={e => setFormData({...formData, interest: e.target.value})}
                      >
                        {t.waitlist.interestOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-4 pt-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          required
                          className="mt-1 rounded text-primary focus:ring-primary border-gray-200"
                          checked={formData.consent_privacy}
                          onChange={e => setFormData({...formData, consent_privacy: e.target.checked})}
                        />
                        {renderConsentLabel()}
                      </label>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                        {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-blue-600 text-white font-bold h-16 rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" />
                          {t.waitlist.sending}
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          {t.waitlist.submitButton}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="pb-20"></div>
    </div>
  );
};
