export type CVStyleId = 'flow-cv' | 'executive' | 'modern-tech' | 'academic-stem' | 'creative';

export type CVColorId = 'indigo' | 'slate' | 'emerald' | 'sky' | 'violet' | 'amber' | 'rose';

export interface CVColorConfig {
  id: CVColorId;
  name: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accentBg: string;
  badgeBg: string;
  badgeText: string;
  border: string;
}

export const CV_COLORS: Record<CVColorId, CVColorConfig> = {
  indigo: {
    id: 'indigo',
    name: 'Royal Indigo',
    primary: '#4f46e5',
    primaryDark: '#3730a3',
    primaryLight: '#818cf8',
    accentBg: '#eef2ff',
    badgeBg: '#e0e7ff',
    badgeText: '#3730a3',
    border: '#c7d2fe',
  },
  slate: {
    id: 'slate',
    name: 'Executive Slate',
    primary: '#334155',
    primaryDark: '#0f172a',
    primaryLight: '#64748b',
    accentBg: '#f8fafc',
    badgeBg: '#f1f5f9',
    badgeText: '#1e293b',
    border: '#cbd5e1',
  },
  emerald: {
    id: 'emerald',
    name: 'Forest Emerald',
    primary: '#059669',
    primaryDark: '#064e3b',
    primaryLight: '#34d399',
    accentBg: '#ecfdf5',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    border: '#a7f3d0',
  },
  sky: {
    id: 'sky',
    name: 'Ocean Sky',
    primary: '#0284c7',
    primaryDark: '#0369a1',
    primaryLight: '#38bdf8',
    accentBg: '#f0f9ff',
    badgeBg: '#e0f2fe',
    badgeText: '#075985',
    border: '#bae6fd',
  },
  violet: {
    id: 'violet',
    name: 'Modern Violet',
    primary: '#7c3aed',
    primaryDark: '#5b21b6',
    primaryLight: '#a78bfa',
    accentBg: '#f5f3ff',
    badgeBg: '#ede9fe',
    badgeText: '#5b21b6',
    border: '#ddd6fe',
  },
  amber: {
    id: 'amber',
    name: 'Warm Amber',
    primary: '#d97706',
    primaryDark: '#92400e',
    primaryLight: '#fbbf24',
    accentBg: '#fffbeb',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    border: '#fde68a',
  },
  rose: {
    id: 'rose',
    name: 'Crimson Rose',
    primary: '#e11d48',
    primaryDark: '#9f1239',
    primaryLight: '#fb7185',
    accentBg: '#fff1f2',
    badgeBg: '#ffe4e6',
    badgeText: '#9f1239',
    border: '#fecdd3',
  },
};

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  details?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  link?: string;
  description: string;
  highlights: string[];
  techStack: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Proficient' | 'Intermediate' | 'Conversational';
}

export interface CVProfile {
  personal: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
    summary: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}

export interface CoverLetterData {
  sender: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  recipient: {
    hiringManager: string;
    managerTitle: string;
    companyName: string;
    department?: string;
    street?: string;
    cityStateZip?: string;
  };
  date: string;
  jobTitle: string;
  jobReference?: string;
  salutation: string;
  paragraphs: string[];
  signOff: string;
  enclosures?: string;
}

// -------------------------------------------------------------
// Sample Profiles
// -------------------------------------------------------------

