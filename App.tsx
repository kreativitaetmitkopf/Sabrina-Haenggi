
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import { SocialFeed } from './pages/SocialFeed';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-dark bg-background">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aktuelles" element={<SocialFeed />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/download/:slug" element={<DownloadDetail />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/confirm" element={<ConfirmSubscription />} />
            <Route path="/warteliste" element={<Waitlist />} />
            <Route path="/warteliste-danke" element={<WaitlistSuccess />} />
            <Route path="/impressum" element={<Legal />} />
            <Route path="/datenschutz" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
