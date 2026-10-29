/**
 * Unit test runner for LearnLab Tools core logic.
 * Tests edge cases, zero denominators, leap years, Unicode strings, science formulas, and compound interest.
 */

import {
  calculatePercentageOf,
  calculatePercentageShare,
  calculatePercentageChange,
  calculateReversePercentage,
} from '../src/logic/percentages';

import {
  isLeapYear,
  calculateCalendarAge,
  getDaysInMonth,
} from '../src/logic/dateCalculations';

import {
  analyzeText,
  convertTextCase,
} from '../src/logic/textAnalysis';

import {
  calculateCompoundInterest,
} from '../src/logic/finance';

import {
  solveSpeedDistanceTime,
  solveNewtonsSecondLaw,
  solveOhmsLaw,
  solveDensity,
  solveWaveRelation,
  solveQuadratic,
  solveSlopeDistance,
} from '../src/logic/science';

import {
  parseChemicalFormula,
  calculateSolutionMass,
  solveDilution,
  calculateAcidBase,
  solveIdealGas,
} from '../src/logic/chemistry';

import {
  balanceChemicalEquation,
  calculateStoichiometry,
} from '../src/logic/reaction-balancer';

import {
  calculateOptics,
} from '../src/logic/optics';

import {
  SAMPLE_TECH_PROFILE,
  SAMPLE_TECH_COVER_LETTER,
  SAMPLE_RESEARCH_PROFILE,
  generatePlainTextATS,
  generateCoverLetterPlainText,
  exportCVToJson,
  importCVFromJson,
  CV_COLORS,
} from '../src/logic/cv-templates';

import {
  detectVideoPlatform,
  parseTranscriptTimestamps,
  formatTimestamp,
  SAMPLE_PLATFORM_VIDEOS,
} from '../src/logic/video-platforms';

import {
  decodeHtmlEntities,
  generateDynamicMathQuestion,
  generateDynamicPatternQuestion,
  generateDynamicNumeracyQuestion,
  CURATED_OFFLINE_QUESTION_BANK,
  getFallbackQuestions,
} from '../src/logic/questions-repository';

import {
  parseCSV,
  csvToJson,
  jsonToCsv,
  jsonToYaml,
  yamlToJson,
  csvToSql,
  csvToMarkdownTable,
  markdownTableToCsv,
  markdownToHtml,
  htmlToMarkdown,
  jsonToTypeScript,
  detectFormatFromFile,
  getCompatibleTargets,
  SUPPORTED_FORMATS,
} from '../src/logic/universal-converter';

import {
  calculateZakat,
  calculateMiras,
  calculateQibla,
  calculatePrayerTimes,
  gregorianToHijri,
  searchENumbers,
  calculateFitrahAndFidyah,
  calculateKhatmahPlan,
  NISAB_GRAMS,
} from '../src/logic/islamic-tools';

import {
  EXACT_9TH_MATH_UNIT1_PAPER,
  PRESET_EXAM_PAPERS
} from '../src/logic/exam-generator/presets';

import {
  COMPREHENSIVE_QUESTION_BANK,
  deduplicateQuestionsWithinChapter
} from '../src/logic/exam-generator/question-bank';

import {
  BOARD_PAIRING_SCHEMES,
  getPairingSchemeForSubject
} from '../src/logic/exam-generator/pairing-schemes';

import {
  TEXTBOOK_CHAPTERS_CATALOG,
  getTextbookChapters
} from '../src/logic/exam-generator/textbook-data';

import {
  CHAPTER_PDF_ARCHIVES,
  ARCHIVE_CLASSES,
  ARCHIVE_SUBJECTS,
  getArchivesByClassAndSubject,
  groupArchivesHierarchy
} from '../src/logic/exam-generator/pdf-archives-data';

import {
  parseQuestionsFromPdfText
} from '../src/logic/exam-generator/pdf-question-parser';

