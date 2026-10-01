import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const handleVibrate = (pattern) => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate(pattern);
      } catch (e) {
        // Safe fallback
      }
    }
  };

  return (
    <div className="flex flex-col w-full pb-12 pt-2 animate-fadeIn">
      <div className="w-full max-w-[640px] mx-auto flex flex-col gap-space-lg">
        
        {/* Warm Welcoming Shield Status Card */}
        <div className="bg-surface-container rounded-3xl p-6 sm:p-space-lg shadow-sm flex flex-col relative overflow-hidden border border-surface-container-high">
          {/* Decorative Warm Radial Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-fixed/40 rounded-full blur-2xl pointer-events-none"></div>

          {/* Hindi + English Peaceful Reassurance Header */}
          <div className="flex items-center gap-space-sm mb-space-xs z-10">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container shadow-sm">
              <span className="material-symbols-outlined text-[28px]">verified_user</span>
            </span>
            <div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight leading-tight">
                {t.welcomeTitle}
              </h1>
              <p className="font-label-lg text-label-lg text-secondary font-bold">
                {t.welcomeSubtitle}
              </p>
            </div>
          </div>

          <div className="z-10 flex flex-col gap-space-xs mt-1">
            <p className="font-body-xl text-body-xl text-primary font-medium leading-relaxed">
              {t.welcomeDescription}
            </p>
          </div>

          {/* Peaceful Guardian Illustration Banner */}
          <div className="mt-space-md w-full rounded-2xl bg-surface-container-low p-space-md flex items-center justify-between z-10 shadow-sm border border-surface-container-high/50">
            <div className="flex items-center gap-space-sm">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[32px]">shield</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-primary font-bold">
                  {t.activeGuardTitle}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  {t.activeGuardSubtitle}
                </span>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full bg-secondary-container ring-4 ring-secondary-fixed/50 animate-pulse"></div>
          </div>
        </div>

        {/* 3 BIG ACTIONS */}
        <div className="flex flex-col gap-space-md">
          {/* Button 1: URGENT INBOUND CALL CHECK (Single-Line Honey Amber Button) */}
          <button
            onClick={() => {
              handleVibrate(40);
              navigate('/checklist');
            }}
            className="w-full min-h-[76px] bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed active:bg-secondary-fixed-dim font-headline-md text-headline-md rounded-2xl shadow-md flex items-center justify-center gap-space-sm transition-transform active:scale-[0.98] border-2 border-secondary/30 focus:outline-none focus:ring-4 focus:ring-secondary/40 text-center px-4"
            id="call-came-in-btn"
            aria-label={t.btnCallCameIn}
          >
            <span className="material-symbols-outlined text-[34px] text-on-secondary-container">
              ring_volume
            </span>
            <span className="font-bold">{t.btnCallCameIn}</span>
          </button>

          {/* Button 2: Alert Family */}
          <button
            onClick={() => {
              handleVibrate([30, 40, 30]);
              navigate('/family');
            }}
            className="w-full min-h-[68px] bg-primary-container text-on-primary hover:bg-primary active:bg-primary/90 font-label-xl text-label-xl rounded-2xl shadow-sm flex items-center justify-center gap-space-sm transition-transform active:scale-[0.98] border border-primary-fixed-dim/30 focus:outline-none focus:ring-4 focus:ring-primary/40 text-center px-4"
            id="alert-family-btn"
            aria-label={t.btnAlertFamily}
          >
            <span className="material-symbols-outlined text-[30px] text-primary-fixed">
              family_restroom
            </span>
            <span className="font-bold">{t.btnAlertFamily}</span>
          </button>

          {/* Button 3: Practice Drill */}
          <button
            onClick={() => {
              handleVibrate(20);
              navigate('/drill');
            }}
            className="w-full min-h-[68px] bg-surface-container-high text-primary hover:bg-surface-container-highest active:bg-surface-dim font-label-xl text-label-xl rounded-2xl shadow-sm flex items-center justify-center gap-space-sm transition-transform active:scale-[0.98] border border-outline-variant/40 focus:outline-none focus:ring-4 focus:ring-secondary/40 text-center px-4"
            id="practice-btn"
            aria-label={t.btnPractice}
          >
            <span className="material-symbols-outlined text-[30px] text-secondary">
              model_training
            </span>
            <span className="font-bold">{t.btnPractice}</span>
          </button>
        </div>

        {/* Warm Tactile Reassurance Card */}
        <div className="bg-surface-container-low rounded-2xl p-space-md flex items-start gap-space-md shadow-sm border border-surface-container-high/60">
          <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
            <span className="material-symbols-outlined text-[32px]">sentiment_satisfied</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-xl text-label-xl text-primary font-bold">
              {t.noHurryTitle}
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1 leading-relaxed">
              {t.noHurryDesc}
            </p>
          </div>
        </div>

        {/* Emergency Helpline Warm Tile */}
        <div className="rounded-2xl bg-surface-container p-space-md flex items-center justify-between shadow-sm border border-surface-container-high gap-2">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="material-symbols-outlined text-secondary text-[30px] shrink-0">
              headset_mic
            </span>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary font-bold truncate">
                {t.helplineTitle}
              </span>
              <span className="text-[15px] text-on-surface-variant font-medium">
                {lang === 'hi' ? 'मुफ्त सरकारी सहायता' : 'Free 24x7 Government Helpline'}
              </span>
            </div>
          </div>
          <a
            aria-label="Call 1930 Cyber Helpline"
            className="min-h-[56px] min-w-[100px] px-space-md rounded-2xl bg-primary text-on-primary font-label-xl text-label-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform shrink-0"
            href="tel:1930"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
            <span>{t.helplineCallBtn}</span>
          </a>
        </div>

        {/* Strict Regulatory Disclaimer */}
        <div className="text-center p-3 rounded-xl bg-surface-container-lowest/80 border border-surface-container-high text-on-surface-variant font-medium text-[16px] leading-relaxed">
          <span className="material-symbols-outlined text-[18px] text-secondary inline mr-1 align-sub">
            gavel
          </span>
          {t.disclaimer}
        </div>

      </div>
    </div>
  );
}
