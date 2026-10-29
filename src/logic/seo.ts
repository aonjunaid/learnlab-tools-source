import { ToolCategory, StaticPageId, ToolItem } from '../types';
import { TOOLS } from '../data/tools';
import { getToolHowToSteps, getToolFAQs } from './tool-seo-content';

export interface PageSEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogType: 'website' | 'article';
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  jsonLd: Record<string, unknown>;
}

const DEFAULT_ORIGIN = typeof window !== 'undefined' ? window.location.origin : 'https://learnlabtools.app';
const DEFAULT_PATHNAME = typeof window !== 'undefined' ? window.location.pathname : '/';

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${window.location.pathname}`;
  }
  return 'https://learnlabtools.app/';
}

// Category mappings for Schema.org applicationCategory
function getApplicationCategory(category: ToolCategory): string {
  switch (category) {
    case 'math':
      return 'EducationalApplication, FinanceApplication';
    case 'science':
      return 'EducationalApplication, ScientificApplication';
    case 'learning':
      return 'EducationalApplication';
    case 'everyday':
    default:
      return 'UtilitiesApplication';
  }
}

// Category SEO configurations
const CATEGORY_SEO_DATA: Record<
  ToolCategory,
  {
    title: string;
    description: string;
    keywords: string[];
    headline: string;
  }
> = {
  all: {
    title: 'LearnLab Tools – Science, Math & Everyday Calculators',
    description: 'Free client-side tools and visualizers for physics, chemistry, math, finance, and daily tasks. Fast, private, and step-by-step in your web browser.',
    keywords: ['calculators', 'science tools', 'math solvers', 'physics visualizer', 'chemistry lab', 'free online tools', 'learning lab', 'client-side utilities'],
    headline: 'Explore 18+ Free Client-Side Calculators & STEM Visualizers'
  },
  everyday: {
    title: 'Everyday Utilities – Fast Text, Date & QR Tools | LearnLab',
    description: 'Practical daily utilities: precise age & date calculation, real-time word counter, case converter, local JSON validator, QR generator, and image tools.',
    keywords: ['everyday tools', 'age calculator', 'word counter', 'text case converter', 'qr code generator', 'json formatter', 'image resizer', 'color picker'],
    headline: 'Daily Productivity & Utility Tools – 100% Client-Side'
  },
  math: {
    title: 'Math & Financial Calculators – Step-by-Step Math | LearnLab',
    description: 'Accurate mathematics and financial tools: percentage solver, unit converter, compound interest estimator, student marks tracker, and loan amortization.',
    keywords: ['math calculators', 'percentage calculator', 'unit converter', 'compound interest', 'marks calculator', 'loan amortization', 'step by step math'],
    headline: 'Step-by-Step Mathematics & Financial Estimators'
  },
  science: {
    title: 'Science & STEM Calculators – Physics & Chemistry | LearnLab',
    description: 'Interactive STEM laboratory: physics kinematics, chemistry molar mass, reaction balancer, optics ray tracing, molecular genetics, and dynamic visualizer.',
    keywords: ['science visualizer', 'physics calculators', 'chemistry suite', 'reaction balancer', 'optics ray tracer', 'molecular biology', 'dna translation', 'stem tools'],
    headline: 'Interactive Physics, Chemistry & Molecular Biology Laboratory'
  },
  learning: {
    title: 'Interactive Learning Lab – Practice & Quizzes | LearnLab',
    description: 'Interactive learning for students of all ages: visual counting, arithmetic practice, pattern recognition, spelling explorer, and lecture transcription notes.',
    keywords: ['learning lab', 'educational practice', 'kids math', 'counting', 'spelling', 'pattern recognition', 'lecture transcription', 'study notes'],
    headline: 'Exploratory & Constructive Learning Modules'
  }
};

// Static Page SEO configurations
const STATIC_PAGE_SEO_DATA: Record<
  StaticPageId,
  {
    title: string;
    description: string;
    keywords: string[];
    jsonLdType: string;
  }
> = {
  about: {
    title: 'About Us – Science & Learning Mission | LearnLab Tools',
    description: 'Discover LearnLab Tools: 100% client-side calculators, physics visualizers, and learning modules built for students, teachers, and STEM explorers.',
    keywords: ['about learnlab tools', 'client-side calculators', 'educational software', 'free stem platform', 'private math tools'],
    jsonLdType: 'AboutPage'
  },
  contact: {
    title: 'Contact Us – Feedback & Support | LearnLab Tools',
    description: 'Get in touch with the LearnLab Tools development team. Submit bug reports, request new science calculators, or share pedagogical feedback.',
    keywords: ['contact learnlab', 'feedback', 'bug report', 'request calculator', 'science tool support'],
    jsonLdType: 'ContactPage'
  },
  privacy: {
    title: 'Privacy Policy – 100% Client-Side | LearnLab Tools',
    description: 'Read the LearnLab Tools privacy guarantee: all calculations run locally in your browser. We never track cookies, collect personal data, or sell info.',
    keywords: ['privacy policy', 'client-side computing', 'zero tracking', 'no cookies', 'local-first privacy', 'data security'],
    jsonLdType: 'WebPage'
  },
  terms: {
    title: 'Terms of Service – Free Educational Tools | LearnLab',
    description: 'Review terms of service for LearnLab Tools. Free, open browser-based educational utilities for study, classrooms, and everyday problem-solving.',
    keywords: ['terms of service', 'terms of use', 'free software terms', 'educational disclaimer', 'acceptable use'],
    jsonLdType: 'WebPage'
  },
  accessibility: {
    title: 'Accessibility Statement – WCAG 2.1 AA | LearnLab Tools',
    description: 'LearnLab Tools is built for accessibility with high-contrast themes, full keyboard navigation, ARIA landmarks, and screen reader compatibility.',
    keywords: ['accessibility statement', 'wcag 2.1 aa', 'accessible math tools', 'keyboard navigation', 'screen reader support'],
    jsonLdType: 'WebPage'
  }
};

/**
 * Generates full SEO metadata tailored to the current active view.
 */
export function getSEOMetadata(
  activeToolId: string | null,
  activeStaticPage: StaticPageId | null,
  selectedCategory: ToolCategory = 'all'
): PageSEOMetadata {
  const baseUrl = getBaseUrl();

  // 1. Tool Page SEO
  if (activeToolId) {
    const tool = TOOLS.find((t) => t.id === activeToolId);
    if (tool) {
      const canonicalUrl = `${baseUrl}#/tool/${tool.id}`;
      // Clean, branded title between 30 and 60 chars
      const title = `${tool.name} – LearnLab Tools`.length <= 60
        ? `${tool.name} – LearnLab Tools`
        : `${tool.name.slice(0, 42)}… – LearnLab`;

      // Description tailored between 120 and 160 chars with action CTA
      let description = tool.description;
      if (description.length > 160) {
        description = `${description.slice(0, 157)}...`;
      } else if (description.length < 120) {
        description = `${description} Completely free and private in your browser with LearnLab Tools.`;
        if (description.length > 160) {
          description = description.slice(0, 157) + '...';
        }
      }

      const howToSteps = getToolHowToSteps(tool);
      const faqs = getToolFAQs(tool);

      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: `${tool.name} – LearnLab Tools`,
        url: canonicalUrl,
        applicationCategory: getApplicationCategory(tool.category),
        operatingSystem: 'All modern web browsers (Chrome, Firefox, Safari, Edge)',
        description: description,
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        featureList: tool.guidance.tips,
        keywords: tool.keywords.join(', '),
        author: {
          '@type': 'Organization',
          name: 'LearnLab Tools',
          url: baseUrl
        },
        mainEntity: [
          {
            '@type': 'HowTo',
            name: `How to Use ${tool.name} Online`,
            description: `Step-by-step instructions for using the free online ${tool.name}.`,
            step: howToSteps.map((s, i) => ({
              '@type': 'HowToStep',
              position: i + 1,
              name: s.name,
              text: s.text
            }))
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          }
        ]
      };

      return {
        title,
        description,
        keywords: tool.keywords,
        canonicalUrl,
        ogType: 'website',
        ogTitle: `${tool.name} — Interactive Online Tool`,
        ogDescription: description,
        twitterTitle: `${tool.name} — LearnLab Tools`,
        twitterDescription: description,
        jsonLd
      };
    }
  }

  // 2. Static Page SEO
  if (activeStaticPage && STATIC_PAGE_SEO_DATA[activeStaticPage]) {
    const pageData = STATIC_PAGE_SEO_DATA[activeStaticPage];
    const canonicalUrl = `${baseUrl}#/${activeStaticPage}`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': pageData.jsonLdType,
      name: pageData.title,
      description: pageData.description,
      url: canonicalUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'LearnLab Tools',
        url: baseUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'LearnLab Tools'
      }
    };

    return {
      title: pageData.title,
      description: pageData.description,
      keywords: pageData.keywords,
      canonicalUrl,
      ogType: 'website',
      ogTitle: pageData.title,
      ogDescription: pageData.description,
      twitterTitle: pageData.title,
      twitterDescription: pageData.description,
      jsonLd
    };
  }

  // 3. Category Filtered View SEO
  if (selectedCategory && selectedCategory !== 'all' && CATEGORY_SEO_DATA[selectedCategory]) {
    const catData = CATEGORY_SEO_DATA[selectedCategory];
    const canonicalUrl = `${baseUrl}#/category/${selectedCategory}`;
    const toolsInCategory = TOOLS.filter((t) => t.category === selectedCategory);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: catData.title,
      description: catData.description,
      url: canonicalUrl,
      headline: catData.headline,
      numberOfItems: toolsInCategory.length,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: toolsInCategory.map((tool, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: tool.name,
          url: `${baseUrl}#/tool/${tool.id}`,
          description: tool.shortSummary
        }))
      }
    };

    return {
      title: catData.title,
      description: catData.description,
      keywords: catData.keywords,
      canonicalUrl,
      ogType: 'website',
      ogTitle: catData.title,
      ogDescription: catData.description,
      twitterTitle: catData.title,
      twitterDescription: catData.description,
      jsonLd
    };
  }

  // 4. Default Home Page SEO
  const homeData = CATEGORY_SEO_DATA.all;
  const canonicalUrl = baseUrl;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'LearnLab Tools',
    url: canonicalUrl,
    applicationCategory: 'EducationalApplication, UtilitiesApplication',
    operatingSystem: 'All modern web browsers',
    description: homeData.description,
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'LearnLab Tools'
    },
    hasPart: TOOLS.map((t) => ({
      '@type': 'SoftwareApplication',
      name: t.name,
      url: `${baseUrl}#/tool/${t.id}`,
      description: t.shortSummary
    }))
  };

  return {
    title: homeData.title,
    description: homeData.description,
    keywords: homeData.keywords,
    canonicalUrl,
    ogType: 'website',
    ogTitle: homeData.title,
    ogDescription: homeData.description,
    twitterTitle: homeData.title,
    twitterDescription: homeData.description,
    jsonLd
  };
}

