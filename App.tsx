import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  Users,
  Percent,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  Languages,
  Eye,
  Award,
  ListOrdered,
  X
} from 'lucide-react';
import {
  QUESTIONS,
  TENSE_GUIDES,
  getEvaluation,
  Option
} from './questions.ts';
import { soundCtrl } from './sound.ts';
import { fireConfetti } from './confetti.ts';

type AnswerState = 'idle' | 'selected' | 'confirmed';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [score, setScore] = useState<number>(0);
  const [answeredHistory, setAnsweredHistory] = useState<
    Array<{
      questionId: number;
      chosen: 'A' | 'B' | 'C' | 'D';
      isCorrect: boolean;
    }>
  >([]);

  // Translations visibility
  const [showQuestionHy, setShowQuestionHy] = useState<boolean>(false);
  const [revealedOptionsHy, setRevealedOptionsHy] = useState<Record<string, boolean>>({});
  const [alwaysShowTranslations, setAlwaysShowTranslations] = useState<boolean>(false);

  // Lifelines
  const [lifeline5050Used, setLifeline5050Used] = useState<boolean>(false);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [lifelineAudienceUsed, setLifelineAudienceUsed] = useState<boolean>(false);
  const [audiencePoll, setAudiencePoll] = useState<{ [key: string]: number } | null>(null);
  const [lifelineHintUsed, setLifelineHintUsed] = useState<boolean>(false);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  // Modals & UI toggles
  const [showLadderMobile, setShowLadderMobile] = useState<boolean>(false);
  const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundCtrl.enabled);

  const currentQ = QUESTIONS[currentIndex];

  // Reset translations and option elimination on question change
  useEffect(() => {
    setShowQuestionHy(alwaysShowTranslations);
    setRevealedOptionsHy({});
    setHiddenOptions([]);
    setAudiencePoll(null);
    setActiveHint(null);
    setSelectedOption(null);
    setAnswerState('idle');
  }, [currentIndex, alwaysShowTranslations]);

  // Lifeline 1: 50:50
  const handleUse5050 = () => {
    if (lifeline5050Used || answerState !== 'idle') return;
    soundCtrl.playLifeline();
    setLifeline5050Used(true);

    const wrongKeys = currentQ.options
      .filter((opt) => opt.key !== currentQ.correctAnswer)
      .map((opt) => opt.key);

    const shuffled = [...wrongKeys].sort(() => 0.5 - Math.random());
    setHiddenOptions([shuffled[0], shuffled[1]]);
  };

  // Lifeline 2: Ask the Audience
  const handleUseAudience = () => {
    if (lifelineAudienceUsed || answerState !== 'idle') return;
    soundCtrl.playLifeline();
    setLifelineAudienceUsed(true);

    const keys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
    const correctKey = currentQ.correctAnswer;
    const correctPercent = Math.floor(Math.random() * 21) + 65; // 65% - 85%
    const remaining = 100 - correctPercent;

    const wrong1 = Math.floor(remaining * 0.5);
    const wrong2 = Math.floor((remaining - wrong1) * 0.6);
    const wrong3 = remaining - wrong1 - wrong2;

    const wrongPercentages = [wrong1, wrong2, wrong3];
    const poll: { [key: string]: number } = {};

    let wIdx = 0;
    keys.forEach((k) => {
      if (k === correctKey) {
        poll[k] = correctPercent;
      } else {
        poll[k] = wrongPercentages[wIdx] || 5;
        wIdx++;
      }
    });

    setAudiencePoll(poll);
  };

  // Lifeline 3: Grammar Clue
  const handleUseHint = () => {
    if (lifelineHintUsed || answerState !== 'idle') return;
    soundCtrl.playLifeline();
    setLifelineHintUsed(true);
    setActiveHint(currentQ.hint);
  };

  // Select an option
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (answerState !== 'idle' || hiddenOptions.includes(key)) return;

    soundCtrl.playSelect();
    setSelectedOption(key);
    setAnswerState('selected');

    // Confirm after brief tension pause
    soundCtrl.playLockIn();
    setTimeout(() => {
      setAnswerState('confirmed');
      const isCorrect = key === currentQ.correctAnswer;

      if (isCorrect) {
        soundCtrl.playCorrect();
        setScore((prev) => prev + 1);
        if (currentQ.id === 5 || currentQ.id === 10 || currentQ.id === 15 || currentQ.id === 20) {
          fireConfetti();
        }
      } else {
        soundCtrl.playIncorrect();
      }

      setAnsweredHistory((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          chosen: key,
          isCorrect
        }
      ]);
    }, 700);
  };

  // Continue playing to next question (even if answer was wrong!)
  const handleNextQuestion = () => {
    soundCtrl.playSelect();
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all 20 questions!
      setIsGameOver(true);
      soundCtrl.playVictory();
      fireConfetti();
    }
  };

  // Restart the game completely
  const handleRestart = () => {
    soundCtrl.playSelect();
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswerState('idle');
    setScore(0);
    setAnsweredHistory([]);
    setLifeline5050Used(false);
    setLifelineAudienceUsed(false);
    setLifelineHintUsed(false);
    setHiddenOptions([]);
    setAudiencePoll(null);
    setActiveHint(null);
    setIsGameOver(false);
  };

  // Toggle audio
  const handleToggleSound = () => {
    const next = soundCtrl.toggle();
    setSoundEnabled(next);
  };

  // Toggle single option translation
  const toggleOptionHy = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedOptionsHy((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const evalResult = getEvaluation(score);

  // Render question with explicit fill-in empty cell/box
  const renderQuestionWithBlank = () => {
    const parts = currentQ.questionEs.split('___');
    if (parts.length < 2) {
      return <span>{currentQ.questionEs}</span>;
    }

    const chosenOpt = selectedOption ? currentQ.options.find((o) => o.key === selectedOption) : null;
    const isConfirmed = answerState === 'confirmed';
    const isCorrect = selectedOption === currentQ.correctAnswer;

    return (
      <span className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 leading-relaxed">
        <span>{parts[0]}</span>
        {/* The styled empty slot cell */}
        <span
          className={`inline-flex items-center justify-center min-w-[130px] sm:min-w-[160px] h-10 sm:h-12 px-3 mx-1 rounded-xl border-2 border-dashed font-bold transition-all text-center align-middle shadow-inner ${
            isConfirmed
              ? isCorrect
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-emerald-500/30 ring-2 ring-emerald-500/40 text-base sm:text-lg'
                : 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-rose-500/20 text-base sm:text-lg'
              : selectedOption
              ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-amber-500/30 animate-pulse text-base sm:text-lg'
              : 'bg-slate-950/80 border-amber-500/70 text-amber-400/80 shadow-inner'
          }`}
        >
          {isConfirmed ? (
            chosenOpt?.textEs
          ) : selectedOption ? (
            chosenOpt?.textEs
          ) : (
            <span className="text-xs sm:text-sm text-amber-400/70 font-mono tracking-wider uppercase flex items-center gap-1">
              <span>[</span>
              <span className="animate-pulse">դատարկ վանդակ</span>
              <span>]</span>
            </span>
          )}
        </span>
        <span>{parts[1]}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* ================= TOP NAVIGATION BAR (Top Bar Contract: 3 Zones) ================= */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center font-bold text-slate-950 shadow-md shadow-amber-500/20 text-lg">
            🇪🇸
          </div>
          <div>
            <span className="font-extrabold tracking-wider text-base md:text-lg text-amber-400 uppercase">
              Los Tiempos del Pasado
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-medium">
              · Ո՞վ է ուզում դառնալ միլիոնատեր (20 Հարց)
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Controls */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setShowGrammarModal(true)}
            className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Քերականական ուղեցույց</span>
          </button>

          <button
            onClick={() => setAlwaysShowTranslations(!alwaysShowTranslations)}
            className={`flex items-center gap-2 transition-colors cursor-pointer ${
              alwaysShowTranslations ? 'text-amber-400 font-semibold' : 'hover:text-amber-400'
            }`}
          >
            <Languages className="w-4 h-4 text-sky-400" />
            <span>{alwaysShowTranslations ? 'Հայերենը՝ Միշտ ակտիվ' : 'Թարգմանությունը՝ Սեղմումով'}</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Sound + Mobile Ladder + Restart) */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <button
            onClick={() => setShowGrammarModal(true)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 transition-colors"
            title="Քերականություն"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
            title={soundEnabled ? 'Ձայնն անջատել' : 'Ձայնը միացնել'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={() => setShowLadderMobile(!showLadderMobile)}
            className="md:hidden px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 border border-slate-800 text-amber-400 flex items-center gap-1.5"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>{currentQ.id}/20</span>
          </button>

          <button
            onClick={handleRestart}
            className="px-3 md:px-4 py-1.5 md:py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Վերսկսել</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN ARENA & LADDER ================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 md:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side: Game Stage (Columns 1 to 8/9 on desktop) */}
        <main className="md:col-span-8 lg:col-span-9 flex flex-col gap-5">
          {/* Top Status & Lifelines bar */}
          <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            {/* Current Question / Stage Indicator */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-base tabular-nums">
                {currentQ.id}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                  {currentQ.partTitleEs}
                </div>
                <div className="text-xs text-slate-400">
                  {currentQ.partTitleHy} · Ճիշտ պատասխաններ՝ <span className="text-emerald-400 font-bold tabular-nums">{score}</span> / 20
                </div>
              </div>
            </div>

            {/* 3 Millionaire Lifelines */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* 50:50 Lifeline */}
              <button
                onClick={handleUse5050}
                disabled={lifeline5050Used || answerState !== 'idle'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  lifeline5050Used
                    ? 'bg-slate-950/60 text-slate-600 border-slate-800 line-through cursor-not-allowed'
                    : 'bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border-indigo-700/60 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 cursor-pointer'
                }`}
                title="50:50 — Հեռացնում է երկու սխալ տարբերակ"
              >
                <Percent className="w-3.5 h-3.5 text-amber-400" />
                <span>50:50</span>
              </button>

              {/* Ask the Audience Lifeline */}
              <button
                onClick={handleUseAudience}
                disabled={lifelineAudienceUsed || answerState !== 'idle'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  lifelineAudienceUsed
                    ? 'bg-slate-950/60 text-slate-600 border-slate-800 line-through cursor-not-allowed'
                    : 'bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border-cyan-700/60 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 cursor-pointer'
                }`}
                title="Հանդիսատեսի օգնություն — Քվեարկություն"
              >
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Հանդիսատես</span>
                <span className="sm:hidden">Լսարան</span>
              </button>

              {/* Grammar Clue / Friend Lifeline */}
              <button
                onClick={handleUseHint}
                disabled={lifelineHintUsed || answerState !== 'idle'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  lifelineHintUsed
                    ? 'bg-slate-950/60 text-slate-600 border-slate-800 line-through cursor-not-allowed'
                    : 'bg-amber-950/80 hover:bg-amber-900 text-amber-300 border-amber-700/60 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer'
                }`}
                title="Քերականական հուշում — Ժամանակի ցուցիչ"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Հուշում</span>
              </button>
            </div>
          </div>

          {/* Active Lifeline Panels (Audience Poll Bar or Hint) */}
          {audiencePoll && (
            <div className="bg-slate-900/90 border border-cyan-500/40 rounded-xl p-4 shadow-lg shadow-cyan-950/50">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-cyan-300">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Հանդիսատեսի քվեարկության արդյունքները (Audience Poll)
                </span>
                <button
                  onClick={() => setAudiencePoll(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {(['A', 'B', 'C', 'D'] as const).map((key) => (
                  <div key={key} className="flex flex-col items-center gap-1.5">
                    <div className="text-xs font-bold text-slate-300">{audiencePoll[key]}%</div>
                    <div className="w-full bg-slate-950 rounded-full h-16 relative overflow-hidden flex items-end justify-center p-1 border border-slate-800">
                      <div
                        className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-full transition-all duration-700"
                        style={{ height: `${audiencePoll[key]}%` }}
                      />
                    </div>
                    <div className="text-xs font-bold text-amber-400">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeHint && (
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 shadow-lg text-xs md:text-sm text-amber-200 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-amber-300 block mb-1">💡 Քերականական խորհրդատուի հուշումը՝</span>
                {activeHint}
              </div>
              <button onClick={() => setActiveHint(null)} className="text-amber-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= QUESTION PODIUM (WITH EMPTY FILL-IN CELL) ================= */}
          <div className="relative group">
            {/* Outer Diamond / Hex Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-sky-500/20 to-amber-500/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />

            <div
              onClick={() => setShowQuestionHy(!showQuestionHy)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowQuestionHy(!showQuestionHy);
                }
              }}
              className="relative bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-amber-500/40 hover:border-amber-400/80 rounded-2xl p-6 sm:p-8 text-center cursor-pointer shadow-2xl transition-all"
            >
              {/* Question Number & Prize Kicker */}
              <div className="flex items-center justify-between gap-4 mb-4 text-xs font-semibold text-slate-400">
                <span className="text-amber-400 tracking-wider">
                  ՀԱՐՑ {currentQ.id} / 20
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold tabular-nums">
                  {currentQ.prizeAmount.toLocaleString()} ֏
                </span>
              </div>

              {/* Spanish Question Text with the empty cell */}
              <div className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
                {renderQuestionWithBlank()}
              </div>

              {/* Click to Reveal Armenian Translation Prompt / Result */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col items-center justify-center">
                {showQuestionHy || alwaysShowTranslations ? (
                  <div className="text-sm sm:text-base md:text-lg font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl transition-all inline-flex items-center gap-2">
                    <span className="text-lg">🇦🇲</span>
                    <span>{currentQ.questionHy}</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors bg-sky-950/40 hover:bg-sky-900/50 border border-sky-800/50 px-3 py-1.5 rounded-lg">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Սեղմեք այստեղ՝ հայերեն թարգմանությունը տեսնելու համար (Ver traducción)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= 4 ANSWER OPTIONS (A, B, C, D) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt: Option) => {
              const isHidden = hiddenOptions.includes(opt.key);
              const isSelected = selectedOption === opt.key;
              const isConfirmed = answerState === 'confirmed';
              const isCorrectAnswer = opt.key === currentQ.correctAnswer;
              const isRevealedHy = revealedOptionsHy[opt.key] || alwaysShowTranslations;

              if (isHidden) {
                return (
                  <div
                    key={opt.key}
                    className="h-20 sm:h-24 rounded-xl border border-dashed border-slate-900/50 bg-slate-950/30 opacity-20 pointer-events-none flex items-center justify-center"
                  >
                    <span className="text-xs text-slate-700 font-mono">50:50 Հեռացված է</span>
                  </div>
                );
              }

              // Dynamic styling based on game state
              let containerClasses =
                'relative group rounded-xl p-4 sm:p-5 border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ';

              if (!isConfirmed) {
                if (isSelected) {
                  containerClasses +=
                    'bg-amber-500/20 border-amber-400 text-amber-100 shadow-lg shadow-amber-500/30 animate-pulse';
                } else {
                  containerClasses +=
                    'bg-slate-900/90 border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 hover:shadow-md hover:shadow-amber-500/10 text-slate-100';
                }
              } else {
                if (isCorrectAnswer) {
                  containerClasses +=
                    'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-500/40';
                } else if (isSelected && !isCorrectAnswer) {
                  containerClasses +=
                    'bg-rose-950/80 border-rose-500 text-rose-100 shadow-xl shadow-rose-500/20';
                } else {
                  containerClasses += 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <div
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelectOption(opt.key);
                    }
                  }}
                  className={containerClasses}
                >
                  <div className="flex items-start gap-3">
                    {/* Option Label: A, B, C, D */}
                    <div
                      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-extrabold text-xs transition-colors ${
                        isConfirmed && isCorrectAnswer
                          ? 'bg-emerald-500 text-slate-950'
                          : isConfirmed && isSelected
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-800 group-hover:bg-amber-500/20 text-amber-400 border border-slate-700'
                      }`}
                    >
                      {opt.key}
                    </div>

                    {/* Spanish Text */}
                    <div className="flex-1">
                      <div className="text-base sm:text-lg font-bold leading-snug">
                        {opt.textEs}
                      </div>

                      {/* Armenian Translation (reveals on click or toggle) */}
                      {isRevealedHy ? (
                        <div className="mt-1 text-xs sm:text-sm font-medium text-amber-300/90 flex items-center gap-1.5 animate-fadeIn">
                          <span className="text-xs">🇦🇲</span>
                          <span>{opt.textHy}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => toggleOptionHy(opt.key, e)}
                          className="mt-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 underline underline-offset-2"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Թարգմանություն</span>
                        </button>
                      )}
                    </div>

                    {/* Status Icon */}
                    {isConfirmed && isCorrectAnswer && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    )}
                    {isConfirmed && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= EDUCATIONAL FEEDBACK & CONTINUED PLAY BANNER ================= */}
          {answerState === 'confirmed' && (
            <div
              className={`rounded-2xl p-5 sm:p-6 border-2 transition-all shadow-2xl ${
                selectedOption === currentQ.correctAnswer
                  ? 'bg-emerald-950/40 border-emerald-500/60'
                  : 'bg-rose-950/40 border-rose-500/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  {selectedOption === currentQ.correctAnswer ? (
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                      <XCircle className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">
                      {selectedOption === currentQ.correctAnswer ? (
                        <span className="text-emerald-400">Ճիշտ է։ ¡Respuesta correcta!</span>
                      ) : (
                        <span className="text-rose-400">
                          Սխալ է, բայց խաղը շարունակվում է։
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-300">
                      Ճիշտ պատասխանն է տարբերակ <span className="font-bold text-amber-400">{currentQ.correctAnswer}</span> (
                      {currentQ.options.find((o) => o.key === currentQ.correctAnswer)?.textEs})
                    </p>
                  </div>
                </div>

                {/* Continue button (always keeps playing!) */}
                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>
                    {currentIndex < QUESTIONS.length - 1
                      ? `Շարունակել (Հարց ${currentIndex + 2}/20)`
                      : 'Ավարտել և տեսնել արդյունքը'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grammar explanation details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                    <span>📌 Քերականական ժամանակը</span>
                  </div>
                  <div className="font-semibold text-slate-200">{currentQ.tense}</div>
                  <div className="text-xs text-slate-400">{currentQ.tenseArmenian}</div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
                    🇦🇲 Բացատրություն
                  </div>
                  <div className="text-slate-300 leading-relaxed">{currentQ.explanationHy}</div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Side: Millionaire Money Ladder (Desktop) */}
        <aside className="hidden md:flex md:col-span-4 lg:col-span-3 flex-col bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl sticky top-24 max-h-[calc(100vh-8rem)]">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-xs font-bold">
            <span className="text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              Մրցանակային սանդուղք
            </span>
            <span className="text-slate-400 tabular-nums">20 Հարց</span>
          </div>

          {/* Ladder Scroll Area */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1 text-xs font-mono">
            {[...QUESTIONS].reverse().map((q, revIdx) => {
              const actualIdx = QUESTIONS.length - 1 - revIdx;
              const isCurrent = actualIdx === currentIndex;
              const isPast = actualIdx < currentIndex;
              const answered = answeredHistory.find((h) => h.questionId === q.id);
              const isMilestone = q.id === 5 || q.id === 10 || q.id === 15 || q.id === 20;

              let rowClass =
                'flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors ';

              if (isCurrent) {
                rowClass += 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20';
              } else if (isPast) {
                if (answered?.isCorrect) {
                  rowClass += 'bg-emerald-950/40 text-emerald-300';
                } else {
                  rowClass += 'bg-rose-950/30 text-rose-300';
                }
              } else if (isMilestone) {
                rowClass += 'bg-slate-800/70 text-amber-300 font-bold';
              } else {
                rowClass += 'text-slate-400 hover:bg-slate-800/40';
              }

              return (
                <div key={q.id} className={rowClass}>
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-right font-sans font-bold tabular-nums">
                      {q.id}.
                    </span>
                    {answered ? (
                      answered.isCorrect ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )
                    ) : isMilestone ? (
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 inline-block" />
                    )}
                  </div>
                  <span className="font-bold tabular-nums">
                    {q.prizeAmount.toLocaleString()} ֏
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom stats recap */}
          <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Ճիշտ պատասխաններ՝</span>
            <span className="font-bold text-amber-400 tabular-nums">
              {score} / {currentIndex + (answerState === 'confirmed' ? 1 : 0)}
            </span>
          </div>
        </aside>
      </div>

      {/* ================= MOBILE LADDER DRAWER ================= */}
      {showLadderMobile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end md:hidden">
          <div className="w-72 bg-slate-900 h-full p-4 flex flex-col border-l border-slate-800">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
              <span className="font-bold text-sm text-amber-400">Մրցանակային սանդուղք (20)</span>
              <button
                onClick={() => setShowLadderMobile(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 text-xs">
              {[...QUESTIONS].reverse().map((q, revIdx) => {
                const actualIdx = QUESTIONS.length - 1 - revIdx;
                const isCurrent = actualIdx === currentIndex;
                const answered = answeredHistory.find((h) => h.questionId === q.id);
                return (
                  <div
                    key={q.id}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : answered?.isCorrect
                        ? 'bg-emerald-950/40 text-emerald-300'
                        : answered && !answered.isCorrect
                        ? 'bg-rose-950/30 text-rose-300'
                        : 'text-slate-400'
                    }`}
                  >
                    <span>{q.id}. {q.tense.replace('Pretérito ', '')}</span>
                    <span className="font-mono">{q.prizeAmount.toLocaleString()} ֏</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= GRAMMAR REFERENCE MODAL ================= */}
      {showGrammarModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-lg text-white">
                  Իսպաներենի անցյալ ժամանակների ուղեցույց (A2–B1)
                </h3>
              </div>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
              {TENSE_GUIDES.map((guide) => (
                <div key={guide.name} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-400 text-sm sm:text-base">
                      {guide.name}
                    </span>
                    <span className="text-xs text-slate-400">{guide.nameHy}</span>
                  </div>
                  <p className="text-slate-300 mb-2 leading-relaxed">{guide.usageHy}</p>

                  <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-[11px] sm:text-xs text-sky-300 mb-2 border border-slate-800">
                    {guide.formula}
                  </div>

                  <div className="text-slate-400 text-xs mb-1">
                    <strong className="text-slate-200">Հիմնական ցուցիչներ (Marcadores)՝</strong>{' '}
                    {guide.keyMarkers.join(', ')}
                  </div>

                  <div className="text-xs text-emerald-400/90 italic">
                    Օրինակ՝ {guide.exampleEs} ({guide.exampleHy})
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowGrammarModal(false)}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Փակել ուղեցույցը
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FINAL GAME OVER / EVALUATION MODAL ================= */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Trophy & Badge */}
            <div className="text-6xl mb-3 animate-bounce">{evalResult.emoji}</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              {evalResult.titleEs} — {evalResult.titleHy}
            </h2>
            <p className="text-amber-400 font-bold text-base mb-4">
              Ձեր վերջնական արդյունքը՝ {score} / 20 ճիշտ պատասխան
            </p>

            <p className="text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
              {evalResult.textHy}
            </p>

            {/* Official Scoring Scale Breakdown for 20 questions */}
            <div className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-4 mb-6 text-left text-xs">
              <div className="font-bold text-slate-200 mb-2 uppercase tracking-wider text-center">
                Գնահատման սանդուղք (Evaluación — 20 Preguntas)
              </div>
              <div className="space-y-1.5">
                <div
                  className={`p-2 rounded-lg flex items-center justify-between ${
                    score >= 18 ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  <span>🏆 18–20 — ¡Excelente! Գերազանց։</span>
                  {score >= 18 && <span>Ձեր արդյունքը ✨</span>}
                </div>
                <div
                  className={`p-2 rounded-lg flex items-center justify-between ${
                    score >= 15 && score < 18
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  <span>⭐ 15–17 — ¡Muy bien! Շատ լավ։</span>
                  {score >= 15 && score < 18 && <span>Ձեր արդյունքը ✨</span>}
                </div>
                <div
                  className={`p-2 rounded-lg flex items-center justify-between ${
                    score >= 11 && score < 15
                      ? 'bg-blue-500/20 text-blue-300 font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  <span>👍 11–14 — ¡Bien! Լավ։</span>
                  {score >= 11 && score < 15 && <span>Ձեր արդյունքը ✨</span>}
                </div>
                <div
                  className={`p-2 rounded-lg flex items-center justify-between ${
                    score < 11 ? 'bg-rose-500/20 text-rose-300 font-bold' : 'text-slate-400'
                  }`}
                >
                  <span>📚 0–10 — ¡Sigue practicando! Շարունակիր մարզվել։</span>
                  {score < 11 && <span>Ձեր արդյունքը ✨</span>}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Կրկին խաղալ</span>
              </button>
              <button
                onClick={() => setIsGameOver(false)}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm cursor-pointer"
              >
                Դիտել հարցերը
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
