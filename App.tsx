import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Downloads } from './pages/Downloads';
import { DownloadDetail } from './pages/DownloadDetail';
import { ThankYou } from './pages/ThankYou';
import { ConfirmSubscription } from './pages/ConfirmSubscription';
import { Waitlist } from './pages/Waitlist';
import { WaitlistSuccess } from './pages/WaitlistSuccess';
import { Legal } from './pages/Legal';
import { LanguageRedirect } from './components/LanguageRedirect';

// Persists the language in localStorage whenever a user visits a language route manually
const LanguagePersister: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const firstSegment = pathname.split('/')[1];
    if (firstSegment === 'de' || firstSegment === 'es' || firstSegment === 'en') {
      localStorage.setItem('user-language', firstSegment);
    }
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <LanguagePersister />
      <div className="flex flex-col min-h-screen font-sans text-dark bg-background">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Language prefixed routes */}
            <Route path="/:lang" element={<Home />} />
            <Route path="/:lang/downloads" element={<Downloads />} />
            <Route path="/:lang/download/:slug" element={<DownloadDetail />} />
            <Route path="/:lang/thank-you" element={<ThankYou />} />
            <Route path="/:lang/confirm" element={<ConfirmSubscription />} />
            <Route path="/:lang/warteliste" element={<Waitlist />} />
            <Route path="/:lang/warteliste-danke" element={<WaitlistSuccess />} />
            <Route path="/:lang/impressum" element={<Legal />} />
            <Route path="/:lang/datenschutz" element={<Legal />} />

            {/* Fallback for any other path (including `/`) goes to language detector */}
            <Route path="*" element={<LanguageRedirect />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
