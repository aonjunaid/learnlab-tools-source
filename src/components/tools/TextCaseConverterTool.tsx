import React, { useState } from 'react';
import { Copy, Check, Trash2, RefreshCw } from 'lucide-react';
import { convertTextCase, TextCaseStyle, analyzeText } from '../../logic/textAnalysis';

const SAMPLE_TEXT = `LearnLab Tools provides reliable calculations, scientific problem-solving, and child-friendly educational exploration. All processing runs completely browser-side.`;

export function TextCaseConverterTool() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [copied, setCopied] = useState(false);

  const stats = analyzeText(text);

  const applyStyle = (style: TextCaseStyle) => {
    setText((prev) => convertTextCase(prev, style));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm space-y-4">
        {/* Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => applyStyle('upper')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              UPPERCASE
            </button>
            <button
              onClick={() => applyStyle('lower')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              lowercase
            </button>
            <button
              onClick={() => applyStyle('title')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              Title Case
            </button>
            <button
              onClick={() => applyStyle('sentence')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              Sentence case
            </button>
            <button
              onClick={() => applyStyle('alternating')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              aLtErNaTiNg
            </button>
            <button
              onClick={() => applyStyle('camel')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              camelCase
            </button>
            <button
              onClick={() => applyStyle('snake')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              snake_case
            </button>
            <button
              onClick={() => applyStyle('kebab')}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              kebab-case
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setText(SAMPLE_TEXT)}
              className="px-2.5 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sample
            </button>
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 flex items-center gap-1.5 transition-opacity shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            {text.length > 0 && (
              <button
                onClick={() => setText('')}
                className="p-1.5 text-neutral-400 hover:text-rose-600 rounded transition-colors"
                title="Clear text"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to convert case..."
          rows={8}
          className="w-full p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 leading-relaxed font-sans"
        />

        {/* Quick status bar */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 font-mono tabular-nums">
          <span>Words: {stats.words}</span>
          <span>·</span>
          <span>Characters: {stats.charsTotal}</span>
          <span>·</span>
          <span>Lines: {stats.lines}</span>
        </div>
      </div>
    </div>
  );
}