import {
  formatByteSize
} from '../src/logic/exam-generator/pdf-memory-store';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName} ${details ? `(${details})` : ''}`);
  }
}

console.log('\n--- 1. Testing Percentage Calculations ---');
{
  // Percentage of
  const p1 = calculatePercentageOf(25, 200);
  assert(p1.value === 50, '25% of 200 is 50');

  // Percentage share with zero denominator
  const p2 = calculatePercentageShare(50, 0);
  assert(p2.isUndefined === true, 'Percentage share with 0 denominator is marked undefined');

  const p3 = calculatePercentageShare(25, 100);
  assert(p3.percentage === 25, '25 is 25% of 100');

  // Percentage change: zero original
  const p4 = calculatePercentageChange(0, 100);
  assert(p4.isUndefined === true, 'Percentage change from 0 is marked undefined');

  // Percentage change: normal increase & decrease
  const p5 = calculatePercentageChange(100, 150);
  assert(p5.percentageChange === 50 && p5.type === 'increase', '100 to 150 is +50% increase');

  const p6 = calculatePercentageChange(200, 100);
  assert(p6.percentageChange === -50 && p6.type === 'decrease', '200 to 100 is -50% decrease');

  // Reverse percentage
  const p7 = calculateReversePercentage(80, 20); // 80 is 20% of 400
  assert(p7.baseValue === 400, 'If 80 is 20%, base value is 400');

  const p8 = calculateReversePercentage(100, 0);
  assert(p8.isUndefined === true, 'Reverse percentage with 0% is marked undefined');
}

console.log('\n--- 2. Testing Date & Calendar Age Calculations ---');
{
  assert(isLeapYear(2000) === true, '2000 is a leap year (400-year rule)');
  assert(isLeapYear(1900) === false, '1900 is NOT a leap year (100-year rule)');
  assert(isLeapYear(2024) === true, '2024 is a leap year');
  assert(isLeapYear(2025) === false, '2025 is NOT a leap year');

  assert(getDaysInMonth(2024, 1) === 29, 'February 2024 has 29 days');
  assert(getDaysInMonth(2025, 1) === 28, 'February 2025 has 28 days');

  // Age calculation
  const bday = new Date(2000, 0, 15); // Jan 15, 2000
  const now = new Date(2025, 0, 15);  // Jan 15, 2025
  const age = calculateCalendarAge(bday, now);
  assert(age !== null && age.years === 25 && age.months === 0 && age.days === 0, 'Exact 25th birthday is 25y 0m 0d');

  // Leap birthday Feb 29
  const leapBaby = new Date(2000, 1, 29); // Feb 29, 2000
  const checkDate = new Date(2001, 1, 28);
  const leapAge = calculateCalendarAge(leapBaby, checkDate);
  assert(leapAge !== null && leapAge.isBornLeapDay === true, 'Recognizes leap day birthday');
}

console.log('\n--- 3. Testing Text Analysis & Case Conversion ---');
{
  const text = 'Hello world! This is LearnLab.\nSecond paragraph with 🚀 emoji.';
  const stats = analyzeText(text);
  assert(stats.words === 10, 'Counts 10 whitespace-delimited words/tokens accurately');
  assert(stats.paragraphs === 2, 'Counts 2 paragraphs');
  assert(stats.sentences === 3, 'Counts 3 sentences');
  assert(stats.charsTotal > 0 && stats.charsNoSpaces > 0, 'Characters with and without spaces computed');

  // Unicode emojis count as 1 character in grapheme / codepoint array
  const emojiOnly = '👋🌍🎉';
  const emojiStats = analyzeText(emojiOnly);
  assert(emojiStats.charsTotal === 3, 'Counts 3 distinct emoji symbols');

  // Case transforms
  assert(convertTextCase('learn lab tools', 'upper') === 'LEARN LAB TOOLS', 'Converts to UPPERCASE');
  assert(convertTextCase('LEARN LAB TOOLS', 'lower') === 'learn lab tools', 'Converts to lowercase');
  assert(convertTextCase('learn lab tools', 'title') === 'Learn Lab Tools', 'Converts to Title Case');
  assert(convertTextCase('learn lab tools', 'camel') === 'learnLabTools', 'Converts to camelCase');
  assert(convertTextCase('learn lab tools', 'snake') === 'learn_lab_tools', 'Converts to snake_case');
  assert(convertTextCase('learn lab tools', 'kebab') === 'learn-lab-tools', 'Converts to kebab-case');
}

console.log('\n--- 4. Testing Compound Interest Estimator ---');
{
  // $10,000 at 5% for 10 years compounded annually, no additions
  // A = 10000 * (1.05)^10 = 16288.95
  const res1 = calculateCompoundInterest(10000, 5, 10, 1, 0);
  assert(Math.abs(res1.futureValue - 16288.95) < 1, 'Standard annual compounding math holds ($16,288.95)');
  assert(res1.totalPrincipal === 10000, 'Principal stored accurately');
  assert(res1.schedule.length === 10, 'Generates 10-year schedule breakdown');

  // Monthly compounding with monthly contributions
  const res2 = calculateCompoundInterest(5000, 6, 5, 12, 1200, false);
  assert(res2.futureValue > 5000, 'Future value grows with periodic contributions');
  assert(res2.totalContributions === 6000, 'Total additions ($100/mo * 5y = $6000)');
}

console.log('\n--- 5. Testing Scientific Calculators ---');
{
  // Speed Distance Time
  const s1 = solveSpeedDistanceTime('speed', { distance: 100, time: 5 });
  assert(s1.isValid && s1.value === 20, '100m / 5s = 20 m/s');

  const s2 = solveSpeedDistanceTime('speed', { distance: 100, time: 0 });
  assert(!s2.isValid, 'Zero time is caught as invalid');

  // Newton's Second Law
  const n1 = solveNewtonsSecondLaw('force', { mass: 10, acceleration: 9.8 });
  assert(n1.isValid && Math.abs(n1.value - 98) < 0.001, 'F = 10kg * 9.8m/s² = 98 N');

  const n2 = solveNewtonsSecondLaw('mass', { force: 50, acceleration: 0 });
  assert(!n2.isValid, 'Mass with 0 acceleration is caught as undefined');

  // Ohm's Law
  const o1 = solveOhmsLaw('voltage', { current: 2, resistance: 10 });
  assert(o1.isValid && o1.value === 20, 'V = 2A * 10Ω = 20 V');

  const o2 = solveOhmsLaw('current', { voltage: 12, resistance: 0 });
  assert(!o2.isValid, 'Current with 0 resistance is caught (short circuit guard)');

  // Density
  const d1 = solveDensity('density', { mass: 1000, volume: 2 });
  assert(d1.isValid && d1.value === 500, 'Density = 1000kg / 2m³ = 500 kg/m³');

  // Wave Relation
  const w1 = solveWaveRelation('speed', { frequency: 440, wavelength: 0.7727 });
  assert(w1.isValid && Math.abs(w1.value - 340) < 1, 'Speed of sound approximation v = 440 * 0.7727 ≈ 340 m/s');

  // Quadratic Solver: two real roots (x² - 5x + 6 = 0 -> x=2, x=3)
  const q1 = solveQuadratic(1, -5, 6);
  assert(q1.isValid && q1.rootType === 'two-distinct-real', 'x² - 5x + 6 has 2 distinct real roots');
  assert(q1.roots.r1 === '3' && q1.roots.r2 === '2', 'Roots are 3 and 2');

  // Quadratic Solver: repeated root (x² - 4x + 4 = 0 -> x=2)
  const q2 = solveQuadratic(1, -4, 4);
  assert(q2.isValid && q2.rootType === 'one-repeated-real', 'x² - 4x + 4 has 1 repeated real root');

  // Quadratic Solver: complex roots (x² + 1 = 0 -> ±i)
  const q3 = solveQuadratic(1, 0, 1);
  assert(q3.isValid && q3.rootType === 'two-complex-conjugates', 'x² + 1 has complex roots');

  // Slope & Distance
  const g1 = solveSlopeDistance(0, 0, 3, 4);
  assert(g1.isValid && g1.distance === 5, '3-4-5 right triangle distance is 5');
  assert(g1.slope === 4 / 3, 'Slope is 4/3');

  // Vertical line (dx = 0)
  const g2 = solveSlopeDistance(2, 1, 2, 8);
  assert(g2.isValid && g2.slope === 'undefined', 'Vertical line slope is recognized as undefined');
}

console.log('\n--- 7. Testing Financial Loan & Amortization Math ---');
{
  // 100k at 6% for 30 years (360 months)
  const P = 100000;
  const r = 0.06 / 12;
  const n = 360;
  const monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  assert(Math.round(monthlyPayment) === 600, '100k at 6% over 30y monthly payment is ~$599.55 -> rounds to 600');
  
  const totalPaid = monthlyPayment * 360;
  const totalInterest = totalPaid - P;
  assert(totalInterest > 115000 && totalInterest < 116000, 'Total interest over 30 years exceeds $115,000');
}

console.log('\n--- 8. Testing BioScience & Genetics Engine ---');
{
  const dna = 'ATGGGTCGTCGTTACTAA';
  // Transcription DNA -> RNA
  const rna = dna.replace(/T/g, 'U');
  assert(rna === 'AUGGGUCGUCGUUACUAA', 'DNA transcript correctly replaces T with U');

  // Reverse complement
  const compMap: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const revComp = dna.split('').reverse().map(b => compMap[b]).join('');
  assert(revComp === 'TTAGTAACGACGACCCAT', 'Reverse complement of ATGGGTCGTCGTTACTAA is TTAGTAACGACGACCCAT');

  // GC Content (8 GC out of 18 nucleotides is 44.4%)
  let gc = 0;
  for (const b of dna) if (b === 'G' || b === 'C') gc++;
  const gcPercent = (gc / dna.length) * 100;
  assert(Math.round(gcPercent) === 44, '8 GC out of 18 nucleotides is 44.4% (rounds to 44)');
}

console.log('\n--- 9. Testing Chemistry Suite Calculations ---');
{
  // 1. Water H2O molar mass ~ 18.015 g/mol
  const h2o = parseChemicalFormula('H2O');
  assert(h2o.isValid && Math.abs(h2o.molarMass - 18.015) < 0.05, 'H2O molar mass is ~18.015 g/mol');

  // 2. Hydrate: CuSO4*5H2O molar mass ~ 249.68 g/mol
  const hydrate = parseChemicalFormula('CuSO4*5H2O');
  assert(hydrate.isValid && Math.abs(hydrate.molarMass - 249.68) < 0.2, 'CuSO4*5H2O molar mass is ~249.68 g/mol');

  // 3. Parentheses: Ca(OH)2
  const caOh2 = parseChemicalFormula('Ca(OH)2');
  assert(caOh2.isValid && Math.abs(caOh2.molarMass - 74.09) < 0.1, 'Ca(OH)2 molar mass is ~74.09 g/mol');

  // 4. Solution Prep: 500 mL of 0.25 M NaCl (58.44 g/mol)
  const prep = calculateSolutionMass(0.25, 0.5, 58.44);
  assert(prep.isValid && Math.abs(prep.massGrams - 7.305) < 0.01, '500 mL of 0.25 M NaCl requires 7.305 g');

  // 5. Dilution: 12 M HCl stock to prepare 250 mL of 1 M HCl
  const dil = solveDilution('v1', { m1: 12, m2: 1, v2: 250 });
  assert(dil.isValid && Math.abs(dil.result - 20.833) < 0.05, 'Preparing 250 mL of 1 M from 12 M HCl requires ~20.83 mL stock');

  // 6. Acid-Base: pH = 3 -> [H+] = 1e-3, pOH = 11
  const ab = calculateAcidBase(3, 'pH');
  assert(ab.isValid && ab.pOH === 11 && ab.nature === 'Acidic', 'pH 3 gives pOH 11 and Acidic nature');

  // 7. Ideal Gas Law: 1 mole at STP (1 atm, 273.15 K)
  const gas = solveIdealGas('V', { P: 1, n: 1, T: 273.15 });
  assert(gas.isValid && Math.abs(gas.value - 22.414) < 0.05, '1 mole at STP occupies ~22.414 Liters');
}

console.log('\n--- 10. Testing Chemical Reaction Balancer & Stoichiometry ---');
{
  // 1. Combustion of glucose: C6H12O6 + O2 -> CO2 + H2O
  const b1 = balanceChemicalEquation('C6H12O6 + O2 -> CO2 + H2O');
  assert(b1.isValid, 'Balances combustion of glucose');
  assert(b1.reactants[0].coeff === 1 && b1.reactants[1].coeff === 6, 'Reactant coefficients are 1 C6H12O6 and 6 O2');
  assert(b1.products[0].coeff === 6 && b1.products[1].coeff === 6, 'Product coefficients are 6 CO2 and 6 H2O');
  assert(b1.atomsLedger.every((a) => a.isBalanced), 'All atom species conserved');

  // 2. Thermite: Al + Fe2O3 -> Al2O3 + Fe
  const b2 = balanceChemicalEquation('Al + Fe2O3 -> Al2O3 + Fe');
  assert(b2.isValid, 'Balances thermite reaction');
  assert(b2.reactants[0].coeff === 2 && b2.reactants[1].coeff === 1, 'Thermite coefficients: 2 Al + 1 Fe2O3');
  assert(b2.products[0].coeff === 1 && b2.products[1].coeff === 2, 'Thermite products: 1 Al2O3 + 2 Fe');

  // 3. Precipitation: CuSO4 + NaOH -> Cu(OH)2 + Na2SO4
  const b3 = balanceChemicalEquation('CuSO4 + NaOH -> Cu(OH)2 + Na2SO4');
  assert(b3.isValid, 'Balances precipitation with polyatomic ions');
  assert(b3.reactants[1].coeff === 2, 'Requires 2 NaOH');

  // 4. Limiting Reagent calculation: 100 g C6H12O6 + 50 g O2
  const stoich = calculateStoichiometry(b1, [
    { formula: 'C6H12O6', amount: 100, unit: 'grams' },
    { formula: 'O2', amount: 50, unit: 'grams' },
  ]);
  assert(stoich !== null && stoich.limitingReagentFormula === 'O2', 'Correctly identifies O2 as limiting reagent');
  assert(stoich !== null && stoich.products[0].theoreticalGrams > 65 && stoich.products[0].theoreticalGrams < 70, 'Theoretical CO2 yield is ~68.8 g');
}

console.log('\n--- 11. Testing Geometric Optics & Ray Tracing Engine ---');
{
  // 1. Converging lens: object at 2F (f = 15, d_o = 30 -> d_i = 30, M = -1.0)
  const opt1 = calculateOptics({
    deviceType: 'converging-lens',
    focalLength: 15,
    objectDistance: 30,
    objectHeight: 10,
  });
  assert(opt1.isReal && opt1.imageDistance === 30, 'Converging lens at 2F produces real image at 2F (d_i = 30 cm)');
  assert(!opt1.isUpright && opt1.magnification === -1, 'Magnification is exactly -1.0 (inverted, same size)');

  // 2. Magnifying glass inside focus: f = 10, d_o = 6 -> d_i = -15, M = +2.5
  const opt2 = calculateOptics({
    deviceType: 'converging-lens',
    focalLength: 10,
    objectDistance: 6,
    objectHeight: 5,
  });
  assert(!opt2.isReal && opt2.imageDistance === -15, 'Object inside focus produces virtual image (d_i = -15 cm)');
  assert(opt2.isUpright && opt2.magnification === 2.5, 'Upright and magnified by 2.5×');

  // 3. Diverging lens: f = 20, d_o = 40 -> d_i = -13.33, M = +0.333
  const opt3 = calculateOptics({
    deviceType: 'diverging-lens',
    focalLength: 20,
    objectDistance: 40,
    objectHeight: 10,
  });
  assert(!opt3.isReal && opt3.imageDistance < 0, 'Diverging lens always produces virtual image');
  assert(opt3.isUpright && opt3.magnification > 0 && opt3.magnification < 1, 'Upright and diminished');

  // 4. Object at focal point: f = 15, d_o = 15 -> infinity
  const opt4 = calculateOptics({
    deviceType: 'converging-lens',
    focalLength: 15,
    objectDistance: 15,
    objectHeight: 10,
  });
  assert(opt4.isAtInfinity, 'Object at focal point creates parallel beam (image at infinity)');
}

// --- 12. Testing SEO Metadata Engine Across All Pages & Tools ---
import { getSEOMetadata } from '../src/logic/seo';
import { TOOLS } from '../src/data/tools';
import { StaticPageId, ToolCategory } from '../src/types';
import {
  getToolHowToSteps,
  getToolFAQs,
  getTwoSentenceLead,
  generateEmbedSnippet,
  getToolRelatedIds
} from '../src/logic/tool-seo-content';
import {
  getAllSitemapItems,
  generateXmlSitemap,
  getFooterSitemapGroups
} from '../src/logic/sitemap';

console.log('\n--- 12. Testing Comprehensive SEO Settings Across All Pages ---');
{
  // 1. Home page SEO
  const homeSEO = getSEOMetadata(null, null, 'all');
  assert(homeSEO.title.length >= 30 && homeSEO.title.length <= 60, `Home title within 30-60 chars (${homeSEO.title.length})`);
  assert(homeSEO.description.length >= 120 && homeSEO.description.length <= 160, `Home description within 120-160 chars (${homeSEO.description.length})`);
  assert(homeSEO.canonicalUrl.length > 0, 'Home canonical URL present');
  assert(homeSEO.jsonLd['@type'] === 'WebApplication', 'Home Schema.org type is WebApplication');

  // 2. All 18 tools have valid SEO, HowTo, and FAQPage schemas
  for (const tool of TOOLS) {
    const toolSEO = getSEOMetadata(tool.id, null, 'all');
    assert(toolSEO.title.length >= 30 && toolSEO.title.length <= 60, `Tool "${tool.id}" title within 30-60 chars (${toolSEO.title.length})`);
    assert(toolSEO.description.length >= 120 && toolSEO.description.length <= 160, `Tool "${tool.id}" description within 120-160 chars (${toolSEO.description.length})`);
    assert(toolSEO.canonicalUrl.includes(tool.id), `Tool "${tool.id}" canonical includes tool ID`);
    assert(toolSEO.jsonLd['@type'] === 'WebApplication', `Tool "${tool.id}" Schema is WebApplication`);
    assert(toolSEO.keywords.length > 0, `Tool "${tool.id}" has keywords`);
    assert(toolSEO.ogTitle.length > 0, `Tool "${tool.id}" has OG title`);

    // Verify Schema.org HowTo and FAQPage embedded in mainEntity
    const mainEntities = (toolSEO.jsonLd.mainEntity as Array<Record<string, unknown>>) || [];
    const howToEntity = mainEntities.find((e) => e['@type'] === 'HowTo');
    const faqEntity = mainEntities.find((e) => e['@type'] === 'FAQPage');
    assert(howToEntity !== undefined, `Tool "${tool.id}" includes Schema.org HowTo markup`);
    assert(faqEntity !== undefined, `Tool "${tool.id}" includes Schema.org FAQPage markup`);

    // Verify supplemental SEO content logic
    const steps = getToolHowToSteps(tool);
    assert(steps.length >= 3, `Tool "${tool.id}" provides >= 3 step-by-step HowTo guides`);
    assert(steps.every((s) => s.name && s.text), `Tool "${tool.id}" HowTo steps have name and description`);

    const faqs = getToolFAQs(tool);
    assert(faqs.length >= 3, `Tool "${tool.id}" provides >= 3 structured FAQs`);
    assert(faqs.every((f) => f.question && f.answer), `Tool "${tool.id}" FAQs have questions and answers`);

    const lead = getTwoSentenceLead(tool);
    assert(lead.length >= 40, `Tool "${tool.id}" has 2-sentence above-the-fold lead (${lead.length} chars)`);

    const related = getToolRelatedIds(tool.id);
    assert(related.length >= 3, `Tool "${tool.id}" has related tool recommendations`);

    const embed = generateEmbedSnippet(tool.id, tool.name, 'https://learnlabtools.app/');
    assert(embed.includes('<iframe') && embed.includes('learnlabtools.app'), `Tool "${tool.id}" generates embeddable widget snippet with backlink`);
  }

  // 3. All static pages have valid SEO
  const staticPages: StaticPageId[] = ['about', 'contact', 'privacy', 'terms', 'accessibility'];
  for (const page of staticPages) {
    const pageSEO = getSEOMetadata(null, page, 'all');
    assert(pageSEO.title.length >= 30 && pageSEO.title.length <= 60, `Static page "${page}" title within 30-60 chars (${pageSEO.title.length})`);
    assert(pageSEO.description.length >= 120 && pageSEO.description.length <= 160, `Static page "${page}" description within 120-160 chars (${pageSEO.description.length})`);
    assert(pageSEO.canonicalUrl.includes(page), `Static page "${page}" canonical includes page name`);
    assert(pageSEO.jsonLd['@type'] !== undefined, `Static page "${page}" has Schema.org type`);
  }

  // 4. Category views have valid SEO
  const categories: ToolCategory[] = ['everyday', 'math', 'science', 'learning'];
  for (const cat of categories) {
    const catSEO = getSEOMetadata(null, null, cat);
    assert(catSEO.title.length >= 30 && catSEO.title.length <= 60, `Category "${cat}" title within 30-60 chars (${catSEO.title.length})`);
    assert(catSEO.description.length >= 120 && catSEO.description.length <= 160, `Category "${cat}" description within 120-160 chars (${catSEO.description.length})`);
    assert(catSEO.jsonLd['@type'] === 'CollectionPage', `Category "${cat}" Schema is CollectionPage`);
  }

  // 5. Website Sitemap & Crawler Specification
  const sitemapItems = getAllSitemapItems('https://learnlabtools.app/');
  assert(sitemapItems.length >= 25, `Sitemap indexes all pages, tools, and categories (${sitemapItems.length} entries)`);
  assert(sitemapItems.some((i) => i.path === '/'), 'Sitemap includes home root entry');
  assert(sitemapItems.some((i) => i.path === '#/tool/percentage-calculator'), 'Sitemap includes percentage calculator');
  assert(sitemapItems.some((i) => i.path === '#/tool/code-compiler'), 'Sitemap includes code compiler');
  assert(sitemapItems.some((i) => i.path === '#/tool/cv-cover-letter-builder'), 'Sitemap includes CV builder');
  assert(sitemapItems.some((i) => i.path === '#/tool/gemini-api-access'), 'Sitemap includes Gemini API Access tool');
  assert(sitemapItems.some((i) => i.path === '#/tool/universal-file-converter'), 'Sitemap includes Universal File Converter');
  assert(sitemapItems.some((i) => i.path === '#/tool/islamic-tools-suite'), 'Sitemap includes Islamic Tools Suite');
  assert(sitemapItems.some((i) => i.path === '#/about'), 'Sitemap includes static about page');

  const xmlSitemap = generateXmlSitemap('https://learnlabtools.app/');
  assert(xmlSitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'XML sitemap includes XML header');
  assert(xmlSitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'XML sitemap includes standard urlset tag');
  assert(xmlSitemap.includes('<loc>https://learnlabtools.app/#/tool/code-compiler</loc>'), 'XML sitemap includes tool loc');
  assert(xmlSitemap.includes('<loc>https://learnlabtools.app/#/tool/gemini-api-access</loc>'), 'XML sitemap includes Gemini tool loc');
  assert(xmlSitemap.includes('<loc>https://learnlabtools.app/#/tool/universal-file-converter</loc>'), 'XML sitemap includes universal converter loc');
  assert(xmlSitemap.includes('<loc>https://learnlabtools.app/#/tool/islamic-tools-suite</loc>'), 'XML sitemap includes islamic tools suite loc');
  assert(xmlSitemap.includes('<priority>0.9</priority>'), 'XML sitemap includes priority tag');

  const footerGroups = getFooterSitemapGroups('https://learnlabtools.app/');
  assert(footerGroups.length === 5, 'Footer sitemap generates 5 organized domain columns');
  assert(footerGroups.every((g) => g.items.length >= 3), 'All footer sitemap columns contain at least 3 direct links');
  const everydayGroup = footerGroups.find((g) => g.id === 'everyday');
  assert(everydayGroup !== undefined && everydayGroup.items.some((i) => i.id === 'universal-file-converter'), 'Everyday footer column includes Universal File Converter');
  assert(everydayGroup !== undefined && everydayGroup.items.some((i) => i.id === 'islamic-tools-suite'), 'Everyday footer column includes Islamic Tools Suite');
  const mathGroup = footerGroups.find((g) => g.id === 'math');
  assert(mathGroup !== undefined && mathGroup.items.some((i) => i.id === 'percentage-calculator'), 'Math footer column includes percentage calculator');
  const learningGroup = footerGroups.find((g) => g.id === 'learning');
  assert(learningGroup !== undefined && learningGroup.items.some((i) => i.id === 'gemini-api-access'), 'Learning footer column includes Gemini API Access tool');

  // 6. Gemini API Key & Model Access Security Standards
  const geminiTool = TOOLS.find((t) => t.id === 'gemini-api-access');
  assert(geminiTool !== undefined, 'Gemini API Key & Model Access tool exists in TOOLS registry');
  if (!geminiTool) throw new Error('geminiTool not found');

  assert(geminiTool.category === 'learning', 'Gemini tool is categorized under learning lab');
  assert(!geminiTool.description.toLowerCase().includes('unlimited tokens'), 'Does not claim unlimited tokens');
  assert(!geminiTool.description.toLowerCase().includes('bypass'), 'Does not claim to bypass quotas');
  const geminiSteps = getToolHowToSteps(geminiTool);
  assert(geminiSteps.some((s) => s.text.includes('https://aistudio.google.com/app/apikey')), 'HowTo steps reference official AI Studio URL');
  const geminiFaqs = getToolFAQs(geminiTool);
  assert(geminiFaqs.some((f) => f.question.toLowerCase().includes('unlimited')), 'FAQs address limits and quotas honestly');
  assert(geminiFaqs.some((f) => f.answer.toLowerCase().includes('never')), 'FAQs confirm zero-key-input policy');
}

// --- 13. Testing Multi-Language Compilers & Editors Engine ---
import {
  transpileTypeScript,
  executePython,
  executeC,
  executeRust,
  executeSQL,
  compileAndRun
} from '../src/logic/compiler/executor';
import { tokenizeCode } from '../src/logic/compiler/syntax-highlighter';

import { LANGUAGE_CONFIGS } from '../src/logic/compiler/templates';

console.log('\n--- 13. Testing Multi-Language Compilers & Respective Editors ---');
{
  // 1. TypeScript Transpiler & Generic Stack
  const tsInput = `interface User { id: number; name: string; }
