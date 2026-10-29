export type ToolCategory =
  | 'all'
  | 'everyday'
  | 'math'
  | 'science'
  | 'learning';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
  shortSummary: string;
  twoSentenceLead?: string;
  actionHeading?: string;
  keywords: string[];
  icon: string;
  isNew?: boolean;
  relatedToolIds?: string[];
  guidance: {
    overview: string;
    tips: string[];
    steps?: HowToStep[];
    faqs?: FAQItem[];
    shortcuts?: { key: string; action: string }[];
    disclaimer?: string;
  };
}

export type StaticPageId =
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'accessibility';
