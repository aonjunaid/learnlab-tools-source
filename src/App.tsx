import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Star,
  ArrowLeft,
  ChevronRight,
  Clock,
  Sparkles,
  Calculator,
  ArrowRightLeft,
  FileText,
  Code2,
  Palette,
  QrCode,
  Percent,
  Calendar,
  Type,
  TrendingUp,
  GraduationCap,
  Atom,
  Image as ImageIcon,
  Mic,
  Dna,
  FlaskConical,
  Activity,
  Link2,
  Check,
  Code,
  Briefcase,
  Video,
  ListTree,
  Key,
  Compass,
} from 'lucide-react';
import { TOOLS, CATEGORIES } from './data/tools';
import { ToolCategory, ToolItem, StaticPageId, ThemeMode } from './types';
import { Navbar } from './components/Navbar';
import { ToolCard } from './components/ToolCard';
import { ToolGuidance } from './components/ToolGuidance';
import { ToolSupplementalSEO } from './components/ToolSupplementalSEO';
import { getTwoSentenceLead } from './logic/tool-seo-content';
import { useSEO } from './hooks/useSEO';
import { FooterSitemap } from './components/FooterSitemap';
import { SitemapModal } from './components/SitemapModal';

// Tools
import { PercentageCalculatorTool } from './components/tools/PercentageCalculatorTool';
import { AgeDateCalculatorTool } from './components/tools/AgeDateCalculatorTool';
import { WordCounterTool } from './components/tools/WordCounterTool';
import { TextCaseConverterTool } from './components/tools/TextCaseConverterTool';
import { UnitConverterTool } from './components/tools/UnitConverterTool';
import { CompoundInterestTool } from './components/tools/CompoundInterestTool';
import { MarksCalculatorTool } from './components/tools/MarksCalculatorTool';
import { ScientificToolsHub } from './components/tools/ScientificToolsHub';
import { LearningHub } from './components/learning/LearningHub';
import { JsonFormatterTool } from './components/tools/JsonFormatterTool';
import { ImageResizerTool } from './components/tools/ImageResizerTool';
import { QrCodeTool } from './components/tools/QrCodeTool';
import { CalculatorTool } from './components/tools/CalculatorTool';
import { ColorPickerTool } from './components/tools/ColorPickerTool';
import { VideoTranscriptionNotesTool } from './components/tools/VideoTranscriptionNotesTool';
import { BioScienceTool } from './components/tools/BioScienceTool';
import { ChemistrySuiteTool } from './components/tools/ChemistrySuiteTool';
import { ScienceVisualizerTool } from './components/tools/ScienceVisualizerTool';
import { CodeCompilerTool } from './components/tools/CodeCompilerTool';
import { CVBuilderTool } from './components/tools/CVBuilderTool';
import { GeminiApiAccessTool } from './components/tools/GeminiApiAccessTool';
import { UniversalFileConverterTool } from './components/tools/UniversalFileConverterTool';
import { IslamicToolsSuite } from './components/tools/IslamicToolsSuite';
import { BilingualExamGeneratorTool } from './components/tools/BilingualExamGeneratorTool';
import { LabNotebookModal } from './components/LabNotebookModal';

