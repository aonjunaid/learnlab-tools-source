import { QuestionBankItem } from './types';
import { ADDITIONAL_NUQTA_QUESTIONS } from './nuqta-questions-data';

export const COMPREHENSIVE_QUESTION_BANK: QuestionBankItem[] = [
  // =========================================================================
  // 9TH CLASS - MATHEMATICS
  // =========================================================================
  {
    id: 'qb_m1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'The value of i⁹ (iota to the power 9) is:',
    textUr: 'i⁹ (ایوٹا کی طاقت 9) کی قیمت ہے:',
    options: [
      { id: 'A', textEn: '1', textUr: '1' },
      { id: 'B', textEn: '-1', textUr: '1-' },
      { id: 'C', textEn: 'i', textUr: 'i' },
      { id: 'D', textEn: '-i', textUr: 'i-' }
    ],
    correctOption: 'C',
    solution: 'i⁹ = (i²)⁴ × i = (-1)⁴ × i = 1 × i = i.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023, Rawalpindi 2022'
  },
  {
    id: 'qb_m2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'Real part of 2ab(i + i²) is:',
    textUr: '2ab(i + i²) کا حقیقی حصہ ہے:',
    options: [
      { id: 'A', textEn: '2ab', textUr: '2ab' },
      { id: 'B', textEn: '-2ab', textUr: '2ab-' },
      { id: 'C', textEn: '2abi', textUr: '2abi' },
      { id: 'D', textEn: '-2abi', textUr: '2abi-' }
    ],
    correctOption: 'B',
    solution: '2ab(i + i²) = 2ab(i - 1) = -2ab + 2abi. Real part is -2ab.',
    isHighYield: true,
    boardTag: 'BISE Faisalabad 2023'
  },
  {
    id: 'qb_m3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Simplify: (-a)⁴ × (-b)³',
    textUr: 'مختصر کریں: (-b)³ × (-a)⁴',
    solution: '(-a)⁴ = a⁴ (even exponent). (-b)³ = -b³ (odd exponent). Product = -a⁴b³.',
    isHighYield: true,
    boardTag: 'BISE Gujranwala 2024'
  },
  {
    id: 'qb_m4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Find conjugate of complex number z = 3 - 4i',
    textUr: 'مخلوط عدد z = 3 - 4i کا کاجوگیٹ معلوم کریں۔',
    solution: 'Conjugate z̄ = 3 + 4i.',
    isHighYield: false
  },
  {
    id: 'qb_m_mat1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Matrices and Determinants',
    type: 'mcq',
    textEn: 'The order of matrix [2  1] is:',
    textUr: 'قالب [2  1] کا مرتبہ ہے:',
    options: [
      { id: 'A', textEn: '2-by-1', textUr: '2-by-1' },
      { id: 'B', textEn: '1-by-2', textUr: '1-by-2' },
      { id: 'C', textEn: '1-by-1', textUr: '1-by-1' },
      { id: 'D', textEn: '2-by-2', textUr: '2-by-2' }
    ],
    correctOption: 'B',
    solution: 'It has 1 row and 2 columns. Order is 1-by-2.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2024, Multan 2023'
  },
  {
    id: 'qb_m_mat2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Matrices and Determinants',
    type: 'short',
    textEn: 'Find the adjoint of matrix A = [1  2; 3  4].',
    textUr: 'قالب A = [1  2; 3  4] کا ایڈجوائنٹ معلوم کریں۔',
    solution: 'Adj(A) = [4  -2; -3  1] by interchanging diagonal entries and changing signs of non-diagonal entries.',
    isHighYield: true,
    boardTag: 'BISE Sahiwal 2023'
  },
  {
    id: 'qb_m_mat3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Matrices and Determinants',
    type: 'long',
    textEn: 'Solve the system of linear equations using Cramer\'s Rule: 2x - 2y = 4 and 3x + 2y = 6.',
    textUr: 'کریمر کے قانون کی مدد سے مساواتوں کا نظام حل کریں: 4 = 2y - 2x اور 6 = 2y + 3x۔',
    solution: 'A = [2 -2; 3 2], |A| = 4 - (-6) = 10. Ax = [4 -2; 6 2], |Ax| = 8 - (-12) = 20 => x = 20/10 = 2. Ay = [2 4; 3 6], |Ay| = 12 - 12 = 0 => y = 0/10 = 0. Solution set = {(2, 0)}.',
    isHighYield: true,
    boardTag: 'ZahidNotes Most Repeated Board Long Question (All Punjab Boards)'
  },
  {
    id: 'qb_m_log1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Logarithms',
    type: 'mcq',
    textEn: 'log_a(1) is always equal to:',
    textUr: 'log_a(1) ہمیشہ برابر ہوتا ہے:',
    options: [
      { id: 'A', textEn: '0', textUr: '0' },
      { id: 'B', textEn: '1', textUr: '1' },
      { id: 'C', textEn: 'a', textUr: 'a' },
      { id: 'D', textEn: '10', textUr: '10' }
    ],
    correctOption: 'A',
    solution: 'Any non-zero base raised to power 0 equals 1 (a⁰ = 1 => log_a 1 = 0).',
    isHighYield: true
  },
  {
    id: 'qb_m_log2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Logarithms',
    type: 'short',
    textEn: 'Write in single logarithm: 2 log x - 3 log y.',
    textUr: 'واحد لوگارتھم کی شکل میں لکھیں: 2log x - 3log y۔',
    solution: '2 log x - 3 log y = log(x²) - log(y³) = log(x² / y³).',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },
  {
    id: 'qb_m_alg1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 4: Algebraic Expressions',
    type: 'short',
    textEn: 'If x + 1/x = 3, find the value of x² + 1/x².',
    textUr: 'اگر 3 = x + 1/x ہو تو x² + 1/x² کی قیمت معلوم کریں۔',
    solution: 'Squaring both sides: (x + 1/x)² = 3² => x² + 2 + 1/x² = 9 => x² + 1/x² = 9 - 2 = 7.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023, Sargodha 2024'
  },
  {
    id: 'qb_m_thm1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Line Bisectors and Angle Bisectors',
    type: 'long',
    textEn: 'Prove that any point on the right bisector of a line segment is equidistant from its end points. (Compulsory Theorem)',
    textUr: 'ثابت کیجیے کہ کسی قطعہ خط کے عمودی ناصف پر واقع کوئی بھی نقطہ اس کے سروں سے مساوی الفاصلہ ہوتا ہے۔ (لازمی مسئلہ)',
    solution: 'Given: Line segment AB, line LM is right bisector of AB intersecting at C. P is a point on LM. In ΔACP and ΔBCP: mAC = mBC (given), ∠PCA ≅ ∠PCB = 90°, mPC ≅ mPC (common). Hence ΔACP ≅ ΔBCP (S.A.S). Therefore mPA ≅ mPB.',
    isHighYield: true,
    boardTag: 'ZahidNotes 100% Compulsory Guess Theorem'
  },

  // =========================================================================
  // 9TH CLASS - PHYSICS
  // =========================================================================
  {
    id: 'qb_p1',
    subject: 'Physics',
    grade: '9th',
    unit: 'Unit 1: Physical Quantities and Measurement',
    type: 'mcq',
    textEn: 'Which one of the following is a base quantity?',
    textUr: 'درج ذیل میں سے کون سی بنیادی مقدار ہے؟',
    options: [
      { id: 'A', textEn: 'Speed', textUr: 'سپیڈ' },
      { id: 'B', textEn: 'Volume', textUr: 'والیم' },
      { id: 'C', textEn: 'Temperature', textUr: 'ٹمپریچر' },
      { id: 'D', textEn: 'Force', textUr: 'فورس' }
    ],
    correctOption: 'C',
    solution: 'Temperature is one of the seven fundamental SI base quantities.',
    isHighYield: true,
    boardTag: 'BISE Multan 2024'
  },
  {
    id: 'qb_p2',
    subject: 'Physics',
    grade: '9th',
    unit: 'Unit 1: Physical Quantities and Measurement',
    type: 'short',
    textEn: 'Differentiate between base quantities and derived quantities with examples.',
    textUr: 'بنیادی اور ماخوذ مقداروں میں مثالوں کی مدد سے فرق واضح کریں۔',
    solution: 'Base quantities are defined independently (e.g. length, mass, time). Derived quantities are expressed in terms of base quantities (e.g. speed, force, work).',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },
  {
    id: 'qb_p3',
    subject: 'Physics',
    grade: '9th',
    unit: 'Unit 2: Kinematics',
    type: 'mcq',
    textEn: 'A ball is thrown vertically upward with 20 m/s. Its velocity at the highest point will be:',
    textUr: 'ایک گیند کو 20 میٹر فی سیکنڈ سے اوپر پھینکا گیا۔ بلند ترین مقام پر اس کی ویلوسٹی ہوگی:',
    options: [
      { id: 'A', textEn: '20 m/s', textUr: '20 m/s' },
      { id: 'B', textEn: '10 m/s', textUr: '10 m/s' },
      { id: 'C', textEn: '0 m/s', textUr: '0 m/s' },
      { id: 'D', textEn: '9.8 m/s', textUr: '9.8 m/s' }
    ],
    correctOption: 'C',
    solution: 'At the apex / maximum height of projectile motion, vertical velocity instantaneously becomes zero.',
    isHighYield: true,
    boardTag: 'BISE Faisalabad 2023'
  },
  {
    id: 'qb_p4',
    subject: 'Physics',
    grade: '9th',
    unit: 'Unit 2: Kinematics',
    type: 'long',
    textEn: 'Derive the second equation of motion S = vᵢt + ½at² using a speed-time graph.',
    textUr: 'سپیڈ ٹائم گراف کی مدد سے حرکت کی دوسری مساوات S = vᵢt + ½at² اخذ کریں۔',
    solution: 'Total distance S = Area under speed-time graph OABD = Area of rectangle OACD + Area of triangle ABC. Area of rectangle = OA × OD = vᵢ × t. Area of triangle = ½ × AC × BC = ½ × t × (at) = ½at². Thus S = vᵢt + ½at².',
    isHighYield: true,
    boardTag: 'ZahidNotes Top Board Guess Question'
  },
  {
    id: 'qb_p5',
    subject: 'Physics',
    grade: '9th',
    unit: 'Unit 3: Dynamics',
    type: 'short',
    textEn: 'State Newton\'s Second Law of Motion and write its mathematical formula.',
    textUr: 'نیوٹن کا حرکت کا دوسرا قانون بیان کریں اور اس کا حسابی فارمولا لکھیں۔',
    solution: 'When a net force acts on a body, it produces acceleration in the direction of the force directly proportional to the force and inversely proportional to the mass: F = ma.',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2024'
  },
  {
    id: 'qb_p6',
    subject: 'Physics',
    grade: '9th',
    unit: 'Unit 5: Gravitation',
    type: 'long',
    textEn: 'State Newton\'s Law of Gravitation and calculate the mass of the Earth.',
    textUr: 'نیوٹن کا قانون گریویٹیشن بیان کریں اور زمین کا ماس معلوم کریں۔',
    solution: 'F = G(m M_e) / R². At Earth surface, F = mg => mg = G(m M_e) / R² => M_e = (g R²) / G. With g = 9.8 m/s², R = 6.4 × 10⁶ m, G = 6.673 × 10⁻¹¹ N m²/kg², M_e ≈ 6.0 × 10²⁴ kg.',
    isHighYield: true,
    boardTag: 'BISE Gujranwala 2023'
  },
  {
    id: 'qb_p7',
    subject: 'Physics',
    grade: '9th',
    unit: 'Unit 6: Work and Energy',
    type: 'short',
    textEn: 'Define Joule and calculate kinetic energy of a 500g body moving with 10 m/s.',
    textUr: 'جول کی تعریف کریں اور 10 میٹر فی سیکنڈ سے حرکت کرتے 500 گرام جسم کی کائنیٹک انرجی معلوم کریں۔',
    solution: 'Joule: Work done when 1 N force displaces a body by 1 m in its direction. KE = ½mv² = ½(0.5 kg)(10)² = 25 Joules.',
    isHighYield: true,
    boardTag: 'BISE Sahiwal 2023'
  },

  // =========================================================================
  // 9TH CLASS - CHEMISTRY
  // =========================================================================
  {
    id: 'qb_ch1',
    subject: 'Chemistry',
    grade: '9th',
    unit: 'Unit 1: Fundamentals of Chemistry',
    type: 'mcq',
    textEn: 'Which one of the following is a tri-atomic molecule?',
    textUr: 'درج ذیل میں سے کون سا سہ ایٹمی (Triatomic) مالیکیول ہے؟',
    options: [
      { id: 'A', textEn: 'H₂', textUr: 'H₂' },
      { id: 'B', textEn: 'O₃ (Ozone)', textUr: 'O₃ (اوزون)' },
      { id: 'C', textEn: 'CH₄', textUr: 'CH₄' },
      { id: 'D', textEn: 'He', textUr: 'He' }
    ],
    correctOption: 'B',
    solution: 'Ozone (O₃) contains three oxygen atoms bonded together, making it tri-atomic.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },
  {
    id: 'qb_ch2',
    subject: 'Chemistry',
    grade: '9th',
    unit: 'Unit 1: Fundamentals of Chemistry',
    type: 'short',
    textEn: 'Calculate the molecular mass of Nitric Acid (HNO₃).',
    textUr: 'نائٹرک ایسڈ (HNO₃) کا مالیکیولر ماس معلوم کریں۔',
    solution: 'Atomic masses: H=1, N=14, O=16. Molecular mass = 1 + 14 + (3 × 16) = 15 + 48 = 63 amu.',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },
  {
    id: 'qb_ch3',
    subject: 'Chemistry',
    grade: '9th',
    unit: 'Unit 2: Structure of Atoms',
    type: 'long',
    textEn: 'State the postulates of Bohr\'s Atomic Model and explain their significance.',
    textUr: 'بوہر کے ایٹمی ماڈل کے مفروضات بیان کریں اور ان کی اہمیت واضح کریں۔',
    solution: '1. Electrons revolve around nucleus in fixed circular orbits. 2. Each orbit has quantized energy. 3. Energy radiated/absorbed only during transitions: ΔE = E₂ - E₁ = hν. 4. Angular momentum is quantized: mvr = nh / (2π).',
    isHighYield: true,
    boardTag: 'ZahidNotes High-Yield Board Long Question'
  },
  {
    id: 'qb_ch4',
    subject: 'Chemistry',
    grade: '9th',
    unit: 'Unit 4: Structure of Molecules',
    type: 'short',
    textEn: 'Define coordinate covalent bond with an example.',
    textUr: 'کوآرڈینیٹ کوویلنٹ بانڈ کی تعریف کریں مع ایک مثال۔',
    solution: 'A covalent bond in which the shared electron pair is donated by only one of the bonded atoms (e.g. NH₄⁺ formed when NH₃ donates pair to H⁺).',
    isHighYield: true,
    boardTag: 'BISE Faisalabad 2024'
  },
  {
    id: 'qb_ch5',
    subject: 'Chemistry',
    grade: '9th',
    unit: 'Unit 6: Solutions',
    type: 'short',
    textEn: 'What is molarity? Calculate the molarity of solution containing 40g NaOH in 1 dm³.',
    textUr: 'مولیرٹی کیا ہے؟ 1 کیوبک ڈیسی میٹر میں 40 گرام NaOH کے محلول کی مولیرٹی معلوم کریں۔',
    solution: 'Molarity = (moles of solute) / (litres of solution). Molar mass of NaOH = 23+16+1 = 40 g/mol. Moles = 40/40 = 1 mol. Molarity = 1 mol / 1 dm³ = 1 M.',
    isHighYield: true,
    boardTag: 'BISE Multan 2023'
  },

  // =========================================================================
  // 9TH CLASS - COMPUTER SCIENCE
  // =========================================================================
  {
    id: 'qb_cs1',
    subject: 'Computer Science',
    grade: '9th',
    unit: 'Unit 1: Problem Solving',
    type: 'mcq',
    textEn: 'Which symbol in a flowchart is used for decision making?',
    textUr: 'فلو چارٹ میں فیصلہ سازی کے لیے کون سی علامت استعمال ہوتی ہے؟',
    options: [
      { id: 'A', textEn: 'Rectangle', textUr: 'مستطیل' },
      { id: 'B', textEn: 'Diamond', textUr: 'ڈائمنڈ (ہیرے کی شکل)' },
      { id: 'C', textEn: 'Parallelogram', textUr: 'متوازی الاضلاع' },
      { id: 'D', textEn: 'Oval', textUr: 'بیضوی' }
    ],
    correctOption: 'B',
    solution: 'A diamond symbol indicates a decision point or condition in a flowchart.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },
  {
    id: 'qb_cs2',
    subject: 'Computer Science',
    grade: '9th',
    unit: 'Unit 1: Problem Solving',
    type: 'short',
    textEn: 'Define an algorithm and state two advantages.',
    textUr: 'الگورتھم کی تعریف کریں اور اس کے دو فوائد بیان کریں۔',
    solution: 'An algorithm is a step-by-step finite set of instructions to solve a problem. Advantages: easy to understand, language independent, easy to debug.',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2024'
  },
  {
    id: 'qb_cs3',
    subject: 'Computer Science',
    grade: '9th',
    unit: 'Unit 3: Computer Networks',
    type: 'long',
    textEn: 'Explain Star Topology and Ring Topology with diagrams and compare their advantages.',
    textUr: 'سٹار ٹوپولوجی اور رنگ ٹوپولوجی کی اشکال کی مدد سے وضاحت کریں اور ان کے فوائد کا موازنہ کریں۔',
    solution: 'Star: All nodes connect to central device (Switch/Hub). Advantage: single cable failure does not affect network. Ring: Each node connects to exactly two neighbors. Token ring passing.',
    isHighYield: true,
    boardTag: 'ZahidNotes Top Board Guess'
  },

  // =========================================================================
  // 10TH CLASS - MATHEMATICS
  // =========================================================================
  {
    id: 'qb_m10_1',
    subject: 'Mathematics',
    grade: '10th',
    unit: 'Unit 1: Quadratic Equations',
    type: 'mcq',
    textEn: 'Standard form of quadratic equation is:',
    textUr: 'دو درجی مساوات کی معیاری شکل ہے:',
    options: [
      { id: 'A', textEn: 'ax² + bx + c = 0 (a ≠ 0)', textUr: '0 = ax² + bx + c (a ≠ 0)' },
      { id: 'B', textEn: 'bx + c = 0', textUr: '0 = bx + c' },
      { id: 'C', textEn: 'ax² = 0', textUr: '0 = ax²' },
      { id: 'D', textEn: 'ax³ + bx + c = 0', textUr: '0 = ax³ + bx + c' }
    ],
    correctOption: 'A',
    solution: 'ax² + bx + c = 0 where a, b, c are real numbers and a ≠ 0.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2024'
  },
  {
    id: 'qb_m10_2',
    subject: 'Mathematics',
    grade: '10th',
    unit: 'Unit 1: Quadratic Equations',
    type: 'short',
    textEn: 'Solve by factorization: x² - x - 20 = 0.',
    textUr: 'تجزی کے طریقے سے حل کریں: 0 = 20 - x - x²۔',
    solution: 'x² - 5x + 4x - 20 = 0 => x(x - 5) + 4(x - 5) = 0 => (x - 5)(x + 4) = 0 => x = 5 or x = -4. Solution set = {5, -4}.',
    isHighYield: true,
    boardTag: 'BISE Gujranwala 2023'
  },
  {
    id: 'qb_m10_3',
    subject: 'Mathematics',
    grade: '10th',
    unit: 'Unit 2: Theory of Quadratic Equations',
    type: 'mcq',
    textEn: 'If discriminant b² - 4ac > 0 and is a perfect square, the roots are:',
    textUr: 'اگر فرق کنندہ 0 < b² - 4ac ہو اور مکمل مربع ہو تو روٹس ہوں گے:',
    options: [
      { id: 'A', textEn: 'Rational and unequal', textUr: 'ناطق اور غیر برابر' },
      { id: 'B', textEn: 'Irrational and unequal', textUr: 'غیر ناطق اور غیر برابر' },
      { id: 'C', textEn: 'Imaginary', textUr: 'خیالی (امیجنری)' },
      { id: 'D', textEn: 'Equal', textUr: 'برابر' }
    ],
    correctOption: 'A',
    solution: 'When Disc > 0 and a perfect square, roots are real, rational, and unequal.',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },
  {
    id: 'qb_m10_4',
    subject: 'Mathematics',
    grade: '10th',
    unit: 'Unit 3: Variations',
    type: 'long',
    textEn: 'Using Theorem on Componendo-Dividendo, solve: (x + 3)² - (x - 5)² / [(x + 3)² + (x - 5)²] = 4/5.',
    textUr: 'مسئلہ ترکیب و تفصیل نسبت استعمال کرتے ہوئے مساوات حل کریں: 4/5 = [²(5 - x) + ²(3 + x)] / [²(5 - x) - ²(3 + x)]۔',
    solution: 'Apply (Numerator + Denominator) / (Numerator - Denominator) to isolate x values.',
    isHighYield: true,
    boardTag: 'ZahidNotes 10th Math Board Favorite'
  },
  {
    id: 'qb_m10_5',
    subject: 'Mathematics',
    grade: '10th',
    unit: 'Unit 7: Introduction to Trigonometry',
    type: 'short',
    textEn: 'Convert 45° 30\' into decimal degrees.',
    textUr: '45° 30\' کو اعشاری درجوں میں تبدیل کریں۔',
    solution: '45° + (30/60)° = 45° + 0.5° = 45.5°.',
    isHighYield: true,
    boardTag: 'BISE Multan 2024'
  },
  {
    id: 'qb_m10_6',
    subject: 'Mathematics',
    grade: '10th',
    unit: 'Unit 9: Chords of a Circle',
    type: 'long',
    textEn: 'Prove that a straight line drawn from the centre of a circle to bisect a chord (not a diameter) is perpendicular to the chord. (Compulsory Theorem)',
    textUr: 'ثابت کیجیے کہ دائرے کے مرکز سے کسی وتر (جو قطر نہ ہو) کی تنصیف کرنے والا قطعہ خط وتر پر عمود ہوتا ہے۔ (لازمی مسئلہ)',
    solution: 'Given: Circle with centre O, M is midpoint of chord AB. In ΔOAM and ΔOBM: mOA = mOB (radii), mAM = mBM (M midpoint), mOM = mOM (common). ΔOAM ≅ ΔOBM (S.S.S). ∠OMA ≅ ∠OMB = 180°/2 = 90°. Hence OM ⊥ AB.',
    isHighYield: true,
    boardTag: 'ZahidNotes Compulsory Theorem (10th Math Ch 9)'
  },

  // =========================================================================
  // 10TH CLASS - PHYSICS
  // =========================================================================
  {
    id: 'qb_p10_1',
    subject: 'Physics',
    grade: '10th',
    unit: 'Unit 10: Simple Harmonic Motion and Waves',
    type: 'mcq',
    textEn: 'In simple harmonic motion, the acceleration is always directed towards:',
    textUr: 'سمپل ہارمونک موشن میں ایکسلریشن کی سمت ہمیشہ کس طرف ہوتی ہے؟',
    options: [
      { id: 'A', textEn: 'Extreme position', textUr: 'انتہائی پوزیشن' },
      { id: 'B', textEn: 'Mean position', textUr: 'وسطی پوزیشن' },
      { id: 'C', textEn: 'Upward', textUr: 'اوپر کی طرف' },
      { id: 'D', textEn: 'Random direction', textUr: 'بے ترتیب سمت' }
    ],
    correctOption: 'B',
    solution: 'In SHM, acceleration a ∝ -x and is always directed towards the equilibrium / mean position.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },
  {
    id: 'qb_p10_2',
    subject: 'Physics',
    grade: '10th',
    unit: 'Unit 10: Simple Harmonic Motion and Waves',
    type: 'short',
    textEn: 'What is the time period of a simple pendulum of length 1 m on Earth? (g = 10 m/s²)',
    textUr: 'زمین پر 1 میٹر لمبے سادہ پنڈولم کا ٹائم پیریڈ کیا ہوگا؟ (g = 10 m/s²)',
    solution: 'T = 2π √(l/g) = 2 × 3.1416 × √(1/10) = 6.283 × 0.3162 ≈ 1.99 s (approximately 2 seconds).',
    isHighYield: true,
    boardTag: 'BISE Faisalabad 2024'
  },
  {
    id: 'qb_p10_3',
    subject: 'Physics',
    grade: '10th',
    unit: 'Unit 12: Geometrical Optics',
    type: 'long',
    textEn: 'What is total internal reflection? State its two conditions and explain its application in optical fibers.',
    textUr: 'مکمل اندرونی انعکاس (Total Internal Reflection) کیا ہے؟ اس کی دو شرائط بیان کریں اور آپٹیکل فائبر میں اطلاق سمجھائیں۔',
    solution: 'When light travels from denser to rarer medium with angle of incidence greater than critical angle (i > c), the beam reflects totally back into denser medium. Conditions: 1. Light must travel from denser to rarer medium. 2. Angle of incidence must exceed critical angle.',
    isHighYield: true,
    boardTag: 'ZahidNotes Top 10th Physics Board Question'
  },
  {
    id: 'qb_p10_4',
    subject: 'Physics',
    grade: '10th',
    unit: 'Unit 14: Current Electricity',
    type: 'short',
    textEn: 'State Ohm\'s Law and write its mathematical equation with units.',
    textUr: 'اوہم کا قانون بیان کریں اور اس کی حسابی مساوات مع یونٹس تحریر کریں۔',
    solution: 'The electric current passing through a conductor is directly proportional to the potential difference across its ends, provided physical conditions (temperature) remain constant: V = IR (V in Volts, I in Amperes, R in Ohms Ω).',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },
  {
    id: 'qb_p10_5',
    subject: 'Physics',
    grade: '10th',
    unit: 'Unit 16: Basic Electronics',
    type: 'short',
    textEn: 'Draw the symbol and truth table for a NAND gate.',
    textUr: 'NAND گیٹ کی علامت اور سچائی کا جدول (Truth Table) بنائیں۔',
    solution: 'NAND = AND + NOT: Output X = NOT(A AND B). Output is 0 only when both inputs A and B are 1; otherwise output is 1.',
    isHighYield: true,
    boardTag: 'BISE Sahiwal 2023'
  },

  // =========================================================================
  // 11TH CLASS (1ST YEAR) - PHYSICS
  // =========================================================================
  {
    id: 'qb_p11_1',
    subject: 'Physics',
    grade: '11th',
    unit: 'Unit 1: Measurements',
    type: 'mcq',
    textEn: 'The dimensions of work are:',
    textUr: 'ورک کی ڈائمینشنز ہیں:',
    options: [
      { id: 'A', textEn: '[M L² T⁻²]', textUr: '[M L² T⁻²]' },
      { id: 'B', textEn: '[M L T⁻²]', textUr: '[M L T⁻²]' },
      { id: 'C', textEn: '[M L² T⁻¹]', textUr: '[M L² T⁻¹]' },
      { id: 'D', textEn: '[M L⁻¹ T⁻²]', textUr: '[M L⁻¹ T⁻²]' }
    ],
    correctOption: 'A',
    solution: 'Work = Force × Displacement = (kg m s⁻²) × m = [M L² T⁻²].',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },
  {
    id: 'qb_p11_2',
    subject: 'Physics',
    grade: '11th',
    unit: 'Unit 2: Vectors and Equilibrium',
    type: 'short',
    textEn: 'Can a body rotate about its centre of gravity under the action of its weight?',
    textUr: 'کیا کوئی جسم اپنے وزن کی وجہ سے اپنے سینٹر آف گریویٹی کے گرد گھوم سکتا ہے؟',
    solution: 'No, because the line of action of weight passes directly through the centre of gravity, so the moment arm is zero (r = 0), producing zero torque (τ = r × F = 0).',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2024'
  },
  {
    id: 'qb_p11_3',
    subject: 'Physics',
    grade: '11th',
    unit: 'Unit 3: Motion and Force',
    type: 'long',
    textEn: 'What is projectile motion? Derive expressions for: (a) Maximum height, (b) Time of flight, (c) Range of projectile.',
    textUr: 'پروجیکٹائل موشن کیا ہے؟ درج ذیل کی مساواتیں اخذ کریں: (الف) زیادہ سے زیادہ بلندی، (ب) پرواز کا وقت، (ج) رینج۔',
    solution: 'Two-dimensional motion under constant gravitational acceleration. Height H = (vᵢ² sin²θ)/(2g). Time of flight T = (2vᵢ sinθ)/g. Range R = (vᵢ² sin2θ)/g.',
    isHighYield: true,
    boardTag: 'ZahidNotes 11th Physics Board Favorite'
  },

  // =========================================================================
  // 12TH CLASS (2ND YEAR) - PHYSICS
  // =========================================================================
  {
    id: 'qb_p12_1',
    subject: 'Physics',
    grade: '12th',
    unit: 'Unit 12: Electrostatics',
    type: 'mcq',
    textEn: 'The electric flux through a closed surface enclosing a charge q is:',
    textUr: 'چارج q پر مشتمل بند سطح میں سے برقی فلکس ہوتا ہے:',
    options: [
      { id: 'A', textEn: 'q / ε₀', textUr: 'q / ε₀' },
      { id: 'B', textEn: 'q × ε₀', textUr: 'q × ε₀' },
      { id: 'C', textEn: 'ε₀ / q', textUr: 'ε₀ / q' },
      { id: 'D', textEn: 'Zero', textUr: 'صفر' }
    ],
    correctOption: 'A',
    solution: 'According to Gauss\'s Law, total electric flux Φ = q / ε₀.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },
  {
    id: 'qb_p12_2',
    subject: 'Physics',
    grade: '12th',
    unit: 'Unit 12: Electrostatics',
    type: 'short',
    textEn: 'State Coulomb\'s Law in electrostatics and express it in vector form.',
    textUr: 'کولمب کا قانون برقیات بیان کریں اور اسے ویکٹر فارم میں لکھیں۔',
    solution: 'F = (1 / 4πε₀) × (q₁ q₂ / r²) r̂, where r̂ is the unit vector from q₁ to q₂.',
    isHighYield: true,
    boardTag: 'BISE Multan 2024'
  },
  {
    id: 'qb_p12_3',
    subject: 'Physics',
    grade: '12th',
    unit: 'Unit 19: Dawn of Modern Physics',
    type: 'long',
    textEn: 'Explain the Photoelectric Effect and write Einstein\'s photoelectric equation.',
    textUr: 'فوٹو الیکٹرک ایفیکٹ کی وضاحت کریں اور آئن سٹائن کی فوٹو الیکٹرک مساوات تحریر کریں۔',
    solution: 'Emission of electrons from metal surface when light of suitable frequency strikes it. Einstein equation: hν = Φ + ½mv²_max = hν₀ + KE_max.',
    isHighYield: true,
    boardTag: 'ZahidNotes 12th Physics Top Guess'
  },

  // =========================================================================
  // 9TH CLASS - BIOLOGY
  // =========================================================================
  {
    id: 'qb_bio9_1',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 1: Introduction to Biology',
    type: 'mcq',
    textEn: 'Which Muslim scientist wrote the famous book "Al-Qanoon fi al-Tibb" (Canon of Medicine)?',
    textUr: 'کس مسلمان سائنسدان نے مشہور کتاب "القانون فی الطب" لکھی؟',
    options: [
      { id: 'A', textEn: 'Jabir bin Hayyan', textUr: 'جابر بن حیان' },
      { id: 'B', textEn: 'Abdul Malik Asmai', textUr: 'عبدالمالک اصمعی' },
      { id: 'C', textEn: 'Bu Ali Sina (Avicenna)', textUr: 'بو علی سینا' },
      { id: 'D', textEn: 'Al-Farabi', textUr: 'الفارابی' }
    ],
    correctOption: 'C',
    solution: 'Bu Ali Sina wrote "Al-Qanoon fi al-Tibb" which remained the standard medical text in Europe for centuries.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2024, Rawalpindi 2023'
  },
  {
    id: 'qb_bio9_2',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 1: Introduction to Biology',
    type: 'short',
    textEn: 'Differentiate between Anatomy and Physiology.',
    textUr: 'ایناٹمی (تشریح الاعضاء) اور فزیالوجی (افعال الاعضاء) میں فرق واضح کریں۔',
    solution: 'Anatomy: Study of the internal structure of living organisms. Physiology: Study of the functions of different body parts.',
    isHighYield: true,
    boardTag: 'BISE Gujranwala 2023'
  },
  {
    id: 'qb_bio9_3',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 3: Biodiversity',
    type: 'mcq',
    textEn: 'The Five Kingdom Classification system was introduced by:',
    textUr: 'پانچ کنگڈم کلاسیفکیشن کا نظام کس نے متعارف کروایا؟',
    options: [
      { id: 'A', textEn: 'Carolus Linnaeus', textUr: 'کارلس لینیئس' },
      { id: 'B', textEn: 'Robert Whittaker', textUr: 'رابرٹ وہٹیکر' },
      { id: 'C', textEn: 'Ernst Haeckel', textUr: 'ارنسٹ ہیکل' },
      { id: 'D', textEn: 'Margulis and Schwartz', textUr: 'مارگولس اور شوارٹز' }
    ],
    correctOption: 'B',
    solution: 'Robert Whittaker introduced the five-kingdom classification in 1969 based on cellular organization and mode of nutrition.',
    isHighYield: true,
    boardTag: 'BISE Faisalabad 2024'
  },
  {
    id: 'qb_bio9_4',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 4: Cells and Tissues',
    type: 'short',
    textEn: 'State the Cell Theory and name the scientists who proposed it.',
    textUr: 'سیل تھیوری بیان کریں اور ان سائنسدانوں کے نام بتائیں جنہوں نے اسے پیش کیا۔',
    solution: 'Cell Theory proposed by Schleiden and Schwann: 1. All organisms are made of one or more cells. 2. Cell is fundamental unit of life. 3. New cells arise from pre-existing cells.',
    isHighYield: true,
    boardTag: 'BISE Multan 2023'
  },
  {
    id: 'qb_bio9_5',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 6: Enzymes',
    type: 'mcq',
    textEn: 'The optimum temperature for the maximum activity of human enzymes is:',
    textUr: 'انسانی انزائمز کے کام کرنے کے لیے بہترین (آپٹیمم) درجہ حرارت ہے:',
    options: [
      { id: 'A', textEn: '25°C', textUr: '25°C' },
      { id: 'B', textEn: '37°C', textUr: '37°C' },
      { id: 'C', textEn: '45°C', textUr: '45°C' },
      { id: 'D', textEn: '100°C', textUr: '100°C' }
    ],
    correctOption: 'B',
    solution: 'Human enzymes work best at normal body core temperature of 37°C.',
    isHighYield: true,
    boardTag: 'BISE Sahiwal 2023'
  },
  {
    id: 'qb_bio9_6',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 6: Enzymes',
    type: 'short',
    textEn: 'Differentiate between "Lock and Key Model" and "Induced Fit Model" of enzyme action.',
    textUr: 'انزائم ایکشن کے "لاک اینڈ کی ماڈل" اور "انڈیوسڈ فٹ ماڈل" میں فرق بیان کریں۔',
    solution: 'Lock and Key (Emil Fischer): Active site is rigid like a lock. Induced Fit (Daniel Koshland): Active site modifies its shape slightly to bind substrate precisely.',
    isHighYield: true,
    boardTag: 'ZahidNotes High-Yield Board Short Question'
  },
  {
    id: 'qb_bio9_7',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 7: Bioenergetics',
    type: 'long',
    textEn: 'Describe the Light Reactions of photosynthesis with the help of the Z-Scheme diagram.',
    textUr: 'فوٹوسنتھیسز کے لائٹ ری ایکشنز کی Z-اسکیم خاکے کی مدد سے وضاحت کریں۔',
    solution: 'Light absorption by chlorophyll in Photosystem II, photolysis of water releasing O₂, electron transport chain producing ATP, Photosystem I reducing NADP⁺ to NADPH.',
    isHighYield: true,
    boardTag: 'ZahidNotes Most Repeated Biology Long Question'
  },
  {
    id: 'qb_bio9_8',
    subject: 'Biology',
    grade: '9th',
    unit: 'Unit 9: Transport',
    type: 'short',
    textEn: 'What is transpiration? Why is it called a "necessary evil"?',
    textUr: 'ٹرانسپائریشن کیا ہے؟ اسے ایک "ضروری برائی" کیوں کہا جاتا ہے؟',
    solution: 'Transpiration is the loss of water vapour from aerial parts of plants. Evil because it can cause wilting and dehydration; necessary because it creates transpiration pull to lift water and minerals.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },

  // =========================================================================
  // 9TH CLASS - PAKISTAN STUDIES
  // =========================================================================
  {
    id: 'qb_pak9_1',
    subject: 'Pakistan Studies',
    grade: '9th',
    unit: 'Unit 1: Ideological Basis of Pakistan',
    type: 'mcq',
    textEn: 'In which historic session did Allama Muhammad Iqbal present his presidential address?',
    textUr: 'علامہ محمد اقبال نے اپنا تاریخی صدارتی خطبہ کس اجلاس میں پیش کیا؟',
    options: [
      { id: 'A', textEn: 'Lahore 1940', textUr: 'لاہور 1940' },
      { id: 'B', textEn: 'Allahabad 1930', textUr: 'الہ آباد 1930' },
      { id: 'C', textEn: 'Dhaka 1906', textUr: 'ڈھاکہ 1906' },
      { id: 'D', textEn: 'Delhi 1929', textUr: 'دہلی 1929' }
    ],
    correctOption: 'B',
    solution: 'Allama Iqbal delivered his historic Allahabad Address at the annual Muslim League session in 1930.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2024'
  },
  {
    id: 'qb_pak9_2',
    subject: 'Pakistan Studies',
    grade: '9th',
    unit: 'Unit 1: Ideological Basis of Pakistan',
    type: 'short',
    textEn: 'Define the Ideology of Pakistan in the light of Quaid-e-Azam Muhammad Ali Jinnah\'s pronouncements.',
    textUr: 'قائد اعظم محمد علی جناح کے ارشادات کی روشنی میں نظریہ پاکستان کی وضاحت کریں۔',
    solution: 'Quaid-e-Azam declared: "Pakistan was created the day the first non-Muslim became a Muslim in the Subcontinent." Ideology is based on Islam as a complete code of life.',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },
  {
    id: 'qb_pak9_3',
    subject: 'Pakistan Studies',
    grade: '9th',
    unit: 'Unit 2: Making of Pakistan',
    type: 'long',
    textEn: 'Discuss the background and main points of the Lahore Resolution (Pakistan Resolution) 1940.',
    textUr: 'قرار داد لاہور (قرار داد پاکستان) 1940ء کا پس منظر اور اہم نکات بیان کریں۔',
    solution: 'Moved by A.K. Fazlul Haq on 23rd March 1940 at Minto Park Lahore. Demanded that geographically contiguous units be demarcated into regions where Muslims are in majority to constitute independent states.',
    isHighYield: true,
    boardTag: 'ZahidNotes Top Pak Studies Long Question'
  },

  // =========================================================================
  // 10TH CLASS - CHEMISTRY
  // =========================================================================
  {
    id: 'qb_ch10_1',
    subject: 'Chemistry',
    grade: '10th',
    unit: 'Unit 9: Chemical Equilibrium',
    type: 'mcq',
    textEn: 'When the rates of forward and reverse reactions become equal, the state is called:',
    textUr: 'جب فارورڈ اور ریورس ری ایکشنز کی رفتار برابر ہو جائے تو اس حالت کو کہتے ہیں:',
    options: [
      { id: 'A', textEn: 'Dynamic Equilibrium', textUr: 'ڈائنامک ایکویلیبریم' },
      { id: 'B', textEn: 'Static Equilibrium', textUr: 'سٹیٹک ایکویلیبریم' },
      { id: 'C', textEn: 'Complete reaction', textUr: 'مکمل ری ایکشن' },
      { id: 'D', textEn: 'Unstable state', textUr: 'غیر مستحکم حالت' }
    ],
    correctOption: 'A',
    solution: 'Dynamic equilibrium occurs in reversible reactions when forward rate equals backward rate.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2024'
  },
  {
    id: 'qb_ch10_2',
    subject: 'Chemistry',
    grade: '10th',
    unit: 'Unit 9: Chemical Equilibrium',
    type: 'short',
    textEn: 'State the Law of Mass Action and write the equilibrium expression (Kc) for: N₂ + 3H₂ ⇌ 2NH₃.',
    textUr: 'لا آف ماس ایکشن بیان کریں اور درج ذیل کے لیے ایکویلیبریم ایکسپریشن (Kc) لکھیں: N₂ + 3H₂ ⇌ 2NH₃۔',
    solution: 'The rate at which a substance reacts is directly proportional to its active mass. Kc = [NH₃]² / ([N₂][H₂]³).',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },
  {
    id: 'qb_ch10_3',
    subject: 'Chemistry',
    grade: '10th',
    unit: 'Unit 10: Acids, Bases and Salts',
    type: 'mcq',
    textEn: 'According to Lewis concept, a base is a substance that can:',
    textUr: 'لیوس نظریے کے مطابق بیس وہ شے ہے جو:',
    options: [
      { id: 'A', textEn: 'Donate a proton', textUr: 'پروٹان دے سکتی ہے' },
      { id: 'B', textEn: 'Accept a pair of electrons', textUr: 'الیکٹران کا جوڑا قبول کرے' },
      { id: 'C', textEn: 'Donate a pair of electrons', textUr: 'الیکٹران کا جوڑا دے سکتی ہے' },
      { id: 'D', textEn: 'Release OH⁻ ions in water', textUr: 'پانی میں OH⁻ آئنز خارج کرے' }
    ],
    correctOption: 'C',
    solution: 'Lewis base is an electron pair donor (e.g. NH₃ with lone pair).',
    isHighYield: true,
    boardTag: 'BISE Faisalabad 2024'
  },
  {
    id: 'qb_ch10_4',
    subject: 'Chemistry',
    grade: '10th',
    unit: 'Unit 10: Acids, Bases and Salts',
    type: 'short',
    textEn: 'Calculate the pH and pOH of 0.001 M HCl solution.',
    textUr: '0.001 M HCl کے محلول کی pH اور pOH معلوم کریں۔',
    solution: '[H⁺] = 0.001 M = 10⁻³ M. pH = -log[H⁺] = -log(10⁻³) = 3. pOH = 14 - pH = 14 - 3 = 11.',
    isHighYield: true,
    boardTag: 'BISE Multan 2023'
  },
  {
    id: 'qb_ch10_5',
    subject: 'Chemistry',
    grade: '10th',
    unit: 'Unit 11: Organic Chemistry',
    type: 'long',
    textEn: 'What are functional groups? Explain alcohol, aldehyde, ketone, and carboxylic acid with examples.',
    textUr: 'فنکشنل گروپس کیا ہیں؟ الکحل، الڈیہائیڈ، کیٹون اور کاربوکسائلک ایسڈ کی مثالوں سے وضاحت کریں۔',
    solution: 'An atom or group of atoms imparting characteristic chemical properties. Alcohol: -OH (CH₃OH). Aldehyde: -CHO (HCHO). Ketone: -CO- (CH₃COCH₃). Carboxylic acid: -COOH (CH₃COOH).',
    isHighYield: true,
    boardTag: 'ZahidNotes 10th Chemistry Top Guess'
  },

  // =========================================================================
  // 10TH CLASS - BIOLOGY
  // =========================================================================
  {
    id: 'qb_bio10_1',
    subject: 'Biology',
    grade: '10th',
    unit: 'Unit 10: Gaseous Exchange',
    type: 'mcq',
    textEn: 'The functional unit of human lungs where gaseous exchange occurs is called:',
    textUr: 'انسانی پھیپھڑوں کا وہ فعال حصہ جہاں گیسوں کا تبادلہ ہوتا ہے کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Bronchi', textUr: 'برونکائی' },
      { id: 'B', textEn: 'Bronchioles', textUr: 'برونکیولز' },
      { id: 'C', textEn: 'Alveoli', textUr: 'ایلویولائی' },
      { id: 'D', textEn: 'Trachea', textUr: 'ٹریکیا' }
    ],
    correctOption: 'C',
    solution: 'Alveoli are microscopic air sacs surrounded by blood capillaries where oxygen and carbon dioxide diffuse.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023'
  },
  {
    id: 'qb_bio10_2',
    subject: 'Biology',
    grade: '10th',
    unit: 'Unit 11: Homeostasis',
    type: 'short',
    textEn: 'Draw and label the structural functional unit of a kidney (Nephron).',
    textUr: 'گردے کی ساخت اور افعال کی اکائی (نیفرون) کا لیبل شدہ خاکہ بنائیں۔',
    solution: 'Renal corpuscle (Bowman capsule + Glomerulus) and Renal tubule (Proximal tubule, Loop of Henle, Distal tubule, Collecting duct).',
    isHighYield: true,
    boardTag: 'BISE Gujranwala 2024'
  },
  {
    id: 'qb_bio10_3',
    subject: 'Biology',
    grade: '10th',
    unit: 'Unit 12: Coordination and Control',
    type: 'long',
    textEn: 'Describe the structure and functions of the Human Brain with a labeled diagram (Forebrain, Midbrain, Hindbrain).',
    textUr: 'انسانی دماغ کی ساخت اور افعال کی لیبل شدہ خاکے کی مدد سے وضاحت کریں (فوربرین، مڈبرین، ہائنڈبرین)۔',
    solution: 'Forebrain (Cerebrum, Thalamus, Hypothalamus), Midbrain (relays sensory info), Hindbrain (Cerebellum, Pons, Medulla oblongata).',
    isHighYield: true,
    boardTag: 'ZahidNotes Top 10th Biology Long Question'
  },
  {
    id: 'qb_bio10_4',
    subject: 'Biology',
    grade: '10th',
    unit: 'Unit 15: Inheritance',
    type: 'short',
    textEn: 'State Mendel\'s Law of Segregation.',
    textUr: 'مینڈل کا قانون تفریق (Law of Segregation) بیان کریں۔',
    solution: 'In each organism the alleles for a trait segregate during gamete formation so that each gamete carries only one allele for each gene.',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },

  // =========================================================================
  // 10TH CLASS - COMPUTER SCIENCE
  // =========================================================================
  {
    id: 'qb_cs10_1',
    subject: 'Computer Science',
    grade: '10th',
    unit: 'Unit 1: Programming in C',
    type: 'mcq',
    textEn: 'Which keyword in C programming is used to declare an integer variable?',
    textUr: 'سی (C) پروگرامنگ میں انٹیجر متغیر ڈکلیئر کرنے کے لیے کون سا کی ورڈ استعمال ہوتا ہے؟',
    options: [
      { id: 'A', textEn: 'integer', textUr: 'integer' },
      { id: 'B', textEn: 'int', textUr: 'int' },
      { id: 'C', textEn: 'num', textUr: 'num' },
      { id: 'D', textEn: 'float', textUr: 'float' }
    ],
    correctOption: 'B',
    solution: '"int" is the reserved C keyword for 16-bit or 32-bit signed integers.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2024'
  },
  {
    id: 'qb_cs10_2',
    subject: 'Computer Science',
    grade: '10th',
    unit: 'Unit 2: Input and Output',
    type: 'short',
    textEn: 'Differentiate between printf() and scanf() functions in C with examples.',
    textUr: 'سی زبان میں printf() اور scanf() فنکشنز میں فرق مثالوں سے واضح کریں۔',
    solution: 'printf() prints formatted text and variable values to standard output (console). scanf() takes formatted user input from keyboard.',
    isHighYield: true,
    boardTag: 'BISE Faisalabad 2023'
  },
  {
    id: 'qb_cs10_3',
    subject: 'Computer Science',
    grade: '10th',
    unit: 'Unit 4: Data Structures & Loops',
    type: 'long',
    textEn: 'Write a C program to find the factorial of an integer entered by the user using a for loop.',
    textUr: 'فار لوپ استعمال کرتے ہوئے صارف کے درج کردہ عدد کا فیکٹوریل معلوم کرنے کا C پروگرام لکھیں۔',
    solution: '#include <stdio.h>\nint main() {\n  int n, i; unsigned long long fact = 1;\n  printf("Enter integer: "); scanf("%d", &n);\n  for(i = 1; i <= n; ++i) fact *= i;\n  printf("Factorial: %llu\\n", fact);\n  return 0;\n}',
    isHighYield: true,
    boardTag: 'ZahidNotes 10th Computer Top Program'
  },

  // =========================================================================
  // 11TH CLASS (1ST YEAR) - MATHEMATICS
  // =========================================================================
  {
    id: 'qb_m11_1',
    subject: 'Mathematics',
    grade: '11th',
    unit: 'Unit 3: Matrices and Determinants',
    type: 'mcq',
    textEn: 'If A is a square matrix of order 3 and |A| = 4, then |2A| is equal to:',
    textUr: 'اگر A تین درجے کا مربعی قالب ہو اور 4 = |A| ہو، تو |2A| برابر ہوگا:',
    options: [
      { id: 'A', textEn: '8', textUr: '8' },
      { id: 'B', textEn: '16', textUr: '16' },
      { id: 'C', textEn: '32', textUr: '32' },
      { id: 'D', textEn: '64', textUr: '64' }
    ],
    correctOption: 'C',
    solution: 'For an n×n matrix, |k A| = kⁿ |A|. Here n = 3, k = 2, |A| = 4. |2A| = 2³ × 4 = 8 × 4 = 32.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2023, Rawalpindi 2024'
  },
  {
    id: 'qb_m11_2',
    subject: 'Mathematics',
    grade: '11th',
    unit: 'Unit 9: Fundamentals of Trigonometry',
    type: 'short',
    textEn: 'Prove that: 1 + tan²θ = sec²θ.',
    textUr: 'ثابت کیجیے: sec²θ = 1 + tan²θ۔',
    solution: 'LHS = 1 + (sin²θ / cos²θ) = (cos²θ + sin²θ) / cos²θ = 1 / cos²θ = sec²θ = RHS.',
    isHighYield: true,
    boardTag: 'BISE Multan 2023'
  },
  {
    id: 'qb_m11_3',
    subject: 'Mathematics',
    grade: '11th',
    unit: 'Unit 10: Trigonometric Identities',
    type: 'long',
    textEn: 'Prove the fundamental law of trigonometry: cos(α - β) = cos α cos β + sin α sin β.',
    textUr: 'مثلثیات کا بنیادی قانون ثابت کریں: cos(α - β) = cos α cos β + sin α sin β۔',
    solution: 'Using unit circle with angles α and β, compute chord distance between points P(cos α, sin α) and Q(cos β, sin β) and rotate coordinate axes by angle β.',
    isHighYield: true,
    boardTag: 'ZahidNotes 11th Math Compulsory Long Question'
  },

  // =========================================================================
  // 12TH CLASS (2ND YEAR) - MATHEMATICS
  // =========================================================================
  {
    id: 'qb_m12_1',
    subject: 'Mathematics',
    grade: '12th',
    unit: 'Unit 1: Functions and Limits',
    type: 'mcq',
    textEn: 'lim (x → 0) [(sin x) / x] where x is measured in radians equals:',
    textUr: 'lim (x → 0) [(sin x) / x] کی قیمت کیا ہوگی جہاں x ریڈین میں ہے؟',
    options: [
      { id: 'A', textEn: '0', textUr: '0' },
      { id: 'B', textEn: '1', textUr: '1' },
      { id: 'C', textEn: 'Undefined', textUr: 'غیر واضح' },
      { id: 'D', textEn: '∞', textUr: '∞' }
    ],
    correctOption: 'B',
    solution: 'By the Squeeze Theorem / Sandwich Theorem, lim (x → 0) (sin x / x) = 1.',
    isHighYield: true,
    boardTag: 'BISE Lahore 2024'
  },
  {
    id: 'qb_m12_2',
    subject: 'Mathematics',
    grade: '12th',
    unit: 'Unit 2: Differentiation',
    type: 'short',
    textEn: 'Find dy/dx if y = x² sin x.',
    textUr: 'dy/dx معلوم کریں اگر y = x² sin x ہو۔',
    solution: 'Using Product Rule: dy/dx = (d/dx(x²)) sin x + x² (d/dx(sin x)) = 2x sin x + x² cos x.',
    isHighYield: true,
    boardTag: 'BISE Rawalpindi 2023'
  },
  {
    id: 'qb_m12_3',
    subject: 'Mathematics',
    grade: '12th',
    unit: 'Unit 3: Integration',
    type: 'long',
    textEn: 'Evaluate the indefinite integral: ∫ e^x (sin x + cos x) dx.',
    textUr: 'غیر معین انٹیگرل حل کریں: ∫ e^x (sin x + cos x) dx۔',
    solution: 'Using formula ∫ e^x [f(x) + f\'(x)] dx = e^x f(x) + c. Here f(x) = sin x, f\'(x) = cos x. Integral = e^x sin x + c.',
    isHighYield: true,
    boardTag: 'ZahidNotes 12th Math Favorite'
  },

  // =========================================================================
  // 9TH CLASS - MATHEMATICS (EXTRACTED FROM NUQTA-E-FIKR / ZAHIDNOTES TEST PAPERS)
  // =========================================================================

  // --- UNIT 12: Basic Statistics & Data Representation ---
  {
    id: 'qb_9m12_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'mcq',
    textEn: 'Which of the following is an example of discrete data?',
    textUr: 'درج ذیل میں سے کون سی غیر مسلسل مواد کی مثال ہے؟',
    options: [
      { id: 'A', textEn: 'Height of students', textUr: 'طلبہ کی اونچائی' },
      { id: 'B', textEn: 'Weight of students', textUr: 'طلبہ کا وزن' },
      { id: 'C', textEn: 'Number of books sold', textUr: 'فروخت کی گئی کتابیں' },
      { id: 'D', textEn: 'Temperature of a city', textUr: 'ایک شہر کا درجہ حرارت' }
    ],
    correctOption: 'C',
    solution: 'Countable discrete quantities like number of books take only separate integer values.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12 / BISE Multan'
  },
  {
    id: 'qb_9m12_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'mcq',
    textEn: 'What is the term for the midpoint of a class interval?',
    textUr: 'جماعتی حدود کے درمیانی نقطے کے لیے کون سی اصطلاح استعمال ہوگی؟',
    options: [
      { id: 'A', textEn: 'Class boundary', textUr: 'حقیقی جماعتی حدود' },
      { id: 'B', textEn: 'Class mark', textUr: 'جماعتی نشان' },
      { id: 'C', textEn: 'Class limit', textUr: 'جماعتی حدود' },
      { id: 'D', textEn: 'Class frequency', textUr: 'جماعتی تعدد' }
    ],
    correctOption: 'B',
    solution: 'Class mark = (Lower class limit + Upper class limit) / 2.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },
  {
    id: 'qb_9m12_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'mcq',
    textEn: 'What is the weighted mean if the weights are 4, 3, 5, 6 and values are 74, 78, 74, 90?',
    textUr: 'اگر اوزان 4, 3, 5, 6 اور قدریں 74, 78, 74, 90 ہوں تو اوزانی اوسط کیا ہوگا؟',
    options: [
      { id: 'A', textEn: '80', textUr: '80' },
      { id: 'B', textEn: '85', textUr: '85' },
      { id: 'C', textEn: '90', textUr: '90' },
      { id: 'D', textEn: '95', textUr: '95' }
    ],
    correctOption: 'A',
    solution: 'Weighted mean = Σ(w·x)/Σw = (4×74 + 3×78 + 5×74 + 6×90) / 18 = 1440 / 18 = 80.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },
  {
    id: 'qb_9m12_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'mcq',
    textEn: 'Find the mode of the given data: 2, 5, 8, 9, 0, 1, 3, 7 and 10:',
    textUr: 'دیے گئے مواد کا اعادہ معلوم کریں: 2, 5, 8, 9, 0, 1, 3, 7 اور 10:',
    options: [
      { id: 'A', textEn: '5', textUr: '5' },
      { id: 'B', textEn: '7', textUr: '7' },
      { id: 'C', textEn: '0', textUr: '0' },
      { id: 'D', textEn: 'No mode', textUr: 'کوئی اعادہ نہیں' }
    ],
    correctOption: 'D',
    solution: 'Since each number appears exactly once, there is no most frequent number (No mode).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },
  {
    id: 'qb_9m12_5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'short',
    textEn: 'The arithmetic mean of 45 numbers is 80. Find their sum.',
    textUr: '45 مدات کا حسابی اوسط 80 ہے۔ ان کا مجموعہ معلوم کریں۔',
    solution: 'Mean = Sum / N => Sum = Mean × N = 80 × 45 = 3600.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },
  {
    id: 'qb_9m12_6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'short',
    textEn: 'Find the arithmetic mean of: 6.5, 11, 12.3, 9, 8.1, 16, 18, 20.5, 25.',
    textUr: 'درج ذیل کا حسابی اوسط معلوم کریں: 6.5, 11, 12.3, 9, 8.1, 16, 18, 20.5, 25۔',
    solution: 'Sum = 6.5 + 11 + 12.3 + 9 + 8.1 + 16 + 18 + 20.5 + 25 = 126.4. N = 9. Mean = 126.4 / 9 ≈ 14.04.',
    isHighYield: false,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },
  {
    id: 'qb_9m12_7',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'long',
    textEn: 'Two partners Mr. Aslam and Mrs. Kalsoom run a company. Weekly wages: 600-700 (3), 700-800 (5), 800-900 (7), 900-1000 (21), 1000-1100 (11). Find mean, median and mode.',
    textUr: 'دو شراکت دار اسلم اور کلثوم ایک کمپنی چلاتے ہیں۔ ہفتہ وار اجرت: 600-700 (3)، 700-800 (5)، 800-900 (7)، 900-1000 (21)، 1000-1100 (11)۔ حسابی اوسط، وسطانیہ اور اعادہ معلوم کریں۔',
    solution: 'Midpoints x: 650, 750, 850, 950, 1050. Total f = 47. Σfx = 43,450 => Mean = 924.47. Modal class is 900-1000 (f=21). Mode = 963.64.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },

  // --- UNIT 11: Practical Geometry - Triangles ---
  {
    id: 'qb_9m11_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 11: Practical Geometry',
    type: 'mcq',
    textEn: 'The point of intersection of the perpendicular bisectors of the sides of a triangle is called:',
    textUr: 'مثلث کے اطراف کے عمودی ناصف کے قطع کا نقطہ کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Incenter', textUr: 'محور مرکز' },
      { id: 'B', textEn: 'Centroid', textUr: 'مرکز نما' },
      { id: 'C', textEn: 'Circumcenter', textUr: 'محاصرہ مرکز' },
      { id: 'D', textEn: 'Orthocenter', textUr: 'عمودی مرکز' }
    ],
    correctOption: 'C',
    solution: 'Circumcenter is equidistant from the 3 vertices and center of circumscribed circle.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 11'
  },
  {
    id: 'qb_9m11_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 11: Practical Geometry',
    type: 'mcq',
    textEn: 'The line segment joining the midpoint of a side to its opposite vertex in a triangle is called:',
    textUr: 'وہ قطعہ خط جو مثلث کے ضلع کے وسطی نقطہ کو مخالف راس سے ملاتا ہے، کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Median', textUr: 'وسطانیہ' },
      { id: 'B', textEn: 'Perpendicular bisector', textUr: 'عمودی ناصف' },
      { id: 'C', textEn: 'Angle bisector', textUr: 'زاویہ کا ناصف' },
      { id: 'D', textEn: 'Altitude', textUr: 'ارتفاع' }
    ],
    correctOption: 'A',
    solution: 'A median connects a vertex to the midpoint of opposite side.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 11'
  },
  {
    id: 'qb_9m11_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 11: Practical Geometry',
    type: 'short',
    textEn: 'Define median and orthocenter of a triangle.',
    textUr: 'مثلث کے وسطانیہ اور عمودی مرکز کی تعریف کریں۔',
    solution: 'Median: Line connecting a vertex to midpoint of opposite side. Orthocenter: Common point of intersection of the three altitudes.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 11'
  },
  {
    id: 'qb_9m11_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 11: Practical Geometry',
    type: 'short',
    textEn: 'Construct a right-angled triangle with measures of sides 6 cm, 8 cm, and 10 cm.',
    textUr: 'ایک قائمۃ الزاویہ مثلث بنائیں جس کے اضلاع کی لمبائیاں 6 سینٹی میٹر، 8 سینٹی میٹر اور 10 سینٹی میٹر ہوں۔',
    solution: 'Draw base BC = 8 cm. Construct 90° angle at B. Cut BA = 6 cm. Join AC (hypotenuse = √(6² + 8²) = 10 cm).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 11'
  },
  {
    id: 'qb_9m11_5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 11: Practical Geometry',
    type: 'long',
    textEn: 'Construct ΔABC with mAB = 5 cm, mBC = 6 cm, mAC = 7 cm and verify that perpendicular bisectors are concurrent.',
    textUr: 'دی گئی پیمائشوں سے ΔABC بنائیں اور تصدیق کریں کہ مثلث کے عمودی ناصف ہم نقطہ ہوتے ہیں: mAB = 5 cm, mBC = 6 cm, mAC = 7 cm۔',
    solution: 'Draw AB = 5 cm, arcs 6 cm from B and 7 cm from A to meet at C. Draw perpendicular bisectors of all three sides; they all intersect at circumcenter O.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 11'
  },

  // --- UNIT 10: Functions & Graphs ---
  {
    id: 'qb_9m10_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'mcq',
    textEn: 'What is the y-intercept of the linear function y = -2x + 8?',
    textUr: 'یک درجی تفاعل y = -2x + 8 کا y-قاطع کیا ہے؟',
    options: [
      { id: 'A', textEn: '-2', textUr: '2-' },
      { id: 'B', textEn: '2', textUr: '2' },
      { id: 'C', textEn: '-8', textUr: '8-' },
      { id: 'D', textEn: '8', textUr: '8' }
    ],
    correctOption: 'D',
    solution: 'In slope-intercept form y = mx + c, the y-intercept is c = 8.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },
  {
    id: 'qb_9m10_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'mcq',
    textEn: 'The graph of y = 2x³ - x² - 5 is what type of curve?',
    textUr: 'y = 2x³ - x² - 5 کا گراف کیسا ہے؟',
    options: [
      { id: 'A', textEn: 'Linear', textUr: 'یک درجی' },
      { id: 'B', textEn: 'Quadratic', textUr: 'دو درجی' },
      { id: 'C', textEn: 'Cubic', textUr: 'سہ درجی' },
      { id: 'D', textEn: 'Exponential', textUr: 'قوت نمائی' }
    ],
    correctOption: 'C',
    solution: 'Highest degree of polynomial is 3, making it a cubic polynomial curve.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },
  {
    id: 'qb_9m10_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'mcq',
    textEn: 'The line x = 5 in coordinate plane represents:',
    textUr: 'محدد مستوی میں x = 5 ظاہر کرتا ہے:',
    options: [
      { id: 'A', textEn: 'x-axis', textUr: 'x-محور' },
      { id: 'B', textEn: 'y-axis', textUr: 'y-محور' },
      { id: 'C', textEn: 'Line parallel to x-axis', textUr: 'x-محور کے متوازی خط' },
      { id: 'D', textEn: 'Line parallel to y-axis', textUr: 'y-محور کے متوازی خط' }
    ],
    correctOption: 'D',
    solution: 'x = constant represents a vertical line parallel to the y-axis at distance 5.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },
  {
    id: 'qb_9m10_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'short',
    textEn: 'Plot and interpret Shahid\'s salary function S(x) = 45000 + 4500x where x is years with company (0 ≤ x ≤ 5).',
    textUr: 'شاہد کی تنخواہ کا تفاعل S(x) = 45000 + 4500x کا خاکہ بنائیں اور تشریح کریں (0 ≤ x ≤ 5)۔',
    solution: 'Starting salary at year 0 is Rs 45,000. Annual increment is Rs 4,500. At x=5 years, salary = 45000 + 22500 = Rs 67,500.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },

  // --- UNIT 8: Logic, Mathematical Reasoning & Sets ---
  {
    id: 'qb_9m8_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 8: Mathematical Reasoning & Logic',
    type: 'mcq',
    textEn: 'A sentence or mathematical expression which may be true or false but not both is called:',
    textUr: 'ایک جملہ یا ریاضیاتی مساوات جو درست یا غلط ہو سکتی ہے لیکن دونوں نہیں، کہلاتی ہے:',
    options: [
      { id: 'A', textEn: 'Argument', textUr: 'آرگومنٹ' },
      { id: 'B', textEn: 'Statement', textUr: 'بیان' },
      { id: 'C', textEn: 'Proof', textUr: 'ثبوت' },
      { id: 'D', textEn: 'Check', textUr: 'پڑتال' }
    ],
    correctOption: 'B',
    solution: 'In mathematical logic, a proposition or statement has a definite truth value (True or False).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 8'
  },
  {
    id: 'qb_9m8_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 8: Mathematical Reasoning & Logic',
    type: 'mcq',
    textEn: 'A statement which is False for all possible truth values is called:',
    textUr: 'ایک بیان جو تمام ممکنہ اقدار کے لیے غلط ہو، کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Tautology', textUr: 'ٹوٹولوجی' },
      { id: 'B', textEn: 'Absurdity (Contradiction)', textUr: 'ابسرڈیٹی (تضاد)' },
      { id: 'C', textEn: 'Contingency', textUr: 'کانٹی جنسی' },
      { id: 'D', textEn: 'None of these', textUr: 'کوئی نہیں' }
    ],
    correctOption: 'B',
    solution: 'An absurdity (or contradiction) evaluates to F under all assignments (e.g. p ∧ ~p).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 8'
  },
  {
    id: 'qb_9m8_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 8: Mathematical Reasoning & Logic',
    type: 'short',
    textEn: 'Write the converse, inverse and contrapositive of conditional ~p → q.',
    textUr: 'درج ذیل مشروط کے الٹ، معکوس اور ضد مثبت لکھیے: ~p → q۔',
    solution: 'Converse: q → ~p. Inverse: p → ~q. Contrapositive: ~q → p.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 8'
  },
  {
    id: 'qb_9m8_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 8: Mathematical Reasoning & Logic',
    type: 'long',
    textEn: 'Prove by justifying each step: (x² + 7x + 10) / (x² - 3x - 10) = (x + 5) / (x - 5).',
    textUr: 'ہر مرحلے کی وضاحت کرتے ہوئے ثابت کریں: (x² + 7x + 10) / (x² - 3x - 10) = (x + 5) / (x - 5)۔',
    solution: 'Numerator = (x + 2)(x + 5). Denominator = (x + 2)(x - 5). Cancel common non-zero factor (x + 2) to get (x + 5)/(x - 5).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 8'
  },

  // --- UNIT 7: Coordinate Geometry & Straight Lines ---
  {
    id: 'qb_9m7_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 7: Coordinate Geometry',
    type: 'mcq',
    textEn: 'The distance between two points P(1, 2) and Q(4, 6) is:',
    textUr: 'نقاط P(1, 2) اور Q(4, 6) کے درمیان فاصلہ ہوتا ہے:',
    options: [
      { id: 'A', textEn: '5', textUr: '5' },
      { id: 'B', textEn: '6', textUr: '6' },
      { id: 'C', textEn: '√13', textUr: '13√' },
      { id: 'D', textEn: '4', textUr: '4' }
    ],
    correctOption: 'A',
    solution: 'd = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 7'
  },
  {
    id: 'qb_9m7_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 7: Coordinate Geometry',
    type: 'mcq',
    textEn: 'The slope of a line perpendicular to x = 3 is:',
    textUr: 'x = 3 کے عمودی لائن کی ڈھلوان ہوگی:',
    options: [
      { id: 'A', textEn: '0', textUr: '0' },
      { id: 'B', textEn: '1', textUr: '1' },
      { id: 'C', textEn: '2', textUr: '2' },
      { id: 'D', textEn: '-1', textUr: '1-' }
    ],
    correctOption: 'A',
    solution: 'x = 3 is vertical (undefined slope); a perpendicular line is horizontal with slope = 0.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 7'
  },
  {
    id: 'qb_9m7_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 7: Coordinate Geometry',
    type: 'short',
    textEn: 'Find an equation of perpendicular bisector of segment joining A(3, 5) and B(9, 8).',
    textUr: 'نقاط A(3, 5) اور B(9, 8) کو ملانے والے قطعہ خط کے عمودی ناصف کی مساوات معلوم کریں۔',
    solution: 'Midpoint M = (6, 6.5). Slope AB = 3/6 = 0.5 => Perpendicular slope m = -2. Equation: y - 6.5 = -2(x - 6) => 4x + 2y - 37 = 0.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 7'
  },
  {
    id: 'qb_9m7_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 7: Coordinate Geometry',
    type: 'short',
    textEn: 'Write down equation of line cutting x-axis at (2, 0) and y-axis at (0, -4).',
    textUr: 'خط کی ایک مساوات لکھیں جو x-محور کو (2, 0) اور y-محور کو (0, -4) پر قطع کرتی ہے۔',
    solution: 'Intercept form: x/2 + y/(-4) = 1 => 2x - y = 4 => y = 2x - 4.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 7'
  },
  {
    id: 'qb_9m7_5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 7: Coordinate Geometry',
    type: 'long',
    textEn: 'A drone flies from (2, 3) to (10, 15) on grid. Calculate the gradient and total distance travelled.',
    textUr: 'ایک ڈرون ایک مقام سے دوسرے مقام تک اڑ رہا ہے جس کے محددات (2, 3) اور (10, 15) ہیں۔ خط کی ڈھلوان اور کل فاصلہ معلوم کریں۔',
    solution: 'Gradient m = (15 - 3)/(10 - 2) = 12/8 = 1.5. Distance = √[(8)² + (12)²] = √[64 + 144] = √208 ≈ 14.42 units.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 7'
  },

  // --- UNIT 6: Trigonometry ---
  {
    id: 'qb_9m6_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'mcq',
    textEn: 'What is the value of cot 30°?',
    textUr: 'cot 30° کی قدر کیا ہوگی؟',
    options: [
      { id: 'A', textEn: '√3', textUr: '3√' },
      { id: 'B', textEn: '1/√3', textUr: '3√/1' },
      { id: 'C', textEn: '1', textUr: '1' },
      { id: 'D', textEn: '0', textUr: '0' }
    ],
    correctOption: 'A',
    solution: 'cot 30° = 1 / tan 30° = 1 / (1/√3) = √3.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },
  {
    id: 'qb_9m6_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'mcq',
    textEn: 'In a right-angled triangle, if one side is 2 cm and hypotenuse is 4 cm, what is the third side?',
    textUr: 'قائمۃ الزاویہ مثلث میں ایک طرف 2 سینٹی میٹر اور وتر 4 سینٹی میٹر ہو تو تیسری طرف کی لمبائی کیا ہوگی؟',
    options: [
      { id: 'A', textEn: '3 cm', textUr: '3 cm' },
      { id: 'B', textEn: '20 cm', textUr: '20 cm' },
      { id: 'C', textEn: '2√3 cm', textUr: '3√2 سینٹی میٹر' },
      { id: 'D', textEn: '4 cm', textUr: '4 cm' }
    ],
    correctOption: 'C',
    solution: 'b = √(4² - 2²) = √(16 - 4) = √12 = 2√3 cm.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },
  {
    id: 'qb_9m6_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'short',
    textEn: 'Convert 15° to radians in terms of π.',
    textUr: '15° کو ریڈین میں تبدیل کریں اور جواب π کی شکل میں لکھیں۔',
    solution: '15° × (π / 180°) = π / 12 radians.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },
  {
    id: 'qb_9m6_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'long',
    textEn: 'Prove the trigonometric identity: tan θ + cot θ = 1 / (sin θ cos θ).',
    textUr: 'درج ذیل تکونیاتی اکائی کو ثابت کریں: tan θ + cot θ = 1 / (sin θ cos θ)۔',
    solution: 'LHS = sin θ / cos θ + cos θ / sin θ = (sin²θ + cos²θ) / (sin θ cos θ) = 1 / (sin θ cos θ) = RHS.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },

  // --- UNIT 4: Algebraic Formulas & Factorization ---
  {
    id: 'qb_9m4_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 4: Factorization and Algebraic Formulas',
    type: 'mcq',
    textEn: 'The factors of 8x³ + 27 are:',
    textUr: '8x³ + 27 کے اجزائے ضربی ہیں:',
    options: [
      { id: 'A', textEn: '(2x + 3)(4x² + 6x + 9)', textUr: '(2x + 3)(4x² + 6x + 9)' },
      { id: 'B', textEn: '(2x + 3)(4x² - 6x + 9)', textUr: '(2x + 3)(4x² - 6x + 9)' },
      { id: 'C', textEn: '(2x - 3)(4x² + 6x + 9)', textUr: '(2x - 3)(4x² + 6x + 9)' },
      { id: 'D', textEn: '(2x - 3)(4x² - 6x + 9)', textUr: '(2x - 3)(4x² - 6x + 9)' }
    ],
    correctOption: 'B',
    solution: 'a³ + b³ = (a + b)(a² - ab + b²). With a=2x, b=3: (2x + 3)(4x² - 6x + 9).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 4'
  },
  {
    id: 'qb_9m4_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 4: Factorization and Algebraic Formulas',
    type: 'mcq',
    textEn: 'H.C.F of 6x²y and 9xy² is:',
    textUr: '6x²y اور 9xy² کا عاد اعظم ہے:',
    options: [
      { id: 'A', textEn: '3x²y', textUr: '3x²y' },
      { id: 'B', textEn: '3xy', textUr: '3xy' },
      { id: 'C', textEn: '6x²y', textUr: '6x²y' },
      { id: 'D', textEn: '54x²y³', textUr: '54x²y³' }
    ],
    correctOption: 'B',
    solution: 'HCF of 6 and 9 is 3. Lowest power of x is x¹, lowest power of y is y¹. HCF = 3xy.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 4'
  },
  {
    id: 'qb_9m4_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 4: Factorization and Algebraic Formulas',
    type: 'short',
    textEn: 'Factorize: 2x² + 11x + 15.',
    textUr: 'تجزی کریں: 2x² + 11x + 15۔',
    solution: 'Product = 30, Sum = 11 => 5 and 6. 2x² + 6x + 5x + 15 = 2x(x + 3) + 5(x + 3) = (x + 3)(2x + 5).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 4'
  },
  {
    id: 'qb_9m4_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 4: Factorization and Algebraic Formulas',
    type: 'long',
    textEn: 'Find the square root of polynomial 121x⁴ - 198x³ - 183x² + 216x + 144 by division method.',
    textUr: 'درج ذیل جملے کا جزر المربع بذریعہ تقسیم معلوم کریں: 121x⁴ - 198x³ - 183x² + 216x + 144۔',
    solution: 'First term √(121x⁴) = 11x². By standard polynomial division algorithm, square root is ±(11x² - 9x - 12).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 4'
  },

  // --- UNIT 2: Real Numbers & Logarithms ---
  {
    id: 'qb_9m2_log1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'The exponential form of log₅(25) = 2 is:',
    textUr: 'log₅(25) = 2 کی قوت نمائی شکل ہے:',
    options: [
      { id: 'A', textEn: '25² = 5', textUr: '5 = 25²' },
      { id: 'B', textEn: '2⁵ = 25', textUr: '25 = 2⁵' },
      { id: 'C', textEn: '5² = 25', textUr: '25 = 5²' },
      { id: 'D', textEn: '25⁵ = 2', textUr: '2 = 25⁵' }
    ],
    correctOption: 'C',
    solution: 'log_b(a) = c is equivalent to b^c = a => 5² = 25.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_log2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Diameter of Mars is 6.7779 × 10³ km. Express this in standard decimal notation.',
    textUr: 'مریخ کا قطر 6.7779 × 10³ کلومیٹر ہے۔ اس عدد کو عام ترقیم میں لکھیے۔',
    solution: '6.7779 × 1000 = 6777.9 km.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_log3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'long',
    textEn: 'Abdullah invested Rs 100,000 at 5% per annum modeled by y = 100,000(1.05)^t. Find after how many years the investment will double.',
    textUr: 'عبداللہ نے ایک اسکیم میں 100,000 روپے کی سرمایہ کاری کی جو مساوات y = 100,000(1.05)^t سے ظاہر ہے۔ معلوم کریں کہ کتنے سالوں بعد سرمایہ کاری دوگنی ہو جائے گی؟',
    solution: '200,000 = 100,000(1.05)^t => (1.05)^t = 2 => t log(1.05) = log(2) => t = 0.3010 / 0.0212 ≈ 14.2 years.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },

  // --- UNIT 3: Sets & Functions ---
  {
    id: 'qb_9m3_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Sets and Functions',
    type: 'mcq',
    textEn: 'n(A) + n(B) - n(A ∩ B) is equal to:',
    textUr: 'n(A) + n(B) - n(A ∩ B) برابر ہے:',
    options: [
      { id: 'A', textEn: 'n(A ∩ B)', textUr: 'n(A ∩ B)' },
      { id: 'B', textEn: 'n(A)', textUr: 'n(A)' },
      { id: 'C', textEn: 'n(A ∪ B)', textUr: 'n(A ∪ B)' },
      { id: 'D', textEn: 'None of these', textUr: 'ان میں سے کوئی نہیں' }
    ],
    correctOption: 'C',
    solution: 'By the principle of inclusion-exclusion for two finite sets: n(A ∪ B) = n(A) + n(B) - n(A ∩ B).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 3'
  },
  {
    id: 'qb_9m3_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Sets and Functions',
    type: 'mcq',
    textEn: 'If a function f: A → B is such that Range(f) ≠ B, then f is called:',
    textUr: 'اگر کوئی تفاعل f: A → B اس طرح ہو کہ Range(f) ≠ B، تو f کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Onto function', textUr: 'آن ٹو تفاعل' },
      { id: 'B', textEn: 'Into function', textUr: 'ان ٹو تفاعل' },
      { id: 'C', textEn: 'One-one function', textUr: 'ون ٹو ون تفاعل' },
      { id: 'D', textEn: 'Bijective function', textUr: 'بائیجیکٹو تفاعل' }
    ],
    correctOption: 'B',
    solution: 'When the range of f is a proper subset of co-domain B (Range ≠ B), f is an into function.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 3'
  },
  {
    id: 'qb_9m3_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Sets and Functions',
    type: 'mcq',
    textEn: 'The total number of diagonals in a polygon with 9 sides is:',
    textUr: 'ایک 9 اضلاع والی کثیر الاضلاع میں کل وتروں کی تعداد ہے:',
    options: [
      { id: 'A', textEn: '18', textUr: '18' },
      { id: 'B', textEn: '21', textUr: '21' },
      { id: 'C', textEn: '25', textUr: '25' },
      { id: 'D', textEn: '27', textUr: '27' }
    ],
    correctOption: 'D',
    solution: 'Formula for number of diagonals in an n-gon is n(n - 3) / 2. For n=9: 9(9 - 3)/2 = (9 × 6)/2 = 27.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 3'
  },
  {
    id: 'qb_9m3_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Sets and Functions',
    type: 'short',
    textEn: 'Find the number of elements in the power set P(S) of the set S = {a, {b, c}}.',
    textUr: 'سیٹ S = {a, {b, c}} کے پاور سیٹ P(S) کے ارکان کی تعداد معلوم کریں۔',
    solution: 'The set S has 2 elements (a and the sub-set {b, c}). Number of elements in power set = 2^n = 2² = 4. The subsets are ∅, {a}, {{b, c}}, {a, {b, c}}.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 3'
  },
  {
    id: 'qb_9m3_5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Sets and Functions',
    type: 'short',
    textEn: 'A rectangular wall is 10 m tall and 12 m wide. How many gallons of paint are needed to cover the wall if one gallon covers 35 m²?',
    textUr: 'ایک مستطیل نما دیوار کی لمبائی 10 میٹر اور چوڑائی 12 میٹر ہے۔ اگر ایک گیلن پینٹ 35 مربع میٹر کو کور کرتا ہو تو پوری دیوار رنگ کرنے کے لیے کتنے گیلن درکار ہوں گے؟',
    solution: 'Area of wall = 10 m × 12 m = 120 m². Paint required = 120 / 35 ≈ 3.43 gallons (i.e. 4 full gallons needed practically).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 3'
  },
  {
    id: 'qb_9m3_6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 3: Sets and Functions',
    type: 'long',
    textEn: 'In a group of 100 students, 60 study Mathematics, 45 study Physics, and 25 study both subjects. Using set notation and Venn diagrams, find the number of students who study: (i) Mathematics only, (ii) Neither subject.',
    textUr: '100 طلبہ کے گروپ میں 60 ریاضی، 45 فزکس اور 25 دونوں مضامین پڑھتے ہیں۔ وین ڈایاگرام اور سیٹ نوٹیشن کی مدد سے معلوم کریں کہ کتنے طلبہ: (i) صرف ریاضی پڑھتے ہیں، (ii) دونوں میں سے کوئی مضمون نہیں پڑھتے۔',
    solution: 'Let M = students studying Math, P = students studying Physics. Total U = 100, n(M) = 60, n(P) = 45, n(M ∩ P) = 25. (i) Mathematics only = n(M) - n(M ∩ P) = 60 - 25 = 35. (ii) Neither subject = n(U) - n(M ∪ P) = 100 - (60 + 45 - 25) = 100 - 80 = 20 students.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 3'
  },

  // --- UNIT 5: Linear Equations, Inequalities & Probability ---
  {
    id: 'qb_9m5_1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'mcq',
    textEn: 'Which of the following is a linear equation in one variable?',
    textUr: 'درج ذیل میں سے ایک متغیر میں یک درجی مساوات کون سی ہے؟',
    options: [
      { id: 'A', textEn: '2x + 3y = 7', textUr: '2x + 3y = 7' },
      { id: 'B', textEn: '5x - 4 = 0', textUr: '5x - 4 = 0' },
      { id: 'C', textEn: 'x² + 3x = 8', textUr: 'x² + 3x = 8' },
      { id: 'D', textEn: 'xy + 2 = 5', textUr: 'xy + 2 = 5' }
    ],
    correctOption: 'B',
    solution: '5x - 4 = 0 contains only one variable x with degree 1. 2x + 3y = 7 has two variables, and x² + 3x = 8 is quadratic.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  {
    id: 'qb_9m5_2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'mcq',
    textEn: 'The graph of the inequality x + y ≥ 5 includes the boundary line:',
    textUr: 'غیر مساوات x + y ≥ 5 کا گراف کون سی باؤنڈری لائن پر مشتمل ہوتا ہے؟',
    options: [
      { id: 'A', textEn: 'x + y = 5', textUr: 'x + y = 5' },
      { id: 'B', textEn: 'x + y < 5', textUr: 'x + y < 5' },
      { id: 'C', textEn: 'x + y > 5', textUr: 'x + y > 5' },
      { id: 'D', textEn: 'None of these', textUr: 'ان میں سے کوئی نہیں' }
    ],
    correctOption: 'A',
    solution: 'Because the inequality has ≥ (greater than or equal to), the associated boundary line x + y = 5 is included as a solid line.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  {
    id: 'qb_9m5_3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'mcq',
    textEn: 'The graph of y = x² - 4 intersects the x-axis at:',
    textUr: 'y = x² - 4 کا گراف x-محور کو کن نقاط پر قطع کرتا ہے؟',
    options: [
      { id: 'A', textEn: '(2, 0) and (-2, 0)', textUr: '(2, 0) اور (-2, 0)' },
      { id: 'B', textEn: '(4, 0) and (-4, 0)', textUr: '(4, 0) اور (-4, 0)' },
      { id: 'C', textEn: '(1, 0) and (-1, 0)', textUr: '(1, 0) اور (-1, 0)' },
      { id: 'D', textEn: '(3, 0) and (-3, 0)', textUr: '(3, 0) اور (-3, 0)' }
    ],
    correctOption: 'A',
    solution: 'On the x-axis, y = 0 => x² - 4 = 0 => x² = 4 => x = ±2. The points are (2, 0) and (-2, 0).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  {
    id: 'qb_9m5_4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'short',
    textEn: 'Solve the inequality and represent the solution on a real number line: 3x + 7 < 16.',
    textUr: 'غیر مساوات 3x + 7 < 16 کو حل کریں اور عددی خط پر اس کا حل ظاہر کریں۔',
    solution: '3x + 7 < 16 => 3x < 16 - 7 => 3x < 9 => x < 3. On the real number line, an open circle is placed at x = 3 and shaded to the left towards -∞.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  {
    id: 'qb_9m5_5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'short',
    textEn: 'The perimeter of a regular octagon is 48 cm. Another octagon has sides that are 1.2 times the side of the first. Find the length of each side of the second octagon.',
    textUr: 'ایک باقاعدہ ہشت پہلو (مثمن) کا احاطہ 48 سینٹی میٹر ہے۔ ایک دوسری مثمن کا ہر ضلع پہلی کے ضلع سے 1.2 گنا لمبا ہے۔ دوسری مثمن کے ہر ضلع کی لمبائی معلوم کریں۔',
    solution: 'A regular octagon has 8 equal sides. Side of first octagon = 48 / 8 = 6 cm. Side of second octagon = 6 × 1.2 = 7.2 cm.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  {
    id: 'qb_9m5_6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'short',
    textEn: 'A card is drawn from a well-shuffled pack of 52 playing cards. What is the probability of getting a King or Jack of red colour?',
    textUr: '52 تاش کے پتوں میں سے ایک پتہ نکالا گیا۔ سرخ رنگ کے بادشاہ یا غلام نکلنے کا کیا احتمال ہو گا؟',
    solution: 'Total cards n(S) = 52. Red cards contain 2 Kings (Hearts, Diamonds) and 2 Jacks (Hearts, Diamonds). Favorable outcomes n(E) = 2 + 2 = 4. Probability P(E) = 4 / 52 = 1 / 13.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  {
    id: 'qb_9m5_7',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'long',
    textEn: 'Indicate the solution region of the following system of linear inequalities by shading on the Cartesian plane: 3x + 7y ≥ 21 and x - y ≤ 2.',
    textUr: 'کارتیسی مستوی پر درج ذیل یک درجی غیر مساوات کے نظام کا مشترکہ حل خطہ شیڈ کر کے واضح کریں: 3x + 7y ≥ 21 اور x - y ≤ 2۔',
    solution: '1) Boundary line 1: 3x + 7y = 21. Intercepts are (7, 0) and (0, 3). Testing (0,0): 0 ≥ 21 is False, so shade region above/away from origin. 2) Boundary line 2: x - y = 2. Intercepts are (2, 0) and (0, -2). Testing (0,0): 0 - 0 ≤ 2 is True, so shade side containing origin. The feasible region is the overlapping intersection of both half-planes.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  {
    id: 'qb_9m5_8',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 5: Linear Equations and Inequalities',
    type: 'long',
    textEn: 'A man who is 1.8 m tall casts a shadow 0.76 m in length. If at the same time a telephone pole casts a 3 m shadow, calculate the height of the pole using similar triangles.',
    textUr: 'ایک آدمی جس کا قد 1.8 میٹر ہے اس کے سائے کی لمبائی 0.76 میٹر ہے۔ اگر اسی وقت ایک ٹیلی فون کے کھمبے کا سایہ 3 میٹر ہو، تو متشابہ مثلثوں کی مدد سے کھمبے کی اونچائی معلوم کریں۔',
    solution: 'Both objects and their shadows form similar right-angled triangles because the sun angle of elevation is identical. Let h be the height of the pole: Height / Shadow = 1.8 / 0.76 = h / 3. Cross multiplying: h = (1.8 × 3) / 0.76 = 5.4 / 0.76 ≈ 7.105 m. The pole is approximately 7.11 meters high.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 5'
  },
  ...ADDITIONAL_NUQTA_QUESTIONS
];

export function filterQuestions(
  bank: QuestionBankItem[],
  options: {
    grade?: string;
    subject?: string;
    unit?: string;
    type?: 'mcq' | 'short' | 'long';
    highYieldOnly?: boolean;
    searchTerm?: string;
  }
): QuestionBankItem[] {
  return bank.filter((item) => {
    if (options.grade && item.grade !== options.grade) return false;
    if (options.subject && item.subject.toLowerCase() !== options.subject.toLowerCase()) return false;
    if (options.unit && item.unit !== options.unit) return false;
    if (options.type && item.type !== options.type) return false;
    if (options.highYieldOnly && !item.isHighYield) return false;
    if (options.searchTerm) {
      const term = options.searchTerm.toLowerCase();
      const matchEn = item.textEn.toLowerCase().includes(term);
      const matchUr = item.textUr.includes(term);
      const matchUnit = item.unit.toLowerCase().includes(term);
      if (!matchEn && !matchUr && !matchUnit) return false;
    }
    return true;
  });
}

/**
 * Filters out duplicate questions within the same chapter/unit.
 * Repetition across different chapters is strictly acceptable.
 */
export function deduplicateQuestionsWithinChapter(questions: QuestionBankItem[]): QuestionBankItem[] {
  const seenInChapter = new Set<string>();
  const deduplicated: QuestionBankItem[] = [];

  for (const q of questions) {
    // Normalizing chapter scope: Grade + Subject + Unit
    const gradeKey = (q.classTag || q.grade || '9th').trim().toLowerCase();
    const subjectKey = (q.subject || 'general').trim().toLowerCase();
    const unitKey = (q.unit || 'general').trim().toLowerCase();
    const chapterScope = `${gradeKey}:::${subjectKey}:::${unitKey}`;

    // Normalize English & Urdu text
    const normEn = (q.textEn || '')
      .toLowerCase()
      .replace(/[^\w\s\d]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const normUr = (q.textUr || '')
      .replace(/[\s\u200c\u200d\u200e\u200f]+/g, ' ')
      .replace(/[۔،؟]/g, '')
      .trim();

    // Unique signatures scoped strictly to this chapter
    const sigEn = normEn ? `${chapterScope}:::EN:::${normEn}` : '';
    const sigUr = normUr ? `${chapterScope}:::UR:::${normUr}` : '';

    if (sigEn && seenInChapter.has(sigEn)) {
      continue; // Filter out repeated question within same chapter
    }
    if (sigUr && seenInChapter.has(sigUr)) {
      continue; // Filter out repeated question within same chapter
    }

    if (sigEn) seenInChapter.add(sigEn);
    if (sigUr) seenInChapter.add(sigUr);
    deduplicated.push(q);
  }

  return deduplicated;
}
