import React, { useState, useRef, useMemo } from 'react';
import {
  Printer,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  Sparkles,
  Download,
  Upload,
  Eye,
  Edit3,
  BookOpen,
  Key,
  HelpCircle,
  FileText,
  Sliders,
  ChevronDown,
  Layers,
  CheckCircle2,
  XCircle,
  Hash,
  ArrowUpDown,
  Calculator,
  Type,
  Star,
  Search,
  Award,
  Grid,
  Bookmark,
  ExternalLink,
  Moon,
  Sun
} from 'lucide-react';
import {
  BilingualExamPaper,
  ExamHeaderConfig,
  ExamMCQ,
  ExamShortQuestion,
  ExamLongQuestion,
  MCQOption,
  QuestionBankItem
} from '../../logic/exam-generator/types';
import {
  EXACT_9TH_MATH_UNIT1_PAPER,
  PRESET_EXAM_PAPERS
} from '../../logic/exam-generator/presets';
import {
  COMPREHENSIVE_QUESTION_BANK,
  filterQuestions,
  deduplicateQuestionsWithinChapter
} from '../../logic/exam-generator/question-bank';
import {
  BOARD_PAIRING_SCHEMES,
  getPairingSchemeForSubject
} from '../../logic/exam-generator/pairing-schemes';
import {
  TEXTBOOK_CHAPTERS_CATALOG,
  getTextbookChapters
} from '../../logic/exam-generator/textbook-data';
import { ChapterPdfExtractorView } from '../exam-generator/ChapterPdfExtractorView';
import { CHAPTER_PDF_ARCHIVES } from '../../logic/exam-generator/pdf-archives-data';
import { clearAllStoredPdfs } from '../../logic/exam-generator/pdf-memory-store';
import { FolderOpen } from 'lucide-react';

const CLEAN_SLATE_STORAGE_VERSION = 'll_clean_slate_zero_data_v8';

export const CLEAN_BLANK_PAPER: BilingualExamPaper = {
  id: 'blank-paper',
  title: 'Bilingual Examination Paper',
  header: {
    institutionName: 'Standard High School / College',
    studentNamePrompt: 'Student Name',
    rollNumberPrompt: 'Roll No',
    className: '9TH',
    date: new Date().toLocaleDateString(),
    subjectName: 'Mathematics',
    subjectNameUrdu: 'ریاضی',
    timeAllowed: '45 Mins',
    totalMarks: 0,
    examName: 'Chapter Test / Assessment',
    syllabus: 'Course Syllabus',
    showOmrSheet: true,
    showWatermark: false,
    watermarkText: 'CONFIDENTIAL',
    paperType: 'bilingual'
  },
  mcqs: [],
  shortQuestions: [],
  longQuestions: []
};

// Immediate purge of any pre-seeded or stale data from previous versions
if (typeof window !== 'undefined') {
  try {
    if (localStorage.getItem(CLEAN_SLATE_STORAGE_VERSION) !== 'true') {
      localStorage.removeItem('ll_custom_question_bank');
      localStorage.removeItem('ll_custom_exam_paper');
      localStorage.setItem(CLEAN_SLATE_STORAGE_VERSION, 'true');
      clearAllStoredPdfs().catch(() => {});
    }
  } catch {}
}

