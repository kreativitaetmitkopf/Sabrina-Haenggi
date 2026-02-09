
import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { CheckCircle2, Heart, Clock, Phone, MapPin, AlertCircle, ChevronDown, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';
import { SEO } from '../components/SEO';

const FAQ_ITEMS = [
  {
    question: "Für wen ist die Pflege geeignet?",
    answer: "Für Menschen, die auf Lanzarote leben oder hier Urlaub machen und Unterstützung brauchen – sowie für Angehörige aus dem DACH-Raum, die Klarheit und Entlastung möchten."
  },
  {
    question: "Welche Leistungen sind möglich?",
    answer: "Mobile Pflege im Zuhause (z. B. Körperpflege, Vitalzeichen, Medikamentengabe, Wundversorgung) sowie 24/7 Betreuung in unserer privaten pflege-WG (Warteliste)."
  },
  {
    question: "Wie schnell kann die Betreuung starten?",
    answer: "Nach dem Erstgespräch klären wir Bedarf und Dringlichkeit. Deswegen bekommst du sehr schnell eine klare Einschätzung, was kurzfristig möglich ist."
  },
  {
    question: "Wie funktioniert die Warteliste für die Pflege-WG?",
    answer: "Du erhältst Infos zur Verfügbarkeit, zum Ablauf und zu den nächsten Schritten. Deswegen weißt du frühzeitig, was realistisch ist und wie du planen kannst."
  },
  {
    question: "Was kostet Pflege auf Lanzarote?",
    answer: "Kosten hängen vom Bedarf, Umfang und Zeitfenster ab. Deswegen erstellen wir nach dem Erstgespräch einen transparenten Pflegeplan mit klaren Leistungen und Kosten."
  },
  {
    question: "Wie werde ich als Angehöriger informiert?",
    answer: "Du bekommst regelmäßige Updates per WhatsApp oder E-Mail – verständlich, strukturiert und zuverlässig. Deswegen fühlst du dich auch aus der Ferne sicher."
  },
  {
    question: "In welchen Sprachen findet die Kommunikation statt?",
    answer: "Deutsch und Spanisch. Deswegen klappt die Abstimmung mit Ärzten, Apotheken und Stellen vor Ort reibungsloser."
  },
  {
    question: "Was passiert im Notfall?",
    answer: "Bei medizinischen Notfällen gilt immer: 112. Deswegen sprechen wir im Pflegeplan auch über Notfallwege, Kontaktketten und wichtige Unterlagen."
  }
];

const HERO_IMAGE_URL = "https://pcwnewwubyeirwazxqdz.supabase.co/storage/v1/object/sign/Headerbild/IMG_1356.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNTA5MmI2MC05MTA4LTQ2MjEtOWMwMS1iZjRkNjgxZjY4MzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIZWFkZXJiaWxkL0lNR18xMzU2LmpwZWciLCJpYXQiOjE3NzA2NDkyMTAsImV4cCI6NDg5MjcxMzIxMH0.RMPIQ2YlIkfgQ1C2FWRJ4S9tIpPmBP_Knk8YKG8rS5o"; 
const PROFILE_IMAGE_URL = "https://pcwnewwubyeirwazxqdz.supabase.co/storage/v1/object/sign/Profilbild/1729801576845.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hNTA5MmI2MC05MTA4LTQ2MjEtOWMwMS1iZjRkNjgxZjY4MzMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQcm9maWxiaWxkLzE3Mjk4MDE1NzY4NDUuanBlZyIsImlhdCI6MTc3MDY0ODQ5MCwiZXhwIjo0ODkyNzEyNDkwfQ.VMuiAtrTCqWcQmJFLflEv2KvXsmV3XbsQkwU5w3qf_U";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <SEO 
        title="Mobile Pflege & 24/7 Betreuung Lanzarote"
        description="Ihr deutscher Pflegedienst auf Lanzarote. Mobile Pflege, medizinische Versorgung und 24h Pflege-WG in Costa Teguise. Jetzt beraten lassen."
        path="/"
        schema={localBusinessSchema}
      />

      {/* Floating WhatsApp Button */}
      <a 
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce"
        aria-label="WhatsApp Nachricht senden"
      >
        <MessageCircle size={32} />
      </a>
      
      {/* Hero Section - New Light Design */}
      <section className="relative bg-white pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div className="relative z-10 order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-bold mb-6">
                Ihr Pflegedienst auf Lanzarote
              </div>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-dark tracking-tight leading-[1.1] mb-6">
                Pflege unter Palmen. <br/>
                <span className="text-primary">Sicherheit</span> für Ihre Liebsten.
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg font-medium">
                Ob mobile Pflege vor Ort oder 24/7 Betreuung in unserer Pflege-WG: 
                Wir schaffen Lebensqualität. Deutschsprachig, professionell und herzlich.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate('/downloads')} className="shadow-xl shadow-primary/20 bg-primary hover:bg-blue-600">
                  Kostenlose Checkliste
                </Button>
                <Button size="lg" variant="outline" className="border-gray-200 text-dark hover:bg-gray-50" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
                  Erstgespräch vereinbaren
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                       <Heart size={16} className="text-primary fill-primary" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-gray-500">
                  Über 20 Jahre Erfahrung in der Pflege
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] rotate-3 blur-2xl"></div>
              <div className="relative">
                <div className="relative bg-white p-3 rounded-[3rem] shadow-2xl border border-gray-100">
                  <img 
                    src={HERO_IMAGE_URL} 
                    alt="Sabrina Hänggi bei der Pflege auf Lanzarote" 
                    className="rounded-[2.5rem] w-full h-[400px] lg:h-[600px] object-cover shadow-inner" 
                    loading="eager"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 max-w-[200px] animate-pulse">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center">
                        <Heart className="text-accent fill-accent" size={20} />
                      </div>
                      <span className="font-black text-dark text-lg italic">Herzlich</span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold leading-tight uppercase">Individuelle Betreuung nach Maß</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -z-10 skew-x-12 transform origin-top-right"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-dark mb-2">Unser Angebot für Sie</h2>
            <h3 className="text-xl font-semibold text-primary mb-4">Pflege, die sich Ihrer Situation anpasst</h3>
            <p className="text-gray-600 text-lg">
              Jeder Mensch hat eigene Bedürfnisse. Deswegen bieten wir flexible Modelle, 
              die zu Ihrem Alltag, Ihrer Familie und Ihrer aktuellen Lage passen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Heart className="text-primary w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Mobile Pflege in Ihrem Zuhause</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Wir kommen direkt zu Ihnen ins Feriendomizil oder in Ihre Wohnung auf Lanzarote. Sie erhalten professionelle Pflege in vertrauter Umgebung – ruhig, respektvoll, zuverlässig.
              </p>
              <div className="mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Typische Leistungen:</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Medikamentengabe & Wundversorgung', 'Unterstützung bei Körperpflege & Alltag', 'Vitalzeichenkontrolle', 'Pflegebescheinigung für Kostenträger'].map(item => (
                  <li key={item} className="flex items-start text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="lg" className="w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
                Unverbindlich anfragen
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 border-2 border-primary/10 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col group">
               <div className="absolute top-0 right-0 bg-yellow-400 text-dark text-[10px] font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  Warteliste offen
               </div>
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Clock className="text-yellow-600 w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-2">24/7 Private Pflege-WG</h3>
              <p className="text-xs font-bold text-red-500 mb-4 bg-red-50 inline-block px-2 py-1 rounded">Aktuell vollständig ausgebucht</p>
              <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                Rund-um-die-Uhr Betreuung in familiärer Atmosphäre in Costa Teguise. Ideal als dauerhafte Lösung oder als temporäre Entlastung für Angehörige.
              </p>
              <ul className="space-y-4 mb-10">
                {['24 Stunden Anwesenheit', 'Urlaubs- & Verhinderungspflege', 'Gemeinsame Mahlzeiten & Aktivitäten', 'Barrierefreies Wohnen nach CH-Standard'].map(item => (
                  <li key={item} className="flex items-start text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="lg" className="w-full border-primary text-primary hover:bg-primary hover:text-white" onClick={() => navigate('/warteliste')}>
                Zur Warteliste & Broschüre
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Families Section */}
      <section id="families" className="py-20 bg-white border-y border-gray-100 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] rotate-2 group-hover:rotate-1 transition-transform"></div>
                  <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=1000&q=80" 
                      alt="Älteres Paar genießt die Zeit am Meer" 
                      className="rounded-[2rem] h-96 w-full object-cover" 
                      loading="lazy" 
                    />
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-dark mb-2">Für Angehörige aus D A CH:</h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">(D A CH = Deutschland (D), Österreich (A) & Schweiz (CH))</p>
              <h3 className="text-4xl font-extrabold text-dark mb-8 leading-tight">
                Sorgenfrei aus der <span className="text-primary underline decoration-accent decoration-4 underline-offset-8">Ferne.</span>
              </h3>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Es ist belastend, wenn Eltern oder Partner weit weg leben. Deswegen sind wir Ihr verlängerter Arm vor Ort: transparent, erreichbar, strukturiert. Sie wissen jederzeit, wie es Ihrem Herzensmenschen geht – ohne Druck, ohne Rätselraten.
              </p>
              
              <div className="mb-10">
                <Button 
                  size="lg" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}
                  className="shadow-lg group"
                >
                  Jetzt Rückruf anfordern
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="space-y-10">
                {[
                  { n: 1, t: "Kostenloses Erstgespräch", d: "Wir klären den Bedarf per Video-Call oder Telefon." },
                  { n: 2, t: "Individueller Pflegeplan", d: "Sie erhalten klare Leistungen und transparente Kosten passend zur Situation." },
                  { n: 3, t: "Start der Betreuung", d: "Sie bekommen regelmäßige Updates per WhatsApp oder E-Mail." }
                ].map(step => (
                  <div key={step.n} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0 border border-gray-100 font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">{step.n}</div>
                    <div>
                      <h5 className="font-bold text-xl text-dark mb-1">{step.t}</h5>
                      <p className="text-gray-600">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-10 border-8 border-white shadow-2xl ring-1 ring-gray-100">
                 <img 
                  src={PROFILE_IMAGE_URL} 
                  alt="Sabrina Hänggi - Dipl. Pflegefachfrau HF" 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                 />
            </div>
            <h2 className="text-4xl font-bold text-dark mb-4">Über Sabrina Hänggi</h2>
            <p className="text-2xl text-primary font-semibold mb-8 italic">"Schweizer Qualität mit kanarischer Herzlichkeit."</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
                Nach über 20 Jahren Erfahrung in der Notfallmedizin in der Schweiz habe ich meinen Lebensmittelpunkt nach Lanzarote verlegt. 
                Hier verbinde ich höchste medizinische Standards mit der Ruhe und Lebensfreude der Insel. 
                Mein Ziel ist es, Menschen ein würdevolles und sicheres Leben in ihrer Wahlheimat zu ermöglichen.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { v: "20+", l: "Jahre Erfahrung" },
                  { v: "CH/DE/ES", l: "Sprachen" },
                  { v: "24/7", l: "Erreichbar" },
                  { v: "100%", l: "Zuverlässigkeit" }
                ].map(stat => (
                  <div key={stat.l} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="font-black text-3xl text-dark mb-1">{stat.v}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.l}</div>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* News/Facebook Preview */}
      <section id="news" className="py-24 bg-white scroll-mt-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4 uppercase tracking-widest">Aktuelles</h2>
            <h3 className="text-xl font-semibold text-primary mb-6">Einblicke in unsere tägliche Arbeit.</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Folgen Sie mir auf Social Media für praktische Tipps zur Pflege auf den Kanaren und Neuigkeiten direkt aus Costa Teguise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-start">
             <div className="bg-background p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex justify-center h-[500px]">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsabrina.haenggi%2Fposts%2Fpfbid0LdaHwAubVp77a3BRZSFVao9Tuc38MwM4JpEN7VRGmgHRE88FHCRx6axpQsqdL2xXl&show_text=true&width=500" width="100%" height="100%" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
             </div>
             <div className="bg-background p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex justify-center h-[500px]">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsabrina.haenggi%2Fposts%2Fpfbid0RAt1soaDo8cq2huuKKhmGpPz3HcTopMhR3zfcG1hEPBUjiTZKpLvK2NBbj81NDrzl&show_text=true&width=500" width="100%" height="100%" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
             </div>
             <div className="bg-background p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex justify-center h-[500px]">
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsabrina.haenggi%2Fposts%2Fpfbid0aBzmWakggoeAjffhkxgkuQDxBeZQodTafGyUo3jHb23ZSKmGt5An8DsnNBRYEtUTl&show_text=true&width=500" width="100%" height="100%" style={{border:'none',overflow:'hidden'}} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button size="lg" className="bg-[#1877F2] hover:bg-[#166fe5] px-10 border-none" onClick={() => window.open(SITE_CONFIG.facebookUrl, '_blank')}>
              <Facebook className="mr-2 h-5 w-5" />
              Auf Facebook folgen
            </Button>
            <Button size="lg" className="bg-[#25D366] text-white hover:bg-green-600 px-10 border-none" onClick={() => window.open(SITE_CONFIG.whatsappUrl, '_blank')}>
              <MessageCircle className="mr-2 h-5 w-5" />
              Nachricht via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-dark rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-10 lg:p-16 text-white bg-gradient-to-br from-dark to-blue-900/50">
                        <h2 className="text-4xl font-bold mb-8">Wir sind für Sie da.</h2>
                        <p className="text-gray-400 text-lg mb-12 leading-relaxed">Haben Sie Fragen zur Pflegefinanzierung auf Lanzarote oder zur Warteliste der Pflege-WG? Melden Sie sich einfach direkt per WhatsApp oder Telefon.</p>
                        
                        <div className="space-y-6 mb-12">
                            <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="flex items-center group">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mr-6 group-hover:bg-primary transition-all duration-300">
                                    <Phone className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Telefon</div>
                                    <div className="text-2xl font-black">{SITE_CONFIG.phone}</div>
                                </div>
                            </a>
                            <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center group">
                                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 flex items-center justify-center mr-6 group-hover:bg-[#25D366] transition-all duration-300">
                                    <MessageCircle className="w-7 h-7 text-[#25D366] group-hover:text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">WhatsApp Kontakt</div>
                                    <div className="text-2xl font-black text-[#25D366]">Anruf oder Nachricht</div>
                                </div>
                            </a>
                        </div>

                        <div className="flex items-center border-t border-white/10 pt-8">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mr-6">
                                <MapPin className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Standort</div>
                                <div className="text-lg font-bold italic text-gray-300">Costa Teguise, Lanzarote</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 lg:p-16 bg-white">
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold text-dark mb-2">Rückruf anfordern</h3>
                            <p className="text-gray-500">Kostenlos und absolut unverbindlich.</p>
                        </div>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.'); }}>
                            <div className="space-y-4">
                                <input type="text" placeholder="Ihr Name" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-colors" required />
                                <input type="tel" placeholder="Ihre Telefonnummer" className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-colors" required />
                                <textarea placeholder="Wie können wir Ihnen helfen?" rows={4} className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white transition-colors"></textarea>
                            </div>
                            <Button fullWidth size="lg" type="submit" className="h-16 text-lg font-bold">Anfrage absenden</Button>
                            
                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-400 mb-4">— oder —</p>
                                <Button 
                                  variant="outline" 
                                  fullWidth 
                                  className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold"
                                  onClick={() => window.open(SITE_CONFIG.whatsappUrl, '_blank')}
                                >
                                  <Phone className="mr-2 w-5 h-5" />
                                  Über WhatsApp anrufen
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-dark mb-4">FAQ</h2>
            <p className="text-gray-500 font-medium">Ihre häufigsten Fragen zur Pflege auf Lanzarote beantwortet.</p>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`bg-background rounded-3xl border transition-all duration-300 ${isOpen ? 'border-primary/20 shadow-xl' : 'border-gray-50 hover:border-gray-100 shadow-sm'}`}>
                  <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none" aria-expanded={isOpen}>
                    <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-dark'}`}>{faq.question}</span>
                    <div className={`shrink-0 ml-4 p-2 rounded-full transition-all duration-300 ${isOpen ? 'rotate-180 bg-blue-50 text-primary' : 'bg-gray-50 text-gray-400'}`}><ChevronDown size={20} /></div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t border-gray-50 pt-6">{faq.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
