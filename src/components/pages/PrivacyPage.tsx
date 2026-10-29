import React from 'react';
import { Shield, EyeOff, Lock, Database } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500">
          Last updated: October 2026 · Transparent client-side privacy commitments
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-6 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            1. Browser-Side Execution Principle
          </h2>
          <p>
            LearnLab Tools is designed around a zero-server data processing architecture. When you calculate percentages, run scientific kinematics formulas, analyze words, format JSON, resize images, or complete learning activities, all calculations and file manipulations occur entirely within your device's browser memory (via Web APIs and JavaScript).
          </p>
          <p>
            Your inputs, documents, photos, text, and numerical values are never uploaded to any central server or external database.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            2. Children's Privacy Commitment
          </h2>
          <p>
            We do not collect personal identifiers from children or learners. There are no registration forms, no required accounts, and no student profiling. Learning Lab practice modules provide immediate in-browser feedback and do not track or report children's scores to third parties or advertising networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Database className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            3. Local Device Storage
          </h2>
          <p>
            To enhance your user experience, the app may store minimal preferences (such as light/dark theme choice, starred favorite tool IDs, and practice star count) inside your browser's standard <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">localStorage</code>. You can clear this data at any time via the "Reset" buttons in the app or through your browser settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            4. No Tracking Cookies or Third-Party Ad Networks
          </h2>
          <p>
            LearnLab Tools contains no intrusive pop-ups, third-party behavioral trackers, or external advertising scripts.
          </p>
        </section>
      </div>
    </div>
  );
}
