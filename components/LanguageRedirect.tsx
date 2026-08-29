import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language } from '../lib/translations';

/**
 * Leitet Besucher ohne Sprachpraefix auf die passende Sprachversion.
 *
 * Reihenfolge:
 *   1. Frueher manuell gewaehlte Sprache aus dem localStorage
 *   2. Browsersprache (alle vom Browser gemeldeten Sprachen, in Reihenfolge)
 *   3. Deutsch als Rueckfall
 *
 * Die frueher genutzte IP-Abfrage bei ipapi.co ist bewusst entfernt:
 *   - Deutschsprachige Kunden auf Lanzarote sitzen auf spanischen IPs und
 *     wurden dadurch faelschlich auf die spanische Seite geleitet.
 *   - Sie war eine Datenuebermittlung an einen Drittanbieter.
 *   - Bei langsamer oder fehlender Antwort hingen Besucher im Ladekreisel.
 */

const SUPPORTED: Language[] = ['de', 'es', 'en'];
const FALLBACK: Language = 'de';

function istUnterstuetzt(wert: string): wert is Language {
  return (SUPPORTED as string[]).includes(wert);
}

function ermittleSprache(): Language {
  // 1. Manuell gewaehlte Sprache hat immer Vorrang
  try {
    const gespeichert = localStorage.getItem('user-language');
    if (gespeichert && istUnterstuetzt(gespeichert)) {
      return gespeichert;
    }
  } catch (err) {
    // localStorage kann im privaten Modus blockiert sein
  }

  // 2. Browsersprachen der Reihe nach pruefen
  const browserSprachen: string[] =
    (navigator.languages && navigator.languages.length > 0)
      ? Array.from(navigator.languages)
      : [navigator.language || ''];

  for (const eintrag of browserSprachen) {
    const kuerzel = String(eintrag).toLowerCase().slice(0, 2);
    if (istUnterstuetzt(kuerzel)) {
      return kuerzel;
    }
  }

  // 3. Rueckfall
  return FALLBACK;
}

export const LanguageRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pfad = location.pathname;
    const erstesSegment = pfad.split('/')[1];

    // Bereits mit Sprachpraefix unterwegs, nichts zu tun
    if (istUnterstuetzt(erstesSegment)) {
      return;
    }

    const sprache = ermittleSprache();

    try {
      localStorage.setItem('user-language', sprache);
    } catch (err) {
      // nicht kritisch
    }

    // Restpfad, Suchparameter und Anker erhalten.
    // Wichtig fuer Kampagnenlinks mit utm_source und Co.
    const restPfad = pfad === '/' ? '' : pfad;
    navigate(`/${sprache}${restPfad}${location.search}${location.hash}`, { replace: true });
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
