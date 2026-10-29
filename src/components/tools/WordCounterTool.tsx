import React, { useState, useMemo } from 'react';
import { Copy, Check, Trash2, FileText, Sparkles, RefreshCw } from 'lucide-react';

const COMMON_STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t',
  'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during',
  'each',
  'few', 'for', 'from', 'further',
  'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s',
  'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself',
  'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself',
  'no', 'nor', 'not',
  'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such',
  'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up',
  'very',
  'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t',
  'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
]);

const SAMPLE_TEXT = `Everyday Tools brings clarity, efficiency, and delight to your daily web workflows. Whether calculating formulas, translating units of measurement, refining written prose, formatting structured payloads, generating high-contrast palettes, auditing passwords, or creating printable codes, simplicity and speed remain at the heart of every interaction. Good software should be instantly accessible, respectful of your time, and run completely client-side without unnecessary friction.`;

export function WordCounterTool() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [excludeStopWords, setExcludeStopWords] = useState(true);
  const [copied, setCopied] = useState(false);

  // Compute metrics
  const stats = useMemo(() => {
    const raw = text;
    const trimmed = raw.trim();

    // Characters
    const totalChars = raw.length;
    const charsNoSpaces = raw.replace(/\s+/g, '').length;

    // Words
    const wordList = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const wordCount = wordList.length;

    // Sentences
    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      : [];
    const sentenceCount = sentences.length;

    // Paragraphs
    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0)
      : [];
    const paragraphCount = paragraphs.length;

    // Reading & Speaking Time
    // Reading: 225 wpm, Speaking: 130 wpm
    const readingMinutes = wordCount / 225;
    const speakingMinutes = wordCount / 130;

    const formatTime = (minutes: number) => {
      if (wordCount === 0) return '0 sec';
      const totalSeconds = Math.round(minutes * 60);
      const m = Math.floor(totalSeconds / 60);
      const s = totalSeconds % 60;
      if (m === 0) return `${s}s`;
      return s > 0 ? `${m}m ${s}s` : `${m}m`;
    };

    // Average word length
    const avgWordLength =
      wordCount > 0
        ? (wordList.reduce((acc, w) => acc + w.replace(/[^\w]/g, '').length, 0) / wordCount).toFixed(1)
        : '0';

    return {
      wordCount,
      totalChars,
      charsNoSpaces,
      sentenceCount,
      paragraphCount,
      readingTime: formatTime(readingMinutes),
      speakingTime: formatTime(speakingMinutes),
      avgWordLength,
    };
  }, [text]);

  // Keyword density
  const keywordFrequencies = useMemo(() => {
    if (!text.trim()) return [];

    const words = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 1);

    const freqMap: Record<string, number> = {};
    for (const w of words) {
      if (excludeStopWords && COMMON_STOP_WORDS.has(w)) {
        continue;
      }
      freqMap[w] = (freqMap[w] || 0) + 1;
    }

    const totalFiltered = Object.values(freqMap).reduce((a, b) => a + b, 0);

    const sorted = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({
        word,
        count,
        percentage: totalFiltered > 0 ? ((count / totalFiltered) * 100).toFixed(1) : '0',
      }));

    return sorted;
  }, [text, excludeStopWords]);

  // Text Transformations
  const transformCase = (type: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake') => {
    if (!text) return;
    let result = text;
    if (type === 'upper') {
      result = text.toUpperCase();
    } else if (type === 'lower') {
      result = text.toLowerCase();
    } else if (type === 'title') {
      result = text.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()
      );
    } else if (type === 'sentence') {
      result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    } else if (type === 'camel') {
      result = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    } else if (type === 'snake') {
      result = text
        .trim()
        .toLowerCase()
        .replace(/[\s\W-]+/g, '_');
    }
    setText(result);
  };

  const cleanExtraSpaces = () => {
    const cleaned = text
      .split('\n')
      .map((line) => line.replace(/\s+/g, ' ').trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    setText(cleaned);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Metric Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Words</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
            {stats.wordCount.toLocaleString()}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Characters</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
            {stats.totalChars.toLocaleString()}
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5 tabular-nums">
            {stats.charsNoSpaces.toLocaleString()} no spaces
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Sentences</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
            {stats.sentenceCount}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Paragraphs</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
            {stats.paragraphCount}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Reading Time</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
            {stats.readingTime}
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">~225 wpm</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Speaking Time</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
            {stats.speakingTime}
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">~130 wpm</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xs col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="text-[11px] font-medium text-neutral-500">Avg Word Length</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
            {stats.avgWordLength}
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">letters/word</div>
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-4">
        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-neutral-400 text-[11px] mr-1">Case:</span>
            <button
              onClick={() => transformCase('upper')}
              className="px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => transformCase('lower')}
              className="px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              lowercase
            </button>
            <button
              onClick={() => transformCase('title')}
              className="px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              Title Case
            </button>
            <button
              onClick={() => transformCase('sentence')}
              className="px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              Sentence case
            </button>
            <button
              onClick={cleanExtraSpaces}
              className="px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
              title="Remove duplicate spaces and redundant line breaks"
            >
              Clean Spaces
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setText(SAMPLE_TEXT)}
              className="px-2.5 py-1 text-xs rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sample
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1 text-xs font-medium rounded-md bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
            {text.length > 0 && (
              <button
                onClick={() => setText('')}
                className="p-1.5 text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 rounded transition-colors"
                title="Clear text"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to begin analyzing word counts, character frequencies, and readability..."
            rows={10}
            className="w-full p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 resize-y leading-relaxed font-sans"
            aria-label="Text to count and analyze"
          />
        </div>
      </div>

      {/* Keyword Frequency Analysis */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Top Keywords & Density
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Most frequently occurring terms in your text
            </p>
          </div>
          <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={excludeStopWords}
              onChange={(e) => setExcludeStopWords(e.target.checked)}
              className="rounded border-neutral-300 dark:border-neutral-700 text-neutral-900 focus:ring-neutral-900"
            />
            <span>Filter common stop words</span>
          </label>
        </div>

        {keywordFrequencies.length === 0 ? (
          <p className="text-xs text-neutral-400 py-4 text-center">
            Enter more text to view keyword density distribution.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {keywordFrequencies.map((item) => (
              <div
                key={item.word}
                className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                    {item.word}
                  </span>
                  <span className="font-mono text-neutral-400 text-[11px] tabular-nums">
                    {item.count}×
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Density</span>
                  <span className="font-mono tabular-nums">{item.percentage}%</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-neutral-900 dark:bg-neutral-100 h-full rounded-full"
                    style={{ width: `${Math.min(100, parseFloat(item.percentage) * 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
