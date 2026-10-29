import React from 'react';
import { ShieldCheck, Cpu, BookOpen, HeartHandshake } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          About LearnLab Tools
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          LearnLab Tools is a free, privacy-first platform providing high-precision calculators, scientific problem-solving utilities, and child-friendly learning modules.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            100% Client-Side Architecture
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            All mathematics, text analytics, image conversions, and quizzes execute locally inside your web browser. No calculation payloads or images are transmitted to external servers.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Zero Tracking & No Child Profiles
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We require no signups, passwords, or personal data collection. Children and learners can explore freely without targeted ads or behavioral profiling.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Transparent Science & Formulas
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Every scientific tool displays its governing formula, variable substitutions, step-by-step math, and underlying physical assumptions.
          </p>
        </div>

        <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <HeartHandshake className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            Accessible & Respectful
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Constructed with high-contrast typography, strict keyboard navigation, screen-reader semantics, and reduced-motion support.
          </p>
        </div>
      </div>
    </div>
  );
}
