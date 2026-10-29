import React from 'react';
import {
  Calculator,
  Wrench,
  Atom,
  GraduationCap,
  FileCode2,
  ListTree,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { ToolCategory, StaticPageId } from '../types';
import { getFooterSitemapGroups } from '../logic/sitemap';
import { getBaseUrl } from '../logic/seo';

interface FooterSitemapProps {
  onOpenTool: (toolId: string) => void;
  onSelectCategory: (category: ToolCategory) => void;
  onOpenStaticPage: (pageId: StaticPageId) => void;
  onOpenSitemapModal: () => void;
}

export function FooterSitemap({
  onOpenTool,
  onSelectCategory,
  onOpenStaticPage,
  onOpenSitemapModal,
}: FooterSitemapProps) {
  const baseUrl = getBaseUrl();
  const groups = getFooterSitemapGroups(baseUrl);

  const getGroupIcon = (groupId: string) => {
    switch (groupId) {
      case 'math':
        return <Calculator className="w-3.5 h-3.5 text-indigo-500" />;
      case 'everyday':
        return <Wrench className="w-3.5 h-3.5 text-blue-500" />;
      case 'science':
        return <Atom className="w-3.5 h-3.5 text-emerald-500" />;
      case 'learning':
        return <GraduationCap className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <ListTree className="w-3.5 h-3.5 text-purple-500" />;
    }
  };

  return (
    <div id="footer-sitemap" className="pt-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ListTree className="w-4 h-4 text-neutral-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Complete Website Sitemap & Tool Index
            </h2>
          </div>
          <p className="text-xs text-neutral-500">
            Direct index to all 18+ client-side tools, STEM visualizers, and educational guides.
          </p>
        </div>

        <button
          onClick={onOpenSitemapModal}
          className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Open interactive sitemap and XML export"
        >
          <FileCode2 className="w-3.5 h-3.5 text-indigo-500" />
          <span>Interactive Sitemap & XML Spec</span>
        </button>
      </div>

      <nav aria-label="Footer Website Sitemap" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 text-xs">
        {groups.map((group) => (
          <div key={group.id} className="space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100 pb-1 border-b border-neutral-200/60 dark:border-neutral-800">
              {getGroupIcon(group.id)}
              <span className="truncate">{group.title}</span>
            </div>

            <ul className="space-y-1.5 list-none m-0 p-0">
              {group.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isCategory) {
                        const cat = item.id.replace('category-', '') as ToolCategory;
                        onSelectCategory(cat);
                      } else if (item.isStatic) {
                        onOpenStaticPage(item.id as StaticPageId);
                      } else {
                        onOpenTool(item.id);
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors block truncate py-0.5"
                    title={item.description}
                  >
                    <span>{item.name}</span>
                    {item.isNew && (
                      <span className="ml-1.5 text-[9px] font-bold px-1 py-0.2 rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                        NEW
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
