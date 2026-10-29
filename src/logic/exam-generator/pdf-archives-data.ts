export interface ChapterPdfArchive {
  id: string;
  grade: string;
  subject: string;
  subjectUrdu: string;
  unitNumber: number;
  unitTitleEn: string;
  unitTitleUr: string;
  paperCode: string;
  pdfPath: string;
  fileSize: string;
  pageCount: number;
  totalMarks: number;
  timeAllowed: string;
  mcqCount: number;
  shortCount: number;
  longCount: number;
  keyTopics: string[];
  keyTopicsUrdu: string[];
  presetId?: string;
  extractedQuestionIds: string[];
}

export const CHAPTER_PDF_ARCHIVES: ChapterPdfArchive[] = [
  {
    id: 'pdf-9m-u1',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Real and Complex Numbers',
    unitTitleUr: 'یونٹ 1: حقیقی اور غیر حقیقی اعداد',
    paperCode: '7454',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '435 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Sumerian Numeral System', 'Properties of Real Numbers', 'Conjugate Surds', 'Scientific Form', 'Exponential Powers'],
    keyTopicsUrdu: ['سمیری عددی نظام', 'حقیقی اعداد کی خصوصیات', 'مترافق مقادیر اصم', 'سائنسی ترقیم', 'قوت نمائی قوانین'],
    presetId: 'math-9th-unit1-real-numbers',
    extractedQuestionIds: [
      'qb_9m1_mcq1', 'qb_9m1_mcq2', 'qb_9m1_mcq3', 'qb_9m1_mcq4', 'qb_9m1_mcq5',
      'qb_9m1_short1', 'qb_9m1_short2', 'qb_9m1_long1'
    ]
  },
  {
    id: 'pdf-9m-u2',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Real Numbers & Logarithms',
    unitTitleUr: 'یونٹ 2: حقیقی اعداد اور لوگارتھم',
    paperCode: '9180',
    pdfPath: '/assets/aistudio/________2_73daca82.pdf',
    fileSize: '467 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Scientific Notation', 'Laws of Logarithms', 'Characteristic & Mantissa', 'Mars Diameter', 'Investment Doubling Model'],
    keyTopicsUrdu: ['سائنسی ترقیم', 'لوگارتھم کے قوانین', 'خاصہ اور مینٹیسا', 'مریخ کا قطر', 'سرمایہ کاری کا دوگنا ماڈل'],
    extractedQuestionIds: [
      'qb_9m2_log1', 'qb_9m2_log2', 'qb_9m2_log3', 'qb_9m2_mcq1', 'qb_9m2_mcq2',
      'qb_9m2_mcq3', 'qb_9m2_mcq4', 'qb_9m2_mcq5', 'qb_9m2_mcq6',
      'qb_9m2_short3', 'qb_9m2_short4', 'qb_9m2_short5', 'qb_9m2_short6',
      'qb_9m2_short7', 'qb_9m2_short8', 'qb_9m2_short9'
    ]
  },
  {
    id: 'pdf-9m-u3',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Sets and Functions',
    unitTitleUr: 'یونٹ 3: سیٹ اور تفاعل',
    paperCode: '7454',
    pdfPath: '/assets/aistudio/math_ch3_dc87f78a.pdf',
    fileSize: '564 KB',
    pageCount: 3,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Set Operations n(A∪B)', 'Into & Onto Functions', 'Polygon Diagonals', 'Tangent Gradients', 'Venn Diagrams'],
    keyTopicsUrdu: ['سیٹوں کے اعمال', 'ان ٹو اور آن ٹو تفاعل', 'کثیر الاضلاع کے وتر', 'مماس کی ڈھلوان', 'وین ڈایاگرام'],
    presetId: 'nuqta-9th-math-unit3-sets',
    extractedQuestionIds: [
      'qb_9m3_1', 'qb_9m3_2', 'qb_9m3_3', 'qb_9m3_4', 'qb_9m3_5', 'qb_9m3_6'
    ]
  },
  {
    id: 'pdf-9m-u4',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 4,
    unitTitleEn: 'Unit 4: Factorization and Algebraic Formulas',
    unitTitleUr: 'یونٹ 4: تجزی اور الجبری کلیے',
    paperCode: '7454',
    pdfPath: '/assets/aistudio/math_ch4_1ade435e.pdf',
    fileSize: '521 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Cubic Factorization a³+b³', 'H.C.F & L.C.M of Monomials', 'Trinomial Factorization', 'Square Root by Division Method'],
    keyTopicsUrdu: ['مکعب کی تجزی', 'عاد اعظم اور ذواضعاف اقل', 'سہ رقمی تجزی', 'بذریعہ تقسیم جزر المربع'],
    extractedQuestionIds: [
      'qb_9m4_1', 'qb_9m4_2', 'qb_9m4_3', 'qb_9m4_4'
    ]
  },
  {
    id: 'pdf-9m-u5',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 5,
    unitTitleEn: 'Unit 5: Linear Equations and Inequalities',
    unitTitleUr: 'یونٹ 5: یک درجی مساوات اور غیر مساوات',
    paperCode: '7454',
    pdfPath: '/assets/aistudio/math_ch5_4535b7e2.pdf',
    fileSize: '464 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Linear Equations in One Variable', 'Half-Plane Shading', 'Parabola Intercepts', 'Probability of Playing Cards', 'Similar Triangles Shadow'],
    keyTopicsUrdu: ['یک درجی مساوات', 'خطہ کا سایہ دار حل', 'پیرابولا کے مقاطع', 'تاش کے پتوں کا احتمال', 'متشابہ مثلثوں کا سایہ'],
    presetId: 'nuqta-9th-math-unit5-inequalities',
    extractedQuestionIds: [
      'qb_9m5_1', 'qb_9m5_2', 'qb_9m5_3', 'qb_9m5_4', 'qb_9m5_5', 'qb_9m5_6', 'qb_9m5_7', 'qb_9m5_8'
    ]
  },
  {
    id: 'pdf-9m-u6',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 6,
    unitTitleEn: 'Unit 6: Introduction to Trigonometry',
    unitTitleUr: 'یونٹ 6: تکونیات کا تعارف',
    paperCode: '6654',
    pdfPath: '/assets/aistudio/________6_e88ccd27.pdf',
    fileSize: '450 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Trigonometric Ratios', 'Degrees to Radians Conversion', 'Pythagorean Fundamental Identities', 'Right Triangle Angles'],
    keyTopicsUrdu: ['تکونیاتی نسبتیں', 'ڈگری اور ریڈین کا تبادلہ', 'تکونیاتی بنیادی مماثلتیں', 'قائمۃ الزاویہ مثلث'],
    extractedQuestionIds: [
      'qb_9m6_1', 'qb_9m6_2', 'qb_9m6_3', 'qb_9m6_4', 'qb_9m6_mcq5', 'qb_9m6_mcq6', 'qb_9m6_short5', 'qb_9m6_short6'
    ]
  },
  {
    id: 'pdf-9m-u7',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 7,
    unitTitleEn: 'Unit 7: Coordinate Geometry & Straight Lines',
    unitTitleUr: 'یونٹ 7: متناسق جیومیٹری اور خط مستقیم',
    paperCode: '6654',
    pdfPath: '/assets/aistudio/________7_1994c66e.pdf',
    fileSize: '456 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Cartesian Coordinates', 'Distance Formula', 'Midpoint of Line Segment', 'Perpendicular Bisector Line', '2D Drone Trajectory'],
    keyTopicsUrdu: ['کارتیسی محددات', 'فاصلے کا فارمولا', 'وسطی نقطہ کا فارمولا', 'عمودی ناصف کی مساوات', 'ڈرون پرواز کا فاصلہ و ڈھلوان'],
    presetId: 'nuqta-9th-math-unit7-geometry',
    extractedQuestionIds: [
      'qb_9m7_1', 'qb_9m7_2', 'qb_9m7_3', 'qb_9m7_4', 'qb_9m7_5', 'qb_9m7_short5', 'qb_9m7_short6'
    ]
  },
  {
    id: 'pdf-9m-u8',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 8,
    unitTitleEn: 'Unit 8: Mathematical Reasoning & Logic',
    unitTitleUr: 'یونٹ 8: ریاضیاتی استدلال اور منطق',
    paperCode: '6654',
    pdfPath: '/assets/aistudio/________8_1__2a2cdcd0.pdf',
    fileSize: '445 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Inductive vs Deductive Reasoning', 'Propositions & Conjunctions', 'Truth Tables', 'Converse, Inverse, Contrapositive', 'Tautology & Contradiction'],
    keyTopicsUrdu: ['استقرائی اور استخراجی استدلال', 'قضایا اور عطف', 'سچائی کے جدول', 'عکس، معکوس اور عکس معکوس', 'ٹوٹولوجی اور تناقض'],
    extractedQuestionIds: [
      'qb_9m8_1', 'qb_9m8_2', 'qb_9m8_3', 'qb_9m8_4', 'qb_9m8_mcq5', 'qb_9m8_mcq6', 'qb_9m8_short5'
    ]
  },
  {
    id: 'pdf-9m-u10',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 10,
    unitTitleEn: 'Unit 10: Functions and Graphs',
    unitTitleUr: 'یونٹ 10: تفاعل اور گراف',
    paperCode: '9180',
    pdfPath: '/assets/aistudio/________10_eca4f6c2.pdf',
    fileSize: '459 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Linear & Quadratic Graphs', 'Y-Intercept & Axis of Symmetry', 'Exponential Growth & Decay', 'Shahid Salary Function', 'Shirt Manufacturing Break-even'],
    keyTopicsUrdu: ['یک درجی اور دو درجی گراف', 'قاطع اور محور تشاکل', 'قوت نمائی نمو اور تنزل', 'شاہد کی تنخواہ کا تفاعل', 'قمیض سازی کا بریک ایون'],
    extractedQuestionIds: [
      'qb_9m10_1', 'qb_9m10_2', 'qb_9m10_3', 'qb_9m10_4', 'qb_9m10_mcq5', 'qb_9m10_mcq6', 'qb_9m10_short5', 'qb_9m10_long2'
    ]
  },
  {
    id: 'pdf-9m-u11',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 11,
    unitTitleEn: 'Unit 11: Practical Geometry - Triangles',
    unitTitleUr: 'یونٹ 11: عملی جیومیٹری - مثلثات',
    paperCode: '6654',
    pdfPath: '/assets/aistudio/________11_99534672.pdf',
    fileSize: '430 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Circumcenter & Orthocenter', 'Medians and Altitudes', 'Equilateral Triangle Properties', 'Triangle Compass Construction', 'Perpendicular Bisectors Concurrency'],
    keyTopicsUrdu: ['محاصرہ مرکز اور عمودی مرکز', 'وسطانیے اور ارتفاع', 'مساوی الاضلاع مثلث', 'پرکار سے مثلث کی بناوٹ', 'عمودی ناصفوں کا ہم نقطہ ہونا'],
    extractedQuestionIds: [
      'qb_9m11_1', 'qb_9m11_2', 'qb_9m11_3', 'qb_9m11_4', 'qb_9m11_5', 'qb_9m11_mcq6', 'qb_9m11_short6'
    ]
  },
  {
    id: 'pdf-9m-u12',
    grade: '9th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 12,
    unitTitleEn: 'Unit 12: Basic Statistics & Data Representation',
    unitTitleUr: 'یونٹ 12: بنیادی شماریات اور مواد کی پیشکش',
    paperCode: '7341',
    pdfPath: '/assets/aistudio/________12_1__f6f172a7.pdf',
    fileSize: '567 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Discrete vs Continuous Data', 'Class Mark (Midpoint)', 'Arithmetic Mean Calculation', 'Mode of Data', 'Grouped Data Frequency Tables', 'Assumed Mean Short Method'],
    keyTopicsUrdu: ['غیر مسلسل اور مسلسل مواد', 'جماعتی نشان (درمیانی نقطہ)', 'حسابی اوسط', 'مواد کا اعادہ', 'تعددی جدول', 'مختصر طریقے سے اوسط قد'],
    presetId: 'nuqta-9th-math-unit12-statistics',
    extractedQuestionIds: [
      'qb_9m12_1', 'qb_9m12_2', 'qb_9m12_3', 'qb_9m12_4', 'qb_9m12_5', 'qb_9m12_6', 'qb_9m12_7',
      'qb_9m12_mcq8', 'qb_9m12_mcq9', 'qb_9m12_short8'
    ]
  },

  // =========================================================================
  // 9TH CLASS - PHYSICS
  // =========================================================================
  {
    id: 'pdf-9p-u1',
    grade: '9th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Physical Quantities & Measurement',
    unitTitleUr: 'یونٹ 1: طبعی مقداریں اور پیمائش',
    paperCode: '4101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '412 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Base & Derived Units', 'Vernier Calipers & Screw Gauge', 'Significant Figures', 'Zero Error & Correction'],
    keyTopicsUrdu: ['بنیادی اور ماخوذ مقداریں', 'ورنیئر کیلیپرز اور سکرو گیج', 'اہم ہندسے', 'زیرو ایرر اور درستی'],
    extractedQuestionIds: ['qb_p1', 'qb_p2', 'qb_p3', 'qb_p4']
  },
  {
    id: 'pdf-9p-u2',
    grade: '9th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Kinematics & Equations of Motion',
    unitTitleUr: 'یونٹ 2: کائنی میٹکس اور حرکتی مساواتیں',
    paperCode: '4102',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '428 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Distance vs Displacement', 'Speed & Velocity', 'Three Equations of Motion', 'Speed-Time Graph Slope'],
    keyTopicsUrdu: ['فاصلہ اور ہٹاؤ', 'رفتار اور ویلوسٹی', 'حرکت کی تین مساواتیں', 'سپیڈ ٹائم گراف کی ڈھلوان'],
    extractedQuestionIds: ['qb_p1', 'qb_p2', 'qb_p3']
  },
  {
    id: 'pdf-9p-u3',
    grade: '9th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Dynamics & Laws of Motion',
    unitTitleUr: 'یونٹ 3: ڈائنامکس اور حرکت کے قوانین',
    paperCode: '4103',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '445 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Newton\'s Three Laws', 'Momentum & Force', 'Law of Conservation of Momentum', 'Friction & Centripetal Force'],
    keyTopicsUrdu: ['نیوٹن کے تینوں قوانین', 'مومنٹم اور فورس', 'بقائے مومنٹم کا قانون', 'فرکشن اور سینٹری پیٹل فورس'],
    extractedQuestionIds: ['qb_p1', 'qb_p2', 'qb_p3', 'qb_p4']
  },

  // =========================================================================
  // 9TH CLASS - CHEMISTRY
  // =========================================================================
  {
    id: 'pdf-9c-u1',
    grade: '9th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Fundamentals of Chemistry',
    unitTitleUr: 'یونٹ 1: کیمسٹری کے بنیادی اصول',
    paperCode: '5201',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '398 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Branches of Chemistry', 'Atomic Number & Mass Number', 'Empirical & Molecular Formula', 'Avogadro\'s Number & Mole'],
    keyTopicsUrdu: ['کیمسٹری کی شاخیں', 'ایٹمی نمبر اور ماس نمبر', 'ایمپریکل اور مالیکیولر فارمولا', 'ایوگیڈرو نمبر اور مول'],
    extractedQuestionIds: ['qb_ch1', 'qb_ch2', 'qb_ch3']
  },
  {
    id: 'pdf-9c-u2',
    grade: '9th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Structure of Atoms',
    unitTitleUr: 'یونٹ 2: ایٹم کی ساخت',
    paperCode: '5202',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '415 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Rutherford Atomic Model', 'Bohr\'s Theory Postulates', 'Electronic Configuration (s,p,d,f)', 'Isotopes and Uses'],
    keyTopicsUrdu: ['ردرفورڈ کا ایٹمی ماڈل', 'بوہر تھیوری کے مفروضات', 'الیکٹرانک کنفیگریشن', 'آئسوٹوپس اور استعمالات'],
    extractedQuestionIds: ['qb_ch2', 'qb_ch3', 'qb_ch4']
  },

  // =========================================================================
  // 9TH CLASS - COMPUTER SCIENCE
  // =========================================================================
  {
    id: 'pdf-9cs-u1',
    grade: '9th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Problem Solving & Flowcharts',
    unitTitleUr: 'یونٹ 1: مسئلہ حل کرنا اور فلو چارٹس',
    paperCode: '6301',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '390 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Problem Solving Steps', 'Flowchart Symbols & Trace Tables', 'Algorithm Design', 'Efficiency of Algorithms'],
    keyTopicsUrdu: ['مسئلہ حل کرنے کے مراحل', 'فلو چارٹ کی علامات', 'الگورتھم کا خاکہ', 'الگورتھم کی کارکردگی'],
    extractedQuestionIds: ['qb_cs1', 'qb_cs2', 'qb_cs3']
  },
  {
    id: 'pdf-9cs-u3',
    grade: '9th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Computer Networks & Communication',
    unitTitleUr: 'یونٹ 3: کمپیوٹر نیٹ ورکس اور مواصلات',
    paperCode: '6303',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '410 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Network Topologies (Star, Ring, Bus)', 'TCP/IP Model & Addressing', 'Routers & Switches', 'Client-Server Architecture'],
    keyTopicsUrdu: ['نیٹ ورک ٹوپولوجیز', 'ٹی سی پی / آئی پی ماڈل', 'راؤٹرز اور سوئچز', 'کلائنٹ سرور فن تعمیر'],
    extractedQuestionIds: ['qb_cs1', 'qb_cs2', 'qb_cs3']
  },

  // =========================================================================
  // 10TH CLASS - MATHEMATICS
  // =========================================================================
  {
    id: 'pdf-10m-u1',
    grade: '10th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Quadratic Equations',
    unitTitleUr: 'یونٹ 1: دو درجی مساواتیں',
    paperCode: '8101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '455 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Standard Form ax²+bx+c=0', 'Solution by Factorization', 'Completing the Square', 'Quadratic Formula Derivation'],
    keyTopicsUrdu: ['دو درجی معیاری شکل', 'بذریعہ تجزی حل', 'تکمیل مربع کا طریقہ', 'دو درجی کلیے کا اخذ'],
    presetId: 'math-10th-midterm-sample',
    extractedQuestionIds: ['qb_m10_1', 'qb_m10_2', 'qb_m10_3']
  },
  {
    id: 'pdf-10m-u2',
    grade: '10th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Theory of Quadratic Equations',
    unitTitleUr: 'یونٹ 2: دو درجی مساواتوں کا نظریہ',
    paperCode: '8102',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '468 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Discriminant b²-4ac', 'Nature of Roots', 'Cube Roots of Unity (1, ω, ω²)', 'Synthetic Division'],
    keyTopicsUrdu: ['فرق کنندہ', 'روٹس کی نوعیت', 'اکائی کے جزر المکعب', 'ترکیبی تقسیم'],
    extractedQuestionIds: ['qb_m10_2', 'qb_m10_3', 'qb_m10_4']
  },
  {
    id: 'pdf-10m-u3',
    grade: '10th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Variations & Proportions',
    unitTitleUr: 'یونٹ 3: تغیرات اور تناسب',
    paperCode: '8103',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '442 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Direct and Inverse Variation', 'Joint Variation', 'Componendo-Dividendo Theorem', 'k-Method'],
    keyTopicsUrdu: ['تغیر راست اور معکوس', 'تغیر مشترک', 'مسئلہ ترکیب و تفصیل نسبت', 'k کا طریقہ'],
    extractedQuestionIds: ['qb_m10_3', 'qb_m10_4', 'qb_m10_5']
  },
  {
    id: 'pdf-10m-u7',
    grade: '10th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 7,
    unitTitleEn: 'Unit 7: Introduction to Trigonometry',
    unitTitleUr: 'یونٹ 7: تکونیات کا تعارف',
    paperCode: '8107',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '450 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Sexagesimal to Radian Conversion', 'Arc Length l = rθ', 'Trigonometric Ratios & Fundamental Identities', 'Angle of Elevation & Depression'],
    keyTopicsUrdu: ['ڈگری اور ریڈین کا تبادلہ', 'قوس کی لمبائی', 'تکونیاتی نسبتیں اور بنیادی مماثلتیں', 'زاویہ صعود اور نزول'],
    extractedQuestionIds: ['qb_m10_4', 'qb_m10_5', 'qb_m10_6']
  },

  // =========================================================================
  // 10TH CLASS - PHYSICS
  // =========================================================================
  {
    id: 'pdf-10p-u10',
    grade: '10th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات',
    unitNumber: 10,
    unitTitleEn: 'Unit 10: Simple Harmonic Motion & Waves',
    unitTitleUr: 'یونٹ 10: سمپل ہارمونک موشن اور ویوز',
    paperCode: '7210',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '460 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Mass-Spring System SHM', 'Simple Pendulum Time Period T = 2π√(l/g)', 'Wave Motion v = fλ', 'Ripple Tank (Refraction & Diffraction)'],
    keyTopicsUrdu: ['ماس سپرنگ سسٹم', 'سادہ پنڈولم کا ٹائم پیریڈ', 'ویو مساوات', 'رپل ٹینک کے مشاہدات'],
    extractedQuestionIds: ['qb_p10_1', 'qb_p10_2', 'qb_p10_3']
  },
  {
    id: 'pdf-10p-u11',
    grade: '10th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات',
    unitNumber: 11,
    unitTitleEn: 'Unit 11: Sound & Acoustics',
    unitTitleUr: 'یونٹ 11: آواز اور صوتیات',
    paperCode: '7211',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '430 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Longitudinal Nature of Sound', 'Loudness, Pitch & Quality', 'Intensity Level & Decibel Scale', 'Audible Frequency Range & Ultrasound'],
    keyTopicsUrdu: ['آواز کی طولی لہریں', 'بلندی، پچ اور کوالٹی', 'آواز کی شدت اور ڈیسی بل اسکیل', 'الٹرا ساؤنڈ کے طبی اطلاقات'],
    extractedQuestionIds: ['qb_p10_2', 'qb_p10_3']
  },

  // =========================================================================
  // 11TH CLASS (1ST YEAR) - MATHEMATICS
  // =========================================================================
  {
    id: 'pdf-11m-u1',
    grade: '11th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Number Systems & Complex Numbers',
    unitTitleUr: 'یونٹ 1: عددی نظام اور غیر حقیقی اعداد',
    paperCode: '9301',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '480 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Properties of Real Numbers', 'Complex Number Operations', 'Modulus & Argand Diagram', 'De Moivre\'s Theorem Basics'],
    keyTopicsUrdu: ['حقیقی اعداد کی خصوصیات', 'مخلوط اعداد کے اعمال', 'موڈیولس اور آرگینڈ ڈایاگرام', 'ڈی موئور کے اصول'],
    extractedQuestionIds: ['qb_m11_1', 'qb_m11_2']
  },
  {
    id: 'pdf-11m-u3',
    grade: '11th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Matrices and Determinants',
    unitTitleUr: 'یونٹ 3: قالب اور مقطع',
    paperCode: '9303',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '495 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Matrix Inversion Method', 'Cramer\'s Rule for 3×3 Systems', 'Properties of Determinants', 'Rank of Matrix & Echelon Form'],
    keyTopicsUrdu: ['معکوس قالب کا طریقہ', 'کریمر کا قانون', 'مقطع کی خصوصیات', 'قالب کا درجہ اور ایشیلون شکل'],
    extractedQuestionIds: ['qb_m11_1', 'qb_m11_2', 'qb_m11_3']
  },
  {
    id: 'pdf-11m-u9',
    grade: '11th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 9,
    unitTitleEn: 'Unit 9: Fundamentals of Trigonometry',
    unitTitleUr: 'یونٹ 9: تکونیات کے بنیادی اصول',
    paperCode: '9309',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '510 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['General Angles in Standard Position', 'Signs of Trigonometric Functions in Quadrants', 'Fundamental Identities (cos²θ + sin²θ = 1)', 'Coterminal Angles'],
    keyTopicsUrdu: ['معیاری پوزیشن میں عام زاویے', 'چوتھائیوں میں تکونیاتی تفاعل کی علامتیں', 'بنیادی تکونیاتی کلیے', 'ہم انتہا زاویے'],
    extractedQuestionIds: ['qb_m11_2', 'qb_m11_3']
  },

  // =========================================================================
  // 12TH CLASS (2ND YEAR) - MATHEMATICS
  // =========================================================================
  {
    id: 'pdf-12m-u1',
    grade: '12th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Functions and Limits',
    unitTitleUr: 'یونٹ 1: تفاعل اور حدود',
    paperCode: '9401',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '525 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Domain and Range of Functions', 'Even and Odd Functions', 'Evaluation of Limits (lim sinθ/θ = 1)', 'Continuity of Functions'],
    keyTopicsUrdu: ['تفاعل کا ڈومین اور رینج', 'جفت اور طاق تفاعل', 'حدود کا حساب', 'تفاعل کا تسلسل'],
    extractedQuestionIds: ['qb_m12_1', 'qb_m12_2']
  },
  {
    id: 'pdf-12m-u2',
    grade: '12th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Differentiation & Derivative Applications',
    unitTitleUr: 'یونٹ 2: تفریق اور مشتق کے اطلاقات',
    paperCode: '9402',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '540 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Derivative by First Principles', 'Product and Quotient Rules', 'Chain Rule & Implicit Differentiation', 'Maxima and Minima Applications'],
    keyTopicsUrdu: ['بنیادی اصول کے مطابق مشتق', 'حاصل ضرب اور تقسیم کا قانون', 'چین رول اور مضمر تفریق', 'اعظمی اور اقل ترین قیمتیں'],
    extractedQuestionIds: ['qb_m12_2', 'qb_m12_3']
  },
  {
    id: 'pdf-12m-u3',
    grade: '12th',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Integration & Area Under Curves',
    unitTitleUr: 'یونٹ 3: انٹیگریشن اور خطوط کے نیچے رقبہ',
    paperCode: '9403',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '550 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Basic Integration Rules', 'Integration by Substitution', 'Integration by Parts', 'Definite Integrals and Area'],
    keyTopicsUrdu: ['انٹیگریشن کے بنیادی قوانین', 'بذریعہ متبادل انٹیگریشن', 'حصص کے ذریعے انٹیگریشن', 'معین انٹیگرل اور رقبہ'],
    extractedQuestionIds: ['qb_m12_1', 'qb_m12_3']
  },

  // =========================================================================
  // 9TH CLASS - BIOLOGY
  // =========================================================================
  {
    id: 'pdf-9b-u1',
    grade: '9th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Introduction to Biology',
    unitTitleUr: 'یونٹ 1: حیاتیات کا تعارف',
    paperCode: '5101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '420 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Branches of Biology', 'Levels of Biological Organization', 'Muslim Scientists Contributions'],
    keyTopicsUrdu: ['حیاتیات کی شاخیں', 'حیاتیاتی تنظیم کے درجات', 'مسلمان سائنسدانوں کے کارنامے'],
    extractedQuestionIds: ['qb_b1', 'qb_b2', 'qb_b3']
  },
  {
    id: 'pdf-9b-u2',
    grade: '9th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Solving a Biological Problem',
    unitTitleUr: 'یونٹ 2: حیاتیاتی مسئلہ کا حل',
    paperCode: '5102',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '415 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Biological Method Steps', 'Malaria Study & Plasmodium Hypothesis', 'Deduction and Controlled Experiments'],
    keyTopicsUrdu: ['حیاتیاتی طریقہ کار کے مراحل', 'ملیریا کا مطالعہ', 'قیاس اور کنٹرولڈ تجربات'],
    extractedQuestionIds: ['qb_b1', 'qb_b2']
  },
  {
    id: 'pdf-9b-u3',
    grade: '9th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Biodiversity & Classification',
    unitTitleUr: 'یونٹ 3: حیاتیاتی تنوع اور درجہ بندی',
    paperCode: '5103',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '430 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Five Kingdom System of Classification', 'Binomial Nomenclature', 'Conservation of Endangered Species'],
    keyTopicsUrdu: ['پانچ کنگڈم سسٹم', 'دو نامی طریقہ نامزدگی', 'ناپید انواع کا تحفظ'],
    extractedQuestionIds: ['qb_b2', 'qb_b3']
  },
  {
    id: 'pdf-9b-u4',
    grade: '9th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات',
    unitNumber: 4,
    unitTitleEn: 'Unit 4: Cells and Tissues',
    unitTitleUr: 'یونٹ 4: خلیات اور بافتیں',
    paperCode: '5104',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '445 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Cell Theory Postulates', 'Cell Organelles Structure & Functions', 'Epithelial, Connective, Muscular Tissues'],
    keyTopicsUrdu: ['سیل تھیوری', 'خلیے کے اعضاء', 'حیوانی اور نباتی بافتیں'],
    extractedQuestionIds: ['qb_b1', 'qb_b3']
  },

  // =========================================================================
  // 9TH CLASS - ENGLISH
  // =========================================================================
  {
    id: 'pdf-9eng-u1',
    grade: '9th',
    subject: 'English',
    subjectUrdu: 'انگریزی',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: The Saviour of Mankind',
    unitTitleUr: 'یونٹ 1: انسانیت کا نجات دہندہ',
    paperCode: '1101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '390 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Call to Prophethood in Cave Hira', 'Universal Moral Teachings', 'Parts of Speech & Comprehension'],
    keyTopicsUrdu: ['غار حرا میں نزول وحی', 'عالمگیر اخلاقی تعلیمات', 'گرائمر اور تفہیم عبارت'],
    extractedQuestionIds: ['qb_eng1', 'qb_eng2', 'qb_eng3']
  },
  {
    id: 'pdf-9eng-u2',
    grade: '9th',
    subject: 'English',
    subjectUrdu: 'انگریزی',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Patriotism',
    unitTitleUr: 'یونٹ 2: حب الوطنی',
    paperCode: '1102',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '385 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Definition of Patriotism', 'Quaid-e-Azam Vision of Nationhood', 'Modal Verbs & Conditionals'],
    keyTopicsUrdu: ['حب الوطنی کی تعریف', 'قائداعظم کا قومی وژن', 'امداد افعال'],
    extractedQuestionIds: ['qb_eng1', 'qb_eng2']
  },
  {
    id: 'pdf-9eng-u5',
    grade: '9th',
    subject: 'English',
    subjectUrdu: 'انگریزی',
    unitNumber: 5,
    unitTitleEn: 'Unit 5: Daffodils (Poem)',
    unitTitleUr: 'یونٹ 5: ڈافوڈلز (نظم)',
    paperCode: '1105',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '395 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['William Wordsworth Romantic Poetry', 'Nature Imagery and Personification', 'Rhyme Scheme and Summary'],
    keyTopicsUrdu: ['رومانی شاعری', 'فطری تشبیہات', 'قافیہ و ردیف اور خلاصہ'],
    extractedQuestionIds: ['qb_eng2', 'qb_eng3']
  },

  // =========================================================================
  // 9TH CLASS - URDU
  // =========================================================================
  {
    id: 'pdf-9ur-u1',
    grade: '9th',
    subject: 'Urdu',
    subjectUrdu: 'اردو لازمی',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Hijrat-e-Nabvi (S.A.W)',
    unitTitleUr: 'یونٹ 1: ہجرت نبوی صلی اللہ علیہ وسلم',
    paperCode: '2101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '400 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Maulana Shibli Nomani Prose Style', 'Historical Context of Hijrat', 'Tashreeh and Questions'],
    keyTopicsUrdu: ['مولانا شبلی نعمانی کا طرز تحریر', 'ہجرت مدینہ کا تاریخی پس منظر', 'سیاق و سباق کے ساتھ تشریح'],
    extractedQuestionIds: ['qb_ur1', 'qb_ur2', 'qb_ur3']
  },
  {
    id: 'pdf-9ur-u2',
    grade: '9th',
    subject: 'Urdu',
    subjectUrdu: 'اردو لازمی',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Mirza Ghalib ke Adaat-o-Khasail',
    unitTitleUr: 'یونٹ 2: مرزا غالب کے عادات و خصائل',
    paperCode: '2102',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '395 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Altaf Hussain Hali Biographical Sketch', 'Ghalib Generosity and Wit', 'Grammar & Idioms'],
    keyTopicsUrdu: ['مولانا الطاف حسین حالی کا سوانحی انداز', 'غالب کی کشادہ دلی اور حس مزاح', 'محاورات کا استعمال'],
    extractedQuestionIds: ['qb_ur1', 'qb_ur2']
  },
  {
    id: 'pdf-9ur-u6',
    grade: '9th',
    subject: 'Urdu',
    subjectUrdu: 'اردو لازمی',
    unitNumber: 6,
    unitTitleEn: 'Unit 6: Panchayat (Munshi Premchand)',
    unitTitleUr: 'یونٹ 6: پنچایت (منشی پریم چند)',
    paperCode: '2106',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '405 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Algu Chaudhary and Jumman Sheikh Story', 'Sanctity of Justice', 'Moral Lessons'],
    keyTopicsUrdu: ['الگو چودھری اور جمن شیخ کا قصہ', 'عدل و انصاف کی ذمہ داری', 'اخلاقی اسباق'],
    extractedQuestionIds: ['qb_ur2', 'qb_ur3']
  },

  // =========================================================================
  // 9TH CLASS - ISLAMIC STUDIES
  // =========================================================================
  {
    id: 'pdf-9isl-u1',
    grade: '9th',
    subject: 'Islamic Studies',
    subjectUrdu: 'اسلامیات لازمی',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Surah Al-Anfal (Ruku 1 to 5)',
    unitTitleUr: 'یونٹ 1: سورۃ الانفال (رکوع 1 تا 5)',
    paperCode: '3101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '410 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Ghazwa-e-Badr Lessons', 'Taqwa & Obedience to Allah & Rasul', 'Booty of War Rules'],
    keyTopicsUrdu: ['غزوہ بدر کے اسباق', 'تقویٰ اور اطاعت الٰہی و رسول', 'مال غنیمت کے احکام'],
    extractedQuestionIds: ['qb_isl1', 'qb_isl2', 'qb_isl3']
  },
  {
    id: 'pdf-9isl-u3',
    grade: '9th',
    subject: 'Islamic Studies',
    subjectUrdu: 'اسلامیات لازمی',
    unitNumber: 3,
    unitTitleEn: 'Unit 3: Ahadith-e-Nabvi (1 to 10)',
    unitTitleUr: 'یونٹ 3: احادیث نبویہ (حدیث 1 تا 10)',
    paperCode: '3103',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '405 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Hadith Translation & Practical Applications', 'Virtues of Seeking Knowledge', 'Good Manners & Honesty'],
    keyTopicsUrdu: ['احادیث کا ترجمہ و تشریح', 'حصول علم کی فضیلت', 'حسن اخلاق اور سچائی'],
    extractedQuestionIds: ['qb_isl1', 'qb_isl2']
  },

  // =========================================================================
  // 9TH CLASS - PAKISTAN STUDIES
  // =========================================================================
  {
    id: 'pdf-9ps-u1',
    grade: '9th',
    subject: 'Pakistan Studies',
    subjectUrdu: 'مطالعہ پاکستان',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Ideological Basis of Pakistan',
    unitTitleUr: 'یونٹ 1: نظریہ پاکستان کی اساس',
    paperCode: '4101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '415 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Two-Nation Theory Foundation', 'Quaid-e-Azam & Allama Iqbal Pronouncements', 'Islamic Values as Basis'],
    keyTopicsUrdu: ['دو قومی نظریے کی بنیاد', 'قائداعظم اور علامہ اقبال کے ارشادات', 'اسلامی اقدار نظریہ کی اساس'],
    extractedQuestionIds: ['qb_ps1', 'qb_ps2', 'qb_ps3']
  },
  {
    id: 'pdf-9ps-u2',
    grade: '9th',
    subject: 'Pakistan Studies',
    subjectUrdu: 'مطالعہ پاکستان',
    unitNumber: 2,
    unitTitleEn: 'Unit 2: Making of Pakistan (1857-1947)',
    unitTitleUr: 'یونٹ 2: تحریک پاکستان اور قیام پاکستان',
    paperCode: '4102',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '425 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Aligarh Movement (Sir Syed Ahmad Khan)', 'Lahore Resolution 1940', 'Role of Quaid-e-Azam in Creation of Pakistan'],
    keyTopicsUrdu: ['علی گڑھ تحریک', 'قرارداد لاہور 1940', 'قیام پاکستان میں قائداعظم کا کردار'],
    extractedQuestionIds: ['qb_ps1', 'qb_ps2']
  },

  // =========================================================================
  // 10TH CLASS - CHEMISTRY, BIOLOGY & PAK STUDIES
  // =========================================================================
  {
    id: 'pdf-10ch-u9',
    grade: '10th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری',
    unitNumber: 9,
    unitTitleEn: 'Unit 9: Chemical Equilibrium',
    unitTitleUr: 'یونٹ 9: کیمیائی توازن',
    paperCode: '8209',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '435 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Reversible Reactions & Dynamic Equilibrium', 'Law of Mass Action Derivation', 'Equilibrium Constant (Kc) Expressions'],
    keyTopicsUrdu: ['ریورسبل ری ایکشنز اور ڈائنامک توازن', 'لا آف ماس ایکشن کا اخذ', 'توازن کونسٹنٹ Kc'],
    extractedQuestionIds: ['qb_ch1', 'qb_ch2']
  },
  {
    id: 'pdf-10ch-u10',
    grade: '10th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری',
    unitNumber: 10,
    unitTitleEn: 'Unit 10: Acids, Bases and Salts',
    unitTitleUr: 'یونٹ 10: تیزاب، اساس اور نمکیات',
    paperCode: '8210',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '440 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Arrhenius, Bronsted-Lowry & Lewis Theories', 'pH and pOH Scale Calculations', 'Preparation and Uses of Important Salts'],
    keyTopicsUrdu: ['تیزاب اور اساس کے نظریات', 'پی ایچ اسکیل کا حساب', 'نمکیات کی تیاری اور استعمالات'],
    extractedQuestionIds: ['qb_ch2', 'qb_ch3']
  },
  {
    id: 'pdf-10b-u10',
    grade: '10th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات',
    unitNumber: 10,
    unitTitleEn: 'Unit 10: Gaseous Exchange',
    unitTitleUr: 'یونٹ 10: گیسوں کا تبادلہ',
    paperCode: '8310',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '425 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Gaseous Exchange in Plants', 'Human Respiratory System & Alveoli', 'Mechanism of Breathing & Respiratory Disorders'],
    keyTopicsUrdu: ['پودوں میں گیسوں کا تبادلہ', 'انسان کا نظام تنفس', 'سانس لینے کا طریقہ کار'],
    extractedQuestionIds: ['qb_b1', 'qb_b2']
  },
  {
    id: 'pdf-10b-u12',
    grade: '10th',
    subject: 'Biology',
    subjectUrdu: 'حیاتیات',
    unitNumber: 12,
    unitTitleEn: 'Unit 12: Coordination and Control',
    unitTitleUr: 'یونٹ 12: کوآرڈینیشن اور کنٹرول',
    paperCode: '8312',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '430 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Structure of Neuron and Nerve Impulse', 'Human Brain Anatomy & Functions', 'Endocrine Glands & Major Hormones'],
    keyTopicsUrdu: ['نیورون کی ساخت اور اعصابی تحریک', 'انسانی دماغ کی ساخت اور افعال', 'اینڈوکرائن غدود'],
    extractedQuestionIds: ['qb_b2', 'qb_b3']
  },
  {
    id: 'pdf-10cs-u1',
    grade: '10th',
    subject: 'Computer Science',
    subjectUrdu: 'کمپیوٹر سائنس',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Introduction to Programming (C)',
    unitTitleUr: 'یونٹ 1: پروگرامنگ کا تعارف (سی لینگویج)',
    paperCode: '8401',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '410 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Structure of a C Program', 'Preprocessor Directives and Main Function', 'Syntax and Semantic Errors'],
    keyTopicsUrdu: ['سی پروگرام کا ڈھانچہ', 'پری پروسیسر ڈائریکٹوز', 'سنٹیکس اور سیمینٹک غلطیاں'],
    extractedQuestionIds: ['qb_cs1', 'qb_cs2']
  },
  {
    id: 'pdf-10ps-u5',
    grade: '10th',
    subject: 'Pakistan Studies',
    subjectUrdu: 'مطالعہ پاکستان',
    unitNumber: 5,
    unitTitleEn: 'Unit 5: History of Pakistan (1971 to Present)',
    unitTitleUr: 'یونٹ 5: تاریخ پاکستان (1971 تا حال)',
    paperCode: '8505',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '415 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['1973 Constitution Salient Features', 'Nationalization Policies of Z.A. Bhutto', 'Nuclear Tests 1998 (Youm-e-Takbeer)'],
    keyTopicsUrdu: ['1973 کے آئین کے اہم خدوخال', 'ذوالفقار علی بھٹو کی اصلاحات', 'یوم تکبیر اور ایٹمی دھماکے'],
    extractedQuestionIds: ['qb_ps1', 'qb_ps2']
  },

  // =========================================================================
  // 11TH & 12TH CLASS - INTERMEDIATE SUBJECTS
  // =========================================================================
  {
    id: 'pdf-11p-u1',
    grade: '11th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Measurements & Dimensional Analysis',
    unitTitleUr: 'یونٹ 1: پیمائشیں اور ڈائمینشنل تجزیہ',
    paperCode: '9101',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '445 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Errors and Uncertainties', 'Precision vs Accuracy', 'Dimensional Homogeneity of Equations'],
    keyTopicsUrdu: ['پیمائشوں میں غلطیاں اور غیر یقینیت', 'درستی بمقابلہ صحت', 'ڈائمینشنل مساواتیں'],
    extractedQuestionIds: ['qb_p1', 'qb_p2']
  },
  {
    id: 'pdf-11ch-u1',
    grade: '11th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری',
    unitNumber: 1,
    unitTitleEn: 'Unit 1: Basic Concepts & Stoichiometry',
    unitTitleUr: 'یونٹ 1: بنیادی تصورات اور اسٹوئکیومیٹری',
    paperCode: '9201',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '450 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Mole Concept and Avogadro Number', 'Limiting Reagent Calculations', 'Theoretical and Actual Yield'],
    keyTopicsUrdu: ['مول اور ایووگیڈرو نمبر', 'لمٹنگ ری ایجنٹ کا حساب', 'نظریاتی اور حقیقی پیداوار'],
    extractedQuestionIds: ['qb_ch1', 'qb_ch2']
  },
  {
    id: 'pdf-12p-u12',
    grade: '12th',
    subject: 'Physics',
    subjectUrdu: 'طبیعیات',
    unitNumber: 12,
    unitTitleEn: 'Unit 12: Electrostatics & Coulomb Law',
    unitTitleUr: 'یونٹ 12: الیکٹرو سٹیٹکس اور کولم کا قانون',
    paperCode: '9512',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '460 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Coulomb Law in Vector Form', 'Electric Field Intensity and Gauss Law Applications', 'Capacitors and Energy Stored in Dielectrics'],
    keyTopicsUrdu: ['کولم کا قانون ویکٹر شکل میں', 'گاؤس کا قانون اور اطلاقات', 'کیپیسیٹرز میں محفوظ توانائی'],
    extractedQuestionIds: ['qb_p1', 'qb_p2']
  },
  {
    id: 'pdf-12ch-u7',
    grade: '12th',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری',
    unitNumber: 7,
    unitTitleEn: 'Unit 7: Fundamental Principles of Organic Chemistry',
    unitTitleUr: 'یونٹ 7: نامیاتی کیمیا کے بنیادی اصول',
    paperCode: '9607',
    pdfPath: '/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf',
    fileSize: '455 KB',
    pageCount: 2,
    totalMarks: 40,
    timeAllowed: '1 Hour 15 Mins',
    mcqCount: 10,
    shortCount: 10,
    longCount: 2,
    keyTopics: ['Wohler Synthesis and Vital Force Theory', 'Isomerism Types (Structural and Geometric)', 'Hybridization of Carbon Orbitals'],
    keyTopicsUrdu: ['ووہلر سنتھیسس', 'آئسومیرزم کی اقسام', 'کاربن کی ہائبرڈائزیشن'],
    extractedQuestionIds: ['qb_ch1', 'qb_ch3']
  }
];

