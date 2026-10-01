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
      try {
        window.navigator.vibrate(choice ? [40, 50, 40] : 30);
      } catch (e) {}
    }

    if (choice) {
      setTempAlert(lang === 'hi' ? '⚠️ चेतावनी संकेत दर्ज हुआ!' : '⚠️ Threat Signal Flagged!');
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
    utterance.rate = 0.88;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

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
      <div className="flex flex-col w-full pb-6 pt-1 animate-fadeIn">
        {/* Top Controls: Restart & Speak */}
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={restartChecklist}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-surface-container font-bold text-primary text-[15px] active:bg-surface-container-high shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            <span>{t.retakeChecklist}</span>
          </button>

          <button
            onClick={handleSpeakVerdict}
            aria-label={isSpeaking ? t.stopAudio : t.readAloud}
            className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-full font-bold text-[15px] shadow-sm transition-colors ${
              isSpeaking
                ? 'bg-error text-on-error animate-pulse'
                : 'bg-secondary-container text-on-secondary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isSpeaking ? 'volume_off' : 'volume_up'}
            </span>
            <span>{isSpeaking ? t.stopAudio : t.readAloud}</span>
          </button>
        </div>

        {/* RED VERDICT SCREEN */}
        {isRed && (
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full bg-error text-on-error rounded-2xl p-4 shadow-lg flex items-center gap-3 border-2 border-red-700">
              <div className="w-14 h-14 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px] text-white">
                  warning
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[24px] font-black uppercase tracking-wide leading-tight">
                  {t.verdictRedTitle}
                </span>
                <span className="text-[16px] opacity-95 font-bold">
                  {t.verdictRedSub} ({yesCount}/5 {lang === 'hi' ? 'संकेत' : 'Signals'})
                </span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-surface-container-high">
              <p className="text-[20px] text-primary font-black leading-snug">
                {t.verdictRedMessage}
              </p>
              <div className="h-0.5 bg-surface-container-highest rounded-full w-full"></div>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[26px] text-secondary shrink-0">
                  verified_user
                </span>
                <p className="text-[17px] text-primary font-bold">
                  {t.safeReassurance}
                </p>
              </div>
            </div>

            {/* Direct Urgent Action Buttons */}
            <div className="flex flex-col gap-2.5 w-full mt-1">
              <a
                className="w-full min-h-[60px] py-3 bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform text-center font-bold text-[20px]"
                href="tel:1930"
              >
                <span className="material-symbols-outlined text-[28px]">call</span>
                <span>{lang === 'hi' ? '1930 तुरंत कॉल करें' : 'Call 1930 Cyber Helpline'}</span>
              </a>

              <button
                className="w-full min-h-[60px] py-3 bg-secondary text-on-secondary hover:bg-secondary-fixed active:scale-[0.98] rounded-2xl flex items-center justify-center gap-2 shadow-md transition-transform font-bold text-[20px] text-center"
                onClick={() => navigate('/family')}
              >
                <span className="material-symbols-outlined text-[28px]">notifications_active</span>
                <span>{t.btnAlertFamily}</span>
              </button>
            </div>

            <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-2 border border-surface-container-high">
              <span className="material-symbols-outlined text-[24px] text-primary shrink-0">info</span>
              <p className="text-[15px] text-on-surface font-semibold">
                {lang === 'hi'
                  ? '1930 भारत सरकार की राष्ट्रीय साइबर अपराध हेल्पलाइन है।'
                  : '1930 is the free official Cyber Crime Helpline of India.'}
              </p>
            </div>
          </div>
        )}

        {/* AMBER VERDICT SCREEN */}
        {isAmber && (
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full bg-amber-600 text-white rounded-2xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px] text-white">report_problem</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[24px] font-black uppercase leading-tight">{t.verdictAmberTitle}</span>
                <span className="text-[16px] opacity-95 font-bold">{t.verdictAmberSub} ({yesCount}/5)</span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-4 shadow-sm border border-surface-container-high">
              <p className="text-[19px] text-primary font-bold leading-snug">{t.verdictAmberMessage}</p>
            </div>

            <div className="flex flex-col gap-2.5 w-full mt-1">
              <button
                className="w-full min-h-[60px] py-3 bg-secondary text-on-secondary rounded-2xl flex items-center justify-center gap-2 shadow-md font-bold text-[20px]"
                onClick={() => navigate('/family')}
              >
                <span className="material-symbols-outlined text-[28px]">notifications_active</span>
                <span>{t.btnAlertFamily}</span>
              </button>

              <a
                className="w-full min-h-[60px] py-3 bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-2 shadow-md font-bold text-[20px]"
                href="tel:1930"
              >
                <span className="material-symbols-outlined text-[28px]">call</span>
                <span>{lang === 'hi' ? '1930 साइबर हेल्पलाइन' : 'Call 1930'}</span>
              </a>
            </div>
          </div>
        )}

        {/* GREEN VERDICT SCREEN */}
        {isGreen && (
          <div className="flex flex-col gap-3 w-full">
            <div className="w-full bg-emerald-700 text-white rounded-2xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white/20 shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px] text-white">check_circle</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[22px] font-black uppercase leading-tight">{t.verdictGreenTitle}</span>
                <span className="text-[15px] opacity-95 font-bold">{t.verdictGreenSub}</span>
              </div>
            </div>

            <div className="bg-surface-container rounded-2xl p-4 shadow-sm border border-surface-container-high">
              <p className="text-[19px] text-primary font-bold leading-snug">{t.verdictGreenMessage}</p>
            </div>

            <div className="flex flex-col gap-2.5 w-full mt-1">
              <button
                className="w-full min-h-[60px] py-3 bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-2 shadow-md font-bold text-[20px]"
                onClick={() => navigate('/')}
              >
                <span className="material-symbols-outlined text-[28px]">home</span>
                <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर जाएं' : 'Return to Home'}</span>
              </button>

              <button
                className="w-full min-h-[60px] py-3 bg-secondary-container text-on-secondary-container rounded-2xl flex items-center justify-center gap-2 shadow-md font-bold text-[20px]"
                onClick={() => navigate('/drill')}
              >
                <span className="material-symbols-outlined text-[28px]">model_training</span>
                <span>{t.btnPractice}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ------------------ QUESTION STEP-BY-STEP SCREEN ------------------
  return (
    <div className="flex flex-col w-full pb-4 pt-0 animate-fadeIn">
      
      {/* Temporary Alert Banner */}
      {tempAlert && (
        <div className="fixed top-20 left-4 right-4 z-50 max-w-sm mx-auto bg-error text-on-error p-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[26px]">warning</span>
          <div className="font-bold text-[16px]">{tempAlert}</div>
        </div>
      )}

      {/* Step Indicator & Progress */}
      <div className="flex flex-col items-center justify-center pt-0 pb-2">
        <div className="inline-flex items-center gap-1.5 bg-surface-container px-4 py-1 rounded-full shadow-sm mb-2 border border-surface-container-high">
          <span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
          <span className="font-bold text-[16px] text-on-surface">
            {t.stepText} {currentIndex + 1} {t.ofText} {totalQuestions}
          </span>
        </div>

        {/* Step Progress Dots */}
        <div
          aria-label={`Assessment progress: Step ${currentIndex + 1} of ${totalQuestions}`}
          aria-valuemax={totalQuestions}
          aria-valuemin={1}
          aria-valuenow={currentIndex + 1}
          className="flex items-center gap-1.5"
          role="progressbar"
        >
          {questions.map((_, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <React.Fragment key={idx}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-black transition-all ${
                    isCompleted
                      ? 'bg-secondary text-on-secondary shadow-sm'
                      : isCurrent
                      ? 'bg-secondary-container text-on-secondary-container ring-2 ring-secondary shadow-sm scale-110'
                      : 'bg-surface-container-high text-outline-variant'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                {idx < totalQuestions - 1 && (
                  <div
                    className={`w-4 h-1 rounded-full ${
                      idx < currentIndex ? 'bg-secondary' : 'bg-surface-container-high'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Compact Question Card (Fits effortlessly on screen) */}
      <div className="relative w-full rounded-2xl bg-surface-container-low p-4 shadow-sm my-2 flex flex-col items-center text-center border border-surface-container-high">
        <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-3 shadow-sm">
          <span className="material-symbols-outlined text-[32px]">
            {currentIndex === 0 ? 'videocam' : currentIndex === 1 ? 'do_not_disturb_on' : currentIndex === 2 ? 'currency_rupee' : currentIndex === 3 ? 'badge' : 'lock_person'}
          </span>
        </div>

        <h2 className="text-[22px] font-black text-primary tracking-tight mb-2 leading-tight">
          {currentQ?.question}
        </h2>

        {/* Informative Hint */}
        <div className="w-full bg-surface-container rounded-xl p-2.5 flex items-start gap-2 text-left border border-surface-container-high/60">
          <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">info</span>
          <p className="text-[15px] text-on-surface font-semibold leading-snug">
            {currentQ?.subtext}
          </p>
        </div>
      </div>

      {/* 2 Big Visible Buttons: YES and NO (Both guaranteed on screen) */}
      <div className="flex flex-col gap-2.5 mt-2 w-full">
        {/* YES button */}
        <button
          className="w-full min-h-[60px] rounded-2xl bg-error text-on-error font-black text-[22px] shadow-md active:opacity-90 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          onClick={() => handleAnswer(true)}
          type="button"
          aria-label={`${t.yesBtn}: ${currentQ?.question}`}
        >
          <span className="material-symbols-outlined text-[28px]">check_circle</span>
          <span>{t.yesBtn}</span>
        </button>

        {/* NO button */}
        <button
          className="w-full min-h-[60px] rounded-2xl bg-primary text-on-primary font-black text-[22px] shadow-md active:opacity-90 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          onClick={() => handleAnswer(false)}
          type="button"
          aria-label={`${t.noBtn}: ${currentQ?.question}`}
        >
          <span className="material-symbols-outlined text-[28px]">cancel</span>
          <span>{t.noBtn}</span>
        </button>
      </div>

      {/* Pause & Breathe Button */}
      <div className="flex flex-col items-center justify-center mt-3 text-center">
        <button
          className="inline-flex items-center gap-1.5 py-2 px-4 rounded-full bg-surface-container hover:bg-surface-container-high active:scale-95 transition-all border border-surface-container-high shadow-sm text-primary font-bold text-[15px]"
          onClick={() => setShowBreathingModal(true)}
          type="button"
        >
          <span className="material-symbols-outlined text-secondary text-[22px]">self_improvement</span>
          <span>{t.pauseBreatheBtn}</span>
        </button>
      </div>

      {/* Breathing Pause Modal */}
      {showBreathingModal && (
        <div
          aria-labelledby="modal-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-md animate-fadeIn"
          role="dialog"
        >
          <div className="w-full max-w-xs rounded-3xl bg-surface-container-lowest p-6 shadow-2xl flex flex-col items-center text-center border border-surface-container-high">
            <div className="w-18 h-18 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-4 shadow-sm p-4">
              <span className="material-symbols-outlined text-[42px]">spa</span>
            </div>

            <h3 className="text-[22px] font-black text-primary mb-2" id="modal-title">
              {t.pauseModalTitle}
            </h3>

            <p className="text-[16px] text-on-surface-variant mb-5 leading-relaxed font-semibold">
              {t.pauseModalDesc}
            </p>

            <button
              className="w-full min-h-[56px] rounded-xl bg-primary text-on-primary font-bold text-[18px] flex items-center justify-center shadow-md active:scale-95"
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
