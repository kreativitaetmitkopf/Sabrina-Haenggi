
import React, { useState } from 'react';
import { ArrowLeft, Clock, Shield, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const Waitlist: React.FC = () => {
  const navigate = useNavigate();
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
          source: 'website_waitlist_page'
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Etwas ist schiefgelaufen.');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/warteliste-danke');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Verbindung fehlgeschlagen.');
    } finally {
      setIsLoading(false);
    }
  };

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

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Sidebar Info */}
              <div className="lg:col-span-2 bg-dark p-8 md:p-12 text-white">
                <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-2xl mb-8">
                  <Clock className="text-primary w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold mb-6">Warteliste & Broschüre</h1>
                <p className="text-gray-400 mb-10 leading-relaxed">
                  Tragen Sie sich unverbindlich ein. Sie erhalten unsere Informations-Broschüre sofort per E-Mail und wir melden uns persönlich bei Ihnen.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                    <span className="text-sm">Exklusive Einblicke in die Pflege-WG</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                    <span className="text-sm">Bevorzugte Benachrichtigung bei freien Plätzen</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="text-accent shrink-0 mt-1" size={20} />
                    <span className="text-sm">Detaillierte Kostenübersicht</span>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10 flex items-center gap-3">
                  <Shield className="text-gray-500" size={16} />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Ihre Daten sind sicher (SSL)</span>
                </div>
              </div>

              {/* Form Area */}
              <div className="lg:col-span-3 p-8 md:p-12">
                {success ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="text-green-600 w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-2">Fast geschafft!</h2>
                    <p className="text-gray-600">Wir leiten Sie zur Bestätigung weiter...</p>
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
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Vorname</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all"
                          value={formData.first_name}
                          onChange={e => setFormData({...formData, first_name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nachname</label>
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
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">E-Mail-Adresse</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Telefonnummer (optional)</label>
                      <input 
                        type="tel" 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Interesse</label>
                      <select 
                        className="w-full bg-gray-50 border-none rounded-xl p-4 text-dark focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                        value={formData.interest}
                        onChange={e => setFormData({...formData, interest: e.target.value})}
                      >
                        <option value="pflege-wg">24/7 Pflege-WG (Warteliste)</option>
                        <option value="mobile-pflege">Mobile Pflege & Hausbesuche</option>
                        <option value="checklisten">Nur Whitepaper & Checklisten</option>
                        <option value="beratung">Allgemeine Beratung für Angehörige</option>
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
                        <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                          Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für die Warteliste gespeichert werden. <a href="/datenschutz" target="_blank" className="text-primary underline">Datenschutzerklärung</a>.
                        </span>
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
                          Wird gesendet...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Eintragen & Whitepaper erhalten
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
