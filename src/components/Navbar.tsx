import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Monitor, BookOpen, Check } from 'lucide-react';
import { ToolCategory, ThemeMode } from '../types';

interface NavbarProps {
  activeCategory: ToolCategory;
  onSelectCategory: (cat: ToolCategory) => void;
  onOpenSearch: () => void;
  onGoHome: () => void;
  themeMode?: ThemeMode;
  resolvedTheme?: 'light' | 'dark';
  onChangeThemeMode?: (mode: ThemeMode) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenNotebook?: () => void;
}

export function Navbar({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onGoHome,
  themeMode = 'system',
  resolvedTheme = 'light',
  onChangeThemeMode,
  theme,
  onToggleTheme,
  onOpenNotebook,
}: NavbarProps) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const effectiveMode: ThemeMode = themeMode || (theme === 'dark' ? 'dark' : 'light');
  const activeResolved = resolvedTheme || theme || 'light';

  const selectMode = (mode: ThemeMode) => {
    if (onChangeThemeMode) {
      onChangeThemeMode(mode);
    } else if (onToggleTheme) {
      onToggleTheme();
    }
    setIsThemeMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={onGoHome}
          className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50 whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          LearnLab Tools
        </button>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
              activeCategory === 'all' ? 'text-neutral-900 dark:text-neutral-50 font-semibold' : ''
            }`}
          >
            All Tools
          </button>
          <button
            onClick={() => onSelectCategory('everyday')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
              activeCategory === 'everyday' ? 'text-neutral-900 dark:text-neutral-50 font-semibold' : ''
            }`}
          >
            Everyday
          </button>
          <button
            onClick={() => onSelectCategory('math')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
              activeCategory === 'math' ? 'text-neutral-900 dark:text-neutral-50 font-semibold' : ''
            }`}
          >
            Math & Conversion
          </button>
          <button
            onClick={() => onSelectCategory('science')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 ${
              activeCategory === 'science' ? 'text-neutral-900 dark:text-neutral-50 font-semibold' : ''
            }`}
          >
            Science & Physics
          </button>
          <button
            onClick={() => onSelectCategory('learning')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 ${
              activeCategory === 'learning' ? 'text-neutral-900 dark:text-neutral-50 font-semibold' : ''
            }`}
          >
            <span>Learning Lab</span>
          </button>
        </nav>

        {/* Zone 3: Actions & Theme Selection */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenNotebook && (
            <button
              onClick={onOpenNotebook}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Notebook</span>
            </button>
          )}

          {/* Direct 1-Click Dark Mode Toggle */}
          <button
            onClick={() => {
              const nextMode: ThemeMode = activeResolved === 'dark' ? 'light' : 'dark';
              selectMode(nextMode);
            }}
            aria-label="Toggle dark mode"
            title={`Switch to ${activeResolved === 'dark' ? 'Light' : 'Dark'} mode`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100/80 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors text-xs font-semibold cursor-pointer"
          >
            {activeResolved === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px]">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[11px]">Dark</span>
              </>
            )}
          </button>

          {/* Theme Preference Settings (Auto / Options) */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setIsThemeMenuOpen((prev) => !prev)}
              aria-label={`Theme setting: ${effectiveMode === 'system' ? 'Auto (System sync)' : effectiveMode}. Click to change.`}
              title={`Theme: ${effectiveMode === 'system' ? `Auto (OS sync: ${activeResolved})` : effectiveMode}`}
              className="flex items-center gap-1 p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative cursor-pointer"
            >
              <Monitor className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </button>

            {/* Dropdown Menu */}
            {isThemeMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800">
                  Theme Preference
                </div>

                {/* Auto / System */}
                <button
                  onClick={() => selectMode('system')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                    effectiveMode === 'system' ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <div>
                      <div className="font-semibold">Auto (System Sync)</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        Follows OS ({activeResolved === 'dark' ? 'Dark' : 'Light'})
                      </div>
                    </div>
                  </div>
                  {effectiveMode === 'system' && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />}
                </button>

                {/* Light */}
                <button
                  onClick={() => selectMode('light')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                    effectiveMode === 'light' ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <div>
                      <div className="font-semibold">Light Mode</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Always high-contrast light</div>
                    </div>
                  </div>
                  {effectiveMode === 'light' && <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </button>

                {/* Dark */}
                <button
                  onClick={() => selectMode('dark')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                    effectiveMode === 'dark' ? 'text-indigo-600 dark:text-indigo-400 font-medium' : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="font-semibold">Dark Mode</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400">Always night-friendly dark</div>
                    </div>
                  </div>
                  {effectiveMode === 'dark' && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-400 font-mono">
              /
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}

