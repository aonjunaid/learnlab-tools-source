export interface ExamHeaderConfig {
  institutionName: string;
  institutionSubtitle?: string;
  studentNamePrompt: string;
  rollNumberPrompt: string;
  className: string;
  date: string;
  subjectName: string;
  subjectNameUrdu: string;
  timeAllowed: string;
  totalMarks: number;
  examName: string;
  syllabus: string;
  showOmrSheet: boolean;
  showWatermark: boolean;
  watermarkText: string;
  paperType: 'bilingual' | 'english' | 'urdu';
}

export interface MCQOption {
  id: 'A' | 'B' | 'C' | 'D';
  textEn: string;
  textUr: string;
}

export interface ExamMCQ {
  id: string;
  num: number;
  textEn: string;
  textUr: string;
  options: MCQOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  points: number;
  chapter?: string;
  isHighYield?: boolean; // ZahidNotes Guess / Repeated in Board Exams
  boardTag?: string; // e.g. "BISE Lahore / Rawalpindi"
}

export interface ExamShortQuestion {
  id: string;
  numRoman: string;
  textEn: string;
  textUr: string;
  solution?: string;
  points: number;
  chapter?: string;
  isHighYield?: boolean;
  boardTag?: string;
}

export interface ExamLongQuestion {
  id: string;
  num: number;
  textEn: string;
  textUr: string;
  solution?: string;
  points: number;
  chapter?: string;
  partLetter?: 'a' | 'b';
  isHighYield?: boolean;
  boardTag?: string;
}

export interface BilingualExamPaper {
  id: string;
  title: string;
  header: ExamHeaderConfig;
  mcqs: ExamMCQ[];
  shortQuestions: ExamShortQuestion[];
  longQuestions: ExamLongQuestion[];
  instructionsEn?: string;
  instructionsUr?: string;
  category?: 'chapter-wise' | 'half-book' | 'full-book' | 'guess-paper';
}

export interface QuestionBankItem {
  id: string;
  subject: string;
  grade: string;
  unit: string;
  type: 'mcq' | 'short' | 'long';
  textEn: string;
  textUr: string;
  options?: MCQOption[];
  correctOption?: 'A' | 'B' | 'C' | 'D';
  solution?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  isHighYield?: boolean;
  boardTag?: string;
  classTag?: string;
  sourcePdf?: string;
}

export interface PairingSchemeChapter {
  chapterNumber: number;
  chapterTitleEn: string;
  chapterTitleUr: string;
  mcqCount: number;
  shortQuestionGroup: 'Q2' | 'Q3' | 'Q4' | 'Mixed';
  shortQuestionCount: number;
  longQuestionPairing?: string;
}

export interface SubjectPairingScheme {
  id: string;
  className: string; // '9th', '10th', '11th', '12th'
  subject: string;
  subjectUrdu: string;
  totalMarks: number;
  timeAllowed: string;
  mcqMarks: number;
  shortMarks: number;
  longMarks: number;
  patternOverview: string;
  patternOverviewUrdu: string;
  chapters: PairingSchemeChapter[];
  questionGroups: {
    q2NotesEn: string;
    q2NotesUr: string;
    q3NotesEn: string;
    q3NotesUr: string;
    q4NotesEn?: string;
    q4NotesUr?: string;
    longNotesEn: string;
    longNotesUr: string;
  };
}

export interface TextbookChapterIndex {
  grade: string;
  subject: string;
  subjectUrdu: string;
  chapters: {
    unitNumber: number;
    titleEn: string;
    titleUr: string;
    keyConcepts: string[];
  }[];
}
