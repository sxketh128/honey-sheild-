import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import scenariosData from '../scenarios.json';

export default function Drill() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const scenario = scenariosData[currentStep];
  const totalSteps = scenariosData.length;

  const handleSelectChoice = (choice) => {
    if (selectedChoice !== null) return; // already answered this step

    // Tactile feedback
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(choice.isCorrect ? 30 : [50, 40, 50]);
    }

    setSelectedChoice(choice);
    if (choice.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedChoice(null);
    if (currentStep + 1 < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartDrill = () => {
    setCurrentStep(0);
    setScore(0);
    setSelectedChoice(null);
    setIsFinished(false);
  };

  // ------------------ DRILL COMPLETE SCREEN ------------------
  if (isFinished) {
    const isPerfect = score === totalSteps;
    return (
      <div className="flex flex-col w-full pb-14 pt-2 animate-fadeIn max-w-[640px] mx-auto">
        
        {/* Results Header Card */}
        <div className="bg-surface-container rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center border border-surface-container-high mb-6">
          <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 shadow-md">
            <span className="material-symbols-outlined text-[48px]">
              {isPerfect ? 'military_tech' : 'emoji_events'}
            </span>
          </div>

          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold mb-2">
            {t.drillCompletedTitle}
          </h1>

          <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-6 py-2.5 rounded-full shadow-sm my-3 border border-surface-container-high">
            <span className="font-label-xl text-label-xl text-secondary font-bold">
              {t.drillScoreLabel}
            </span>
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-black">
              {score} / {totalSteps}
            </span>
          </div>

          <p className="font-body-xl text-body-xl text-on-surface-variant max-w-md mt-2">
            {isPerfect
              ? (lang === 'hi' ? 'शानदार! आप धोखेबाजों के हर फंदे को पहचानना सीख चुके हैं।' : 'Flawless! You know exactly how to recognize and dismantle scam attempts.')
              : (lang === 'hi' ? 'अच्छा प्रयास! नीचे दिए गए 3 सुनहरे नियमों को हमेशा याद रखें।' : 'Good effort! Always keep the 3 Golden Rules firmly in mind.')}
          </p>
        </div>

        {/* 3 GOLDEN RULES (MANDATORY REQUIREMENT) */}
        <div className="bg-surface-container-low rounded-3xl p-6 shadow-sm border border-surface-container-high mb-6 flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[30px]">gavel</span>
            <span>{t.threeRulesTitle}</span>
          </h2>

          {/* Rule 1 */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border-l-4 border-error">
            <h3 className="font-label-xl text-label-xl text-primary font-bold">
              {t.rule1Title}
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              {t.rule1Desc}
            </p>
          </div>

          {/* Rule 2 */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border-l-4 border-secondary">
            <h3 className="font-label-xl text-label-xl text-primary font-bold">
              {t.rule2Title}
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              {t.rule2Desc}
            </p>
          </div>

          {/* Rule 3 */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border-l-4 border-primary">
            <h3 className="font-label-xl text-label-xl text-primary font-bold">
              {t.rule3Title}
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              {t.rule3Desc}
            </p>
          </div>
        </div>

        {/* Next Actions */}
        <div className="flex flex-col gap-space-md">
          <button
            onClick={restartDrill}
            className="w-full min-h-[68px] bg-secondary text-on-secondary rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform font-headline-md text-headline-md"
          >
            <span className="material-symbols-outlined text-[30px]">replay</span>
            <span>{t.restartDrillBtn}</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full min-h-[68px] bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform font-headline-md text-headline-md"
          >
            <span className="material-symbols-outlined text-[30px]">home</span>
            <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर जाएं' : 'Return to Home'}</span>
          </button>
        </div>

      </div>
    );
  }

  // ------------------ INTERACTIVE SIMULATION STEP ------------------
  return (
    <div className="flex flex-col w-full pb-14 pt-2 animate-fadeIn max-w-[640px] mx-auto">
      
      {/* Step Tracker */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-2 bg-surface-container px-4 py-1.5 rounded-full border border-surface-container-high shadow-sm">
          <span className="material-symbols-outlined text-secondary text-[20px]">psychology</span>
          <span className="font-label-lg text-primary text-[17px] font-bold">
            {t.stepText} {currentStep + 1} {t.ofText} {totalSteps}
          </span>
        </div>

        <div className="text-secondary font-bold font-label-lg text-[18px]">
          {lang === 'hi' ? 'स्कोर:' : 'Score:'} {score}
        </div>
      </div>

      {/* Scammer Message Chat Bubble */}
      <div className="bg-surface-container rounded-3xl p-5 sm:p-6 shadow-sm border border-surface-container-high mb-6 relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[28px]">smart_toy</span>
          </div>
          <div>
            <span className="font-label-xl text-label-xl text-primary font-bold block leading-tight">
              {lang === 'hi' ? 'फर्जी कॉलर (धोखेबाज)' : 'Fake Officer (Scammer)'}
            </span>
            <span className="text-[14px] text-error font-bold uppercase tracking-wider">
              {t.drillQuestionLabel}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-lowest border-l-4 border-error text-primary font-headline-md text-headline-md leading-relaxed shadow-inner">
          "{scenario?.scammer[lang] || scenario?.scammer.hi}"
        </div>
      </div>

      {/* Elderly Choices */}
      <div className="flex flex-col gap-3 mb-6">
        <span className="font-label-xl text-label-xl text-primary font-bold">
          {t.drillChoiceLabel}
        </span>

        {scenario?.choices.map((choice) => {
          const isSelected = selectedChoice?.id === choice.id;
          let btnStyle = 'bg-surface-container hover:bg-surface-container-high text-primary border-surface-container-high';

          if (selectedChoice !== null) {
            if (choice.isCorrect) {
              btnStyle = 'bg-success text-on-success border-success ring-4 ring-success/30';
            } else if (isSelected && !choice.isCorrect) {
              btnStyle = 'bg-error text-on-error border-error ring-4 ring-error/30';
            } else {
              btnStyle = 'opacity-50 bg-surface-container-high text-outline';
            }
          }

          return (
            <button
              key={choice.id}
              disabled={selectedChoice !== null}
              onClick={() => handleSelectChoice(choice)}
              className={`w-full min-h-[72px] p-4 rounded-2xl text-left font-body-xl text-body-xl font-bold flex items-center gap-3 border-2 shadow-sm transition-all active:scale-[0.98] ${btnStyle}`}
            >
              <div className="w-8 h-8 rounded-full bg-surface-bright/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {selectedChoice !== null && choice.isCorrect
                    ? 'check_circle'
                    : isSelected && !choice.isCorrect
                    ? 'cancel'
                    : 'chevron_right'}
                </span>
              </div>
              <span className="leading-snug">
                {choice.text[lang] || choice.text.hi}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel (Revealed upon selection) */}
      {selectedChoice !== null && (
        <div className="animate-fadeIn flex flex-col gap-4">
          <div
            className={`p-5 rounded-3xl border-2 shadow-md flex items-start gap-4 ${
              selectedChoice.isCorrect
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-red-50 border-red-500 text-red-950'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[36px] shrink-0 mt-0.5 ${
                selectedChoice.isCorrect ? 'text-emerald-700' : 'text-red-700'
              }`}
            >
              {selectedChoice.isCorrect ? 'task_alt' : 'warning'}
            </span>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-bold">
                {selectedChoice.isCorrect ? t.wellDone : t.scamTrap}
              </span>
              <p className="font-body-xl text-body-xl mt-1 leading-relaxed">
                {selectedChoice.feedback[lang] || selectedChoice.feedback.hi}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full min-h-[68px] bg-primary text-on-primary rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform font-headline-md text-headline-md focus:outline-none focus:ring-4 focus:ring-primary/40 mt-2"
          >
            <span>{currentStep + 1 === totalSteps ? (lang === 'hi' ? 'परिणाम देखें' : 'View Results') : t.nextStepBtn}</span>
            <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
          </button>
        </div>
      )}

    </div>
  );
}
