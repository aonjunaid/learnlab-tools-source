import { ToolItem, FAQItem, HowToStep } from '../types';

/**
 * Curated step-by-step "How to Use" guides for each tool.
 * Satisfies Schema.org HowTo structured data and on-page numbered list requirements.
 */
export function getToolHowToSteps(tool: ToolItem): HowToStep[] {
  if (tool.guidance.steps && tool.guidance.steps.length > 0) {
    return tool.guidance.steps;
  }

  // Domain-specific step guides
  switch (tool.id) {
    case 'percentage-calculator':
      return [
        {
          name: 'Select Calculation Mode',
          text: 'Choose your desired operation from the top tabs: X% of Y, Percentage Share, Percentage Change, or Reverse Percentage.',
        },
        {
          name: 'Input Numbers',
          text: 'Enter your values into the designated input fields. The calculation updates in real time with zero latency.',
        },
        {
          name: 'Inspect Step-by-Step Derivation',
          text: 'Review the step-by-step arithmetic breakdown, mathematical formulas, and fractional representations below the result.',
        },
        {
          name: 'Copy or Share Result',
          text: 'Click the copy button to copy the answer directly to your clipboard or use the share button to save the link.',
        },
      ];

    case 'age-date-calculator':
      return [
        {
          name: 'Enter Birth Date or Start Date',
          text: 'Select your exact date of birth or historical milestone date using the date picker.',
        },
        {
          name: 'Review Completed Calendar Age',
          text: 'View completed calendar years, months, and days, taking into account leap years and varying month lengths.',
        },
        {
          name: 'Explore Date Difference or Countdown',
          text: 'Switch to the Date Difference or Birthday Countdown tab to inspect total elapsed days, weeks, and upcoming milestones.',
        },
      ];

    case 'word-counter':
      return [
        {
          name: 'Paste or Type Text',
          text: 'Enter or paste your text into the interactive editor area.',
        },
        {
          name: 'Analyze Real-Time Metrics',
          text: 'Instantly view word count, characters with/without spaces, sentences, paragraphs, reading time, and speaking cadence.',
        },
        {
          name: 'Check Keyword Density',
          text: 'Review top keyword frequencies and reading grade levels to optimize your essay, article, or social post.',
        },
      ];

    case 'code-compiler':
      return [
        {
          name: 'Select Programming Language',
          text: 'Choose Python, JavaScript, TypeScript, C, C++, Rust, SQL, or HTML using the top language tabs.',
        },
        {
          name: 'Write or Load Code Template',
          text: 'Type your code in the syntax-highlighted editor or choose a starter template from the algorithm dropdown.',
        },
        {
          name: 'Execute Client-Side',
          text: 'Click "Run Code" (or press Ctrl+Enter / Cmd+Enter) to compile and execute directly in your browser sandbox.',
        },
        {
          name: 'Inspect Terminal & Assembly',
          text: 'Review standard output, errors, execution runtime, and inspect generated x86_64 assembly or SQL query plans.',
        },
      ];

    case 'cv-cover-letter-builder':
      return [
        {
          name: 'Choose Visual Style & Palette',
          text: 'Select between Flow CV (modern dual-column), Executive, Modern Tech, Academic STEM, or Creative layouts.',
        },
        {
          name: 'Fill Profile & Career Milestones',
          text: 'Enter your personal contact info, work experience timeline, education, skills, and key projects.',
        },
        {
          name: 'Generate Matched Cover Letter',
          text: 'Switch to the Cover Letter tab to create a synchronized application letter addressed to the hiring manager.',
        },
        {
          name: 'Export PDF or ATS Plain Text',
          text: 'Click "Print / PDF" for high-resolution vector PDF formatting, or copy ATS-friendly text for job portals.',
        },
      ];

    case 'video-transcription-notes':
      return [
        {
          name: 'Input Video Link or Upload File',
          text: 'Paste a video URL from YouTube, Facebook, TikTok, Vimeo, or upload a local MP4/MP3 media file.',
        },
        {
          name: 'Generate Verbatim Transcript',
          text: 'Click "Transcribe Video" to produce timestamped dialogue with paragraph segmentation and speaker markers.',
        },
        {
          name: 'Navigate with Clickable Timestamps',
          text: 'Click any timestamp cue (e.g. [01:15]) to jump directly to that point in the embedded video player.',
        },
        {
          name: 'Create Structured Study Notes',
          text: 'Click "Generate Structured Study Notes" to receive executive summaries, key terms, and interactive flashcards.',
        },
      ];

    case 'chemistry-suite':
      return [
        {
          name: 'Select Chemistry Tool Module',
          text: 'Choose Molar Mass, Stoichiometry Balancer, Solution Dilution (M1V1), pH & Buffers, or Ideal Gas Law.',
        },
        {
          name: 'Input Formula or Reaction',
          text: 'Type chemical formulas (e.g. CuSO4*5H2O) or unbalanced reactions (e.g. Fe + O2 -> Fe2O3).',
        },
        {
          name: 'Evaluate Stoichiometry & Yields',
          text: 'Inspect atomic percentage composition, matrix conservation ledgers, limiting reagents, and theoretical yields.',
        },
      ];

    case 'gemini-api-access':
      return [
        {
          name: 'Sign In to Google AI Studio',
          text: 'Open https://aistudio.google.com/app/apikey and sign in with your primary Google account.',
        },
        {
          name: 'Create or Select Google Cloud Project',
          text: 'Click "Create API key" and link an existing Google Cloud project or create a fresh default project.',
        },
        {
          name: 'Store Key Securely in Server Environment',
          text: 'Place your API key into your server .env.local file as GEMINI_API_KEY. Never expose it in client code.',
        },
        {
          name: 'Test Models & Verify Quota Limits',
          text: 'Check Google AI Studio Playground and Google Cloud Console Quotas to verify your project rate limits and billing.',
        },
      ];

    case 'universal-file-converter':
      return [
        {
          name: 'Upload or Drag Any File',
          text: 'Drag and drop your file into the converter area or click browse to select any image, spreadsheet, document, or audio file.',
        },
        {
          name: 'Choose Your Desired Target Format',
          text: 'Select the target extension (e.g. PNG to JPG, CSV to JSON, JSON to YAML, Markdown to HTML, or Audio to WAV).',
        },
        {
          name: 'Configure Conversion & Compression Settings',
          text: 'Fine-tune quality percentages, max dimensions, delimiters, or table names in the options drawer.',
        },
        {
          name: 'Convert & Download Instantly',
          text: 'Click Convert to transform the file 100% in your browser. Download the converted file or copy data directly.',
        },
      ];

    case 'islamic-tools-suite':
      return [
        {
          name: 'Select Your Utility',
          text: 'Choose from Zakat al-Mal, Miras inheritance, Qibla compass, prayer times, digital tasbeeh, Hijri calendar, or halal food checker.',
        },
        {
          name: 'Enter Asset or Geographical Data',
          text: 'Enter wealth balances, family heir counts, or select your global coordinates/city.',
        },
        {
          name: 'Review Verified Classical Derivations',
          text: 'Inspect Quranic fixed shares, Nisab thresholds, solar hour angles, or Great Circle compass bearings in real time.',
        },
        {
          name: 'Copy or Save Calculation Breakdown',
          text: 'Save or copy your verified Zakat or inheritance distribution results with zero data stored on external servers.',
        },
      ];

    default:
      // Generic high-yield steps from tool guidance
      return [
        {
          name: 'Set Your Parameters',
          text: `Enter your initial values or select options in the ${tool.name} interface.`,
        },
        {
          name: 'Calculate Instantly',
          text: 'All results and derivations compute in real-time right in your browser with zero server uploads.',
        },
        {
          name: 'Review Steps & Formulas',
          text: 'Examine step-by-step mathematical reasoning, units, and verification breakdowns below the tool.',
        },
        {
          name: 'Copy or Export Results',
          text: 'Copy the result to your clipboard or download your data for study, work, or reporting.',
        },
      ];
  }
}

