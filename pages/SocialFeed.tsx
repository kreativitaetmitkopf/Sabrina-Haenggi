
import React from 'react';
import { Facebook, ExternalLink, Heart, MessageCircle, Share2, Award } from 'lucide-react';
import { SITE_CONFIG } from '../constants';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

interface SocialPost {
  id: string;
  date: string;
  text: string;
  image?: string;
  likes: string;
  category: string;
}

const MOCK_POSTS: SocialPost[] = [
  {
    id: '1',
    date: 'Vor 2 Tagen',
    category: 'Alltag auf Lanzarote',
    text: 'Heute ein wunderschöner Hausbesuch in Haría. Die mobile Pflege ermöglicht es meinen Klienten, genau dort zu bleiben, wo sie sich am wohlsten fühlen: In ihrem Zuhause mit Blick auf die Palmen. 🌴💙',
    image: 'https://images.unsplash.com/photo-1500916434205-0c7742ddb658?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '42',
  },
  {
    id: '2',
    date: 'Letzte Woche',
    category: 'Pflege-Tipp',
    text: 'Wichtig für alle Residenten: Achtet darauf, dass eure Notfallmappe immer aktuell ist. Besonders die Medikamentenliste muss bei jeder Änderung vom Arzt angepasst werden. Sicherheit geht vor! 🚑',
    likes: '28',
  },
  {
    id: '3',
    date: 'Vor 2 Wochen',
    category: 'Team News',
    text: 'Sonnige Grüße aus Costa Teguise! Wir haben aktuell wieder Kapazitäten für die mobile Grundpflege frei. Meldet euch gerne für ein unverbindliches Erstgespräch. ☀️',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    likes: '56',
  },
];

export const SocialFeed: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Aktuelles & Social Media"
        description="Bleiben Sie informiert über Pflege-Themen auf Lanzarote. Aktuelle News von Sabrina Hänggi direkt von Facebook."
        path="/aktuelles"
      />

      {/* Hero Header */}
      <section className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-6">
            <Facebook className="text-primary w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Aktuelles & Social Media</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Folgen Sie mir auf Facebook für tägliche Einblicke in die Pflege auf Lanzarote, 
            Tipps für Angehörige und Neuigkeiten aus unserer Pflege-WG.
          </p>
          <div className="mt-8">
            <a 
              href={SITE_CONFIG.facebookUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold rounded-lg transition-colors shadow-lg"
            >
              <Facebook className="mr-2 w-5 h-5" />
              Mein Profil besuchen
            </a>
          </div>
        </div>
      </section>

      {/* Feed Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              {post.image && (
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt="Social Media Post" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {post.text}
                </p>
                <div className="flex items-center gap-4 text-gray-400 text-sm border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-1">
                    <Heart size={16} className="text-red-400 fill-red-400" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span>Kommentieren</span>
                  </div>
                </div>
              </div>
              <a 
                href={SITE_CONFIG.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-4 text-center text-sm font-semibold text-primary hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                Auf Facebook ansehen <ExternalLink size={14} />
              </a>
            </article>
          ))}

          {/* Facebook Widget Placeholder / Link Card */}
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center">
            <Award className="w-12 h-12 mb-6 text-accent" />
            <h3 className="text-2xl font-bold mb-4">Bleiben wir in Kontakt!</h3>
            <p className="mb-8 opacity-90">
              Verpassen Sie keine Updates mehr. Ich teile regelmäßig wichtige Informationen zur Gesundheitsversorgung auf den Kanaren.
            </p>
            <Button 
                variant="secondary" 
                fullWidth
                onClick={() => window.open(SITE_CONFIG.facebookUrl, '_blank')}
            >
                Jetzt abonnieren
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">
                Hinweis: Aufgrund von Datenschutzrichtlinien betreiben wir hier keinen direkten Live-Feed von persönlichen Profilen. 
                Klicken Sie auf den Button, um die aktuellsten Original-Beiträge direkt auf Facebook zu lesen.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.open(SITE_CONFIG.whatsappUrl, '_blank')}
            >
                Frage an Sabrina stellen
            </Button>
        </div>
      </section>
    </div>
  );
};
