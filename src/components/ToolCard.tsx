import React from 'react';
import {
  Calculator,
  ArrowRightLeft,
  FileText,
  Code2,
  Palette,
  QrCode,
  Star,
  ArrowUpRight,
  Percent,
  Calendar,
  Type,
  TrendingUp,
  GraduationCap,
  Atom,
  Sparkles,
  Image as ImageIcon,
  Mic,
  Dna,
  FlaskConical,
  Activity,
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolCardProps {
  tool: ToolItem;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, toolId: string) => void;
  onOpen: (toolId: string) => void;
}

export function ToolCard({
  tool,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: ToolCardProps) {
  const renderIcon = () => {
    const props = { className: 'w-5 h-5 text-neutral-900 dark:text-neutral-100' };
    switch (tool.icon) {
      case 'Percent':
        return <Percent {...props} />;
      case 'Calendar':
        return <Calendar {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'Type':
        return <Type {...props} />;
      case 'ArrowRightLeft':
        return <ArrowRightLeft {...props} />;
      case 'TrendingUp':
        return <TrendingUp {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'Atom':
        return <Atom {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} className="w-5 h-5 text-amber-500" />;
      case 'Code2':
        return <Code2 {...props} />;
      case 'Image':
        return <ImageIcon {...props} />;
      case 'QrCode':
        return <QrCode {...props} />;
      case 'Calculator':
        return <Calculator {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'Mic':
        return <Mic {...props} />;
      case 'Dna':
        return <Dna {...props} />;
      case 'FlaskConical':
        return <FlaskConical {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      default:
        return <Calculator {...props} />;
    }
  };

  return (
    <div
      onClick={() => onOpen(tool.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(tool.id);
        }
      }}
      className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 shadow-xs hover:shadow-sm"
    >
      <div>
        {/* Top row: Icon & Favorite button */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
          <div className="flex items-center gap-1.5">
            {tool.isNew && (
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                New
              </span>
            )}
            <button
              onClick={(e) => onToggleFavorite(e, tool.id)}
              aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-500 hover:text-amber-600'
                  : 'text-neutral-300 dark:text-neutral-700 hover:text-neutral-500 dark:hover:text-neutral-400'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Clean unboxed metadata separator (Zero-pill discipline) */}
        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mb-1.5 flex items-center gap-1.5">
          <span>{tool.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Client-Side</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer trigger */}
      <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-neutral-100">
        <span>Open tool</span>
        <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </div>
  );
}