export function BilingualExamGeneratorTool() {
  const [paper, setPaper] = useState<BilingualExamPaper>(() => {
    try {
      const saved = localStorage.getItem('ll_custom_exam_paper');
      return saved ? JSON.parse(saved) : CLEAN_BLANK_PAPER;
    } catch {
      return CLEAN_BLANK_PAPER;
    }
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'editor' | 'bank' | 'pairing' | 'textbook' | 'solutions' | 'pdf-archives'>('preview');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showQuickGenModal, setShowQuickGenModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleDarkMode = () => {
    const nextDark = !document.documentElement.classList.contains('dark');
    if (nextDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('ll_theme_mode', 'dark');
        localStorage.setItem('ll_theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('ll_theme_mode', 'light');
        localStorage.setItem('ll_theme', 'light');
      } catch {}
    }
    setIsDarkMode(nextDark);
  };

  // Dynamic question bank state (persisted to localStorage)
  const [customQuestions, setCustomQuestions] = useState<QuestionBankItem[]>(() => {
    try {
      const saved = localStorage.getItem('ll_custom_question_bank');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Teacher toggle to include built-in board questions (initiates as false for clean slate)
  const [includePresetQuestions, setIncludePresetQuestions] = useState<boolean>(false);

  // Full question bank initiates with only teacher's uploaded questions, deduplicated per chapter
  const fullQuestionBank = useMemo(() => {
    if (includePresetQuestions) {
      const customIds = new Set(customQuestions.map((q) => q.id));
      const staticRemaining = COMPREHENSIVE_QUESTION_BANK.filter((q) => !customIds.has(q.id));
      return deduplicateQuestionsWithinChapter([...customQuestions, ...staticRemaining]);
    }
    return deduplicateQuestionsWithinChapter(customQuestions);
  }, [customQuestions, includePresetQuestions]);

  const handleAddQuestionsToBank = (newQuestions: QuestionBankItem[]) => {
    setCustomQuestions((prev) => {
      const combined = [...newQuestions, ...prev];
      // Filter out duplicates within the same chapter
      const deduplicated = deduplicateQuestionsWithinChapter(combined);
      try {
        localStorage.setItem('ll_custom_question_bank', JSON.stringify(deduplicated));
      } catch {}
      return deduplicated;
    });
  };

  const [bankNotification, setBankNotification] = useState<string | null>(null);

  const handleClearAllQuestionBank = async () => {
    setCustomQuestions([]);
    setIncludePresetQuestions(false);
    try {
      localStorage.removeItem('ll_custom_question_bank');
      localStorage.removeItem('ll_custom_exam_paper');
      await clearAllStoredPdfs();
    } catch (e) {
      console.warn('Storage purge error:', e);
    }
    setBankNotification('All Question Bank questions and offline PDFs have been permanently deleted.');
    setTimeout(() => setBankNotification(null), 4000);
  };

  // Question bank filters
  const [bankGrade, setBankGrade] = useState<string>('All');
  const [bankSubject, setBankSubject] = useState<string>('All');
  const [bankType, setBankType] = useState<'All' | 'mcq' | 'short' | 'long'>('All');
  const [bankSearch, setBankSearch] = useState('');
  const [bankHighYieldOnly, setBankHighYieldOnly] = useState(false);

  // Pairing scheme inspector state
  const [selectedPairingId, setSelectedPairingId] = useState(BOARD_PAIRING_SCHEMES[0]?.id || '');
  
  // Textbook index inspector state
  const [selectedTextbookGrade, setSelectedTextbookGrade] = useState('9th');
  const [selectedTextbookSubject, setSelectedTextbookSubject] = useState('Mathematics');
  const [textbookSearch, setTextbookSearch] = useState('');

  // Quick Generator state
  const [genSubject, setGenSubject] = useState('Mathematics');
  const [genGrade, setGenGrade] = useState('9th');
  const [genMarks, setGenMarks] = useState(40);
  const [genNumMcqs, setGenNumMcqs] = useState(10);
  const [genNumShort, setGenNumShort] = useState(10);
  const [genNumLong, setGenNumLong] = useState(2);

  // Active input ref for symbol insertion
  const [activeFieldKey, setActiveFieldKey] = useState<{
    section: 'header' | 'mcq' | 'short' | 'long';
    index?: number;
    subKey?: string;
  } | null>(null);

  // Save to localStorage
  const updatePaper = (newPaper: BilingualExamPaper) => {
    setPaper(newPaper);
    try {
      localStorage.setItem('ll_custom_exam_paper', JSON.stringify(newPaper));
    } catch {}
  };

  const loadPreset = (presetId: string) => {
    if (presetId === 'blank-paper') {
      updatePaper({
        id: `blank-${Date.now()}`,
        title: 'New Blank Bilingual Exam Paper',
        header: {
          ...paper.header,
          institutionName: 'Standard High School / College',
          examName: 'Chapter Test / Assessment',
          className: '9TH',
          subjectName: 'Mathematics',
          subjectNameUrdu: 'ریاضی',
          totalMarks: 0,
          timeAllowed: '45 Mins',
          syllabus: 'Unit / Chapter Test'
        },
        mcqs: [],
        shortQuestions: [],
        longQuestions: []
      });
      return;
    }
    const found = PRESET_EXAM_PAPERS.find((p) => p.id === presetId);
    if (found) {
      updatePaper(JSON.parse(JSON.stringify(found)));
    }
  };

  const assemblePaperFromPairing = (schemeId: string) => {
    const scheme = BOARD_PAIRING_SCHEMES.find((s) => s.id === schemeId);
    if (!scheme) return;

    const matchingQuestions = fullQuestionBank.filter(
      (q) => q.grade === scheme.className && q.subject.toLowerCase().includes(scheme.subject.toLowerCase())
    );

    const mcqsFromBank = matchingQuestions.filter((q) => q.type === 'mcq');
    const shortFromBank = matchingQuestions.filter((q) => q.type === 'short');
    const longFromBank = matchingQuestions.filter((q) => q.type === 'long');

    const targetMcqCount = Math.min(mcqsFromBank.length, scheme.mcqMarks > 0 ? scheme.mcqMarks : 10);
    const targetShortCount = Math.min(shortFromBank.length, Math.floor(scheme.shortMarks / 2) || 8);
    const targetLongCount = Math.min(longFromBank.length, 3);

    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

    const poolMcqs = mcqsFromBank.length >= targetMcqCount ? mcqsFromBank : fullQuestionBank.filter((q) => q.type === 'mcq');
    const poolShort = shortFromBank.length >= targetShortCount ? shortFromBank : fullQuestionBank.filter((q) => q.type === 'short');
    const poolLong = longFromBank.length >= targetLongCount ? longFromBank : fullQuestionBank.filter((q) => q.type === 'long');

    const assembledMcqs: ExamMCQ[] = poolMcqs.slice(0, targetMcqCount || 10).map((q, idx) => ({
      id: `pair_m_${idx}`,
      num: idx + 1,
      textEn: q.textEn,
      textUr: q.textUr,
      options: q.options || [
        { id: 'A', textEn: 'True', textUr: 'درست' },
        { id: 'B', textEn: 'False', textUr: 'غلط' },
        { id: 'C', textEn: 'Both', textUr: 'دونوں' },
        { id: 'D', textEn: 'None', textUr: 'کوئی نہیں' }
      ],
      correctOption: q.correctOption || 'A',
      explanation: q.solution,
      points: 1,
      chapter: q.unit,
      isHighYield: q.isHighYield,
      boardTag: q.boardTag
    }));

    const assembledShort: ExamShortQuestion[] = poolShort.slice(0, targetShortCount || 8).map((q, idx) => ({
      id: `pair_s_${idx}`,
      numRoman: romanNumerals[idx] || `${idx + 1}`,
      textEn: q.textEn,
      textUr: q.textUr,
      solution: q.solution,
      points: 2,
      chapter: q.unit,
      isHighYield: q.isHighYield,
      boardTag: q.boardTag
    }));

    const assembledLong: ExamLongQuestion[] = poolLong.slice(0, targetLongCount || 2).map((q, idx) => ({
      id: `pair_l_${idx}`,
      num: idx + 1,
      textEn: q.textEn,
      textUr: q.textUr,
      solution: q.solution,
      points: Math.round(scheme.longMarks / (targetLongCount || 2)) || 5,
      chapter: q.unit,
      isHighYield: q.isHighYield,
      boardTag: q.boardTag
    }));

    const totalCalc =
      assembledMcqs.reduce((a, b) => a + b.points, 0) +
      assembledShort.reduce((a, b) => a + b.points, 0) +
      assembledLong.reduce((a, b) => a + b.points, 0);

    updatePaper({
      id: `scheme-${scheme.id}-${Date.now()}`,
      title: `${scheme.className} ${scheme.subject} – Board Pairing Exam`,
      category: 'full-book',
      header: {
        ...paper.header,
        className: scheme.className.toUpperCase(),
        subjectName: scheme.subject,
        subjectNameUrdu: scheme.subjectUrdu,
        totalMarks: totalCalc,
        timeAllowed: scheme.timeAllowed,
        examName: `Annual Board Standard Exam (BISE Pattern)`,
        syllabus: `All Chapters (Pairing Scheme Aligned)`
      },
      instructionsEn: scheme.patternOverview,
      instructionsUr: scheme.patternOverviewUrdu,
      mcqs: assembledMcqs,
      shortQuestions: assembledShort,
      longQuestions: assembledLong
    });

    setActiveTab('preview');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    let text = `========================================================\n`;
    text += `${paper.header.institutionName || 'EXAMINATION PAPER'} - ${paper.header.className} ${paper.header.subjectName}\n`;
    text += `Time Allowed: ${paper.header.timeAllowed} | Total Marks: ${paper.header.totalMarks}\n`;
    text += `Syllabus: ${paper.header.syllabus}\n`;
    text += `========================================================\n\n`;

    text += `--- OBJECTIVE PART / حصہ معروضی ---\n`;
    text += `Q1. ${paper.instructionsEn || 'Choose the correct answer.'} / ${paper.instructionsUr || ''}\n\n`;

    paper.mcqs.forEach((m, idx) => {
      text += `${idx + 1}. ${m.textEn}  |  ${m.textUr}\n`;
      text += `   (A) ${m.options[0]?.textEn || ''} ${m.options[0]?.textUr || ''}\n`;
      text += `   (B) ${m.options[1]?.textEn || ''} ${m.options[1]?.textUr || ''}\n`;
      text += `   (C) ${m.options[2]?.textEn || ''} ${m.options[2]?.textUr || ''}\n`;
      text += `   (D) ${m.options[3]?.textEn || ''} ${m.options[3]?.textUr || ''}\n\n`;
    });

    text += `--- SUBJECTIVE PART / حصہ انشائیہ ---\n`;
    text += `Q2. Short Answers (2 marks each)\n\n`;
    paper.shortQuestions.forEach((s, idx) => {
      text += `${s.numRoman || idx + 1}. ${s.textEn}  |  ${s.textUr}\n`;
    });

    text += `\nQ3. Detailed Answers (5 marks each)\n\n`;
    paper.longQuestions.forEach((l, idx) => {
      text += `${idx + 1}. ${l.textEn}  |  ${l.textUr}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(paper, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${paper.title.replace(/\s+/g, '_')}_Paper.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.header && parsed.mcqs) {
          updatePaper(parsed);
          setActiveTab('preview');
        }
      } catch {
        alert('Invalid exam paper JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Add question helper
  const addMcq = () => {
    const newMcq: ExamMCQ = {
      id: `mcq_${Date.now()}`,
      num: paper.mcqs.length + 1,
      textEn: 'New multiple choice question statement',
      textUr: 'نئے کثیر الانتخابی سوال کا بیان',
      options: [
        { id: 'A', textEn: 'Option A', textUr: 'آپشن الف' },
        { id: 'B', textEn: 'Option B', textUr: 'آپشن ب' },
        { id: 'C', textEn: 'Option C', textUr: 'آپشن ج' },
        { id: 'D', textEn: 'Option D', textUr: 'آپشن د' }
      ],
      correctOption: 'A',
      points: 1
    };
    updatePaper({
      ...paper,
      mcqs: [...paper.mcqs, newMcq]
    });
  };

  const addShortQuestion = () => {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
    const nextRoman = romanNumerals[paper.shortQuestions.length] || `${paper.shortQuestions.length + 1}`;
    const newShort: ExamShortQuestion = {
      id: `short_${Date.now()}`,
      numRoman: nextRoman,
      textEn: 'New short answer question statement',
      textUr: 'مختصر جواب کے لیے نیا سوال',
      points: 2
    };
    updatePaper({
      ...paper,
      shortQuestions: [...paper.shortQuestions, newShort]
    });
  };

  const addLongQuestion = () => {
    const newLong: ExamLongQuestion = {
      id: `long_${Date.now()}`,
      num: paper.longQuestions.length + 1,
      textEn: 'New detailed answer problem statement',
      textUr: 'تفصیلی جواب کے لیے نیا سوال',
      points: 5
    };
    updatePaper({
      ...paper,
      longQuestions: [...paper.longQuestions, newLong]
    });
  };

  // Insert math symbol or Urdu phrase
  const insertSymbol = (sym: string) => {
    if (!activeFieldKey) return;
    const { section, index, subKey } = activeFieldKey;

    if (section === 'header' && subKey) {
      const currentVal = (paper.header as any)[subKey] || '';
      updatePaper({
        ...paper,
        header: { ...paper.header, [subKey]: currentVal + sym }
      });
    } else if (section === 'mcq' && index !== undefined && subKey) {
      const updatedMcqs = [...paper.mcqs];
      const target = updatedMcqs[index];
      if (subKey.startsWith('opt_')) {
        const optId = subKey.replace('opt_', '') as 'A' | 'B' | 'C' | 'D';
        target.options = target.options.map((o) =>
          o.id === optId ? { ...o, textEn: o.textEn + sym } : o
        );
      } else {
        (target as any)[subKey] = ((target as any)[subKey] || '') + sym;
      }
      updatePaper({ ...paper, mcqs: updatedMcqs });
    } else if (section === 'short' && index !== undefined && subKey) {
      const updated = [...paper.shortQuestions];
      (updated[index] as any)[subKey] = ((updated[index] as any)[subKey] || '') + sym;
      updatePaper({ ...paper, shortQuestions: updated });
    } else if (section === 'long' && index !== undefined && subKey) {
      const updated = [...paper.longQuestions];
      (updated[index] as any)[subKey] = ((updated[index] as any)[subKey] || '') + sym;
      updatePaper({ ...paper, longQuestions: updated });
    }
  };

  // Auto Generate Paper handler
  const handleAutoGenerate = () => {
    const availableMcqs = fullQuestionBank.filter(
      (q) => q.type === 'mcq' && (genSubject === 'All' || q.subject === genSubject)
    );
    const availableShort = fullQuestionBank.filter(
      (q) => q.type === 'short' && (genSubject === 'All' || q.subject === genSubject)
    );
    const availableLong = fullQuestionBank.filter(
      (q) => q.type === 'long' && (genSubject === 'All' || q.subject === genSubject)
    );

    // If bank has fewer items, take all and pad with existing paper items
    const selectedMcqs: ExamMCQ[] = availableMcqs.slice(0, genNumMcqs).map((q, idx) => ({
      id: `gen_m_${idx}`,
      num: idx + 1,
      textEn: q.textEn,
      textUr: q.textUr,
      options: q.options || [
        { id: 'A', textEn: 'True', textUr: 'درست' },
        { id: 'B', textEn: 'False', textUr: 'غلط' },
        { id: 'C', textEn: 'Both', textUr: 'دونوں' },
        { id: 'D', textEn: 'None', textUr: 'کوئی نہیں' }
      ],
      correctOption: q.correctOption || 'A',
      explanation: q.solution,
      points: 1
    }));

    // Pad if needed from default paper
    if (selectedMcqs.length < genNumMcqs) {
      paper.mcqs.slice(0, genNumMcqs - selectedMcqs.length).forEach((m) => {
        selectedMcqs.push({
          ...m,
          id: `pad_m_${selectedMcqs.length}`,
          num: selectedMcqs.length + 1
        });
      });
    }

    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const selectedShort: ExamShortQuestion[] = availableShort.slice(0, genNumShort).map((q, idx) => ({
      id: `gen_s_${idx}`,
      numRoman: romanNumerals[idx] || `${idx + 1}`,
      textEn: q.textEn,
      textUr: q.textUr,
      solution: q.solution,
      points: 2
    }));

    if (selectedShort.length < genNumShort) {
      paper.shortQuestions.slice(0, genNumShort - selectedShort.length).forEach((s) => {
        selectedShort.push({
          ...s,
          id: `pad_s_${selectedShort.length}`,
          numRoman: romanNumerals[selectedShort.length] || `${selectedShort.length + 1}`
        });
      });
    }

    const selectedLong: ExamLongQuestion[] = availableLong.slice(0, genNumLong).map((q, idx) => ({
      id: `gen_l_${idx}`,
      num: idx + 1,
      textEn: q.textEn,
      textUr: q.textUr,
      solution: q.solution,
      points: 5
    }));

    if (selectedLong.length < genNumLong) {
      paper.longQuestions.slice(0, genNumLong - selectedLong.length).forEach((l) => {
        selectedLong.push({
          ...l,
          id: `pad_l_${selectedLong.length}`,
          num: selectedLong.length + 1
        });
      });
    }

    const totalCalculated =
      selectedMcqs.length * 1 + selectedShort.length * 2 + selectedLong.length * 5;

    updatePaper({
      id: `generated-${Date.now()}`,
      title: `${genGrade} ${genSubject} – Examination Paper`,
      header: {
        ...paper.header,
        className: genGrade.toUpperCase(),
        subjectName: genSubject,
        subjectNameUrdu:
          genSubject === 'Mathematics'
            ? 'ریاضی'
            : genSubject === 'Physics'
            ? 'طبیعیات'
            : genSubject === 'Chemistry'
            ? 'کیمسٹری'
            : 'کمپیوٹر سائنس',
        totalMarks: totalCalculated,
        syllabus: `Course Syllabus – Units 1 to 3`
      },
      mcqs: selectedMcqs,
      shortQuestions: selectedShort,
      longQuestions: selectedLong
    });

    setShowQuickGenModal(false);
    setActiveTab('preview');
  };

  // Common math symbols
  const mathSymbols = ['√', '²', '³', 'ⁿ', 'π', '∈', '∉', '⊂', '⊆', '∪', '∩', '±', '÷', '×', '≤', '≥', '≠', '≈', '°', 'θ', '½', 'log', '∑', '∫'];
  const urduPhrases = [
    { text: 'تعریف کریں', label: 'Define' },
    { text: 'مختصر کریں', label: 'Simplify' },
    { text: 'حل کریں', label: 'Solve' },
    { text: 'ثابت کریں', label: 'Prove that' },
    { text: 'معلوم کریں', label: 'Find' },
    { text: 'وضاحت کریں', label: 'Explain' },
    { text: 'عددی خط پر ظاہر کریں', label: 'On number line' },
    { text: 'درج ذیل کو', label: 'Following' },
    { text: 'ناطق عدد', label: 'Rational' },
    { text: 'غیر ناطق عدد', label: 'Irrational' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Controls */}
      <div className="no-print bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Exam Paper Generator
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                Bilingual (EN + UR)
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Standard board exam layout with A4 print, Nastaliq typography, and OMR bubble sheet.
            </p>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Preset Selector */}
            <select
              aria-label="Load preset exam"
              value={paper.id}
              onChange={(e) => loadPreset(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-medium bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="blank-paper">📄 Blank Paper (Clean Slate)</option>
              <optgroup label="9th Math Unit Tests">
                <option value="math-9th-unit1-real-numbers">Unit 1: Real & Complex (40M)</option>
                <option value="nuqta-9th-math-unit3-sets">Unit 3: Sets & Functions (40M)</option>
                <option value="nuqta-9th-math-unit5-inequalities">Unit 5: Inequalities (40M)</option>
                <option value="nuqta-9th-math-unit7-geometry">Unit 7: Coordinate Geometry (40M)</option>
                <option value="nuqta-9th-math-unit12-statistics">Unit 12: Statistics (40M)</option>
              </optgroup>
              <optgroup label="Board Mocks & Guess">
                <option value="zahidnotes-9th-math-full-board-mock">9th Math Full Mock (75M)</option>
                <option value="zahidnotes-9th-physics-guess-paper">9th Physics Guess (60M)</option>
                <option value="math-10th-unit1-quadratic">10th Math Unit 1 (40M)</option>
                <option value="physics-9th-unit1">9th Physics Unit 1 (40M)</option>
              </optgroup>
            </select>

            {/* Quick Auto-Generator */}
            <button
              onClick={() => setShowQuickGenModal(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-2xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto Gen</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 shadow-2xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
            >
              {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedNotification ? 'Copied' : 'Copy'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
              className="p-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {/* Export JSON */}
            <button
              onClick={handleExportJson}
              title="Save JSON"
              className="p-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Import JSON */}
            <label
              title="Load JSON"
              className="p-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            {/* Reset */}
            <button
              onClick={() => {
                if (confirm('Reset to default Unit 1 paper?')) {
                  updatePaper(JSON.parse(JSON.stringify(EXACT_9TH_MATH_UNIT1_PAPER)));
                }
              }}
              title="Reset paper"
              className="p-1.5 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Symbol Toolbar */}
        <div className="mt-3.5 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor ({paper.mcqs.length + paper.shortQuestions.length + paper.longQuestions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bank')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'bank'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bank ({fullQuestionBank.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pdf-archives')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'pdf-archives'
                  ? 'bg-emerald-600 text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>PDF Extractor & Library</span>
            </button>

            <button
              onClick={() => setActiveTab('pairing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'pairing'
                  ? 'bg-amber-600 text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Pairing</span>
            </button>

            <button
              onClick={() => setActiveTab('textbook')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'textbook'
                  ? 'bg-teal-600 text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Textbooks</span>
            </button>

            <button
              onClick={() => setActiveTab('solutions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'solutions'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Solutions & OMR</span>
            </button>
          </div>

          {/* Quick Math Symbols Strip */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] font-semibold text-neutral-400 shrink-0 mr-1">Insert:</span>
            {mathSymbols.slice(0, 12).map((sym) => (
              <button
                key={sym}
                onClick={() => insertSymbol(sym)}
                title={`Insert ${sym}`}
                className="px-2 py-0.5 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded border border-neutral-200 dark:border-neutral-700 shrink-0"
              >
                {sym}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW 1: PRINT PREVIEW (EXACT REPLICA OF THE ATTACHED PDF) */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {/* Paper Canvas Container (Styled like standard A4 Sheet) */}
          <div className="max-w-4xl mx-auto bg-neutral-200 dark:bg-neutral-950 p-2 sm:p-6 rounded-2xl overflow-x-auto">
            {/* PAGE 1: HEADER + OMR BUBBLE SHEET + OBJECTIVE PART */}
            <div className="print-container bg-white text-black p-6 sm:p-10 rounded-sm shadow-xl border border-neutral-300 min-h-[1100px] w-full max-w-[820px] mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print-page-break relative">
              
              {/* Optional Watermark */}
              {paper.header.showWatermark && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none rotate-[-30deg]">
                  <span className="text-6xl font-bold tracking-widest text-neutral-900 uppercase">
                    {paper.header.watermarkText || 'LEARNLAB EXAM'}
                  </span>
                </div>
              )}

              {/* Institution Title if set */}
              {paper.header.institutionName && (
                <div className="text-center pb-3 border-b-2 border-black mb-3">
                  <h1 className="text-2xl font-bold uppercase tracking-wider">{paper.header.institutionName}</h1>
                  {paper.header.institutionSubtitle && (
                    <p className="text-xs text-neutral-600">{paper.header.institutionSubtitle}</p>
                  )}
                </div>
              )}

              {/* Header Box Grid (Identical to Page 1 of PDF) */}
              <div className="border border-black rounded-sm mb-4 text-[13px] font-sans">
                {/* Row 1 */}
                <div className="grid grid-cols-4 border-b border-black">
                  <div className="p-1.5 border-r border-black flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Student Name</span>
                    <span className="h-4"></span>
                  </div>
                  <div className="p-1.5 border-r border-black flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Roll Number</span>
                    <span className="h-4"></span>
                  </div>
                  <div className="p-1.5 border-r border-black flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Class Name</span>
                    <span className="font-bold text-[13px]">{paper.header.className || '9TH'}</span>
                  </div>
                  <div className="p-1.5 flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Date</span>
                    <span className="text-[12px]">{paper.header.date || new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-4 border-b border-black">
                  <div className="p-1.5 border-r border-black flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Subject Name</span>
                    <span className="font-bold text-[13px]">{paper.header.subjectName}</span>
                  </div>
                  <div className="p-1.5 border-r border-black flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Time Allowed</span>
                    <span className="font-medium text-[12px]">{paper.header.timeAllowed}</span>
                  </div>
                  <div className="p-1.5 border-r border-black flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Total Marks</span>
                    <span className="font-bold text-[13px]">{paper.header.totalMarks}</span>
                  </div>
                  <div className="p-1.5 flex flex-col justify-between min-h-[46px]">
                    <span className="font-semibold text-[11px] text-neutral-700">Exam</span>
                    <span className="font-medium text-[12px]">{paper.header.examName || 'Unit 1'}</span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="p-1.5">
                  <span className="font-semibold text-[11px] text-neutral-700 block">Exam Syllabus</span>
                  <span className="font-semibold text-[12px] uppercase">{paper.header.syllabus}</span>
                </div>
              </div>

              {/* OMR Bubble Sheet Grid (Optional toggle, matches Page 1) */}
              {paper.header.showOmrSheet && (
                <div className="border border-black rounded-sm p-2 mb-5 text-[12px]">
                  <div className="grid grid-cols-4 gap-x-4 gap-y-1">
                    {paper.mcqs.map((m, idx) => (
                      <div key={m.id} className="flex items-center gap-1.5 font-mono">
                        <span className="w-5 font-bold text-neutral-800">{idx + 1}.</span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[10px]">A</span>
                          <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[10px]">B</span>
                          <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[10px]">C</span>
                          <span className="w-4 h-4 rounded-full border border-neutral-700 flex items-center justify-center text-[10px]">D</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION HEADER: Objective Part / حصہ معروضی */}
              <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-4">
                <span className="text-lg font-bold font-sans tracking-wide">Objective Part</span>
                <span className="text-2xl font-bold font-urdu">حصہ معروضی</span>
              </div>

              {/* Question 1 Instruction Line */}
              <div className="flex items-center justify-between text-[13px] font-semibold mb-5 pb-1 border-b border-neutral-300">
                <span>{paper.instructionsEn || 'Q1. Choose the correct answer. (1 × 10 = 10)'}</span>
                <span className="font-urdu text-[15px]" dir="rtl">
                  {paper.instructionsUr || 'سوال نمبر 1۔ چار ممکنہ جوابات میں سے درست پر دائرہ لگائیں۔'}
                </span>
              </div>

              {/* MCQs List (10 Items, Two-Column Bilingual layout) */}
              <div className="space-y-4">
                {paper.mcqs.map((mcq, idx) => (
                  <div key={mcq.id} className="print-avoid-break text-[13px] leading-relaxed">
                    {/* Question Statement: Left English, Right Urdu */}
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="font-semibold text-neutral-900 flex-1">
                        <span>{idx + 1}. </span>
                        <span>{mcq.textEn}</span>
                      </div>
                      <div className="font-urdu text-[15px] text-right font-medium text-neutral-900 flex-1" dir="rtl">
                        <span>{idx + 1}۔ </span>
                        <span>{mcq.textUr}</span>
                      </div>
                    </div>

                    {/* 4 Options Grid (A, B, C, D) */}
                    <div className="grid grid-cols-4 gap-2 text-[12px] pl-4 pr-4">
                      {mcq.options.map((opt) => (
                        <div key={opt.id} className="flex items-center gap-1.5">
                          <span className="font-bold font-mono">({opt.id})</span>
                          <span className="font-medium">{opt.textEn}</span>
                          {opt.textUr && (
                            <span className="font-urdu text-[13px] text-neutral-800" dir="rtl">
                              {opt.textUr}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK INDICATOR (Non-Print Helper) */}
            <div className="no-print my-6 flex items-center justify-center gap-3 text-neutral-400 text-xs font-mono">
              <span className="w-16 h-px bg-neutral-400"></span>
              <span>--- PAGE 2 (SUBJECTIVE PART / حصہ انشائیہ) ---</span>
              <span className="w-16 h-px bg-neutral-400"></span>
            </div>

            {/* PAGE 2: SUBJECTIVE PART (SHORT QUESTIONS & LONG QUESTIONS) */}
            <div className="print-container bg-white text-black p-6 sm:p-10 rounded-sm shadow-xl border border-neutral-300 min-h-[1100px] w-full max-w-[820px] mx-auto print:shadow-none print:border-none print:p-0 print:m-0 relative">
              
              {/* Optional Watermark */}
              {paper.header.showWatermark && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none rotate-[-30deg]">
                  <span className="text-6xl font-bold tracking-widest text-neutral-900 uppercase">
                    {paper.header.watermarkText || 'LEARNLAB EXAM'}
                  </span>
                </div>
              )}

              {/* Section Header: Subjective Part / حصہ انشائیہ */}
              <div className="flex items-center justify-between border-b-2 border-black pb-1 mb-4">
                <span className="text-lg font-bold font-sans tracking-wide">Subjective Part</span>
                <span className="text-2xl font-bold font-urdu">حصہ انشائیہ</span>
              </div>

              {/* Q2 Header: Short Answers */}
              <div className="flex items-center justify-between text-[13px] font-semibold mb-4 pb-1 border-b border-neutral-300">
                <span>Q2. Write short answers of the following questions. (2 × 10 = 20)</span>
                <span className="font-urdu text-[15px]" dir="rtl">
                  سوال نمبر 2۔ مندرجہ ذیل سوالات کے مختصر جوابات تحریر کریں۔
                </span>
              </div>

              {/* Short Questions List (Roman Numerals I to X) */}
              <div className="space-y-3 mb-6">
                {paper.shortQuestions.map((sq, idx) => (
                  <div key={sq.id} className="print-avoid-break text-[13px] leading-relaxed">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: English */}
                      <div className="flex-1 font-medium">
                        <span className="font-bold mr-1">{sq.numRoman || idx + 1}</span>
                        <span>{sq.textEn}</span>
                      </div>
                      {/* Right: Urdu */}
                      <div className="flex-1 text-right font-urdu text-[15px]" dir="rtl">
                        <span className="font-bold ml-1">{sq.numRoman || idx + 1}۔</span>
                        <span>{sq.textUr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Q3 Header: Detailed Answers */}
              <div className="flex items-center justify-between text-[13px] font-semibold mb-4 pt-3 pb-1 border-t-2 border-b border-neutral-400">
                <span>Q3. Write detailed answers of the following questions. (5 × 2 = 10)</span>
                <span className="font-urdu text-[15px]" dir="rtl">
                  سوال نمبر 3۔ مندرجہ ذیل سوالات کے تفصیلی جوابات تحریر کریں۔
                </span>
              </div>

              {/* Long Questions List (1 and 2) */}
              <div className="space-y-4">
                {paper.longQuestions.map((lq, idx) => (
                  <div key={lq.id} className="print-avoid-break text-[13px] leading-relaxed">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: English */}
                      <div className="flex-1 font-medium">
                        <span className="font-bold mr-1">{idx + 1}.</span>
                        <span>{lq.textEn}</span>
                      </div>
                      {/* Right: Urdu */}
                      <div className="flex-1 text-right font-urdu text-[15px]" dir="rtl">
                        <span className="font-bold ml-1">{idx + 1}۔</span>
                        <span>{lq.textUr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom End Mark */}
              <div className="mt-12 text-center text-xs text-neutral-400 font-mono tracking-widest uppercase">
                *** END OF EXAMINATION PAPER ***
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE PAPER EDITOR */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          {/* Header Settings Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">Exam Header & Paper Settings</h3>
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                Total Marks: {paper.header.totalMarks}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Institution / School Name
                </label>
                <input
                  type="text"
                  value={paper.header.institutionName}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, institutionName: e.target.value }
                    })
                  }
                  placeholder="e.g. Govt. High School / Academy"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  value={paper.header.className}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, className: e.target.value }
                    })
                  }
                  placeholder="e.g. 9TH, 10TH"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Subject (English)
                </label>
                <input
                  type="text"
                  value={paper.header.subjectName}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, subjectName: e.target.value }
                    })
                  }
                  placeholder="e.g. Mathematics"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Subject (Urdu)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={paper.header.subjectNameUrdu}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, subjectNameUrdu: e.target.value }
                    })
                  }
                  placeholder="مثلاً ریاضی، طبیعیات"
                  className="w-full px-3 py-2 text-xs font-urdu bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Time Allowed
                </label>
                <input
                  type="text"
                  value={paper.header.timeAllowed}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, timeAllowed: e.target.value }
                    })
                  }
                  placeholder="e.g. 1 Hour 15 Mins"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Total Marks
                </label>
                <input
                  type="number"
                  value={paper.header.totalMarks}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, totalMarks: parseInt(e.target.value, 10) || 0 }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Exam Type / Name
                </label>
                <input
                  type="text"
                  value={paper.header.examName}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, examName: e.target.value }
                    })
                  }
                  placeholder="e.g. Unit 1 Examination"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-1">
                  Exam Syllabus
                </label>
                <input
                  type="text"
                  value={paper.header.syllabus}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, syllabus: e.target.value }
                    })
                  }
                  placeholder="e.g. UNIT 1: Real Numbers"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paper.header.showOmrSheet}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, showOmrSheet: e.target.checked }
                    })
                  }
                  className="rounded text-teal-600"
                />
                <span>Include OMR Bubble Sheet on Page 1</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paper.header.showWatermark}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, showWatermark: e.target.checked }
                    })
                  }
                  className="rounded text-teal-600"
                />
                <span>Show Security Watermark</span>
              </label>

              {paper.header.showWatermark && (
                <input
                  type="text"
                  value={paper.header.watermarkText}
                  onChange={(e) =>
                    updatePaper({
                      ...paper,
                      header: { ...paper.header, watermarkText: e.target.value }
                    })
                  }
                  placeholder="Watermark text"
                  className="px-2.5 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-800 dark:text-neutral-200"
                />
              )}
            </div>
          </div>

          {/* Section 1: Objective MCQs Editor */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                  Objective Part – Multiple Choice Questions ({paper.mcqs.length})
                </h3>
                <p className="text-xs text-neutral-500">Each question is rendered with English on Left and Urdu on Right.</p>
              </div>
              <button
                onClick={addMcq}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add MCQ</span>
              </button>
            </div>

            <div className="space-y-4">
              {paper.mcqs.map((mcq, idx) => (
                <div
                  key={mcq.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                      MCQ #{idx + 1}
                    </span>
                    <button
                      onClick={() =>
                        updatePaper({
                          ...paper,
                          mcqs: paper.mcqs.filter((_, i) => i !== idx)
                        })
                      }
                      className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Question English & Urdu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                        Question Text (English)
                      </label>
                      <input
                        type="text"
                        value={mcq.textEn}
                        onFocus={() => setActiveFieldKey({ section: 'mcq', index: idx, subKey: 'textEn' })}
                        onChange={(e) => {
                          const updated = [...paper.mcqs];
                          updated[idx].textEn = e.target.value;
                          updatePaper({ ...paper, mcqs: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1 text-right">
                        سوال کا متن (اردو)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={mcq.textUr}
                        onFocus={() => setActiveFieldKey({ section: 'mcq', index: idx, subKey: 'textUr' })}
                        onChange={(e) => {
                          const updated = [...paper.mcqs];
                          updated[idx].textUr = e.target.value;
                          updatePaper({ ...paper, mcqs: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs font-urdu bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                  </div>

                  {/* 4 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    {mcq.options.map((opt) => (
                      <div key={opt.id} className="space-y-1 bg-white dark:bg-neutral-900 p-2 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span>Option ({opt.id})</span>
                          <label className="flex items-center gap-1 text-[10px] text-teal-600 cursor-pointer">
                            <input
                              type="radio"
                              name={`correct_${mcq.id}`}
                              checked={mcq.correctOption === opt.id}
                              onChange={() => {
                                const updated = [...paper.mcqs];
                                updated[idx].correctOption = opt.id;
                                updatePaper({ ...paper, mcqs: updated });
                              }}
                            />
                            <span>Correct</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          value={opt.textEn}
                          placeholder="English"
                          onFocus={() => setActiveFieldKey({ section: 'mcq', index: idx, subKey: `opt_${opt.id}` })}
                          onChange={(e) => {
                            const updated = [...paper.mcqs];
                            updated[idx].options = updated[idx].options.map((o) =>
                              o.id === opt.id ? { ...o, textEn: e.target.value } : o
                            );
                            updatePaper({ ...paper, mcqs: updated });
                          }}
                          className="w-full px-2 py-1 text-[11px] bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded"
                        />
                        <input
                          type="text"
                          dir="rtl"
                          value={opt.textUr}
                          placeholder="اردو"
                          onChange={(e) => {
                            const updated = [...paper.mcqs];
                            updated[idx].options = updated[idx].options.map((o) =>
                              o.id === opt.id ? { ...o, textUr: e.target.value } : o
                            );
                            updatePaper({ ...paper, mcqs: updated });
                          }}
                          className="w-full px-2 py-1 text-[11px] font-urdu bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Short Questions Editor */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                  Subjective Part – Short Questions ({paper.shortQuestions.length})
                </h3>
                <p className="text-xs text-neutral-500">2 Marks per question with Roman numerals (I to X).</p>
              </div>
              <button
                onClick={addShortQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Short Question</span>
              </button>
            </div>

            <div className="space-y-4">
              {paper.shortQuestions.map((sq, idx) => (
                <div
                  key={sq.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                      Short #{sq.numRoman || idx + 1}
                    </span>
                    <button
                      onClick={() =>
                        updatePaper({
                          ...paper,
                          shortQuestions: paper.shortQuestions.filter((_, i) => i !== idx)
                        })
                      }
                      className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                        English Statement
                      </label>
                      <input
                        type="text"
                        value={sq.textEn}
                        onFocus={() => setActiveFieldKey({ section: 'short', index: idx, subKey: 'textEn' })}
                        onChange={(e) => {
                          const updated = [...paper.shortQuestions];
                          updated[idx].textEn = e.target.value;
                          updatePaper({ ...paper, shortQuestions: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1 text-right">
                        اردو بیان
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={sq.textUr}
                        onFocus={() => setActiveFieldKey({ section: 'short', index: idx, subKey: 'textUr' })}
                        onChange={(e) => {
                          const updated = [...paper.shortQuestions];
                          updated[idx].textUr = e.target.value;
                          updatePaper({ ...paper, shortQuestions: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs font-urdu bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Solution / Marking Key (for Answer Sheet)
                    </label>
                    <input
                      type="text"
                      value={sq.solution || ''}
                      onChange={(e) => {
                        const updated = [...paper.shortQuestions];
                        updated[idx].solution = e.target.value;
                        updatePaper({ ...paper, shortQuestions: updated });
                      }}
                      placeholder="Step-by-step answer"
                      className="w-full px-3 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-700 dark:text-neutral-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Long Questions Editor */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                  Detailed Answers – Long Questions ({paper.longQuestions.length})
                </h3>
                <p className="text-xs text-neutral-500">5 Marks per question with comprehensive problem steps.</p>
              </div>
              <button
                onClick={addLongQuestion}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Long Question</span>
              </button>
            </div>

            <div className="space-y-4">
              {paper.longQuestions.map((lq, idx) => (
                <div
                  key={lq.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                      Long Question #{idx + 1}
                    </span>
                    <button
                      onClick={() =>
                        updatePaper({
                          ...paper,
                          longQuestions: paper.longQuestions.filter((_, i) => i !== idx)
                        })
                      }
                      className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                        English Problem Statement
                      </label>
                      <textarea
                        rows={3}
                        value={lq.textEn}
                        onFocus={() => setActiveFieldKey({ section: 'long', index: idx, subKey: 'textEn' })}
                        onChange={(e) => {
                          const updated = [...paper.longQuestions];
                          updated[idx].textEn = e.target.value;
                          updatePaper({ ...paper, longQuestions: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-500 mb-1 text-right">
                        اردو سوال کا بیان
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={lq.textUr}
                        onFocus={() => setActiveFieldKey({ section: 'long', index: idx, subKey: 'textUr' })}
                        onChange={(e) => {
                          const updated = [...paper.longQuestions];
                          updated[idx].textUr = e.target.value;
                          updatePaper({ ...paper, longQuestions: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs font-urdu bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
                      Solution / Proof Breakdown
                    </label>
                    <textarea
                      rows={2}
                      value={lq.solution || ''}
                      onChange={(e) => {
                        const updated = [...paper.longQuestions];
                        updated[idx].solution = e.target.value;
                        updatePaper({ ...paper, longQuestions: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-700 dark:text-neutral-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: QUESTION BANK BROWSER WITH CLASS & SUBJECT FILTERS */}
      {activeTab === 'bank' && (() => {
        const filteredBank = fullQuestionBank.filter((item) => {
          if (bankGrade !== 'All' && item.grade !== bankGrade) return false;
          if (bankSubject !== 'All' && item.subject.toLowerCase() !== bankSubject.toLowerCase()) return false;
          if (bankType !== 'All' && item.type !== bankType) return false;
          if (bankHighYieldOnly && !item.isHighYield) return false;
          if (bankSearch) {
            const term = bankSearch.toLowerCase();
            const matchEn = item.textEn.toLowerCase().includes(term);
            const matchUr = item.textUr.includes(term);
            const matchUnit = item.unit.toLowerCase().includes(term);
            if (!matchEn && !matchUr && !matchUnit) return false;
          }
          return true;
        });

        return (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                  <span>Question Bank</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-mono font-bold">
                    {fullQuestionBank.length} Questions
                  </span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Organized by class directory & subject sub-directory. Repetitions in the same chapter are filtered out.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {fullQuestionBank.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllQuestionBank}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                    title="Immediately delete all questions from the question bank and stored PDFs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete All Bank Data ({fullQuestionBank.length})</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIncludePresetQuestions(!includePresetQuestions)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    includePresetQuestions
                      ? 'bg-teal-600 text-white border-teal-700 shadow-2xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200'
                  }`}
                  title="Toggle built-in sample reference questions"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Sample Reference ({includePresetQuestions ? 'On' : 'Off'})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('pdf-archives')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>PDF Extractor</span>
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {bankNotification && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-900/60 text-xs font-semibold animate-in fade-in">
                <Trash2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>{bankNotification}</span>
              </div>
            )}

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800">
              {/* Class Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Class
                </label>
                <select
                  aria-label="Filter by class"
                  value={bankGrade}
                  onChange={(e) => setBankGrade(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="All">All Classes</option>
                  <option value="9th">9th Class (Matric Part 1)</option>
                  <option value="10th">10th Class (Matric Part 2)</option>
                  <option value="11th">11th Class (1st Year / FSc)</option>
                  <option value="12th">12th Class (2nd Year / FSc)</option>
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Subject
                </label>
                <select
                  aria-label="Filter by subject"
                  value={bankSubject}
                  onChange={(e) => setBankSubject(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="All">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Islamic Studies">Islamic Studies</option>
                  <option value="Pakistan Studies">Pakistan Studies</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Type
                </label>
                <select
                  aria-label="Filter by question type"
                  value={bankType}
                  onChange={(e) => setBankType(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="mcq">MCQs (Objective)</option>
                  <option value="short">Short Questions</option>
                  <option value="long">Long Questions</option>
                </select>
              </div>

              {/* Search Keyword */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Search Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={bankSearch}
                    onChange={(e) => setBankSearch(e.target.value)}
                    placeholder="Search in English or اردو..."
                    className="w-full pl-7 pr-2.5 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2 top-2" />
                </div>
              </div>

              {/* High-Yield Toggle */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => setBankHighYieldOnly(!bankHighYieldOnly)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
                    bankHighYieldOnly
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${bankHighYieldOnly ? 'fill-current' : ''}`} />
                  <span>★ Guess Only</span>
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {fullQuestionBank.length === 0 ? (
                <div className="p-10 text-center rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Question Bank is Clean
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-md mx-auto">
                      All default question bank and PDF data have been cleared. Upload chapter test PDFs in the PDF Extractor to extract and store questions into your class directory and subject sub-directory.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('pdf-archives')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4" />
                      <span>Upload PDF to Class/Subject Directory</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIncludePresetQuestions(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-xs font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      <span>Load Sample Reference Questions ({COMPREHENSIVE_QUESTION_BANK.length})</span>
                    </button>
                  </div>
                </div>
              ) : filteredBank.length === 0 ? (
                <div className="p-8 text-center text-neutral-500 text-xs bg-neutral-50/50 dark:bg-neutral-950/30 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  No questions match your current filters. Try changing class, subject, or search term.
                </div>
              ) : (
                filteredBank.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold">
                        <span className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase">
                          {item.type}
                        </span>
                        <span className="text-neutral-600 dark:text-neutral-400 font-medium">{item.grade} {item.subject}</span>
                        <span className="text-neutral-400">•</span>
                        <span className="text-neutral-600 dark:text-neutral-400 font-medium">{item.unit}</span>
                        {item.isHighYield && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-bold">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            ★ ZahidNotes High-Yield / Guess
                          </span>
                        )}
                        {item.boardTag && (
                          <span className="text-neutral-400 text-[9px] italic">
                            ({item.boardTag})
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-1">
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex-1 leading-relaxed">
                          {item.textEn}
                        </p>
                        <p className="text-xs font-urdu text-neutral-800 dark:text-neutral-200 text-right flex-1 leading-relaxed" dir="rtl">
                          {item.textUr}
                        </p>
                      </div>

                      {/* Options Preview for MCQs */}
                      {item.type === 'mcq' && item.options && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {item.options.map((opt: MCQOption) => (
                            <div
                              key={opt.id}
                              className={`px-2 py-1 rounded text-[11px] border flex items-center justify-between ${
                                opt.id === item.correctOption
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 font-semibold'
                                  : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              <span>({opt.id}) {opt.textEn}</span>
                              <span className="font-urdu" dir="rtl">{opt.textUr}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (item.type === 'mcq') {
                          updatePaper({
                            ...paper,
                            mcqs: [
                              ...paper.mcqs,
                              {
                                id: `qb_add_${Date.now()}`,
                                num: paper.mcqs.length + 1,
                                textEn: item.textEn,
                                textUr: item.textUr,
                                options: item.options || [
                                  { id: 'A', textEn: 'Option A', textUr: 'الف' },
                                  { id: 'B', textEn: 'Option B', textUr: 'ب' },
                                  { id: 'C', textEn: 'Option C', textUr: 'ج' },
                                  { id: 'D', textEn: 'Option D', textUr: 'د' }
                                ],
                                correctOption: item.correctOption || 'A',
                                explanation: item.solution,
                                points: 1,
                                chapter: item.unit,
                                isHighYield: item.isHighYield,
                                boardTag: item.boardTag
                              }
                            ]
                          });
                        } else if (item.type === 'short') {
                          const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];
                          updatePaper({
                            ...paper,
                            shortQuestions: [
                              ...paper.shortQuestions,
                              {
                                id: `qb_add_${Date.now()}`,
                                numRoman: romanNumerals[paper.shortQuestions.length] || `${paper.shortQuestions.length + 1}`,
                                textEn: item.textEn,
                                textUr: item.textUr,
                                solution: item.solution,
                                points: 2,
                                chapter: item.unit,
                                isHighYield: item.isHighYield,
                                boardTag: item.boardTag
                              }
                            ]
                          });
                        } else {
                          updatePaper({
                            ...paper,
                            longQuestions: [
                              ...paper.longQuestions,
                              {
                                id: `qb_add_${Date.now()}`,
                                num: paper.longQuestions.length + 1,
                                textEn: item.textEn,
                                textUr: item.textUr,
                                solution: item.solution,
                                points: 5,
                                chapter: item.unit,
                                isHighYield: item.isHighYield,
                                boardTag: item.boardTag
                              }
                            ]
                          });
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 shrink-0 self-start md:self-center transition-colors"
                    >
                      + Add to Paper
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })()}

      {/* VIEW 4: BOARD PAPER PAIRING SCHEMES (ZAHIDNOTES) */}
      {activeTab === 'pairing' && (() => {
        const activeScheme = BOARD_PAIRING_SCHEMES.find((s) => s.id === selectedPairingId) || BOARD_PAIRING_SCHEMES[0];

        return (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 uppercase">
                    Punjab Boards & FBISE
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">Official Pattern</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                  Board Pairing Scheme (پیئرنگ اسکیم)
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Paper distribution patterns across MCQs, short questions, and long problems.
                </p>
              </div>

              {/* Scheme Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  aria-label="Select Subject Pairing Scheme"
                  value={selectedPairingId}
                  onChange={(e) => setSelectedPairingId(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none"
                >
                  {BOARD_PAIRING_SCHEMES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.className} Class {s.subject} ({s.totalMarks}M)
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => assemblePaperFromPairing(activeScheme.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 text-white shadow-2xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Assemble Paper</span>
                </button>
              </div>
            </div>

            {/* Scheme Metadata Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30">
                <span className="text-[10px] font-bold uppercase text-neutral-500">Subject</span>
                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50">{activeScheme.className} {activeScheme.subject}</p>
                <p className="text-xs font-urdu text-neutral-600 dark:text-neutral-400" dir="rtl">{activeScheme.subjectUrdu}</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30">
                <span className="text-[10px] font-bold uppercase text-neutral-500">Total Marks</span>
                <p className="text-sm font-bold text-emerald-600">{activeScheme.totalMarks} Marks</p>
                <p className="text-[11px] text-neutral-500">{activeScheme.timeAllowed}</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30">
                <span className="text-[10px] font-bold uppercase text-neutral-500">Objective Section</span>
                <p className="text-sm font-bold text-teal-600">{activeScheme.mcqMarks} MCQs</p>
                <p className="text-[11px] text-neutral-500">1 Mark per question</p>
              </div>
              <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30">
                <span className="text-[10px] font-bold uppercase text-neutral-500">Subjective Section</span>
                <p className="text-sm font-bold text-indigo-600">{activeScheme.shortMarks + activeScheme.longMarks} Marks</p>
                <p className="text-[11px] text-neutral-500">Short: {activeScheme.shortMarks}m | Long: {activeScheme.longMarks}m</p>
              </div>
            </div>

            {/* Pattern Overview Banner */}
            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 space-y-2">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                {activeScheme.patternOverview}
              </div>
              <div className="text-xs font-urdu text-amber-900 dark:text-amber-200 text-right" dir="rtl">
                {activeScheme.patternOverviewUrdu}
              </div>
            </div>

            {/* Section Breakdown Groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/20 space-y-3">
                <h4 className="text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  Short Questions Pairing Groupings
                </h4>
                <div className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <p className="font-semibold text-teal-700 dark:text-teal-400">Q2 Grouping:</p>
                    <p>{activeScheme.questionGroups.q2NotesEn}</p>
                    <p className="font-urdu text-right mt-1 text-neutral-500" dir="rtl">{activeScheme.questionGroups.q2NotesUr}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <p className="font-semibold text-teal-700 dark:text-teal-400">Q3 Grouping:</p>
                    <p>{activeScheme.questionGroups.q3NotesEn}</p>
                    <p className="font-urdu text-right mt-1 text-neutral-500" dir="rtl">{activeScheme.questionGroups.q3NotesUr}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <p className="font-semibold text-teal-700 dark:text-teal-400">Q4 Grouping:</p>
                    <p>{activeScheme.questionGroups.q4NotesEn}</p>
                    <p className="font-urdu text-right mt-1 text-neutral-500" dir="rtl">{activeScheme.questionGroups.q4NotesUr}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/20 space-y-3">
                <h4 className="text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  Long Questions & Theorems Pairing
                </h4>
                <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
                  <p className="font-semibold text-indigo-700 dark:text-indigo-400">Board Long Question Combinations:</p>
                  <p className="leading-relaxed">{activeScheme.questionGroups.longNotesEn}</p>
                  <p className="font-urdu text-right leading-relaxed text-neutral-500" dir="rtl">{activeScheme.questionGroups.longNotesUr}</p>
                </div>
              </div>
            </div>

            {/* Chapter-by-Chapter Weightage Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300">
                Chapter-Wise Weightage Matrix
              </h4>
              <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-neutral-100 dark:bg-neutral-800/60 font-semibold text-neutral-700 dark:text-neutral-300">
                    <tr>
                      <th className="p-2.5">Unit #</th>
                      <th className="p-2.5">Chapter Title (English)</th>
                      <th className="p-2.5 text-right">عنوان باب (اردو)</th>
                      <th className="p-2.5 text-center">MCQs</th>
                      <th className="p-2.5 text-center">Short Qs</th>
                      <th className="p-2.5">Long Question Combination</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {activeScheme.chapters.map((ch) => (
                      <tr key={ch.chapterNumber} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-950/30">
                        <td className="p-2.5 font-bold">{ch.chapterNumber}</td>
                        <td className="p-2.5 font-medium">{ch.chapterTitleEn}</td>
                        <td className="p-2.5 font-urdu text-right" dir="rtl">{ch.chapterTitleUr}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-teal-600">{ch.mcqCount}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-indigo-600">{ch.shortQuestionCount} ({ch.shortQuestionGroup})</td>
                        <td className="p-2.5 text-neutral-600 dark:text-neutral-400 text-[11px]">{ch.longQuestionPairing || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })()}

      {/* VIEW 5: TEXTBOOK INDEX & SYLLABUS CATALOG (PTB) */}
      {activeTab === 'textbook' && (() => {
        const availableBooksForGrade = TEXTBOOK_CHAPTERS_CATALOG.filter(
          (c) => c.grade.toLowerCase() === selectedTextbookGrade.toLowerCase()
        );
        const catalogItem =
          availableBooksForGrade.find(
            (c) => c.subject.toLowerCase() === selectedTextbookSubject.toLowerCase()
          ) ||
          availableBooksForGrade[0] ||
          TEXTBOOK_CHAPTERS_CATALOG[0];

        const filteredChapters = catalogItem.chapters.filter((ch) => {
          if (!textbookSearch) return true;
          const s = textbookSearch.toLowerCase();
          return (
            ch.titleEn.toLowerCase().includes(s) ||
            ch.titleUr.includes(s) ||
            `unit ${ch.unitNumber}`.includes(s) ||
            ch.keyConcepts.some((k) => k.toLowerCase().includes(s))
          );
        });

        return (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 uppercase">
                    Punjab Curriculum & Textbook Board (PTB)
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">Full Curriculum Index</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                  Textbook Syllabus & Chapter Index (نصاب و کتب)
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Explore complete chapters, key concepts, and SLO targets across all subjects for 9th, 10th, 11th, and 12th classes.
                </p>
              </div>

              {/* Class & Subject Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  aria-label="Select Grade"
                  value={selectedTextbookGrade}
                  onChange={(e) => {
                    const newGrade = e.target.value;
                    setSelectedTextbookGrade(newGrade);
                    const matching = TEXTBOOK_CHAPTERS_CATALOG.filter(
                      (c) => c.grade.toLowerCase() === newGrade.toLowerCase()
                    );
                    if (!matching.some((m) => m.subject.toLowerCase() === selectedTextbookSubject.toLowerCase())) {
                      setSelectedTextbookSubject(matching[0]?.subject || 'Mathematics');
                    }
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
                >
                  <option value="9th">9th Class (Matric Part 1)</option>
                  <option value="10th">10th Class (Matric Part 2)</option>
                  <option value="11th">11th Class (1st Year / FSc Part 1)</option>
                  <option value="12th">12th Class (2nd Year / FSc Part 2)</option>
                </select>

                <select
                  aria-label="Select Subject"
                  value={catalogItem.subject}
                  onChange={(e) => setSelectedTextbookSubject(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
                >
                  {availableBooksForGrade.map((sub) => (
                    <option key={sub.subject} value={sub.subject}>
                      {sub.subject} ({sub.subjectUrdu}) – {sub.chapters.length} Units
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {availableBooksForGrade.map((sub) => (
                <button
                  key={sub.subject}
                  onClick={() => setSelectedTextbookSubject(sub.subject)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    catalogItem.subject.toLowerCase() === sub.subject.toLowerCase()
                      ? 'bg-teal-600 text-white font-semibold shadow-2xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span>{sub.subject}</span>
                  <span className="font-urdu text-[11px]" dir="rtl">({sub.subjectUrdu})</span>
                  <span className="text-[10px] opacity-75 font-mono">({sub.chapters.length})</span>
                </button>
              ))}
            </div>

            {/* Search Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={textbookSearch}
                  onChange={(e) => setTextbookSearch(e.target.value)}
                  placeholder={`Search ${catalogItem.subject} units, topics or concepts...`}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="text-xs text-neutral-500 font-medium">
                Showing {filteredChapters.length} of {catalogItem.chapters.length} Chapters in {catalogItem.grade} {catalogItem.subject}
              </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredChapters.map((ch) => (
                <div
                  key={ch.unitNumber}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 space-y-3 flex flex-col justify-between hover:border-teal-500/40 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200">
                        Unit {ch.unitNumber}
                      </span>
                      <button
                        onClick={() => {
                          setBankGrade(catalogItem.grade);
                          setBankSubject(catalogItem.subject);
                          setBankSearch(ch.titleEn.split(' ')[0]);
                          setActiveTab('bank');
                        }}
                        className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-1 cursor-pointer"
                      >
                        <Search className="w-3 h-3" />
                        <span>Find Questions</span>
                      </button>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {ch.titleEn}
                      </h4>
                      <h5 className="text-sm font-urdu text-neutral-700 dark:text-neutral-300 text-right mt-0.5" dir="rtl">
                        {ch.titleUr}
                      </h5>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Key Concepts & SLOs:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {ch.keyConcepts.map((kc, kidx) => (
                          <span
                            key={kidx}
                            className="px-2 py-0.5 rounded text-[10px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
                          >
                            {kc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* VIEW 4: ANSWER KEY & OMR EVALUATION */}
      {activeTab === 'solutions' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                Official Answer Key & Marking Scheme
              </h3>
              <p className="text-xs text-neutral-500">Filled OMR answer sheet and step-by-step grading solutions.</p>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Solution Key</span>
            </button>
          </div>

          {/* OMR Filled Bubble Matrix for Teachers */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/40 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              1. Objective Part – Correct OMR Bubbles
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {paper.mcqs.map((mcq, idx) => (
                <div
                  key={mcq.id}
                  className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs flex items-center justify-between"
                >
                  <span className="font-bold">Q{idx + 1}:</span>
                  <div className="flex items-center gap-1">
                    {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                      <span
                        key={opt}
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          mcq.correctOption === opt
                            ? 'bg-black text-white dark:bg-white dark:text-black font-black'
                            : 'border border-neutral-300 dark:border-neutral-700 text-neutral-400'
                        }`}
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Short Questions Step-by-Step Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              2. Subjective Part – Short Answers Marking Scheme
            </h4>
            {paper.shortQuestions.map((sq, idx) => (
              <div
                key={sq.id}
                className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>Part {sq.numRoman || idx + 1}: {sq.textEn}</span>
                  <span className="text-teal-600 font-mono">2 Marks</span>
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 p-2 rounded border border-neutral-200 dark:border-neutral-800">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">Solution: </span>
                  {sq.solution || 'Award full marks for correct definitions, standard formula, and numerical answer.'}
                </div>
              </div>
            ))}
          </div>

          {/* Long Questions Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              3. Subjective Part – Detailed Answers Marking Scheme
            </h4>
            {paper.longQuestions.map((lq, idx) => (
              <div
                key={lq.id}
                className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span>Question #{idx + 1}: {lq.textEn}</span>
                  <span className="text-teal-600 font-mono">5 Marks</span>
                </div>
                <div className="text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-900 p-2.5 rounded border border-neutral-200 dark:border-neutral-800 leading-relaxed font-mono">
                  {lq.solution || 'Award step-wise marks: Formula (1 Mark), Algebraic simplification (2 Marks), Final simplified answer (2 Marks).'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: CHAPTERWISE PDF ARCHIVE & EXTRACTOR */}
      {activeTab === 'pdf-archives' && (
        <ChapterPdfExtractorView
          onLoadPreset={(presetId) => {
            loadPreset(presetId);
            setActiveTab('preview');
          }}
          onNavigateToBank={(unitFilter) => {
            if (unitFilter) {
              setBankSearch(unitFilter);
            }
            setActiveTab('bank');
          }}
          onSetPaper={(p) => {
            updatePaper(p);
            setActiveTab('preview');
          }}
          onAddQuestionsToBank={handleAddQuestionsToBank}
          onClearBank={handleClearAllQuestionBank}
          totalBankCount={fullQuestionBank.length}
        />
      )}

      {/* QUICK AUTO-GENERATOR MODAL */}
      {showQuickGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                  Auto-Generate Exam Paper
                </h3>
              </div>
              <button
                onClick={() => setShowQuickGenModal(false)}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Subject</label>
                <select
                  value={genSubject}
                  onChange={(e) => setGenSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                >
                  <option value="Mathematics">Mathematics (ریاضی)</option>
                  <option value="Physics">Physics (طبیعیات)</option>
                  <option value="Chemistry">Chemistry (کیمسٹری)</option>
                  <option value="Biology">Biology (حیاتیات)</option>
                  <option value="Computer Science">Computer Science (کمپیوٹر)</option>
                  <option value="English">English (انگریزی)</option>
                  <option value="Urdu">Urdu (اردو)</option>
                  <option value="Islamic Studies">Islamic Studies (اسلامیات)</option>
                  <option value="Pakistan Studies">Pakistan Studies (مطالعہ پاکستان)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Class / Grade</label>
                <select
                  value={genGrade}
                  onChange={(e) => setGenGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100"
                >
                  <option value="9th">9th Class (Matric Part 1)</option>
                  <option value="10th">10th Class (Matric Part 2)</option>
                  <option value="11th">11th Class (1st Year / FSc Part 1)</option>
                  <option value="12th">12th Class (2nd Year / FSc Part 2)</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1">MCQs</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={genNumMcqs}
                    onChange={(e) => setGenNumMcqs(parseInt(e.target.value, 10) || 5)}
                    className="w-full px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-center"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Short Qs</label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={genNumShort}
                    onChange={(e) => setGenNumShort(parseInt(e.target.value, 10) || 5)}
                    className="w-full px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-center"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Long Qs</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={genNumLong}
                    onChange={(e) => setGenNumLong(parseInt(e.target.value, 10) || 2)}
                    className="w-full px-2 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-center"
                  />
                </div>
              </div>

              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg text-teal-800 dark:text-teal-300">
                <span className="font-bold">Total Marks: </span>
                <span>{genNumMcqs * 1 + genNumShort * 2 + genNumLong * 5} Marks</span>
                <span className="block text-[11px] opacity-80">
                  Includes bilingual English & Urdu statements matching standard board exam layout.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setShowQuickGenModal(false)}
                className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAutoGenerate}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
              >
                Generate Paper Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
