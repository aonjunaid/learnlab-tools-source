import { QuestionBankItem } from './types';

export const ADDITIONAL_NUQTA_QUESTIONS: QuestionBankItem[] = [
  // =========================================================================
  // UNIT 1: Real & Complex Numbers (Additional items from Unit 1 Paper)
  // =========================================================================
  {
    id: 'qb_9m1_mcq1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'Which ancient civilization used the base-60 numeral system?',
    textUr: 'قدیم زمانے میں کس تہذیب نے 60 اساس کا عددی نظام استعمال کیا؟',
    options: [
      { id: 'A', textEn: 'Egyptians', textUr: 'مصری' },
      { id: 'B', textEn: 'Sumerians', textUr: 'سمیری' },
      { id: 'C', textEn: 'Greeks', textUr: 'یونانی' },
      { id: 'D', textEn: 'Romans', textUr: 'رومی' }
    ],
    correctOption: 'B',
    solution: 'The Sumerians and Babylonians used the sexagesimal (base-60) system.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },
  {
    id: 'qb_9m1_mcq2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'The multiplicative inverse of -2/3 is:',
    textUr: '-2/3 کا ضربی معکوس ہے:',
    options: [
      { id: 'A', textEn: '2/3', textUr: '2/3' },
      { id: 'B', textEn: '-3/2', textUr: '-3/2' },
      { id: 'C', textEn: '3/2', textUr: '3/2' },
      { id: 'D', textEn: '-2/3', textUr: '-2/3' }
    ],
    correctOption: 'B',
    solution: 'The multiplicative inverse of a/b is b/a. Inverse of -2/3 is -3/2.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },
  {
    id: 'qb_9m1_mcq3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'The product of two conjugate surds is always a/an:',
    textUr: 'دو مترافق مقادیر اصم کا حاصل ضرب ہمیشہ ہوتا ہے:',
    options: [
      { id: 'A', textEn: 'Rational number', textUr: 'ناطق عدد' },
      { id: 'B', textEn: 'Irrational number', textUr: 'غیر ناطق عدد' },
      { id: 'C', textEn: 'Imaginary number', textUr: 'تخیلاتی عدد' },
      { id: 'D', textEn: 'Zero', textUr: 'صفر' }
    ],
    correctOption: 'A',
    solution: '(a + √b)(a - √b) = a² - b, which is a rational number.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },
  {
    id: 'qb_9m1_mcq4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'Convert 25°C to Fahrenheit using F = (9/5)C + 32:',
    textUr: 'فارمولا F = (9/5)C + 32 استعمال کر کے 25 سینٹی گریڈ کو فارن ہائیٹ میں تبدیل کریں:',
    options: [
      { id: 'A', textEn: '77°F', textUr: '77°F' },
      { id: 'B', textEn: '68°F', textUr: '68°F' },
      { id: 'C', textEn: '90°F', textUr: '90°F' },
      { id: 'D', textEn: '45°F', textUr: '45°F' }
    ],
    correctOption: 'A',
    solution: 'F = (9/5)(25) + 32 = 45 + 32 = 77°F.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },
  {
    id: 'qb_9m1_mcq5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'Two numbers are in the ratio 3:4. If their sum is 35, the numbers are:',
    textUr: 'دو اعداد میں 3:4 کی نسبت ہے۔ اگر ان کا مجموعہ 35 ہو تو وہ اعداد ہوں گے:',
    options: [
      { id: 'A', textEn: '15, 20', textUr: '15, 20' },
      { id: 'B', textEn: '12, 16', textUr: '12, 16' },
      { id: 'C', textEn: '9, 12', textUr: '9, 12' },
      { id: 'D', textEn: '18, 24', textUr: '18, 24' }
    ],
    correctOption: 'A',
    solution: '3x + 4x = 35 => 7x = 35 => x = 5. The numbers are 3(5)=15 and 4(5)=20.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },
  {
    id: 'qb_9m1_short1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'short',
    textEn: 'Find the value of x if 2^x = 32.',
    textUr: 'اگر 2^x = 32 ہو تو x کی قیمت معلوم کریں۔',
    solution: '2^x = 2⁵. Comparing bases on both sides, x = 5.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },
  {
    id: 'qb_9m1_short2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'short',
    textEn: 'If a = 3/2, b = 5/3, and c = 7/5, verify that: (a + b)c = ac + bc.',
    textUr: 'اگر a = 3/2, b = 5/3 اور c = 7/5 ہوں تو ثابت کریں کہ: (a + b)c = ac + bc۔',
    solution: 'LHS = (3/2 + 5/3) × 7/5 = ((9+10)/6) × 7/5 = 19/6 × 7/5 = 133/30. RHS = (3/2 × 7/5) + (5/3 × 7/5) = 21/10 + 35/15 = 63/30 + 70/30 = 133/30. LHS = RHS.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },
  {
    id: 'qb_9m1_long1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 1: Real and Complex Numbers',
    type: 'long',
    textEn: 'The length and width of a rectangle are (4√3 + 2√2) cm and (4√3 - 2√2) cm respectively. Calculate the exact area and perimeter of the rectangle.',
    textUr: 'ایک مستطیل کی لمبائی اور چوڑائی بالترتیب (2√2 + 3√4) سینٹی میٹر اور (2√2 - 3√4) سینٹی میٹر ہیں۔ مستطیل کا رقبہ اور احاطہ معلوم کریں۔',
    solution: 'Area = Length × Width = (4√3 + 2√2)(4√3 - 2√2) = (4√3)² - (2√2)² = (16 × 3) - (4 × 2) = 48 - 8 = 40 cm². Perimeter = 2(L + W) = 2(4√3 + 2√2 + 4√3 - 2√2) = 2(8√3) = 16√3 cm.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 1'
  },

  // =========================================================================
  // UNIT 2: Real Numbers & Logarithms (Full set from Unit 2 Paper)
  // =========================================================================
  {
    id: 'qb_9m2_mcq1',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'The base of log₁₀(100) = 2 is:',
    textUr: 'log₁₀(100) = 2 کی اساس ہے:',
    options: [
      { id: 'A', textEn: '2', textUr: '2' },
      { id: 'B', textEn: '10', textUr: '10' },
      { id: 'C', textEn: '100', textUr: '100' },
      { id: 'D', textEn: '1', textUr: '1' }
    ],
    correctOption: 'B',
    solution: 'In log_b(x) = y, b is the base. Here base is 10.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_mcq2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'The mantissa of log(345) (given log 345 = 2.5378) is:',
    textUr: 'log(345) کا کسر اعشاریہ (مینٹیسا) ہے (جبکہ log 345 = 2.5378):',
    options: [
      { id: 'A', textEn: '2', textUr: '2' },
      { id: 'B', textEn: '0.5378', textUr: '0.5378' },
      { id: 'C', textEn: '5378', textUr: '5378' },
      { id: 'D', textEn: '2.5378', textUr: '2.5378' }
    ],
    correctOption: 'B',
    solution: 'The mantissa is the fractional/decimal part of the logarithm: 0.5378.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_mcq3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'If log x = 3.678, the characteristic is:',
    textUr: 'اگر log x = 3.678 ہو، تو خاصہ ہوگا:',
    options: [
      { id: 'A', textEn: '3', textUr: '3' },
      { id: 'B', textEn: '-3', textUr: '-3' },
      { id: 'C', textEn: '-4', textUr: '-4' },
      { id: 'D', textEn: '4', textUr: '4' }
    ],
    correctOption: 'A',
    solution: 'The characteristic is the integer part of the logarithm, which is 3.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_mcq4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'log₃(27 / 9) in expanded form using logarithmic laws equals:',
    textUr: 'لوگارتھم کے قوانین کے تحت log₃(27 / 9) برابر ہے:',
    options: [
      { id: 'A', textEn: 'log₃(27) - log₃(9)', textUr: 'log₃(27) - log₃(9)' },
      { id: 'B', textEn: 'log₃(27) + log₃(9)', textUr: 'log₃(27) + log₃(9)' },
      { id: 'C', textEn: 'log₃(27 × 9)', textUr: 'log₃(27 × 9)' },
      { id: 'D', textEn: 'log₃(27 + 9)', textUr: 'log₃(27 + 9)' }
    ],
    correctOption: 'A',
    solution: 'Second law of logarithms states log_a(m / n) = log_a(m) - log_a(n).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_mcq5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: 'The value of log₁₀(10,000) is:',
    textUr: 'log₁₀(10,000) کی قیمت ہے:',
    options: [
      { id: 'A', textEn: '2', textUr: '2' },
      { id: 'B', textEn: '3', textUr: '3' },
      { id: 'C', textEn: '4', textUr: '4' },
      { id: 'D', textEn: '5', textUr: '5' }
    ],
    correctOption: 'C',
    solution: '10,000 = 10⁴. Hence log₁₀(10⁴) = 4 log₁₀(10) = 4.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_mcq6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'mcq',
    textEn: '3⁴ = 81 in logarithmic form is written as:',
    textUr: '3⁴ = 81 کو لوگارتھمی شکل میں لکھا جاتا ہے:',
    options: [
      { id: 'A', textEn: 'log₃(4) = 81', textUr: 'log₃(4) = 81' },
      { id: 'B', textEn: 'log₄(3) = 81', textUr: 'log₄(3) = 81' },
      { id: 'C', textEn: 'log₃(81) = 4', textUr: 'log₃(81) = 4' },
      { id: 'D', textEn: 'log₄(81) = 3', textUr: 'log₄(81) = 3' }
    ],
    correctOption: 'C',
    solution: 'b^y = x is equivalent to log_b(x) = y => log₃(81) = 4.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_short3',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Express 0.000567 in scientific notation.',
    textUr: '0.000567 کو سائنسی ترقیم میں لکھیے۔',
    solution: 'Moving decimal point 4 places to the right: 5.67 × 10⁻⁴.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_short4',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Express 2⁸ = 256 in logarithmic form.',
    textUr: '2⁸ = 256 کو لوگارتھمی شکل میں ظاہر کیجیے۔',
    solution: 'By definition of logarithm, log₂(256) = 8.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_short5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Express in logarithmic form: p = q^r.',
    textUr: 'لوگارتھمی شکل میں لکھیے: p = q^r۔',
    solution: 'log_q(p) = r.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_short6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Find the logarithm of 1.982.',
    textUr: 'عدد 1.982 کا لوگارتھم معلوم کریں۔',
    solution: 'Characteristic = 0. Mantissa from log table for 19 under 8 and difference 2 is 2971. log(1.982) = 0.2971.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_short7',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Expand using laws of logarithm: log₅(11 / 2).',
    textUr: 'لوگارتھم کے قوانین کی مدد سے پھیلا کر لکھیے: log₅(11 / 2)۔',
    solution: 'log₅(11 / 2) = log₅(11) - log₅(2).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_short8',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Expand using logarithmic laws: ln((a² b) / c).',
    textUr: 'لوگارتھم کے قوانین کی مدد سے پھیلا کر لکھیے: ln((a² b) / c)۔',
    solution: 'ln((a² b) / c) = ln(a² b) - ln(c) = ln(a²) + ln(b) - ln(c) = 2 ln(a) + ln(b) - ln(c).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },
  {
    id: 'qb_9m2_short9',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 2: Real and Complex Numbers',
    type: 'short',
    textEn: 'Express in exponential form: log₉(729) = 3.',
    textUr: 'قوت نمائی شکل میں ظاہر کیجیے: log₉(729) = 3۔',
    solution: '9³ = 729.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 2'
  },

  // =========================================================================
  // UNIT 6: Trigonometry (Full set from Unit 6 Paper)
  // =========================================================================
  {
    id: 'qb_9m6_mcq5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'mcq',
    textEn: '1 + tan²θ is equal to:',
    textUr: '1 + tan²θ برابر ہے:',
    options: [
      { id: 'A', textEn: 'sin²θ', textUr: 'sin²θ' },
      { id: 'B', textEn: 'cos²θ', textUr: 'cos²θ' },
      { id: 'C', textEn: 'sec²θ', textUr: 'sec²θ' },
      { id: 'D', textEn: 'cosec²θ', textUr: 'cosec²θ' }
    ],
    correctOption: 'C',
    solution: 'By the fundamental trigonometric identity: 1 + tan²θ = sec²θ.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },
  {
    id: 'qb_9m6_mcq6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'mcq',
    textEn: 'The value of sin 30° is:',
    textUr: 'sin 30° کی قیمت ہے:',
    options: [
      { id: 'A', textEn: '1/2', textUr: '1/2' },
      { id: 'B', textEn: '√3/2', textUr: '3√/2' },
      { id: 'C', textEn: '1/√2', textUr: '1/2√' },
      { id: 'D', textEn: '1', textUr: '1' }
    ],
    correctOption: 'A',
    solution: 'sin 30° = 1/2.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },
  {
    id: 'qb_9m6_short5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'short',
    textEn: 'Convert 45° to radians.',
    textUr: '45 ڈگری کو ریڈین میں تبدیل کریں۔',
    solution: '45° × (π / 180°) = π / 4 radians.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },
  {
    id: 'qb_9m6_short6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 6: Introduction to Trigonometry',
    type: 'short',
    textEn: 'If cos θ = 3/5 and θ is acute, find the value of sin θ and tan θ.',
    textUr: 'اگر cos θ = 3/5 اور زاویہ حادہ ہو، تو sin θ اور tan θ کی قیمتیں معلوم کریں۔',
    solution: 'sin²θ = 1 - cos²θ = 1 - 9/25 = 16/25 => sin θ = 4/5. tan θ = sin θ / cos θ = (4/5)/(3/5) = 4/3.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 6'
  },

  // =========================================================================
  // UNIT 7: Coordinate Geometry (Additional items from Unit 7 Paper)
  // =========================================================================
  {
    id: 'qb_9m7_short5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 7: Coordinate Geometry',
    type: 'short',
    textEn: 'Write down an equation of the line which cuts the x-axis at (4, 0) and y-axis at (0, -3).',
    textUr: 'اس خط کی مساوات لکھیے جو x-محور کو (4, 0) اور y-محور کو (0, -3) پر قطع کرتا ہو۔',
    solution: 'Using two-intercept form x/a + y/b = 1: x/4 + y/(-3) = 1 => 3x - 4y = 12.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 7'
  },
  {
    id: 'qb_9m7_short6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 7: Coordinate Geometry',
    type: 'short',
    textEn: 'For a straight line with a gradient of -3 and a y-intercept of 2, write its equation in standard form.',
    textUr: 'ایک سیدھے خط کے لیے جس کی ڈھلوان -3 اور y-قاطع 2 ہے، معیاری شکل میں مساوات لکھیے۔',
    solution: 'y = mx + c => y = -3x + 2 => 3x + y - 2 = 0.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 7'
  },

  // =========================================================================
  // UNIT 8: Mathematical Reasoning & Logic (Full items from Unit 8 Paper)
  // =========================================================================
  {
    id: 'qb_9m8_mcq5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 8: Mathematical Reasoning & Logic',
    type: 'mcq',
    textEn: 'A statement which is true for all possible truth values of its components is called a:',
    textUr: 'وہ بیان جو اپنے تمام اجزا کی تمام ممکنہ سچائی قیمتوں کے لیے درست ہو، کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Tautology', textUr: 'ہمہ سچائی (ٹوٹولوجی)' },
      { id: 'B', textEn: 'Absurdity', textUr: 'تناقض (ایبسرڈیٹی)' },
      { id: 'C', textEn: 'Contingency', textUr: 'امکانیت (کنٹنجنسی)' },
      { id: 'D', textEn: 'Implication', textUr: 'استلزام' }
    ],
    correctOption: 'A',
    solution: 'A compound statement that is always True is called a tautology.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 8'
  },
  {
    id: 'qb_9m8_mcq6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 8: Mathematical Reasoning & Logic',
    type: 'mcq',
    textEn: 'A statement which is False for all possible truth values of its components is called:',
    textUr: 'وہ بیان جو اپنے تمام اجزا کی تمام ممکنہ سچائی قیمتوں کے لیے غلط ہو، کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Tautology', textUr: 'ٹوٹولوجی' },
      { id: 'B', textEn: 'Absurdity / Contradiction', textUr: 'تناقض / ایبسرڈیٹی' },
      { id: 'C', textEn: 'Contingency', textUr: 'کنٹنجنسی' },
      { id: 'D', textEn: 'Conjunction', textUr: 'عطف' }
    ],
    correctOption: 'B',
    solution: 'A statement that is always False is an absurdity or contradiction.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 8'
  },
  {
    id: 'qb_9m8_short5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 8: Mathematical Reasoning & Logic',
    type: 'short',
    textEn: 'For the conditional statement p → q, state its: (i) Converse, (ii) Inverse, (iii) Contrapositive.',
    textUr: 'مشروط بیان p → q کے لیے درج ذیل بیانات لکھیے: (i) عکس، (ii) معکوس، (iii) عکس معکوس۔',
    solution: '(i) Converse: q → p. (ii) Inverse: ~p → ~q. (iii) Contrapositive: ~q → ~p.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 8'
  },

  // =========================================================================
  // UNIT 10: Functions & Graphs (Additional items from Unit 10 Paper)
  // =========================================================================
  {
    id: 'qb_9m10_mcq5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'mcq',
    textEn: 'The equation x = 5 represents a straight line that is:',
    textUr: 'مساوات x = 5 ایک سیدھے خط کو ظاہر کرتی ہے جو کہ:',
    options: [
      { id: 'A', textEn: 'Parallel to x-axis', textUr: 'x-محور کے متوازی ہے' },
      { id: 'B', textEn: 'Parallel to y-axis', textUr: 'y-محور کے متوازی ہے' },
      { id: 'C', textEn: 'Passing through origin', textUr: 'مبدا سے گزرتا ہے' },
      { id: 'D', textEn: 'Inclined at 45°', textUr: '45 ڈگری پر جھکا ہے' }
    ],
    correctOption: 'B',
    solution: 'x = c is a vertical line parallel to the y-axis.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },
  {
    id: 'qb_9m10_mcq6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'mcq',
    textEn: 'What is the y-intercept of the linear function f(x) = 3x - 5?',
    textUr: 'یک درجی تفاعل f(x) = 3x - 5 کا y-قاطع کیا ہے؟',
    options: [
      { id: 'A', textEn: '3', textUr: '3' },
      { id: 'B', textEn: '-5', textUr: '-5' },
      { id: 'C', textEn: '5/3', textUr: '5/3' },
      { id: 'D', textEn: '0', textUr: '0' }
    ],
    correctOption: 'B',
    solution: 'At x = 0, y = 3(0) - 5 = -5. The y-intercept is -5.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },
  {
    id: 'qb_9m10_short5',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'short',
    textEn: 'What is the axis of symmetry of the quadratic function y = x² - 6x + 8?',
    textUr: 'دو درجی تفاعل y = x² - 6x + 8 کا محور تشاکل کیا ہے؟',
    solution: 'x = -b / (2a) = -(-6) / (2 × 1) = 6 / 2 = 3. Axis of symmetry is x = 3.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },
  {
    id: 'qb_9m10_long2',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 10: Functions and Graphs',
    type: 'long',
    textEn: 'Ali manufactures shirts. His total cost function is C(x) = 500x + 20,000 and revenue function is R(x) = 900x, where x is number of shirts. Find: (i) Break-even quantity, (ii) Profit when 100 shirts are sold.',
    textUr: 'علی قمیضیں تیار کرتا ہے۔ اس کا کل لاگت کا تفاعل C(x) = 500x + 20,000 اور آمدن کا تفاعل R(x) = 900x ہے، جہاں x قمیضوں کی تعداد ہے۔ معلوم کریں: (i) بریک ایون مقدار، (ii) 100 قمیضیں فروخت کرنے پر منافع۔',
    solution: '(i) At break-even, R(x) = C(x) => 900x = 500x + 20,000 => 400x = 20,000 => x = 50 shirts. (ii) Profit P(x) = R(x) - C(x) = 400x - 20,000. For x = 100: P(100) = 400(100) - 20,000 = 40,000 - 20,000 = Rs. 20,000.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 10'
  },

  // =========================================================================
  // UNIT 11: Practical Geometry (Additional items from Unit 11 Paper)
  // =========================================================================
  {
    id: 'qb_9m11_mcq6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 11: Practical Geometry',
    type: 'mcq',
    textEn: 'The line segment joining the midpoint of a side of a triangle to its opposite vertex is called:',
    textUr: 'مثلث کے کسی ضلع کے درمیانی نقطہ کو اس کے مخالف راس سے ملانے والا قطعہ خط کہلاتا ہے:',
    options: [
      { id: 'A', textEn: 'Altitude', textUr: 'ارتفاع' },
      { id: 'B', textEn: 'Median', textUr: 'وسطانیہ' },
      { id: 'C', textEn: 'Angle bisector', textUr: 'زاویے کا ناصف' },
      { id: 'D', textEn: 'Perpendicular bisector', textUr: 'عمودی ناصف' }
    ],
    correctOption: 'B',
    solution: 'A median of a triangle connects a vertex to the midpoint of the opposite side.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 11'
  },
  {
    id: 'qb_9m11_short6',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 11: Practical Geometry',
    type: 'short',
    textEn: 'Define orthocenter of a triangle.',
    textUr: 'مثلث کے عمودی مرکز (Orthocenter) کی تعریف کریں۔',
    solution: 'The point of concurrency of the three altitudes (perpendiculars dropped from vertices to opposite sides) of a triangle is called its orthocenter.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 11'
  },

  // =========================================================================
  // UNIT 12: Basic Statistics (Additional items from Unit 12 Paper)
  // =========================================================================
  {
    id: 'qb_9m12_mcq8',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'mcq',
    textEn: 'The midpoint of a class interval is known as:',
    textUr: 'کسی جماعتی وقفے کا درمیانی نقطہ کیا کہلاتا ہے؟',
    options: [
      { id: 'A', textEn: 'Class boundary', textUr: 'جماعتی حدود' },
      { id: 'B', textEn: 'Class mark', textUr: 'جماعتی نشان (کلاس مارک)' },
      { id: 'C', textEn: 'Frequency', textUr: 'تعدد' },
      { id: 'D', textEn: 'Range', textUr: 'وسعت' }
    ],
    correctOption: 'B',
    solution: 'Class Mark = (Lower limit + Upper limit) / 2.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },
  {
    id: 'qb_9m12_mcq9',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'mcq',
    textEn: 'Find the mode of the data: 80, 80, 82, 82, 82, 85.',
    textUr: 'دیے گئے مواد کا اعادہ (موڈ) معلوم کریں: 80, 80, 82, 82, 82, 85۔',
    options: [
      { id: 'A', textEn: '80', textUr: '80' },
      { id: 'B', textEn: '82', textUr: '82' },
      { id: 'C', textEn: '85', textUr: '85' },
      { id: 'D', textEn: '81.8', textUr: '81.8' }
    ],
    correctOption: 'B',
    solution: '82 occurs 3 times, which is the highest frequency.',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  },
  {
    id: 'qb_9m12_short8',
    subject: 'Mathematics',
    grade: '9th',
    unit: 'Unit 12: Basic Statistics',
    type: 'short',
    textEn: 'Differentiate between grouped data and ungrouped data with examples.',
    textUr: 'گروہی مواد اور غیر گروہی مواد میں مثالوں کی مدد سے فرق واضح کریں۔',
    solution: 'Ungrouped data consists of individual raw observations (e.g., test marks 12, 15, 18). Grouped data organizes observations into class intervals with frequencies (e.g., 10-19: 5 students).',
    isHighYield: true,
    boardTag: 'Nuqta-e-Fikr Unit 12'
  }
];
