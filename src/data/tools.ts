import { ToolItem, ToolCategory } from '../types';

export const TOOLS: ToolItem[] = [
  // 1. Percentage Calculator
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    categoryLabel: 'Mathematics & Finance',
    description: 'Calculate percentage of a value, percentage share, percentage increase/decrease, and reverse percentage with complete step-by-step formulas.',
    shortSummary: 'Percentage-of, percentage share, increase/decrease, and reverse base calculation.',
    keywords: ['percent', 'percentage', 'share', 'increase', 'decrease', 'discount', 'markup', 'math', 'ratio'],
    icon: 'Percent',
    isNew: true,
    guidance: {
      overview: 'Compute four essential percentage operations with full step-by-step arithmetic and zero-denominator protection.',
      tips: [
        'Use "X% of Y" to quickly compute tips, taxes, or discounts (e.g. 15% of 240).',
        'Use "X is what % of Y" to find marks percentages or fractional shares.',
        'Use "% Increase / Decrease" to measure growth between historical and current metrics.',
        'Use "Reverse Percentage" to calculate pre-discount or pre-tax prices when only the final number is known.'
      ]
    }
  },

  // 2. Age & Date Calculator
  {
    id: 'age-date-calculator',
    name: 'Age & Date Calculator',
    category: 'everyday',
    categoryLabel: 'Everyday Tools',
    description: 'Calculate exact completed years, months, and days from date of birth. Includes total elapsed days, date difference between two dates, and birthday countdown.',
    shortSummary: 'Exact completed calendar age, leap-year handling, date span, and birthday countdown.',
    keywords: ['age', 'date', 'birthday', 'calendar', 'years', 'months', 'days', 'countdown', 'difference', 'leap year'],
    icon: 'Calendar',
    isNew: true,
    guidance: {
      overview: 'Calculates calendar-accurate age and date spans while distinguishing between month boundaries and total astronomical elapsed days.',
      tips: [
        'Calendar age accounts for uneven month lengths (e.g., February 28/29 vs 31-day months).',
        'If born on a leap day (Feb 29), countdowns adapt to Feb 28 in common non-leap years.',
        'Use the Date Difference tab to calculate exact time spans between historical milestones.',
        'Use the Countdown tab to monitor days remaining until upcoming academic exams or events.'
      ]
    }
  },

  // 3. Word & Character Counter
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    category: 'everyday',
    categoryLabel: 'Everyday Tools',
    description: 'Analyze text statistics in real time including words, characters with/without spaces, sentences, paragraphs, lines, reading time, speaking time, and keyword density.',
    shortSummary: 'Word count, character metrics, reading cadence, and Unicode text analysis.',
    keywords: ['word count', 'character count', 'letters', 'sentences', 'paragraphs', 'reading time', 'speaking time', 'text analysis', 'density'],
    icon: 'FileText',
    guidance: {
      overview: 'Comprehensive text metrics built for students, teachers, essayists, and writers.',
      tips: [
        'Reading time assumes a standard reading pace of 225 words per minute.',
        'Speaking time is estimated at 130 words per minute for oral presentations.',
        'Handles Unicode grapheme clusters and emojis accurately without double-counting.'
      ]
    }
  },

  // 4. Text Case Converter
  {
    id: 'text-case-converter',
    name: 'Text Case Converter',
    category: 'everyday',
    categoryLabel: 'Everyday Tools',
    description: 'Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg cAsE, camelCase, snake_case, and kebab-case with one-click copy.',
    shortSummary: 'Transform text to UPPERCASE, lowercase, Title Case, camelCase, and snake_case.',
    keywords: ['case', 'uppercase', 'lowercase', 'title case', 'sentence case', 'camelcase', 'snake_case', 'kebab-case', 'text converter'],
    icon: 'Type',
    isNew: true,
    guidance: {
      overview: 'Quickly standardize typography for essay titles, coding identifiers, or formatted documents.',
      tips: [
        'Title Case capitalizes the first letter of each word.',
        'Sentence case capitalizes the first letter following terminal punctuation.',
        'camelCase and snake_case format identifiers for programming and database columns.'
      ]
    }
  },

  // 5. Unit Converter
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    category: 'math',
    categoryLabel: 'Mathematics & Science',
    description: 'Convert between everyday and scientific units: length, mass, temperature, area, volume, speed, time, pressure, energy, power, and decimal/binary digital storage.',
    shortSummary: '11 categories with pressure, energy, power, and decimal vs binary data storage.',
    keywords: ['units', 'convert', 'metric', 'imperial', 'celsius', 'fahrenheit', 'pressure', 'pascal', 'energy', 'joules', 'power', 'watts', 'bytes', 'kibibyte'],
    icon: 'ArrowRightLeft',
    guidance: {
      overview: 'High-precision conversions covering metric, imperial, SI scientific, and binary data systems.',
      tips: [
        'Digital storage clearly distinguishes between decimal SI units (1 KB = 1000 B) and binary IEC units (1 KiB = 1024 B).',
        'Pressure units include Pascal, Bar, PSI, and standard atmospheres.',
        'Use the comparison table at the bottom to view the value translated into every unit in that category simultaneously.'
      ]
    }
  },

  // 6. Compound Interest Estimator
  {
    id: 'compound-interest',
    name: 'Compound Interest Estimator',
    category: 'math',
    categoryLabel: 'Mathematics & Finance',
    description: 'Estimate investment growth with principal, interest rate, duration, compounding frequency, and ongoing periodic contributions with year-by-year schedule.',
    shortSummary: 'Compounding intervals, regular deposits, growth breakdown, and year-by-year table.',
    keywords: ['compound interest', 'investment', 'savings', 'interest', 'finance', 'annuity', 'principal', 'growth'],
    icon: 'TrendingUp',
    isNew: true,
    guidance: {
      overview: 'Educational simulation of mathematical compounding and periodic capital additions.',
      tips: [
        'Compounding frequency determines how often interest is calculated and added to the principal.',
        'Annuity timing: "Beginning of period" earns interest on contributions in the current cycle, while "End of period" earns interest starting next cycle.',
        'Review the year-by-year schedule to see the accelerating snowball effect of compound growth.'
      ],
      disclaimer: 'Projections are mathematical estimates and not guaranteed investment returns.'
    }
  },

  // 7. Marks & Percentage Calculator
  {
    id: 'marks-calculator',
    name: 'Marks & Percentage Calculator',
    category: 'math',
    categoryLabel: 'Mathematics & Academics',
    description: 'Calculate cumulative percentages across multiple school or college subjects. Supports custom grade scale boundaries and unofficial academic guidance.',
    shortSummary: 'Multiple subjects, total marks, overall percentage, and configurable grade scales.',
    keywords: ['marks', 'grade', 'percentage', 'school', 'exam', 'student', 'gpa', 'academic', 'score'],
    icon: 'GraduationCap',
    isNew: true,
    guidance: {
      overview: 'Designed for students, teachers, and parents to evaluate subject performance and aggregate percentage totals.',
      tips: [
        'Click "Add Subject" to enter all subjects on your curriculum.',
        'Use "Edit Grade Scale" to customize cutoff thresholds according to your school board rules.',
        'Use the Copy button to capture a clean formatted academic summary.'
      ],
      disclaimer: 'Informal estimation only. Does not replace official certified academic transcripts.'
    }
  },

  // 8. Scientific Problem-Solving Suite
  {
    id: 'scientific-tools',
    name: 'Scientific Calculators Suite',
    category: 'science',
    categoryLabel: 'Science & Physics',
    description: 'Interactive STEM problem-solving calculators: Speed/Distance/Time, Newton’s 2nd Law (F=ma), Ohm’s Law & Power (V=IR), Density (ρ=m/V), Wave Equation (v=fλ), Quadratic Solver, and 2D Geometry.',
    shortSummary: 'Physics formulas, kinematics, circuits, quadratic roots, and 2D geometry with derivations.',
    keywords: ['science', 'physics', 'kinematics', 'newton', 'force', 'ohm', 'voltage', 'density', 'wave', 'quadratic', 'geometry', 'stem'],
    icon: 'Atom',
    isNew: true,
    guidance: {
      overview: 'A physics and mathematics problem solver providing full formula statements, variable substitutions, step-by-step arithmetic, and physical assumptions.',
      tips: [
        'Select any target unknown variable (e.g. solve for Mass instead of Force).',
        'Inspect the step-by-step arithmetic section to understand the algebraic derivation.',
        'Review the stated physical assumptions (e.g. uniform acceleration, Ohmic conductors).'
      ]
    }
  },

  // 9. Child Learning Lab
  {
    id: 'learning-lab',
    name: 'Learning Lab (Practice & Exploration)',
    category: 'learning',
    categoryLabel: 'Child Learning & Practice',
    description: 'Fun, constructive learning activities for children and young students: early numeracy and visual counting, arithmetic practice, pattern recognition, and vocabulary exploration.',
    shortSummary: 'Visual counting, arithmetic, sequence patterns, and spelling with gentle hints.',
    keywords: ['learning', 'kids', 'children', 'counting', 'arithmetic', 'spelling', 'patterns', 'quiz', 'practice', 'elementary'],
    icon: 'Sparkles',
    isNew: true,
    guidance: {
      overview: 'A pressure-free practice environment designed for young learners, parents, and elementary educators.',
      tips: [
        'No scores are recorded externally; practice is entirely self-paced.',
        'Click "Need a gentle hint?" for constructive guidance whenever a learner feels stuck.',
        'Feedback is supportive and celebratory, focused on skill growth without shaming.'
      ],
      disclaimer: 'Educational practice activity; not a clinical or psychological diagnostic tool.'
    }
  },

  // 10. Local JSON Formatter & Validator
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'everyday',
    categoryLabel: 'Everyday Tools',
    description: 'Validate, format, prettify, minify, and inspect JSON payloads with line numbers, error diagnostics, key sorting, and local file download.',
    shortSummary: 'Local prettify, minify, syntax error line/col, and key sorting.',
    keywords: ['json', 'format', 'prettify', 'minify', 'lint', 'validate', 'parser', 'developer', 'code'],
    icon: 'Code2',
    guidance: {
      overview: 'Developer-grade JSON utility that runs entirely in memory without sending code payloads across the network.',
      tips: [
        'Click "Fix Quotes & Commas" to repair common copy-paste mistakes.',
        'Choose 2 spaces, 4 spaces, or Tabs indentation.',
        'Download formatted data directly as a .json file.'
      ]
    }
  },

  // 11. Browser-Side Image Resizer & Converter
  {
    id: 'image-resizer',
    name: 'Image Resizer & Converter',
    category: 'everyday',
    categoryLabel: 'Everyday Tools',
    description: 'Resize and convert images (JPEG, PNG, WebP) with aspect ratio lock, quality controls, and instant preview. 100% browser-side processing with zero file uploads.',
    shortSummary: 'Local image resizing, aspect-ratio lock, JPEG/PNG/WebP conversion, and download.',
    keywords: ['image', 'resize', 'convert', 'photo', 'dimensions', 'aspect ratio', 'jpeg', 'png', 'webp', 'compress'],
    icon: 'Image',
    isNew: true,
    guidance: {
      overview: 'Fast image scaling and conversion executing completely inside your browser via the HTML5 Canvas API.',
      tips: [
        'Keep "Ratio Locked" enabled to avoid stretching or distorting images.',
        'Convert large PNGs to WebP or JPEG to significantly reduce file sizes for web publishing.',
        'All conversions happen locally on your computer; your images are never uploaded to any server.'
      ]
    }
  },

  // 12. QR Code Generator
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'everyday',
    categoryLabel: 'Everyday Tools',
    description: 'Generate high-resolution QR codes for websites, plain text, Wi-Fi network credentials, email messages, phone numbers, and vCard contact cards with custom colors and export.',
    shortSummary: 'Generate QR codes for links, Wi-Fi credentials, and contact cards with PNG/SVG export.',
    keywords: ['qr code', 'barcode', 'scan', 'wifi', 'url', 'link', 'download png', 'svg', 'contact'],
    icon: 'QrCode',
    guidance: {
      overview: 'Generate customized QR codes with flexible content types, error correction levels, and PNG/SVG export.',
      tips: [
        'For Wi-Fi sharing, select the Wi-Fi type so guests can scan to join automatically.',
        'Choose Error Correction Level Q or H if the code will be printed on outdoor signs or textured surfaces.',
        'Ensure strong visual contrast between the foreground and background colors.'
      ],
      disclaimer: 'Generated codes are encoded as provided. Always verify scan accuracy before printing.'
    }
  },

  // 13. Multi-Version Sophisticated Calculator
  {
    id: 'calculator',
    name: 'Multi-Version Tactile Calculator',
    category: 'math',
    categoryLabel: 'Mathematics & Science',
    description: 'Sophisticated 4-mode calculator: Elementary 4-operation arithmetic for kids, advanced Scientific (trig, power, log, rad/deg, factorial), Programmer bitwise with 32-bit interactive toggle matrix (HEX, DEC, OCT, BIN), and Financial Loan & Amortization schedule.',
    shortSummary: 'Elementary (4-op), Scientific (trig/log), Programmer (HEX/BIN matrix), and Loan Amortization.',
    keywords: ['calculator', 'scientific', 'programmer', 'bitwise', 'hex', 'binary', 'amortization', 'loan', 'mortgage', 'sin', 'cos', 'matrix'],
    icon: 'Calculator',
    isNew: true,
    guidance: {
      overview: 'Four specialized calculation engines tailored from young elementary learners up to software programmers and financial analysts.',
      tips: [
        'Use the Elementary tab for clean large-button arithmetic and kid-friendly homework math.',
        'Switch to Scientific for trigonometry, radian/degree angles, logarithms, factorials, and powers.',
        'Use Programmer mode to inspect concurrent HEX, DEC, OCT, and BIN values, or click individual bits in the 32-bit matrix to flip them in real time.',
        'Use Loan & Amortization to calculate monthly mortgage/loan payments, total interest costs, and inspect monthly repayment schedules.'
      ]
    }
  },

  // 14. Color Picker & Contrast Checker
  {
    id: 'color-picker',
    name: 'Color Studio & Contrast Checker',
    category: 'everyday',
    categoryLabel: 'Design & Accessibility',
    description: 'Inspect and convert colors across HEX, RGB, HSL, and CMYK formats. Generate 10-step tonal shades and verify WCAG 2.1 accessibility contrast compliance.',
    shortSummary: 'Color format conversions, tonal shades (50-900), and WCAG AA/AAA contrast ratios.',
    keywords: ['color', 'hex', 'rgb', 'hsl', 'cmyk', 'contrast', 'wcag', 'accessibility', 'palette', 'shades'],
    icon: 'Palette',
    guidance: {
      overview: 'A color studio for designers, students, and developers with WCAG 2.1 accessibility checks.',
      tips: [
        'Click any format row (HEX, RGB, HSL, CMYK) to copy its CSS value.',
        'The WCAG module tests contrast against white (#FFFFFF) and dark slate (#0F172A).',
        'WCAG AA requires at least 4.5:1 for regular text and 3:1 for large text.'
      ]
    }
  },

  // 15. Video & Audio Transcription and Notes Taking (YouTube, Facebook, Vimeo, TikTok, etc.)
  {
    id: 'video-transcription-notes',
    name: 'Video Transcriber & Study Notes',
    category: 'learning',
    categoryLabel: 'Learning & Productivity',
    description: 'Transcribe YouTube, Facebook, TikTok, Vimeo, and web video URLs, or upload audio files. Generates timestamped verbatim transcripts and structured study notes.',
    shortSummary: 'YouTube, Facebook, and video URL transcription with timestamps and study notes.',
    keywords: ['transcribe', 'transcription', 'youtube', 'facebook', 'tiktok', 'vimeo', 'video transcription', 'subtitles', 'captions', 'lecture notes', 'speech to text'],
    icon: 'Video',
    isNew: true,
    guidance: {
      overview: 'Transcribe educational videos from YouTube, Facebook, TikTok, or Vimeo, plus local audio files and live lectures.',
      tips: [
        'Paste any public video link from YouTube, Facebook, TikTok, or Vimeo to extract timestamped dialogue and chapters.',
        'Use the interactive timestamp buttons to jump directly to key lecture moments and demonstrations.',
        'Click "Generate Structured Study Notes" to organize the video into executive summaries, key vocabulary, and interactive flashcards.',
        'Export transcripts as plain text (.txt) or subtitle files (.vtt), and export study notes as Markdown (.md).'
      ]
    }
  },

  // 16. BioScience & Molecular Genetics Workbench
  {
    id: 'bioscience-genetics',
    name: 'BioScience & Genetics Workbench',
    category: 'science',
    categoryLabel: 'Science & Molecular Biology',
    description: 'Central Dogma DNA-to-mRNA transcription, 64-codon amino acid translation, reverse complement, GC content, melting temperature (Tm), PubChem small molecule explorer with Lipinski Rule of 5, and AlphaFold pLDDT structural confidence reference.',
    shortSummary: 'Central dogma translation, oligonucleotide biophysics, PubChem small molecules, and AlphaFold pLDDT.',
    keywords: ['dna', 'rna', 'genetics', 'codons', 'amino acid', 'pubchem', 'lipinski', 'melting temperature', 'alphafold', 'plddt', 'molecular biology', 'biochemistry'],
    icon: 'Dna',
    isNew: true,
    guidance: {
      overview: 'A molecular genetics and chemical biology workbench for students, educators, and life-science researchers.',
      tips: [
        'Enter any 5′ → 3′ DNA nucleotide sequence to observe real-time mRNA transcription and peptide translation.',
        'Inspect calculated oligonucleotide biophysical metrics including GC percentage, Marmur-Doty/Wallace melting temperature (Tm), and molecular weight.',
        'Search PubChem to view 2D chemical structure diagrams, SMILES strings, and test drug-likeness against Lipinski’s Rule of 5.',
        'Consult the AlphaFold per-residue pLDDT confidence scale for structural biology predictions.'
      ]
    }
  },

  // 17. Chemistry Lab & Periodic Suite
  {
    id: 'chemistry-suite',
    name: 'Chemistry Lab & Periodic Suite',
    category: 'science',
    categoryLabel: 'Chemistry & Laboratory Science',
    description: 'Complete workspace for chemists and chemistry students: Interactive 118-element Periodic Table with electron configs and states, Molar Mass and Empirical Formula parser with elemental mass composition, Solution Preparation and Dilution (M₁V₁=M₂V₂), pH/pOH equilibrium and Henderson-Hasselbalch buffer solver, and Ideal Gas Law (PV=nRT).',
    shortSummary: 'Periodic table, molar mass parser, solution dilution (M₁V₁=M₂V₂), pH equilibrium, and ideal gas law.',
    keywords: ['chemistry', 'periodic table', 'elements', 'molar mass', 'dilution', 'molarity', 'solution', 'ph', 'buffer', 'henderson hasselbalch', 'ideal gas', 'atoms', 'molecules', 'gas law'],
    icon: 'FlaskConical',
    isNew: true,
    guidance: {
      overview: 'Dedicated toolkit for chemical calculations, quantitative laboratory solution prep, acid-base equilibrium, and elemental analysis.',
      tips: [
        'Use the Periodic Table tab to filter by element category (alkali, transition, halogens, noble gases) and inspect electron configurations.',
        'Enter any chemical formula in Molar Mass to inspect atomic weight and mass fraction.',
        'Use the Solutions tab to calculate required solute mass in grams or solve stock dilutions.',
        'Use the pH & Buffer tab to interconvert pH, pOH, and [H⁺], or solve buffer equilibria.',
        'Solve for Pressure, Volume, Moles, or Temperature under the Ideal Gas Law (PV = nRT).'
      ]
    }
  },

  // 18. Interactive Chemistry & Physics Visualizer
  {
    id: 'science-visualizer',
    name: 'Chemistry & Physics Dynamic Visualizer',
    category: 'science',
    categoryLabel: 'Science & Physics Simulation',
    description: 'Interactive concept visualizer: enter real-world situations, adjust variables with sliders, inspect live 2D canvas simulations and trajectory graphs, follow step-by-step calculations with units, and evaluate theoretical assumptions versus real-world limitations (air drag, heat loss, and non-ideal conditions).',
    shortSummary: 'Interactive simulations: projectile drag, pendulum motion, Arrhenius kinetics, Van der Waals gas, and calorimetry.',
    keywords: ['visualizer', 'simulation', 'physics', 'chemistry', 'projectile', 'pendulum', 'arrhenius', 'real gas', 'calorimetry', 'drag', 'canvas', 'animation', 'heat loss'],
    icon: 'Activity',
    isNew: true,
    guidance: {
      overview: 'Bridges textbook equations with real-world laboratory realities by animating concepts dynamically and explaining why physical experiments diverge from idealized formulas.',
      tips: [
        'Select a concept (Projectile Motion, Simple Pendulum, Arrhenius Kinetics, Real Gas, or Calorimetry).',
        'Enter your real-world experiment scenario and adjust variable sliders in real-time.',
        'Observe how the idealized mathematical curve behaves compared against real-world dampening factors.',
        'Review the Assumptions vs. Real-World Divergence diagnostic panels to understand measurement errors and non-ideal effects.'
      ]
    }
  },

  // 19. Multi-Language Compiler & Interactive IDE
  {
    id: 'code-compiler',
    name: 'Multi-Language Compiler & IDE',
    category: 'learning',
    categoryLabel: 'Computer Science & Programming',
    description: 'Interactive multi-language compiler and code editor for Python, C, C++, JavaScript, TypeScript, Rust, SQL, and HTML. Features live sandbox execution, x86_64 assembly output, relational query plans, and AI algorithm explanations.',
    shortSummary: 'Multi-language compiler & editor for Python, C, C++, JS, TS, Rust, and SQL with assembly inspector.',
    keywords: ['compiler', 'code editor', 'python', 'c', 'cpp', 'javascript', 'typescript', 'rust', 'sql', 'ide', 'programming', 'assembly', 'algorithms'],
    icon: 'Code',
    isNew: true,
    guidance: {
      overview: 'A complete multi-language software engineering workbench with syntax-highlighted editors, compilation stages, and terminal runtimes.',
      tips: [
        'Switch between Python, JavaScript, TypeScript, C, C++, Rust, SQL, and HTML using the top language tabs.',
        'Use the algorithm templates dropdown to load common patterns like Sieve of Eratosthenes, QuickSort, or pointer manipulation.',
        'Inspect the Assembly / Transpiled tab to see generated x86_64 assembly (for C/C++/Rust) or stripped JavaScript (for TypeScript).',
        'Use the stdin drawer to provide mock inputs for programs using input(), scanf, or std::cin.'
      ]
    }
  },

  // 20. Flow CV & Cover Letter Builder
  {
    id: 'cv-cover-letter-builder',
    name: 'Flow CV & Cover Letter Builder',
    category: 'everyday',
    categoryLabel: 'Career & Everyday Tools',
    description: 'Professional CV and Cover Letter builder supporting Flow CV dual-column sidebar style, Executive, Modern Tech, Academic STEM, and Creative formats. Features live interactive previews, native PDF print stylesheets, ATS-friendly plain text generator, and local JSON backup.',
    shortSummary: 'Build Flow CV & custom cover letters with live preview, ATS export, and native PDF printing.',
    keywords: ['cv', 'resume', 'cover letter', 'flow cv', 'curriculum vitae', 'job application', 'ats resume', 'career', 'pdf resume', 'portfolio', 'flowcv'],
    icon: 'Briefcase',
    isNew: true,
    guidance: {
      overview: 'Create job-winning resumes and matched cover letters with zero sign-up, zero tracking, and complete privacy.',
      tips: [
        'Switch between "Curriculum Vitae (CV)" and "Cover Letter" using the top mode toggle.',
        'Choose the "Flow CV" style for modern dual-column formatting with an accented left sidebar and clean timeline nodes.',
        'Click "Print / PDF" to trigger the browser\'s native high-resolution vector PDF generator with dedicated print stylesheets.',
        'Use "ATS Text" to copy a plain-text version optimized for Applicant Tracking Systems with clean section delimiters.',
        'Save your work anytime with "Export JSON" and restore it seamlessly later with "Import".'
      ]
    }
  },

  // 21. Gemini API Key & Model Access
  {
    id: 'gemini-api-access',
    name: 'Gemini API Key & Model Access',
    category: 'learning',
    categoryLabel: 'Computer Science & AI',
    description: 'Verified security guide, project quota reference, and architecture checklist for Google AI Studio Gemini API keys. Learn safe server-side calling, model capabilities, rate limits, and key protection.',
    shortSummary: 'Google AI Studio key setup, model access limits, server proxy architecture, and security checklist.',
    keywords: ['gemini api key', 'google ai studio', 'gemini models', 'api key security', 'gemini quotas', 'ai studio apikey', 'gemini rate limits', 'secure api key'],
    icon: 'Key',
    isNew: true,
    actionHeading: 'Free Guide: Gemini API Key & Model Access in Google AI Studio',
    twoSentenceLead: 'Comprehensive guide and security checklist for creating and managing Google AI Studio Gemini API keys. Learn how project quotas, model availability, and server-side secret protection work.',
    guidance: {
      overview: 'Actionable developer reference for Google AI Studio API keys, model quotas, and server-side integration.',
      tips: [
        'Google controls all API keys, token allocations, and rate limits via Google Cloud Projects.',
        'Never paste or store an API key into web browsers or client bundles; always call Gemini through a backend proxy.',
        'Use the official Google AI Studio key manager at https://aistudio.google.com/app/apikey to create and revoke keys.',
        'Monitor quota limits (RPM, TPM, RPD) and set billing alerts in Google Cloud Console to avoid unexpected service interruptions.'
      ]
    }
  },

  // 22. Universal File Converter
  {
    id: 'universal-file-converter',
    name: 'Universal File Converter',
    category: 'everyday',
    categoryLabel: 'Everyday Tools & Utilities',
    description: 'Convert any file to any other format 100% client-side in your browser. Seamlessly transform PNG, JPG, WebP, SVG, ICO, CSV, JSON, XML, YAML, Markdown, HTML, Audio WAV, and SQL with total privacy.',
    shortSummary: 'Convert images, data tables, documents, audio, and code across formats client-side.',
    keywords: ['file converter', 'convert png to jpg', 'csv to json', 'json to csv', 'image converter', 'webp to png', 'svg to png', 'json to yaml', 'markdown to html', 'audio converter', 'universal converter'],
    icon: 'ArrowRightLeft',
    isNew: true,
    actionHeading: 'Free Online Universal File Converter – 100% Client-Side',
    twoSentenceLead: 'Convert images, data tables, documents, audio, and code between formats instantly in your browser. 100% private client-side conversion with zero file uploads or size limits.',
    guidance: {
      overview: 'Universal client-side file transformation suite supporting image compression, data format interchange, and audio extraction.',
      tips: [
        'Drag and drop any file to auto-detect its format and view all compatible conversion targets.',
        'Convert images between PNG, JPEG, WebP, SVG, and ICO with adjustable quality and dimension limits.',
        'Transform spreadsheet data between CSV, TSV, JSON, XML, YAML, and SQL INSERT statements.',
        'Extract uncompressed 16-bit PCM WAV audio from media streams or video files completely in-browser.'
      ]
    }
  },

  // 19. Islamic Tools & Calculators Suite
  {
    id: 'islamic-tools-suite',
    name: 'Islamic Tools & Calculators Suite',
    category: 'everyday',
    categoryLabel: 'Everyday Tools & Utilities',
    description: 'Calculate Zakat al-Mal, Miras inheritance, Qibla compass, prayer times, digital tasbeeh, Hijri calendar, and halal food E-numbers with total privacy.',
    shortSummary: 'Zakat, Miras inheritance, Qibla finder, prayer times, tasbeeh, and halal E-codes.',
    keywords: [
      'zakat calculator',
      'miras calculator',
      'islamic inheritance',
      'qibla finder',
      'qibla compass',
      'prayer times',
      'digital tasbeeh',
      'hijri calendar',
      'halal food',
      'e numbers',
      'fitrana calculator',
      'faraid calculator'
    ],
    icon: 'Compass',
    isNew: true,
    actionHeading: 'Free Online Islamic Tools, Zakat, Miras & Qibla Suite',
    twoSentenceLead: 'Calculate Zakat al-Mal, Miras inheritance shares, Qibla compass direction, and astronomical prayer times 100% in your browser. Complete privacy with zero server uploads and verified classical Islamic jurisprudence.',
    guidance: {
      overview: 'Comprehensive suite of Islamic calculators and daily utilities designed for faithful precision, zero data collection, and authentic jurisprudence.',
      tips: [
        'Zakat al-Mal: Use the Silver standard Nisab (612.36g) to maximize benefit to the needy, or the Gold standard (87.48g).',
        'Miras: Enter surviving relatives to calculate Quranic fixed shares (Ashab al-Furud) and automatic Awl/Radd adjustments.',
        'Qibla: Allow browser GPS or pick your city to view exact bearing degrees and distance to the Kaaba in Makkah.',
        'Prayer Times: Choose your preferred juristic method for Asr (Standard 1:1 vs Hanafi 2:1) and international conventions.'
      ]
    }
  },

  // 20. Bilingual Exam Paper Generator
  {
    id: 'bilingual-exam-generator',
    name: 'Bilingual Exam Paper Generator',
    category: 'learning',
    categoryLabel: 'Learning Lab & Education',
    description: 'Create, customize, and print bilingual examination papers with English on left and Urdu on right. Includes OMR bubble sheets, Math symbols, question bank, and instant A4 PDF export.',
    shortSummary: 'Bilingual (English/Urdu) board exam paper builder with OMR sheets and A4 print layout.',
    keywords: [
      'exam paper generator',
      'bilingual exam paper',
      'urdu english test maker',
      'board exam paper',
      'omr sheet generator',
      'matric paper maker',
      '9th class math paper',
      '10th class paper',
      'test paper generator',
      'question paper maker'
    ],
    icon: 'GraduationCap',
    isNew: true,
    actionHeading: 'Free Online Bilingual Exam Paper Generator (English & Urdu)',
    twoSentenceLead: 'Generate and print standard bilingual board examination papers with English and Urdu side-by-side, complete with OMR bubble answer grids, short questions, and long questions. 100% free, customizable, and formatted for exact A4 paper printing.',
    guidance: {
      overview: 'Specialized bilingual exam paper creation suite designed for teachers, academies, and examiners adhering to standard Pakistan Board (BISE / FBISE) examination formats.',
      tips: [
        'Print View: Use the "Print A4 Paper" button to print or save a pixel-perfect PDF with exact margins and page breaks.',
        'OMR Sheet: Enable or disable the OMR bubble response grid on Page 1 for objective tests.',
        'Presets: 1-click load model papers including the exact 9th Class Math Unit 1 board exam.',
        'Math & Urdu Tools: Use the quick symbol toolbar to insert radicals (√), exponents (x²), Greek letters (π, θ), and common Urdu question stems.'
      ]
    }
  }
];

export const CATEGORIES: { id: ToolCategory; label: string }[] = [
  { id: 'all', label: 'All Tools' },
  { id: 'everyday', label: 'Everyday Tools' },
  { id: 'math', label: 'Mathematics & Conversion' },
  { id: 'science', label: 'Science & Physics' },
  { id: 'learning', label: 'Learning Lab' },
];
