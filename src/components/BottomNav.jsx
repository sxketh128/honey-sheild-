import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();

  const navItems = [
    {
      path: '/',
      icon: 'home',
      label: lang === 'hi' ? 'होम' : 'Home'
    },
    {
      path: '/checklist',
      icon: 'verified_user',
      label: lang === 'hi' ? 'जांच' : 'Check'
    },
    {
      path: '/family',
      icon: 'family_restroom',
      label: lang === 'hi' ? 'परिवार' : 'Family'
    },
    {
      path: '/drill',
      icon: 'model_training',
      label: lang === 'hi' ? 'अभ्यास' : 'Drill'
    }
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t-2 border-surface-container-high/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center min-w-[72px] min-h-[56px] py-1 px-2 rounded-2xl transition-all ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container font-black shadow-sm scale-105'
                : 'text-primary/70 hover:text-primary active:bg-surface-container'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[26px] ${
                isActive ? 'text-on-secondary-container' : 'text-primary'
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[14px] font-bold mt-0.5 leading-none">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
