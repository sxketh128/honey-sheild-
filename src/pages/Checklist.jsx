import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Checklist() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [tempAlert, setTempAlert] = useState(null);

  const questions = t.questions || [];
  const totalQuestions = questions.length;
  const currentQ = questions[currentIndex];

  // Calculate yes count
  const yesCount = answers.filter((a) => a === true).length;

  const handleAnswer = (choice) => {
    // Tactile vibration
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(choice ? [40, 50, 40] : 30);
    }

    if (choice) {
      setTempAlert(lang === 'hi' ? 'चेतावनी संकेत दर्ज हुआ!' : 'Scam Warning Pattern Flagged!');
      setTimeout(() => setTempAlert(null), 1800);
    }

    const nextAnswers = [...answers, choice];
    setAnswers(nextAnswers);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartChecklist = () => {
    stopSpeech();
    setCurrentIndex(0);
    setAnswers([]);
    setIsFinished(false);
  };

  // Web Speech API Voice synthesis
  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeakVerdict = () => {
    if (!('speechSynthesis' in window)) {
      alert(lang === 'hi' ? 'आपके ब्राउज़र में आवाज की सुविधा उपलब्ध नहीं है।' : 'Speech synthesis not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    let textToSpeak = '';
    if (yesCount >= 3) {
      textToSpeak = lang === 'hi'
        ? "यह धोखाधड़ी है। कोई डिजिटल अरेस्ट नहीं होता। तुरंत कॉल काट दें और कोई पैसा न भेजें। आप पूरी तरह सुरक्षित हैं।"
        : "This is a scam. There is no digital arrest. Cut the phone call right now and do not send any money. You are completely safe.";
    } else if (yesCount >= 1) {
      textToSpeak = lang === 'hi'
        ? "सावधान रहें। कॉल में कुछ संदिग्ध बातें हैं। किसी भी खाते में पैसे न भेजें। पहले अपने बच्चों या परिवार से बात करें।"
        : "Be careful. Warning signs detected. Do not share any OTP or transfer funds. Contact your family right away.";
    } else {
      textToSpeak = lang === 'hi'
        ? "कम जोखिम है, लेकिन सतर्क रहें। असली पुलिस कभी फ़ोन पर पैसे ट्रांसफर करने की मांग नहीं करती।"
        : "Low risk detected. Always remember: real police officers never ask for money transfers over phone.";
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.88; // Slightly slower, calm cadence for elderly listeners

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // ------------------ VERDICT SCREEN ------------------
  if (isFinished) {
    const isRed = yesCount >= 3;
    const isAmber = yesCount >= 1 && yesCount < 3;
    const isGreen = yesCount === 0;

    return (
      <div className="flex flex-col w-full pb-14 pt-2 animate-fadeIn max-w-[640px] mx-auto">
        {/* Floating audio control on top right */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={restartChecklist}
            className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-surface-container font-label-lg text-primary text-[17px] active:bg-surface-container-high shadow-sm"
          >
            <span className="material-symbols-outlined text-[22px]">restart_alt</span>
            <span>{t.retakeChecklist}</span>
          </button>

          <button
            onClick={handleSpeakVerdict}
            aria-label={isSpeaking ? t.stopAudio : t.readAloud}
            className={`flex items-center gap-2 py-2 px-4 rounded-full font-label-lg text-[17px] shadow-sm transition-colors ${
              isSpeaking
                ? 'bg-error text-on-error animate-pulse'
                : 'bg-secondary-container text-on-secondary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isSpeaking ? 'volume_off' : 'volume_up'}
            </span>
            <span className="font-bold">{isSpeaking ? t.stopAudio : t.readAloud}</span>
          </button>
        </div>

        {/* RED VERDICT SCREEN (Matches Stitch Template 3) */}
        {isRed && (
          <div className="flex flex-col gap-space-lg w-full">
            <div className="w-full bg-error text-on-error rounded-2xl p-space-lg shadow-lg flex items-center gap-space-md border-2 border-red-700">
              <div className="w-16 h-16 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[40px] text-white">
                  warning
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-xl-mobile text-headline-xl-mobile uppercase tracking-wide leading-tight">
                  {t.verdictRedTitle}
                </span>
                <span className="font-label-lg text-label-lg opacity-95 mt-1 font-bold">
                  {t.verdictRedSub} ({yesCount}/5 {lang === 'hi' ? 'खतरे के संकेत' : 'Threat Signals'})
                </span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <p className="font-headline-md text-headline-md text-primary font-bold leading-snug">
                {t.verdictRedMessage}
              </p>
              <div className="h-1 bg-surface-container-highest rounded-full w-full"></div>
              <div className="flex items-center gap-space-sm text-primary">
                <span className="material-symbols-outlined text-[32px] text-secondary shrink-0">
                  verified_user
                </span>
                <p className="font-headline-md text-headline-md text-primary font-bold">
                  {t.safeReassurance}
                </p>
              </div>
            </div>

            {/* Direct Urgent Action Buttons */}
            <div className="flex flex-col gap-space-md w-full mt-space-xs">
              <a
                className="w-full min-h-[72px] py-4 bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform text-center font-headline-md text-headline-md focus:outline-none focus:ring-4 focus:ring-primary/40"
                href="tel:1930"
              >
                <span className="material-symbols-outlined text-[32px]">call</span>
                <span className="font-bold">{lang === 'hi' ? '1930 पर तुरंत कॉल करें' : 'Call 1930 Cyber Helpline'}</span>
              </a>

              <button
                className="w-full min-h-[72px] py-4 bg-secondary text-on-secondary hover:bg-secondary-fixed active:scale-[0.98] rounded-2xl flex items-center justify-center gap-space-sm shadow-md transition-transform font-headline-md text-headline-md focus:outline-none focus:ring-4 focus:ring-secondary/40 text-center"
                onClick={() => navigate('/family')}
              >
                <span className="material-symbols-outlined text-[32px]">notifications_active</span>
                <span className="font-bold">{t.btnAlertFamily}</span>
              </button>
            </div>

            {/* National Helpline Reassurance Card */}
            <div className="bg-surface-container-low rounded-2xl p-space-md flex items-center gap-space-sm border border-surface-container-high">
              <span className="material-symbols-outlined text-[30px] text-primary shrink-0">
                info
              </span>
              <p className="font-body-xl text-body-xl text-on-surface font-semibold">
                {lang === 'hi'
                  ? '1930 भारत सरकार की आधिकारिक व निःशुल्क साइबर अपराध हेल्पलाइन है।'
                  : '1930 is the free official National Cyber Crime helpline of India.'}
              </p>
            </div>

            {/* Family Safety Guardian Card (from Stitch) */}
            <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md flex items-center gap-space-md shadow-sm border border-surface-container-high">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                <span className="material-symbols-outlined text-[32px]">diversity_1</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-xl text-label-xl text-primary font-bold">
                  {t.guardianCardTitle}
                </span>
                <span className="font-body-lg text-body-lg text-on-surface-variant">
                  {lang === 'hi' ? 'परिवार को सतर्क करें, वे आपकी ढाल हैं।' : 'Keep your family informed; they are your shield.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* AMBER VERDICT SCREEN (1-2 YES) */}
        {isAmber && (
          <div className="flex flex-col gap-space-lg w-full">
            <div className="w-full bg-amber-600 text-white rounded-2xl p-space-lg shadow-lg flex items-center gap-space-md border-2 border-amber-700">
              <div className="w-16 h-16 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[40px] text-white">
                  report_problem
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-xl-mobile text-headline-xl-mobile uppercase tracking-wide leading-tight">
                  {t.verdictAmberTitle}
                </span>
                <span className="font-label-lg text-label-lg opacity-95 mt-1 font-bold">
                  {t.verdictAmberSub} ({yesCount}/5)
                </span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <p className="font-headline-md text-headline-md text-primary font-bold leading-snug">
                {t.verdictAmberMessage}
              </p>
              <div className="h-1 bg-surface-container-highest rounded-full w-full"></div>
              <div className="flex items-center gap-space-sm text-primary">
                <span className="material-symbols-outlined text-[32px] text-secondary shrink-0">
                  verified_user
                </span>
                <p className="font-body-xl text-body-xl text-primary font-bold">
                  {t.safeReassurance}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-space-md w-full mt-space-xs">
              <button
                className="w-full min-h-[72px] py-4 bg-secondary text-on-secondary rounded-2xl flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform font-headline-md text-headline-md"
                onClick={() => navigate('/family')}
              >
                <span className="material-symbols-outlined text-[32px]">notifications_active</span>
                <span className="font-bold">{t.btnAlertFamily}</span>
              </button>

              <a
                className="w-full min-h-[72px] py-4 bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform font-headline-md text-headline-md"
                href="tel:1930"
              >
                <span className="material-symbols-outlined text-[32px]">call</span>
                <span className="font-bold">{lang === 'hi' ? '1930 साइबर हेल्पलाइन' : 'Call 1930'}</span>
              </a>
            </div>
          </div>
        )}

        {/* GREEN VERDICT SCREEN (0 YES) */}
        {isGreen && (
          <div className="flex flex-col gap-space-lg w-full">
            <div className="w-full bg-emerald-700 text-white rounded-2xl p-space-lg shadow-lg flex items-center gap-space-md border-2 border-emerald-800">
              <div className="w-16 h-16 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[40px] text-white">
                  check_circle
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-xl-mobile text-headline-xl-mobile uppercase tracking-wide leading-tight">
                  {t.verdictGreenTitle}
                </span>
                <span className="font-label-lg text-label-lg opacity-95 mt-1 font-bold">
                  {t.verdictGreenSub}
                </span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high">
              <p className="font-headline-md text-headline-md text-primary font-bold leading-snug">
                {t.verdictGreenMessage}
              </p>
              <div className="h-1 bg-surface-container-highest rounded-full w-full"></div>
              <p className="font-body-xl text-body-xl text-on-surface-variant font-medium">
                {lang === 'hi'
                  ? 'यदि कभी भी कोई कॉलर आपसे पैसे, बैंक खाते या ओटीपी की मांग करे, तो तुरंत कॉल काट दें।'
                  : 'If any caller ever demands money transfers, bank credentials, or OTPs, hang up immediately.'}
              </p>
            </div>

            <div className="flex flex-col gap-space-md w-full mt-space-xs">
              <button
                className="w-full min-h-[72px] py-4 bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform font-headline-md text-headline-md"
                onClick={() => navigate('/')}
              >
                <span className="material-symbols-outlined text-[32px]">home</span>
                <span className="font-bold">{lang === 'hi' ? 'मुख्य पृष्ठ पर जाएं' : 'Return to Home'}</span>
              </button>

              <button
                className="w-full min-h-[72px] py-4 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform font-headline-md text-headline-md"
                onClick={() => navigate('/drill')}
              >
                <span className="material-symbols-outlined text-[32px]">model_training</span>
                <span className="font-bold">{t.btnPractice}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ------------------ QUESTION STEP-BY-STEP SCREEN (Matches Stitch Template 2) ------------------
  return (
    <div className="flex flex-col w-full pb-10 pt-2 animate-fadeIn max-w-[640px] mx-auto">
      
      {/* Temporary Warning Banner if YES chosen */}
      {tempAlert && (
        <div className="fixed top-24 left-4 right-4 z-50 max-w-md mx-auto bg-error text-on-error p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[32px]">warning</span>
          <div className="font-label-lg text-label-lg font-bold">{tempAlert}</div>
        </div>
      )}

      {/* Step Indicator & Progress */}
      <div className="flex flex-col items-center justify-center pt-1 pb-4">
        <div className="inline-flex items-center gap-space-xs bg-surface-container px-5 py-2 rounded-full shadow-sm mb-4 border border-surface-container-high">
          <span className="material-symbols-outlined text-secondary text-[22px]">shield</span>
          <span className="font-label-lg text-label-lg text-on-surface font-bold">
            {t.stepText} {currentIndex + 1} {t.ofText} {totalQuestions}
          </span>
        </div>

        {/* Accessible Progress Dots */}
        <div
          aria-label={`Assessment progress: Step ${currentIndex + 1} of ${totalQuestions}`}
          aria-valuemax={totalQuestions}
          aria-valuemin={1}
          aria-valuenow={currentIndex + 1}
          className="flex items-center gap-2"
          role="progressbar"
        >
          {questions.map((_, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <React.Fragment key={idx}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : isCurrent
                      ? 'bg-secondary-container text-on-secondary-container ring-4 ring-secondary-fixed/40 shadow-sm'
                      : 'bg-surface-container-high text-outline-variant'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  ) : (
                    <span className="text-[14px] font-bold">{idx + 1}</span>
                  )}
                </div>
                {idx < totalQuestions - 1 && (
                  <div
                    className={`w-6 h-1.5 rounded-full transition-colors ${
                      idx < currentIndex ? 'bg-secondary' : 'bg-surface-container-high'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Question Card (Matches Stitch Template 2) */}
      <div className="relative w-full rounded-3xl bg-surface-container-low p-6 sm:p-8 shadow-sm my-3 flex flex-col items-center text-center border border-surface-container-high">
        <div className="w-20 h-20 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-5 shadow-sm">
          <span className="material-symbols-outlined text-[42px]">
            {currentIndex === 0 ? 'videocam' : currentIndex === 1 ? 'do_not_disturb_on' : currentIndex === 2 ? 'currency_rupee' : currentIndex === 3 ? 'badge' : 'lock_person'}
          </span>
        </div>

        <h2 className="font-headline-xl-mobile text-headline-xl-mobile text-primary tracking-tight mb-4 leading-snug">
          {currentQ?.question}
        </h2>

        {/* Helpful Explanation Note */}
        <div className="w-full bg-surface-container rounded-2xl p-4 flex items-start gap-space-sm text-left border border-surface-container-high/60">
          <span className="material-symbols-outlined text-secondary text-[30px] shrink-0 mt-0.5">
            info
          </span>
          <p className="font-body-xl text-body-xl text-on-surface font-semibold leading-relaxed">
            {currentQ?.subtext}
          </p>
        </div>
      </div>

      {/* 2 Big Yes / No Action Buttons (Min 64px - 72px for elderly accessibility) */}
      <div className="flex flex-col gap-space-md mt-4 w-full">
        {/* YES button (RED / HIGH CONTRAST) */}
        <button
          className="w-full min-h-[72px] rounded-2xl bg-error text-on-error font-headline-md text-headline-md shadow-md active:opacity-90 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-error/40"
          onClick={() => handleAnswer(true)}
          type="button"
          aria-label={`${t.yesBtn}: ${currentQ?.question}`}
        >
          <span className="material-symbols-outlined text-[30px]">check_circle</span>
          <span className="font-bold">{t.yesBtn}</span>
        </button>

        {/* NO button (NAVY PRIMARY / HIGH CONTRAST) */}
        <button
          className="w-full min-h-[72px] rounded-2xl bg-primary text-on-primary font-headline-md text-headline-md shadow-md active:opacity-90 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/40"
          onClick={() => handleAnswer(false)}
          type="button"
          aria-label={`${t.noBtn}: ${currentQ?.question}`}
        >
          <span className="material-symbols-outlined text-[30px]">cancel</span>
          <span className="font-bold">{t.noBtn}</span>
        </button>
      </div>

      {/* Pause & Breathe Button */}
      <div className="flex flex-col items-center justify-center mt-6 gap-space-sm text-center">
        <button
          className="inline-flex items-center gap-2.5 py-3.5 px-6 rounded-full bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all border border-surface-container-high shadow-sm"
          onClick={() => setShowBreathingModal(true)}
          type="button"
        >
          <span className="material-symbols-outlined text-secondary text-[28px]">
            self_improvement
          </span>
          <span className="font-label-lg text-label-lg text-primary font-bold">
            {t.pauseBreatheBtn}
          </span>
        </button>
      </div>

      {/* Breathing Pause Modal (Matches Stitch Template 2) */}
      {showBreathingModal && (
        <div
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-margin bg-primary/60 backdrop-blur-md animate-fadeIn"
          role="dialog"
        >
          <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center border border-surface-container-high">
            {/* Pulsating breathing circle */}
            <div className="relative w-24 h-24 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-5 shadow-sm">
              <span className="material-symbols-outlined text-[52px]">spa</span>
              <div className="absolute inset-0 rounded-full border-4 border-secondary animate-ping opacity-30"></div>
            </div>

            <h3
              className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-3 font-bold"
              id="modal-title"
            >
              {t.pauseModalTitle}
            </h3>

            <p className="font-body-xl text-body-xl text-on-surface-variant mb-6 leading-relaxed">
              {t.pauseModalDesc}
            </p>

            <button
              className="w-full min-h-[68px] rounded-2xl bg-primary text-on-primary font-headline-md text-headline-md flex items-center justify-center shadow-md active:scale-95 transition-transform"
              onClick={() => setShowBreathingModal(false)}
              type="button"
            >
              {t.pauseModalContinue}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
