import React, { useState } from 'react';
import { X, Code, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { ToolItem } from '../types';
import { generateEmbedSnippet } from '../logic/tool-seo-content';
import { getBaseUrl } from '../logic/seo';

interface EmbedWidgetModalProps {
  tool: ToolItem;
  isOpen: boolean;
  onClose: () => void;
}

export function EmbedWidgetModal({ tool, isOpen, onClose }: EmbedWidgetModalProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = getBaseUrl();
  const snippet = generateEmbedSnippet(tool.id, tool.name, baseUrl);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 w-full max-w-xl flex flex-col shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Embed {tool.name} Widget
              </h3>
              <p className="text-[11px] text-neutral-500">
                Add this interactive calculator or tool directly to your website or blog
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Responsive, iframe-safe, zero ads, zero external trackers, and 100% free.</span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
              HTML Embed Code
            </label>
            <div className="relative">
              <textarea
                readOnly
                rows={6}
                value={snippet}
                className="w-full p-3 font-mono text-[11px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 select-all leading-relaxed focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-neutral-500">
              Embed includes clean, compliant backlink attribution.
            </span>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Code!' : 'Copy Embed HTML'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
