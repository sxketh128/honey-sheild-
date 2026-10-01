import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Home from './pages/Home';
import Checklist from './pages/Checklist';
import Family from './pages/Family';
import Drill from './pages/Drill';

export default function App() {
  // Register service worker for offline PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
          .catch((err) => console.log('Service Worker registration failed:', err));
      });
    }
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-surface font-body-lg text-body-lg text-on-surface flex flex-col selection:bg-secondary-container selection:text-on-secondary-container">
          <Header />
          <main className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-margin pt-24 pb-safe flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/family" element={<Family />} />
              <Route path="/drill" element={<Drill />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}
