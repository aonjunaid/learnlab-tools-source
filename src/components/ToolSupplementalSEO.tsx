import React, { useState } from 'react';
import {
  HelpCircle,
  ListOrdered,
  ChevronDown,
  ChevronUp,
  Share2,
  Code,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Check,
  Link2,
} from 'lucide-react';
import { ToolItem } from '../types';
import { TOOLS } from '../data/tools';
import { getToolHowToSteps, getToolFAQs, getToolRelatedIds } from '../logic/tool-seo-content';
import { EmbedWidgetModal } from './EmbedWidgetModal';

interface ToolSupplementalSEOProps {
  tool: ToolItem;
  onOpenTool: (toolId: string) => void;
}

export function ToolSupplementalSEO({ tool, onOpenTool }: ToolSupplementalSEOProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const steps = getToolHowToSteps(tool);
  const faqs = getToolFAQs(tool);
  const relatedIds = getToolRelatedIds(tool.id);
  const relatedTools = TOOLS.filter((t) => relatedIds.includes(t.id)).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      aria-label="Supplemental SEO Guide and FAQs"
      className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-10 text-neutral-800 dark:text-neutral-200"
    >
      {/* 1. Step-by-Step "How to Use" Guide (Blueprint On-Page Rule 1) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>How to Use {tool.name} Online (Step-by-Step)</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Follow these simple steps to calculate and derive your results with zero hassle.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowEmbedModal(true)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Embed this interactive tool on your website or blog"
            >
              <Code className="w-3.5 h-3.5 text-indigo-500" />
              <span>Embed Widget</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Link2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Numbered Steps Grid */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 list-none">
          {steps.map((step, idx) => (
            <li
              key={idx}
              className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between space-y-2.5 shadow-2xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">Step {idx + 1}</span>
                </div>
                <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-100">{step.name}</h3>
                <p className="text-[11px] text-neutral-500 leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 2. Structured FAQ Section (H2 and H3 tags, Blueprint On-Page Rule 1) */}
      <div className="space-y-4">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Frequently Asked Questions (FAQ)</span>
          </h2>
          <p className="text-xs text-neutral-500">
            Answers to common questions about {tool.name}, formulas, accuracy, and browser support.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-100 pr-4">
                    {faq.question}
                  </h3>
                  <span className="text-neutral-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-neutral-100 dark:border-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Related Next Steps & Contextual Recommendations (Blueprint UX Rule 4) */}
      {relatedTools.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Next Steps & Related Free Tools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedTools.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onOpenTool(rel.id)}
                className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-left transition-colors flex flex-col justify-between group shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {rel.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2">{rel.shortSummary}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Embed Modal */}
      <EmbedWidgetModal
        tool={tool}
        isOpen={showEmbedModal}
        onClose={() => setShowEmbedModal(false)}
      />
    </section>
  );
}
