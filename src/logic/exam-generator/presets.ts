import { BilingualExamPaper } from './types';

/**
 * Exact replica of the attached Pakistan Board / Matric 9th Class Math Unit 1 Exam Paper
 * Source: /public/assets/aistudio/Math_9th_Unit1_Exam_85f108b2.pdf
 */
export const EXACT_9TH_MATH_UNIT1_PAPER: BilingualExamPaper = {
  id: 'math-9th-unit1-real-numbers',
  title: '9th Mathematics – Unit 1 (Real & Complex Numbers)',
  header: {
    institutionName: '',
    institutionSubtitle: '',
    studentNamePrompt: 'Student Name',
    rollNumberPrompt: 'Roll Number',
    className: '9TH',
    date: '',
    subjectName: 'Mathematics',
    subjectNameUrdu: 'ریاضی',
    timeAllowed: '1 Hour 15 Mins',
    totalMarks: 40,
    examName: 'Unit 1 Examination',
    syllabus: 'UNIT 1: Real and Complex Numbers',
    showOmrSheet: true,
    showWatermark: false,
    watermarkText: 'CONFIDENTIAL EXAM',
    paperType: 'bilingual'
  },
  instructionsEn: 'Choose the correct answer. (1 × 10 = 10)',
  instructionsUr: 'چار ممکنہ جوابات میں سے درست پر دائرہ لگائیں۔',
  mcqs: [
    {
      id: 'm1',
      num: 1,
      textEn: 'The Sumerians used which numeral system?',
      textUr: 'سمیریوں نے کون سا عددی نظام استعمال کیا؟',
      options: [
        { id: 'A', textEn: 'Base 10', textUr: '10 اساس' },
        { id: 'B', textEn: 'Base 60', textUr: '60 اساس' },
        { id: 'C', textEn: 'Base 2', textUr: '2 اساس' },
        { id: 'D', textEn: 'Base 12', textUr: '12 اساس' }
      ],
      correctOption: 'B',
      explanation: 'The ancient Sumerian and Babylonian civilizations used the sexagesimal (base-60) numeral system.',
      points: 1
    },
    {
      id: 'm2',
      num: 2,
      textEn: 'Which property states a(b+c) = ab+ac?',
      textUr: 'کونسی خاصیت a(b+c) = ab+ac کو بیان کرتی ہے؟',
      options: [
        { id: 'A', textEn: 'Associative', textUr: 'خاصیت تلازم' },
        { id: 'B', textEn: 'Distributive', textUr: 'خاصیت تقسیمی' },
        { id: 'C', textEn: 'Inverse', textUr: 'ضربی معکوس' },
        { id: 'D', textEn: 'Closure', textUr: 'خاصیت بندش' }
      ],
      correctOption: 'B',
      explanation: 'The distributive property of multiplication over addition states that a(b + c) = ab + ac.',
      points: 1
    },
    {
      id: 'm3',
      num: 3,
      textEn: 'Which is a binomial surd?',
      textUr: 'کون سا دو رقمی مقادیر اصم ہے؟',
      options: [
        { id: 'A', textEn: '√3', textUr: '3√' },
        { id: 'B', textEn: '√3 + √5', textUr: '5√ + 3√' },
        { id: 'C', textEn: '2√3', textUr: '3√2' },
        { id: 'D', textEn: '√9', textUr: '9√' }
      ],
      correctOption: 'B',
      explanation: 'A binomial surd is an expression containing the sum or difference of two surds, such as √3 + √5.',
      points: 1
    },
    {
      id: 'm4',
      num: 4,
      textEn: 'Which is not a surd?',
      textUr: 'درج ذیل میں سے کون مقادیر اصم نہیں ہے؟',
      options: [
        { id: 'A', textEn: '√8', textUr: '8√' },
        { id: 'B', textEn: '√12', textUr: '12√' },
        { id: 'C', textEn: '√16', textUr: '16√' },
        { id: 'D', textEn: '√18', textUr: '18√' }
      ],
      correctOption: 'C',
      explanation: '√16 equals 4, which is a rational number. A surd must have an irrational root of a rational number.',
      points: 1
    },
    {
      id: 'm5',
      num: 5,
      textEn: 'Which is equivalent to (√3 + √2) / (√3 − √2) = ?',
      textUr: '(3√ − 2√) / (2√ + 3√) کے برابر کیا ہے؟',
      options: [
        { id: 'A', textEn: '5 + 2√6', textUr: '6√2 + 5' },
        { id: 'B', textEn: '1', textUr: '1' },
        { id: 'C', textEn: '√6', textUr: '6√' },
        { id: 'D', textEn: '5 − 2√6', textUr: '6√2 − 5' }
      ],
      correctOption: 'A',
      explanation: 'Multiply numerator and denominator by conjugate (√3 + √2): (√3 + √2)² / (3 - 2) = (3 + 2 + 2√6) / 1 = 5 + 2√6.',
      points: 1
    },
    {
      id: 'm6',
      num: 6,
      textEn: 'Convert 25°C to Fahrenheit using F = (9/5)C + 32:',
      textUr: 'F = 9/5 C + 32 کا استعمال کرتے ہوئے 25 ڈگری سینٹی گریڈ کو فارن ہیٹ میں تبدیل کریں:',
      options: [
        { id: 'A', textEn: '77°F', textUr: '77°F' },
        { id: 'B', textEn: '68°F', textUr: '68°F' },
        { id: 'C', textEn: '90°F', textUr: '90°F' },
        { id: 'D', textEn: '45°F', textUr: '45°F' }
      ],
      correctOption: 'A',
      explanation: 'F = (9/5 × 25) + 32 = 45 + 32 = 77°F.',
      points: 1
    },
    {
      id: 'm7',
      num: 7,
      textEn: 'Two numbers are in the ratio 3:4. Their sum is 35. The numbers are:',
      textUr: 'دو نمبر 3:4 کے تناسب میں ہیں۔ ان کا مجموعہ 35 ہے۔ نمبر کیا ہوں گے؟',
      options: [
        { id: 'A', textEn: '15, 20', textUr: '20 ,15' },
        { id: 'B', textEn: '12, 16', textUr: '16 ,12' },
        { id: 'C', textEn: '9, 12', textUr: '12 ,9' },
        { id: 'D', textEn: '18, 24', textUr: '24 ,18' }
      ],
      correctOption: 'A',
      explanation: 'Let numbers be 3x and 4x. 3x + 4x = 35 => 7x = 35 => x = 5. Numbers are 3(5)=15 and 4(5)=20.',
      points: 1
    },
    {
      id: 'm8',
      num: 8,
      textEn: '√7 is:',
      textUr: '7√ ہے:',
      options: [
        { id: 'A', textEn: 'Integer', textUr: 'صحیح عدد' },
        { id: 'B', textEn: 'Rational number', textUr: 'ناطق عدد' },
        { id: 'C', textEn: 'Irrational number', textUr: 'غیر ناطق عدد' },
        { id: 'D', textEn: 'Natural number', textUr: 'قدرتی عدد' }
      ],
      correctOption: 'C',
      explanation: '7 is a prime number, so √7 cannot be expressed as a quotient of integers, making it an irrational number.',
      points: 1
    },
    {
      id: 'm9',
      num: 9,
      textEn: '2^x × 8^x = 64 then x =',
      textUr: 'اگر 64 = 2^x × 8^x ہو تو x برابر ہے:',
      options: [
        { id: 'A', textEn: '3/2', textUr: '3/2' },
        { id: 'B', textEn: '3/4', textUr: '3/4' },
        { id: 'C', textEn: '5/6', textUr: '5/6' },
        { id: 'D', textEn: '2/3', textUr: '2/3' }
      ],
      correctOption: 'A',
      explanation: '2^x × (2³)^x = 2^(x + 3x) = 2^(4x). Since 64 = 2^6, 4x = 6 => x = 6/4 = 3/2.',
      points: 1
    },
    {
      id: 'm10',
      num: 10,
      textEn: 'Let a, b ∈ R, then a = b and b = a is called ...... property:',
      textUr: 'فرض کریں a, b ∈ R، تو a = b اور b = a ...... خاصیت کہلاتی ہے:',
      options: [
        { id: 'A', textEn: 'Reflexive', textUr: 'عکسی' },
        { id: 'B', textEn: 'Symmetric', textUr: 'تشاکل' },
        { id: 'C', textEn: 'Transitive', textUr: 'تعدیت' },
        { id: 'D', textEn: 'Additive', textUr: 'جمعی' }
      ],
      correctOption: 'B',
      explanation: 'The symmetric property of equality states that if a = b, then b = a.',
      points: 1
    }
  ],
  shortQuestions: [
    {
      id: 's1',
      numRoman: 'I',
      textEn: 'Represent the following number on number line: √2',
      textUr: 'درج ذیل کو عددی خط پر ظاہر کریں: 2√',
      solution: 'Draw a right triangle with base 1 unit and perpendicular 1 unit. Hypotenuse = √(1² + 1²) = √2. Using a compass centered at 0 with radius √2, intersect the number line at point ~1.414.',
      points: 2
    },
    {
      id: 's2',
      numRoman: 'II',
      textEn: 'Define set of Real number.',
      textUr: 'حقیقی اعداد کا سیٹ بیان کریں۔',
      solution: 'The set of real numbers (R) is the union of the set of rational numbers (Q) and irrational numbers (Q\'): R = Q ∪ Q\'.',
      points: 2
    },
    {
      id: 's3',
      numRoman: 'III',
      textEn: 'Rationalize the denominator of following: (6 − 4√2) / (6 + 4√2)',
      textUr: 'درج ذیل کے مخرج کو ناطق بنائیں: (2√4 + 6) / (2√4 − 6)',
      solution: 'Multiply by conjugate (6 - 4√2): (6 - 4√2)² / (36 - 32) = (36 + 32 - 48√2) / 4 = (68 - 48√2) / 4 = 17 - 12√2.',
      points: 2
    },
    {
      id: 's4',
      numRoman: 'IV',
      textEn: 'Define surd.',
      textUr: 'مقادیر اصم کو بیان کریں۔',
      solution: 'An irrational radical of a rational number ⁿ√a is called a surd of order n, where a is a rational number and ⁿ√a is irrational.',
      points: 2
    },
    {
      id: 's5',
      numRoman: 'V',
      textEn: 'The annual income of Tayyab is Rs 9,60,000, while the exempted amount is Rs. 1,30,000. How much tax would he have to pay at the rate of 0.75%?',
      textUr: 'طیب کی سالانہ آمدنی 960000 روپے ہے، جبکہ مستثنی رقم 130000 روپے ہے، 0.75% کی شرح سے اسے کتنا ٹیکس ادا کرنا پڑے گا؟',
      solution: 'Taxable Income = Rs. 9,60,000 - Rs. 1,30,000 = Rs. 8,30,000. Tax = 8,30,000 × (0.75 / 100) = Rs. 6,225.',
      points: 2
    },
    {
      id: 's6',
      numRoman: 'VI',
      textEn: 'Define profit.',
      textUr: 'نفع کی تعریف کریں۔',
      solution: 'Profit is the positive financial gain achieved when the selling price (SP) of an article is greater than its cost price (CP): Profit = SP - CP.',
      points: 2
    },
    {
      id: 's7',
      numRoman: 'VII',
      textEn: 'Define loss.',
      textUr: 'نقصان کی تعریف کریں۔',
      solution: 'Loss occurs when the selling price (SP) of an article is less than its cost price (CP): Loss = CP - SP.',
      points: 2
    },
    {
      id: 's8',
      numRoman: 'VIII',
      textEn: 'If a = 3/2, b = 5/3 and c = 7/5, then verify that: a(b+c) = ab+ac',
      textUr: 'اگر a = 3/2, b = 5/3 اور c = 7/5 ہوں تو ثابت کیجیے: a(b+c) = ab+ac',
      solution: 'LHS: 3/2 × (5/3 + 7/5) = 3/2 × (25 + 21)/15 = 3/2 × 46/15 = 23/5. RHS: (3/2 × 5/3) + (3/2 × 7/5) = 5/2 + 21/10 = (25 + 21)/10 = 46/10 = 23/5. LHS = RHS.',
      points: 2
    },
    {
      id: 's9',
      numRoman: 'IX',
      textEn: 'If a = 3/2, b = 5/3 and c = 7/5, then verify that: (a+b)c = ac+bc',
      textUr: 'اگر a = 3/2, b = 5/3 اور c = 7/5 ہوں تو ثابت کیجیے: (a+b)c = ac+bc',
      solution: 'LHS: (3/2 + 5/3) × 7/5 = (9 + 10)/6 × 7/5 = 19/6 × 7/5 = 133/30. RHS: (3/2 × 7/5) + (5/3 × 7/5) = 21/10 + 35/15 = 21/10 + 7/3 = (63 + 70)/30 = 133/30. LHS = RHS.',
      points: 2
    },
    {
      id: 's10',
      numRoman: 'X',
      textEn: 'Is 0 a rational number? Explain.',
      textUr: 'کیا 0 ایک ناطق عدد ہے؟ وضاحت کریں۔',
      solution: 'Yes, 0 is a rational number because it can be expressed in the form p/q where p, q are integers and q ≠ 0 (e.g. 0/1, 0/5).',
      points: 2
    }
  ],
  longQuestions: [
    {
      id: 'l1',
      num: 1,
      textEn: 'A rectangle has sides of length 2 + √18 m and (5 − 4/√2) m. Express the area of the rectangle in the form a + b√2, where a and b are integers.',
      textUr: 'ایک مستطیل کے اضلاع کی لمبائیاں 18√ + 2 میٹر اور (2√/4 − 5) میٹر ہیں۔ مستطیل کے رقبے کو a + b√2 کی شکل میں ظاہر کریں، جہاں a اور b صحیح اعداد ہیں۔',
      solution: 'Side 1 = 2 + √18 = 2 + 3√2. Side 2 = 5 - 4/√2 = 5 - (4√2)/2 = 5 - 2√2. Area = (2 + 3√2)(5 - 2√2) = 10 - 4√2 + 15√2 - 6(2) = 10 - 12 + 11√2 = -2 + 11√2. Thus a = -2, b = 11.',
      points: 5
    },
    {
      id: 'l2',
      num: 2,
      textEn: 'Abdullah picked up 96 balls and placed them into two buckets. One bucket has twenty-eight more balls than the other bucket. How many balls were in each bucket?',
      textUr: 'عبداللہ نے 96 گیندیں اٹھائیں اور انہیں دو ٹوکریوں میں رکھا۔ ایک ٹوکری میں دوسری ٹوکری کے مقابلے میں 28 گیندیں زیادہ ہیں۔ ہر ٹوکری میں کتنی گیندیں تھیں؟',
      solution: 'Let bucket A = x balls, then bucket B = x + 28 balls. Total: x + (x + 28) = 96 => 2x + 28 = 96 => 2x = 68 => x = 34. Bucket A = 34 balls, Bucket B = 34 + 28 = 62 balls.',
      points: 5
    }
  ]
};