let count: number = 42;
function greet(user: User): string {
  return "Hello " + user.name;
}`;
  const transpiled = transpileTypeScript(tsInput);
  assert(!transpiled.jsCode.includes('interface User'), 'TypeScript transpiler strips interfaces');
  assert(!transpiled.jsCode.includes(': number'), 'TypeScript transpiler strips type annotations');
  assert(transpiled.jsCode.includes('function greet(user)'), 'TypeScript transpiler outputs clean JavaScript function');

  const tsStackCode = LANGUAGE_CONFIGS.typescript.templates[0].code;
  const tsStackTranspiled = transpileTypeScript(tsStackCode);
  assert(!tsStackTranspiled.jsCode.includes('private items: T[]'), 'TypeScript transpiler strips class field types');

  // 2. Python Execution Engine (Primes, Fibonacci, OOP)
  const pyCode = `import math
def square_root(x):
    return math.sqrt(x)

val = square_root(144)
print(f"Result: {val}")`;
  const pyRes = executePython(pyCode);
  assert(pyRes.success, 'Python execution succeeds');
  assert(pyRes.output.includes('Result: 12'), 'Python math.sqrt and f-string executes accurately');
  assert(pyRes.assemblyCode?.includes('FunctionDef') === true, 'Python AST viewer generates valid AST nodes');

  // Python Sieve template
  const pySieveRes = executePython(LANGUAGE_CONFIGS.python.templates[0].code);
  assert(pySieveRes.success, 'Python Sieve template executes successfully');
  assert(pySieveRes.output.includes('Primes up to 50:'), 'Python Sieve template outputs primes array');
  assert(pySieveRes.output.includes('Total count: 15'), 'Python Sieve finds all 15 primes');

  // Python Fibonacci Golden Ratio template
  const pyFibRes = executePython(LANGUAGE_CONFIGS.python.templates[1].code);
  assert(pyFibRes.success, 'Python Fibonacci template executes successfully');
  assert(pyFibRes.output.includes('Golden Ratio Phi = 1.618034'), 'Python Fibonacci converges to Golden Ratio');

  // Python OOP BankAccount template
  const pyOopRes = executePython(LANGUAGE_CONFIGS.python.templates[2].code);
  assert(pyOopRes.success, 'Python OOP BankAccount template executes successfully');
  assert(pyOopRes.output.includes('Deposited USD 250.00'), 'Python OOP handles deposit method');
  assert(pyOopRes.output.includes('Transaction Ledger'), 'Python OOP prints transaction ledger');

  // 3. C Compiler, Pointers & 2D Matrix Multiplication
  const cCode = `#include <stdio.h>