/**
 * Curated Frequently Asked Questions (FAQs) for each tool.
 * Satisfies Schema.org FAQPage structured data and on-page H2/H3 semantic tags.
 */
export function getToolFAQs(tool: ToolItem): FAQItem[] {
  if (tool.guidance.faqs && tool.guidance.faqs.length > 0) {
    return tool.guidance.faqs;
  }

  // Base FAQs common to all tools
  const commonFAQs: FAQItem[] = [
    {
      question: `Is this online ${tool.name} completely free to use?`,
      answer: `Yes, the ${tool.name} on LearnLab Tools is 100% free with no registration, no subscription fees, and no feature gating.`,
    },
    {
      question: `Does ${tool.name} upload or save my private data to a server?`,
      answer: `No. All calculations, parsing, and data processing run 100% client-side in your web browser. Your inputs, files, and formulas never leave your device.`,
    },
    {
      question: `Can I use ${tool.name} on mobile phones and tablets?`,
      answer: `Yes. LearnLab Tools is fully mobile-responsive and thumb-friendly. It functions smoothly on iOS (Safari), Android (Chrome), tablets, and desktop browsers.`,
    },
  ];

  // Specific domain FAQs
  switch (tool.id) {
    case 'percentage-calculator':
      return [
        {
          question: 'How do I calculate what percentage one number is of another?',
          answer: 'Divide the part by the total, then multiply by 100. Formula: Percentage = (Part / Total) × 100%. Our tool calculates this instantly under the "Percentage Share" tab.',
        },
        {
          question: 'How do I calculate a percentage increase or decrease?',
          answer: 'Subtract the old value from the new value, divide by the absolute old value, and multiply by 100. Formula: % Change = ((New - Old) / Old) × 100%.',
        },
        {
          question: 'What is a reverse percentage calculation?',
          answer: 'Reverse percentage finds the original value before a tax, discount, or markup was applied. Formula: Original = Final Value / (1 ± (Rate / 100)).',
        },
        ...commonFAQs,
      ];

    case 'age-date-calculator':
      return [
        {
          question: 'How does calendar age differ from total elapsed days?',
          answer: 'Calendar age accounts for uneven calendar months (e.g. 28/29-day Februaries vs 31-day months). Total days counts exact astronomical days elapsed regardless of month boundaries.',
        },
        {
          question: 'How are leap years handled for birthdays on February 29th?',
          answer: 'In non-leap years, your birthday countdown automatically calculates toward February 28th, while tracking completed leap cycles accurately.',
        },
        ...commonFAQs,
      ];

    case 'word-counter':
      return [
        {
          question: 'How is reading time and speaking time estimated?',
          answer: 'Reading time is computed at the standard rate of 200 words per minute (WPM). Speaking cadence is estimated at 130 WPM for natural conversational speech.',
        },
        {
          question: 'Does the character counter count spaces and punctuation?',
          answer: 'Yes, our tool provides distinct counters for characters with spaces and characters without spaces, allowing you to meet exact publisher or social media limits.',
        },
        ...commonFAQs,
      ];

    case 'code-compiler':
      return [
        {
          question: 'Can I execute Python, JavaScript, and C++ directly in the browser?',
          answer: 'Yes. The code compiler executes Python, JavaScript, TypeScript, C, C++, Rust, and SQL in an isolated client-side sandbox without sending your code to an external server.',
        },
        {
          question: 'What is the x86_64 Assembly Inspector?',
          answer: 'For compiled languages like C, C++, and Rust, the inspector shows generated assembly directives (.globl, registers, stack frames) so students can study how high-level code translates to machine instructions.',
        },
        ...commonFAQs,
      ];

    case 'cv-cover-letter-builder':
      return [
        {
          question: 'What is Flow CV style?',
          answer: 'Flow CV is a modern dual-column resume format featuring an accented left sidebar for contact details, skills, and education, paired with an open right timeline for work experience.',
        },
        {
          question: 'Is this CV builder ATS-friendly?',
          answer: 'Yes. You can copy a clean, ATS-optimized plain text version with standardized headings, or print directly to crisp vector PDF using browser print stylesheets (@media print).',
        },
        ...commonFAQs,
      ];

    case 'video-transcription-notes':
      return [
        {
          question: 'Can I transcribe videos from YouTube and Facebook?',
          answer: 'Yes. Paste any public YouTube, Facebook, TikTok, Vimeo, or web video URL to extract timestamped dialogue, video chapters, and study summaries.',
        },
        {
          question: 'Can I export the transcripts as subtitles?',
          answer: 'Yes. Transcripts can be downloaded as Plain Text (.txt), WebVTT (.vtt), or SubRip (.srt) subtitles for video editing or studying.',
        },
        ...commonFAQs,
      ];

    case 'gemini-api-access':
      return [
        {
          question: 'Does this app generate or guarantee unlimited Google API keys?',
          answer: 'No. API keys, quota tiers, and token allocations are controlled exclusively by Google through your linked Google Cloud Project. No third-party app can generate keys or bypass quotas.',
        },
        {
          question: 'Do I need to paste my API key into this application?',
          answer: 'Never. LearnLab Tools maintains a strict zero-key-input policy and will never ask you to input, transmit, or store your Google API key.',
        },
        {
          question: 'Does a single API key work across multiple Gemini models?',
          answer: 'Yes, a single key can access multiple models (e.g. Gemini 2.5 Flash, Gemini 2.5 Pro) enabled for that Google Cloud project, though quotas and billing tiers vary per model.',
        },
        ...commonFAQs,
      ];

    case 'universal-file-converter':
      return [
        {
          question: 'Are my converted files uploaded or stored on any server?',
          answer: 'No. All conversions run 100% locally in your web browser using WebAssembly, Canvas API, and Web Audio API. Your files never leave your device.',
        },
        {
          question: 'What file categories does this universal converter support?',
          answer: 'The tool supports Images (PNG, JPG, WebP, SVG, BMP, ICO), Tabular Data (CSV, TSV, JSON, XML, YAML, SQL), Documents (Markdown, HTML, TXT, LaTeX), and Media (MP3, WAV).',
        },
        {
          question: 'Is there a limit on file size or number of conversions?',
          answer: 'There are no artificial paywalls or file limits. Conversions are processed directly in browser memory with zero registration required.',
        },
        ...commonFAQs,
      ];

    case 'islamic-tools-suite':
      return [
        {
          question: 'Which Nisab standard should I use for Zakat al-Mal?',
          answer: 'The silver standard (612.36g) is historically recommended by the majority of classical scholars as it sets a lower threshold, providing maximum benefit to the poor and needy. The gold standard (87.48g) is also supported.',
        },
        {
          question: 'How does the Miras (Inheritance) calculator handle Awl and Radd?',
          answer: 'The engine automatically detects when fixed Quranic shares exceed 100% and applies proportional deficit reduction (Al-Awl), or returns unassigned surplus to eligible non-spouse Quranic heirs (Ar-Radd).',
        },
        {
          question: 'Are my financial assets or location coordinates uploaded to any server?',
          answer: 'No. All calculations (wealth valuation, GPS spherical trigonometry, and prayer times) run 100% locally in your web browser with complete privacy.',
        },
        ...commonFAQs,
      ];

    default:
      return [
        {
          question: `How accurate are the results from ${tool.name}?`,
          answer: `Calculations are grounded in exact mathematical, scientific, and IEEE floating-point arithmetic standards with step-by-step formula derivations.`,
        },
        ...commonFAQs,
      ];
  }
}

