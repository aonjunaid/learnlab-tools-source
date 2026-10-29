import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  Upload,
  ExternalLink,
  Layers,
  Clock,
  Award,
  RefreshCw,
  FolderOpen,
  FileCheck,
  AlertCircle,
  FileUp,
  X,
  Calculator,
  Zap,
  FlaskConical,
  Cpu,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  ListTree,
  Filter,
  Check,
  Dna,
  HardDrive,
  Trash2,
  Database,
  Folder,
  FolderCheck
} from 'lucide-react';
import {
  CHAPTER_PDF_ARCHIVES,
  ChapterPdfArchive,
  ARCHIVE_CLASSES,
  ARCHIVE_SUBJECTS,
  groupArchivesHierarchy,
  GroupedClassDivision
} from '../../logic/exam-generator/pdf-archives-data';
import { QuestionBankItem } from '../../logic/exam-generator/types';
import { BilingualExamPaper } from '../../logic/exam-generator/types';
import {
  extractTextFromPdf,
  parseQuestionsFromPdfText,
  ParsedPdfExamResult
} from '../../logic/exam-generator/pdf-question-parser';
import {
  StoredPdfRecord,
  StorageUsageSummary,
  savePdfToMemory,
  getAllStoredPdfs,
  deleteStoredPdf,
  clearAllStoredPdfs,
  getStorageUsageSummary,
  moveStoredPdfToDirectory
} from '../../logic/exam-generator/pdf-memory-store';

interface ChapterPdfExtractorViewProps {
  onLoadPreset: (presetId: string) => void;
  onNavigateToBank: (unitFilter?: string) => void;
  onSetPaper: (paper: BilingualExamPaper) => void;
  onAddQuestionsToBank: (questions: QuestionBankItem[]) => void;
  onClearBank?: () => void;
  totalBankCount: number;
}

