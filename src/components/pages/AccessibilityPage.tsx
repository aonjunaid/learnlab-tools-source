import React from 'react';
import { Eye, Keyboard, Sparkles, CheckCircle2 } from 'lucide-react';

export function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Accessibility Statement
        </h1>
        <p className="text-xs text-neutral-500">
          LearnLab Tools is designed to be accessible, usable, and welcoming to learners of all abilities.
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            1. Standards & Guidelines Target
          </h2>
          <p>
            We target compliance with the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 at the AA level across all interactive calculators and tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            2. Core Accessibility Features Implemented
          </h2>
          <ul className="space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">· Full Keyboard Navigability:</span>
              <span>Every interactive button, slider, formula input, and tab is reachable via Tab and Shift+Tab with a prominent visible focus ring (<code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">focus:ring-2</code>).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">· Readable Typography & Tabular Numerals:</span>
              <span>All numbers, financial ledgers, and calculation results use <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">tabular-nums</code> to prevent layout jitter and align decimal points vertically.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">· High Contrast & Optical Comfort:</span>
              <span>Text meets or exceeds WCAG AA contrast ratios (4.5:1 for body copy and 3:1 for large text) across both clean light and high-legibility dark modes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">· Accessible Form Controls & Screen Readers:</span>
              <span>Form controls are explicitly associated with text labels and ARIA live regions (<code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">aria-live="polite"</code>) for dynamic updates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-neutral-800 dark:text-neutral-200">· Reduced Motion Support:</span>
              <span>Respects system preferences for <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">prefers-reduced-motion</code> to prevent motion-induced vertigo.</span>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Eye className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            3. Reporting Accessibility Barriers
          </h2>
          <p>
            If you encounter an accessibility barrier on any tool or learning activity, please let us know through our Contact & Feedback page so we can prioritize an ergonomic fix.
          </p>
        </section>
      </div>
    </div>
  );
}
