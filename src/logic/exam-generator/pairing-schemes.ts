import { SubjectPairingScheme } from './types';

/**
 * Authentic Board Paper Pairing Schemes (BISE Lahore, Rawalpindi, Faisalabad, Multan,
 * Gujranwala, Sahiwal, Sargodha, Bahawalpur, DG Khan, and Federal Board FBISE)
 * extracted and organized based on standard ZahidNotes curriculum specifications.
 */
export const BOARD_PAIRING_SCHEMES: SubjectPairingScheme[] = [
  // ----------------------------------------------------
  // 9th Class - Mathematics (Science Group) - 75 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-9th-math',
    className: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی (سائنس گروپ)',
    totalMarks: 75,
    timeAllowed: '2 Hours 30 Mins',
    mcqMarks: 15,
    shortMarks: 36,
    longMarks: 24,
    patternOverview: 'Total 75 Marks: Q1 = 15 MCQs (15 marks). Short Questions: Q2, Q3, Q4 (Attempt 6 out of 9 in each, 12 marks each = 36 marks). Long Questions: Attempt 3 out of 5 (Q9 Theorem is compulsory, 8 marks each = 24 marks).',
    patternOverviewUrdu: 'کل نمبر 75: سوال 1 = 15 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2، 3، 4 (ہر ایک میں سے 9 میں سے 6 حل کریں، 36 نمبر)۔ تفصیلی سوالات: 5 میں سے 3 حل کریں (سوال 9 مسئلہ لازمی ہے، 24 نمبر)۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 6 out of 9 questions from Chapters 1, 2, 3, 4, 5 (Ch 1: 2, Ch 2: 2, Ch 3: 2, Ch 4: 2, Ch 5: 1).',
      q2NotesUr: 'چیپٹر 1 تا 5 میں سے کوئی سے 6 سوالات حل کریں (باب 1: 2، باب 2: 2، باب 3: 2، باب 4: 2، باب 5: 1)۔',
      q3NotesEn: 'Attempt any 6 out of 9 questions from Chapters 6, 7, 8, 9, 10, 11 (Ch 6: 1, Ch 7: 2, Ch 8: 2, Ch 9: 2, Ch 10: 1, Ch 11: 1).',
      q3NotesUr: 'چیپٹر 6 تا 11 میں سے کوئی سے 6 سوالات حل کریں (باب 6: 1، باب 7: 2، باب 8: 2، باب 9: 2، باب 10: 1، باب 11: 1)۔',
      q4NotesEn: 'Attempt any 6 out of 9 questions from Chapters 12, 13, 14, 15, 16, 17 (Definitions and geometric constructions).',
      q4NotesUr: 'چیپٹر 12 تا 17 میں سے کوئی سے 6 سوالات حل کریں (تعریفیں اور ہندسی اشکال)۔',
      longNotesEn: 'Attempt 3 questions. Q9 (Theorems from Ch 12 or Ch 16) is COMPULSORY. Q5: Ch 1 & Ch 2, Q6: Ch 3 & Ch 4, Q7: Ch 5 & Ch 6, Q8: Ch 7 & Ch 17.',
      longNotesUr: 'کوئی سے 3 تفصیلی سوالات حل کریں۔ سوال 9 (مسئلہ چیپٹر 12 یا 16) لازمی ہے۔ س5: باب 1 و 2، س6: باب 3 و 4، س7: باب 5 و 6، س8: باب 7 و 17۔'
    },
    chapters: [
      { chapterNumber: 1, chapterTitleEn: 'Matrices and Determinants', chapterTitleUr: 'قالب اور قالبوں کے مقطع', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 2, longQuestionPairing: 'Q5 (a) Ex 1.6' },
      { chapterNumber: 2, chapterTitleEn: 'Real and Complex Numbers', chapterTitleUr: 'حقیقی اور پیچیدہ اعداد', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 2, longQuestionPairing: 'Q5 (b) Ex 2.4 / 2.6' },
      { chapterNumber: 3, chapterTitleEn: 'Logarithms', chapterTitleUr: 'لوگارتھم', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 2, longQuestionPairing: 'Q6 (a) Ex 3.4' },
      { chapterNumber: 4, chapterTitleEn: 'Algebraic Expressions & Formulas', chapterTitleUr: 'الجبرائی جملے اور الجبرائی فارمولے', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 2, longQuestionPairing: 'Q6 (b) Ex 4.2 / 4.4' },
      { chapterNumber: 5, chapterTitleEn: 'Factorization', chapterTitleUr: 'تجزی', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 1, longQuestionPairing: 'Q7 (a) Ex 5.2 / 5.4' },
      { chapterNumber: 6, chapterTitleEn: 'Algebraic Manipulation (HCF & LCM)', chapterTitleUr: 'الجبرائی کثیر رقمیوں کا عاد اعظم اور ذواضعاف اقل', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 1, longQuestionPairing: 'Q7 (b) Ex 6.1 / 6.2' },
      { chapterNumber: 7, chapterTitleEn: 'Linear Equations and Inequalities', chapterTitleUr: 'یک درجی مساواتیں اور غیر مساواتیں', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 2, longQuestionPairing: 'Q8 (a) Ex 7.1 / 7.2' },
      { chapterNumber: 8, chapterTitleEn: 'Linear Graphs & Applications', chapterTitleUr: 'یک درجی گراف اور ان کا اطلاق', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 2, longQuestionPairing: 'Short questions only' },
      { chapterNumber: 9, chapterTitleEn: 'Introduction to Coordinate Geometry', chapterTitleUr: 'محدد جیومیٹری کا تعارف', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 2, longQuestionPairing: 'Short questions only' },
      { chapterNumber: 12, chapterTitleEn: 'Line Bisectors and Angle Bisectors', chapterTitleUr: 'قطعات خط کے ناصف اور زاویوں کے ناصف', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 1, longQuestionPairing: 'Q9 Compulsory Theorem (Ch 12)' },
      { chapterNumber: 16, chapterTitleEn: 'Theorems Related with Area', chapterTitleUr: 'رقبے سے متعلق مسائل', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 1, longQuestionPairing: 'Q9 Compulsory Theorem (Ch 16)' },
      { chapterNumber: 17, chapterTitleEn: 'Practical Geometry - Triangles', chapterTitleUr: 'عملی جیومیٹری - مثلثیں', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 2, longQuestionPairing: 'Q8 (b) Ex 17.2' }
    ]
  },

  // ----------------------------------------------------
  // 9th Class - Physics - 60 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-9th-physics',
    className: '9th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (فزکس)',
    totalMarks: 60,
    timeAllowed: '2 Hours',
    mcqMarks: 12,
    shortMarks: 30,
    longMarks: 18,
    patternOverview: 'Total 60 Marks: Q1 = 12 MCQs. Short Questions: Q2 (Ch 1, 3, 5: 5/8), Q3 (Ch 2, 7, 9: 5/8), Q4 (Ch 4, 6, 8: 5/8) = 30 marks. Long Questions: Attempt 2 out of 3 (Q5: Ch 2/3, Q6: Ch 4/6, Q7: Ch 7/8; Part a Theory 5 marks, Part b Numerical 4 marks) = 18 marks.',
    patternOverviewUrdu: 'کل نمبر 60: سوال 1 = 12 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2 (باب 1، 3، 5: 8 میں سے 5)، سوال 3 (باب 2، 7، 9: 8 میں سے 5)، سوال 4 (باب 4، 6، 8: 8 میں سے 5) = 30 نمبر۔ تفصیلی سوالات: 3 میں سے 2 حل کریں (ہر سوال کے دو جز: الف تھیوری 5 نمبر، ب حسابی سوال 4 نمبر) = 18 نمبر۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 5 out of 8 questions: Chapter 1 (3 questions), Chapter 3 (3 questions), Chapter 5 (2 questions).',
      q2NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 1 (3 سوالات)، باب 3 (3 سوالات)، باب 5 (2 سوالات)۔',
      q3NotesEn: 'Attempt any 5 out of 8 questions: Chapter 2 (3 questions), Chapter 7 (3 questions), Chapter 9 (2 questions).',
      q3NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 2 (3 سوالات)، باب 7 (3 سوالات)، باب 9 (2 سوالات)۔',
      q4NotesEn: 'Attempt any 5 out of 8 questions: Chapter 4 (3 questions), Chapter 6 (3 questions), Chapter 8 (2 questions).',
      q4NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 4 (3 سوالات)، باب 6 (3 سوالات)، باب 8 (2 سوالات)۔',
      longNotesEn: 'Attempt 2 out of 3 long questions: Q5: (a) Ch 2 or 3 Theory, (b) Ch 2 or 3 Numerical; Q6: (a) Ch 4 or 6 Theory, (b) Ch 4 or 6 Numerical; Q7: (a) Ch 7 or 8 Theory, (b) Ch 7 or 8 Numerical.',
      longNotesUr: '3 میں سے کوئی سے 2 تفصیلی سوالات حل کریں: س5: باب 2 یا 3، س6: باب 4 یا 6، س7: باب 7 یا 8 (الف جز تھیوری 5 نمبر، ب جز عددی مسئلہ 4 نمبر)۔'
    },
    chapters: [
      { chapterNumber: 1, chapterTitleEn: 'Physical Quantities & Measurement', chapterTitleUr: 'طبیعی مقداریں اور پیمائش', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Short questions focus' },
      { chapterNumber: 2, chapterTitleEn: 'Kinematics', chapterTitleUr: 'حرکیات', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a/b) Equations of motion & numericals' },
      { chapterNumber: 3, chapterTitleEn: 'Dynamics', chapterTitleUr: 'قوت اور حرکت کے قوانین', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a/b) Newton laws & momentum' },
      { chapterNumber: 4, chapterTitleEn: 'Turning Effect of Forces', chapterTitleUr: 'قوتوں کے گھماؤ کا اثر', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q6 (a/b) Torque & equilibrium' },
      { chapterNumber: 5, chapterTitleEn: 'Gravitation', chapterTitleUr: 'گریویٹیشن', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 2, longQuestionPairing: 'Law of gravitation & mass of earth' },
      { chapterNumber: 6, chapterTitleEn: 'Work and Energy', chapterTitleUr: 'ورک اور انرجی', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q6 (a/b) Kinetic/Potential energy & power' },
      { chapterNumber: 7, chapterTitleEn: 'Properties of Matter', chapterTitleUr: 'مادے کی خصوصیات', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q7 (a/b) Pascal / Archimedes / Hooke law' },
      { chapterNumber: 8, chapterTitleEn: 'Thermal Properties of Matter', chapterTitleUr: 'مادے کی حرارتی خصوصیات', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 2, longQuestionPairing: 'Q7 (a/b) Specific heat & thermal expansion' },
      { chapterNumber: 9, chapterTitleEn: 'Transfer of Heat', chapterTitleUr: 'حرارت کا انتقال', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 2, longQuestionPairing: 'Conduction, convection & radiation' }
    ]
  },

  // ----------------------------------------------------
  // 9th Class - Chemistry - 60 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-9th-chemistry',
    className: '9th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمیا (کیمسٹری)',
    totalMarks: 60,
    timeAllowed: '2 Hours',
    mcqMarks: 12,
    shortMarks: 30,
    longMarks: 18,
    patternOverview: 'Total 60 Marks: Q1 = 12 MCQs. Short Questions: Q2 (Ch 1, 2, 3: 5/8), Q3 (Ch 4, 5: 5/8), Q4 (Ch 6, 7, 8: 5/8) = 30 marks. Long Questions: Attempt 2 out of 3 (Q5: Ch 1 & Ch 2, Q6: Ch 4 & Ch 5, Q7: Ch 6 & Ch 7; Part a 5 marks, Part b 4 marks) = 18 marks.',
    patternOverviewUrdu: 'کل نمبر 60: سوال 1 = 12 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2 (باب 1، 2، 3: 8 میں سے 5)، سوال 3 (باب 4، 5: 8 میں سے 5)، سوال 4 (باب 6، 7، 8: 8 میں سے 5) = 30 نمبر۔ تفصیلی سوالات: 3 میں سے 2 حل کریں (س5: باب 1 و 2، س6: باب 4 و 5، س7: باب 6 و 7) = 18 نمبر۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 5 out of 8 questions: Chapter 1 (3 questions), Chapter 2 (2 questions), Chapter 3 (3 questions).',
      q2NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 1 (3 سوالات)، باب 2 (2 سوالات)، باب 3 (3 سوالات)۔',
      q3NotesEn: 'Attempt any 5 out of 8 questions: Chapter 4 (4 questions), Chapter 5 (4 questions).',
      q3NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 4 (4 سوالات)، باب 5 (4 سوالات)۔',
      q4NotesEn: 'Attempt any 5 out of 8 questions: Chapter 6 (3 questions), Chapter 7 (3 questions), Chapter 8 (2 questions).',
      q4NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 6 (3 سوالات)، باب 7 (3 سوالات)، باب 8 (2 سوالات)۔',
      longNotesEn: 'Attempt 2 out of 3 long questions: Q5: (a) Ch 1, (b) Ch 2; Q6: (a) Ch 4, (b) Ch 5; Q7: (a) Ch 6, (b) Ch 7.',
      longNotesUr: '3 میں سے کوئی سے 2 تفصیلی سوالات حل کریں: س5: (الف) باب 1، (ب) باب 2؛ س6: (الف) باب 4، (ب) باب 5؛ س7: (الف) باب 6، (ب) باب 7۔'
    },
    chapters: [
      { chapterNumber: 1, chapterTitleEn: 'Fundamentals of Chemistry', chapterTitleUr: 'کیمیا کی بنیادی اصطلاحات', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a) Empirical/Molecular formula & mole calculations' },
      { chapterNumber: 2, chapterTitleEn: 'Structure of Atoms', chapterTitleUr: 'ایٹم کی ساخت', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 2, longQuestionPairing: 'Q5 (b) Rutherford / Bohr atomic theory' },
      { chapterNumber: 3, chapterTitleEn: 'Periodic Table & Periodicity', chapterTitleUr: 'پیریوڈک ٹیبل اور خصوصیات کی پیریوڈیسٹی', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Ionization energy & electron affinity trends' },
      { chapterNumber: 4, chapterTitleEn: 'Structure of Molecules', chapterTitleUr: 'مالیکیولز کی ساخت اور کیمیائی بانڈز', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 4, longQuestionPairing: 'Q6 (a) Ionic, Covalent & Hydrogen bonding' },
      { chapterNumber: 5, chapterTitleEn: 'Physical States of Matter', chapterTitleUr: 'مادے کی طبعی حالتیں', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 4, longQuestionPairing: 'Q6 (b) Boyle / Charles law & evaporation' },
      { chapterNumber: 6, chapterTitleEn: 'Solutions', chapterTitleUr: 'سولوشنز', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q7 (a) Molarity, saturated solution & solubility' },
      { chapterNumber: 7, chapterTitleEn: 'Electrochemistry', chapterTitleUr: 'الیکٹرو کیمسٹری', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q7 (b) Oxidation-reduction & galvanic/electrolytic cell' },
      { chapterNumber: 8, chapterTitleEn: 'Chemical Reactivity', chapterTitleUr: 'کیمیائی ردعمل اور دھاتیں', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 2, longQuestionPairing: 'Metals & non-metals reactivity' }
    ]
  },

  // ----------------------------------------------------
  // 9th Class - Computer Science - 50 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-9th-computer',
    className: '9th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس',
    totalMarks: 50,
    timeAllowed: '2 Hours',
    mcqMarks: 10,
    shortMarks: 24,
    longMarks: 16,
    patternOverview: 'Total 50 Marks: Q1 = 10 MCQs. Short Questions: Q2 (Ch 1: 4/6), Q3 (Ch 2 & Ch 3: 4/6), Q4 (Ch 4 & Ch 5: 4/6) = 24 marks. Long Questions: Attempt 2 out of 3 (Q5: Ch 1, Q6: Ch 3, Q7: Ch 4 or 5; 8 marks each) = 16 marks.',
    patternOverviewUrdu: 'کل نمبر 50: سوال 1 = 10 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2 (باب 1: 6 میں سے 4)، سوال 3 (باب 2 اور 3: 6 میں سے 4)، سوال 4 (باب 4 اور 5: 6 میں سے 4) = 24 نمبر۔ تفصیلی سوالات: 3 میں سے 2 حل کریں (8 نمبر فی سوال) = 16 نمبر۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 4 out of 6 questions from Chapter 1 (Problem Solving & Flowcharts).',
      q2NotesUr: 'باب 1 (مسئلہ حل کرنا اور فلو چارٹس) میں سے 6 میں سے کوئی سے 4 سوالات حل کریں۔',
      q3NotesEn: 'Attempt any 4 out of 6 questions from Chapter 2 (Binary Computing) and Chapter 3 (Networks).',
      q3NotesUr: 'باب 2 (بائنری نظام) اور باب 3 (نیٹ ورکس) میں سے 6 میں سے کوئی سے 4 سوالات حل کریں۔',
      q4NotesEn: 'Attempt any 4 out of 6 questions from Chapter 4 (Data Privacy) and Chapter 5 (Designing Website).',
      q4NotesUr: 'باب 4 (ڈیٹا پرائیویسی) اور باب 5 (ویب سائٹ ڈیزائننگ) میں سے 6 میں سے کوئی سے 4 سوالات حل کریں۔',
      longNotesEn: 'Attempt 2 out of 3 long questions: Q5 from Ch 1, Q6 from Ch 3, Q7 from Ch 4 or Ch 5 (8 marks each).',
      longNotesUr: '3 میں سے کوئی سے 2 تفصیلی سوالات حل کریں: س5 باب 1 سے، س6 باب 3 سے، س7 باب 4 یا 5 سے (8 نمبر فی سوال)۔'
    },
    chapters: [
      { chapterNumber: 1, chapterTitleEn: 'Problem Solving & Flowcharts', chapterTitleUr: 'مسئلہ حل کرنا اور فلو چارٹس', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 6, longQuestionPairing: 'Q5 Flowchart symbols & algorithm development' },
      { chapterNumber: 2, chapterTitleEn: 'Binary System & Number Systems', chapterTitleUr: 'بائنری نظام اور کمپیوٹر میموری', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Number system conversions & logic gates' },
      { chapterNumber: 3, chapterTitleEn: 'Computer Networks', chapterTitleUr: 'کمپیوٹر نیٹ ورکس', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q6 Network topologies & TCP/IP model' },
      { chapterNumber: 4, chapterTitleEn: 'Data and Privacy / Cyber Security', chapterTitleUr: 'ڈیٹا اور پرائیویسی / سائبر سیکیورٹی', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q7 Cryptography, encryption & patent rights' },
      { chapterNumber: 5, chapterTitleEn: 'Designing Website (HTML)', chapterTitleUr: 'ویب سائٹ ڈیزائننگ (HTML)', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'HTML tags, tables, hyperlinks and styling' }
    ]
  },

  // ----------------------------------------------------
  // 10th Class - Mathematics (Science Group) - 75 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-10th-math',
    className: '10th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی (10ویں جماعت)',
    totalMarks: 75,
    timeAllowed: '2 Hours 30 Mins',
    mcqMarks: 15,
    shortMarks: 36,
    longMarks: 24,
    patternOverview: 'Total 75 Marks: Q1 = 15 MCQs. Short Questions: Q2, Q3, Q4 (Attempt 6 out of 9 in each = 36 marks). Long Questions: Attempt 3 out of 5 (Q9 Theorem from Ch 9 or Ch 12 is compulsory = 24 marks).',
    patternOverviewUrdu: 'کل نمبر 75: سوال 1 = 15 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2، 3، 4 (ہر ایک میں 9 میں سے 6 حل کریں = 36 نمبر)۔ تفصیلی سوالات: 5 میں سے 3 حل کریں (سوال 9 مسئلہ باب 9 یا 12 لازمی ہے = 24 نمبر)۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 6 out of 9 questions from Chapters 1, 2, 3 (Ch 1: 3, Ch 2: 3, Ch 3: 3).',
      q2NotesUr: 'باب 1، 2، 3 میں سے 9 میں سے کوئی سے 6 سوالات حل کریں (ہر باب سے 3 سوالات)۔',
      q3NotesEn: 'Attempt any 6 out of 9 questions from Chapters 4, 5, 6 (Ch 4: 2, Ch 5: 4, Ch 6: 3).',
      q3NotesUr: 'باب 4، 5، 6 میں سے 9 میں سے کوئی سے 6 سوالات حل کریں (باب 4: 2، باب 5: 4، باب 6: 3)۔',
      q4NotesEn: 'Attempt any 6 out of 9 questions from Chapters 7 to 13 (Trigonometry and Geometry definitions).',
      q4NotesUr: 'باب 7 تا 13 میں سے 9 میں سے کوئی سے 6 سوالات حل کریں (مثلثیات اور جیومیٹری کی تعریفیں)۔',
      longNotesEn: 'Attempt 3 questions. Q9 (Theorem Ch 9 or Ch 12) is COMPULSORY. Q5: Ch 1 & Ch 2, Q6: Ch 3 & Ch 4, Q7: Ch 5 & Ch 6, Q8: Ch 7 & Ch 13.',
      longNotesUr: 'کوئی سے 3 تفصیلی سوالات حل کریں۔ سوال 9 (مسئلہ چیپٹر 9 یا 12) لازمی ہے۔ س5: باب 1 و 2، س6: باب 3 و 4، س7: باب 5 و 6، س8: باب 7 و 13۔'
    },
    chapters: [
      { chapterNumber: 1, chapterTitleEn: 'Quadratic Equations', chapterTitleUr: 'دو درجی مساواتیں', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a) Ex 1.1 / 1.2 / 1.4' },
      { chapterNumber: 2, chapterTitleEn: 'Theory of Quadratic Equations', chapterTitleUr: 'دو درجی مساوات کا نظریہ', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q5 (b) Ex 2.3 / 2.7' },
      { chapterNumber: 3, chapterTitleEn: 'Variations', chapterTitleUr: 'تغیرات (نسبت اور تناسب)', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q6 (a) Ex 3.4 / 3.6 (Theorem on Proportions)' },
      { chapterNumber: 4, chapterTitleEn: 'Partial Fractions', chapterTitleUr: 'جزوی کسریں', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 2, longQuestionPairing: 'Q6 (b) Ex 4.1 / 4.2' },
      { chapterNumber: 5, chapterTitleEn: 'Sets and Functions', chapterTitleUr: 'سیٹ اور تفاعل', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 4, longQuestionPairing: 'Q7 (a) Ex 5.2 (De Morgan Laws) / 5.5' },
      { chapterNumber: 6, chapterTitleEn: 'Basic Statistics', chapterTitleUr: 'بنیادی شماریات', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q7 (b) Ex 6.2 (Arithmetic Mean / Median / Mode)' },
      { chapterNumber: 7, chapterTitleEn: 'Introduction to Trigonometry', chapterTitleUr: 'مثلثیات کا تعارف', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 4, longQuestionPairing: 'Q8 (a) Ex 7.4 (Trigonometric Identities)' },
      { chapterNumber: 9, chapterTitleEn: 'Chords of a Circle', chapterTitleUr: 'دائرے کے وتر', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 1, longQuestionPairing: 'Q9 Compulsory Theorem (Ch 9)' },
      { chapterNumber: 12, chapterTitleEn: 'Line Bisectors & Angle in a Segment', chapterTitleUr: 'قطعات دائرہ میں زاویے', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 1, longQuestionPairing: 'Q9 Compulsory Theorem (Ch 12)' },
      { chapterNumber: 13, chapterTitleEn: 'Practical Geometry - Circles', chapterTitleUr: 'عملی جیومیٹری - دائرے', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 2, longQuestionPairing: 'Q8 (b) Ex 13.2 / 13.3' }
    ]
  },

  // ----------------------------------------------------
  // 10th Class - Physics - 60 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-10th-physics',
    className: '10th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (10ویں جماعت)',
    totalMarks: 60,
    timeAllowed: '2 Hours',
    mcqMarks: 12,
    shortMarks: 30,
    longMarks: 18,
    patternOverview: 'Total 60 Marks: Q1 = 12 MCQs. Short Questions: Q2 (Ch 10, 11, 15: 5/8), Q3 (Ch 12, 14, 18: 5/8), Q4 (Ch 13, 16, 17: 5/8) = 30 marks. Long Questions: Attempt 2 out of 3 (Q5: Ch 10 & 12, Q6: Ch 11 & 13 or 14, Q7: Ch 15 & 16 or 18) = 18 marks.',
    patternOverviewUrdu: 'کل نمبر 60: سوال 1 = 12 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2، 3، 4 (ہر ایک میں 8 میں سے 5 حل کریں = 30 نمبر)۔ تفصیلی سوالات: 3 میں سے 2 حل کریں (الف تھیوری 5 نمبر، ب عددی مسئلہ 4 نمبر = 18 نمبر)۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 5 out of 8 questions: Chapter 10 (3 questions), Chapter 11 (2 questions), Chapter 15 (3 questions).',
      q2NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 10 (3 سوالات)، باب 11 (2 سوالات)، باب 15 (3 سوالات)۔',
      q3NotesEn: 'Attempt any 5 out of 8 questions: Chapter 12 (3 questions), Chapter 14 (3 questions), Chapter 18 (2 questions).',
      q3NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 12 (3 سوالات)، باب 14 (3 سوالات)، باب 18 (2 سوالات)۔',
      q4NotesEn: 'Attempt any 5 out of 8 questions: Chapter 13 (3 questions), Chapter 16 (3 questions), Chapter 17 (2 questions).',
      q4NotesUr: '8 میں سے کوئی سے 5 سوالات حل کریں: باب 13 (3 سوالات)، باب 16 (3 سوالات)، باب 17 (2 سوالات)۔',
      longNotesEn: 'Attempt 2 out of 3 long questions: Q5: Ch 10 or 12, Q6: Ch 11, 13 or 14, Q7: Ch 15, 16 or 18 (Part a 5 marks, Part b 4 marks).',
      longNotesUr: '3 میں سے کوئی سے 2 تفصیلی سوالات حل کریں: س5: باب 10 یا 12، س6: باب 11، 13 یا 14، س7: باب 15، 16 یا 18۔'
    },
    chapters: [
      { chapterNumber: 10, chapterTitleEn: 'Simple Harmonic Motion & Waves', chapterTitleUr: 'سمپل ہارمونک موشن اور ویوز', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a/b) Mass attached to spring & wave equation' },
      { chapterNumber: 11, chapterTitleEn: 'Sound', chapterTitleUr: 'آواز (ساؤنڈ)', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 2, longQuestionPairing: 'Speed of sound, ultrasound & intensity level' },
      { chapterNumber: 12, chapterTitleEn: 'Geometrical Optics', chapterTitleUr: 'جیومیٹریکل آپٹکس', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a/b) Total internal reflection & lens formula numericals' },
      { chapterNumber: 13, chapterTitleEn: 'Electrostatics', chapterTitleUr: 'الیکٹرو سٹیٹکس', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q6 (a/b) Coulomb law & capacitors' },
      { chapterNumber: 14, chapterTitleEn: 'Current Electricity', chapterTitleUr: 'کرنٹ الیکٹرسٹی', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q6 (a/b) Ohm law, combination of resistors & Joule law' },
      { chapterNumber: 15, chapterTitleEn: 'Electromagnetism', chapterTitleUr: 'الیکٹرو میگنیٹزم', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q7 (a/b) Electromagnetic induction, Faraday law & transformer' },
      { chapterNumber: 16, chapterTitleEn: 'Basic Electronics', chapterTitleUr: 'بنیادی الیکٹرانکس', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Thermionic emission, CRO & Logic gates (AND, OR, NOT, NAND, NOR)' },
      { chapterNumber: 17, chapterTitleEn: 'Information & Communication Tech (ICT)', chapterTitleUr: 'معلوماتی اور مواصلاتی ٹیکنالوجی', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 2, longQuestionPairing: 'Transmission of light signals, internet & email' },
      { chapterNumber: 18, chapterTitleEn: 'Atomic and Nuclear Physics', chapterTitleUr: 'ایٹمی اور نیوکلیائی طبیعیات', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 2, longQuestionPairing: 'Q7 (a/b) Half-life, nuclear fission/fusion & radioisotopes' }
    ]
  },

  // ----------------------------------------------------
  // 11th Class (1st Year) - Physics - 85 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-11th-physics',
    className: '11th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (سال اول / ایف ایس سی پارٹ 1)',
    totalMarks: 85,
    timeAllowed: '3 Hours',
    mcqMarks: 17,
    shortMarks: 44,
    longMarks: 24,
    patternOverview: 'Total 85 Marks: Q1 = 17 MCQs. Short Questions: Q2 (Ch 1, 2, 3, 4, 6: 8/12 = 16 marks), Q3 (Ch 5, 7, 8: 8/12 = 16 marks), Q4 (Ch 9, 10, 11: 6/9 = 12 marks). Long Questions: Attempt 3 out of 5 (Q5: Ch 2 & 3, Q6: Ch 4 & 8, Q7: Ch 5 & 7, Q8: Ch 6 & 11, Q9: Ch 9 & 10; 8 marks each = 24 marks).',
    patternOverviewUrdu: 'کل نمبر 85: سوال 1 = 17 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2 (12 میں سے 8 = 16 نمبر)، سوال 3 (12 میں سے 8 = 16 نمبر)، سوال 4 (9 میں سے 6 = 12 نمبر)۔ تفصیلی سوالات: 5 میں سے 3 حل کریں (ہر سوال 8 نمبر: 5 نمبر تھیوری + 3 نمبر حسابی مسئلہ = 24 نمبر)۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 8 out of 12 questions from Chapters 1 (4), 2 (3), 3 (3), 4 (1), 6 (1).',
      q2NotesUr: 'باب 1 (4)، 2 (3)، 3 (3)، 4 (1)، 6 (1) میں سے 12 میں سے کوئی سے 8 سوالات حل کریں۔',
      q3NotesEn: 'Attempt any 8 out of 12 questions from Chapters 5 (4), 7 (4), 8 (4).',
      q3NotesUr: 'باب 5 (4)، 7 (4)، 8 (4) میں سے 12 میں سے کوئی سے 8 سوالات حل کریں۔',
      q4NotesEn: 'Attempt any 6 out of 9 questions from Chapters 9 (3), 10 (3), 11 (3).',
      q4NotesUr: 'باب 9 (3)، 10 (3)، 11 (3) میں سے 9 میں سے کوئی سے 6 سوالات حل کریں۔',
      longNotesEn: 'Attempt 3 out of 5 questions: Q5: Ch 2 & 3; Q6: Ch 4 & 8; Q7: Ch 5 & 7; Q8: Ch 6 & 11; Q9: Ch 9 & 10.',
      longNotesUr: '5 میں سے کوئی سے 3 تفصیلی سوالات حل کریں: س5: باب 2 و 3؛ س6: باب 4 و 8؛ س7: باب 5 و 7؛ س8: باب 6 و 11؛ س9: باب 9 و 10۔'
    },
    chapters: [
      { chapterNumber: 1, chapterTitleEn: 'Measurements', chapterTitleUr: 'پیمائشیں', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 4, longQuestionPairing: 'Precision, accuracy & dimensional analysis' },
      { chapterNumber: 2, chapterTitleEn: 'Vectors and Equilibrium', chapterTitleUr: 'ویکٹرز اور توازن', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a/b) Vector addition by rectangular components & torque' },
      { chapterNumber: 3, chapterTitleEn: 'Motion and Force', chapterTitleUr: 'حرکت اور قوت', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a/b) Projectile motion & elastic collision in 1D' },
      { chapterNumber: 4, chapterTitleEn: 'Work and Energy', chapterTitleUr: 'ورک اور توانائی', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 1, longQuestionPairing: 'Q6 (a/b) Absolute potential energy & escape velocity' },
      { chapterNumber: 5, chapterTitleEn: 'Circular Motion', chapterTitleUr: 'دائرہ نما حرکت', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 4, longQuestionPairing: 'Q7 (a/b) Centripetal force, geostationary orbits & spin angular momentum' },
      { chapterNumber: 6, chapterTitleEn: 'Fluid Dynamics', chapterTitleUr: 'مائعات کی حرکیات', mcqCount: 1, shortQuestionGroup: 'Q2', shortQuestionCount: 1, longQuestionPairing: 'Q8 (a/b) Terminal velocity, equation of continuity & Bernoulli equation' },
      { chapterNumber: 7, chapterTitleEn: 'Oscillations', chapterTitleUr: 'ارتعاشات (آسیلیشنز)', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 4, longQuestionPairing: 'Q7 (a/b) Simple pendulum & energy conservation in SHM' },
      { chapterNumber: 8, chapterTitleEn: 'Waves', chapterTitleUr: 'امواج (ویوز)', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 4, longQuestionPairing: 'Q6 (a/b) Speed of sound (Laplace correction), stationary waves & Doppler effect' },
      { chapterNumber: 9, chapterTitleEn: 'Physical Optics', chapterTitleUr: 'طبیعی بصریات', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q9 (a/b) Young double slit experiment & diffraction grating' },
      { chapterNumber: 10, chapterTitleEn: 'Optical Instruments', chapterTitleUr: 'بصری آلات', mcqCount: 1, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q9 (a/b) Compound microscope, astronomical telescope & optical fibers' },
      { chapterNumber: 11, chapterTitleEn: 'Heat and Thermodynamics', chapterTitleUr: 'حرارت اور تھرموڈائنامکس', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q8 (a/b) Carnot engine & First/Second law of thermodynamics' }
    ]
  },

  // ----------------------------------------------------
  // 12th Class (2nd Year) - Physics - 85 Marks
  // ----------------------------------------------------
  {
    id: 'pairing-12th-physics',
    className: '12th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات (سال دوم / ایف ایس سی پارٹ 2)',
    totalMarks: 85,
    timeAllowed: '3 Hours',
    mcqMarks: 17,
    shortMarks: 44,
    longMarks: 24,
    patternOverview: 'Total 85 Marks: Q1 = 17 MCQs. Short Questions: Q2 (Ch 12, 14, 21: 8/12), Q3 (Ch 13, 16, 17, 18: 8/12), Q4 (Ch 15, 19, 20: 6/9). Long Questions: Attempt 3 out of 5 (Q5: Ch 12 & 13, Q6: Ch 14 & 15, Q7: Ch 16 & 18, Q8: Ch 17 & 19, Q9: Ch 20 & 21; 8 marks each).',
    patternOverviewUrdu: 'کل نمبر 85: سوال 1 = 17 کثیر الانتخابی سوالات۔ مختصر سوالات: سوال 2 (12 میں سے 8)، سوال 3 (12 میں سے 8)، سوال 4 (9 میں سے 6)۔ تفصیلی سوالات: 5 میں سے 3 حل کریں (ہر سوال 8 نمبر = 24 نمبر)۔',
    questionGroups: {
      q2NotesEn: 'Attempt any 8 out of 12 questions from Chapters 12 (4), 14 (4), 21 (4).',
      q2NotesUr: 'باب 12 (4)، 14 (4)، 21 (4) میں سے 12 میں سے کوئی سے 8 سوالات حل کریں۔',
      q3NotesEn: 'Attempt any 8 out of 12 questions from Chapters 13 (3), 16 (3), 17 (3), 18 (3).',
      q3NotesUr: 'باب 13 (3)، 16 (3)، 17 (3)، 18 (3) میں سے 12 میں سے کوئی سے 8 سوالات حل کریں۔',
      q4NotesEn: 'Attempt any 6 out of 9 questions from Chapters 15 (4), 19 (3), 20 (2).',
      q4NotesUr: 'باب 15 (4)، 19 (3)، 20 (2) میں سے 9 میں سے کوئی سے 6 سوالات حل کریں۔',
      longNotesEn: 'Attempt 3 out of 5 questions: Q5: Ch 12 & 13; Q6: Ch 14 & 15; Q7: Ch 16 & 18; Q8: Ch 17 & 19; Q9: Ch 20 & 21.',
      longNotesUr: '5 میں سے کوئی سے 3 تفصیلی سوالات حل کریں: س5: باب 12 و 13؛ س6: باب 14 و 15؛ س7: باب 16 و 18؛ س8: باب 17 و 19؛ س9: باب 20 و 21۔'
    },
    chapters: [
      { chapterNumber: 12, chapterTitleEn: 'Electrostatics', chapterTitleUr: 'الیکٹرو سٹیٹکس', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 4, longQuestionPairing: 'Q5 (a/b) Gauss law applications & Millikan experiment' },
      { chapterNumber: 13, chapterTitleEn: 'Current Electricity', chapterTitleUr: 'برقی رو', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q5 (a/b) Kirchhoff rules & potentiometer' },
      { chapterNumber: 14, chapterTitleEn: 'Electromagnetism', chapterTitleUr: 'الیکٹرو میگنیٹزم', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 4, longQuestionPairing: 'Q6 (a/b) Ampere law & charge to mass ratio (e/m)' },
      { chapterNumber: 15, chapterTitleEn: 'Electromagnetic Induction', chapterTitleUr: 'الیکٹرو میگنیٹک انڈکشن', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 4, longQuestionPairing: 'Q6 (a/b) Motional emf, Faraday law & AC generator' },
      { chapterNumber: 16, chapterTitleEn: 'Alternating Current', chapterTitleUr: 'الٹرنیٹنگ کرنٹ', mcqCount: 2, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q7 (a/b) RLC series/parallel resonance circuits' },
      { chapterNumber: 17, chapterTitleEn: 'Physics of Solids', chapterTitleUr: 'ٹھوس اشیاء کی طبیعیات', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q8 (a/b) Energy band theory, superconductors & hysteresis loop' },
      { chapterNumber: 18, chapterTitleEn: 'Electronics', chapterTitleUr: 'الیکٹرانکس', mcqCount: 1, shortQuestionGroup: 'Q3', shortQuestionCount: 3, longQuestionPairing: 'Q7 (a/b) Rectification (half/full wave) & Operational amplifier' },
      { chapterNumber: 19, chapterTitleEn: 'Dawn of Modern Physics', chapterTitleUr: 'جدید طبیعیات کا آغاز', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 3, longQuestionPairing: 'Q8 (a/b) Photoelectric effect, Compton effect & de-Broglie wavelength' },
      { chapterNumber: 20, chapterTitleEn: 'Atomic Spectra', chapterTitleUr: 'ایٹمی طیف', mcqCount: 2, shortQuestionGroup: 'Q4', shortQuestionCount: 2, longQuestionPairing: 'Q9 (a/b) Bohr postulates & production/properties of X-rays' },
      { chapterNumber: 21, chapterTitleEn: 'Nuclear Physics', chapterTitleUr: 'نیوکلیائی طبیعیات', mcqCount: 2, shortQuestionGroup: 'Q2', shortQuestionCount: 4, longQuestionPairing: 'Q9 (a/b) Mass defect, binding energy & nuclear reactors' }
    ]
  }
];

export function getPairingSchemeForSubject(className: string, subject: string): SubjectPairingScheme | undefined {
  const normalizedClass = className.toLowerCase().replace(/th$/, '').replace(/st$/, '').replace(/nd$/, '');
  const normalizedSub = subject.toLowerCase();

  return BOARD_PAIRING_SCHEMES.find((s) => {
    const sClass = s.className.toLowerCase().replace(/th$/, '').replace(/st$/, '').replace(/nd$/, '');
    const sSub = s.subject.toLowerCase();
    return sClass === normalizedClass && (sSub.includes(normalizedSub) || normalizedSub.includes(sSub));
  });
}