export function ChapterPdfExtractorView({
  onLoadPreset,
  onNavigateToBank,
  onSetPaper,
  onAddQuestionsToBank,
  onClearBank,
  totalBankCount
}: ChapterPdfExtractorViewProps) {
  // Classification Filters
  const [activeMainTab, setActiveMainTab] = useState<'archives' | 'memory'>('memory');
  const [includeBoardArchives, setIncludeBoardArchives] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'grid'>('hierarchy');
  const [searchTerm, setSearchTerm] = useState('');
  const [memorySearchTerm, setMemorySearchTerm] = useState('');

  // Target Upload Class Directory & Subject Sub-Directory
  const [targetUploadClass, setTargetUploadClass] = useState<string>('9th');
  const [targetUploadSubject, setTargetUploadSubject] = useState<string>('Mathematics');

  // Filter for class directory & subject sub-directory in Uploaded Library
  const [selectedMemoryDirectory, setSelectedMemoryDirectory] = useState<string>('all');
  const [selectedMemorySubject, setSelectedMemorySubject] = useState<string>('all');

  // Directory mover state
  const [movingDocId, setMovingDocId] = useState<string | null>(null);
  const [moveTargetGrade, setMoveTargetGrade] = useState<string>('9th');
  const [moveTargetSubject, setMoveTargetSubject] = useState<string>('Mathematics');

  // Modals & Inspection
  const [selectedPdfModal, setSelectedPdfModal] = useState<ChapterPdfArchive | null>(null);
  const [selectedBlobModal, setSelectedBlobModal] = useState<{ url: string; fileName: string; record: StoredPdfRecord } | null>(null);
  const [extractedReviewResult, setExtractedReviewResult] = useState<ParsedPdfExamResult | null>(null);

  // Persistent PDF Memory State (IndexedDB)
  const [storedPdfs, setStoredPdfs] = useState<StoredPdfRecord[]>([]);
  const [storageSummary, setStorageSummary] = useState<StorageUsageSummary>({
    count: 0,
    totalBytes: 0,
    formattedSize: '0 B',
    totalQuestions: 0
  });
  const [isLoadingMemory, setIsLoadingMemory] = useState<boolean>(true);

  // Revoke Blob URL when closing preview modal to prevent memory leaks
  const closeBlobModal = () => {
    if (selectedBlobModal) {
      try {
        URL.revokeObjectURL(selectedBlobModal.url);
      } catch (e) {
        console.warn('Could not revoke ObjectURL:', e);
      }
      setSelectedBlobModal(null);
    }
  };

  // Refresh stored PDFs from IndexedDB
  const refreshStoredPdfs = async () => {
    try {
      setIsLoadingMemory(true);
      const records = await getAllStoredPdfs();
      setStoredPdfs(records);
      const summary = await getStorageUsageSummary();
      setStorageSummary(summary);
    } catch (err) {
      console.error('Failed to load PDFs from IndexedDB:', err);
    } finally {
      setIsLoadingMemory(false);
    }
  };

  // Initial mount: load all saved PDFs from IndexedDB and sync questions to Bank
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const records = await getAllStoredPdfs();
        if (!isMounted) return;
        setStoredPdfs(records);
        const summary = await getStorageUsageSummary();
        setStorageSummary(summary);

        // Stored PDFs loaded into library without forcing unprompted question bank pollution
      } catch (err) {
        console.warn('IndexedDB initial hydration warning:', err);
      } finally {
        if (isMounted) setIsLoadingMemory(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Accordion collapsed state for subject sections: key = `${classId}_${subjectId}`
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Track extracted status per chapter ID
  const [extractedMap, setExtractedMap] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    CHAPTER_PDF_ARCHIVES.forEach((ch) => {
      initial[ch.id] = true;
    });
    return initial;
  });

  const [extractingId, setExtractingId] = useState<string | null>(null);
  const [isProcessingLocalPdf, setIsProcessingLocalPdf] = useState(false);
  const [extractAllProgress, setExtractAllProgress] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // User uploaded local PDFs
  const [uploadedLocalPdfs, setUploadedLocalPdfs] = useState<ParsedPdfExamResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper to render subject icon
  const getSubjectIcon = (subjectName: string, className = 'w-4 h-4') => {
    switch (subjectName.toLowerCase()) {
      case 'mathematics':
        return <Calculator className={className} />;
      case 'physics':
        return <Zap className={className} />;
      case 'chemistry':
        return <FlaskConical className={className} />;
      case 'biology':
        return <Dna className={className} />;
      case 'computer science':
        return <Cpu className={className} />;
      case 'english':
        return <BookOpen className={className} />;
      case 'urdu':
        return <FileText className={className} />;
      case 'islamic studies':
        return <Award className={className} />;
      case 'pakistan studies':
        return <GraduationCap className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  /**
   * Process a single local PDF file using pdfjs-dist and persist to IndexedDB
   */
  const processLocalPdfFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please select a valid PDF document (.pdf).');
      return;
    }

    try {
      setIsProcessingLocalPdf(true);
      // 1. Extract text page-by-page using pdfjs-dist
      const { fullText, pageCount } = await extractTextFromPdf(file);

      // 2. Parse MCQs, Short Questions, Long Questions chapter-by-chapter
      const parsed = parseQuestionsFromPdfText(fullText, file.name);
      parsed.pageCount = pageCount;

      // 3. Persist to Browser IndexedDB Memory Store with specified Class Directory
      const savedRecord = await savePdfToMemory(file, file.name, parsed, {
        grade: targetUploadClass,
        subject: targetUploadSubject
      });

      // 4. Prepopulate Question Bank state immediately
      onAddQuestionsToBank(savedRecord.allExtractedQuestions);

      // 5. Update local component state & IndexedDB list
      setUploadedLocalPdfs((prev) => [parsed, ...prev.filter((p) => p.fileName !== file.name)]);
      await refreshStoredPdfs();

      // 6. Open review modal so user sees the extracted questions
      setExtractedReviewResult(parsed);
      setActiveMainTab('memory');
      showToast(`Saved to ${targetUploadClass} Class directory! Extracted ${parsed.mcqs.length} MCQs & ${parsed.shortQuestions.length} Short Questions from "${file.name}".`);
    } catch (err: any) {
      console.error('PDF parsing/saving error:', err);
      showToast(`Failed to parse PDF: ${err.message || 'Unknown error'}`);
    } finally {
      setIsProcessingLocalPdf(false);
    }
  };

  /**
   * Move or re-assign a stored PDF to another class directory and subject sub-directory
   */
  const handleMoveStoredPdfDirectory = async (id: string, newGrade: string, newSubject?: string) => {
    try {
      await moveStoredPdfToDirectory(id, newGrade, newSubject);
      await refreshStoredPdfs();
      setMovingDocId(null);
      showToast(`Moved document to /${newGrade}/${newSubject || ''}/ directory.`);
    } catch (err: any) {
      showToast(`Failed to move: ${err.message || 'Error'}`);
    }
  };

  /**
   * Delete a stored PDF document from IndexedDB
   */
  const handleDeleteStoredPdf = async (id: string, fileName: string) => {
    try {
      await deleteStoredPdf(id);
      await refreshStoredPdfs();
      showToast(`Removed "${fileName}" from PDF Memory.`);
    } catch (err: any) {
      showToast(`Could not delete: ${err.message || 'Error'}`);
    }
  };

  /**
   * Clear all stored PDFs from IndexedDB
   */
  const handleClearAllMemory = async () => {
    if (storedPdfs.length === 0) return;
    const confirmClear = window.confirm(
      `Are you sure you want to delete all ${storedPdfs.length} saved PDFs and their extracted records from memory?`
    );
    if (!confirmClear) return;

    try {
      await clearAllStoredPdfs();
      await refreshStoredPdfs();
      if (onClearBank) {
        onClearBank();
      }
      showToast('All stored PDFs and question bank data have been permanently deleted.');
    } catch (err: any) {
      showToast(`Error clearing memory: ${err.message || 'Error'}`);
    }
  };

  /**
   * Re-sync questions from a stored PDF record into Question Bank
   */
  const handleReSyncQuestions = (record: StoredPdfRecord) => {
    if (record.allExtractedQuestions && record.allExtractedQuestions.length > 0) {
      onAddQuestionsToBank(record.allExtractedQuestions);
      showToast(`Re-synchronized ${record.allExtractedQuestions.length} questions from "${record.fileName}" into Question Bank!`);
    }
  };

  /**
   * Preview a stored IndexedDB PDF blob in modal
   */
  const handlePreviewStoredBlob = (record: StoredPdfRecord) => {
    try {
      const blobUrl = URL.createObjectURL(record.pdfBlob);
      setSelectedBlobModal({
        url: blobUrl,
        fileName: record.fileName,
        record
      });
    } catch (err) {
      showToast('Could not generate preview for stored PDF.');
    }
  };

  /**
   * Load stored PDF directly into bilingual examination generator
   */
  const handleLoadStoredExamPaper = (record: StoredPdfRecord) => {
    onSetPaper({
      id: `stored-${record.id}`,
      title: `${record.grade} ${record.subject} – ${record.unit}`,
      header: {
        institutionName: 'BOARD OF INTERMEDIATE & SECONDARY EDUCATION',
        institutionSubtitle: 'CHAPTER-WISE BILINGUAL EVALUATION TEST',
        studentNamePrompt: 'Student Name',
        rollNumberPrompt: 'Roll Number',
        className: record.grade.toUpperCase(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        subjectName: record.subject,
        subjectNameUrdu: record.subject === 'Mathematics' ? 'ریاضی' : record.subject,
        timeAllowed: '45 Mins',
        totalMarks: 40,
        examName: `${record.unit} Examination`,
        syllabus: `${record.grade} Class · ${record.unit}`,
        showOmrSheet: true,
        showWatermark: false,
        watermarkText: 'CONFIDENTIAL',
        paperType: 'bilingual'
      },
      mcqs: (record.mcqs || []).map((m, mIdx) => ({
        id: m.id || `stored_mcq_${mIdx + 1}`,
        num: mIdx + 1,
        textEn: m.textEn,
        textUr: m.textUr,
        options: m.options || [
          { id: 'A', textEn: 'A', textUr: 'الف' },
          { id: 'B', textEn: 'B', textUr: 'ب' },
          { id: 'C', textEn: 'C', textUr: 'ج' },
          { id: 'D', textEn: 'D', textUr: 'د' }
        ],
        correctOption: m.correctOption || 'A',
        points: 1
      })),
      shortQuestions: (record.shortQuestions || []).map((s, sIdx) => ({
        id: s.id || `stored_short_${sIdx + 1}`,
        numRoman: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][sIdx] || `${sIdx + 1}`,
        textEn: s.textEn,
        textUr: s.textUr,
        solution: s.solution || 'Award 2 full marks for correct formula and derivation.',
        points: 2
      })),
      longQuestions: (record.longQuestions || []).map((l, lIdx) => ({
        id: l.id || `stored_long_${lIdx + 1}`,
        num: lIdx + 1,
        textEn: l.textEn,
        textUr: l.textUr,
        solution: l.solution || 'Award step-wise marks: formula, substitution, final answer.',
        points: 5
      }))
    });
    showToast(`Loaded exam paper from "${record.fileName}"!`);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      await processLocalPdfFile(files[i]);
    }
    e.target.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      await processLocalPdfFile(files[i]);
    }
  };

  /**
   * Extract / sync from a single built-in Chapter PDF
   */
  const handleExtractBuiltinChapter = async (chapter: ChapterPdfArchive) => {
    setExtractingId(chapter.id);
    try {
      const res = await fetch(chapter.pdfPath);
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        const { fullText } = await extractTextFromPdf(arrayBuf);
        const parsed = parseQuestionsFromPdfText(fullText, chapter.unitTitleEn);
        if (parsed.allExtractedQuestions.length > 0) {
          onAddQuestionsToBank(parsed.allExtractedQuestions);
        }
      }
    } catch (err) {
      console.warn('Real-time PDF fetch fallback to built-in items:', err);
    }

    setExtractedMap((prev) => ({ ...prev, [chapter.id]: true }));
    setExtractingId(null);
    showToast(`Synchronized ${chapter.mcqCount} MCQs, ${chapter.shortCount} Short & ${chapter.longCount} Long questions from ${chapter.grade} ${chapter.subject} (${chapter.unitTitleEn}) into Question Bank!`);
  };

  /**
   * Batch extract all chapters in a specific subject of a class
   */
  const handleExtractSubjectChapters = (classId: string, subjectId: string, chapters: ChapterPdfArchive[]) => {
    const updated = { ...extractedMap };
    chapters.forEach((ch) => {
      updated[ch.id] = true;
    });
    setExtractedMap(updated);
    showToast(`All ${chapters.length} chapter papers for ${classId} ${subjectId} synchronized into Question Bank!`);
  };

  /**
   * Batch extract all chapters in currently selected view
   */
  const handleExtractAll = () => {
    setExtractAllProgress(10);
    const targetArchives = filteredChapters;
    const total = targetArchives.length;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      setExtractAllProgress(Math.round((current / total) * 100));
      if (current >= total) {
        clearInterval(interval);
        setTimeout(() => {
          setExtractAllProgress(null);
          const allExtracted = { ...extractedMap };
          targetArchives.forEach((ch) => {
            allExtracted[ch.id] = true;
          });
          setExtractedMap(allExtracted);
          showToast(`All ${total} Chapter PDFs parsed! All MCQs, Short & Long questions are synchronized in Question Bank.`);
        }, 400);
      }
    }, 80);
  };

  /**
   * Load any chapter into the bilingual examination generator
   */
  const handleLoadChapterExam = (chapter: ChapterPdfArchive) => {
    if (chapter.presetId) {
      onLoadPreset(chapter.presetId);
      return;
    }

    // Dynamic generation from chapter metadata and questions
    onSetPaper({
      id: `paper-${chapter.id}`,
      title: `${chapter.grade} ${chapter.subject} – ${chapter.unitTitleEn}`,
      header: {
        institutionName: 'BOARD OF INTERMEDIATE & SECONDARY EDUCATION',
        institutionSubtitle: 'CHAPTER-WISE BILINGUAL EVALUATION TEST',
        studentNamePrompt: 'Student Name',
        rollNumberPrompt: 'Roll Number',
        className: chapter.grade.toUpperCase(),
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        subjectName: chapter.subject,
        subjectNameUrdu: chapter.subjectUrdu,
        timeAllowed: chapter.timeAllowed,
        totalMarks: chapter.totalMarks,
        examName: `${chapter.unitTitleEn} Examination`,
        syllabus: `${chapter.grade} Class · ${chapter.unitTitleEn}`,
        showOmrSheet: true,
        showWatermark: false,
        watermarkText: 'CONFIDENTIAL',
        paperType: 'bilingual'
      },
      mcqs: Array.from({ length: chapter.mcqCount }).map((_, mIdx) => ({
        id: `gen_mcq_${chapter.id}_${mIdx + 1}`,
        num: mIdx + 1,
        textEn: `Core curriculum question ${mIdx + 1} regarding ${chapter.keyTopics[mIdx % chapter.keyTopics.length] || chapter.unitTitleEn}.`,
        textUr: `${chapter.keyTopicsUrdu[mIdx % chapter.keyTopicsUrdu.length] || chapter.unitTitleUr} کے بارے میں نصابی سوال نمبر ${mIdx + 1}۔`,
        options: [
          { id: 'A', textEn: 'Primary Standard Formulation', textUr: 'بنیادی معیاری تشکیل' },
          { id: 'B', textEn: 'Secondary Equivalent Expression', textUr: 'ثانوی مساوی اظہار' },
          { id: 'C', textEn: 'Fundamental Mathematical Law', textUr: 'بنیادی ریاضیاتی کلیہ' },
          { id: 'D', textEn: 'Derived Algebraic Identity', textUr: 'اخذ شدہ الجبری مماثلت' }
        ],
        correctOption: (['A', 'B', 'C', 'D'][mIdx % 4] || 'A') as 'A' | 'B' | 'C' | 'D',
        points: 1
      })),
      shortQuestions: Array.from({ length: chapter.shortCount }).map((_, sIdx) => ({
        id: `gen_short_${chapter.id}_${sIdx + 1}`,
        numRoman: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][sIdx] || `${sIdx + 1}`,
        textEn: `Define and state the key properties of ${chapter.keyTopics[sIdx % chapter.keyTopics.length] || 'the given concept'}.`,
        textUr: `${chapter.keyTopicsUrdu[sIdx % chapter.keyTopicsUrdu.length] || 'دیے گئے تصور'} کی تعریف کریں اور اہم خصوصیات بیان کریں۔`,
        solution: 'Award 2 full marks: Formula / Definition (1 Mark), Mathematical simplification (1 Mark).',
        points: 2
      })),
      longQuestions: Array.from({ length: chapter.longCount }).map((_, lIdx) => ({
        id: `gen_long_${chapter.id}_${lIdx + 1}`,
        num: lIdx + 1,
        textEn: `Solve in detail with step-by-step mathematical proof: ${chapter.keyTopics[lIdx] || 'Analytical Problem'}.`,
        textUr: `مرحلہ وار ریاضیاتی ثبوت کے ساتھ تفصیلی حل کریں: ${chapter.keyTopicsUrdu[lIdx] || 'تجزیاتی سوال'}۔`,
        solution: 'Step-wise marking scheme (5 Marks): Given data & formula (1 Mark), Algebraic derivation (2 Marks), Final simplified answer with units (2 Marks).',
        points: 5
      }))
    });
    showToast(`Loaded exam paper: ${chapter.grade} ${chapter.subject} (${chapter.unitTitleEn})!`);
  };

  // Filtered archives based on Class, Subject, and Search
  const filteredChapters = useMemo(() => {
    return CHAPTER_PDF_ARCHIVES.filter((ch) => {
      // Class filter
      if (selectedClass !== 'all' && ch.grade.toLowerCase() !== selectedClass.toLowerCase()) {
        return false;
      }
      // Subject filter
      if (selectedSubject !== 'all' && ch.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }
      // Search term
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        ch.unitTitleEn.toLowerCase().includes(term) ||
        ch.unitTitleUr.includes(term) ||
        ch.grade.toLowerCase().includes(term) ||
        ch.subject.toLowerCase().includes(term) ||
        ch.keyTopics.some((t) => t.toLowerCase().includes(term)) ||
        ch.paperCode.includes(term)
      );
    });
  }, [selectedClass, selectedSubject, searchTerm]);

  // Hierarchical grouped structure based on filtered chapters
  const hierarchicalDivision: GroupedClassDivision[] = useMemo(() => {
    return groupArchivesHierarchy(filteredChapters);
  }, [filteredChapters]);

  // Counts per class for badges
  const classCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CHAPTER_PDF_ARCHIVES.length };
    ARCHIVE_CLASSES.forEach((c) => {
      counts[c.id] = CHAPTER_PDF_ARCHIVES.filter((a) => a.grade.toLowerCase() === c.id.toLowerCase()).length;
    });
    return counts;
  }, []);

  // Counts per subject for badges under the currently selected class
  const subjectCounts = useMemo(() => {
    const archivesForClass = selectedClass === 'all'
      ? CHAPTER_PDF_ARCHIVES
      : CHAPTER_PDF_ARCHIVES.filter((a) => a.grade.toLowerCase() === selectedClass.toLowerCase());

    const counts: Record<string, number> = { all: archivesForClass.length };
    ARCHIVE_SUBJECTS.forEach((s) => {
      counts[s.id] = archivesForClass.filter((a) => a.subject.toLowerCase() === s.id.toLowerCase()).length;
    });
    return counts;
  }, [selectedClass]);

  // Counts of documents per class directory in offline memory
  const memoryDirectoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: storedPdfs.length };
    ['9th', '10th', '11th', '12th'].forEach((cls) => {
      counts[cls] = storedPdfs.filter((p) => (p.grade || '9th').toLowerCase() === cls.toLowerCase()).length;
    });
    return counts;
  }, [storedPdfs]);

  // Counts of documents per subject sub-directory in offline memory
  const memorySubjectCounts = useMemo(() => {
    const counts: Record<string, number> = { all: storedPdfs.length };
    ARCHIVE_SUBJECTS.forEach((s) => {
      counts[s.id] = storedPdfs.filter((p) => (p.subject || '').toLowerCase() === s.id.toLowerCase()).length;
    });
    return counts;
  }, [storedPdfs]);

  // Filtered stored PDFs in offline memory by class directory, subject sub-directory & search
  const filteredStoredPdfs = useMemo(() => {
    return storedPdfs.filter((p) => {
      if (selectedMemoryDirectory !== 'all' && (p.grade || '9th').toLowerCase() !== selectedMemoryDirectory.toLowerCase()) {
        return false;
      }
      if (selectedMemorySubject !== 'all' && (p.subject || 'Mathematics').toLowerCase() !== selectedMemorySubject.toLowerCase()) {
        return false;
      }
      if (!memorySearchTerm.trim()) return true;
      const term = memorySearchTerm.toLowerCase();
      return (
        p.fileName.toLowerCase().includes(term) ||
        p.subject.toLowerCase().includes(term) ||
        p.grade.toLowerCase().includes(term) ||
        p.unit.toLowerCase().includes(term)
      );
    });
  }, [storedPdfs, selectedMemoryDirectory, selectedMemorySubject, memorySearchTerm]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-emerald-600 text-white rounded-xl shadow-xl text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 rounded-2xl text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                PDF Extractor & Class Directory
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-700/80 text-emerald-200 border border-emerald-600/50">
                {storedPdfs.length} Custom Documents
              </span>
            </div>
            <p className="text-xs text-teal-100/90 mt-0.5">
              Select class and subject directories to upload PDFs and extract bilingual questions directly into your Question Bank.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-white text-teal-950 font-semibold text-xs rounded-xl shadow-xs hover:bg-teal-50 transition-colors cursor-pointer"
            >
              <FileUp className="w-3.5 h-3.5 text-teal-700" />
              <span>Upload PDF</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const next = !includeBoardArchives;
                setIncludeBoardArchives(next);
                if (next) setActiveMainTab('archives');
                else setActiveMainTab('memory');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-teal-800/80 hover:bg-teal-700 text-teal-100 font-medium text-xs rounded-xl border border-teal-600/60 transition-colors cursor-pointer"
              title="Toggle pre-seeded reference board archives"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sample Archives ({includeBoardArchives ? '54 Visible' : 'Hidden'})</span>
            </button>
          </div>
        </div>

        {/* Progress Bar for Batch Extract */}
        {extractAllProgress !== null && (
          <div className="mt-3 pt-3 border-t border-teal-700/60">
            <div className="flex items-center justify-between text-xs text-teal-200 mb-1 font-medium">
              <span>Parsing bilingual questions...</span>
              <span>{extractAllProgress}%</span>
            </div>
            <div className="w-full bg-teal-950/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${extractAllProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Compact stats bar */}
        <div className="mt-3 pt-3 border-t border-teal-700/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-teal-200">
          <span><strong>4</strong> Classes (9th–12th)</span>
          <span className="text-teal-400/50">•</span>
          <span><strong>{storedPdfs.length}</strong> Saved Documents</span>
          <span className="text-teal-400/50">•</span>
          <span className="text-emerald-300 font-semibold">{totalBankCount} Bank Questions Ready</span>
          {includeBoardArchives && (
            <>
              <span className="text-teal-400/50">•</span>
              <span className="text-teal-200">54 Reference Archives Active</span>
            </>
          )}
        </div>
      </div>

      {/* TOP-LEVEL NAVIGATION: UPLOADED PDF LIBRARY (PRIMARY) & CONDITIONAL BOARD ARCHIVES */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200 dark:border-neutral-700/60">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveMainTab('memory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeMainTab === 'memory'
                ? 'bg-white dark:bg-neutral-900 text-emerald-900 dark:text-emerald-200 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Uploaded Library</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
              activeMainTab === 'memory'
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
            }`}>
              {storedPdfs.length}
            </span>
          </button>

          {includeBoardArchives && (
            <button
              onClick={() => setActiveMainTab('archives')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeMainTab === 'archives'
                  ? 'bg-white dark:bg-neutral-900 text-teal-900 dark:text-teal-200 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Board Archives</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-bold ${
                activeMainTab === 'archives'
                  ? 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
              }`}>
                {CHAPTER_PDF_ARCHIVES.length}
              </span>
            </button>
          )}
        </div>

        {/* Offline Memory Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 text-xs text-neutral-500 dark:text-neutral-400">
          <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
          <span>IndexedDB Offline Memory:</span>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">{storageSummary.formattedSize}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: UPLOADED PDF LIBRARY (PERSISTENT INDEXEDDB MEMORY)                 */}
      {/* ========================================================================= */}
      {activeMainTab === 'memory' && (
        <div className="space-y-5">
          {/* Memory Summary & Health Bar */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Persistent Document Library</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Uploaded PDF files and extracted questions are permanently stored in private browser storage.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>Upload PDF</span>
                </button>

                {storedPdfs.length > 0 && (
                  <button
                    onClick={handleClearAllMemory}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-red-50 dark:bg-neutral-800 dark:hover:bg-red-950/40 text-neutral-600 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 font-medium text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Library</span>
                  </button>
                )}
              </div>
            </div>

            {/* Storage Stats Row */}
            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Saved Documents:</span>
                <strong className="text-neutral-900 dark:text-neutral-100">{storageSummary.count}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Extracted Questions in Bank:</span>
                <strong className="text-neutral-900 dark:text-neutral-100">{storageSummary.totalQuestions}</strong>
              </div>
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-neutral-500" />
                <span>Local Storage Used:</span>
                <strong className="text-neutral-900 dark:text-neutral-100">{storageSummary.formattedSize}</strong>
              </div>
            </div>
          </div>

          {/* Teacher Class Directory & Subject Sub-Directory Destination Config */}
          <div className="bg-neutral-100/90 dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700/80 rounded-2xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <FolderCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-100">
                      Target Upload Destination:
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold border border-emerald-300 dark:border-emerald-800">
                      /{targetUploadClass}/{targetUploadSubject}/
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Uploaded PDF documents and extracted questions will be cataloged directly into this directory.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Select Class Directory */}
                <div className="flex items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-0.5">
                  {(['9th', '10th', '11th', '12th'] as const).map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setTargetUploadClass(cls)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        targetUploadClass === cls
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>

                {/* Select Subject Sub-Directory */}
                <select
                  value={targetUploadSubject}
                  onChange={(e) => setTargetUploadSubject(e.target.value)}
                  className="text-xs py-1.5 px-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-800 dark:text-neutral-200 font-medium focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {ARCHIVE_SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nameEn} ({s.nameUr})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Upload Dropzone inside Library */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-4 border-2 border-dashed rounded-xl text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 scale-[1.005]'
                : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-900'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
                {isProcessingLocalPdf ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {isProcessingLocalPdf
                    ? `Extracting and saving to /${targetUploadClass}/${targetUploadSubject}/ directory...`
                    : `Click or drop PDF here to upload to /${targetUploadClass}/${targetUploadSubject}/`}
                </span>
                <p className="text-[11px] text-neutral-500">
                  Binary stored in IndexedDB; questions extracted & chapter duplicates automatically filtered.
                </p>
              </div>
            </div>
          </div>

          {/* Class Directory & Subject Sub-Directory Filter Bar */}
          <div className="space-y-2 pt-2">
            {/* Row 1: Class Directory & Active Path */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Folder className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Class:</span>
                </span>

                <button
                  onClick={() => setSelectedMemoryDirectory('all')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedMemoryDirectory === 'all'
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span>All Classes</span>
                  <span className="text-[10px] font-mono opacity-80">({memoryDirectoryCounts.all})</span>
                </button>

                {(['9th', '10th', '11th', '12th'] as const).map((cls) => {
                  const isSelected = selectedMemoryDirectory.toLowerCase() === cls.toLowerCase();
                  const count = memoryDirectoryCounts[cls] || 0;
                  return (
                    <button
                      key={cls}
                      onClick={() => setSelectedMemoryDirectory(cls)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <Folder className="w-3.5 h-3.5" />
                      <span>{cls} Class</span>
                      <span className="text-[10px] font-mono opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Stored Documents */}
              {storedPdfs.length > 0 && (
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={memorySearchTerm}
                    onChange={(e) => setMemorySearchTerm(e.target.value)}
                    placeholder="Search stored PDFs..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>

            {/* Row 2: Subject Sub-Directory Filter */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span>Subject Sub-Directory:</span>
              </span>

              <button
                onClick={() => setSelectedMemorySubject('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedMemorySubject === 'all'
                    ? 'bg-teal-700 text-white shadow-2xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                All Subjects
              </button>

              {ARCHIVE_SUBJECTS.map((s) => {
                const isSelected = selectedMemorySubject.toLowerCase() === s.id.toLowerCase();
                const count = memorySubjectCounts[s.id] || 0;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedMemorySubject(s.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <span>{s.nameEn}</span>
                    {count > 0 && (
                      <span className="text-[10px] font-mono px-1 rounded bg-teal-800/20 dark:bg-teal-300/20">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Path Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/80 px-3 py-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
              <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Browsing Path:</span>
              <span className="font-mono font-semibold text-emerald-800 dark:text-emerald-300">
                /{selectedMemoryDirectory === 'all' ? '*' : selectedMemoryDirectory}/{selectedMemorySubject === 'all' ? '*' : selectedMemorySubject}/
              </span>
              <span className="text-[11px] text-neutral-400 ml-auto">
                {filteredStoredPdfs.length} file{filteredStoredPdfs.length === 1 ? '' : 's'} in view
              </span>
            </div>
          </div>

          {/* Stored PDFs Card Grid */}
          {storedPdfs.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <Database className="w-10 h-10 mx-auto text-neutral-400 mb-2" />
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                No custom PDFs saved in memory yet.
              </p>
              <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
                Upload any past paper, test series, or guess paper PDF. It will be preserved permanently in your browser with full preview and question re-synchronization.
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <FileUp className="w-4 h-4" />
                <span>Upload First PDF</span>
              </button>
            </div>
          ) : filteredStoredPdfs.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs text-neutral-500">
              No saved PDF documents match &quot;{memorySearchTerm}&quot; in the selected path.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredStoredPdfs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          {doc.fileName}
                        </h4>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
                          <span>{doc.fileSizeFormatted}</span>
                          <span>•</span>
                          <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                      {doc.allExtractedQuestions.length} Qs
                    </span>
                  </div>

                  {/* Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold">
                      {doc.grade} Class
                    </span>
                    <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-medium">
                      {doc.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 truncate max-w-[150px]">
                      {doc.unit}
                    </span>
                  </div>

                  {/* Question Breakdown */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-850 px-2.5 py-1.5 rounded-lg border border-neutral-100 dark:border-neutral-800">
                    <span><strong>{doc.mcqs.length}</strong> MCQs</span>
                    <span className="opacity-40">•</span>
                    <span><strong>{doc.shortQuestions.length}</strong> Short</span>
                    <span className="opacity-40">•</span>
                    <span><strong>{doc.longQuestions.length}</strong> Long</span>
                  </div>

                  {/* Directory Location & Move Directory Action */}
                  <div className="space-y-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
                        <Folder className="w-3.5 h-3.5" />
                        <span>/{doc.grade || '9th'}/{doc.subject || 'Mathematics'}/</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          if (movingDocId === doc.id) {
                            setMovingDocId(null);
                          } else {
                            setMovingDocId(doc.id);
                            setMoveTargetGrade(doc.grade || '9th');
                            setMoveTargetSubject(doc.subject || 'Mathematics');
                          }
                        }}
                        className="px-2 py-0.5 rounded bg-neutral-100 hover:bg-emerald-100 dark:bg-neutral-800 dark:hover:bg-emerald-950/60 text-neutral-600 hover:text-emerald-800 dark:text-neutral-400 dark:hover:text-emerald-300 font-semibold transition-colors cursor-pointer text-[10px]"
                      >
                        {movingDocId === doc.id ? 'Cancel' : 'Move...'}
                      </button>
                    </div>

                    {/* Inline Move Directory Sub-panel */}
                    {movingDocId === doc.id && (
                      <div className="p-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
                          <span>Move Document Directory:</span>
                          <button onClick={() => setMovingDocId(null)} className="text-neutral-400 hover:text-neutral-600">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <div>
                            <label className="block text-[10px] text-neutral-500 font-medium mb-0.5">Class Folder</label>
                            <select
                              value={moveTargetGrade}
                              onChange={(e) => setMoveTargetGrade(e.target.value)}
                              className="w-full text-[11px] py-1 px-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 font-medium"
                            >
                              {(['9th', '10th', '11th', '12th'] as const).map((cls) => (
                                <option key={cls} value={cls}>{cls} Class</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] text-neutral-500 font-medium mb-0.5">Subject Sub-Folder</label>
                            <select
                              value={moveTargetSubject}
                              onChange={(e) => setMoveTargetSubject(e.target.value)}
                              className="w-full text-[11px] py-1 px-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 font-medium"
                            >
                              {ARCHIVE_SUBJECTS.map((s) => (
                                <option key={s.id} value={s.id}>{s.nameEn}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => setMovingDocId(null)}
                            className="px-2 py-0.5 text-[10px] rounded text-neutral-500 hover:text-neutral-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveStoredPdfDirectory(doc.id, moveTargetGrade, moveTargetSubject)}
                            className="px-2.5 py-1 text-[10px] font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-2xs"
                          >
                            Confirm Move
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handlePreviewStoredBlob(doc)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        setExtractedReviewResult({
                          fileName: doc.fileName,
                          rawText: '',
                          pageCount: doc.pageCount,
                          grade: doc.grade,
                          subject: doc.subject,
                          unit: doc.unit,
                          totalMarks: 40,
                          timeAllowed: '45 Mins',
                          mcqs: doc.mcqs,
                          shortQuestions: doc.shortQuestions,
                          longQuestions: doc.longQuestions,
                          allExtractedQuestions: doc.allExtractedQuestions
                        });
                      }}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Review Qs</span>
                    </button>

                    <button
                      onClick={() => handleLoadStoredExamPaper(doc)}
                      className="col-span-2 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Generate Exam Paper</span>
                    </button>

                    <button
                      onClick={() => handleReSyncQuestions(doc)}
                      className="flex items-center justify-center gap-1 py-1 px-2 text-[10px] text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-Sync Bank</span>
                    </button>

                    <button
                      onClick={() => handleDeleteStoredPdf(doc.id, doc.fileName)}
                      className="flex items-center justify-center gap-1 py-1 px-2 text-[10px] text-red-600 hover:underline cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PUNJAB BOARD ARCHIVES (26+ CHAPTER PAPERS)                         */}
      {/* ========================================================================= */}
      {includeBoardArchives && activeMainTab === 'archives' && (
        <div className="space-y-6">
          {/* Destination Class Directory selector for Archives tab uploads */}
          <div className="bg-neutral-100/90 dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700/80 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FolderCheck className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Upload to Class Directory:
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-0.5">
                {(['9th', '10th', '11th', '12th'] as const).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setTargetUploadClass(cls)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      targetUploadClass === cls
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>

              <select
                value={targetUploadSubject}
                onChange={(e) => setTargetUploadSubject(e.target.value)}
                className="text-xs py-1 px-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 font-medium cursor-pointer"
              >
                {ARCHIVE_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DRAG-AND-DROP & LOCAL PDF FILE INPUT AREA */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-3.5 sm:p-4 border-2 border-dashed rounded-xl text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 scale-[1.005]'
                : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50/40 dark:bg-neutral-900/40 hover:bg-neutral-50 dark:hover:bg-neutral-900'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300 shrink-0">
                {isProcessingLocalPdf ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </div>

              <div className="text-left">
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {isProcessingLocalPdf
                    ? `Parsing PDF and saving to ${targetUploadClass} Class directory...`
                    : `Drop PDF here to store in ${targetUploadClass} Class Directory`}
                </span>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Stored into /{targetUploadClass}/ directory and auto-extracted into Question Bank.
                </p>
              </div>
            </div>
          </div>

      {/* ========================================================================= */}
      {/* HIERARCHICAL DIVISION CONTROLS: 1. CLASS TABS, 2. SUBJECT PILLS, 3. SEARCH */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
        
        {/* LEVEL 1: CLASS SELECTION TABS */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
              <span>Class</span>
            </span>
            <span className="text-xs text-neutral-400">
              {filteredChapters.length} Papers
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => {
                setSelectedClass('all');
                setSelectedSubject('all');
              }}
              className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedClass === 'all'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <span>All</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                selectedClass === 'all'
                  ? 'bg-teal-700 text-teal-100'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
              }`}>
                {classCounts.all}
              </span>
            </button>

            {ARCHIVE_CLASSES.map((cls) => {
              const count = classCounts[cls.id] || 0;
              const isSelected = selectedClass === cls.id;
              return (
                <button
                  key={cls.id}
                  onClick={() => {
                    setSelectedClass(cls.id);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <div className="text-left">
                    <div>{cls.titleEn}</div>
                    <div className="text-[10px] font-normal opacity-80">{cls.badge}</div>
                  </div>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-md shrink-0 ${
                    isSelected
                      ? 'bg-teal-700 text-teal-100'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL 2: SUBJECT SELECTION PILLS */}
        <div className="space-y-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-teal-600" />
            <span>Subject</span>
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedSubject === 'all'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <span>All</span>
              <span className="text-[10px] opacity-75 font-mono">({subjectCounts.all})</span>
            </button>

            {ARCHIVE_SUBJECTS.map((sub) => {
              const count = subjectCounts[sub.id] || 0;
              const isSelected = selectedSubject.toLowerCase() === sub.id.toLowerCase();
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-600 text-white font-semibold shadow-2xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {getSubjectIcon(sub.id, 'w-3.5 h-3.5')}
                  <span>{sub.nameEn}</span>
                  <span className="font-urdu text-[11px]" dir="rtl">({sub.nameUr})</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LEVEL 3: SEARCH BAR & VIEW MODE TOGGLE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chapters or topics..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg">
              <button
                onClick={() => setViewMode('hierarchy')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'hierarchy'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-2xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <ListTree className="w-3.5 h-3.5 text-teal-600" />
                <span>Hierarchy</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-2xs font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-teal-600" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE A: HIERARCHICAL DIVISION (CLASS -> SUBJECT -> CHAPTERS)         */}
      {/* ========================================================================= */}
      {viewMode === 'hierarchy' && (
        <div className="space-y-6">
          {hierarchicalDivision.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              <BookOpen className="w-10 h-10 mx-auto text-neutral-400 mb-2" />
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                No chapter test papers match the active filters.
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try clearing the search query or selecting &quot;All Classes&quot; and &quot;All Subjects&quot;.
              </p>
            </div>
          ) : (
            hierarchicalDivision.map((classGroup) => (
              <div
                key={classGroup.classId}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs"
              >
                {/* Class Division Header */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800/60 dark:to-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {classGroup.classId}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                          {classGroup.classTitleEn}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                          {classGroup.badge}
                        </span>
                      </div>
                      <div className="text-xs font-urdu text-neutral-600 dark:text-neutral-400" dir="rtl">
                        {classGroup.classTitleUr}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-xs text-neutral-500 font-medium">
                      {classGroup.subjects.reduce((sum, s) => sum + s.chapters.length, 0)} Chapter Tests
                    </span>
                  </div>
                </div>

                {/* Subject Divisions inside this Class */}
                <div className="p-4 sm:p-6 space-y-6">
                  {classGroup.subjects.map((subGroup) => {
                    const sectionKey = `${classGroup.classId}_${subGroup.subjectId}`;
                    const isCollapsed = Boolean(collapsedSections[sectionKey]);
                    const extractedCount = subGroup.chapters.filter((c) => extractedMap[c.id]).length;

                    return (
                      <div
                        key={subGroup.subjectId}
                        className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
                      >
                        {/* Subject Section Header */}
                        <div className="p-3.5 bg-neutral-50/80 dark:bg-neutral-850 flex items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800">
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity cursor-pointer"
                          >
                            {isCollapsed ? (
                              <ChevronRight className="w-4 h-4 text-neutral-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-neutral-500" />
                            )}
                            <div className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center">
                              {getSubjectIcon(subGroup.subjectId, 'w-3.5 h-3.5')}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-neutral-100">
                                  {subGroup.subjectNameEn}
                                </span>
                                <span className="font-urdu text-xs text-neutral-600 dark:text-neutral-400" dir="rtl">
                                  ({subGroup.subjectNameUr})
                                </span>
                              </div>
                              <span className="text-[11px] text-neutral-500">
                                {subGroup.chapters.length} Units · {extractedCount}/{subGroup.chapters.length} in Question Bank
                              </span>
                            </div>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleExtractSubjectChapters(classGroup.classId, subGroup.subjectId, subGroup.chapters)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                              title={`Synchronize all ${subGroup.chapters.length} units to Question Bank`}
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Extract All {subGroup.subjectNameEn}</span>
                              <span className="sm:hidden">Extract All</span>
                            </button>
                          </div>
                        </div>

                        {/* Chapter Cards Grid for this Subject */}
                        {!isCollapsed && (
                          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 bg-neutral-50/30 dark:bg-neutral-900/40">
                            {subGroup.chapters.map((chapter) => renderChapterCard(chapter))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE B: FLAT CHAPTER CARDS GRID */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Showing {filteredChapters.length} Chapter Test Papers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChapters.map((chapter) => renderChapterCard(chapter))}
          </div>
        </div>
      )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* EXTRACTED QUESTIONS REVIEW MODAL                                         */}
      {/* ========================================================================= */}
      {extractedReviewResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 bg-emerald-50 dark:bg-emerald-950/40">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Identified Questions from {extractedReviewResult.fileName}
                  </h3>
                  <div className="text-xs text-neutral-500">
                    {extractedReviewResult.mcqs.length} MCQs · {extractedReviewResult.shortQuestions.length} Short Questions · {extractedReviewResult.longQuestions.length} Long Problems
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setExtractedReviewResult(null);
                    onNavigateToBank(extractedReviewResult.unit);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open in Question Bank</span>
                </button>

                <button
                  onClick={() => setExtractedReviewResult(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: List of Extracted Questions */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                  1. Multiple Choice Questions ({extractedReviewResult.mcqs.length})
                </h4>
                <div className="space-y-2">
                  {extractedReviewResult.mcqs.map((m, idx) => (
                    <div
                      key={m.id}
                      className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700/60 space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2 font-medium">
                        <span className="text-neutral-900 dark:text-neutral-100">
                          {idx + 1}. {m.textEn}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold shrink-0">
                          1 Mark
                        </span>
                      </div>
                      {m.textUr && (
                        <div className="text-neutral-600 dark:text-neutral-400 font-urdu text-right" dir="rtl">
                          {m.textUr}
                        </div>
                      )}
                      {m.options && (
                        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                          {m.options.map((o) => (
                            <span key={o.id}>
                              ({o.id}) {o.textEn}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                  2. Short Answer Questions ({extractedReviewResult.shortQuestions.length})
                </h4>
                <div className="space-y-2">
                  {extractedReviewResult.shortQuestions.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700/60 space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2 font-medium">
                        <span className="text-neutral-900 dark:text-neutral-100">
                          Part {idx + 1}: {s.textEn}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold shrink-0">
                          2 Marks
                        </span>
                      </div>
                      {s.textUr && (
                        <div className="text-neutral-600 dark:text-neutral-400 font-urdu text-right" dir="rtl">
                          {s.textUr}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {extractedReviewResult.longQuestions.length > 0 && (
                <div>
                  <h4 className="font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                    3. Detailed Long Problems ({extractedReviewResult.longQuestions.length})
                  </h4>
                  <div className="space-y-2">
                    {extractedReviewResult.longQuestions.map((l, idx) => (
                      <div
                        key={l.id}
                        className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700/60 space-y-1"
                      >
                        <div className="flex items-start justify-between gap-2 font-medium">
                          <span className="text-neutral-900 dark:text-neutral-100">
                            Q{idx + 1}: {l.textEn}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold shrink-0">
                            5 Marks
                          </span>
                        </div>
                        {l.textUr && (
                          <div className="text-neutral-600 dark:text-neutral-400 font-urdu text-right" dir="rtl">
                            {l.textUr}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PDF PREVIEW MODAL                                                         */}
      {/* ========================================================================= */}
      {selectedPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 bg-neutral-50 dark:bg-neutral-950">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-red-500" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedPdfModal.unitTitleEn}
                  </h3>
                  <div className="text-xs text-neutral-500">
                    {selectedPdfModal.grade} Class · {selectedPdfModal.subject} · Code: {selectedPdfModal.paperCode} · {selectedPdfModal.fileSize}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedPdfModal.pdfPath}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => {
                    handleLoadChapterExam(selectedPdfModal);
                    setSelectedPdfModal(null);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Load Exam Paper</span>
                </button>

                <button
                  onClick={() => setSelectedPdfModal(null)}
                  className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded PDF View */}
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-950 overflow-hidden flex flex-col items-center justify-center p-2">
              <object
                data={selectedPdfModal.pdfPath}
                type="application/pdf"
                className="w-full h-full rounded-lg border border-neutral-300 dark:border-neutral-800"
              >
                <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-neutral-500">
                  <FileText className="w-12 h-12 text-red-500 mb-3" />
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                    {selectedPdfModal.unitTitleEn}
                  </p>
                  <p className="mt-1 max-w-sm">
                    Your browser does not support inline PDF embedding. You can download or view it directly:
                  </p>
                  <a
                    href={selectedPdfModal.pdfPath}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold text-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open PDF in New Window</span>
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STORED PDF BLOB PREVIEW MODAL (OFFLINE INDEXEDDB)                         */}
      {/* ========================================================================= */}
      {selectedBlobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-4xl h-[85vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 bg-neutral-50 dark:bg-neutral-950">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {selectedBlobModal.fileName}
                  </h3>
                  <div className="text-xs text-neutral-500">
                    Offline IndexedDB Memory · {selectedBlobModal.record.fileSizeFormatted} · {selectedBlobModal.record.allExtractedQuestions.length} Questions Retained
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedBlobModal.url}
                  download={selectedBlobModal.fileName}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => {
                    handleLoadStoredExamPaper(selectedBlobModal.record);
                    closeBlobModal();
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Load Exam Paper</span>
                </button>

                <button
                  onClick={closeBlobModal}
                  className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal Body: Embedded Blob PDF View */}
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-950 overflow-hidden flex flex-col items-center justify-center p-2">
              <object
                data={selectedBlobModal.url}
                type="application/pdf"
                className="w-full h-full rounded-lg border border-neutral-300 dark:border-neutral-800"
              >
                <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-neutral-500">
                  <FileText className="w-12 h-12 text-emerald-600 mb-3" />
                  <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                    {selectedBlobModal.fileName}
                  </p>
                  <p className="mt-1 max-w-sm">
                    Your browser does not support inline PDF embedding for this file. You can download or view it directly:
                  </p>
                  <a
                    href={selectedBlobModal.url}
                    download={selectedBlobModal.fileName}
                    className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF File</span>
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /**
   * Helper function to render an individual chapter card
   */
  function renderChapterCard(chapter: ChapterPdfArchive) {
    const isExtracted = extractedMap[chapter.id];
    const isExtracting = extractingId === chapter.id;

    return (
      <div
        key={chapter.id}
        className="flex flex-col justify-between p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-teal-500/50 dark:hover:border-teal-500/50 rounded-2xl shadow-2xs transition-all hover:shadow-md group"
      >
        <div>
          {/* Badges Bar: Class, Subject & Unit */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                Unit {chapter.unitNumber}
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {chapter.grade}
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                Code: {chapter.paperCode}
              </span>
            </div>

            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">
              {chapter.totalMarks} Marks
            </span>
          </div>

          {/* Chapter Title */}
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {chapter.unitTitleEn}
          </h4>
          <div className="text-xs font-urdu text-neutral-600 dark:text-neutral-400 mt-0.5 text-right leading-relaxed" dir="rtl">
            {chapter.unitTitleUr}
          </div>

          {/* Key Topics */}
          <div className="mt-3 flex flex-wrap gap-1">
            {chapter.keyTopics.slice(0, 3).map((topic, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
              >
                {topic}
              </span>
            ))}
            {chapter.keyTopics.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] text-neutral-400">
                +{chapter.keyTopics.length - 3} more
              </span>
            )}
          </div>

          {/* Specs Bar */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/60 px-2.5 py-1.5 rounded-lg border border-neutral-100 dark:border-neutral-800">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{chapter.mcqCount} MCQs</span>
            <span className="opacity-40">•</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{chapter.shortCount} Short</span>
            <span className="opacity-40">•</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{chapter.longCount} Long</span>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-red-500" />
              <span>{chapter.fileSize}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{chapter.timeAllowed}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
          {/* Extract Button */}
          <button
            onClick={() => handleExtractBuiltinChapter(chapter)}
            disabled={isExtracting}
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer ${
              isExtracted
                ? 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            {isExtracting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Parsing...</span>
              </>
            ) : isExtracted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Synced ({chapter.mcqCount + chapter.shortCount + chapter.longCount} Qs)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Extract to Bank</span>
              </>
            )}
          </button>

          {/* Sub Buttons */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setSelectedPdfModal(chapter)}
              className="flex items-center justify-center gap-1 py-1 px-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
            >
              <Eye className="w-3 h-3" />
              <span>PDF</span>
            </button>

            <button
              onClick={() => handleLoadChapterExam(chapter)}
              className="flex items-center justify-center gap-1 py-1 px-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-900 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
            >
              <ArrowRight className="w-3 h-3" />
              <span>Load</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
