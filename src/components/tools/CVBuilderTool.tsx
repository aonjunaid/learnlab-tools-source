import React, { useState, useRef } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Download,
  Upload,
  Plus,
  Trash2,
  Check,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  User,
  Wrench,
  Globe,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Award,
  Languages,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import {
  CVProfile,
  CoverLetterData,
  CVStyleId,
  CVColorId,
  CV_COLORS,
  SAMPLE_TECH_PROFILE,
  SAMPLE_TECH_COVER_LETTER,
  SAMPLE_RESEARCH_PROFILE,
  SAMPLE_BLANK_PROFILE,
  generatePlainTextATS,
  generateCoverLetterPlainText,
  exportCVToJson,
  importCVFromJson,
} from '../../logic/cv-templates';

export const CVBuilderTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cv' | 'cover-letter'>('cv');
  const [styleId, setStyleId] = useState<CVStyleId>('flow-cv');
  const [colorId, setColorId] = useState<CVColorId>('indigo');
  const [zoom, setZoom] = useState<number>(100);

  // Active CV and Cover Letter state
  const [profile, setProfile] = useState<CVProfile>(SAMPLE_TECH_PROFILE);
  const [coverLetter, setCoverLetter] = useState<CoverLetterData>(SAMPLE_TECH_COVER_LETTER);

  // Accordion section open/collapse states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    experience: true,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
    languages: false,
    letterRecipient: true,
    letterBody: true,
  });

  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const activeColor = CV_COLORS[colorId] || CV_COLORS.indigo;

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const showToast = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  // Profile actions
  const handleLoadSample = (type: 'tech' | 'research' | 'blank') => {
    if (type === 'tech') {
      setProfile(SAMPLE_TECH_PROFILE);
      setCoverLetter(SAMPLE_TECH_COVER_LETTER);
      setStyleId('flow-cv');
      setColorId('indigo');
      showToast('Loaded Senior Full-Stack Engineer profile');
    } else if (type === 'research') {
      setProfile(SAMPLE_RESEARCH_PROFILE);
      setCoverLetter({
        ...SAMPLE_TECH_COVER_LETTER,
        sender: {
          fullName: SAMPLE_RESEARCH_PROFILE.personal.fullName,
          title: SAMPLE_RESEARCH_PROFILE.personal.title,
          email: SAMPLE_RESEARCH_PROFILE.personal.email,
          phone: SAMPLE_RESEARCH_PROFILE.personal.phone,
          location: SAMPLE_RESEARCH_PROFILE.personal.location,
          linkedin: SAMPLE_RESEARCH_PROFILE.personal.linkedin,
          website: SAMPLE_RESEARCH_PROFILE.personal.website,
        },
        jobTitle: 'Senior Computational Physicist / Research Fellow',
        paragraphs: [
          'I am writing to express my strong interest in the Computational Research Fellow appointment. With a Ph.D. in Theoretical Physics from MIT and extensive experience developing multi-threaded differential solvers, I have dedicated my career to bridging numerical physics with complex molecular modeling.',
          'My postdoctoral work at Harvard resulted in algorithms capable of simulating non-equilibrium boundary drag 8x faster than traditional integrators, securing over $400,000 in federal grant funding.',
          'I am eager to contribute my mathematical rigor and scientific computing expertise to your laboratory\'s ongoing initiatives. Thank you for your consideration.',
        ],
      });
      setStyleId('academic-stem');
      setColorId('emerald');
      showToast('Loaded STEM Research Scientist profile');
    } else {
      setProfile(SAMPLE_BLANK_PROFILE);
      showToast('Cleared to blank template');
    }
  };

  // Copy ATS Plaintext
  const handleCopyATS = () => {
    const text = activeTab === 'cv' ? generatePlainTextATS(profile) : generateCoverLetterPlainText(coverLetter);
    navigator.clipboard.writeText(text);
    showToast(activeTab === 'cv' ? 'Copied ATS-Friendly Plain Text CV!' : 'Copied Plain Text Cover Letter!');
  };

  // Export JSON
  const handleExportJSON = () => {
    const jsonStr = exportCVToJson(profile, coverLetter);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personal.fullName.replace(/\s+/g, '_') || 'Resume'}_CV_Data.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported CV & Cover Letter JSON');
  };

  // Import JSON
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = importCVFromJson(content);
      if (parsed) {
        setProfile(parsed.profile);
        setCoverLetter(parsed.letter);
        showToast('Successfully imported CV data');
      } else {
        alert('Could not parse valid CV JSON file. Please check file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Native Print / Save to PDF
  const handlePrint = () => {
    window.print();
  };

  // -------------------------------------------------------------
  // Form Update Handlers
  // -------------------------------------------------------------
  const updatePersonalInfo = (field: keyof CVProfile['personal'], value: string) => {
    setProfile((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
    // Also sync sender contact info to cover letter
    if (['fullName', 'title', 'email', 'phone', 'location', 'linkedin', 'website'].includes(field)) {
      setCoverLetter((prev) => ({
        ...prev,
        sender: {
          ...prev.sender,
          [field]: value,
        },
      }));
    }
  };

  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    setProfile((prev) => ({
      ...prev,
      experience: [
        {
          id: newId,
          role: 'New Position',
          company: 'Company / Organization',
          location: 'City, State',
          startDate: '2023-01',
          endDate: 'Present',
          current: true,
          bullets: ['Key achievement or impactful responsibility described with quantifiable metrics.'],
        },
        ...prev.experience,
      ],
    }));
    setOpenSections((prev) => ({ ...prev, experience: true }));
  };

  const removeExperience = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const updateExperience = (id: string, field: keyof CVProfile['experience'][0], value: any) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  const addBullet = (expId: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === expId ? { ...e, bullets: [...e.bullets, 'New milestone or project outcome.'] } : e
      ),
    }));
  };

  const updateBullet = (expId: string, idx: number, val: string) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => {
        if (e.id !== expId) return e;
        const newBullets = [...e.bullets];
        newBullets[idx] = val;
        return { ...e, bullets: newBullets };
      }),
    }));
  };

  const removeBullet = (expId: string, idx: number) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => {
        if (e.id !== expId) return e;
        return { ...e, bullets: e.bullets.filter((_, i) => i !== idx) };
      }),
    }));
  };

  // Education Handlers
  const addEducation = () => {
    const newId = `edu-${Date.now()}`;
    setProfile((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          degree: 'B.S. in Computer Science',
          institution: 'University Name',
          location: 'City, State',
          startDate: '2018',
          endDate: '2022',
          gpa: '3.8 / 4.0',
          details: 'Honors, relevant coursework, or thesis details.',
        },
      ],
    }));
    setOpenSections((prev) => ({ ...prev, education: true }));
  };

  const removeEducation = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateEducation = (id: string, field: keyof CVProfile['education'][0], value: any) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // Skills Handlers
  const addSkillCategory = () => {
    const newId = `sk-${Date.now()}`;
    setProfile((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: newId,
          category: 'Tools & Technologies',
          items: ['React', 'TypeScript', 'Node.js'],
        },
      ],
    }));
    setOpenSections((prev) => ({ ...prev, skills: true }));
  };

  const removeSkillCategory = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const updateSkillCategory = (id: string, catName: string, itemsStr: string) => {
    const items = itemsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, category: catName, items } : s)),
    }));
  };

  // Projects Handlers
  const addProject = () => {
    const newId = `proj-${Date.now()}`;
    setProfile((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: newId,
          name: 'Project Name',
          role: 'Lead Architect',
          link: 'https://github.com/project',
          description: 'Concise description of the system and user impact.',
          highlights: ['Key feature or technical accomplishment.'],
          techStack: ['TypeScript', 'React', 'Tailwind'],
        },
      ],
    }));
    setOpenSections((prev) => ({ ...prev, projects: true }));
  };

  const removeProject = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateProject = (id: string, field: keyof CVProfile['projects'][0], value: any) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  // Cover Letter Handlers
  const updateCoverLetterRecipient = (field: keyof CoverLetterData['recipient'], value: string) => {
    setCoverLetter((prev) => ({
      ...prev,
      recipient: { ...prev.recipient, [field]: value },
    }));
  };

  const updateCoverLetterMeta = (field: 'date' | 'jobTitle' | 'jobReference' | 'salutation' | 'signOff' | 'enclosures', value: string) => {
    setCoverLetter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateParagraph = (idx: number, text: string) => {
    setCoverLetter((prev) => {
      const newParagraphs = [...prev.paragraphs];
      newParagraphs[idx] = text;
      return { ...prev, paragraphs: newParagraphs };
    });
  };

  const addParagraph = () => {
    setCoverLetter((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, 'Additional paragraph focusing on relevant projects, quantifiable impact, and team alignment.'],
    }));
  };

  const removeParagraph = (idx: number) => {
    setCoverLetter((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Print Stylesheet Injection: ensures only the CV paper prints, removes web headers, forces A4 paper */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #cv-print-container,
          #cv-print-container * {
            visibility: visible !important;
          }
          #cv-print-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: #0f172a !important;
            box-shadow: none !important;
            border: none !important;
          }
          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>

      {/* Control Bar: Tabs, Template Selectors, Color & Style Switches, and Export */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Main Mode Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('cv')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'cv'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Curriculum Vitae (CV)</span>
            </button>
            <button
              onClick={() => setActiveTab('cover-letter')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
                activeTab === 'cover-letter'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-emerald-500" />
              <span>Cover Letter</span>
            </button>
          </div>

          {/* Preset Profiles Dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium">Starter Profiles:</span>
            <button
              onClick={() => handleLoadSample('tech')}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              Tech / Software
            </button>
            <button
              onClick={() => handleLoadSample('research')}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              STEM / Research
            </button>
            <button
              onClick={() => handleLoadSample('blank')}
              className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-500"
            >
              Blank Slate
            </button>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-xs"
              title="Print or Save as high-quality PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopyATS}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
              title="Copy ATS-friendly clean text to clipboard"
            >
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
              <span>ATS Text</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
              title="Export resume data as JSON"
            >
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>Export</span>
            </button>
            <label
              className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Import previously saved JSON"
            >
              <Upload className="w-3.5 h-3.5 text-neutral-500" />
              <span>Import</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Style Selector & Color Palettes Bar */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Style Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            <span className="text-xs text-neutral-500 font-semibold mr-1 shrink-0">Style:</span>
            {[
              { id: 'flow-cv' as CVStyleId, label: 'Flow CV', desc: 'Modern Dual-Column' },
              { id: 'executive' as CVStyleId, label: 'Executive', desc: 'Classic Minimalist' },
              { id: 'modern-tech' as CVStyleId, label: 'Tech / Modern', desc: 'High-Impact Developer' },
              { id: 'academic-stem' as CVStyleId, label: 'Academic STEM', desc: 'Formal Research Vitae' },
              { id: 'creative' as CVStyleId, label: 'Creative', desc: 'Bold Header Accent' },
            ].map((st) => {
              const active = styleId === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setStyleId(st.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors flex items-center gap-1.5 ${
                    active
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                  }`}
                >
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Accent Color Palette */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-500 font-semibold mr-1">Accent:</span>
            {(Object.keys(CV_COLORS) as CVColorId[]).map((cid) => {
              const c = CV_COLORS[cid];
              const isSelected = colorId === cid;
              return (
                <button
                  key={cid}
                  onClick={() => setColorId(cid)}
                  aria-label={`Select ${c.name}`}
                  title={c.name}
                  className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${
                    isSelected ? 'ring-2 ring-offset-2 ring-neutral-900 dark:ring-offset-neutral-900 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.primary }}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
              );
            })}

            {/* Preview Zoom Controls */}
            <div className="flex items-center gap-1 ml-3 pl-3 border-l border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setZoom((prev) => Math.max(70, prev - 10))}
                className="p-1 rounded text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-neutral-500 w-9 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom((prev) => Math.min(130, prev + 10))}
                className="p-1 rounded text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(100)}
                className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Copied Notification Toast */}
        {copiedNotification && (
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{copiedNotification}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Left Editor & Right Live Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: EDIT FORM CONTROLS                           */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 space-y-4 max-h-[1100px] overflow-y-auto pr-1">
          {activeTab === 'cv' ? (
            /* CV Editor Panels */
            <>
              {/* Section 1: Personal Info */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleSection('personal')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-500" />
                    Personal & Contact Info
                  </span>
                  {openSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSections.personal && (
                  <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={profile.personal.fullName}
                          onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                          placeholder="Elena Rostova"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Professional Title</label>
                        <input
                          type="text"
                          value={profile.personal.title}
                          onChange={(e) => updatePersonalInfo('title', e.target.value)}
                          placeholder="Senior Full-Stack Engineer"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Email</label>
                        <input
                          type="email"
                          value={profile.personal.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          placeholder="elena@example.com"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Phone</label>
                        <input
                          type="text"
                          value={profile.personal.phone}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          placeholder="+1 (415) 890-2341"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Location</label>
                        <input
                          type="text"
                          value={profile.personal.location}
                          onChange={(e) => updatePersonalInfo('location', e.target.value)}
                          placeholder="San Francisco, CA"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Portfolio / Website</label>
                        <input
                          type="text"
                          value={profile.personal.website || ''}
                          onChange={(e) => updatePersonalInfo('website', e.target.value)}
                          placeholder="https://mysite.dev"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={profile.personal.linkedin || ''}
                          onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/username"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">GitHub / Code Profile</label>
                        <input
                          type="text"
                          value={profile.personal.github || ''}
                          onChange={(e) => updatePersonalInfo('github', e.target.value)}
                          placeholder="github.com/username"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-neutral-500 mb-1">Professional Summary</label>
                      <textarea
                        rows={3}
                        value={profile.personal.summary}
                        onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                        placeholder="Concise 2-3 sentence executive synopsis highlighting years of experience, core technical achievements, and domains..."
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Work Experience */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleSection('experience')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-neutral-500" />
                    Work Experience ({profile.experience.length})
                  </span>
                  {openSections.experience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSections.experience && (
                  <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
                    {profile.experience.map((exp, idx) => (
                      <div
                        key={exp.id}
                        className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                            Position #{idx + 1}
                          </span>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                            title="Remove role"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                            placeholder="Role / Title"
                            className="px-2.5 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            placeholder="Company"
                            className="px-2.5 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                            placeholder="Location"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="Start (YYYY-MM)"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            disabled={exp.current}
                            value={exp.current ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="End Date"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 disabled:opacity-60"
                          />
                        </div>

                        <label className="flex items-center gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded border-neutral-300"
                          />
                          <span>Currently working here</span>
                        </label>

                        {/* Bullets */}
                        <div className="space-y-1.5 pt-1">
                          <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                            Achievement Bullets
                          </label>
                          {exp.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-1.5">
                              <span className="text-xs text-neutral-400 mt-1.5">•</span>
                              <textarea
                                rows={2}
                                value={b}
                                onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                                className="flex-1 px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 leading-snug"
                              />
                              <button
                                onClick={() => removeBullet(exp.id, bIdx)}
                                className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addBullet(exp.id)}
                            className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1 hover:underline mt-1"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Bullet Point</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addExperience}
                      className="w-full py-2 border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Work Experience</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Section 3: Education */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleSection('education')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-neutral-500" />
                    Education ({profile.education.length})
                  </span>
                  {openSections.education ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSections.education && (
                  <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    {profile.education.map((edu, idx) => (
                      <div
                        key={edu.id}
                        className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                            Degree #{idx + 1}
                          </span>
                          <button
                            onClick={() => removeEducation(edu.id)}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                            placeholder="Degree (e.g. B.S. in CS)"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                            placeholder="Institution / University"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                            placeholder="Location"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            placeholder="Start"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            placeholder="Graduation Year"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={edu.gpa || ''}
                            onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                            placeholder="GPA (e.g. 3.9 / 4.0)"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            value={edu.details || ''}
                            onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                            placeholder="Honors / Specialization"
                            className="sm:col-span-2 px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addEducation}
                      className="w-full py-2 border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Education</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Section 4: Skills */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleSection('skills')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-neutral-500" />
                    Skills & Categories ({profile.skills.length})
                  </span>
                  {openSections.skills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSections.skills && (
                  <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    {profile.skills.map((sk) => (
                      <div
                        key={sk.id}
                        className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={sk.category}
                            onChange={(e) => updateSkillCategory(sk.id, e.target.value, sk.items.join(', '))}
                            placeholder="Category Name"
                            className="font-bold text-xs px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 w-1/2"
                          />
                          <button
                            onClick={() => removeSkillCategory(sk.id)}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <label className="block text-[10px] text-neutral-400 mb-1">
                            Skills (comma-separated):
                          </label>
                          <input
                            type="text"
                            value={sk.items.join(', ')}
                            onChange={(e) => updateSkillCategory(sk.id, sk.category, e.target.value)}
                            placeholder="Python, React, Docker..."
                            className="w-full px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addSkillCategory}
                      className="w-full py-2 border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill Group</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Section 5: Projects */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleSection('projects')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-neutral-500" />
                    Key Projects ({profile.projects.length})
                  </span>
                  {openSections.projects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSections.projects && (
                  <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    {profile.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={proj.name}
                            onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                            placeholder="Project Name"
                            className="font-bold text-xs px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 w-1/2"
                          />
                          <button
                            onClick={() => removeProject(proj.id)}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={proj.role}
                            onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                            placeholder="Role (e.g. Lead Developer)"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                          <input
                            type="text"
                            value={proj.link || ''}
                            onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                            placeholder="URL / Repo link"
                            className="px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                          placeholder="Project overview and problem solved..."
                          className="w-full px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                        <input
                          type="text"
                          value={proj.techStack.join(', ')}
                          onChange={(e) =>
                            updateProject(
                              proj.id,
                              'techStack',
                              e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          placeholder="Tech stack (comma-separated): React, Vite, Canvas..."
                          className="w-full px-2 py-1 text-xs rounded border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    ))}

                    <button
                      onClick={addProject}
                      className="w-full py-2 border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Cover Letter Form Panels */
            <>
              {/* Recipient Info */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleSection('letterRecipient')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-neutral-500" />
                    Target Company & Recipient
                  </span>
                  {openSections.letterRecipient ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSections.letterRecipient && (
                  <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Hiring Manager Name</label>
                        <input
                          type="text"
                          value={coverLetter.recipient.hiringManager}
                          onChange={(e) => updateCoverLetterRecipient('hiringManager', e.target.value)}
                          placeholder="Marcus Vance"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Manager Title</label>
                        <input
                          type="text"
                          value={coverLetter.recipient.managerTitle}
                          onChange={(e) => updateCoverLetterRecipient('managerTitle', e.target.value)}
                          placeholder="VP of Engineering"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={coverLetter.recipient.companyName}
                          onChange={(e) => updateCoverLetterRecipient('companyName', e.target.value)}
                          placeholder="Apex Cloud Technologies"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Department</label>
                        <input
                          type="text"
                          value={coverLetter.recipient.department || ''}
                          onChange={(e) => updateCoverLetterRecipient('department', e.target.value)}
                          placeholder="Platform Architecture Team"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Street Address</label>
                        <input
                          type="text"
                          value={coverLetter.recipient.street || ''}
                          onChange={(e) => updateCoverLetterRecipient('street', e.target.value)}
                          placeholder="100 Montgomery St, Suite 1800"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">City, State ZIP</label>
                        <input
                          type="text"
                          value={coverLetter.recipient.cityStateZip || ''}
                          onChange={(e) => updateCoverLetterRecipient('cityStateZip', e.target.value)}
                          placeholder="San Francisco, CA 94104"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Date</label>
                        <input
                          type="text"
                          value={coverLetter.date}
                          onChange={(e) => updateCoverLetterMeta('date', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Role Applied For</label>
                        <input
                          type="text"
                          value={coverLetter.jobTitle}
                          onChange={(e) => updateCoverLetterMeta('jobTitle', e.target.value)}
                          placeholder="Principal Systems Engineer"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Job Ref ID (Optional)</label>
                        <input
                          type="text"
                          value={coverLetter.jobReference || ''}
                          onChange={(e) => updateCoverLetterMeta('jobReference', e.target.value)}
                          placeholder="REQ-2026-CLOUD-99"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Letter Content & Paragraphs */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleSection('letterBody')}
                  className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-xs text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-neutral-500" />
                    Salutation & Paragraphs ({coverLetter.paragraphs.length})
                  </span>
                  {openSections.letterBody ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openSections.letterBody && (
                  <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
                    <div>
                      <label className="block text-[11px] font-medium text-neutral-500 mb-1">Salutation</label>
                      <input
                        type="text"
                        value={coverLetter.salutation}
                        onChange={(e) => updateCoverLetterMeta('salutation', e.target.value)}
                        placeholder="Dear Hiring Manager,"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-[11px] font-medium text-neutral-500">Letter Body Paragraphs</label>
                      {coverLetter.paragraphs.map((p, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] text-neutral-400">
                            <span>Paragraph {idx + 1}</span>
                            {coverLetter.paragraphs.length > 1 && (
                              <button
                                onClick={() => removeParagraph(idx)}
                                className="text-red-500 hover:underline flex items-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                          <textarea
                            rows={3}
                            value={p}
                            onChange={(e) => updateParagraph(idx, e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 leading-relaxed"
                          />
                        </div>
                      ))}

                      <button
                        onClick={addParagraph}
                        className="w-full py-2 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-1 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Paragraph</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Sign-off</label>
                        <input
                          type="text"
                          value={coverLetter.signOff}
                          onChange={(e) => updateCoverLetterMeta('signOff', e.target.value)}
                          placeholder="Sincerely,"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-neutral-500 mb-1">Enclosures (Optional)</label>
                        <input
                          type="text"
                          value={coverLetter.enclosures || ''}
                          onChange={(e) => updateCoverLetterMeta('enclosures', e.target.value)}
                          placeholder="Enclosure: Curriculum Vitae, Portfolio"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: LIVE INTERACTIVE DOCUMENT PREVIEW            */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 bg-neutral-100/70 dark:bg-neutral-950 p-4 sm:p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-x-auto flex justify-center">
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full max-w-[800px]"
          >
            {/* Printable Paper Container */}
            <div
              id="cv-print-container"
              ref={printAreaRef}
              className="bg-white text-neutral-900 rounded-lg shadow-lg border border-neutral-200 min-h-[1050px] p-8 sm:p-10 font-sans print:border-none print:shadow-none print:p-0 print:m-0"
            >
              {activeTab === 'cv' ? (
                /* CV Layout Renderer based on chosen style */
                <CVRenderer profile={profile} styleId={styleId} color={activeColor} />
              ) : (
                /* Matching Cover Letter Renderer */
                <CoverLetterRenderer letter={coverLetter} styleId={styleId} color={activeColor} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// CV Layout Renderers
// -------------------------------------------------------------

interface CVRendererProps {
  profile: CVProfile;
  styleId: CVStyleId;
  color: ReturnType<() => any>;
}

const CVRenderer: React.FC<CVRendererProps> = ({ profile, styleId, color }) => {
  const { personal, experience, education, skills, projects, certifications, languages } = profile;

  // 1. FLOW CV: Modern dual-column layout inspired by FlowCV
  if (styleId === 'flow-cv') {
    return (
      <div className="grid grid-cols-12 gap-6 leading-relaxed">
        {/* Left Sidebar Column (38% width) */}
        <div
          className="col-span-4 rounded-xl p-5 space-y-6 text-xs"
          style={{ backgroundColor: color.accentBg, borderLeft: `4px solid ${color.primary}` }}
        >
          {/* Avatar initial badge & Name */}
          <div className="space-y-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-xs"
              style={{ backgroundColor: color.primary }}
            >
              {personal.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase() || 'CV'}
            </div>
            <div>
              <h1 className="text-base font-bold text-neutral-900 leading-tight">{personal.fullName || 'Your Name'}</h1>
              <p className="text-[11px] font-medium" style={{ color: color.primaryDark }}>
                {personal.title}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 pt-2 border-t border-neutral-200/80">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Contact</p>
            {personal.email && (
              <div className="flex items-center gap-1.5 break-all text-neutral-700">
                <Mail className="w-3 h-3 shrink-0" style={{ color: color.primary }} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1.5 text-neutral-700">
                <Phone className="w-3 h-3 shrink-0" style={{ color: color.primary }} />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-1.5 text-neutral-700">
                <MapPin className="w-3 h-3 shrink-0" style={{ color: color.primary }} />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-1.5 break-all text-neutral-700">
                <Linkedin className="w-3 h-3 shrink-0" style={{ color: color.primary }} />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-1.5 break-all text-neutral-700">
                <Github className="w-3 h-3 shrink-0" style={{ color: color.primary }} />
                <span>{personal.github}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1.5 break-all text-neutral-700">
                <Globe className="w-3 h-3 shrink-0" style={{ color: color.primary }} />
                <span>{personal.website}</span>
              </div>
            )}
          </div>

          {/* Education in Sidebar */}
          {education.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-neutral-200/80">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Education</p>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <p className="font-bold text-neutral-900 leading-snug">{edu.degree}</p>
                  <p className="text-neutral-700">{edu.institution}</p>
                  <p className="text-[10px] text-neutral-500">
                    {edu.startDate} – {edu.endDate} {edu.gpa && `· GPA ${edu.gpa}`}
                  </p>
                  {edu.details && <p className="text-[10px] text-neutral-600 italic">{edu.details}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills in Sidebar */}
          {skills.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-neutral-200/80">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Skills</p>
              {skills.map((sk) => (
                <div key={sk.id} className="space-y-1">
                  <p className="font-semibold text-neutral-800 text-[11px]">{sk.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {sk.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                        style={{ backgroundColor: color.badgeBg, color: color.badgeText }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages in Sidebar */}
          {languages.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-200/80">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Languages</p>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center text-[11px]">
                    <span className="font-medium text-neutral-800">{l.language}</span>
                    <span className="text-neutral-500 text-[10px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content Column (62% width) */}
        <div className="col-span-8 space-y-6">
          {/* Executive Summary */}
          {personal.summary && (
            <div className="space-y-1.5">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: color.primaryDark, borderColor: color.border }}
              >
                Profile Synopsis
              </h2>
              <p className="text-xs text-neutral-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Timeline Work Experience with vertical connecting trace */}
          {experience.length > 0 && (
            <div className="space-y-3">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: color.primaryDark, borderColor: color.border }}
              >
                Experience Timeline
              </h2>
              <div className="relative pl-4 space-y-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-200">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative space-y-1 text-xs">
                    {/* Node Dot */}
                    <div
                      className="absolute -left-[19px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                      style={{ backgroundColor: color.primary }}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-bold text-neutral-900 text-[13px]">{exp.role}</span>
                      <span className="text-[10px] font-semibold text-neutral-500">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600 text-[11px] font-medium">
                      <span>{exp.company}</span>
                      <span>·</span>
                      <span>{exp.location}</span>
                    </div>
                    <ul className="list-disc list-outside pl-3.5 space-y-1 text-neutral-700 pt-1 leading-snug">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Projects */}
          {projects.length > 0 && (
            <div className="space-y-3 pt-1">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: color.primaryDark, borderColor: color.border }}
              >
                Key Projects & Impact
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 text-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-neutral-900">{proj.name}</span>
                      {proj.role && <span className="text-[11px] text-neutral-500">{proj.role}</span>}
                    </div>
                    <p className="text-neutral-700 text-[11px]">{proj.description}</p>
                    {proj.techStack.length > 0 && (
                      <p className="text-[10px] text-neutral-500">
                        <span className="font-semibold">Stack:</span> {proj.techStack.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="space-y-2 pt-1">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
                style={{ color: color.primaryDark, borderColor: color.border }}
              >
                Certifications
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="p-2 rounded bg-neutral-50 border border-neutral-200/80">
                    <p className="font-semibold text-neutral-900 text-[11px]">{c.name}</p>
                    <p className="text-[10px] text-neutral-500">
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 2. EXECUTIVE MINIMALIST: Clean single-column with elegant typography & rules
  if (styleId === 'executive') {
    return (
      <div className="space-y-5 text-neutral-900 leading-relaxed font-serif">
        {/* Centered Classic Header */}
        <div className="text-center space-y-1 pb-3 border-b-2 border-neutral-900">
          <h1 className="text-2xl font-bold tracking-tight uppercase">{personal.fullName || 'Your Name'}</h1>
          <p className="text-xs tracking-wider uppercase font-sans text-neutral-600 font-medium">{personal.title}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-[11px] font-sans text-neutral-600 pt-1">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>· {personal.phone}</span>}
            {personal.location && <span>· {personal.location}</span>}
            {personal.linkedin && <span>· {personal.linkedin}</span>}
            {personal.website && <span>· {personal.website}</span>}
          </div>
        </div>

        {/* Summary */}
        {personal.summary && (
          <div className="space-y-1">
            <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-neutral-800">
              Executive Synopsis
            </h2>
            <p className="text-xs leading-relaxed text-neutral-800">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-neutral-800 pb-1 border-b border-neutral-300">
              Professional Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex justify-between items-baseline font-sans font-bold text-neutral-900">
                    <span>
                      {exp.role}, <span className="font-normal italic">{exp.company}</span>
                    </span>
                    <span className="text-[11px] font-normal text-neutral-600">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.location}
                    </span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-neutral-800 leading-snug">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-neutral-800 pb-1 border-b border-neutral-300">
              Education & Credentials
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs font-sans">
                <div>
                  <span className="font-bold text-neutral-900">{edu.degree}</span> – {edu.institution}
                  {edu.details && <span className="text-neutral-500 italic"> ({edu.details})</span>}
                </div>
                <span className="text-[11px] text-neutral-600">
                  {edu.startDate} – {edu.endDate} {edu.gpa && `| GPA ${edu.gpa}`}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-sans uppercase tracking-widest text-neutral-800 pb-1 border-b border-neutral-300">
              Core Competencies & Capabilities
            </h2>
            <div className="space-y-1 text-xs font-sans">
              {skills.map((sk) => (
                <div key={sk.id}>
                  <span className="font-bold text-neutral-800">{sk.category}:</span>{' '}
                  <span className="text-neutral-700">{sk.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. MODERN TECH: Clean monospaced accents, GitHub highlights, system scale
  if (styleId === 'modern-tech') {
    return (
      <div className="space-y-5 text-xs text-neutral-900 leading-relaxed font-sans">
        {/* Tech Header */}
        <div className="pb-4 border-b-2" style={{ borderColor: color.primary }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">{personal.fullName || 'Your Name'}</h1>
              <p className="text-xs font-mono font-semibold" style={{ color: color.primary }}>
                &gt; {personal.title}
              </p>
            </div>
            <div className="text-right text-[11px] font-mono space-y-0.5 text-neutral-600">
              {personal.email && <div>{personal.email}</div>}
              {personal.github && <div>gh: {personal.github}</div>}
              {personal.location && <div>loc: {personal.location}</div>}
            </div>
          </div>
        </div>

        {/* Summary */}
        {personal.summary && (
          <div className="p-3 rounded-lg border bg-neutral-50/70 border-neutral-200">
            <p className="text-neutral-800 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-neutral-800">
              <span className="w-2 h-2 rounded-xs" style={{ backgroundColor: color.primary }} />
              Engineering Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1 pl-3 border-l-2" style={{ borderColor: color.badgeBg }}>
                  <div className="flex justify-between items-baseline font-bold">
                    <span className="text-neutral-900 text-[13px]">{exp.role}</span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      [{exp.startDate} - {exp.current ? 'NOW' : exp.endDate}]
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-neutral-600">
                    @{exp.company} // {exp.location}
                  </p>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-neutral-700 pt-0.5">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-neutral-800">
              <span className="w-2 h-2 rounded-xs" style={{ backgroundColor: color.primary }} />
              Open Source & Architecture Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-2.5 rounded-lg border border-neutral-200 bg-neutral-50/50 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-900">{proj.name}</span>
                    {proj.link && (
                      <span className="text-[10px] font-mono text-indigo-600 truncate max-w-[120px]">
                        {proj.link.replace('https://', '')}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-600">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium"
                        style={{ backgroundColor: color.badgeBg, color: color.badgeText }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Tech Stack Grid */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-neutral-800">
              <span className="w-2 h-2 rounded-xs" style={{ backgroundColor: color.primary }} />
              Technical Stack & Tooling
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {skills.map((sk) => (
                <div key={sk.id} className="p-2 rounded bg-neutral-50 border border-neutral-200/80 space-y-1">
                  <p className="font-bold text-[10px] font-mono text-neutral-500 uppercase">{sk.category}</p>
                  <p className="text-[11px] text-neutral-800 leading-tight">{sk.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. ACADEMIC STEM / RESEARCHER: Classical academic CV with grants & publications
  if (styleId === 'academic-stem') {
    return (
      <div className="space-y-5 text-xs text-neutral-900 leading-relaxed font-serif">
        <div className="text-center space-y-1 pb-3 border-b border-neutral-300">
          <h1 className="text-xl font-bold tracking-normal">{personal.fullName || 'Your Name'}</h1>
          <p className="text-xs italic text-neutral-700">{personal.title}</p>
          <div className="text-[11px] text-neutral-600 font-sans space-x-2">
            <span>{personal.location}</span>
            <span>·</span>
            <span>{personal.email}</span>
            <span>·</span>
            <span>{personal.phone}</span>
            {personal.website && (
              <>
                <span>·</span>
                <span>{personal.website}</span>
              </>
            )}
          </div>
        </div>

        {/* Research Overview */}
        {personal.summary && (
          <div className="space-y-1">
            <h2 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-800">Research Focus</h2>
            <p className="text-neutral-800 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-800 pb-0.5 border-b border-neutral-200">
              Academic Appointments & Education
            </h2>
            <div className="space-y-2 font-sans">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold">{edu.degree}</span>, {edu.institution}
                    {edu.details && <p className="text-[11px] text-neutral-600 italic">{edu.details}</p>}
                  </div>
                  <span className="text-[11px] text-neutral-500 shrink-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research & Fellowship Appointments */}
        {experience.length > 0 && (
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-800 pb-0.5 border-b border-neutral-200">
              Research & Laboratory Experience
            </h2>
            <div className="space-y-3 font-sans">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold text-neutral-900">
                    <span>
                      {exp.role} — <span className="font-normal italic">{exp.company}</span>
                    </span>
                    <span className="text-[11px] font-normal text-neutral-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-neutral-700 leading-snug">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Computational & Scientific Skills */}
        {skills.length > 0 && (
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold font-sans uppercase tracking-wider text-neutral-800 pb-0.5 border-b border-neutral-200">
              Scientific & Computational Methodologies
            </h2>
            <div className="space-y-1 font-sans text-xs">
              {skills.map((sk) => (
                <div key={sk.id}>
                  <span className="font-semibold text-neutral-800">{sk.category}:</span>{' '}
                  <span className="text-neutral-700">{sk.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 5. CREATIVE: Bold banner header with prominent visual contrast
  return (
    <div className="space-y-5 text-xs text-neutral-900 leading-relaxed font-sans">
      {/* Banner */}
      <div
        className="rounded-xl p-6 text-white space-y-2 shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${color.primaryDark} 0%, ${color.primary} 100%)`,
        }}
      >
        <h1 className="text-2xl font-black tracking-tight">{personal.fullName || 'Your Name'}</h1>
        <p className="text-xs font-medium text-white/90 uppercase tracking-widest">{personal.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/80 pt-2 border-t border-white/20">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="space-y-1">
          <p className="text-neutral-700 leading-relaxed italic border-l-3 pl-3" style={{ borderColor: color.primary }}>
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: color.primaryDark }}>
            Career Milestones
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline font-bold text-neutral-900">
                  <span className="text-[13px]">{exp.role}</span>
                  <span className="text-[10px] text-neutral-500 font-normal">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-neutral-600">
                  {exp.company} · {exp.location}
                </p>
                <ul className="list-disc list-outside pl-4 space-y-1 text-neutral-700">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="space-y-2 pt-1">
          <h2 className="text-xs font-black uppercase tracking-wider" style={{ color: color.primaryDark }}>
            Expertise & Specialties
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.flatMap((sk) =>
              sk.items.map((item, i) => (
                <span
                  key={`${sk.id}-${i}`}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: color.badgeBg, color: color.badgeText }}
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// Cover Letter Renderer
// -------------------------------------------------------------

interface CoverLetterRendererProps {
  letter: CoverLetterData;
  styleId: CVStyleId;
  color: ReturnType<() => any>;
}

const CoverLetterRenderer: React.FC<CoverLetterRendererProps> = ({ letter, styleId, color }) => {
  const { sender, recipient, date, jobTitle, jobReference, salutation, paragraphs, signOff, enclosures } = letter;

  return (
    <div className="space-y-6 text-xs text-neutral-900 leading-relaxed font-sans">
      {/* Header synchronized with style and color */}
      <div
        className="pb-4 border-b space-y-1"
        style={{ borderColor: styleId === 'modern-tech' ? color.primary : '#e2e8f0' }}
      >
        <h1 className="text-xl font-bold text-neutral-900">{sender.fullName || 'Your Name'}</h1>
        <p className="text-[11px] font-semibold" style={{ color: color.primaryDark }}>
          {sender.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-600 pt-1">
          {sender.email && <span>{sender.email}</span>}
          {sender.phone && <span>· {sender.phone}</span>}
          {sender.location && <span>· {sender.location}</span>}
          {sender.linkedin && <span>· {sender.linkedin}</span>}
          {sender.website && <span>· {sender.website}</span>}
        </div>
      </div>

      {/* Date */}
      <div className="text-[11px] text-neutral-600 font-medium">{date}</div>

      {/* Recipient Details */}
      <div className="space-y-0.5 text-xs text-neutral-800">
        <p className="font-bold text-neutral-900">{recipient.hiringManager}</p>
        <p className="text-neutral-700">{recipient.managerTitle}</p>
        <p className="font-semibold text-neutral-900">{recipient.companyName}</p>
        {recipient.department && <p className="text-neutral-600">{recipient.department}</p>}
        {recipient.street && <p className="text-neutral-600">{recipient.street}</p>}
        {recipient.cityStateZip && <p className="text-neutral-600">{recipient.cityStateZip}</p>}
      </div>

      {/* Subject Line */}
      <div
        className="p-2.5 rounded-lg border text-xs font-bold"
        style={{
          backgroundColor: color.accentBg,
          borderColor: color.border,
          color: color.primaryDark,
        }}
      >
        <span>RE: Application for {jobTitle}</span>
        {jobReference && <span className="font-normal text-neutral-600"> (Ref: {jobReference})</span>}
      </div>

      {/* Salutation */}
      <p className="font-semibold text-neutral-900 text-xs">{salutation}</p>

      {/* Letter Body Paragraphs */}
      <div className="space-y-3.5 text-neutral-800 leading-relaxed text-xs">
        {paragraphs.map((para, idx) => (
          <p key={idx} className="leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Sign-off & Signature */}
      <div className="space-y-4 pt-2">
        <p className="text-neutral-800">{signOff}</p>
        <div className="space-y-0.5 pt-2">
          <p className="font-bold text-neutral-900 text-xs">{sender.fullName}</p>
          <p className="text-[11px] text-neutral-600">{sender.title}</p>
        </div>
      </div>

      {/* Enclosures */}
      {enclosures && (
        <div className="pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 italic">
          {enclosures}
        </div>
      )}
    </div>
  );
};
