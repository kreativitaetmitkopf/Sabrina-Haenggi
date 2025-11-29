import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../constants';

export const Legal: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname === '/datenschutz';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto prose prose-blue">
        {isPrivacy ? (
          <>
            <h1>Datenschutzerklärung</h1>
            <p>Stand: {new Date().getFullYear()}</p>
            
            <h3>1. Datenschutz auf einen Blick</h3>
            <p>
              Der Schutz Ihrer Daten ist uns wichtig. Nachfolgend informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten.
              Dies ist eine vereinfachte Darstellung.
            </p>

            <h3>2. Verantwortliche Stelle</h3>
            <p>
              Sabrina Hänggi<br/>
              Calle la Rosa 14<br/>
              35508 Costa Teguise, Lanzarote (Spanien)<br/>
              E-Mail: {SITE_CONFIG.email}
            </p>

            <h3>3. Datenerfassung auf dieser Website</h3>
            <h4>Kontaktformular & Downloads</h4>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen oder einen Download anfordern, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
            </p>

            <h4>Hosting</h4>
            <p>
              Wir hosten unsere Website bei Vercel Inc. Der Provider erhebt automatisch Informationen in sogenannten Server-Log-Dateien (z.B. Browser, IP-Adresse). Dies dient der technischen Stabilität.
            </p>
          </>
        ) : (
          <>
            <h1>Impressum</h1>
            <h3>Angaben gemäß § 5 TMG / Spanischem Recht</h3>
            <p>
              Sabrina Hänggi<br/>
              Dipl. Pflegefachfrau HF / Expertin Notfallpflege<br/>
              Calle la Rosa 14<br/>
              35508 Costa Teguise<br/>
              Lanzarote / Spanien
            </p>

            <h3>Kontakt</h3>
            <p>
              Telefon: {SITE_CONFIG.phone}<br/>
              E-Mail: {SITE_CONFIG.email}
            </p>

            <h3>Berufsbezeichnung</h3>
            <p>Dipl. Pflegefachfrau HF (verliehen in der Schweiz)</p>

            <h3>Steuer-ID / NIE</h3>
            <p>NIE: Y8444975X</p>

            <h3>EU-Streitschlichtung</h3>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </>
        )}
      </div>
    </div>
  );
};