export const SAMPLE_TECH_PROFILE: CVProfile = {
  personal: {
    fullName: 'Elena Rostova',
    title: 'Senior Full-Stack & Distributed Systems Engineer',
    email: 'elena.rostova@example.com',
    phone: '+1 (415) 890-2341',
    location: 'San Francisco, CA (Remote Eligible)',
    website: 'https://elenarostova.dev',
    linkedin: 'linkedin.com/in/elena-rostova',
    github: 'github.com/erostova',
    summary:
      'Distinguished Full-Stack Software Engineer with 7+ years architecting high-throughput distributed applications, TypeScript/React single-page applications, and edge microservices. Proven track record reducing API latency by 42% and driving zero-downtime migrations serving 4.5M monthly active users.',
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Staff Software Engineer',
      company: 'Aether Cloud Systems',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected real-time streaming data ingestion pipeline using TypeScript, WebSockets, and Redis Streams processing 140,000 events/sec.',
        'Mentored a team of 9 engineers across frontend and platform divisions, introducing automated CI/CD and strict type verification.',
        'Reduced 99th-percentile client dashboard rendering time from 1.4s to 320ms using React concurrency and memoized computation pipelines.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Senior Frontend Engineer',
      company: 'Synthetix Analytics',
      location: 'Seattle, WA',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Built interactive SVG and WebGL telemetry charts visualizing 50M historical metric points with 60 FPS viewport zooming.',
        'Authored modular component library adopted across 14 internal engineering teams, standardizing accessibility (WCAG 2.1 AA) and theming.',
        'Spearheaded client-side offline cache synchronizer with IndexedDB, saving 25% redundant API requests for field technicians.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Software Engineer',
      company: 'Vector Labs',
      location: 'Boston, MA',
      startDate: '2017-08',
      endDate: '2019-05',
      current: false,
      bullets: [
        'Developed REST & GraphQL services in Node.js and Go for user permission management across 350+ enterprise customer tenants.',
        'Optimized PostgreSQL database queries and indexes, decreasing slow database transactions by 65%.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science (Summa Cum Laude)',
      institution: 'Carnegie Mellon University',
      location: 'Pittsburgh, PA',
      startDate: '2013-09',
      endDate: '2017-05',
      gpa: '3.92 / 4.0',
      details: 'Specialization in Distributed Systems & Algorithmic Design. Dean\'s List (All Semesters).',
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: 'Languages & Core',
      items: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Go', 'SQL (PostgreSQL)', 'HTML5 / CSS3'],
    },
    {
      id: 'sk-2',
      category: 'Frameworks & Frontend',
      items: ['React 18 / 19', 'Next.js', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'WebSockets', 'WebGL'],
    },
    {
      id: 'sk-3',
      category: 'Cloud & Infrastructure',
      items: ['Docker', 'Kubernetes', 'AWS (Lambda, S3, RDS)', 'Redis', 'CI/CD Pipelines', 'GraphQL'],
    },
    {
      id: 'sk-4',
      category: 'Practices & Standards',
      items: ['Micro-frontends', 'System Architecture', 'Zero-Downtime Deployments', 'WCAG 2.1 AA', 'TDD (Jest, Vitest)'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniStream Visualizer',
      role: 'Author & Maintainer',
      link: 'https://github.com/erostova/omnistream',
      description: 'Open-source distributed pipeline visualizer with live DAG node graph editing.',
      highlights: [
        'Surpassed 2,400 GitHub stars and 80,000 npm downloads.',
        'Engineered zero-dependency WebGL renderer supporting 10,000 simultaneous live nodes.',
      ],
      techStack: ['TypeScript', 'React', 'WebGL', 'Canvas API'],
    },
    {
      id: 'proj-2',
      name: 'FastSchema DB Validator',
      role: 'Lead Developer',
      link: 'https://github.com/erostova/fast-schema',
      description: 'High-speed relational schema validator and diff engine comparing live PostgreSQL tables to TypeScript definitions.',
      highlights: [
        'Sub-millisecond verification time using AST bytecode analysis.',
      ],
      techStack: ['TypeScript', 'Node.js', 'PostgreSQL'],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation',
      date: '2022',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'French', proficiency: 'Fluent' },
    { id: 'lang-3', language: 'German', proficiency: 'Conversational' },
  ],
};

export const SAMPLE_TECH_COVER_LETTER: CoverLetterData = {
  sender: {
    fullName: 'Elena Rostova',
    title: 'Senior Full-Stack & Distributed Systems Engineer',
    email: 'elena.rostova@example.com',
    phone: '+1 (415) 890-2341',
    location: 'San Francisco, CA (Remote Eligible)',
    linkedin: 'linkedin.com/in/elena-rostova',
    website: 'https://elenarostova.dev',
  },
  recipient: {
    hiringManager: 'Marcus Vance',
    managerTitle: 'VP of Engineering',
    companyName: 'Apex Cloud Technologies',
    department: 'Platform Architecture Team',
    street: '100 Montgomery St, Suite 1800',
    cityStateZip: 'San Francisco, CA 94104',
  },
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  jobTitle: 'Principal Frontend / Distributed Systems Engineer',
  jobReference: 'REQ-2026-CLOUD-99',
  salutation: 'Dear Mr. Vance and the Apex Cloud Search Committee,',
  paragraphs: [
    'I am writing to express my enthusiastic candidacy for the Principal Frontend / Distributed Systems Engineer position at Apex Cloud Technologies. With over seven years of specialized experience designing low-latency client architectures, resilient event-streaming microservices, and design systems serving millions of daily users, I have long admired Apex Cloud\'s commitment to performance and developer developer ergonomics.',
    'At Aether Cloud Systems, I led the architecture of our high-concurrency analytics dashboard, handling over 140,000 real-time events per second. By rethinking client state synchronization and optimizing rendering cycles via React concurrency and WebSockets, my team slashed p99 latency by 42% while simultaneously cutting client memory overhead. Furthermore, my commitment to mentoring 9 cross-functional engineers helped elevate our team\'s deployment frequency by 3x.',
    'Apex Cloud\'s recent transition to edge microservices and unified frontend telemetry aligns seamlessly with my technical background in TypeScript, WebGL visualization, and zero-downtime migrations. I take deep pride in building interfaces that are not only blazingly fast and accessible (WCAG 2.1 AA) but also structurally resilient under heavy production load.',
    'Thank you for your time and consideration. I would welcome the opportunity to discuss how my systems design philosophy and passion for engineering excellence can help accelerate Apex Cloud\'s next chapter of scale.',
  ],
  signOff: 'Sincerely,',
  enclosures: 'Enclosure: Curriculum Vitae, GitHub Portfolio, Technical Publications',
};

export const SAMPLE_RESEARCH_PROFILE: CVProfile = {
  personal: {
    fullName: 'Dr. Aris Thorne',
    title: 'Research Scientist & Computational Physicist',
    email: 'aris.thorne@lab.edu',
    phone: '+1 (617) 555-0198',
    location: 'Cambridge, MA',
    website: 'https://thorne-research.org',
    linkedin: 'linkedin.com/in/aris-thorne',
    github: 'github.com/athorne-physics',
    summary:
      'Doctor of Philosophy in Theoretical & Computational Physics with 6+ years modeling non-equilibrium thermodynamics, stochastic particle kinetics, and large-scale Monte Carlo lattice simulations. Author of 11 peer-reviewed papers in high-impact physical chemistry journals.',
  },
  experience: [
    {
      id: 'res-1',
      role: 'Postdoctoral Research Fellow',
      company: 'Center for Nanoscale Systems, Harvard University',
      location: 'Cambridge, MA',
      startDate: '2023-01',
      endDate: 'Present',
      current: true,
      bullets: [
        'Developed MPI/OpenMP-accelerated molecular dynamics simulation algorithms modeling molecular drag under non-ideal boundary layers.',
        'Secured $420,000 NSF computational research grant for non-equilibrium phase transition modeling.',
        'Mentored 4 graduate research assistants in numerical differential equation solvers and Python scientific toolkits (NumPy, SciPy).',
      ],
    },
    {
      id: 'res-2',
      role: 'Doctoral Researcher',
      company: 'Department of Physics, MIT',
      location: 'Cambridge, MA',
      startDate: '2018-09',
      endDate: '2022-12',
      current: false,
      bullets: [
        'Formulated analytical equations for chemical kinetics under Arrhenius temperature shifts and spatial non-homogeneity.',
        'Published 8 peer-reviewed research papers in the Journal of Chemical Physics and Physical Review E.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-res-1',
      degree: 'Ph.D. in Theoretical Physics',
      institution: 'Massachusetts Institute of Technology',
      location: 'Cambridge, MA',
      startDate: '2018-09',
      endDate: '2022-12',
      gpa: '4.00 / 4.00',
      details: 'Dissertation: "Stochastic Dynamics and Kinetic Barrier Crossing in Macromolecular Solvation".',
    },
    {
      id: 'edu-res-2',
      degree: 'B.S. in Applied Mathematics & Physics',
      institution: 'University of Chicago',
      location: 'Chicago, IL',
      startDate: '2014-09',
      endDate: '2018-06',
      gpa: '3.95 / 4.00',
      details: 'Phi Beta Kappa, Honors Thesis in Non-Linear Dynamics.',
    },
  ],
  skills: [
    {
      id: 'sk-res-1',
      category: 'Theoretical Modeling',
      items: ['Statistical Mechanics', 'Kinetic Theory', 'Thermodynamics', 'Differential Equations', 'Stochastic Processes'],
    },
    {
      id: 'sk-res-2',
      category: 'Scientific Computing',
      items: ['Python (NumPy, SciPy, JAX)', 'C++ (C++17/20)', 'Fortran', 'CUDA', 'MPI', 'Git', 'LaTeX'],
    },
    {
      id: 'sk-res-3',
      category: 'Data Analysis & Visuals',
      items: ['Matplotlib', 'Plotly', 'VMD', 'GROMACS', 'Bayesian Parameter Estimation', 'Monte Carlo Methods'],
    },
  ],
  projects: [
    {
      id: 'proj-res-1',
      name: 'SimKinetics-Engine',
      role: 'Principal Investigator',
      link: 'https://github.com/athorne-physics/simkinetics',
      description: 'High-performance C++ solver for multi-step chemical reaction networks with stiff differential equations.',
      highlights: [
        'Benchmarked 8x faster than standard CVODE integrators for combustion kinetics.',
      ],
      techStack: ['C++', 'OpenMP', 'Python Bindings'],
    },
  ],
  certifications: [
    {
      id: 'cert-res-1',
      name: 'NSF Computational Science Fellowship',
      issuer: 'National Science Foundation',
      date: '2020',
    },
  ],
  languages: [
    { id: 'lang-res-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-res-2', language: 'German', proficiency: 'Fluent' },
  ],
};

export const SAMPLE_BLANK_PROFILE: CVProfile = {
  personal: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

// -------------------------------------------------------------
// Plain-text ATS Generator
// -------------------------------------------------------------

export function generatePlainTextATS(profile: CVProfile): string {
  const lines: string[] = [];
  const { personal, experience, education, skills, projects, certifications, languages } = profile;

  lines.push('======================================================================');
  lines.push((personal.fullName || 'YOUR NAME').toUpperCase());
  if (personal.title) lines.push(personal.title);
  lines.push('======================================================================');

  const contactPieces: string[] = [];
  if (personal.email) contactPieces.push(`Email: ${personal.email}`);
  if (personal.phone) contactPieces.push(`Phone: ${personal.phone}`);
  if (personal.location) contactPieces.push(`Location: ${personal.location}`);
  if (personal.linkedin) contactPieces.push(`LinkedIn: ${personal.linkedin}`);
  if (personal.github) contactPieces.push(`GitHub: ${personal.github}`);
  if (personal.website) contactPieces.push(`Website: ${personal.website}`);

  if (contactPieces.length > 0) {
    lines.push(contactPieces.join(' | '));
    lines.push('');
  }

  if (personal.summary) {
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('----------------------------------------------------------------------');
    lines.push(personal.summary);
    lines.push('');
  }

  if (experience.length > 0) {
    lines.push('PROFESSIONAL EXPERIENCE');
    lines.push('----------------------------------------------------------------------');
    experience.forEach((exp) => {
      const dates = `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      lines.push(`${exp.role} | ${exp.company} | ${exp.location} | ${dates}`);
      exp.bullets.forEach((bullet) => {
        lines.push(`  * ${bullet}`);
      });
      lines.push('');
    });
  }

  if (education.length > 0) {
    lines.push('EDUCATION');
    lines.push('----------------------------------------------------------------------');
    education.forEach((edu) => {
      lines.push(`${edu.degree} - ${edu.institution}, ${edu.location} (${edu.startDate} - ${edu.endDate})`);
      if (edu.gpa) lines.push(`  GPA: ${edu.gpa}`);
      if (edu.details) lines.push(`  Details: ${edu.details}`);
      lines.push('');
    });
  }

  if (skills.length > 0) {
    lines.push('SKILLS & EXPERTISE');
    lines.push('----------------------------------------------------------------------');
    skills.forEach((sk) => {
      lines.push(`${sk.category}: ${sk.items.join(', ')}`);
    });
    lines.push('');
  }

  if (projects.length > 0) {
    lines.push('KEY PROJECTS');
    lines.push('----------------------------------------------------------------------');
    projects.forEach((proj) => {
      lines.push(`${proj.name} (${proj.role})`);
      if (proj.link) lines.push(`  Link: ${proj.link}`);
      if (proj.description) lines.push(`  Description: ${proj.description}`);
      if (proj.techStack && proj.techStack.length > 0) {
        lines.push(`  Tech Stack: ${proj.techStack.join(', ')}`);
      }
      proj.highlights.forEach((h) => {
        lines.push(`  * ${h}`);
      });
      lines.push('');
    });
  }

  if (certifications.length > 0) {
    lines.push('CERTIFICATIONS & HONORS');
    lines.push('----------------------------------------------------------------------');
    certifications.forEach((c) => {
      lines.push(`* ${c.name} - ${c.issuer} (${c.date})`);
    });
    lines.push('');
  }

  if (languages.length > 0) {
    lines.push('LANGUAGES');
    lines.push('----------------------------------------------------------------------');
    lines.push(languages.map((l) => `${l.language} (${l.proficiency})`).join(', '));
    lines.push('');
  }

  return lines.join('\n');
}

export function generateCoverLetterPlainText(letter: CoverLetterData): string {
  const lines: string[] = [];
  lines.push(letter.sender.fullName);
  lines.push(letter.sender.title);
  lines.push(`${letter.sender.email} | ${letter.sender.phone} | ${letter.sender.location}`);
  if (letter.sender.linkedin) lines.push(`LinkedIn: ${letter.sender.linkedin}`);
  lines.push('');
  lines.push(letter.date);
  lines.push('');
  lines.push(letter.recipient.hiringManager);
  lines.push(letter.recipient.managerTitle);
  lines.push(letter.recipient.companyName);
  if (letter.recipient.department) lines.push(letter.recipient.department);
  if (letter.recipient.street) lines.push(letter.recipient.street);
  if (letter.recipient.cityStateZip) lines.push(letter.recipient.cityStateZip);
  lines.push('');
  lines.push(`RE: Application for ${letter.jobTitle}${letter.jobReference ? ` (Ref: ${letter.jobReference})` : ''}`);
  lines.push('');
  lines.push(letter.salutation);
  lines.push('');
  letter.paragraphs.forEach((p) => {
    lines.push(p);
    lines.push('');
  });
  lines.push(letter.signOff);
  lines.push(letter.sender.fullName);
  if (letter.enclosures) {
    lines.push('');
    lines.push(letter.enclosures);
  }
  return lines.join('\n');
}

export function exportCVToJson(profile: CVProfile, letter: CoverLetterData): string {
  return JSON.stringify(
    {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile,
      coverLetter: letter,
    },
    null,
    2
  );
}

export function importCVFromJson(jsonString: string): { profile: CVProfile; letter: CoverLetterData } | null {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') return null;
    const profile = data.profile || data;
    if (!profile.personal) return null;
    return {
      profile: {
        personal: {
          fullName: profile.personal?.fullName || '',
          title: profile.personal?.title || '',
          email: profile.personal?.email || '',
          phone: profile.personal?.phone || '',
          location: profile.personal?.location || '',
          website: profile.personal?.website || '',
          linkedin: profile.personal?.linkedin || '',
          github: profile.personal?.github || '',
          summary: profile.personal?.summary || '',
        },
        experience: Array.isArray(profile.experience) ? profile.experience : [],
        education: Array.isArray(profile.education) ? profile.education : [],
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        projects: Array.isArray(profile.projects) ? profile.projects : [],
        certifications: Array.isArray(profile.certifications) ? profile.certifications : [],
        languages: Array.isArray(profile.languages) ? profile.languages : [],
      },
      letter: data.coverLetter || SAMPLE_TECH_COVER_LETTER,
    };
  } catch {
    return null;
  }
}
