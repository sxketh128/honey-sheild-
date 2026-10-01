import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
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
        {/* Outer Desktop Shell with rich aesthetic centering */}
        <div className="min-h-screen w-full flex items-center justify-center p-0 sm:py-6 sm:px-4">
          
          {/* Mobile / Tablet Container Frame */}
          <div className="w-full max-w-[500px] min-h-screen sm:min-h-[880px] sm:max-h-[92vh] bg-surface sm:rounded-[32px] sm:shadow-[0_25px_70px_rgba(9,21,46,0.18)] sm:border-2 sm:border-secondary-fixed/60 flex flex-col relative overflow-hidden">
            
            {/* Top Header */}
            <Header />

            {/* Scrollable Main Screen Body */}
            <main className="flex-1 w-full px-4 pt-20 pb-4 overflow-y-auto overscroll-contain flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checklist" element={<Checklist />} />
                <Route path="/family" element={<Family />} />
                <Route path="/drill" element={<Drill />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Persistent Bottom Quick Navigation */}
            <BottomNav />

          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}