// =========================================================================
// HIERARCHICAL DIVISION HELPERS (CLASS -> SUBJECT -> CHAPTER)
// =========================================================================

export interface ClassCategory {
  id: string; // '9th', '10th', '11th', '12th'
  titleEn: string;
  titleUr: string;
  badge: string;
}

export interface SubjectCategory {
  id: string; // 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', etc.
  nameEn: string;
  nameUr: string;
  iconName: string;
}

export const ARCHIVE_CLASSES: ClassCategory[] = [
  { id: '9th', titleEn: '9th Class', titleUr: 'نہم جماعت (میٹرک پارٹ 1)', badge: 'Matric Part I' },
  { id: '10th', titleEn: '10th Class', titleUr: 'دہم جماعت (میٹرک پارٹ 2)', badge: 'Matric Part II' },
  { id: '11th', titleEn: '11th Class', titleUr: 'گیارہویں جماعت (سال اول)', badge: 'FSc / ICS Part I' },
  { id: '12th', titleEn: '12th Class', titleUr: 'بارہویں جماعت (سال دوم)', badge: 'FSc / ICS Part II' },
];

export const ARCHIVE_SUBJECTS: SubjectCategory[] = [
  { id: 'Mathematics', nameEn: 'Mathematics', nameUr: 'ریاضی', iconName: 'Calculator' },
  { id: 'Physics', nameEn: 'Physics', nameUr: 'طبیعیات', iconName: 'Zap' },
  { id: 'Chemistry', nameEn: 'Chemistry', nameUr: 'کیمسٹری', iconName: 'FlaskConical' },
  { id: 'Biology', nameEn: 'Biology', nameUr: 'حیاتیات', iconName: 'Dna' },
  { id: 'Computer Science', nameEn: 'Computer Science', nameUr: 'کمپیوٹر سائنس', iconName: 'Cpu' },
  { id: 'English', nameEn: 'English', nameUr: 'انگریزی', iconName: 'BookOpen' },
  { id: 'Urdu', nameEn: 'Urdu', nameUr: 'اردو', iconName: 'FileText' },
  { id: 'Islamic Studies', nameEn: 'Islamic Studies', nameUr: 'اسلامیات', iconName: 'Award' },
  { id: 'Pakistan Studies', nameEn: 'Pakistan Studies', nameUr: 'مطالعہ پاکستان', iconName: 'GraduationCap' },
];

