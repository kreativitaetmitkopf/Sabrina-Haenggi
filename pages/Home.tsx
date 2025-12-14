import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Plane, Train, Car, Ship, Users, Caravan, Bus } from 'lucide-react';
import { TransportMode } from '../types';

// Wir kodieren die URL-Bestandteile sauber, damit Leerzeichen keine Probleme machen.
const BASE_URL = "https://nywbtjnupnrwxahqeilx.supabase.co/storage/v1/object/sign";
const FILE_PATH = "Entspannt nach Lanzarote/WhatsApp Image 2025-07-19 at 11.24.21_8e0c1630.jpg";
const TOKEN = "eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMGU1OWJlNC0zNjM5LTQyM2UtODZmZC0yYzBhNGIwODE1MWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJFbnRzcGFubnQgbmFjaCBMYW56YXJvdGUvV2hhdHNBcHAgSW1hZ2UgMjAyNS0wNy0xOSBhdCAxMS4yNC4yMV84ZTBjMTYzMC5qcGciLCJpYXQiOjE3NjU3MTEyNTYsImV4cCI6NDkxOTMxMTI1Nn0.k81ySb1fTXtg8w-HFXn2LFx_q0PIABTD_V01xbIbAAE";

// Zusammengesetzte URL mit encodeURI für den Pfad, aber nicht für den Token
const HERO_IMAGE_URL = `${BASE_URL}/${encodeURI(FILE_PATH)}?token=${TOKEN}`;

// Fallback, nur für den Notfall
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=2070&auto=format&fit=crop";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>([TransportMode.FLIGHT]);

  const toggleMode = (mode: TransportMode) => {
    setSelectedModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode)
        : [...prev, mode]
    );
  };

  const startPlanning = () => {
    if (selectedModes.length === 0) {
      alert("Bitte wählen Sie mindestens ein Verkehrsmittel aus.");
      return;
    }
    navigate('/search', { state: { modes: selectedModes } });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Falls das Bild wirklich nicht lädt, Log zur Diagnose und Fallback anzeigen
    console.error("Bild konnte nicht geladen werden:", HERO_IMAGE_URL);
    e.currentTarget.src = FALLBACK_IMAGE;
    e.currentTarget.onerror = null; 
  };

  const ModeButton = ({ mode, icon: Icon, label }: { mode: TransportMode, icon: any, label: string }) => {
    const isSelected = selectedModes.includes(mode);
    return (
      <button
        onClick={() => toggleMode(mode)}
        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 w-full sm:w-32
          ${isSelected 
            ? 'bg-lanzarote-ocean text-white border-lanzarote-ocean shadow-lg scale-105' 
            : 'bg-white text-gray-500 border-gray-200 hover:border-lanzarote-ocean hover:text-lanzarote-ocean'
          }`}
      >
        <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-white' : 'currentColor'}`} />
        <span className="text-sm font-bold">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
      
      <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-lanzarote-sand max-w-3xl w-full">
        {/* Bild-Container angepasst: Keine feste Höhe (h-48), sondern automatische Höhe mit Max-Limit. 
            Object-Contain sorgt dafür, dass nichts abgeschnitten wird. */}
        <div className="w-full bg-gray-50 rounded-xl mb-6 overflow-hidden flex justify-center items-center min-h-[200px]">
          <img 
            src={HERO_IMAGE_URL}
            onError={handleImageError}
            alt="Lanzarote Landschaft" 
            className="w-full h-auto max-h-[500px] object-contain shadow-sm" 
          />
        </div>

        <h2 className="text-3xl font-bold text-lanzarote-ocean mb-2">
          Ihr Weg in die Sonne
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Womit möchten Sie reisen? Stellen Sie sich Ihren Mix zusammen.
        </p>
        
        {/* Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ModeButton mode={TransportMode.FLIGHT} icon={Plane} label="Flug" />
          <ModeButton mode={TransportMode.TRAIN} icon={Train} label="Zug" />
          <ModeButton mode={TransportMode.FERRY} icon={Ship} label="Fähre" />
          <ModeButton mode={TransportMode.COACH} icon={Bus} label="Reisebus" />
          <ModeButton mode={TransportMode.RENTAL_CAR} icon={Car} label="Mietwagen" />
          <ModeButton mode={TransportMode.RIDESHARE} icon={Users} label="Mitfahrgeleg." />
          <ModeButton mode={TransportMode.OWN_VEHICLE} icon={Caravan} label="Wohnmobil" />
        </div>

        <Button onClick={startPlanning} fullWidth disabled={selectedModes.length === 0}>
          Reise planen starten
        </Button>
      </div>

      <div className="text-gray-600 max-w-lg">
        <p className="italic">"Weil der Urlaub schon bei der Anreise beginnt."</p>
      </div>
    </div>
  );
};