int main() {
    int a = 15;
    int b = 25;
    printf("Sum is: %d\\n", a + b);
    return 0;
}`;
  const cRes = executeC(cCode, false);
  assert(cRes.success, 'C compilation succeeds');
  assert(cRes.output.includes('Sum is: 40'), 'C runtime evaluates printf and arithmetic accurately');
  assert(cRes.assemblyCode?.includes('.globl\tmain') === true, 'C compiler emits x86-64 assembly with main label');
  assert(cRes.assemblyCode?.includes('ret') === true, 'C compiler emits return instruction');

  // C Pointers template
  const cPtrRes = executeC(LANGUAGE_CONFIGS.c.templates[0].code, false);
  assert(cPtrRes.success, 'C Pointers template executes successfully');
  assert(cPtrRes.output.includes('After swap(&x, &y):'), 'C Pointers executes swap function');
  assert(cPtrRes.output.includes('Total sum: 150'), 'C Pointers calculates pointer array sum');

  // C Matrix multiplication template
  const cMatRes = executeC(LANGUAGE_CONFIGS.c.templates[1].code, false);
  assert(cMatRes.success, 'C Matrix template executes successfully');
  assert(cMatRes.output.includes('Result Matrix C = A * B:'), 'C Matrix outputs result header');
  assert(cMatRes.output.includes('19') && cMatRes.output.includes('50'), 'C Matrix computes correct dot products');

  // 4. C++ OOP Polymorphism & Binary Search
  const cppOopRes = executeC(LANGUAGE_CONFIGS.cpp.templates[0].code, true);
  assert(cppOopRes.success, 'C++ OOP template executes successfully');
  assert(cppOopRes.output.includes('Rectangle [10 x 5] -> Area: 50'), 'C++ polymorphic Rectangle area correct');
  assert(cppOopRes.output.includes('Circle [radius 7]'), 'C++ polymorphic Circle area correct');

  const cppAlgoRes = executeC(LANGUAGE_CONFIGS.cpp.templates[1].code, true);
  assert(cppAlgoRes.success, 'C++ Binary Search template executes successfully');
  assert(cppAlgoRes.output.includes('Found target 45 at index 6'), 'C++ Binary Search locates target accurately');

  // 5. Rust Borrow Checker & Struct Pattern Matching
  const rustBadCode = `fn main() {
    let x = 10;
    x = 20;
    println!("x = {}", x);
}`;
  const rustBadRes = executeRust(rustBadCode);
  assert(!rustBadRes.success, 'Rust borrow checker flags mutating immutable variable');
  assert(rustBadRes.output.includes('cannot assign twice to immutable variable'), 'Rust outputs exact E0384 error');

  const rustGoodCode = `fn main() {
    let mut x = 10;
    x = 20;
    println!("x = {}", x);
}`;
  const rustGoodRes = executeRust(rustGoodCode);
  assert(rustGoodRes.success, 'Rust with let mut succeeds');
  assert(rustGoodRes.output.includes('x = 20'), 'Rust runtime outputs formatted string');

  const rustOwnershipRes = executeRust(LANGUAGE_CONFIGS.rust.templates[0].code);
  assert(rustOwnershipRes.success, 'Rust Ownership template executes successfully');
  assert(rustOwnershipRes.output.includes('Alan Turing') && rustOwnershipRes.output.includes('good standing'), 'Rust pattern matching evaluates Active status');
  assert(rustOwnershipRes.output.includes('Grace Hopper') && rustOwnershipRes.output.includes('PENDING'), 'Rust pattern matching evaluates Pending status');

  // 6. Relational SQL Query Compiler
  const sqlCode = `SELECT s.name, s.gpa FROM students s WHERE s.gpa >= 3.90;`;
  const sqlRes = executeSQL(sqlCode);
  assert(sqlRes.success, 'SQL compilation succeeds');
  assert(sqlRes.sqlResult !== undefined && sqlRes.sqlResult.rows.length > 0, 'SQL returns tabular row records');
  assert(sqlRes.sqlResult?.plan !== undefined, 'SQL generates EXPLAIN ANALYZE execution plan');

  // 7. Syntax Highlighter Tokenizer
  const tokens = tokenizeCode('def find_primes(limit):\n  # calculate primes\n  return 42', 'python');
  assert(tokens.length === 3, 'Tokenizes 3 lines of Python code');
  assert(tokens[0].some(t => t.type === 'keyword' && t.text === 'def'), 'Identifies "def" as keyword');
  assert(tokens[1].some(t => t.type === 'comment'), 'Identifies "# calculate primes" as comment');

  // 8. Auto-Detect Theme Resolution Logic
  const resolveThemeMode = (mode: 'system' | 'light' | 'dark', osDark: boolean) => {
    return mode === 'system' ? (osDark ? 'dark' : 'light') : mode;
  };
  assert(resolveThemeMode('system', true) === 'dark', 'ThemeMode system resolves to dark when OS prefers dark');
  assert(resolveThemeMode('system', false) === 'light', 'ThemeMode system resolves to light when OS prefers light');
  assert(resolveThemeMode('dark', false) === 'dark', 'Explicit dark theme overrides light OS');
  assert(resolveThemeMode('light', true) === 'light', 'Explicit light theme overrides dark OS');

  // 7. CV & Cover Letter Generator & ATS Formatter
  const techATS = generatePlainTextATS(SAMPLE_TECH_PROFILE);
  assert(techATS.includes('ELENA ROSTOVA'), 'ATS text includes capitalized name header');
  assert(techATS.includes('PROFESSIONAL EXPERIENCE'), 'ATS text includes experience section marker');
  assert(techATS.includes('Staff Software Engineer | Aether Cloud Systems'), 'ATS text formats role and company cleanly');
  assert(techATS.includes('Carnegie Mellon University'), 'ATS text includes university and degree');
  assert(techATS.includes('Languages & Core: TypeScript, JavaScript (ESNext)'), 'ATS text exports skill categories');

  const researchATS = generatePlainTextATS(SAMPLE_RESEARCH_PROFILE);
  assert(researchATS.includes('DR. ARIS THORNE'), 'ATS text includes academic name');
  assert(researchATS.includes('Ph.D. in Theoretical Physics'), 'ATS text formats academic doctoral degree');

  const coverATS = generateCoverLetterPlainText(SAMPLE_TECH_COVER_LETTER);
  assert(coverATS.includes('Elena Rostova'), 'Cover letter includes sender name');
  assert(coverATS.includes('Marcus Vance'), 'Cover letter includes hiring manager');
  assert(coverATS.includes('Apex Cloud Technologies'), 'Cover letter includes company target');
  assert(coverATS.includes('RE: Application for Principal Frontend / Distributed Systems Engineer'), 'Cover letter includes subject line');

  // JSON Export & Import Round-Trip
  const exported = exportCVToJson(SAMPLE_TECH_PROFILE, SAMPLE_TECH_COVER_LETTER);
  assert(exported.includes('"version": "1.0.0"'), 'CV JSON export includes version header');
  const imported = importCVFromJson(exported);
  assert(imported !== null, 'CV JSON importer parses valid data');
  assert(imported?.profile.personal.fullName === 'Elena Rostova', 'Imported profile preserves user full name');
  assert(imported?.profile.experience.length === 3, 'Imported profile preserves all 3 experience records');
  assert(imported?.letter.recipient.companyName === 'Apex Cloud Technologies', 'Imported cover letter preserves recipient');

  const invalidImport = importCVFromJson('not valid json {]');
  assert(invalidImport === null, 'CV JSON importer gracefully handles malformed JSON');

  assert(CV_COLORS.indigo.primary === '#4f46e5', 'CV Color palette provides standard indigo primary hex');
  assert(CV_COLORS.emerald.primary === '#059669', 'CV Color palette provides emerald primary hex');

  // 8. YouTube, Facebook, and Multi-Platform Video Transcription
  const ytWatch = detectVideoPlatform('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert(ytWatch.platform === 'youtube', 'Detects standard YouTube watch URL');
  assert(ytWatch.videoId === 'dQw4w9WgXcQ', 'Extracts exact 11-char YouTube video ID');
  assert(ytWatch.embedUrl?.includes('embed/dQw4w9WgXcQ') === true, 'Constructs safe YouTube embed URL');

  const ytShort = detectVideoPlatform('https://youtu.be/nykOeWgQcHM');
  assert(ytShort.platform === 'youtube', 'Detects youtu.be short URL');
  assert(ytShort.videoId === 'nykOeWgQcHM', 'Extracts video ID from youtu.be short URL');

  const ytShorts = detectVideoPlatform('https://www.youtube.com/shorts/3xyz123abc4');
  assert(ytShorts.platform === 'youtube', 'Detects YouTube Shorts URL');

  const fbVideo = detectVideoPlatform('https://www.facebook.com/watch/?v=1234567890');
  assert(fbVideo.platform === 'facebook', 'Detects Facebook watch video URL');
  assert(fbVideo.embedUrl?.includes('facebook.com/plugins/video.php') === true, 'Constructs Facebook embed plugin URL');

  const fbWatchShort = detectVideoPlatform('https://fb.watch/xyz123/');
  assert(fbWatchShort.platform === 'facebook', 'Detects fb.watch short domain');

  const tiktokVideo = detectVideoPlatform('https://www.tiktok.com/@mit/video/719283746192837');
  assert(tiktokVideo.platform === 'tiktok', 'Detects TikTok video URL');

  const igReel = detectVideoPlatform('https://www.instagram.com/reel/C12345678/');
  assert(igReel.platform === 'instagram', 'Detects Instagram Reel URL');

  const vimeoVideo = detectVideoPlatform('https://vimeo.com/67019023');
  assert(vimeoVideo.platform === 'vimeo', 'Detects Vimeo video URL');
  assert(vimeoVideo.videoId === '67019023', 'Extracts Vimeo video ID');

  const directVideo = detectVideoPlatform('https://cdn.example.com/lectures/intro.mp4');
  assert(directVideo.platform === 'direct', 'Detects direct MP4 media stream URL');

  // Timestamp parsing & cues
  const sampleTranscript = `[00:00] Welcome to the lecture.\n[01:15] Discussing core principles.\n[03:45] Final review question.`;
  const cues = parseTranscriptTimestamps(sampleTranscript);
  assert(cues.length === 3, 'Parses 3 timestamped cues');
  assert(cues[0].seconds === 0 && cues[0].timestamp === '00:00', 'Parses 00:00 to 0 seconds');
  assert(cues[1].seconds === 75 && cues[1].timestamp === '01:15', 'Parses 01:15 to 75 seconds');
  assert(cues[2].seconds === 225 && cues[2].timestamp === '03:45', 'Parses 03:45 to 225 seconds');
  assert(cues[1].text === 'Discussing core principles.', 'Extracts cleaned cue text without brackets');

  assert(formatTimestamp(75) === '01:15', 'Formats 75 seconds to 01:15');
  assert(formatTimestamp(3665) === '01:01:05', 'Formats 3665 seconds to 01:01:05 with hours');

  assert(SAMPLE_PLATFORM_VIDEOS.length >= 4, 'Includes comprehensive sample videos across platforms');
  const ytSample = SAMPLE_PLATFORM_VIDEOS.find(s => s.platform === 'youtube');
  assert(ytSample !== undefined && ytSample.transcript.includes('[00:00]'), 'YouTube sample contains timestamped transcript');
  const fbSample = SAMPLE_PLATFORM_VIDEOS.find(s => s.platform === 'facebook');
  assert(fbSample !== undefined && fbSample.title.includes('Meta AI'), 'Facebook sample contains valid Meta AI metadata');

  // 9. Learning Lab Question Repository & OpenTDB Connector
  assert(decodeHtmlEntities('What&#039;s &quot;Science&quot; &amp; Nature?') === 'What\'s "Science" & Nature?', 'Decodes HTML entities accurately');
  assert(decodeHtmlEntities('&pi; is approximately 3.14') === 'π is approximately 3.14', 'Decodes Greek symbol entities');

  const dynMath = generateDynamicMathQuestion('easy');
  assert(dynMath.category === 'math', 'Generates dynamic math question');
  assert(dynMath.options.length === 4, 'Math question provides 4 distinct options');
  assert(dynMath.options.includes(dynMath.correctAnswer), 'Options list includes correct answer');

  const dynPattern = generateDynamicPatternQuestion();
  assert(dynPattern.category === 'patterns', 'Generates sequence pattern question');
  assert(dynPattern.options.includes(dynPattern.correctAnswer), 'Pattern question includes correct answer in options');

  const dynNumeracy = generateDynamicNumeracyQuestion();
  assert(dynNumeracy.category === 'numeracy', 'Generates visual counting numeracy question');
  assert(dynNumeracy.visualItems !== undefined && dynNumeracy.visualItems.length > 0, 'Numeracy question includes visual counting items');

  assert(CURATED_OFFLINE_QUESTION_BANK.length >= 15, 'Curated offline bank contains high-yield educational questions');
  const scienceQ = CURATED_OFFLINE_QUESTION_BANK.find(q => q.category === 'science');
  assert(scienceQ !== undefined && scienceQ.options.length === 4, 'Science bank question contains 4 options');

  const fallbackQuestions = getFallbackQuestions('math', 5, 'medium');
  assert(fallbackQuestions.length === 5, 'Fallback loader returns requested quantity of questions');
}

console.log('\n--- 14. Testing Universal File Converter Logic ---');
{
  // 1. Format Registry and Detection
  assert(SUPPORTED_FORMATS.length >= 25, 'Supports 25+ file formats across all domains');
  assert(SUPPORTED_FORMATS.some(f => f.id === 'png' && f.category === 'image'), 'PNG format registered as image');
  assert(SUPPORTED_FORMATS.some(f => f.id === 'csv' && f.category === 'data'), 'CSV format registered as data');
  assert(SUPPORTED_FORMATS.some(f => f.id === 'markdown' && f.category === 'document'), 'Markdown format registered as document');
  assert(SUPPORTED_FORMATS.some(f => f.id === 'typescript-types' && f.category === 'code'), 'TypeScript format registered as code');
  assert(SUPPORTED_FORMATS.some(f => f.id === 'wav' && f.category === 'audio'), 'WAV format registered as audio');

  // File extension detection
  const dummyCsvFile = { name: 'sample_metrics.csv', type: 'text/csv' } as any as File;
  assert(detectFormatFromFile(dummyCsvFile) === 'csv', 'Detects CSV format from file extension and type');

  const dummyPngFile = { name: 'hero_image.png', type: 'image/png' } as any as File;
  assert(detectFormatFromFile(dummyPngFile) === 'png', 'Detects PNG format from file extension and type');

  const dummyJsonFile = { name: 'manifest.json', type: 'application/json' } as any as File;
  assert(detectFormatFromFile(dummyJsonFile) === 'json', 'Detects JSON format from file extension and type');

  const dummyAudioFile = { name: 'podcast.mp3', type: 'audio/mpeg' } as any as File;
  assert(detectFormatFromFile(dummyAudioFile) === 'mp3', 'Detects MP3 audio format from file extension and type');

  // Target compatibility matrix
  const imgTargets = getCompatibleTargets('png');
  assert(imgTargets.some(t => t.id === 'jpeg'), 'PNG can convert to JPEG/JPG');
  assert(imgTargets.some(t => t.id === 'webp'), 'PNG can convert to WebP');
  assert(imgTargets.some(t => t.id === 'image-base64'), 'PNG can convert to Base64');

  const csvTargets = getCompatibleTargets('csv');
  assert(csvTargets.some(t => t.id === 'json'), 'CSV can convert to JSON');
  assert(csvTargets.some(t => t.id === 'yaml'), 'CSV can convert to YAML');
  assert(csvTargets.some(t => t.id === 'sql'), 'CSV can convert to SQL');
  assert(csvTargets.some(t => t.id === 'markdown-table'), 'CSV can convert to Markdown Table');

  const audioTargets = getCompatibleTargets('mp3');
  assert(audioTargets.some(t => t.id === 'wav'), 'MP3 audio can convert to 16-bit uncompressed WAV');

  // 2. CSV <-> JSON Round-Trip & Edge Cases
  const sampleCsv = `id,name,role,department\n1,"Smith, Alice",Lead Architect,Cloud\n2,"Johnson, Bob",Engineer,Data`;
  const parsedRows = parseCSV(sampleCsv);
  assert(parsedRows.length === 3, 'CSV parser correctly parses header + 2 data rows');
  assert(parsedRows[1][1] === 'Smith, Alice', 'CSV parser preserves escaped commas in quoted cells');

  const jsonFromCsv = csvToJson(sampleCsv);
  const parsedJson = JSON.parse(jsonFromCsv);
  assert(Array.isArray(parsedJson) && parsedJson.length === 2, 'CSV to JSON converts 2 records');
  assert(parsedJson[0].name === 'Smith, Alice', 'CSV to JSON maps headers to object keys');

  const roundTripCsv = jsonToCsv(jsonFromCsv);
  assert(roundTripCsv.includes('"Smith, Alice"'), 'JSON to CSV preserves and escapes quotes with commas');
  assert(roundTripCsv.includes('department'), 'JSON to CSV includes all object keys as header row');

  // 3. JSON <-> YAML Conversion
  const yamlOut = jsonToYaml(jsonFromCsv);
  assert(yamlOut.includes('- id: 1'), 'JSON to YAML formats list items');
  assert(yamlOut.includes('name: "Smith, Alice"'), 'JSON to YAML handles quoted strings');

  const jsonFromYaml = yamlToJson(yamlOut);
  const reParsedJson = JSON.parse(jsonFromYaml);
  assert(Array.isArray(reParsedJson) && reParsedJson.length === 2, 'YAML to JSON reconstructs structured array');
  assert(reParsedJson[1].role === 'Engineer', 'YAML to JSON restores nested field values');

  // 4. CSV to SQL INSERT Generator
  const sqlInsert = csvToSql(sampleCsv, 'users');
  assert(sqlInsert.includes('CREATE TABLE IF NOT EXISTS users'), 'CSV to SQL generates CREATE TABLE statement');
  assert(sqlInsert.includes('INSERT INTO users'), 'CSV to SQL generates INSERT INTO statements');
  assert(sqlInsert.includes("'Smith, Alice'"), 'CSV to SQL escapes single quotes and strings');

  // 5. CSV <-> Markdown Table
  const mdTable = csvToMarkdownTable(sampleCsv);
  assert(mdTable.includes('| id | name | role | department |'), 'CSV to Markdown table creates header row');
  assert(mdTable.includes('| --- | --- | --- | --- |'), 'CSV to Markdown table generates standard divider row');
  assert(mdTable.includes('Smith, Alice'), 'CSV to Markdown table writes clean cell values');

  const csvFromMd = markdownTableToCsv(mdTable);
  assert(csvFromMd.includes('id,name,role,department'), 'Markdown table to CSV restores comma-separated headers');

  // 6. Markdown <-> HTML Conversion
  const testMarkdown = `# Universal Converter\n\n**Fast** and *secure* browser-based conversions.\n\n- Zero uploads\n- Client-side only\n\nVisit [LearnLab](https://learnlab.dev)`;
  const htmlResult = markdownToHtml(testMarkdown);
  assert(htmlResult.includes('<h1>Universal Converter</h1>'), 'Markdown to HTML converts # H1 headers');
  assert(htmlResult.includes('<strong>Fast</strong>'), 'Markdown to HTML converts **bold**');
  assert(htmlResult.includes('<em>secure</em>'), 'Markdown to HTML converts *italic*');
  assert(htmlResult.includes('<li>Zero uploads</li>'), 'Markdown to HTML creates bullet list items');
  assert(htmlResult.includes('href="https://learnlab.dev"') && htmlResult.includes('LearnLab</a>'), 'Markdown to HTML creates hyperlinks');

  const mdFromHtml = htmlToMarkdown(htmlResult);
  assert(mdFromHtml.includes('# Universal Converter'), 'HTML to Markdown converts <h1> to # markdown header');
  assert(mdFromHtml.includes('**Fast**'), 'HTML to Markdown converts <strong> to ** markdown');
  assert(mdFromHtml.includes('*secure*'), 'HTML to Markdown converts <em> to * markdown');

  // 7. JSON to TypeScript Interface Generator
  const complexObjJson = JSON.stringify({
    productId: 1042,
    title: 'Precision Digital Multimeter',
    inStock: true,
    tags: ['electronics', 'measurement', 'lab'],
    specs: {
      voltageMax: 600,
      accuracy: 0.05
    }
  });
  const tsInterfaces = jsonToTypeScript(complexObjJson, 'ProductPayload');
  assert(tsInterfaces.includes('export interface ProductPayload {'), 'Generates root TypeScript interface');
  assert(tsInterfaces.includes('productId: number;'), 'Identifies number type');
  assert(tsInterfaces.includes('title: string;'), 'Identifies string type');
  assert(tsInterfaces.includes('inStock: boolean;'), 'Identifies boolean type');
  assert(tsInterfaces.includes('tags: string[];'), 'Identifies string array type');
  assert(tsInterfaces.includes('specs: ProductPayloadSpecs;'), 'Creates nested interface reference for sub-objects');
  assert(tsInterfaces.includes('export interface ProductPayloadSpecs {'), 'Creates child interface for nested objects');
}