/**
 * Filter chapter test archives by class and/or subject
 */
export function getArchivesByClassAndSubject(
  grade?: string,
  subject?: string
): ChapterPdfArchive[] {
  return CHAPTER_PDF_ARCHIVES.filter((archive) => {
    if (grade && grade !== 'all' && archive.grade.toLowerCase() !== grade.toLowerCase()) {
      return false;
    }
    if (subject && subject !== 'all' && archive.subject.toLowerCase() !== subject.toLowerCase()) {
      return false;
    }
    return true;
  });
}

/**
 * Groups a collection of archives into a tree: Class -> Subject -> Chapters
 */
export interface GroupedClassDivision {
  classId: string;
  classTitleEn: string;
  classTitleUr: string;
  badge: string;
  subjects: {
    subjectId: string;
    subjectNameEn: string;
    subjectNameUr: string;
    chapters: ChapterPdfArchive[];
  }[];
}

export function groupArchivesHierarchy(
  archives: ChapterPdfArchive[] = CHAPTER_PDF_ARCHIVES
): GroupedClassDivision[] {
  const classOrder = ['9th', '10th', '11th', '12th'];
  const result: GroupedClassDivision[] = [];

  classOrder.forEach((cId) => {
    const classMeta = ARCHIVE_CLASSES.find((c) => c.id === cId) || {
      id: cId,
      titleEn: `${cId} Class`,
      titleUr: `${cId} جماعت`,
      badge: cId
    };

    const classArchives = archives.filter((a) => a.grade.toLowerCase() === cId.toLowerCase());
    if (classArchives.length === 0) return;

    // Group by Subject
    const subjectMap: Record<string, ChapterPdfArchive[]> = {};
    classArchives.forEach((item) => {
      if (!subjectMap[item.subject]) {
        subjectMap[item.subject] = [];
      }
      subjectMap[item.subject].push(item);
    });

    // Sort chapters by unitNumber
    const subjectList = Object.keys(subjectMap).map((subKey) => {
      const chapters = subjectMap[subKey].sort((a, b) => a.unitNumber - b.unitNumber);
      return {
        subjectId: subKey,
        subjectNameEn: subKey,
        subjectNameUr: chapters[0]?.subjectUrdu || subKey,
        chapters
      };
    });

    result.push({
      classId: cId,
      classTitleEn: classMeta.titleEn,
      classTitleUr: classMeta.titleUr,
      badge: classMeta.badge,
      subjects: subjectList
    });
  });

  return result;
}