/**
 * Two-Sentence Rule Above the Fold Lead Generator.
 * Directly implements Blueprint On-Page SEO Rule 1.
 */
export function getTwoSentenceLead(tool: ToolItem): string {
  if (tool.twoSentenceLead) return tool.twoSentenceLead;

  switch (tool.id) {
    case 'percentage-calculator':
      return 'Free online Percentage Calculator to calculate percentage of a number, percentage share, percentage increase or decrease, and reverse base numbers instantly. 100% private, step-by-step arithmetic derivations in your browser.';
    case 'age-date-calculator':
      return 'Free online Age & Date Calculator to compute exact completed calendar age in years, months, and days from date of birth. Includes leap-year adjustments, date span differences, and upcoming birthday countdowns.';
    case 'word-counter':
      return 'Free online Word & Character Counter for real-time text statistics, character counts with or without spaces, reading time, and keyword density. Completely private client-side text analysis without data uploads.';
    case 'code-compiler':
      return 'Free online Multi-Language Compiler & IDE to write, compile, and execute Python, JavaScript, C++, Rust, and SQL directly in your web browser. Features live syntax highlighting, x86_64 assembly output, and zero-latency sandboxes.';
    case 'cv-cover-letter-builder':
      return 'Free online Flow CV & Cover Letter Builder to create modern dual-column resumes, executive layouts, and synchronized application letters. Features live interactive previews, ATS plain text copy, and native vector PDF printing.';
    case 'video-transcription-notes':
      return 'Free online Video Transcriber to generate verbatim timestamped transcripts and structured study notes from YouTube, Facebook, TikTok, Vimeo, and audio files. Includes clickable timestamps and interactive flashcards.';
    case 'chemistry-suite':
      return 'Free online Chemistry Suite & Reaction Balancer to calculate molar masses, balance stoichiometric equations, and solve solution dilutions. Features step-by-step atomic ledgers and limiting reagent analysis.';
    case 'compound-interest':
      return 'Free online Compound Interest Calculator to estimate future investment growth with custom compounding frequencies and periodic contributions. Includes comprehensive amortization schedules and interactive charts.';
    case 'gemini-api-access':
      return 'Free guide and security checklist for creating and managing Google AI Studio Gemini API keys. Learn how project quotas, model availability, and server-side secret protection work.';
    case 'universal-file-converter':
      return 'Free online Universal File Converter to convert images, data tables, documents, audio, and code across formats 100% client-side in your browser. Fast, private, and zero server uploads.';
    case 'islamic-tools-suite':
      return 'Free online Islamic Tools Suite for Zakat al-Mal, Miras inheritance, Qibla compass, and astronomical prayer times. 100% client-side, private, and grounded in authentic classical jurisprudence.';
    default:
      return `Free online ${tool.name} for fast, accurate problem solving and client-side calculations. Instant, private, and step-by-step in your web browser with zero registration.`;
  }
}

