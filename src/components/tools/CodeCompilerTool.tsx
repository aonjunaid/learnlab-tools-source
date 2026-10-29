import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Download,
  Terminal,
  Cpu,
  FileCode2,
  Table as TableIcon,
  Globe,
  Layers,
  Code,
  Sliders,
  ShieldCheck,
  Zap,
  AlignLeft
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

import { SupportedLanguage, CompilationResult, CodeTemplate } from '../../logic/compiler/types';
import { LANGUAGE_CONFIGS } from '../../logic/compiler/templates';
import { compileAndRun } from '../../logic/compiler/executor';

// Primary languages highlighted in order per user request
const PRIMARY_LANGUAGES: SupportedLanguage[] = [
  'python',
  'javascript',
  'cpp',
  'c',
  'typescript',
  'rust',
  'sql',
  'html'
];

export function CodeCompilerTool() {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('python');
  const [codeMap, setCodeMap] = useState<Record<SupportedLanguage, string>>(() => {
    const initial: Record<string, string> = {};
    for (const [key, config] of Object.entries(LANGUAGE_CONFIGS)) {
      initial[key] = config.templates[0]?.code || '';
    }
    return initial as Record<SupportedLanguage, string>;
  });

  const [stdin, setStdin] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<CompilationResult | null>(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'terminal' | 'assembly' | 'diagnostics' | 'sql' | 'web' | 'inspector'>('terminal');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [fontSize, setFontSize] = useState<number>(14);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  const currentConfig = LANGUAGE_CONFIGS[selectedLang];
  const currentCode = codeMap[selectedLang] || '';

  // Switch language
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setSelectedLang(lang);
    setResult(null);
    if (lang === 'sql') {
      setActiveConsoleTab('sql');
    } else if (lang === 'html') {
      setActiveConsoleTab('web');
    } else {
      setActiveConsoleTab('terminal');
    }
  };

  // Select template
  const handleTemplateSelect = (template: CodeTemplate) => {
    setCodeMap((prev) => ({ ...prev, [selectedLang]: template.code }));
    if (template.stdin) setStdin(template.stdin);
    setResult(null);
  };

  // Handle code editing
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCodeMap((prev) => ({ ...prev, [selectedLang]: val }));
    updateCursorPos(e.target);
  };

  const updateCursorPos = (ta: HTMLTextAreaElement) => {
    const textBefore = ta.value.substring(0, ta.selectionStart);
    const lines = textBefore.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  // Sync scroll
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Keyboard shortcuts: Tab (2 spaces), Auto-close quotes/brackets, Ctrl/Cmd+Enter to run
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCompiler();
      return;
    }

    const ta = e.currentTarget;
    const { selectionStart, selectionEnd, value } = ta;

    if (e.key === 'Tab') {
      e.preventDefault();
      const insert = '  ';
      const updated = value.substring(0, selectionStart) + insert + value.substring(selectionEnd);
      setCodeMap((prev) => ({ ...prev, [selectedLang]: updated }));
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = selectionStart + insert.length;
        updateCursorPos(ta);
      }, 0);
      return;
    }

    const pairs: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'"
    };

    if (pairs[e.key] && selectionStart === selectionEnd) {
      const closeChar = pairs[e.key];
      e.preventDefault();
      const updated = value.substring(0, selectionStart) + e.key + closeChar + value.substring(selectionEnd);
      setCodeMap((prev) => ({ ...prev, [selectedLang]: updated }));
      setTimeout(() => {
        ta.selectionStart = ta.selectionEnd = selectionStart + 1;
        updateCursorPos(ta);
      }, 0);
      return;
    }
  };

  // 100% Client-side compilation and execution
  const runCompiler = async () => {
    setIsRunning(true);
    setResult(null);
    try {
      // Execute directly in browser engine
      const res = await compileAndRun(selectedLang, currentCode, stdin);
      setResult(res);
      if (selectedLang === 'sql' && res.sqlResult) {
        setActiveConsoleTab('sql');
      } else if (selectedLang === 'html') {
        setActiveConsoleTab('web');
      } else {
        setActiveConsoleTab('terminal');
      }
    } catch (err: any) {
      setResult({
        success: false,
        output: err?.message || 'Client-side execution encountered an error.',
        logs: [{ type: 'stderr', message: String(err), timestamp: Date.now() }],
        diagnostics: [{ line: 1, severity: 'error', message: String(err) }],
        executionTimeMs: 0,
        exitCode: 1
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Client-side code formatter (clean trailing spaces, normalize tabs)
  const formatCode = () => {
    const formatted = currentCode
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');
    setCodeMap((prev) => ({ ...prev, [selectedLang]: formatted }));
  };

  // Copy code
  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Copy terminal output
  const copyTerminalOutput = () => {
    if (!result) return;
    const text = result.logs.map((l) => l.message).join('\n') || result.output;
    navigator.clipboard.writeText(text);
    setCopiedOutput(true);
    setTimeout(() => setCopiedOutput(false), 2000);
  };

  // Download code
  const downloadFile = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentConfig.defaultFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to default template
  const resetToTemplate = () => {
    if (confirm(`Reset ${currentConfig.name} editor to the original starter template?`)) {
      handleTemplateSelect(currentConfig.templates[0]);
    }
  };

  // Syntax highlighting with Prism.js
  const highlightedCode = useMemo(() => {
    const langMap: Record<SupportedLanguage, string> = {
      python: 'python',
      javascript: 'javascript',
      typescript: 'typescript',
      c: 'c',
      cpp: 'cpp',
      rust: 'rust',
      sql: 'sql',
      html: 'markup',
    };
    const prismLang = langMap[selectedLang] || 'javascript';
    const grammar = Prism.languages[prismLang] || Prism.languages.javascript;
    try {
      return Prism.highlight(currentCode, grammar, prismLang);
    } catch {
      return currentCode;
    }
  }, [currentCode, selectedLang]);

  // Line count
  const lineCount = useMemo(() => {
    return Math.max(1, currentCode.split('\n').length);
  }, [currentCode]);

  // 100% Client-side static code metrics & complexity analyzer
  const codeMetrics = useMemo(() => {
    const lines = currentCode.split('\n');
    let loopDepth = 0;
    let maxLoopDepth = 0;
    let hasRecursion = false;
    let funcCount = 0;
    const funcNames: string[] = [];

    // Simple heuristic parser
    for (const l of lines) {
      const trimmed = l.trim();
      if (/^(for|while)\b/.test(trimmed)) {
        loopDepth++;
        if (loopDepth > maxLoopDepth) maxLoopDepth = loopDepth;
      }
      if (trimmed.endsWith('}') && loopDepth > 0) {
        loopDepth--;
      }
      // Detect functions
      const fnMatch = trimmed.match(/(?:function|def|void|int|double|auto)\s+([a-zA-Z0-9_$]+)\s*\(/);
      if (fnMatch && fnMatch[1] !== 'main' && fnMatch[1] !== 'if' && fnMatch[1] !== 'while') {
        funcCount++;
        funcNames.push(fnMatch[1]);
      }
    }

    // Check for self call in body
    for (const name of funcNames) {
      const re = new RegExp(`\\b${name}\\s*\\(`, 'g');
      const matches = (currentCode.match(re) || []).length;
      if (matches >= 2) {
        hasRecursion = true;
        break;
      }
    }

    let estimatedComplexity = 'O(1) Constant';
    if (maxLoopDepth === 1) {
      estimatedComplexity = 'O(n) Linear';
    } else if (maxLoopDepth === 2) {
      estimatedComplexity = 'O(n²) Quadratic';
    } else if (maxLoopDepth >= 3) {
      estimatedComplexity = `O(n^${maxLoopDepth}) Polynomial`;
    } else if (hasRecursion) {
      estimatedComplexity = 'O(log n) or O(2^n) Recursive';
    }

    return {
      lines: lines.length,
      characters: currentCode.length,
      functions: funcCount,
      maxNesting: maxLoopDepth,
      hasRecursion,
      estimatedComplexity
    };
  }, [currentCode]);

  return (
    <div className="space-y-4">
      {/* 1. Language Picker Strip & Header */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 sm:p-4 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Language selector buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
            {PRIMARY_LANGUAGES.map((lang) => {
              const conf = LANGUAGE_CONFIGS[lang];
              const isSelected = selectedLang === lang;
              const isFeatured = lang === 'python' || lang === 'javascript' || lang === 'cpp';
              return (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                      : isFeatured
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{conf.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">{conf.fileExtension}</span>
                </button>
              );
            })}
          </div>

          {/* Action buttons (Run, Templates, Client-side Badge) */}
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            {/* Algorithm template dropdown */}
            <div className="relative">
              <select
                onChange={(e) => {
                  const t = currentConfig.templates.find((tmpl) => tmpl.id === e.target.value);
                  if (t) handleTemplateSelect(t);
                }}
                className="px-2.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                aria-label="Select algorithm template"
              >
                {currentConfig.templates.map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.name} ({tmpl.difficulty})
                  </option>
                ))}
              </select>
            </div>

            {/* Run Button */}
            <button
              onClick={runCompiler}
              disabled={isRunning}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Compiling...' : 'Run Code'}</span>
              <kbd className="hidden sm:inline-block ml-1 px-1 py-0.2 text-[9px] bg-emerald-800/40 rounded font-mono">
                Ctrl+Enter
              </kbd>
            </button>
          </div>
        </div>

        {/* Quiet Meta Line (No Pill Enclosures) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800 pt-2.5">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {currentConfig.version}
          </span>
          <span aria-hidden="true">·</span>
          <span>{currentConfig.paradigm}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Client-Side Sandbox (Zero Server Uploads)
          </span>
        </div>
      </div>

      {/* 2. Main IDE Grid (Code Editor Left / Console Terminal Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch min-h-[580px]">
        {/* LEFT PANE: Respective Code Editor */}
        <div className="bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-xl flex flex-col overflow-hidden shadow-sm">
          {/* Editor Tab Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-neutral-950/80 border-b border-neutral-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-neutral-300 font-medium flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
                {currentConfig.defaultFilename}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Font size control */}
              <button
                onClick={() => setFontSize((s) => (s > 12 ? s - 1 : s))}
                className="p-1 text-neutral-400 hover:text-neutral-200 text-xs cursor-pointer"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize((s) => (s < 20 ? s + 1 : s))}
                className="p-1 text-neutral-400 hover:text-neutral-200 text-xs cursor-pointer"
                title="Increase font size"
              >
                A+
              </button>

              {/* Format / Prettify */}
              <button
                onClick={formatCode}
                className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded cursor-pointer"
                title="Format code / Clean indentation"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>

              {/* Stdin toggle */}
              <button
                onClick={() => setShowStdin(!showStdin)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                  showStdin
                    ? 'bg-neutral-800 text-sky-400 border-neutral-700'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200'
                }`}
                title="Toggle standard input (stdin) for programs that read inputs"
              >
                stdin {stdin.trim() ? '•' : ''}
              </button>

              {/* Copy source code */}
              <button
                onClick={copyCode}
                className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded cursor-pointer"
                title="Copy source code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              {/* Download file */}
              <button
                onClick={downloadFile}
                className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded cursor-pointer"
                title={`Download ${currentConfig.defaultFilename}`}
              >
                <Download className="w-3.5 h-3.5" />
              </button>

              {/* Reset to template */}
              <button
                onClick={resetToTemplate}
                className="p-1.5 text-neutral-400 hover:text-neutral-200 rounded cursor-pointer"
                title="Reset to starter template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stdin Drawer (collapsible) */}
          {showStdin && (
            <div className="p-2.5 bg-neutral-950 border-b border-neutral-800 space-y-1">
              <label className="text-[11px] text-neutral-400 font-mono flex items-center justify-between">
                <span>Standard Input (stdin)</span>
                <span className="text-neutral-500">Inputs read by input(), scanf(), or std::cin</span>
              </label>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Enter inputs separated by newlines..."
                rows={2}
                className="w-full bg-neutral-900 border border-neutral-800 rounded p-1.5 text-xs font-mono text-neutral-200 focus:outline-none focus:border-neutral-700"
              />
            </div>
          )}

          {/* Interactive Code Editor Container */}
          <div className="relative flex-1 flex overflow-hidden font-mono bg-neutral-950">
            {/* Line Number Gutter */}
            <div className="w-11 shrink-0 py-3 pr-2 text-right select-none text-neutral-600 border-r border-neutral-800/80 bg-neutral-950 text-xs">
              {Array.from({ length: lineCount }).map((_, idx) => (
                <div
                  key={idx}
                  className={`leading-5 ${
                    cursorPos.line === idx + 1 ? 'text-sky-400 font-bold' : ''
                  }`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Editor Canvas Area */}
            <div className="relative flex-1 h-full overflow-hidden">
              {/* Prism.js highlighted text presentation overlay */}
              <pre
                ref={preRef}
                aria-hidden="true"
                style={{ fontSize: `${fontSize}px` }}
                className="absolute inset-0 m-0 p-3 overflow-hidden pointer-events-none font-mono leading-5 whitespace-pre bg-transparent border-0"
              >
                <code
                  className={`language-${selectedLang}`}
                  dangerouslySetInnerHTML={{ __html: highlightedCode + '\n' }}
                />
              </pre>

              {/* Editable transparent input textarea */}
              <textarea
                ref={textareaRef}
                value={currentCode}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                onClick={(e) => updateCursorPos(e.currentTarget)}
                onKeyUp={(e) => updateCursorPos(e.currentTarget)}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                style={{ fontSize: `${fontSize}px` }}
                className="absolute inset-0 w-full h-full p-3 font-mono leading-5 text-transparent bg-transparent caret-sky-400 resize-none outline-none overflow-auto whitespace-pre selection:bg-neutral-800"
                aria-label={`Code editor for ${currentConfig.name}`}
              />
            </div>
          </div>

          {/* Editor Status Footer */}
          <div className="px-3 py-1.5 bg-neutral-950 border-t border-neutral-800 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>
                Ln {cursorPos.line}, Col {cursorPos.col}
              </span>
              <span aria-hidden="true">·</span>
              <span>{lineCount} lines</span>
              <span aria-hidden="true">·</span>
              <span>{currentCode.length} chars</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Spaces: 2</span>
              <span aria-hidden="true">·</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Console-Style Output Terminal */}
        <div className="bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl flex flex-col overflow-hidden shadow-sm">
          {/* Authentic Unix/macOS Terminal Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-neutral-900 border-b border-neutral-800 text-xs">
            {/* Terminal Window Control Dots & Shell Title */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-neutral-400 text-[11px]">
                sandbox@learnlab:~/{currentConfig.defaultFilename}
              </span>
            </div>

            {/* Terminal Tab Switchers & Clear */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveConsoleTab('terminal')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  activeConsoleTab === 'terminal'
                    ? 'bg-neutral-800 text-sky-400'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>Console</span>
              </button>

              {/* Assembly / Disassembly */}
              {(selectedLang === 'c' ||
                selectedLang === 'cpp' ||
                selectedLang === 'rust' ||
                selectedLang === 'typescript' ||
                selectedLang === 'python') && (
                <button
                  onClick={() => setActiveConsoleTab('assembly')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    activeConsoleTab === 'assembly'
                      ? 'bg-neutral-800 text-sky-400'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>
                    {selectedLang === 'typescript'
                      ? 'Transpiled JS'
                      : selectedLang === 'python'
                      ? 'Python AST'
                      : 'x86_64 ASM'}
                  </span>
                </button>
              )}

              {/* SQL Result Tab */}
              {selectedLang === 'sql' && (
                <button
                  onClick={() => setActiveConsoleTab('sql')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    activeConsoleTab === 'sql'
                      ? 'bg-neutral-800 text-sky-400'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <TableIcon className="w-3 h-3" />
                  <span>Table</span>
                </button>
              )}

              {/* Web Sandbox */}
              {selectedLang === 'html' && (
                <button
                  onClick={() => setActiveConsoleTab('web')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    activeConsoleTab === 'web'
                      ? 'bg-neutral-800 text-sky-400'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Globe className="w-3 h-3" />
                  <span>Render</span>
                </button>
              )}

              {/* Client-Side Complexity Inspector */}
              <button
                onClick={() => setActiveConsoleTab('inspector')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  activeConsoleTab === 'inspector'
                    ? 'bg-neutral-800 text-sky-400'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Client-side static complexity metrics"
              >
                <Sliders className="w-3 h-3" />
                <span>Metrics</span>
              </button>

              {/* Copy Terminal Output */}
              {result && (
                <button
                  onClick={copyTerminalOutput}
                  className="p-1 text-neutral-400 hover:text-neutral-200 rounded cursor-pointer"
                  title="Copy terminal output"
                >
                  {copiedOutput ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              )}

              {/* Clear Terminal */}
              {result && (
                <button
                  onClick={() => setResult(null)}
                  className="px-1.5 py-0.5 text-[11px] text-neutral-400 hover:text-neutral-200 cursor-pointer"
                  title="Clear terminal output"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Terminal Console Content Body */}
          <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-neutral-950 text-neutral-200 min-h-[300px]">
            {/* View A: Terminal Execution Console */}
            {activeConsoleTab === 'terminal' && (
              <div className="space-y-3">
                {/* Simulated bash command prompt line */}
                <div className="flex items-center gap-2 text-neutral-500 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span>
                    {selectedLang === 'python'
                      ? `python3 ${currentConfig.defaultFilename}`
                      : selectedLang === 'cpp'
                      ? `g++ -O2 -std=c++20 ${currentConfig.defaultFilename} -o main && ./main`
                      : selectedLang === 'c'
                      ? `gcc -O2 -std=c11 ${currentConfig.defaultFilename} -o program && ./program`
                      : selectedLang === 'typescript'
                      ? `tsc ${currentConfig.defaultFilename} && node main.js`
                      : selectedLang === 'rust'
                      ? `rustc ${currentConfig.defaultFilename} -o main && ./main`
                      : selectedLang === 'sql'
                      ? `psql -f ${currentConfig.defaultFilename}`
                      : `node ${currentConfig.defaultFilename}`}
                  </span>
                </div>

                {!result && !isRunning && (
                  <div className="text-neutral-500 italic py-6 text-center">
                    Ready. Press <span className="text-neutral-300 font-semibold">"Run Code"</span> (or Ctrl+Enter) to execute {currentConfig.name} client-side.
                  </div>
                )}

                {isRunning && (
                  <div className="flex items-center gap-2 text-sky-400 py-4">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                    <span>Compiling and executing in client-side sandbox...</span>
                  </div>
                )}

                {result && (
                  <>
                    {/* Execution output logs */}
                    {result.logs.length > 0 ? (
                      <div className="space-y-1">
                        {result.logs.map((log, i) => (
                          <div
                            key={i}
                            className={`whitespace-pre-wrap leading-relaxed ${
                              log.type === 'stderr'
                                ? 'text-rose-400'
                                : log.type === 'warn'
                                ? 'text-amber-300'
                                : log.type === 'info'
                                ? 'text-sky-300'
                                : 'text-neutral-100'
                            }`}
                          >
                            {log.message}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-neutral-400 italic">Program finished with zero output.</div>
                    )}

                    {/* Exit code banner */}
                    <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-500 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            result.success ? 'bg-emerald-400' : 'bg-rose-500'
                          }`}
                        />
                        <span>
                          {result.success
                            ? 'Process exited with code 0 (0x0)'
                            : `Process terminated with code ${result.exitCode}`}
                        </span>
                      </span>
                      <span>Execution: {result.executionTimeMs} ms</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* View B: Assembly / Transpiled View */}
            {activeConsoleTab === 'assembly' && (
              <div className="space-y-2">
                <div className="text-[11px] text-neutral-400 pb-2 border-b border-neutral-800">
                  {selectedLang === 'typescript'
                    ? 'Transpiled clean ECMAScript code (all type declarations and interfaces stripped):'
                    : selectedLang === 'python'
                    ? 'Python Abstract Syntax Tree (AST) structure:'
                    : 'Target Architecture: x86-64 GNU/Linux Assembly (AT&T syntax):'}
                </div>
                <pre className="text-neutral-300 whitespace-pre font-mono leading-relaxed overflow-x-auto">
                  {selectedLang === 'typescript'
                    ? result?.transpiledCode || 'Click Run Code to compile TypeScript to JavaScript.'
                    : result?.assemblyCode || 'Click Run Code to emit x86-64 assembly.'}
                </pre>
              </div>
            )}

            {/* View C: SQL Table Grid View */}
            {activeConsoleTab === 'sql' && (
              <div className="space-y-4">
                {result?.sqlResult ? (
                  <>
                    <div className="overflow-x-auto border border-neutral-800 rounded-lg">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-900 border-b border-neutral-800 text-sky-400">
                            {result.sqlResult.columns.map((col, idx) => (
                              <th key={idx} className="p-2 font-semibold font-mono">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50">
                          {result.sqlResult.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-neutral-900/50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 text-neutral-200">
                                  {String(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Query Execution Plan */}
                    {result.sqlResult.plan && (
                      <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg space-y-1">
                        <span className="text-[11px] font-bold text-neutral-400">EXPLAIN ANALYZE Plan:</span>
                        <pre className="text-[11px] text-neutral-300 whitespace-pre overflow-x-auto">
                          {result.sqlResult.plan.join('\n')}
                        </pre>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-neutral-500 italic py-6 text-center">
                    Execute the SQL query to view relational table results.
                  </div>
                )}
              </div>
            )}

            {/* View D: Live Web Sandbox (HTML/CSS/JS) */}
            {activeConsoleTab === 'web' && (
              <div className="h-full min-h-[350px] bg-white rounded-lg overflow-hidden border border-neutral-800">
                <iframe
                  title="Web Sandbox Live Render"
                  srcDoc={currentCode}
                  sandbox="allow-scripts allow-modals"
                  className="w-full h-full min-h-[350px] border-none"
                />
              </div>
            )}

            {/* View E: Static Code Metrics & Complexity Inspector (100% Client-Side) */}
            {activeConsoleTab === 'inspector' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="text-neutral-400 pb-2 border-b border-neutral-800 font-mono text-[11px]">
                  Client-side static code analysis:
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500 block text-[11px]">Estimated Big-O</span>
                    <span className="text-sky-400 font-mono font-bold text-sm">
                      {codeMetrics.estimatedComplexity}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500 block text-[11px]">Loop Nesting Depth</span>
                    <span className="text-neutral-200 font-mono font-bold text-sm">
                      {codeMetrics.maxNesting} {codeMetrics.maxNesting === 1 ? 'level' : 'levels'}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500 block text-[11px]">Recursion Pattern</span>
                    <span className="text-neutral-200 font-mono font-bold text-sm">
                      {codeMetrics.hasRecursion ? 'Detected' : 'None'}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500 block text-[11px]">Functions Defined</span>
                    <span className="text-neutral-200 font-mono font-bold text-sm">
                      {codeMetrics.functions}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500 block text-[11px]">Lines of Code</span>
                    <span className="text-neutral-200 font-mono font-bold text-sm">
                      {codeMetrics.lines}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <span className="text-neutral-500 block text-[11px]">Total Characters</span>
                    <span className="text-neutral-200 font-mono font-bold text-sm">
                      {codeMetrics.characters}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 space-y-1 text-[11px]">
                  <span className="font-bold text-neutral-300">Privacy & Execution Guarantee:</span>
                  <p>
                    All compilation, AST parsing, x86-64 assembly generation, and code evaluation execute 100% locally in your browser sandbox. No source code or execution logs are ever transmitted to external servers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
