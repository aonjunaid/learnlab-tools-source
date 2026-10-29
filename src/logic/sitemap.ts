import { TOOLS, CATEGORIES } from '../data/tools';
import { StaticPageId } from '../types';

export interface SitemapItem {
  url: string;
  path: string;
  title: string;
  category: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: string;
  lastmod?: string;
}

export interface SitemapGroup {
  id: string;
  title: string;
  description: string;
  items: {
    id: string;
    name: string;
    url: string;
    path: string;
    description: string;
    isNew?: boolean;
    isStatic?: boolean;
    isCategory?: boolean;
  }[];
}

const STATIC_PAGES: { id: StaticPageId; name: string; description: string }[] = [
  { id: 'about', name: 'About Us', description: 'Our pedagogical mission and client-side computing vision' },
  { id: 'contact', name: 'Contact & Support', description: 'Reach out for feature requests and educational collaborations' },
  { id: 'privacy', name: 'Privacy Policy', description: '100% client-side zero data collection guarantee' },
  { id: 'terms', name: 'Terms of Use', description: 'Open educational utility terms of service' },
  { id: 'accessibility', name: 'Accessibility Statement', description: 'WCAG 2.1 AA compliance and screen reader guidelines' },
];

/**
 * Returns a flat array of all crawlable URLs in the application with priority and change frequencies.
 */
export function getAllSitemapItems(baseUrl = 'https://learnlabtools.app/'): SitemapItem[] {
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const today = new Date().toISOString().split('T')[0];

  const items: SitemapItem[] = [
    {
      url: cleanBase,
      path: '/',
      title: 'LearnLab Tools – Home & Hub',
      category: 'Home',
      changefreq: 'daily',
      priority: '1.0',
      lastmod: today,
    },
  ];

  // Categories
  for (const cat of CATEGORIES) {
    if (cat.id === 'all') continue;
    items.push({
      url: `${cleanBase}#/category/${cat.id}`,
      path: `#/category/${cat.id}`,
      title: `${cat.label} Tools Category`,
      category: 'Categories',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: today,
    });
  }

  // Tools
  for (const tool of TOOLS) {
    items.push({
      url: `${cleanBase}#/tool/${tool.id}`,
      path: `#/tool/${tool.id}`,
      title: `${tool.name} – Free Online Tool`,
      category: tool.categoryLabel,
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: today,
    });
  }

  // Static Pages
  for (const page of STATIC_PAGES) {
    items.push({
      url: `${cleanBase}#/${page.id}`,
      path: `#/${page.id}`,
      title: page.name,
      category: 'Information & Legal',
      changefreq: 'monthly',
      priority: '0.5',
      lastmod: today,
    });
  }

  return items;
}

/**
 * Generates standards-compliant XML sitemap content matching Google & Bing crawler specs.
 */
export function generateXmlSitemap(baseUrl = 'https://learnlabtools.app/'): string {
  const items = getAllSitemapItems(baseUrl);
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  ];

  for (const item of items) {
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>${item.url}</loc>`);
    if (item.lastmod) {
      xmlLines.push(`    <lastmod>${item.lastmod}</lastmod>`);
    }
    xmlLines.push(`    <changefreq>${item.changefreq}</changefreq>`);
    xmlLines.push(`    <priority>${item.priority}</priority>`);
    xmlLines.push('  </url>');
  }

  xmlLines.push('</urlset>');
  return xmlLines.join('\n');
}

/**
 * Returns grouped tools and links structured specifically for HTML footer sitemaps.
 */
export function getFooterSitemapGroups(baseUrl = 'https://learnlabtools.app/'): SitemapGroup[] {
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  // 1. Math & Financial Tools
  const mathTools = TOOLS.filter((t) => t.category === 'math');
  // 2. Everyday Utilities
  const everydayTools = TOOLS.filter((t) => t.category === 'everyday');
  // 3. Science & STEM
  const scienceTools = TOOLS.filter((t) => t.category === 'science');
  // 4. Code & Learning
  const learningTools = TOOLS.filter((t) => t.category === 'learning');

  return [
    {
      id: 'math',
      title: 'Math & Financial',
      description: 'Calculators for percentage, compounding, formulas, and grades',
      items: mathTools.map((t) => ({
        id: t.id,
        name: t.name,
        url: `${cleanBase}#/tool/${t.id}`,
        path: `#/tool/${t.id}`,
        description: t.shortSummary,
        isNew: t.isNew,
      })),
    },
    {
      id: 'everyday',
      title: 'Everyday Utilities',
      description: 'Quick productivity, text analysis, and media generators',
      items: everydayTools.map((t) => ({
        id: t.id,
        name: t.name,
        url: `${cleanBase}#/tool/${t.id}`,
        path: `#/tool/${t.id}`,
        description: t.shortSummary,
        isNew: t.isNew,
      })),
    },
    {
      id: 'science',
      title: 'Science & STEM',
      description: 'Interactive physics, chemistry, optics, and genetics suites',
      items: scienceTools.map((t) => ({
        id: t.id,
        name: t.name,
        url: `${cleanBase}#/tool/${t.id}`,
        path: `#/tool/${t.id}`,
        description: t.shortSummary,
        isNew: t.isNew,
      })),
    },
    {
      id: 'learning',
      title: 'Code & Learning Lab',
      description: 'Interactive IDE, resume builder, transcription, and quizzes',
      items: learningTools.map((t) => ({
        id: t.id,
        name: t.name,
        url: `${cleanBase}#/tool/${t.id}`,
        path: `#/tool/${t.id}`,
        description: t.shortSummary,
        isNew: t.isNew,
      })),
    },
    {
      id: 'platform',
      title: 'Directory & Legal',
      description: 'Categories, governance, privacy, and XML sitemaps',
      items: [
        {
          id: 'category-all',
          name: 'All Tools Directory',
          url: cleanBase,
          path: '/',
          description: 'Browse complete registry of 18+ free client-side tools',
          isCategory: true,
        },
        {
          id: 'category-everyday',
          name: 'Everyday Category',
          url: `${cleanBase}#/category/everyday`,
          path: '#/category/everyday',
          description: 'Explore everyday productivity utilities',
          isCategory: true,
        },
        {
          id: 'category-math',
          name: 'Math Category',
          url: `${cleanBase}#/category/math`,
          path: '#/category/math',
          description: 'Explore mathematical and financial tools',
          isCategory: true,
        },
        {
          id: 'category-science',
          name: 'Science Category',
          url: `${cleanBase}#/category/science`,
          path: '#/category/science',
          description: 'Explore physics, chemistry, and biology labs',
          isCategory: true,
        },
        {
          id: 'category-learning',
          name: 'Learning Category',
          url: `${cleanBase}#/category/learning`,
          path: '#/category/learning',
          description: 'Explore interactive educational and coding modules',
          isCategory: true,
        },
        ...STATIC_PAGES.map((p) => ({
          id: p.id,
          name: p.name,
          url: `${cleanBase}#/${p.id}`,
          path: `#/${p.id}`,
          description: p.description,
          isStatic: true,
        })),
      ],
    },
  ];
}