/**
 * Related tool recommendations to maximize dwell time and inter-tool navigation.
 * Directly implements Blueprint UX & Engagement Rule 4.
 */
export function getToolRelatedIds(toolId: string): string[] {
  const map: Record<string, string[]> = {
    'percentage-calculator': ['compound-interest', 'marks-calculator', 'unit-converter'],
    'age-date-calculator': ['percentage-calculator', 'word-counter', 'calculator'],
    'word-counter': ['text-case-converter', 'json-formatter', 'video-transcription-notes'],
    'text-case-converter': ['word-counter', 'json-formatter', 'code-compiler'],
    'unit-converter': ['percentage-calculator', 'scientific-tools', 'chemistry-suite'],
    'compound-interest': ['percentage-calculator', 'marks-calculator', 'calculator'],
    'marks-calculator': ['percentage-calculator', 'compound-interest', 'learning-lab'],
    'scientific-tools': ['science-visualizer', 'chemistry-suite', 'unit-converter'],
    'learning-lab': ['video-transcription-notes', 'code-compiler', 'marks-calculator'],
    'json-formatter': ['code-compiler', 'text-case-converter', 'qr-code-generator'],
    'image-resizer': ['color-picker', 'qr-code-generator', 'word-counter'],
    'qr-code-generator': ['image-resizer', 'color-picker', 'json-formatter'],
    'calculator': ['percentage-calculator', 'compound-interest', 'scientific-tools'],
    'color-picker': ['image-resizer', 'qr-code-generator', 'code-compiler'],
    'video-transcription-notes': ['learning-lab', 'word-counter', 'code-compiler'],
    'bioscience-genetics': ['chemistry-suite', 'science-visualizer', 'scientific-tools'],
    'chemistry-suite': ['bioscience-genetics', 'science-visualizer', 'unit-converter'],
    'science-visualizer': ['chemistry-suite', 'scientific-tools', 'code-compiler'],
    'code-compiler': ['json-formatter', 'learning-lab', 'video-transcription-notes'],
    'cv-cover-letter-builder': ['word-counter', 'text-case-converter', 'video-transcription-notes'],
    'gemini-api-access': ['code-compiler', 'json-formatter', 'learning-lab'],
    'universal-file-converter': ['image-resizer', 'json-formatter', 'text-case-converter'],
    'islamic-tools-suite': ['percentage-calculator', 'age-date-calculator', 'universal-file-converter'],
  };

  return map[toolId] || ['percentage-calculator', 'word-counter', 'code-compiler'];
}

/**
 * Generates an embeddable iframe HTML snippet for bloggers and educators.
 * Directly implements Blueprint Backlink Strategy Rule 6.
 */
export function generateEmbedSnippet(toolId: string, toolName: string, baseUrl: string): string {
  const cleanBase = baseUrl.replace(/#.*$/, '');
  const targetUrl = `${cleanBase}#/tool/${toolId}`;
  return `<!-- Embed ${toolName} on your website - Powered by LearnLab Tools -->
<div style="max-width:100%;margin:16px 0;">
  <iframe
    src="${targetUrl}"
    width="100%"
    height="650"
    style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);"
    title="Free Online ${toolName} - LearnLab Tools"
    loading="lazy"
    allow="clipboard-write"
  ></iframe>
  <div style="font-size:11px;color:#64748b;text-align:right;margin-top:6px;font-family:sans-serif;">
    Tool provided by <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" style="color:#4f46e5;text-decoration:none;font-weight:600;">LearnLab Tools</a>
  </div>
</div>`;
}