/**
 * Additional ready-made bilingual model paper presets
 */
export const PRESET_EXAM_PAPERS: BilingualExamPaper[] = [
  EXACT_9TH_MATH_UNIT1_PAPER,
  {
    id: 'math-10th-unit1-quadratic',
    title: '10th Mathematics – Unit 1 (Quadratic Equations)',
    header: {
      institutionName: '',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '10TH',
      date: '',
      subjectName: 'Mathematics',
      subjectNameUrdu: 'ریاضی',
      timeAllowed: '1 Hour',
      totalMarks: 35,
      examName: 'Chapter Test',
      syllabus: 'UNIT 1: Quadratic Equations',
      showOmrSheet: true,
      showWatermark: false,
      watermarkText: '10TH EXAM',
      paperType: 'bilingual'
    },
    instructionsEn: 'Choose the correct answer. (1 × 5 = 5)',
    instructionsUr: 'درست جواب کا انتخاب کریں۔',
    mcqs: [
      {
        id: 'q10_1',
        num: 1,
        textEn: 'Standard form of quadratic equation is:',
        textUr: 'دو درجی مساوات کی معیاری شکل ہے:',
        options: [
          { id: 'A', textEn: 'ax² + bx + c = 0', textUr: '0 = ax² + bx + c' },
          { id: 'B', textEn: 'bx + c = 0', textUr: '0 = bx + c' },
          { id: 'C', textEn: 'ax² = 0', textUr: '0 = ax²' },
          { id: 'D', textEn: 'ax³ + bx + c = 0', textUr: '0 = ax³ + bx + c' }
        ],
        correctOption: 'A',
        points: 1
      },
      {
        id: 'q10_2',
        num: 2,
        textEn: 'The number of methods to solve quadratic equations is:',
        textUr: 'دو درجی مساوات کو حل کرنے کے طریقوں کی تعداد ہے:',
        options: [
          { id: 'A', textEn: '1', textUr: '1' },
          { id: 'B', textEn: '2', textUr: '2' },
          { id: 'C', textEn: '3', textUr: '3' },
          { id: 'D', textEn: '4', textUr: '4' }
        ],
        correctOption: 'C',
        explanation: 'Three methods: Factorization, Completing the Square, and Quadratic Formula.',
        points: 1
      },
      {
        id: 'q10_3',
        num: 3,
        textEn: 'Quadratic formula is x =',
        textUr: 'دو درجی فارمولا ہے x =',
        options: [
          { id: 'A', textEn: '(-b ± √(b² - 4ac)) / (2a)', textUr: '(2a) / ((b² - 4ac)√ ± b-)' },
          { id: 'B', textEn: '(b ± √(b² - 4ac)) / (2a)', textUr: '(2a) / ((b² - 4ac)√ ± b)' },
          { id: 'C', textEn: '(-b ± √(b² + 4ac)) / (2a)', textUr: '(2a) / ((b² + 4ac)√ ± b-)' },
          { id: 'D', textEn: '(-b ± √(b² - 4ac)) / a', textUr: 'a / ((b² - 4ac)√ ± b-)' }
        ],
        correctOption: 'A',
        points: 1
      },
      {
        id: 'q10_4',
        num: 4,
        textEn: 'An equation of the type 2^(2x) - 3(2^x) + 2 = 0 is called:',
        textUr: 'مساوات 0 = 2 + (2^x)3 - (2^(2x کی قسم کہلاتی ہے:',
        options: [
          { id: 'A', textEn: 'Exponential equation', textUr: 'قوت نمائی مساوات' },
          { id: 'B', textEn: 'Reciprocal equation', textUr: 'معکوس مساوات' },
          { id: 'C', textEn: 'Radical equation', textUr: 'جذری مساوات' },
          { id: 'D', textEn: 'Linear equation', textUr: 'یک درجی مساوات' }
        ],
        correctOption: 'A',
        points: 1
      },
      {
        id: 'q10_5',
        num: 5,
        textEn: 'Solution set of 4x² - 16 = 0 is:',
        textUr: 'مساوات 0 = 16 - 4x² کا حل سیٹ ہے:',
        options: [
          { id: 'A', textEn: '{±2}', textUr: '{2±}' },
          { id: 'B', textEn: '{4}', textUr: '{4}' },
          { id: 'C', textEn: '{±4}', textUr: '{4±}' },
          { id: 'D', textEn: '{2}', textUr: '{2}' }
        ],
        correctOption: 'A',
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 's10_1',
        numRoman: 'I',
        textEn: 'Define pure quadratic equation with an example.',
        textUr: 'خالص دو درجی مساوات کی تعریف مع مثال کریں۔',
        solution: 'If b = 0 in ax² + bx + c = 0, it becomes ax² + c = 0, called a pure quadratic equation (e.g., x² - 16 = 0).',
        points: 2
      },
      {
        id: 's10_2',
        numRoman: 'II',
        textEn: 'Solve by factorization: x² - x - 20 = 0',
        textUr: 'بذریعہ تجزی حل کریں: 0 = 20 - x - x²',
        solution: 'x² - 5x + 4x - 20 = 0 => x(x - 5) + 4(x - 5) = 0 => (x - 5)(x + 4) = 0. Solution set = {-4, 5}.',
        points: 2
      },
      {
        id: 's10_3',
        numRoman: 'III',
        textEn: 'Solve by quadratic formula: 2 - x² = 7x',
        textUr: 'دو درجی فارمولا سے حل کریں: 7x = x² - 2',
        solution: 'x² + 7x - 2 = 0. a=1, b=7, c=-2. x = (-7 ± √(49 - 4(1)(-2))) / 2 = (-7 ± √57) / 2.',
        points: 2
      },
      {
        id: 's10_4',
        numRoman: 'IV',
        textEn: 'Define reciprocal equation.',
        textUr: 'معکوس مساوات کی تعریف کریں۔',
        solution: 'An equation which remains unchanged when x is replaced by 1/x is called a reciprocal equation.',
        points: 2
      },
      {
        id: 's10_5',
        numRoman: 'V',
        textEn: 'Define radical equation with an example.',
        textUr: 'جذری مساوات کی تعریف مع مثال کریں۔',
        solution: 'An equation involving an expression under a radical sign is called a radical equation (e.g. √(x + 3) = x - 1).',
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'l10_1',
        num: 1,
        textEn: 'Solve the equation by completing the square: 7x² + 2x - 1 = 0',
        textUr: 'بذریعہ تکمیل مربع مساوات حل کریں: 0 = 1 - 2x + 7x²',
        solution: 'Divide by 7: x² + (2/7)x = 1/7. Add (1/7)²: (x + 1/7)² = 1/7 + 1/49 = 8/49. Take square root: x + 1/7 = ±(2√2)/7 => x = (-1 ± 2√2)/7.',
        points: 5
      },
      {
        id: 'l10_2',
        num: 2,
        textEn: 'Solve the radical equation: √(x + 5) + √(x + 21) = √(x + 60)',
        textUr: 'جذری مساوات حل کریں: (60 + x)√ = (21 + x)√ + (5 + x)√',
        solution: 'Square both sides, simplify, isolate remaining radical and square again to obtain x = 4.',
        points: 5
      }
    ]
  },
  {
    id: 'physics-9th-unit1',
    title: '9th Physics – Unit 1 (Physical Quantities & Measurement)',
    header: {
      institutionName: '',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '9TH',
      date: '',
      subjectName: 'Physics',
      subjectNameUrdu: 'طبیعیات',
      timeAllowed: '45 Mins',
      totalMarks: 25,
      examName: 'Monthly Assessment',
      syllabus: 'UNIT 1: Physical Quantities & Measurement',
      showOmrSheet: true,
      showWatermark: false,
      watermarkText: 'PHYSICS TEST',
      paperType: 'bilingual'
    },
    instructionsEn: 'Choose the correct answer. (1 × 5 = 5)',
    instructionsUr: 'درست جواب کا انتخاب کریں۔',
    mcqs: [
      {
        id: 'phy1',
        num: 1,
        textEn: 'The number of base units in SI is:',
        textUr: 'بین الاقوامی نظام (SI) میں بنیادی یونٹس کی تعداد ہے:',
        options: [
          { id: 'A', textEn: '3', textUr: '3' },
          { id: 'B', textEn: '6', textUr: '6' },
          { id: 'C', textEn: '7', textUr: '7' },
          { id: 'D', textEn: '9', textUr: '9' }
        ],
        correctOption: 'C',
        points: 1
      },
      {
        id: 'phy2',
        num: 2,
        textEn: 'Which one of the following unit is not a derived unit?',
        textUr: 'درج ذیل میں سے کون سا یونٹ ماخوذ یونٹ نہیں ہے؟',
        options: [
          { id: 'A', textEn: 'Pascal', textUr: 'پاسکل' },
          { id: 'B', textEn: 'Kilogram', textUr: 'کلوگرام' },
          { id: 'C', textEn: 'Newton', textUr: 'نیوٹن' },
          { id: 'D', textEn: 'Watt', textUr: 'واٹ' }
        ],
        correctOption: 'B',
        points: 1
      },
      {
        id: 'phy3',
        num: 3,
        textEn: 'Least count of digital vernier callipers is:',
        textUr: 'ڈیجیٹل ورنیئر کیلیپرز کا لیسٹ کاؤنٹ ہے:',
        options: [
          { id: 'A', textEn: '0.1 mm', textUr: '0.1 ملی میٹر' },
          { id: 'B', textEn: '0.01 mm', textUr: '0.01 ملی میٹر' },
          { id: 'C', textEn: '0.001 mm', textUr: '0.001 ملی میٹر' },
          { id: 'D', textEn: '1 mm', textUr: '1 ملی میٹر' }
        ],
        correctOption: 'B',
        points: 1
      },
      {
        id: 'phy4',
        num: 4,
        textEn: 'Amount of a substance in terms of numbers is measured in:',
        textUr: 'مادے کی مقدار کو تعداد کے لحاظ سے ناپا جاتا ہے:',
        options: [
          { id: 'A', textEn: 'Gram', textUr: 'گرام' },
          { id: 'B', textEn: 'Kilogram', textUr: 'کلوگرام' },
          { id: 'C', textEn: 'Newton', textUr: 'نیوٹن' },
          { id: 'D', textEn: 'Mole', textUr: 'مول' }
        ],
        correctOption: 'D',
        points: 1
      },
      {
        id: 'phy5',
        num: 5,
        textEn: 'An interval of 200 μs is equivalent to:',
        textUr: '200 مائیکرو سیکنڈ کا وقفہ برابر ہے:',
        options: [
          { id: 'A', textEn: '0.2 s', textUr: '0.2 سیکنڈ' },
          { id: 'B', textEn: '0.02 s', textUr: '0.02 سیکنڈ' },
          { id: 'C', textEn: '2 × 10⁻⁴ s', textUr: 'سیکنڈ 2 × 10⁻⁴' },
          { id: 'D', textEn: '2 × 10⁻⁶ s', textUr: 'سیکنڈ 2 × 10⁻⁶' }
        ],
        correctOption: 'C',
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 'ps1',
        numRoman: 'I',
        textEn: 'Define physical quantities and name their two types.',
        textUr: 'طبیعی مقداروں کی تعریف کریں اور ان کی دو اقسام کے نام لکھیں۔',
        solution: 'All measurable quantities are called physical quantities. Two types: Base quantities and Derived quantities.',
        points: 2
      },
      {
        id: 'ps2',
        numRoman: 'II',
        textEn: 'What is scientific notation? Give one example.',
        textUr: 'سائنسی ترقیم سے کیا مراد ہے؟ ایک مثال دیں۔',
        solution: 'A number expressed as some power of ten multiplied by a number between 1 and 10 (e.g. 62750 = 6.275 × 10⁴).',
        points: 2
      },
      {
        id: 'ps3',
        numRoman: 'III',
        textEn: 'Define least count of a screw gauge.',
        textUr: 'سکرو گیج کے لیسٹ کاؤنٹ کی تعریف کریں۔',
        solution: 'Least count = Pitch / Total divisions on circular scale = 1 mm / 100 = 0.01 mm or 0.001 cm.',
        points: 2
      },
      {
        id: 'ps4',
        numRoman: 'IV',
        textEn: 'What are significant figures?',
        textUr: 'اہم ہندسے (Significant Figures) کیا ہیں؟',
        solution: 'All accurately known digits and the first doubtful digit in any measurement are called significant figures.',
        points: 2
      },
      {
        id: 'ps5',
        numRoman: 'V',
        textEn: 'Define prefixes with two examples.',
        textUr: 'پریفکسز کی تعریف کریں مع دو مثالیں۔',
        solution: 'Words or letters added before SI units (e.g., kilo = 10³, milli = 10⁻³).',
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'pl1',
        num: 1,
        textEn: 'Describe the construction and working of a Vernier Calliper with zero error determination.',
        textUr: 'ورنیئر کیلیپرز کی ساخت اور کام کرنے کا طریقہ زیرو ایرر کے تعین کے ساتھ بیان کریں۔',
        solution: 'Main scale + vernier scale, least count formula, zero error check when jaws closed (positive vs negative error).',
        points: 5
      }
    ]
  },
  {
    id: 'zahidnotes-9th-math-full-board-mock',
    title: '9th Mathematics – Full Book Grand Board Exam (75 Marks)',
    category: 'full-book',
    header: {
      institutionName: '',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '9TH',
      date: '',
      subjectName: 'Mathematics (Science Group)',
      subjectNameUrdu: 'ریاضی (سائنس گروپ)',
      timeAllowed: '2 Hours 30 Mins',
      totalMarks: 75,
      examName: 'Annual Board Pattern Grand Exam (ZahidNotes)',
      syllabus: 'Complete Syllabus (Chapters 1 to 17)',
      showOmrSheet: true,
      showWatermark: false,
      watermarkText: 'BOARD MOCK',
      paperType: 'bilingual'
    },
    instructionsEn: 'Section A: MCQs (15 marks). Section B: Short Questions (36 marks). Section C: Long Questions (24 marks).',
    instructionsUr: 'حصہ اول: معروضی سوالات (15 نمبر)۔ حصہ دوم: مختصر سوالات (36 نمبر)۔ حصہ سوم: تفصیلی سوالات (24 نمبر)۔',
    mcqs: [
      {
        id: 'zm_m1',
        num: 1,
        textEn: 'The order of transpose of matrix [2  1] is:',
        textUr: 'قالب [2  1] کے ٹرانسپوز کا مرتبہ ہے:',
        options: [
          { id: 'A', textEn: '1-by-2', textUr: '1-by-2' },
          { id: 'B', textEn: '2-by-1', textUr: '2-by-1' },
          { id: 'C', textEn: '1-by-1', textUr: '1-by-1' },
          { id: 'D', textEn: '2-by-2', textUr: '2-by-2' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'zm_m2',
        num: 2,
        textEn: 'The value of i⁷ is equal to:',
        textUr: 'i⁷ کی قیمت برابر ہے:',
        options: [
          { id: 'A', textEn: '1', textUr: '1' },
          { id: 'B', textEn: '-1', textUr: '1-' },
          { id: 'C', textEn: 'i', textUr: 'i' },
          { id: 'D', textEn: '-i', textUr: 'i-' }
        ],
        correctOption: 'D',
        isHighYield: true,
        points: 1
      },
      {
        id: 'zm_m3',
        num: 3,
        textEn: 'Base of natural logarithm is denoted by:',
        textUr: 'قدرتی لوگارتھم کی اساس کو ظاہر کیا جاتا ہے:',
        options: [
          { id: 'A', textEn: '10', textUr: '10' },
          { id: 'B', textEn: 'e', textUr: 'e' },
          { id: 'C', textEn: 'π', textUr: 'π' },
          { id: 'D', textEn: '0', textUr: '0' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'zm_m4',
        num: 4,
        textEn: 'The degree of polynomial 4x⁴ + 2x²y + 5 is:',
        textUr: 'کثیر رقمی 5 + 4x⁴ + 2x²y کا درجہ ہے:',
        options: [
          { id: 'A', textEn: '1', textUr: '1' },
          { id: 'B', textEn: '2', textUr: '2' },
          { id: 'C', textEn: '3', textUr: '3' },
          { id: 'D', textEn: '4', textUr: '4' }
        ],
        correctOption: 'D',
        isHighYield: true,
        points: 1
      },
      {
        id: 'zm_m5',
        num: 5,
        textEn: 'Factors of x² - 5x + 6 are:',
        textUr: 'x² - 5x + 6 کے اجزائے ضربی ہیں:',
        options: [
          { id: 'A', textEn: '(x - 1)(x - 6)', textUr: '(x - 6)(x - 1)' },
          { id: 'B', textEn: '(x - 2)(x - 3)', textUr: '(x - 3)(x - 2)' },
          { id: 'C', textEn: '(x + 2)(x + 3)', textUr: '(x + 3)(x + 2)' },
          { id: 'D', textEn: '(x + 1)(x - 6)', textUr: '(x - 6)(x + 1)' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 'zs1',
        numRoman: 'I',
        textEn: 'Define a singular matrix and give an example.',
        textUr: 'نادر قالب کی تعریف کریں اور ایک مثال دیں۔',
        solution: 'A square matrix A is called singular if its determinant is zero (|A| = 0).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zs2',
        numRoman: 'II',
        textEn: 'Find multiplicative inverse of A = [-1  2; -3  0].',
        textUr: 'قالب A = [-1  2; -3  0] کا ضربی معکوس معلوم کریں۔',
        solution: '|A| = 0 - (-6) = 6 ≠ 0. Adj(A) = [0 -2; 3 -1]. A⁻¹ = Adj(A)/|A| = [0 -1/3; 1/2 -1/6].',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zs3',
        numRoman: 'III',
        textEn: 'Simplify: (27x⁻³y⁻⁶)^(2/3).',
        textUr: 'مختصر کریں: 2/3^(27x⁻³y⁻⁶)۔',
        solution: '(3³)^(2/3) × x^(-3 × 2/3) × y^(-6 × 2/3) = 9 x⁻² y⁻⁴ = 9 / (x² y⁴).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zs4',
        numRoman: 'IV',
        textEn: 'Write in scientific notation: 0.0000000016.',
        textUr: 'سائنسی ترقیم میں لکھیں: 0.0000000016۔',
        solution: '1.6 × 10⁻⁹.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zs5',
        numRoman: 'V',
        textEn: 'If x = 2 + √3, find the value of x - 1/x.',
        textUr: 'اگر 3√ + 2 = x ہو تو x - 1/x کی قیمت معلوم کریں۔',
        solution: '1/x = 2 - √3. Thus x - 1/x = (2 + √3) - (2 - √3) = 2√3.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zs6',
        numRoman: 'VI',
        textEn: 'Factorize: x³ + 64y³.',
        textUr: 'تجزی کریں: x³ + 64y³۔',
        solution: '(x)³ + (4y)³ = (x + 4y)(x² - 4xy + 16y²).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zs7',
        numRoman: 'VII',
        textEn: 'Find HCF of 39x⁷y³z and 91x⁵y⁶z⁷.',
        textUr: 'عاد اعظم معلوم کریں: 39x⁷y³z اور 91x⁵y⁶z⁷۔',
        solution: 'HCF of 39 and 91 is 13. Common variables with lowest powers: 13 x⁵ y³ z.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zs8',
        numRoman: 'VIII',
        textEn: 'Solve for x: |3x - 5| = 7.',
        textUr: 'مساوات کو حل کریں: 7 = |5 - 3x|۔',
        solution: '3x - 5 = 7 => 3x = 12 => x = 4. Or 3x - 5 = -7 => 3x = -2 => x = -2/3. Solution set = {4, -2/3}.',
        isHighYield: true,
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'zl1',
        num: 1,
        textEn: 'Solve using Matrix Inversion Method: 2x + y = 3 and 6x + 5y = 1.',
        textUr: 'قالبوں کے معکوس کی مدد سے مساواتیں حل کریں: 3 = y + 2x اور 1 = 5y + 6x۔',
        solution: 'AX = B => X = A⁻¹B. |A| = 10 - 6 = 4. Adj(A) = [5 -1; -6 2]. X = ¼ [5 -1; -6 2][3; 1] = ¼ [14; -16] = [7/2; -4]. Solution set = {(7/2, -4)}.',
        isHighYield: true,
        points: 8
      },
      {
        id: 'zl2',
        num: 2,
        textEn: 'Prove that any point on the bisector of an angle is equidistant from its arms. (Compulsory Theorem - Ch 12)',
        textUr: 'ثابت کیجیے کہ زاویے کے ناصف پر کوئی نقطہ اس کے بازوؤں سے مساوی الفاصلہ ہوتا ہے۔ (لازمی مسئلہ - باب 12)',
        solution: 'Given: ∠AOB, OM is bisector, P is on OM. PQ ⊥ OA, PR ⊥ OB. ΔOQP ≅ ΔORP by S.A.A postulate. Hence mPQ ≅ mPR.',
        isHighYield: true,
        points: 8
      }
    ]
  },
  {
    id: 'zahidnotes-9th-physics-guess-paper',
    title: '9th Physics – High-Yield Guess Paper (ZahidNotes Selected)',
    category: 'guess-paper',
    header: {
      institutionName: '',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '9TH',
      date: '',
      subjectName: 'Physics',
      subjectNameUrdu: 'طبیعیات (فزکس)',
      timeAllowed: '2 Hours',
      totalMarks: 60,
      examName: 'Annual Board Guess Examination (ZahidNotes)',
      syllabus: 'Units 1 to 9 (Top Repeated Questions)',
      showOmrSheet: true,
      showWatermark: true,
      watermarkText: 'TOP GUESS',
      paperType: 'bilingual'
    },
    instructionsEn: 'All objective and subjective questions are selected from high-probability Punjab Board repeats.',
    instructionsUr: 'تمام سوالات پنجاب بورڈز کے بار بار دہرائے جانے والے اہم ترین سوالات سے منتخب ہیں۔',
    mcqs: [
      {
        id: 'zpm1',
        num: 1,
        textEn: 'One femto is equal to:',
        textUr: 'ایک فیمٹو (Femto) برابر ہوتا ہے:',
        options: [
          { id: 'A', textEn: '10⁻¹⁵', textUr: '10⁻¹⁵' },
          { id: 'B', textEn: '10⁻¹²', textUr: '10⁻¹²' },
          { id: 'C', textEn: '10⁻⁹', textUr: '10⁻⁹' },
          { id: 'D', textEn: '10⁻⁶', textUr: '10⁻⁶' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'zpm2',
        num: 2,
        textEn: 'Inertia of a body depends upon its:',
        textUr: 'کسی جسم کے انرشا کا انحصار ہوتا ہے اس کے:',
        options: [
          { id: 'A', textEn: 'Velocity', textUr: 'ویلوسٹی پر' },
          { id: 'B', textEn: 'Mass', textUr: 'ماس پر' },
          { id: 'C', textEn: 'Force', textUr: 'فورس پر' },
          { id: 'D', textEn: 'Volume', textUr: 'والیم پر' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'zpm3',
        num: 3,
        textEn: 'The value of g at the centre of the Earth is:',
        textUr: 'زمین کے مرکز پر جی (g) کی قیمت ہوتی ہے:',
        options: [
          { id: 'A', textEn: '9.8 m/s²', textUr: '9.8 m/s²' },
          { id: 'B', textEn: 'Zero', textUr: 'صفر' },
          { id: 'C', textEn: 'Infinite', textUr: 'لامحدود' },
          { id: 'D', textEn: '4.9 m/s²', textUr: '4.9 m/s²' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 'zps1',
        numRoman: 'I',
        textEn: 'Define momentum and write its SI unit.',
        textUr: 'مومینٹم کی تعریف کریں اور اس کا SI یونٹ تحریر کریں۔',
        solution: 'Momentum is the quantity of motion in a body (P = mv). Unit: kg m/s or N s.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zps2',
        numRoman: 'II',
        textEn: 'State Archimedes Principle and Hooke\'s Law.',
        textUr: 'ارشمیدس کا اصول اور ہک کا قانون بیان کریں۔',
        solution: 'Archimedes: Upthrust equals weight of displaced liquid. Hooke: Stress is directly proportional to strain within elastic limit (F = -kx).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'zps3',
        numRoman: 'III',
        textEn: 'What is meant by banking of roads?',
        textUr: 'سڑکوں کی بینکنگ سے کیا مراد ہے؟',
        solution: 'Elevating the outer edge of a curved road to provide necessary centripetal force preventing vehicles from skidding outward.',
        isHighYield: true,
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'zpl1',
        num: 1,
        textEn: 'Derive the third equation of motion 2aS = v_f² - v_i² using a speed-time graph.',
        textUr: 'سپیڈ ٹائم گراف کی مدد سے حرکت کی تیسری مساوات 2aS = v_f² - v_i² اخذ کریں۔',
        solution: 'Total area OABD = (v_i + v_f)/2 × t. Substitute t = (v_f - v_i)/a to get 2aS = v_f² - v_i².',
        isHighYield: true,
        points: 5
      }
    ]
  },
  {
    id: 'nuqta-9th-math-unit12-statistics',
    title: '9th Mathematics – Unit 12 (Basic Statistics & Data Representation)',
    category: 'chapter-wise',
    header: {
      institutionName: 'NUQTA-E-FIKR ACADEMY',
      institutionSubtitle: 'MAIN BAQRABAD PULLI, PIRAN GHAIB ROAD, MULTAN',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '9TH',
      date: '29-Jul-2026',
      subjectName: 'Mathematics',
      subjectNameUrdu: 'ریاضی',
      timeAllowed: '1 Hour 15 Mins',
      totalMarks: 40,
      examName: 'Unit 12 Examination',
      syllabus: 'UNIT 12: Basic Statistics',
      showOmrSheet: true,
      showWatermark: false,
      watermarkText: 'UNIT 12',
      paperType: 'bilingual'
    },
    instructionsEn: 'Choose the correct answer. (1 × 10 = 10)',
    instructionsUr: 'چار ممکنہ جوابات میں سے درست پر دائرہ لگائیں۔',
    mcqs: [
      {
        id: 'u12_m1',
        num: 1,
        textEn: 'Which of the following is an example of discrete data?',
        textUr: 'درج ذیل میں سے کون سی غیر مسلسل مواد کی مثال ہے؟',
        options: [
          { id: 'A', textEn: 'Height of students', textUr: 'طلبہ کی اونچائی' },
          { id: 'B', textEn: 'Weight of students', textUr: 'طلبہ کا وزن' },
          { id: 'C', textEn: 'Number of books sold', textUr: 'فروخت کی گئی کتابیں' },
          { id: 'D', textEn: 'Temperature of a city', textUr: 'ایک شہر کا درجہ حرارت' }
        ],
        correctOption: 'C',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m2',
        num: 2,
        textEn: 'What is the term for the midpoint of a class interval?',
        textUr: 'جماعتی حدود کے درمیانی نقطے کے لیے کون سی اصطلاح استعمال ہوگی؟',
        options: [
          { id: 'A', textEn: 'Class boundary', textUr: 'حقیقی جماعتی حدود' },
          { id: 'B', textEn: 'Class mark', textUr: 'جماعتی نشان' },
          { id: 'C', textEn: 'Class limit', textUr: 'جماعتی حدود' },
          { id: 'D', textEn: 'Class frequency', textUr: 'جماعتی تعدد' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m3',
        num: 3,
        textEn: 'What is the formula for the arithmetic mean?',
        textUr: 'حسابی اوسط معلوم کرنے کا فارمولا کیا ہے؟',
        options: [
          { id: 'A', textEn: 'Mean = Sum of observations / Number of observations', textUr: 'حسابی اوسط = مشاہدات کا مجموعہ / مشاہدات کی تعداد' },
          { id: 'B', textEn: 'Mean = Sum of observations × Number of observations', textUr: 'حسابی اوسط = مشاہدات کا مجموعہ × تعداد' },
          { id: 'C', textEn: 'Mean = Sum of observations - Number of observations', textUr: 'حسابی اوسط = مشاہدات کا مجموعہ - تعداد' },
          { id: 'D', textEn: 'Mean = Sum of observations + Number of observations', textUr: 'حسابی اوسط = مشاہدات کا مجموعہ + تعداد' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m4',
        num: 4,
        textEn: 'What is the weighted mean if weights are 4, 3, 5, 6 and values are 74, 78, 74, 90?',
        textUr: 'اگر اوزان 4, 3, 5, 6 اور قدریں 74, 78, 74, 90 ہوں تو اوزانی اوسط کیا ہوگا؟',
        options: [
          { id: 'A', textEn: '80', textUr: '80' },
          { id: 'B', textEn: '85', textUr: '85' },
          { id: 'C', textEn: '90', textUr: '90' },
          { id: 'D', textEn: '95', textUr: '95' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m5',
        num: 5,
        textEn: 'Arithmetic mean is denoted by:',
        textUr: 'حسابی اوسط کو ظاہر کیا جاتا ہے:',
        options: [
          { id: 'A', textEn: 'X̃', textUr: 'X̃' },
          { id: 'B', textEn: 'X̂', textUr: 'X̂' },
          { id: 'C', textEn: 'X̄', textUr: 'X̄' },
          { id: 'D', textEn: 'SD', textUr: 'SD' }
        ],
        correctOption: 'C',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m6',
        num: 6,
        textEn: 'Symbol used for sum is:',
        textUr: 'جمع کے لیے استعمال ہونے والی علامت ہے:',
        options: [
          { id: 'A', textEn: '≡', textUr: '≡' },
          { id: 'B', textEn: 'Σ', textUr: 'Σ' },
          { id: 'C', textEn: '%', textUr: '%' },
          { id: 'D', textEn: '~', textUr: '~' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m7',
        num: 7,
        textEn: 'Which data takes only some specific values?',
        textUr: 'کون سا مواد صرف مخصوص اقدار لیتا ہے؟',
        options: [
          { id: 'A', textEn: 'Continuous data', textUr: 'مسلسل مواد' },
          { id: 'B', textEn: 'Discrete data', textUr: 'غیر مسلسل مواد' },
          { id: 'C', textEn: 'Grouped data', textUr: 'گروہی مواد' },
          { id: 'D', textEn: 'Ungrouped data', textUr: 'غیر گروہی مواد' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m8',
        num: 8,
        textEn: 'Find the mode of the given data: 2, 5, 8, 9, 0, 1, 3, 7 and 10:',
        textUr: 'دیے گئے مواد کا اعادہ معلوم کریں: 2, 5, 8, 9, 0, 1, 3, 7 اور 10:',
        options: [
          { id: 'A', textEn: '5', textUr: '5' },
          { id: 'B', textEn: '7', textUr: '7' },
          { id: 'C', textEn: '0', textUr: '0' },
          { id: 'D', textEn: 'No mode', textUr: 'کوئی اعادہ نہیں' }
        ],
        correctOption: 'D',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m9',
        num: 9,
        textEn: 'Mode of data 80, 80, 82, 82, 82, 85 is:',
        textUr: 'مواد 80, 80, 82, 82, 82, 85 کا اعادہ کیا ہوگا؟',
        options: [
          { id: 'A', textEn: '80', textUr: '80' },
          { id: 'B', textEn: '82', textUr: '82' },
          { id: 'C', textEn: '85', textUr: '85' },
          { id: 'D', textEn: '0', textUr: '0' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u12_m10',
        num: 10,
        textEn: 'Which of the following is an example of ungrouped data?',
        textUr: 'درج ذیل میں سے کون غیر گروہی مواد کی مثال ہے؟',
        options: [
          { id: 'A', textEn: 'Marks of students arranged in classes', textUr: 'کلاسوں میں ترتیب دیئے گئے طلبہ کے نمبر' },
          { id: 'B', textEn: 'Number of toys sold in a month', textUr: 'ایک مہینے میں فروخت کیے گئے کھلونوں کی تعداد' },
          { id: 'C', textEn: 'Height of students grouped in class', textUr: 'ایک کلاس میں طلبہ کی اونچائی' },
          { id: 'D', textEn: 'Temperature recorded daily', textUr: 'روزانہ محفوظ کیا گیا درجہ حرارت' }
        ],
        correctOption: 'D',
        isHighYield: true,
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 'u12_s1',
        numRoman: 'I',
        textEn: 'Scores: 24-28 (3), 29-33 (6), 34-38 (12), 39-43 (23), 44-48 (15), 49-53 (6). What is the upper limit of the last class?',
        textUr: 'کیمسٹری لیبارٹری کے نمبرز: آخری جماعت (49-53) کی بالائی حد کیا ہے؟',
        solution: 'Upper class limit of 49-53 is 53.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u12_s2',
        numRoman: 'II',
        textEn: 'What is discrete data? Give an example.',
        textUr: 'غیر مسلسل مواد کیا ہوتا ہے؟ ایک مثال دیں۔',
        solution: 'Discrete data can only take distinct separate values (e.g. number of children, shoe size).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u12_s3',
        numRoman: 'III',
        textEn: 'The arithmetic mean of 45 numbers is 80. Find their sum.',
        textUr: '45 مدات کا حسابی اوسط 80 ہے۔ ان کا مجموعہ معلوم کریں۔',
        solution: 'Sum = Mean × N = 80 × 45 = 3600.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u12_s4',
        numRoman: 'IV',
        textEn: 'Find arithmetic mean: 6.5, 11, 12.3, 9, 8.1, 16, 18, 20.5, 25.',
        textUr: 'درج ذیل کا حسابی اوسط معلوم کریں: 6.5, 11, 12.3, 9, 8.1, 16, 18, 20.5, 25۔',
        solution: 'Mean = 126.4 / 9 ≈ 14.04.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u12_s5',
        numRoman: 'V',
        textEn: 'A company yearly marketing budget across 5 years is 5, 7, 8, 6, 7 million. Find average budget.',
        textUr: 'ایک کمپنی کے پانچ سالوں کے سالانہ بجٹ 5, 7, 8, 6, 7 ملین ہیں۔ اوسط بجٹ معلوم کریں۔',
        solution: 'Average = (5 + 7 + 8 + 6 + 7) / 5 = 33 / 5 = 6.6 million.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u12_s6',
        numRoman: 'VI',
        textEn: 'Define frequency distribution.',
        textUr: 'تعددی تقسیم کی تعریف کریں۔',
        solution: 'A tabular arrangement of data showing frequency of occurrence of each value or class.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u12_s7',
        numRoman: 'VII',
        textEn: 'Define arithmetic mean and state its algebraic formula.',
        textUr: 'حسابی اوسط کی تعریف کریں اور اس کا حسابی فارمولا لکھیں۔',
        solution: 'Mean x̄ = Σx / n for ungrouped data and Σfx / Σf for grouped data.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u12_s8',
        numRoman: 'VIII',
        textEn: 'Biology test marks: 20-24 (5), 25-29 (8), 30-34 (12), 35-39 (15), 40-44 (3), 45-49 (2). Find the class interval with the least frequency.',
        textUr: 'سب سے کم تعدد والی جماعت کی جماعتی حدود معلوم کریں۔',
        solution: 'Least frequency is 2, corresponding to class interval 45-49.',
        isHighYield: true,
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'u12_l1',
        num: 1,
        textEn: 'Heights of 200 students recorded: 51(2), 52(5), 53(8), 54(24), 55(55), 56(45), 57(38), 58(16), 59(6), 60(1). Find mean height using short formula.',
        textUr: 'مختصر طریقے سے 200 لڑکوں کا اوسط قد معلوم کریں۔',
        solution: 'Using assumed mean A = 55. d = x - 55. Mean = A + (Σfd / Σf) = 55 + (167 / 200) = 55.835 inches.',
        isHighYield: true,
        points: 5
      },
      {
        id: 'u12_l2',
        num: 2,
        textEn: 'Weekly wages: 600-700 (3), 700-800 (5), 800-900 (7), 900-1000 (21), 1000-1100 (11). Find mean, median and mode.',
        textUr: 'دیے گئے جدول کا حسابی اوسط، وسطانیہ اور اعادہ معلوم کریں۔',
        solution: 'Mean = 924.47 Rs. Median = 938.10 Rs. Mode = 963.64 Rs.',
        isHighYield: true,
        points: 5
      }
    ]
  },
  {
    id: 'nuqta-9th-math-unit7-geometry',
    title: '9th Mathematics – Unit 7 (Coordinate Geometry & Straight Lines)',
    category: 'chapter-wise',
    header: {
      institutionName: 'NUQTA-E-FIKR ACADEMY',
      institutionSubtitle: 'MAIN BAQRABAD PULLI, PIRAN GHAIB ROAD, MULTAN',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '9TH',
      date: '29-Jul-2026',
      subjectName: 'Mathematics',
      subjectNameUrdu: 'ریاضی',
      timeAllowed: '1 Hour 15 Mins',
      totalMarks: 40,
      examName: 'Unit 7 Examination',
      syllabus: 'UNIT 7: Coordinate Geometry',
      showOmrSheet: true,
      showWatermark: false,
      watermarkText: 'UNIT 7',
      paperType: 'bilingual'
    },
    instructionsEn: 'Choose the correct answer. (1 × 10 = 10)',
    instructionsUr: 'چار ممکنہ جوابات میں سے درست پر دائرہ لگائیں۔',
    mcqs: [
      {
        id: 'u7_m1',
        num: 1,
        textEn: 'In a plane horizontal line represents:',
        textUr: 'مستوی میں افقی لائن ظاہر کرتی ہے:',
        options: [
          { id: 'A', textEn: 'xox\'', textUr: 'xox\'' },
          { id: 'B', textEn: 'yoy\'', textUr: 'yoy\'' },
          { id: 'C', textEn: 'zoz\'', textUr: 'zoz\'' },
          { id: 'D', textEn: 'None of these', textUr: 'کوئی نہیں' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u7_m2',
        num: 2,
        textEn: 'The point (0, 5) lies on which axis?',
        textUr: 'نقطہ (0, 5) کس محور پر واقع ہوگا؟',
        options: [
          { id: 'A', textEn: 'x-axis', textUr: 'x-محور' },
          { id: 'B', textEn: 'y-axis', textUr: 'y-محور' },
          { id: 'C', textEn: 'Both axes', textUr: 'دونوں محوروں پر' },
          { id: 'D', textEn: 'None', textUr: 'کوئی نہیں' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u7_m3',
        num: 3,
        textEn: 'The equation of a line with slope 3 and y-intercept 2 is:',
        textUr: '3 ڈھلوان اور 2 y-قاطع والی لائن کی مساوات ہے:',
        options: [
          { id: 'A', textEn: 'y = 3x + 2', textUr: 'y = 3x + 2' },
          { id: 'B', textEn: 'y = 2x + 3', textUr: 'y = 2x + 3' },
          { id: 'C', textEn: 'y = 3x - 2', textUr: 'y = 3x - 2' },
          { id: 'D', textEn: 'y = 2x - 3', textUr: 'y = 2x - 3' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u7_m4',
        num: 4,
        textEn: 'The slope of a line perpendicular to x = 3 is:',
        textUr: 'x = 3 کے عمودی لائن کی ڈھلوان ہوگی:',
        options: [
          { id: 'A', textEn: '0', textUr: '0' },
          { id: 'B', textEn: '1', textUr: '1' },
          { id: 'C', textEn: '2', textUr: '2' },
          { id: 'D', textEn: '-1', textUr: '1-' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u7_m5',
        num: 5,
        textEn: 'The equation 2x + 3y = 6 in slope-intercept form is:',
        textUr: 'مساوات 2x + 3y = 6 ڈھلوان قاطع شکل میں ہوگی:',
        options: [
          { id: 'A', textEn: 'y = (-2/3)x + 2', textUr: 'y = (-2/3)x + 2' },
          { id: 'B', textEn: 'y = (2/3)x + 2', textUr: 'y = (2/3)x + 2' },
          { id: 'C', textEn: 'y = (-2/3)x - 2', textUr: 'y = (-2/3)x - 2' },
          { id: 'D', textEn: 'y = (2/3)x - 2', textUr: 'y = (2/3)x - 2' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u7_m6',
        num: 6,
        textEn: 'Distance between two points P(1, 2) and Q(4, 6) is:',
        textUr: 'نقاط P(1, 2) اور Q(4, 6) کے درمیان فاصلہ ہوتا ہے:',
        options: [
          { id: 'A', textEn: '5', textUr: '5' },
          { id: 'B', textEn: '6', textUr: '6' },
          { id: 'C', textEn: '√13', textUr: '13√' },
          { id: 'D', textEn: '4', textUr: '4' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 'u7_s1',
        numRoman: 'I',
        textEn: 'Describe the location in plane for which: x > 0 and y > 0.',
        textUr: 'مستوی میں مقام کی وضاحت کریں جس کے لیے x > 0 اور y > 0۔',
        solution: 'Point lies strictly in the First Quadrant (QI).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u7_s2',
        numRoman: 'II',
        textEn: 'Find distance between points P(-8, -7) and Q(0, 0).',
        textUr: 'نقاط P(-8, -7) اور Q(0, 0) کے درمیان فاصلہ معلوم کریں۔',
        solution: 'd = √[(-8 - 0)² + (-7 - 0)²] = √[64 + 49] = √113 ≈ 10.63 units.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u7_s3',
        numRoman: 'III',
        textEn: 'Find midpoint of bridge between points (2, 5) and (8, 9).',
        textUr: 'پل کے شروع اور ختم کے نقاط (2, 5) اور (8, 9) کے درمیانی مرکز کے محددات معلوم کریں۔',
        solution: 'Midpoint = ((2 + 8)/2, (5 + 9)/2) = (10/2, 14/2) = (5, 7).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u7_s4',
        numRoman: 'IV',
        textEn: 'Straight-line distance between City A(3, 4) and City B(7, 1) on map.',
        textUr: 'نقشے پر دو شہروں A(3, 4) اور B(7, 1) کے درمیان فاصلہ معلوم کریں۔',
        solution: 'd = √[(7 - 3)² + (1 - 4)²] = √[16 + 9] = √25 = 5 units.',
        isHighYield: true,
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'u7_l1',
        num: 1,
        textEn: 'A drone is flying from point (2, 3) to point (10, 15) on the grid. Calculate the gradient and total distance travelled.',
        textUr: 'ایک ڈرون (2, 3) سے (10, 15) تک اڑ رہا ہے۔ خط کی ڈھلوان اور کل فاصلہ معلوم کریں۔',
        solution: 'Gradient m = (15 - 3)/(10 - 2) = 12/8 = 1.5. Distance = √[8² + 12²] = √[64 + 144] = √208 ≈ 14.42 units.',
        isHighYield: true,
        points: 5
      }
    ]
  },
  {
    id: 'nuqta-9th-math-unit3-sets',
    title: '9th Mathematics – Unit 3 (Sets and Functions)',
    category: 'chapter-wise',
    header: {
      institutionName: 'NUQTA-E-FIKR ACADEMY',
      institutionSubtitle: 'MAIN BAQRABAD PULLI, PIRAN GHAIB ROAD, MULTAN',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '9TH',
      date: '29-Jul-2026',
      subjectName: 'Mathematics',
      subjectNameUrdu: 'ریاضی',
      timeAllowed: '1 Hour 15 Mins',
      totalMarks: 40,
      examName: 'Unit 3 Examination',
      syllabus: 'UNIT 3: Sets and Functions',
      showOmrSheet: true,
      showWatermark: false,
      watermarkText: 'UNIT 3',
      paperType: 'bilingual'
    },
    instructionsEn: 'Choose the correct answer. (1 × 10 = 10)',
    instructionsUr: 'چار ممکنہ جوابات میں سے درست پر دائرہ لگائیں۔',
    mcqs: [
      {
        id: 'u3_m1',
        num: 1,
        textEn: 'n(A) + n(B) - n(A ∩ B) = ......',
        textUr: 'n(A) + n(B) - n(A ∩ B) = ......',
        options: [
          { id: 'A', textEn: 'n(A ∩ B)', textUr: 'n(A ∩ B)' },
          { id: 'B', textEn: 'n(A)', textUr: 'n(A)' },
          { id: 'C', textEn: 'n(A ∪ B)', textUr: 'n(A ∪ B)' },
          { id: 'D', textEn: 'None of these', textUr: 'ان میں سے کوئی نہیں' }
        ],
        correctOption: 'C',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u3_m2',
        num: 2,
        textEn: 'If a function f: A → B such that Range(f) ≠ B, then f is called:',
        textUr: 'اگر کوئی تفاعل f: A → B اس طرح ہو کہ Range(f) ≠ B، تو تفاعل f کہلائے گا:',
        options: [
          { id: 'A', textEn: 'Onto function', textUr: 'آن ٹو تفاعل' },
          { id: 'B', textEn: 'Into function', textUr: 'ان ٹو تفاعل' },
          { id: 'C', textEn: 'One-one function', textUr: 'ون ٹو ون تفاعل' },
          { id: 'D', textEn: 'Bijective function', textUr: 'بائیجیکٹو تفاعل' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u3_m3',
        num: 3,
        textEn: 'A closed geometric figure with multiple straight sides is called:',
        textUr: 'ایک سے زیادہ اطراف سے بند شکل کو کہا جاتا ہے:',
        options: [
          { id: 'A', textEn: 'Circle', textUr: 'دائرہ' },
          { id: 'B', textEn: 'Rectangle', textUr: 'مستطیل' },
          { id: 'C', textEn: 'Triangle', textUr: 'مثلث' },
          { id: 'D', textEn: 'Polygon', textUr: 'کثیر الاضلاع' }
        ],
        correctOption: 'D',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u3_m4',
        num: 4,
        textEn: 'The total number of diagonals in a polygon with 9 sides is:',
        textUr: 'ایک نو اضلاع والی کثیر الاضلاع میں کل وتروں کی تعداد ہے:',
        options: [
          { id: 'A', textEn: '18', textUr: '18' },
          { id: 'B', textEn: '21', textUr: '21' },
          { id: 'C', textEn: '25', textUr: '25' },
          { id: 'D', textEn: '27', textUr: '27' }
        ],
        correctOption: 'D',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u3_m5',
        num: 5,
        textEn: 'What is the gradient of the tangent to the curve y = x² at x = 1?',
        textUr: 'y = x² کے گراف کے مماس کی ڈھلوان x = 1 پر کیا ہوگی؟',
        options: [
          { id: 'A', textEn: '1', textUr: '1' },
          { id: 'B', textEn: '2', textUr: '2' },
          { id: 'C', textEn: '3', textUr: '3' },
          { id: 'D', textEn: '4', textUr: '4' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 'u3_s1',
        numRoman: 'I',
        textEn: 'Find the number of elements of the power set of {a, {b, c}}.',
        textUr: 'درج ذیل سیٹ کے پاور سیٹ کے ارکان کی تعداد کیا ہے؟ {a, {b, c}}',
        solution: 'n = 2 elements => 2² = 4 elements in P(S).',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u3_s2',
        numRoman: 'II',
        textEn: 'Verify commutative property of union and intersection for sets N and Z.',
        textUr: 'سیٹوں N اور Z کے لیے یونین اور تقاطع کی خاصیت مبادلہ ثابت کریں۔',
        solution: 'N ∪ Z = Z = Z ∪ N and N ∩ Z = N = Z ∩ N.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u3_s3',
        numRoman: 'III',
        textEn: 'A rectangular wall is 10 m tall and 12 m wide. How many gallons of paint are needed if one gallon covers 35 m²?',
        textUr: 'ایک دیوار کی لمبائی 10 میٹر اور چوڑائی 12 میٹر ہے۔ اگر ایک گیلن 35 مربع میٹر کور کرے تو کتنے گیلن درکار ہوں گے؟',
        solution: 'Area = 10 × 12 = 120 m². Gallons = 120 / 35 ≈ 3.43 gallons.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u3_s4',
        numRoman: 'IV',
        textEn: 'How does the graph of a reciprocal function y = 1/x behave?',
        textUr: 'معکوس تفاعل y = 1/x کا گراف کیسا برتاؤ کرتا ہے؟',
        solution: 'It forms a hyperbola in quadrants I and III, asymptotic to x = 0 and y = 0.',
        isHighYield: true,
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'u3_l1',
        num: 1,
        textEn: 'In a survey of 100 students, 60 like Mathematics, 45 like Physics, and 25 like both. Draw a Venn diagram and calculate how many students like: (i) Mathematics only, (ii) Neither subject.',
        textUr: '100 طلبہ کے سروے میں 60 ریاضی، 45 فزکس اور 25 دونوں پسند کرتے ہیں۔ وین ڈایاگرام بنائیں اور معلوم کریں: (i) صرف ریاضی، (ii) کوئی مضمون نہیں۔',
        solution: '(i) Only Math = 60 - 25 = 35. (ii) Neither = 100 - (60 + 45 - 25) = 100 - 80 = 20 students.',
        isHighYield: true,
        points: 5
      }
    ]
  },
  {
    id: 'nuqta-9th-math-unit5-inequalities',
    title: '9th Mathematics – Unit 5 (Linear Equations & Inequalities)',
    category: 'chapter-wise',
    header: {
      institutionName: 'NUQTA-E-FIKR ACADEMY',
      institutionSubtitle: 'MAIN BAQRABAD PULLI, PIRAN GHAIB ROAD, MULTAN',
      studentNamePrompt: 'Student Name',
      rollNumberPrompt: 'Roll Number',
      className: '9TH',
      date: '29-Jul-2026',
      subjectName: 'Mathematics',
      subjectNameUrdu: 'ریاضی',
      timeAllowed: '1 Hour 15 Mins',
      totalMarks: 40,
      examName: 'Unit 5 Examination',
      syllabus: 'UNIT 5: Linear Equations and Inequalities',
      showOmrSheet: true,
      showWatermark: false,
      watermarkText: 'UNIT 5',
      paperType: 'bilingual'
    },
    instructionsEn: 'Choose the correct answer. (1 × 10 = 10)',
    instructionsUr: 'چار ممکنہ جوابات میں سے درست پر دائرہ لگائیں۔',
    mcqs: [
      {
        id: 'u5_m1',
        num: 1,
        textEn: 'Which of the following is a linear equation in one variable?',
        textUr: 'درج ذیل میں سے ایک متغیر میں یک درجی مساوات کون سی ہے؟',
        options: [
          { id: 'A', textEn: '2x + 3y = 7', textUr: '2x + 3y = 7' },
          { id: 'B', textEn: '5x - 4 = 0', textUr: '5x - 4 = 0' },
          { id: 'C', textEn: 'x² + 3x = 8', textUr: 'x² + 3x = 8' },
          { id: 'D', textEn: 'xy + 2 = 5', textUr: 'xy + 2 = 5' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u5_m2',
        num: 2,
        textEn: 'The graph of x + y ≥ 5 includes the boundary line:',
        textUr: 'غیر مساوات x + y ≥ 5 کا گراف کون سی لائن پر مشتمل ہوتا ہے؟',
        options: [
          { id: 'A', textEn: 'x + y = 5', textUr: 'x + y = 5' },
          { id: 'B', textEn: 'x + y < 5', textUr: 'x + y < 5' },
          { id: 'C', textEn: 'x + y > 5', textUr: 'x + y > 5' },
          { id: 'D', textEn: 'None of these', textUr: 'ان میں سے کوئی نہیں' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u5_m3',
        num: 3,
        textEn: 'In an equilateral triangle, what is the measure of each angle?',
        textUr: 'ایک مساوی الاضلاع مثلث میں ہر زاویے کی پیمائش کیا ہوگی؟',
        options: [
          { id: 'A', textEn: '45°', textUr: '45°' },
          { id: 'B', textEn: '60°', textUr: '60°' },
          { id: 'C', textEn: '90°', textUr: '90°' },
          { id: 'D', textEn: '120°', textUr: '120°' }
        ],
        correctOption: 'B',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u5_m4',
        num: 4,
        textEn: 'The graph of y = x² - 4 intersects the x-axis at:',
        textUr: 'y = x² - 4 کا گراف x-محور کو کس نقطہ پر قطع کرتا ہے؟',
        options: [
          { id: 'A', textEn: '(2, 0) and (-2, 0)', textUr: '(2, 0) اور (-2, 0)' },
          { id: 'B', textEn: '(4, 0) and (-4, 0)', textUr: '(4, 0) اور (-4, 0)' },
          { id: 'C', textEn: '(1, 0) and (-1, 0)', textUr: '(1, 0) اور (-1, 0)' },
          { id: 'D', textEn: '(3, 0) and (-3, 0)', textUr: '(3, 0) اور (-3, 0)' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      },
      {
        id: 'u5_m5',
        num: 5,
        textEn: 'The graph of y = x² - 9 opens:',
        textUr: 'y = x² - 9 کا گراف کھلتا ہے:',
        options: [
          { id: 'A', textEn: 'Upward', textUr: 'اوپر کی طرف' },
          { id: 'B', textEn: 'Downward', textUr: 'نیچے کی طرف' },
          { id: 'C', textEn: 'Left side', textUr: 'بائیں طرف' },
          { id: 'D', textEn: 'Right side', textUr: 'دائیں طرف' }
        ],
        correctOption: 'A',
        isHighYield: true,
        points: 1
      }
    ],
    shortQuestions: [
      {
        id: 'u5_s1',
        numRoman: 'I',
        textEn: 'Solve and represent the solution on a real number line: x/3 + 6 = -12.',
        textUr: 'درج ذیل مساوات کو حل کریں اور عددی خط پر ظاہر کریں: x/3 + 6 = -12',
        solution: 'x/3 = -12 - 6 = -18 => x = -54.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u5_s2',
        numRoman: 'II',
        textEn: 'Solve and represent the solution on a real number line: 3x + 7 < 16.',
        textUr: 'حل کریں اور عددی خط پر ظاہر کریں: 3x + 7 < 16',
        solution: '3x < 9 => x < 3. Open dot at 3 with arrow pointing left.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u5_s3',
        numRoman: 'III',
        textEn: 'The perimeter of a regular octagon is 48 cm. Another octagon has sides that are 1.2 times the side of the first. What is the length of side of second octagon?',
        textUr: 'ایک منظم مثمن کا احاطہ 48 سینٹی میٹر ہے۔ ایک دوسری مثمن کے اضلاع پہلی کے اضلاع سے 1.2 گنا ہیں۔ دوسری کے ضلع کی لمبائی معلوم کریں۔',
        solution: 'Side 1 = 48/8 = 6 cm. Side 2 = 6 × 1.2 = 7.2 cm.',
        isHighYield: true,
        points: 2
      },
      {
        id: 'u5_s4',
        numRoman: 'IV',
        textEn: 'A card is drawn from a well-shuffled pack of 52 playing cards. What is the probability of getting a King or Jack of red colour?',
        textUr: 'تاش کے 52 پتوں میں سے ایک پتہ نکالا گیا۔ سرخ رنگ کے بادشاہ یا غلام ہونے کا کیا احتمال ہوگا؟',
        solution: 'Total red Kings and Jacks = 2 + 2 = 4. Probability = 4/52 = 1/13.',
        isHighYield: true,
        points: 2
      }
    ],
    longQuestions: [
      {
        id: 'u5_l1',
        num: 1,
        textEn: 'Indicate the solution region of the following linear inequalities by shading: 3x + 7y ≥ 21 and x - y ≤ 2.',
        textUr: 'درج ذیل یک درجی غیر مساوات کے نظام کے حل کا خطہ سایہ دار کر کے ظاہر کریں: 3x + 7y ≥ 21 اور x - y ≤ 2۔',
        solution: 'Plot lines 3x + 7y = 21 and x - y = 2. Test point (0, 0) gives feasible region bounded above the first line and below/right of the second line.',
        isHighYield: true,
        points: 5
      },
      {
        id: 'u5_l2',
        num: 2,
        textEn: 'A man who is 1.8 m tall casts a shadow of 0.76 m in length. If at the same time a telephone pole casts a 3 m shadow, find the height of the pole.',
        textUr: 'ایک آدمی جس کا قد 1.8 میٹر ہے اس کے سائے کی لمبائی 0.76 میٹر ہے۔ اگر اسی وقت ایک ٹیلی فون کے کھمبے کا سایہ 3 میٹر ہو، تو کھمبے کی اونچائی معلوم کریں۔',
        solution: 'Using similar triangles: Height / Shadow = 1.8 / 0.76 = h / 3 => h = (1.8 × 3) / 0.76 ≈ 7.11 meters.',
        isHighYield: true,
        points: 5
      }
    ]
  }
];