// Static Pages
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { TermsPage } from './components/pages/TermsPage';
import { AccessibilityPage } from './components/pages/AccessibilityPage';

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [activeStaticPage, setActiveStaticPage] = useState<StaticPageId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Synchronize dynamic SEO metadata across all tools, categories, and static pages
  const seo = useSEO(activeToolId, activeStaticPage, selectedCategory);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ll_favorites');
      return saved ? JSON.parse(saved) : ['percentage-calculator', 'scientific-tools', 'learning-lab'];
    } catch {
      return ['percentage-calculator', 'scientific-tools', 'learning-lab'];
    }
  });

  // Recently used
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ll_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Theme Mode: 'system' (Auto-detect & sync) | 'light' | 'dark'
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('ll_theme_mode');
      if (saved === 'system' || saved === 'dark' || saved === 'light') return saved;
      // Backward compatibility with legacy 'll_theme'
      const legacy = localStorage.getItem('ll_theme');
      if (legacy === 'dark' || legacy === 'light') return legacy;
      return 'system';
    } catch {
      return 'system';
    }
  });

  // Track user OS system color preference in real time
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Real-time listener: actively updates when OS switches light/dark
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set current matches on mount
    setSystemPrefersDark(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    } else if ((mediaQuery as any).addListener) {
      (mediaQuery as any).addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      } else if ((mediaQuery as any).removeListener) {
        (mediaQuery as any).removeListener(handleMediaChange);
      }
    };
  }, []);

  // Compute effective resolved theme ('light' | 'dark')
  const resolvedTheme: 'light' | 'dark' = themeMode === 'system'
    ? (systemPrefersDark ? 'dark' : 'light')
    : themeMode;

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Parse URL hash on mount and hash changes for direct URL access
  useEffect(() => {
    const handleHashRouting = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setActiveToolId(null);
        setActiveStaticPage(null);
        return;
      }

      if (hash === 'sitemap') {
        setIsSitemapModalOpen(true);
        return;
      }

      if (hash.startsWith('tool/')) {
        const toolId = hash.replace('tool/', '');
        const exists = TOOLS.some((t) => t.id === toolId);
        if (exists) {
          setActiveToolId(toolId);
          setActiveStaticPage(null);
          return;
        }
      }

      if (hash.startsWith('category/')) {
        const cat = hash.replace('category/', '') as ToolCategory;
        if (['all', 'everyday', 'math', 'science', 'learning'].includes(cat)) {
          setSelectedCategory(cat);
          setActiveToolId(null);
          setActiveStaticPage(null);
          return;
        }
      }

      if (['about', 'contact', 'privacy', 'terms', 'accessibility'].includes(hash)) {
        setActiveStaticPage(hash as StaticPageId);
        setActiveToolId(null);
        return;
      }

      // Default home
      setActiveToolId(null);
      setActiveStaticPage(null);
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, []);

  // Sync theme mode to localStorage and toggle document class based on resolvedTheme
  useEffect(() => {
    try {
      localStorage.setItem('ll_theme_mode', themeMode);
      localStorage.setItem('ll_theme', resolvedTheme);
    } catch {}

    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode, resolvedTheme]);

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('ll_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Sync recently used
  useEffect(() => {
    try {
      localStorage.setItem('ll_recent', JSON.stringify(recentlyUsed));
    } catch {}
  }, [recentlyUsed]);


  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        if (searchQuery) {
          setSearchQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  const toggleFavorite = (e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]
    );
  };

  const openTool = (toolId: string) => {
    setActiveToolId(toolId);
    setActiveStaticPage(null);
    window.location.hash = `#/tool/${toolId}`;
    setRecentlyUsed((prev) => [toolId, ...prev.filter((id) => id !== toolId)].slice(0, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStaticPage = (page: StaticPageId) => {
    setActiveStaticPage(page);
    setActiveToolId(null);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setActiveToolId(null);
    setActiveStaticPage(null);
    setSearchQuery('');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTool = useMemo(() => {
    return TOOLS.find((t) => t.id === activeToolId) || null;
  }, [activeToolId]);

  // Filtered tools
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      if (favoritesOnly && !favorites.includes(tool.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesDesc = tool.description.toLowerCase().includes(query);
        const matchesCat = tool.categoryLabel.toLowerCase().includes(query);
        const matchesKeywords = tool.keywords.some((k) => k.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesCat || matchesKeywords;
      }
      return true;
    });
  }, [selectedCategory, favoritesOnly, favorites, searchQuery]);

  // Curated featured tools
  const featuredTools = useMemo(() => {
    return TOOLS.filter((t) =>
      ['percentage-calculator', 'scientific-tools', 'learning-lab', 'compound-interest'].includes(t.id)
    );
  }, []);

  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'percentage-calculator':
        return <PercentageCalculatorTool />;
      case 'age-date-calculator':
        return <AgeDateCalculatorTool />;
      case 'word-counter':
        return <WordCounterTool />;
      case 'text-case-converter':
        return <TextCaseConverterTool />;
      case 'unit-converter':
        return <UnitConverterTool />;
      case 'compound-interest':
        return <CompoundInterestTool />;
      case 'marks-calculator':
        return <MarksCalculatorTool />;
      case 'scientific-tools':
        return <ScientificToolsHub />;
      case 'learning-lab':
        return <LearningHub />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'image-resizer':
        return <ImageResizerTool />;
      case 'qr-code-generator':
        return <QrCodeTool />;
      case 'calculator':
        return <CalculatorTool />;
      case 'color-picker':
        return <ColorPickerTool />;
      case 'video-transcription-notes':
        return <VideoTranscriptionNotesTool />;
      case 'bioscience-genetics':
        return <BioScienceTool />;
      case 'chemistry-suite':
        return <ChemistrySuiteTool />;
      case 'science-visualizer':
        return <ScienceVisualizerTool />;
      case 'code-compiler':
        return <CodeCompilerTool />;
      case 'cv-cover-letter-builder':
        return <CVBuilderTool />;
      case 'gemini-api-access':
        return <GeminiApiAccessTool />;
      case 'universal-file-converter':
        return <UniversalFileConverterTool />;
      case 'islamic-tools-suite':
        return <IslamicToolsSuite />;
      case 'bilingual-exam-generator':
        return <BilingualExamGeneratorTool />;
      default:
        return null;
    }
  };

  const renderToolIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'Percent':
        return <Percent {...props} />;
      case 'Calendar':
        return <Calendar {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'Type':
        return <Type {...props} />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'Atom':
        return <Atom {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} className="w-4 h-4 text-amber-500" />;
      case 'Code2':
        return <Code2 {...props} />;
      case 'Code':
        return <Code {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'Image':
        return <ImageIcon {...props} />;
      case 'QrCode':
        return <QrCode {...props} />;
      case 'Calculator':
        return <Calculator {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'Mic':
        return <Mic {...props} />;
      case 'Dna':
        return <Dna {...props} />;
      case 'FlaskConical':
        return <FlaskConical {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'Video':
        return <Video {...props} />;
      case 'Key':
        return <Key {...props} className="w-4 h-4 text-amber-500" />;
      case 'Compass':
        return <Compass {...props} className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Calculator {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-150">
      {/* Top Bar Navigation */}
      <Navbar
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveToolId(null);
          setActiveStaticPage(null);
          window.location.hash = cat === 'all' ? '' : `#/category/${cat}`;
        }}
        onOpenSearch={() => {
          setActiveToolId(null);
          setActiveStaticPage(null);
          setTimeout(() => searchInputRef.current?.focus(), 50);
        }}
        onGoHome={goHome}
        themeMode={themeMode}
        resolvedTheme={resolvedTheme}
        onChangeThemeMode={setThemeMode}
        theme={resolvedTheme}
        onToggleTheme={() =>
          setThemeMode((prev) => (prev === 'system' ? 'light' : prev === 'light' ? 'dark' : 'system'))
        }
        onOpenNotebook={() => setIsNotebookOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View 1: Static Information Pages */}
        {activeStaticPage ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={goHome}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to all tools</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(seo.canonicalUrl);
                  setCopiedUrl(true);
                  setTimeout(() => setCopiedUrl(false), 2000);
                }}
                aria-label="Copy page link"
                title="Copy share link for this page"
                className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied Link</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Share Page</span>
                  </>
                )}
              </button>
            </div>
            {activeStaticPage === 'about' && <AboutPage />}
            {activeStaticPage === 'contact' && <ContactPage />}
            {activeStaticPage === 'privacy' && <PrivacyPage />}
            {activeStaticPage === 'terms' && <TermsPage />}
            {activeStaticPage === 'accessibility' && <AccessibilityPage />}
          </div>
        ) : activeTool ? (
          /* View 2: Active Tool Detail View */
          <div className="space-y-6">
            {/* Breadcrumb Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                  <button
                    onClick={goHome}
                    className="hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>LearnLab Tools</span>
                  </button>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                  <span>{activeTool.categoryLabel}</span>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">
                    {activeTool.name}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                  {activeTool.actionHeading || `Free Online ${activeTool.name}`}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
                  {getTwoSentenceLead(activeTool)}
                </p>
              </div>

              {/* Action shortcuts */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <select
                  value={activeTool.id}
                  onChange={(e) => openTool(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-medium text-neutral-800 dark:text-neutral-200"
                  aria-label="Switch tool"
                >
                  {TOOLS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(seo.canonicalUrl);
                    setCopiedUrl(true);
                    setTimeout(() => setCopiedUrl(false), 2000);
                  }}
                  aria-label="Copy canonical share link"
                  title="Copy direct share link with SEO metadata"
                  className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedUrl ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied Link</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => toggleFavorite(e, activeTool.id)}
                  aria-label={favorites.includes(activeTool.id) ? 'Remove favorite' : 'Mark favorite'}
                  className={`p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                    favorites.includes(activeTool.id)
                      ? 'text-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'text-neutral-400'
                  }`}
                  title={favorites.includes(activeTool.id) ? 'Favorite' : 'Add to favorites'}
                >
                  <Star className={`w-4 h-4 ${favorites.includes(activeTool.id) ? 'fill-amber-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Active Interactive Functional Component - Placed at the top for instant time-to-value */}
            <div className="w-full">{renderActiveTool()}</div>

            {/* Below-the-fold Supplemental Educational & SEO Guidance */}
            <ToolSupplementalSEO tool={activeTool} onOpenTool={openTool} />

            {/* Quick Tips & Formula Guidance */}
            <ToolGuidance tool={activeTool} />
          </div>
        ) : (
          /* View 3: Directory Hub View */
          <div className="space-y-8">
            {/* Hero / Brand Intro */}
            <div className="py-4 text-center max-w-3xl mx-auto space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 text-balance">
                LearnLab Tools
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 text-balance leading-relaxed">
                Free tools for everyday tasks, scientific problem-solving and smarter learning. Fast, accessible, and completely private browser-side utilities.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="space-y-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools by name, topic, or formula (e.g. 'percentage', 'newton', 'interest', 'age')..."
                  className="w-full pl-11 pr-24 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 shadow-xs"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-neutral-400 hover:text-neutral-600 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-400 font-mono">
                      /
                    </kbd>
                  )}
                </div>
              </div>

              {/* Segmented Category Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-x-auto scrollbar-none max-w-full">
                  {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.id && !favoritesOnly;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setFavoritesOnly(false);
                        }}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Favorites filter toggle */}
                <button
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 transition-colors shrink-0 ${
                    favoritesOnly
                      ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>Favorites ({favorites.length})</span>
                </button>
              </div>
            </div>

            {/* Curated Featured Tools Strip (When browsing all without search) */}
            {!searchQuery && selectedCategory === 'all' && !favoritesOnly && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Curated Learning & Everyday Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {featuredTools.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => openTool(t.id)}
                      className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-left transition-colors flex flex-col justify-between group shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
                          {renderToolIcon(t.icon)}
                        </div>
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline">
                          {t.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-2">
                        {t.shortSummary}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recently Used Strip (if any) */}
            {recentlyUsed.length > 0 && !searchQuery && selectedCategory === 'all' && !favoritesOnly && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recently Opened</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentlyUsed.map((id) => {
                    const tool = TOOLS.find((t) => t.id === id);
                    if (!tool) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => openTool(id)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2 transition-colors shadow-2xs"
                      >
                        {renderToolIcon(tool.icon)}
                        <span>{tool.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Main Tools Grid */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-4 font-medium">
                <span>
                  Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} in registry
                </span>
                {(searchQuery || selectedCategory !== 'all' || favoritesOnly) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setFavoritesOnly(false);
                    }}
                    className="text-neutral-700 dark:text-neutral-300 hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {filteredTools.length === 0 ? (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-12 text-center space-y-3">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    No matching tools found
                  </p>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    We couldn't find any tools matching "{searchQuery}". Try searching for another topic (e.g. "percentage", "speed", "words", "interest").
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setFavoritesOnly(false);
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity"
                  >
                    View All Tools
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      isFavorite={favorites.includes(tool.id)}
                      onToggleFavorite={toggleFavorite}
                      onOpen={openTool}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Accessible Footer with Links & Disclosures */}
      <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Full Multi-Column Website Sitemap */}
          <FooterSitemap
            onOpenTool={openTool}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveToolId(null);
              setActiveStaticPage(null);
              window.location.hash = cat === 'all' ? '' : `#/category/${cat}`;
            }}
            onOpenStaticPage={openStaticPage}
            onOpenSitemapModal={() => setIsSitemapModalOpen(true)}
          />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-500 pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                  LearnLab Tools
                </span>
                <span aria-hidden="true">·</span>
                <span>100% Client-Side</span>
                <span aria-hidden="true">·</span>
                <span>Zero Data Collection</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Free tools for everyday tasks, scientific problem-solving and smarter learning.
              </p>
            </div>

            {/* Informational Direct Links & Sitemap */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <button
                onClick={() => setIsSitemapModalOpen(true)}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer"
                title="View full website sitemap & XML spec"
              >
                <ListTree className="w-3.5 h-3.5 text-indigo-500" />
                <span>Sitemap</span>
              </button>
              <button
                onClick={() => openStaticPage('about')}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => openStaticPage('contact')}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => openStaticPage('privacy')}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openStaticPage('terms')}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Terms of Use
              </button>
              <button
                onClick={() => openStaticPage('accessibility')}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Accessibility
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Academic Lab Notebook & Printable Reports Modal */}
      <LabNotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
      />

      {/* Website Sitemap & XML Spec Modal */}
      <SitemapModal
        isOpen={isSitemapModalOpen}
        onClose={() => setIsSitemapModalOpen(false)}
        onOpenTool={openTool}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveToolId(null);
          setActiveStaticPage(null);
          window.location.hash = cat === 'all' ? '' : `#/category/${cat}`;
        }}
        onOpenStaticPage={openStaticPage}
      />
    </div>
  );
}
