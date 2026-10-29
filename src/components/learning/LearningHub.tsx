import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Award,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Globe,
  RefreshCw,
  Sliders,
  BookOpen,
  Zap,
  Flame,
  Check,
  Search,
  ChevronRight,
  Layers,
  GraduationCap,
  Download,
  Info,
} from 'lucide-react';
import {
  LearningQuestion,
  QuestionCategory,
  QuestionDifficulty,
  fetchOpenTDBQuestions,
  generateDynamicMathQuestion,
  generateDynamicPatternQuestion,
  generateDynamicNumeracyQuestion,
  CURATED_OFFLINE_QUESTION_BANK,
  getCategoryLabel,
  getFallbackQuestions,
} from '../../logic/questions-repository';

export function LearningHub() {
  const [activeCategory, setActiveCategory] = useState<QuestionCategory>('math');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>('any');
  const [fetchAmount, setFetchAmount] = useState<number>(10);

  // Loaded questions in current session
  const [questions, setQuestions] = useState<LearningQuestion[]>(() => {
    return getFallbackQuestions('math', 10, 'medium');
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isFetchingWeb, setIsFetchingWeb] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchSuccessMessage, setFetchSuccessMessage] = useState<string | null>(null);

  // Performance & Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ll_learning_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Drawer to browse all loaded questions
  const [showQuestionListModal, setShowQuestionListModal] = useState(false);
  const [questionSearch, setQuestionSearch] = useState('');

  const currentQuestion: LearningQuestion | undefined = questions[currentIndex] || questions[0];

  // Fetch questions from web (OpenTDB API + Fallback)
  const handleFetchWebQuestions = async (cat: QuestionCategory = activeCategory, amt: number = fetchAmount, diff: QuestionDifficulty = difficulty) => {
    setIsFetchingWeb(true);
    setFetchError(null);
    setFetchSuccessMessage(null);

    try {
      const fetched = await fetchOpenTDBQuestions({
        category: cat,
        amount: amt,
        difficulty: diff,
      });

      if (fetched.length > 0) {
        setQuestions(fetched);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowHint(false);
        const webCount = fetched.filter((q) => q.source === 'opentdb').length;
        if (webCount > 0) {
          setFetchSuccessMessage(`Successfully connected to Open Trivia Database and fetched ${fetched.length} verified educational questions!`);
        } else {
          setFetchSuccessMessage(`Loaded ${fetched.length} questions from the extended educational repository.`);
        }
        setTimeout(() => setFetchSuccessMessage(null), 4000);
      } else {
        throw new Error('No questions returned from repository.');
      }
    } catch (err: any) {
      console.warn('Fetch error:', err);
      setFetchError('Unable to connect to OpenTDB. Loaded high-yield backup questions from local bank.');
      setQuestions(getFallbackQuestions(cat, amt, diff === 'any' ? 'medium' : diff));
    } finally {
      setIsFetchingWeb(false);
    }
  };

  // Switch category and auto-fetch
  const handleCategoryChange = (cat: QuestionCategory) => {
    setActiveCategory(cat);
    handleFetchWebQuestions(cat, fetchAmount, difficulty);
  };

  // Generate an algorithmic dynamic problem instantly
  const handleGenerateAlgorithmic = () => {
    let newQ: LearningQuestion;
    if (activeCategory === 'numeracy') {
      newQ = generateDynamicNumeracyQuestion();
    } else if (activeCategory === 'patterns') {
      newQ = generateDynamicPatternQuestion();
    } else {
      newQ = generateDynamicMathQuestion(difficulty === 'any' ? 'medium' : difficulty);
    }

    setQuestions((prev) => [newQ, ...prev]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowHint(false);
    setFetchSuccessMessage('Generated fresh algorithmic practice problem!');
    setTimeout(() => setFetchSuccessMessage(null), 3000);
  };

  // Answer selection
  const handleSelectOption = (opt: string) => {
    if (selectedAnswer || !currentQuestion) return; // already answered
    setSelectedAnswer(opt);

    const isCorrect = opt === currentQuestion.correctAnswer;
    if (isCorrect) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      const newStars = stars + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setStars(newStars);
      try {
        localStorage.setItem('ll_learning_stars', String(newStars));
      } catch {}
    } else {
      setStreak(0);
    }
  };

  // Move to next question
  const handleNext = () => {
    setSelectedAnswer(null);
    setShowHint(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setSelectedAnswer(null);
    setShowHint(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetAllProgress = () => {
    setStars(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowHint(false);
    try {
      localStorage.removeItem('ll_learning_stars');
    } catch {}
  };

  // Filtered questions for the question explorer modal
  const filteredModalQuestions = useMemo(() => {
    if (!questionSearch.trim()) return questions;
    const q = questionSearch.toLowerCase();
    return questions.filter(
      (item) => item.prompt.toLowerCase().includes(q) || item.correctAnswer.toLowerCase().includes(q)
    );
  }, [questions, questionSearch]);

  const accuracyPct = currentIndex > 0 ? Math.round((score / (currentIndex + (selectedAnswer ? 1 : 0))) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Friendly Header with Live Stars & Streak Tracker */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌟</span>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                Learning Lab — Open Educational Resource Center
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-2xl leading-relaxed">
              Connected with the <strong>Open Trivia Database (OpenTDB)</strong> and algorithmic mathematical engines.
              Fetch thousands of verified educational questions across Mathematics, Science, Computing, and General Knowledge.
            </p>
          </div>

          {/* Gamified counters: Stars & Streaks */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 font-mono font-bold text-amber-700 dark:text-amber-300 text-xs shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{stars} Stars</span>
            </div>

            {streak >= 2 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-mono font-bold text-rose-700 dark:text-rose-300 text-xs shadow-2xs animate-pulse">
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>{streak} Streak!</span>
              </div>
            )}

            {stars > 0 && (
              <button
                onClick={resetAllProgress}
                className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline cursor-pointer"
                title="Reset session score and stars"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Notifications & Banners */}
        {fetchSuccessMessage && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{fetchSuccessMessage}</span>
          </div>
        )}

        {fetchError && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}
      </div>

      {/* Web Resource Connector Toolbar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <span>Web Resource Connector (OpenTDB API)</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                  ONLINE
                </span>
              </h3>
              <p className="text-[11px] text-neutral-500">
                Fetch fresh batches of questions directly from the web database
              </p>
            </div>
          </div>

          {/* Fetch Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty select */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-neutral-500 text-[11px]">Level:</span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as QuestionDifficulty)}
                className="px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              >
                <option value="any">Any Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Batch amount select */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-neutral-500 text-[11px]">Batch:</span>
              <select
                value={fetchAmount}
                onChange={(e) => setFetchAmount(parseInt(e.target.value, 10))}
                className="px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-medium"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={20}>20 Questions</option>
                <option value={50}>50 Questions</option>
              </select>
            </div>

            {/* Fetch from OpenTDB button */}
            <button
              onClick={() => handleFetchWebQuestions(activeCategory, fetchAmount, difficulty)}
              disabled={isFetchingWeb}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              title="Connect with Open Trivia DB and load verified questions"
            >
              {isFetchingWeb ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
              <span>{isFetchingWeb ? 'Fetching Web...' : 'Fetch from Web'}</span>
            </button>

            {/* Dynamic Algorithmic Generator Button */}
            <button
              onClick={handleGenerateAlgorithmic}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Generate infinite algorithmic math or pattern problems"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Generate New</span>
            </button>

            {/* View Question Bank List */}
            <button
              onClick={() => setShowQuestionListModal(true)}
              className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
              title="Browse loaded questions"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Bank ({questions.length})</span>
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'math' as QuestionCategory, label: 'Mathematics', icon: '🔢' },
            { id: 'science' as QuestionCategory, label: 'Science & Nature', icon: '🔬' },
            { id: 'computers' as QuestionCategory, label: 'Computer Science', icon: '💻' },
            { id: 'general' as QuestionCategory, label: 'General Knowledge', icon: '🧠' },
            { id: 'numeracy' as QuestionCategory, label: 'Numeracy & Count', icon: '⭐' },
            { id: 'patterns' as QuestionCategory, label: 'Patterns & Steps', icon: '🔷' },
            { id: 'spelling' as QuestionCategory, label: 'Vocabulary', icon: '📖' },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Practice Card */}
      {currentQuestion ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header Metadata & Question Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60 uppercase tracking-wider">
                {currentQuestion.categoryLabel}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  currentQuestion.difficulty === 'hard'
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                    : currentQuestion.difficulty === 'medium'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                }`}
              >
                {currentQuestion.difficulty}
              </span>
              <span className="text-[11px] text-neutral-400">
                Source: {currentQuestion.source === 'opentdb' ? 'Open Trivia DB (Web)' : currentQuestion.source === 'dynamic' ? 'Algorithmic Generator' : 'Curated Bank'}
              </span>
            </div>

            {/* Stepper info */}
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
              <span>
                Question <strong className="text-neutral-900 dark:text-neutral-100">{currentIndex + 1}</strong> of{' '}
                <strong>{questions.length}</strong>
              </span>
              <span>· Accuracy {accuracyPct}%</span>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
              {currentQuestion.prompt}
            </h3>

            {/* Visual Items (for child numeracy & counting) */}
            {currentQuestion.visualItems && currentQuestion.visualItems.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex flex-wrap items-center justify-center gap-3 text-2xl sm:text-3xl">
                {currentQuestion.visualItems.map((item, i) => (
                  <span key={i} className="hover:scale-125 transition-transform select-none cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrectAnswer = opt === currentQuestion.correctAnswer;

              let btnStyle =
                'bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700';

              if (selectedAnswer) {
                if (isCorrectAnswer) {
                  btnStyle =
                    'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-600 font-bold';
                } else if (isSelected) {
                  btnStyle =
                    'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-400 dark:border-rose-600 line-through';
                } else {
                  btnStyle = 'opacity-40 border-neutral-200 dark:border-neutral-800 text-neutral-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={!!selectedAnswer}
                  className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="leading-snug">{opt}</span>
                  {selectedAnswer && isCorrectAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {selectedAnswer && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Hint Section (Revealed upon answer) */}
          {selectedAnswer && (
            <div
              className={`p-4 rounded-xl border space-y-1.5 animate-fadeIn ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80'
                  : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-800 dark:text-emerald-300">
                      Correct! +1 Star Earned ⭐
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span className="text-rose-800 dark:text-rose-300">
                      Not quite. The correct answer is: {currentQuestion.correctAnswer}
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Hint Drawer Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
            </button>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Restart Set'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hint text */}
          {showHint && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong>Hint:</strong> {currentQuestion.hint}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-neutral-400 mx-auto" />
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            No questions loaded
          </p>
          <button
            onClick={() => handleFetchWebQuestions(activeCategory, fetchAmount, difficulty)}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
          >
            Fetch Questions Now
          </button>
        </div>
      )}

      {/* Question Explorer Modal / Drawer */}
      {showQuestionListModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span>Loaded Question Bank ({questions.length} Items)</span>
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Select any question to jump directly to it
                </p>
              </div>
              <button
                onClick={() => setShowQuestionListModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                ✕
              </button>
            </div>

            {/* Search filter in question list */}
            <div className="p-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="text"
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  placeholder="Filter questions by keywords..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800"
                />
              </div>
            </div>

            {/* Questions list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
              {filteredModalQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  onClick={() => {
                    const realIndex = questions.findIndex((item) => item.id === q.id);
                    if (realIndex !== -1) setCurrentIndex(realIndex);
                    setSelectedAnswer(null);
                    setShowHint(false);
                    setShowQuestionListModal(false);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    questions[currentIndex]?.id === q.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 font-semibold'
                      : 'bg-neutral-50/60 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700/80 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                      <span className="font-bold">#{idx + 1}</span>
                      <span>·</span>
                      <span className="capitalize">{q.difficulty}</span>
                      <span>·</span>
                      <span>{q.source === 'opentdb' ? 'Web (OpenTDB)' : 'Repository'}</span>
                    </div>
                    <p className="line-clamp-2 text-neutral-900 dark:text-neutral-100">{q.prompt}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