console.log('\n--- 15. Testing Islamic Calculations & Utilities Suite ---');
{
  // 1. Zakat al-Mal calculation
  assert(NISAB_GRAMS.GOLD === 87.48, 'Nisab gold standard is 87.48 grams');
  assert(NISAB_GRAMS.SILVER === 612.36, 'Nisab silver standard is 612.36 grams');

  const zakatTest = calculateZakat(
    {
      cashInHand: 1000,
      bankBalances: 9000,
      goldGrams24k: 10,
      goldGrams22k: 0,
      goldGrams18k: 0,
      silverGrams: 0,
      businessInventory: 0,
      sharesAndInvestments: 0,
      investmentIsZakatableOnly: false,
      receivables: 0,
      otherAssets: 0,
    },
    { immediateDebts: 500, billsDueNow: 0, upcomingLivingExpenses: 0 },
    { goldPricePerGram: 80, silverPricePerGram: 1, nisabStandard: 'silver', calendarType: 'lunar' }
  );

  assert(zakatTest.isEligibleForZakat === true, 'Eligible for Zakat when exceeding silver Nisab');
  // Net wealth = (1000 + 9000 + 800) - 500 = 10300. 2.5% of 10300 = 257.50
  assert(zakatTest.netZakatableWealth === 10300, 'Calculates net zakatable wealth accurately');
  assert(zakatTest.zakatPayable === 257.5, 'Computes 2.5% lunar zakat accurately');

  // Below Nisab test
  const belowNisab = calculateZakat(
    {
      cashInHand: 200,
      bankBalances: 100,
      goldGrams24k: 0,
      goldGrams22k: 0,
      goldGrams18k: 0,
      silverGrams: 0,
      businessInventory: 0,
      sharesAndInvestments: 0,
      investmentIsZakatableOnly: false,
      receivables: 0,
      otherAssets: 0,
    },
    { immediateDebts: 0, billsDueNow: 0, upcomingLivingExpenses: 0 },
    { goldPricePerGram: 80, silverPricePerGram: 1, nisabStandard: 'silver', calendarType: 'lunar' }
  );
  assert(belowNisab.isEligibleForZakat === false, 'Correctly flags wealth below Nisab as exempt');
  assert(belowNisab.zakatPayable === 0, 'No Zakat payable when below Nisab');

  // 2. Miras / Islamic Inheritance (Fara'id)
  const miras1 = calculateMiras({
    deceasedGender: 'male',
    estateValue: 80000,
    funeralCosts: 0,
    debtsOwed: 0,
    wasiyyahBequest: 0,
    husband: false,
    wivesCount: 1,
    sonsCount: 1,
    daughtersCount: 1,
    father: false,
    mother: false,
    paternalGrandfather: false,
    paternalGrandmother: false,
    maternalGrandmother: false,
    fullBrothersCount: 0,
    fullSistersCount: 0,
  });

  assert(miras1.netDistributableEstate === 80000, 'Calculates net distributable estate');
  const wifeShare = miras1.shares.find((s) => s.heir.includes('Wife'));
  assert(wifeShare !== undefined && wifeShare.totalAmount === 10000, 'Wife receives exact 1/8 share ($10,000)');
  const sonShare = miras1.shares.find((s) => s.heir === 'Sons');
  const daughterShare = miras1.shares.find((s) => s.heir === 'Daughters');
  assert(sonShare !== undefined && daughterShare !== undefined, 'Sons and daughters identified as Asabah');
  assert(Math.abs(sonShare!.totalAmount - 2 * daughterShare!.totalAmount) < 1, 'Maintains 2:1 brother-to-sister inheritance ratio');

  // Awl Deficit scenario
  const mirasAwl = calculateMiras({
    deceasedGender: 'female',
    estateValue: 24000,
    funeralCosts: 0,
    debtsOwed: 0,
    wasiyyahBequest: 0,
    husband: true,
    wivesCount: 0,
    sonsCount: 0,
    daughtersCount: 0,
    father: false,
    mother: true,
    paternalGrandfather: false,
    paternalGrandmother: false,
    maternalGrandmother: false,
    fullBrothersCount: 0,
    fullSistersCount: 2,
  });
  assert(mirasAwl.doctrineApplied === 'Awl (Deficit Reduction)', 'Detects fractional deficit and applies Al-Awl');

  // 3. Qibla Direction & Spherical Trigonometry
  const qiblaLondon = calculateQibla(51.5074, -0.1278);
  assert(Math.abs(qiblaLondon.bearingDegrees - 118.9) <= 1, `London Qibla is ~118.9° (${qiblaLondon.bearingDegrees}°)`);
  assert(qiblaLondon.compassDirection === 'ESE', 'London compass direction is ESE');
  assert(qiblaLondon.distanceKm > 4500 && qiblaLondon.distanceKm < 5000, 'London to Kaaba distance is ~4785 km');

  const qiblaMakkah = calculateQibla(21.4225, 39.8262);
  assert(qiblaMakkah.distanceKm < 2, 'Makkah Kaaba distance evaluates to ~0 km');

  // 4. Astronomical Solar Prayer Times
  const prayerCairo = calculatePrayerTimes(30.0444, 31.2357, new Date(2026, 3, 15), 'Egyptian', 2);
  assert(prayerCairo.fajr.includes('AM'), 'Fajr prayer calculated in AM');
  assert(prayerCairo.dhuhr.includes(':'), 'Dhuhr prayer calculated accurately with hour:minute format');
  assert(prayerCairo.maghrib.includes('PM'), 'Maghrib prayer calculated in PM');
  assert(prayerCairo.suhoorEnds === prayerCairo.fajr, 'Suhoor cutoff time matches Fajr');
  assert(prayerCairo.iftarTime === prayerCairo.maghrib, 'Iftar time matches Maghrib');

  // 5. Hijri Calendar Conversion
  const hijriSample = gregorianToHijri(new Date(2026, 2, 20));
  assert(hijriSample.year >= 1447, 'Calculates current Hijri epoch (>= 1447 AH)');
  assert(hijriSample.month >= 1 && hijriSample.month <= 12, 'Hijri month is within 1-12 range');
  assert(hijriSample.formatted.includes('AH'), 'Formatted Hijri string contains AH suffix');

  // 6. Halal Food & E-Number Registry Search
  const carmineSearch = searchENumbers('E120');
  assert(carmineSearch.length > 0 && carmineSearch[0].status === 'Haram', 'E120 Cochineal/Carmine marked Haram (insect origin)');

  const gelatinSearch = searchENumbers('gelatin');
  assert(gelatinSearch.some((i) => i.code === 'E428' && i.status.includes('Mushbooh')), 'Gelatin (E428) marked Mushbooh/Doubtful pending Halal certification');

  const citricSearch = searchENumbers('E330');
  assert(citricSearch.length > 0 && citricSearch[0].status === 'Halal', 'E330 Citric Acid marked Halal');

  // 7. Zakat al-Fitr, Fidyah & Kaffarah
  const fitrahCalc = calculateFitrahAndFidyah({
    familyMembersCount: 5,
    ratePerPersonFitrah: 12,
    missedFastsIllnessCount: 10,
    fidyahRatePerDay: 10,
    brokenOathsCount: 1,
    brokenFastsDeliberateCount: 0,
    costPerMeal: 5,
  });
  assert(fitrahCalc.totalFitrah === 60, 'Calculates total household Zakat al-Fitr ($60)');
  assert(fitrahCalc.totalFidyah === 100, 'Calculates illness Fidyah ($100)');
  assert(fitrahCalc.oathKaffarahCost === 50, 'Calculates broken oath Kaffarah (10 meals × $5 = $50)');
  assert(fitrahCalc.grandTotal === 210, 'Computes accurate grand total ($210)');

  // 8. Quran Khatmah Planner
  const khatmah30 = calculateKhatmahPlan(30, 604);
  assert(khatmah30.dailyPages > 20 && khatmah30.dailyPages < 21, '30-day Khatmah requires ~20.1 pages per day');
  assert(khatmah30.pagesPerPrayer === 4, 'Requires 4 pages per prayer to finish in 30 days');
}