/**
 * Applies the given SEO metadata directly to the document head.
 * Ensures consistent canonical links, OpenGraph, Twitter card tags, and JSON-LD schema.
 */
export function applySEOToDocument(meta: PageSEOMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = meta.title;

  // Helper to get or create a meta tag
  const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 2. Standard Meta Tags
  setMetaTag('name', 'description', meta.description);
  setMetaTag('name', 'keywords', meta.keywords.join(', '));
  setMetaTag('name', 'robots', 'index, follow');

  // 3. OpenGraph Tags
  setMetaTag('property', 'og:title', meta.ogTitle);
  setMetaTag('property', 'og:description', meta.ogDescription);
  setMetaTag('property', 'og:type', meta.ogType);
  setMetaTag('property', 'og:url', meta.canonicalUrl);
  setMetaTag('property', 'og:site_name', 'LearnLab Tools');
  setMetaTag('property', 'og:locale', 'en_US');

  // 4. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', meta.twitterTitle);
  setMetaTag('name', 'twitter:description', meta.twitterDescription);

  // 5. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonicalUrl);

  // 6. Schema.org JSON-LD structured data
  const SCRIPT_ID = 'learnlab-dynamic-jsonld';
  let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = SCRIPT_ID;
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }
  scriptTag.textContent = JSON.stringify(meta.jsonLd, null, 2);
}
