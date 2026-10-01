import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();
  const isHome = location.pathname === '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.05)] border-b border-surface-container-high/60">
      <div className="h-20 max-w-xl mx-auto px-margin flex items-center justify-between">
        {/* Left: Back button + Logo */}
        <div className="flex items-center gap-space-sm">
          {!isHome ? (
            <button
              onClick={() => navigate(-1)}
              aria-label={t.back}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-primary active:bg-surface-container-high transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="material-symbols-outlined text-[28px]">arrow_back</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              aria-label="Home"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary-fixed text-on-secondary-fixed shadow-sm"
            >
              <span className="material-symbols-outlined text-[26px]">shield</span>
            </button>
          )}

          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-primary tracking-tight leading-tight">
                {lang === 'hi' ? 'हनी शील्ड' : 'Honey Shield'}
              </span>
              <span className="text-[14px] font-semibold text-secondary -mt-0.5">
                Senior Fraud Shield
              </span>
            </div>
          </div>
        </div>

        {/* Right: Language Toggle & Emergency Call */}
        <div className="flex items-center gap-2">
          {/* Big high-contrast Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label={`Switch to ${t.langToggle}`}
            className="min-h-[44px] px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest active:scale-95 text-primary border-2 border-secondary/30 flex items-center gap-1.5 font-bold text-[17px] shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">translate</span>
            <span>{t.langToggle}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
