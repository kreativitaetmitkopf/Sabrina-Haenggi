import React, { useEffect } from 'react';
import { Button } from '../components/Button';
import { CheckCircle2, Heart, Clock, Phone, MapPin, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle initial hash scrolling (e.g. when coming from another page)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // JSON-LD für Lokales Unternehmen
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Sabrina Hänggi - Pflege auf Lanzarote",
    "image": "https://sabrinahaenggi.com/og-image.jpg",
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle la Rosa 14",
      "addressLocality": "Costa Teguise",
      "addressRegion": "Lanzarote",
      "postalCode": "35508",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.995,
      "longitude": -13.59
    },
    "priceRange": "$$",
    "description": "Deutschsprachige mobile Pflege und 24/7 Betreuung auf Lanzarote. Professionell, herzlich und zuverlässig.",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Mobile Pflege & 24/7 Betreuung Lanzarote"
        description="Ihr deutscher Pflegedienst auf Lanzarote. Mobile Pflege, medizinische Versorgung und 24h Pflege-WG in Costa Teguise. Jetzt beraten lassen."
        path="/"
        schema={localBusinessSchema}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F0F5FF] to-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center opacity-10 hidden lg:block mask-image-linear-gradient" style={{ maskImage: 'linear-gradient(to left, black, transparent)' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-semibold mb-6">
              Ihr Pflegedienst auf Lanzarote
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-dark tracking-tight leading-[1.15] mb-6">
              Pflege mit Herz. <br/>
              <span className="text-primary">Sicherheit</span> für Ihre Liebsten.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Ob mobile Pflege vor Ort oder 24/7 Betreuung in unserer Pflege-WG: 
              Wir schaffen Lebensqualität. Deutschsprachig, professionell and herzlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/downloads')} className="shadow-lg shadow-blue-500/20">
                Kostenlose Checkliste
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
                Kostenloses Erstgespräch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Added scroll-mt-28 for sticky navbar offset */}
      <section id="services" className="py-20 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Unser Angebot für Sie</h2>
            <p className="text-gray-600 text-lg">
              Jeder Mensch hat individuelle Bedürfnisse. Aus diesem Grund bieten wir flexible Modelle an, 
              die sich Ihrer Situation anpassen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1 */}
            <div className="bg-background rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Mobile Pflege zu Hause</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Wir kommen direkt zu Ihnen in Ihr Feriendomizil oder Ihren Altersruhesitz.
                Professionelle medizinische Versorgung und Grundpflege in Ihrer vertrauten Umgebung.
              </p>
              <ul className="space-y-3 mb-8">
                {['Medikamentengabe & Wundversorgung', 'Unterstützung bei Körperpflege', 'Vitalzeichenkontrolle', 'Alltagsbegleitung'].map(item => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 - Pflege WG (Waitlist Update) */}
            <div className="bg-background rounded-2xl p-8 border-2 border-yellow-400/20 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex flex-col">
               {/* Waitlist Badge */}
               <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  Warteliste offen
               </div>

              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-yellow-600 w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-dark mb-2">24/7 Private Pflege-WG</h3>
              
              <p className="text-sm font-semibold text-red-500 mb-4 flex items-center">
                Aktuell vollständig ausgebucht
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                Rund-um-die-Uhr Betreuung in familiärer Atmosphäre. 
                Aufgrund der hohen Nachfrage sind momentan alle Plätze belegt. 
                Tragen Sie sich unverbindlich auf unsere Warteliste ein. So informieren wir Sie priorisiert, sobald ein Platz frei wird.
              </p>
              <ul className="space-y-3 mb-8">
                {['24 Stunden Anwesenheit', 'Gemeinsame Mahlzeiten & Aktivitäten', 'Barrierefreies Wohnen', 'Deutsch-schweizerischer Standard'].map(item => (
                  <li key={item} className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className="w-full border-yellow-500 text-yellow-800 hover:bg-yellow-50"
                onClick={() => navigate('/warteliste')}
              >
                Zur Warteliste & Broschüre
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Families (Angehörige) - Added scroll-mt-28 */}
      <section id="families" className="py-20 bg-background border-y border-gray-200 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <div className="bg-white p-2 rounded-2xl shadow-sm rotate-1">
                  <div className="bg-gray-100 rounded-xl h-64 w-full flex items-center justify-center overflow-hidden relative">
                    {/* Placeholder for an image */}
                    <img 
                        src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        alt="Älteres Paar am Strand" 
                        className="object-cover w-full h-full"
                        loading="lazy"
                        width="1000"
                        height="667"
                    />
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-6">
                Für Angehörige aus DACH: <br/>
                <span className="text-primary">Sorgenfrei aus der Ferne.</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Es ist schwer, wenn die Eltern oder Partner tausende Kilometer entfernt leben. 
                Deswegen sind wir Ihr verlängerter Arm vor Ort. Wir kommunizieren transparent 
                und halten Sie stets auf dem Laufenden.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100 font-bold text-primary">1</div>
                  <div>
                    <h4 className="font-bold text-dark">Kostenloses Erstgespräch</h4>
                    <p className="text-gray-600 text-sm">Wir klären den Bedarf per Video-Call oder Telefon.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100 font-bold text-primary">2</div>
                  <div>
                    <h4 className="font-bold text-dark">Individueller Pflegeplan</h4>
                    <p className="text-gray-600 text-sm">Transparente Kosten und klare Leistungen.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100 font-bold text-primary">3</div>
                  <div>
                    <h4 className="font-bold text-dark">Start der Betreuung</h4>
                    <p className="text-gray-600 text-sm">Regelmäßige Updates an Sie per WhatsApp oder Mail.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="secondary" onClick={() => navigate('/downloads')}>
                  Infomaterial für Angehörige laden
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser - Added scroll-mt-28 */}
      <section id="about" className="py-20 bg-white scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg">
                 <img 
                    src="https://pcwnewwubyeirwazxqdz.supabase.co/storage/v1/object/sign/Profilbild/1729801576845.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNTA5MmI2MC05MTA4LTQ2MjEtOWMwMS1iZjRkNjgxZjY4MzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9maWxiaWxkLzE3Mjk4MDE1NzY4NDUuanBlZyIsImlhdCI6MTc2NjA4NzQ4NCwiZXhwIjo0OTE5Njg3NDg0fQ.-ZstWhzKY0e0MS0PWq39xsAHV0IMU6klT03R4q6TwlU" 
                    alt="Sabrina Hänggi, Pflegeexpertin Lanzarote"
                    className="w-full h-full object-cover"
                    loading="lazy"
                 />
            </div>
            <h2 className="text-3xl font-bold text-dark mb-4">Über Sabrina Hänggi</h2>
            <p className="text-xl text-primary font-medium mb-6">Dipl. Pflegefachfrau HF & Expertin für Notfallpflege</p>
            <p className="text-gray-600 leading-relaxed mb-8">
                Nach jahrelanger Erfahrung in der Notfallmedizin in der Schweiz habe ich meinen Lebensmittelpunkt nach Lanzarote verlegt. 
                Hier verbinde ich Schweizer Qualitätsanspruch mit der kanarischen Herzlichkeit. 
                Mein Ziel ist es, mit schweizerischer Präzision Menschen ein sicheres Leben in ihrer Wunschheimat zu ermöglichen.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-bold text-2xl text-dark">20+</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Jahre Erfahrung</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-bold text-2xl text-dark">DE/ES</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Sprachen</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-bold text-2xl text-dark">24/7</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Erreichbar</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="font-bold text-2xl text-dark">100%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Leidenschaft</div>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Section - Added scroll-mt-28 */}
      <section id="contact" className="py-20 bg-primary/5 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 lg:p-12 bg-dark text-white">
                        <h2 className="text-3xl font-bold mb-6">Wir sind für Sie da.</h2>
                        <p className="text-gray-400 mb-12">
                            Haben Sie Fragen zur Pflegefinanzierung, zum Ablauf oder zur Warteliste der Pflege-WG? 
                            Kontaktieren Sie uns unverbindlich.
                        </p>
                        
                        <div className="space-y-8">
                            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="flex items-center group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 group-hover:bg-primary transition-colors">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Telefon / WhatsApp</div>
                                    <div className="text-xl font-bold">{SITE_CONFIG.phone}</div>
                                </div>
                            </a>
                            
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Standort</div>
                                    <div className="text-lg">Costa Teguise, Lanzarote</div>
                                </div>
                            </div>

                            <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors mt-4">
                                Direkt per WhatsApp schreiben
                            </a>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-dark mb-2">Rückruf anfordern</h3>
                            <p className="text-gray-500">Wir melden uns innerhalb von 24 Stunden.</p>
                        </div>
                        {/* Simple Contact Form Placeholder */}
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank! Wir melden uns.'); }}>
                            <input type="text" placeholder="Ihr Name" className="w-full p-3 rounded-lg border border-gray-300 bg-white" required />
                            <input type="tel" placeholder="Ihre Telefonnummer" className="w-full p-3 rounded-lg border border-gray-300 bg-white" required />
                            <textarea placeholder="Wie können wir helfen? (z.B. Warteliste Pflege-WG)" rows={4} className="w-full p-3 rounded-lg border border-gray-300 bg-white"></textarea>
                            <Button fullWidth type="submit">Absenden</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};