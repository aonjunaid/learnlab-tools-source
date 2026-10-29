import React, { useState } from 'react';
import {
  X,
  FileCode2,
  ListTree,
  Copy,
  Check,
  Download,
  ExternalLink,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { getFooterSitemapGroups, getAllSitemapItems, generateXmlSitemap } from '../logic/sitemap';
import { getBaseUrl } from '../logic/seo';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTool: (toolId: string) => void;
  onSelectCategory: (cat: 'all' | 'everyday' | 'math' | 'science' | 'learning') => void;
  onOpenStaticPage: (pageId: 'about' | 'contact' | 'privacy' | 'terms' | 'accessibility') => void;
}

export function SitemapModal({
  isOpen,
  onClose,
  onOpenTool,
  onSelectCategory,
  onOpenStaticPage,
}: SitemapModalProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'xml'>('visual');
  const [copiedXml, setCopiedXml] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const baseUrl = getBaseUrl();
  const groups = getFooterSitemapGroups(baseUrl);
  const allItems = getAllSitemapItems(baseUrl);
  const xmlContent = generateXmlSitemap(baseUrl);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredGroups = groups.map((group) => {
    if (!searchQuery.trim()) return group;
    const q = searchQuery.toLowerCase().trim();
    const filteredItems = group.items.filter(
      (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    );
    return {
      ...group,
      items: filteredItems,
    };
  }).filter((g) => g.items.length > 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sitemap-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <ListTree className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sitemap-modal-title" className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                Website Sitemap & Crawler Index
              </h2>
              <p className="text-xs text-neutral-500">
                {allItems.length} indexable pages, tools, and categories mapped with Schema.org standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close sitemap modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Action Navigation */}
        <div className="px-6 py-3 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'visual'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>Interactive Sitemap ({allItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('xml')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'xml'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>sitemap.xml Spec</span>
            </button>
          </div>

          {activeTab === 'visual' ? (
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter sitemap items..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyXml}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors"
              >
                {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedXml ? 'Copied XML' : 'Copy XML'}</span>
              </button>
              <button
                onClick={handleDownloadXml}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .xml</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'visual' ? (
            <div className="space-y-6">
              {filteredGroups.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 text-xs">
                  No sitemap items matching &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                filteredGroups.map((group) => (
                  <div
                    key={group.id}
                    className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-950/30 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-200/60 dark:border-neutral-800 pb-2">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                          {group.title}
                        </h3>
                        <p className="text-[11px] text-neutral-500">{group.description}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {group.items.length} links
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            onClose();
                            if (item.isCategory) {
                              const cat = item.id.replace('category-', '') as any;
                              onSelectCategory(cat);
                            } else if (item.isStatic) {
                              onOpenStaticPage(item.id as any);
                            } else {
                              onOpenTool(item.id);
                            }
                          }}
                          className="p-2.5 rounded-lg border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 hover:border-indigo-400 dark:hover:border-indigo-600 text-left transition-colors flex flex-col justify-between group shadow-2xs"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {item.name}
                            </span>
                            {item.isNew && (
                              <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-neutral-500 line-clamp-1">
                            {item.description}
                          </p>
                          <span className="text-[9px] font-mono text-neutral-400 mt-1 flex items-center gap-1 group-hover:text-indigo-500">
                            <span>{item.path}</span>
                            <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1.5 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Valid XML 1.0 schema (Sitemaps.org 0.9 standard)</span>
                </span>
                <span className="font-mono text-[11px]">{xmlContent.length} bytes</span>
              </div>
              <pre className="p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-[460px] border border-neutral-800 selection:bg-indigo-600">
                <code>{xmlContent}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between text-xs text-neutral-500">
          <span>Search Engine Optimization & Indexing Architecture</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
