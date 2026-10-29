import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, Keyboard } from 'lucide-react';
import { ToolItem } from '../types';

interface ToolGuidanceProps {
  tool: ToolItem;
}

export function ToolGuidance({ tool }: ToolGuidanceProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-neutral-500" />
          <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            How to Use & Practical Tips
          </span>
        </div>
        <span className="text-neutral-400 p-1">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-neutral-100 dark:border-neutral-800 text-xs space-y-4">
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {tool.guidance.overview}
          </p>

          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              Key Recommendations
            </h4>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              {tool.guidance.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-400 select-none">·</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {tool.guidance.shortcuts && tool.guidance.shortcuts.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                <Keyboard className="w-3.5 h-3.5 text-neutral-500" />
                <span>Keyboard Shortcuts</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.guidance.shortcuts.map((sc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 text-[11px]"
                  >
                    <span className="text-neutral-600 dark:text-neutral-400">{sc.action}</span>
                    <kbd className="px-2 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono font-medium text-neutral-900 dark:text-neutral-100 shadow-2xs">
                      {sc.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