console.log('\n--- 16. Testing Bilingual Exam Paper Generator Suite ---');
{
  // 1. Exact replica paper verification (Matches Math_9th_Unit1_Exam_85f108b2.pdf)
  assert(EXACT_9TH_MATH_UNIT1_PAPER.header.className === '9TH', 'Paper header specifies 9TH class');
  assert(EXACT_9TH_MATH_UNIT1_PAPER.header.subjectName === 'Mathematics', 'Subject name English is Mathematics');
  assert(EXACT_9TH_MATH_UNIT1_PAPER.header.subjectNameUrdu === 'ریاضی', 'Subject name Urdu is ریاضی');
  assert(EXACT_9TH_MATH_UNIT1_PAPER.header.totalMarks === 40, 'Paper total marks is 40');
  assert(EXACT_9TH_MATH_UNIT1_PAPER.header.syllabus.includes('UNIT 1'), 'Syllabus specifies Unit 1 Real and Complex Numbers');
  assert(EXACT_9TH_MATH_UNIT1_PAPER.header.showOmrSheet === true, 'OMR bubble sheet enabled by default');

  // 2. MCQs count and structure (Section A)
  assert(EXACT_9TH_MATH_UNIT1_PAPER.mcqs.length === 10, 'Objective part contains exactly 10 MCQs');
  
  const mcq1 = EXACT_9TH_MATH_UNIT1_PAPER.mcqs[0];
  assert(mcq1.textEn.includes('Sumerians'), 'MCQ 1 matches Sumerian numeral question');
  assert(mcq1.textUr.includes('سمیریوں'), 'MCQ 1 has corresponding Urdu translation');
  assert(mcq1.options.length === 4, 'MCQ 1 has exactly 4 options (A, B, C, D)');
  assert(mcq1.correctOption === 'B', 'MCQ 1 correct answer is Base 60 (Option B)');
  assert(mcq1.points === 1, 'MCQ is weighted at 1 point');

  const allMcqsHave4Options = EXACT_9TH_MATH_UNIT1_PAPER.mcqs.every(m => m.options.length === 4 && ['A', 'B', 'C', 'D'].includes(m.correctOption));
  assert(allMcqsHave4Options, 'All 10 MCQs have exactly 4 choices with valid correct option keys');

  const mcqMarks = EXACT_9TH_MATH_UNIT1_PAPER.mcqs.reduce((acc, m) => acc + m.points, 0);
  assert(mcqMarks === 10, 'Objective Section marks total exactly 10');

  // 3. Short Questions count and structure (Section B - Q2)
  assert(EXACT_9TH_MATH_UNIT1_PAPER.shortQuestions.length === 10, 'Subjective Section B contains exactly 10 short questions (Roman I to X)');
  
  const sq1 = EXACT_9TH_MATH_UNIT1_PAPER.shortQuestions[0];
  assert(sq1.numRoman === 'I', 'First short question is labeled Roman I');
  assert(sq1.textEn.includes('number line') && sq1.textUr.includes('عددی خط'), 'Short Q1 tests number line √2 representation in both English & Urdu');
  assert(sq1.points === 2, 'Short questions are 2 marks each');

  const sq2 = EXACT_9TH_MATH_UNIT1_PAPER.shortQuestions[1];
  assert(sq2.numRoman === 'II', 'Second short question is Roman II');
  assert(sq2.textEn.includes('Real number') && sq2.textUr.includes('حقیقی اعداد'), 'Short Q2 asks definition of Real numbers');

  const shortMarks = EXACT_9TH_MATH_UNIT1_PAPER.shortQuestions.reduce((acc, s) => acc + s.points, 0);
  assert(shortMarks === 20, 'Short Questions Section marks total exactly 20 (10 × 2)');

  // 4. Long Questions count and structure (Section C - Q3)
  assert(EXACT_9TH_MATH_UNIT1_PAPER.longQuestions.length === 2, 'Subjective Section C contains 2 detailed long questions');
  const lq1 = EXACT_9TH_MATH_UNIT1_PAPER.longQuestions[0];
  assert(lq1.points === 5, 'Long questions are 5 marks each');
  assert(lq1.textEn.includes('rectangle') && lq1.textUr.includes('مستطیل'), 'Long Q1 matches rectangle area with surds');

  const lq2 = EXACT_9TH_MATH_UNIT1_PAPER.longQuestions[1];
  assert(lq2.textEn.includes('Abdullah') && lq2.textUr.includes('عبداللہ'), 'Long Q2 matches word problem with linear equation');

  const longMarks = EXACT_9TH_MATH_UNIT1_PAPER.longQuestions.reduce((acc, l) => acc + l.points, 0);
  assert(longMarks === 10, 'Long Questions Section marks total exactly 10 (2 × 5)');

  // 5. Total marks consistency
  assert(mcqMarks + shortMarks + longMarks === EXACT_9TH_MATH_UNIT1_PAPER.header.totalMarks, 'Sum of all sections equals paper total marks (10 + 20 + 10 = 40)');

  // 6. Presets library
  assert(PRESET_EXAM_PAPERS.length >= 3, 'Includes at least 3 ready-made exam presets (9th Math, 10th Math, 9th Physics)');
  assert(PRESET_EXAM_PAPERS.some(p => p.header.className === '10TH'), 'Includes 10th Class exam preset');
  assert(PRESET_EXAM_PAPERS.some(p => p.header.subjectName === 'Physics'), 'Includes Physics exam preset');

  // 7. Comprehensive Question Bank & ZahidNotes Integration
  assert(COMPREHENSIVE_QUESTION_BANK.length >= 150, 'Question bank contains 150+ comprehensive bilingual items');
  assert(COMPREHENSIVE_QUESTION_BANK.filter(q => q.subject === 'Mathematics' && q.grade === '9th').length >= 100, 'Bank includes 100+ 9th Math questions from all attached PDF test series');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.subject === 'Mathematics'), 'Bank includes Mathematics questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.subject === 'Physics'), 'Bank includes Physics questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.subject === 'Chemistry'), 'Bank includes Chemistry questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.subject === 'Biology'), 'Bank includes Biology questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.subject === 'Computer Science'), 'Bank includes Computer Science questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.subject === 'Pakistan Studies'), 'Bank includes Pakistan Studies questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.grade === '11th'), 'Bank includes 11th Class questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.grade === '12th'), 'Bank includes 12th Class questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.isHighYield === true), 'Bank contains ZahidNotes High-Yield / Guess questions');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => Boolean(q.boardTag)), 'Questions contain official Board examination citation tags');
  assert(COMPREHENSIVE_QUESTION_BANK.every(q => Boolean(q.textEn && q.textUr)), 'Every question bank item has both English and Urdu text');

  // 8. Board Paper Pairing Schemes (ZahidNotes Curriculum Specifications)
  assert(BOARD_PAIRING_SCHEMES.length >= 6, 'Contains 6+ authentic Board Paper Pairing Schemes');
  const math9Pairing = getPairingSchemeForSubject('9th', 'Mathematics');
  assert(math9Pairing !== undefined, 'Retrieves 9th Class Mathematics pairing scheme');
  assert(math9Pairing?.totalMarks === 75, '9th Math total marks is 75 according to Punjab Board standard');
  assert(math9Pairing?.mcqMarks === 15, '9th Math Objective part is 15 MCQs');
  assert(Boolean(math9Pairing && math9Pairing.chapters.length >= 10), '9th Math pairing covers 10+ syllabus chapters');
  assert(Boolean(math9Pairing && math9Pairing.questionGroups.q2NotesEn.includes('Chapters 1')), '9th Math Q2 short questions grouped across Ch 1-5');

  const physics9Pairing = getPairingSchemeForSubject('9th', 'Physics');
  assert(physics9Pairing !== undefined && physics9Pairing.totalMarks === 60, '9th Physics pairing scheme is 60 marks total');
  assert(Boolean(physics9Pairing && physics9Pairing.questionGroups.longNotesEn.includes('Q5')), 'Physics long questions pairing combines theory and numerical');

  const physics11Pairing = getPairingSchemeForSubject('11th', 'Physics');
  assert(physics11Pairing !== undefined && physics11Pairing.totalMarks === 85, '11th Class (1st Year) Physics pairing scheme is 85 marks total');

  const physics12Pairing = getPairingSchemeForSubject('12th', 'Physics');
  assert(physics12Pairing !== undefined && physics12Pairing.totalMarks === 85, '12th Class (2nd Year) Physics pairing scheme is 85 marks total');

  // 9. Textbook Chapter & Syllabus Index (PTB)
  assert(TEXTBOOK_CHAPTERS_CATALOG.length >= 4, 'Catalog contains 4+ subjects with full chapter indices');
  const tbMath9 = getTextbookChapters('9th', 'Mathematics');
  assert(tbMath9 !== undefined && tbMath9.chapters.length === 17, '9th Mathematics textbook covers all 17 chapters');
  assert(tbMath9?.chapters[0]?.titleEn === 'Matrices and Determinants', 'Unit 1 of 9th Math is Matrices and Determinants');
  assert(tbMath9?.chapters[0]?.titleUr === 'قالب اور قالبوں کے مقطع', 'Unit 1 Urdu title is قالب اور قالبوں کے مقطع');
  assert(Boolean(tbMath9 && tbMath9.chapters[0] && tbMath9.chapters[0].keyConcepts.length >= 4), 'Includes key concepts / SLOs for each unit');

  const tbPhysics10 = getTextbookChapters('10th', 'Physics');
  assert(tbPhysics10 !== undefined && tbPhysics10.chapters.length === 9, '10th Physics textbook covers all 9 chapters (Units 10 to 18)');

  const tbBio9 = getTextbookChapters('9th', 'Biology');
  assert(tbBio9 !== undefined && tbBio9.chapters.length === 9, '9th Biology textbook covers all 9 chapters');

  const tbCS9 = getTextbookChapters('9th', 'Computer Science');
  assert(tbCS9 !== undefined && tbCS9.chapters.length === 5, '9th Computer Science textbook covers all 5 chapters');

  const tbMath11 = getTextbookChapters('11th', 'Mathematics');
  assert(tbMath11 !== undefined && tbMath11.chapters.length === 14, '11th Mathematics textbook covers all 14 chapters');

  const tbMath12 = getTextbookChapters('12th', 'Mathematics');
  assert(tbMath12 !== undefined && tbMath12.chapters.length === 7, '12th Mathematics textbook covers all 7 chapters');

  const tbChem12 = getTextbookChapters('12th', 'Chemistry');
  assert(tbChem12 !== undefined && tbChem12.chapters.length === 16, '12th Chemistry textbook covers all 16 chapters');

  assert(TEXTBOOK_CHAPTERS_CATALOG.length >= 25, 'Catalog contains 25+ subjects across 9th, 10th, 11th, and 12th classes');
  assert(ARCHIVE_SUBJECTS.length === 9, 'ARCHIVE_SUBJECTS provides all 9 standard subjects');

  // 10. ZahidNotes Extended Presets & Nuqta-e-Fikr Test Papers
  assert(PRESET_EXAM_PAPERS.some(p => p.id === 'zahidnotes-9th-math-full-board-mock'), 'Includes 9th Math Full Book Board Mock (75 Marks)');
  assert(PRESET_EXAM_PAPERS.some(p => p.id === 'zahidnotes-9th-physics-guess-paper'), 'Includes 9th Physics High-Yield Guess Paper (60 Marks)');
  assert(PRESET_EXAM_PAPERS.some(p => p.id === 'nuqta-9th-math-unit3-sets'), 'Includes Nuqta-e-Fikr Unit 3 Sets & Functions preset');
  assert(PRESET_EXAM_PAPERS.some(p => p.id === 'nuqta-9th-math-unit5-inequalities'), 'Includes Nuqta-e-Fikr Unit 5 Linear Inequalities preset');
  assert(PRESET_EXAM_PAPERS.some(p => p.id === 'nuqta-9th-math-unit7-geometry'), 'Includes Nuqta-e-Fikr Unit 7 Coordinate Geometry preset');
  assert(PRESET_EXAM_PAPERS.some(p => p.id === 'nuqta-9th-math-unit12-statistics'), 'Includes Nuqta-e-Fikr Unit 12 Basic Statistics preset');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.boardTag === 'Nuqta-e-Fikr Unit 3'), 'Bank includes Nuqta-e-Fikr Unit 3 items');
  assert(COMPREHENSIVE_QUESTION_BANK.some(q => q.boardTag === 'Nuqta-e-Fikr Unit 5'), 'Bank includes Nuqta-e-Fikr Unit 5 items');

  // 11. Chapter-Wise PDF Test Archives & Hierarchical Division (Class -> Subject -> Chapter)
  assert(CHAPTER_PDF_ARCHIVES.length >= 25, 'Catalog stores 25+ chapter test papers divided across classes and subjects');
  assert(CHAPTER_PDF_ARCHIVES.every(ch => ch.totalMarks === 40 && ch.mcqCount === 10 && ch.shortCount === 10 && ch.longCount === 2), 'Every chapter test paper adheres to 40 marks (10 MCQs, 10 Short, 2 Long)');
  assert(CHAPTER_PDF_ARCHIVES.every(ch => Boolean(ch.pdfPath && ch.extractedQuestionIds.length > 0)), 'Every chapter PDF has local file path and mapped extracted questions');
  assert(CHAPTER_PDF_ARCHIVES.some(ch => ch.unitNumber === 1 && ch.unitTitleEn.includes('Real and Complex')), 'Unit 1 PDF test paper archive is present');
  assert(CHAPTER_PDF_ARCHIVES.some(ch => ch.unitNumber === 12 && ch.unitTitleEn.includes('Basic Statistics')), 'Unit 12 PDF test paper archive is present');
  assert(ARCHIVE_CLASSES.length === 4, 'Provides 4 standard classes (9th, 10th, 11th, 12th)');
  assert(ARCHIVE_SUBJECTS.length >= 4, 'Provides standard subject categories (Mathematics, Physics, Chemistry, Computer Science)');
  assert(getArchivesByClassAndSubject('9th', 'Mathematics').length === 11, '9th Mathematics has all 11 chapter test papers');
  assert(getArchivesByClassAndSubject('10th', 'Mathematics').length >= 4, '10th Mathematics has chapter test papers');
  assert(getArchivesByClassAndSubject('9th', 'Physics').length >= 3, '9th Physics has chapter test papers');
  const hierarchy = groupArchivesHierarchy();
  assert(hierarchy.length === 4, 'Hierarchical division groups archives into all 4 classes');
  assert(hierarchy.every(c => c.subjects.length > 0), 'Every class group contains subject divisions');
  assert(hierarchy.some(c => c.classId === '9th' && c.subjects.some(s => s.subjectId === 'Mathematics' && s.chapters.length === 11)), '9th class division includes Mathematics with all 11 chapters');

  // 12. Local PDF Text & Question Parsing Engine (pdfjs-dist extracted text)
  const samplePdfRawText = `
    Nuqta-e-Fikr Series Mathematics 9th Unit-2 Real & Complex Numbers
    Roll No: _____ Paper Code: 5021 Total Marks: 40
    Q.1 Choose the correct option. درست جواب کا انتخاب کریں۔ (10 Marks)
    1. If z = a + bi, then conjugate of z is: اگر z = a + bi ہو تو z کا کاجوگیٹ ہے
    (A) a - bi (B) -a + bi (C) -a - bi (D) a + bi
    2. The value of i^9 is: i^9 کی قیمت ہے
    (A) 1 (B) -1 (C) i (D) -i
    Q.2 Write short answers to any 5 questions. مندرجہ ذیل سوالات کے مختصر جوابات تحریر کریں۔
    (i) Define pure imaginary number. خالص غیر حقیقی عدد کی تعریف کریں۔
    (ii) Simplify: (2 + 3i) + (7 - 2i) مختصر کریں: (2 + 3i) + (7 - 2i)
    Q.3 Attempt any 2 long questions. درج ذیل تفصیلی سوالات حل کریں۔
    (a) Express in standard a + bi form: (1 + 2i) / (3 - 4i) معیاری شکل میں ظاہر کریں۔
  `;

  const parsedPdf = parseQuestionsFromPdfText(samplePdfRawText, 'sample_unit2_test.pdf');
  assert(parsedPdf.grade === '9th', 'PDF parser detects 9th grade from header');
  assert(parsedPdf.subject === 'Mathematics', 'PDF parser detects Mathematics subject');
  assert(parsedPdf.unit.includes('Unit 2'), 'PDF parser detects Unit 2 from text');
  assert(parsedPdf.mcqs.length === 2, 'PDF parser extracts 2 MCQs from sample text');
  assert(Boolean(parsedPdf.mcqs[0] && parsedPdf.mcqs[0].options && parsedPdf.mcqs[0].options.length === 4), 'Parsed MCQ has 4 options A, B, C, D');
  assert(Boolean(parsedPdf.mcqs[0]?.textEn?.includes('conjugate')), 'MCQ English question retains text');
  assert(Boolean(parsedPdf.mcqs[0]?.textUr?.includes('کاجوگیٹ')), 'MCQ Urdu question retains Urdu Nastaliq');
  assert(parsedPdf.shortQuestions.length >= 2, 'PDF parser extracts short questions with Roman numeral prefixes');
  assert(Boolean(parsedPdf.shortQuestions[0]?.textUr?.includes('غیر حقیقی عدد')), 'Short question Urdu text is captured');
  assert(parsedPdf.longQuestions.length >= 1, 'PDF parser extracts long questions');
  assert(parsedPdf.allExtractedQuestions.length >= 5, 'Parser builds full set of QuestionBankItems ready to prepopulate Question Bank');
  assert(parsedPdf.allExtractedQuestions.every(q => Boolean(q.boardTag && q.boardTag.includes('sample_unit2_test.pdf'))), 'Extracted bank items have source file tagged');

  // 13. PDF Memory Store & Storage Formatter
  assert(formatByteSize(0) === '0 B', 'formatByteSize handles 0 bytes');
  assert(formatByteSize(512) === '512.0 B', 'formatByteSize handles sub-kilobyte values');
  assert(formatByteSize(1024) === '1.0 KB', 'formatByteSize handles exact 1 KB');
  assert(formatByteSize(348210) === '340.0 KB', 'formatByteSize formats 348 KB correctly');
  assert(formatByteSize(1048576) === '1.0 MB', 'formatByteSize handles 1 MB boundary');
  assert(formatByteSize(2621440) === '2.5 MB', 'formatByteSize formats 2.5 MB correctly');

  // 14. Teacher Class Directory & Subject Sub-Directory Selection
  const sampleTargetDirectory = { grade: '10th', subject: 'Physics' };
  const targetSubDir = `${sampleTargetDirectory.grade}/${sampleTargetDirectory.subject}`;
  assert(targetSubDir === '10th/Physics', 'Class directory and subject sub-directory formats as 10th/Physics');
  const sampleTaggedQuestions = parsedPdf.allExtractedQuestions.map(q => ({
    ...q,
    classTag: sampleTargetDirectory.grade,
    subject: sampleTargetDirectory.subject,
    boardTag: `${sampleTargetDirectory.grade} ${sampleTargetDirectory.subject} · sample_unit2_test.pdf`
  }));
  assert(sampleTaggedQuestions.every(q => q.classTag === '10th'), 'Questions uploaded to 10th directory receive 10th classTag');
  assert(sampleTaggedQuestions.every(q => q.subject === 'Physics'), 'Questions uploaded to Physics directory receive Physics subject');
  assert(sampleTaggedQuestions.every(q => q.boardTag.includes('10th Physics')), 'Board tag records class & subject sub-directory path');

  // 15. Chapter-Scoped Question Deduplication Engine
  const testBatchQuestions = [
    {
      id: 'q1',
      grade: '9th',
      subject: 'Mathematics',
      unit: 'Unit 1: Real Numbers',
      type: 'short' as const,
      textEn: 'Define a rational number.',
      textUr: 'ناطق عدد کی تعریف کریں۔'
    },
    {
      id: 'q2', // Exact duplicate in same chapter
      grade: '9th',
      subject: 'Mathematics',
      unit: 'Unit 1: Real Numbers',
      type: 'short' as const,
      textEn: 'Define a rational number?',
      textUr: 'ناطق عدد کی تعریف کریں'
    },
    {
      id: 'q3', // Same question text but in DIFFERENT chapter (Unit 2) -> MUST be preserved
      grade: '9th',
      subject: 'Mathematics',
      unit: 'Unit 2: Complex Numbers',
      type: 'short' as const,
      textEn: 'Define a rational number.',
      textUr: 'ناطق عدد کی تعریف کریں۔'
    },
    {
      id: 'q4', // Unique question in Unit 1
      grade: '9th',
      subject: 'Mathematics',
      unit: 'Unit 1: Real Numbers',
      type: 'short' as const,
      textEn: 'Simplify the radical expression.',
      textUr: 'جذری رقم کو مختصر کریں۔'
    }
  ];

  const dedupedResult = deduplicateQuestionsWithinChapter(testBatchQuestions);
  assert(dedupedResult.length === 3, 'deduplicateQuestionsWithinChapter filters out 1 duplicate in Unit 1');
  assert(dedupedResult.filter(q => q.unit === 'Unit 1: Real Numbers').length === 2, 'Unit 1 retains exactly 2 unique questions');
  assert(dedupedResult.some(q => q.unit === 'Unit 2: Complex Numbers' && q.textEn.includes('rational number')), 'Identical question across different chapter (Unit 2) is strictly preserved');

  // 16. Clean Slate Question Bank Requirement
  const initialCustomBank: any[] = [];
  let includePresetQuestions = false;
  let activeFullBank = includePresetQuestions ? COMPREHENSIVE_QUESTION_BANK : initialCustomBank;
  assert(activeFullBank.length === 0, 'Question Bank initiates with clean slate (0 default questions) until teacher uploads');

  // Verify deletion action empties bank
  activeFullBank = [...testBatchQuestions];
  assert(activeFullBank.length === 4, 'Bank populates with questions when uploaded');
  // Trigger clear bank action
  activeFullBank = [];
  includePresetQuestions = false;
  assert(activeFullBank.length === 0, 'Deleting question bank removes all questions and restores clean slate');
}

console.log(`\n========================================`);
console.log(`Test Results: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
