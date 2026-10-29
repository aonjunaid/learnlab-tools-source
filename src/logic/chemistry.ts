/**
 * Chemistry core calculations and periodic table data for LearnLab Tools.
 */

export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  atomicMass: number;
  group: number; // 1-18 (0 for lanthanides/actinides)
  period: number; // 1-7
  category:
    | 'alkali-metal'
    | 'alkaline-earth'
    | 'transition-metal'
    | 'post-transition'
    | 'metalloid'
    | 'reactive-nonmetal'
    | 'noble-gas'
    | 'lanthanide'
    | 'actinide'
    | 'unknown';
  electronegativity?: number; // Pauling scale
  electronConfig: string;
  standardState: 'solid' | 'liquid' | 'gas' | 'unknown';
}

// 118 Elements with standard atomic weights
export const PERIODIC_TABLE: ElementData[] = [
  { number: 1, symbol: 'H', name: 'Hydrogen', atomicMass: 1.008, group: 1, period: 1, category: 'reactive-nonmetal', electronegativity: 2.20, electronConfig: '1s¹', standardState: 'gas' },
  { number: 2, symbol: 'He', name: 'Helium', atomicMass: 4.0026, group: 18, period: 1, category: 'noble-gas', electronConfig: '1s²', standardState: 'gas' },
  { number: 3, symbol: 'Li', name: 'Lithium', atomicMass: 6.94, group: 1, period: 2, category: 'alkali-metal', electronegativity: 0.98, electronConfig: '[He] 2s¹', standardState: 'solid' },
  { number: 4, symbol: 'Be', name: 'Beryllium', atomicMass: 9.0122, group: 2, period: 2, category: 'alkaline-earth', electronegativity: 1.57, electronConfig: '[He] 2s²', standardState: 'solid' },
  { number: 5, symbol: 'B', name: 'Boron', atomicMass: 10.81, group: 13, period: 2, category: 'metalloid', electronegativity: 2.04, electronConfig: '[He] 2s² 2p¹', standardState: 'solid' },
  { number: 6, symbol: 'C', name: 'Carbon', atomicMass: 12.011, group: 14, period: 2, category: 'reactive-nonmetal', electronegativity: 2.55, electronConfig: '[He] 2s² 2p²', standardState: 'solid' },
  { number: 7, symbol: 'N', name: 'Nitrogen', atomicMass: 14.007, group: 15, period: 2, category: 'reactive-nonmetal', electronegativity: 3.04, electronConfig: '[He] 2s² 2p³', standardState: 'gas' },
  { number: 8, symbol: 'O', name: 'Oxygen', atomicMass: 15.999, group: 16, period: 2, category: 'reactive-nonmetal', electronegativity: 3.44, electronConfig: '[He] 2s² 2p⁴', standardState: 'gas' },
  { number: 9, symbol: 'F', name: 'Fluorine', atomicMass: 18.998, group: 17, period: 2, category: 'reactive-nonmetal', electronegativity: 3.98, electronConfig: '[He] 2s² 2p⁵', standardState: 'gas' },
  { number: 10, symbol: 'Ne', name: 'Neon', atomicMass: 20.180, group: 18, period: 2, category: 'noble-gas', electronConfig: '[He] 2s² 2p⁶', standardState: 'gas' },
  { number: 11, symbol: 'Na', name: 'Sodium', atomicMass: 22.990, group: 1, period: 3, category: 'alkali-metal', electronegativity: 0.93, electronConfig: '[Ne] 3s¹', standardState: 'solid' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', atomicMass: 24.305, group: 2, period: 3, category: 'alkaline-earth', electronegativity: 1.31, electronConfig: '[Ne] 3s²', standardState: 'solid' },
  { number: 13, symbol: 'Al', name: 'Aluminium', atomicMass: 26.982, group: 13, period: 3, category: 'post-transition', electronegativity: 1.61, electronConfig: '[Ne] 3s² 3p¹', standardState: 'solid' },
  { number: 14, symbol: 'Si', name: 'Silicon', atomicMass: 28.085, group: 14, period: 3, category: 'metalloid', electronegativity: 1.90, electronConfig: '[Ne] 3s² 3p²', standardState: 'solid' },
  { number: 15, symbol: 'P', name: 'Phosphorus', atomicMass: 30.974, group: 15, period: 3, category: 'reactive-nonmetal', electronegativity: 2.19, electronConfig: '[Ne] 3s² 3p³', standardState: 'solid' },
  { number: 16, symbol: 'S', name: 'Sulfur', atomicMass: 32.06, group: 16, period: 3, category: 'reactive-nonmetal', electronegativity: 2.58, electronConfig: '[Ne] 3s² 3p⁴', standardState: 'solid' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', atomicMass: 35.45, group: 17, period: 3, category: 'reactive-nonmetal', electronegativity: 3.16, electronConfig: '[Ne] 3s² 3p⁵', standardState: 'gas' },
  { number: 18, symbol: 'Ar', name: 'Argon', atomicMass: 39.948, group: 18, period: 3, category: 'noble-gas', electronConfig: '[Ne] 3s² 3p⁶', standardState: 'gas' },
  { number: 19, symbol: 'K', name: 'Potassium', atomicMass: 39.098, group: 1, period: 4, category: 'alkali-metal', electronegativity: 0.82, electronConfig: '[Ar] 4s¹', standardState: 'solid' },
  { number: 20, symbol: 'Ca', name: 'Calcium', atomicMass: 40.078, group: 2, period: 4, category: 'alkaline-earth', electronegativity: 1.00, electronConfig: '[Ar] 4s²', standardState: 'solid' },
  { number: 21, symbol: 'Sc', name: 'Scandium', atomicMass: 44.956, group: 3, period: 4, category: 'transition-metal', electronegativity: 1.36, electronConfig: '[Ar] 3d¹ 4s²', standardState: 'solid' },
  { number: 22, symbol: 'Ti', name: 'Titanium', atomicMass: 47.867, group: 4, period: 4, category: 'transition-metal', electronegativity: 1.54, electronConfig: '[Ar] 3d² 4s²', standardState: 'solid' },
  { number: 23, symbol: 'V', name: 'Vanadium', atomicMass: 50.942, group: 5, period: 4, category: 'transition-metal', electronegativity: 1.63, electronConfig: '[Ar] 3d³ 4s²', standardState: 'solid' },
  { number: 24, symbol: 'Cr', name: 'Chromium', atomicMass: 51.996, group: 6, period: 4, category: 'transition-metal', electronegativity: 1.66, electronConfig: '[Ar] 3d⁵ 4s¹', standardState: 'solid' },
  { number: 25, symbol: 'Mn', name: 'Manganese', atomicMass: 54.938, group: 7, period: 4, category: 'transition-metal', electronegativity: 1.55, electronConfig: '[Ar] 3d⁵ 4s²', standardState: 'solid' },
  { number: 26, symbol: 'Fe', name: 'Iron', atomicMass: 55.845, group: 8, period: 4, category: 'transition-metal', electronegativity: 1.83, electronConfig: '[Ar] 3d⁶ 4s²', standardState: 'solid' },
  { number: 27, symbol: 'Co', name: 'Cobalt', atomicMass: 58.933, group: 9, period: 4, category: 'transition-metal', electronegativity: 1.88, electronConfig: '[Ar] 3d⁷ 4s²', standardState: 'solid' },
  { number: 28, symbol: 'Ni', name: 'Nickel', atomicMass: 58.693, group: 10, period: 4, category: 'transition-metal', electronegativity: 1.91, electronConfig: '[Ar] 3d⁸ 4s²', standardState: 'solid' },
  { number: 29, symbol: 'Cu', name: 'Copper', atomicMass: 63.546, group: 11, period: 4, category: 'transition-metal', electronegativity: 1.90, electronConfig: '[Ar] 3d¹⁰ 4s¹', standardState: 'solid' },
  { number: 30, symbol: 'Zn', name: 'Zinc', atomicMass: 65.38, group: 12, period: 4, category: 'transition-metal', electronegativity: 1.65, electronConfig: '[Ar] 3d¹⁰ 4s²', standardState: 'solid' },
  { number: 31, symbol: 'Ga', name: 'Gallium', atomicMass: 69.723, group: 13, period: 4, category: 'post-transition', electronegativity: 1.81, electronConfig: '[Ar] 3d¹⁰ 4s² 4p¹', standardState: 'solid' },
  { number: 32, symbol: 'Ge', name: 'Germanium', atomicMass: 72.630, group: 14, period: 4, category: 'metalloid', electronegativity: 2.01, electronConfig: '[Ar] 3d¹⁰ 4s² 4p²', standardState: 'solid' },
  { number: 33, symbol: 'As', name: 'Arsenic', atomicMass: 74.922, group: 15, period: 4, category: 'metalloid', electronegativity: 2.18, electronConfig: '[Ar] 3d¹⁰ 4s² 4p³', standardState: 'solid' },
  { number: 34, symbol: 'Se', name: 'Selenium', atomicMass: 78.971, group: 16, period: 4, category: 'reactive-nonmetal', electronegativity: 2.55, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁴', standardState: 'solid' },
  { number: 35, symbol: 'Br', name: 'Bromine', atomicMass: 79.904, group: 17, period: 4, category: 'reactive-nonmetal', electronegativity: 2.96, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', standardState: 'liquid' },
  { number: 36, symbol: 'Kr', name: 'Krypton', atomicMass: 83.798, group: 18, period: 4, category: 'noble-gas', electronegativity: 3.00, electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁶', standardState: 'gas' },
  { number: 37, symbol: 'Rb', name: 'Rubidium', atomicMass: 85.468, group: 1, period: 5, category: 'alkali-metal', electronegativity: 0.82, electronConfig: '[Kr] 5s¹', standardState: 'solid' },
  { number: 38, symbol: 'Sr', name: 'Strontium', atomicMass: 87.62, group: 2, period: 5, category: 'alkaline-earth', electronegativity: 0.95, electronConfig: '[Kr] 5s²', standardState: 'solid' },
  { number: 39, symbol: 'Y', name: 'Yttrium', atomicMass: 88.906, group: 3, period: 5, category: 'transition-metal', electronegativity: 1.22, electronConfig: '[Kr] 4d¹ 5s²', standardState: 'solid' },
  { number: 40, symbol: 'Zr', name: 'Zirconium', atomicMass: 91.224, group: 4, period: 5, category: 'transition-metal', electronegativity: 1.33, electronConfig: '[Kr] 4d² 5s²', standardState: 'solid' },
  { number: 41, symbol: 'Nb', name: 'Niobium', atomicMass: 92.906, group: 5, period: 5, category: 'transition-metal', electronegativity: 1.6, electronConfig: '[Kr] 4d⁴ 5s¹', standardState: 'solid' },
  { number: 42, symbol: 'Mo', name: 'Molybdenum', atomicMass: 95.95, group: 6, period: 5, category: 'transition-metal', electronegativity: 2.16, electronConfig: '[Kr] 4d⁵ 5s¹', standardState: 'solid' },
  { number: 43, symbol: 'Tc', name: 'Technetium', atomicMass: 98.0, group: 7, period: 5, category: 'transition-metal', electronegativity: 1.9, electronConfig: '[Kr] 4d⁵ 5s²', standardState: 'solid' },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', atomicMass: 101.07, group: 8, period: 5, category: 'transition-metal', electronegativity: 2.2, electronConfig: '[Kr] 4d⁷ 5s¹', standardState: 'solid' },
  { number: 45, symbol: 'Rh', name: 'Rhodium', atomicMass: 102.91, group: 9, period: 5, category: 'transition-metal', electronegativity: 2.28, electronConfig: '[Kr] 4d⁸ 5s¹', standardState: 'solid' },
  { number: 46, symbol: 'Pd', name: 'Palladium', atomicMass: 106.42, group: 10, period: 5, category: 'transition-metal', electronegativity: 2.20, electronConfig: '[Kr] 4d¹⁰', standardState: 'solid' },
  { number: 47, symbol: 'Ag', name: 'Silver', atomicMass: 107.87, group: 11, period: 5, category: 'transition-metal', electronegativity: 1.93, electronConfig: '[Kr] 4d¹⁰ 5s¹', standardState: 'solid' },
  { number: 48, symbol: 'Cd', name: 'Cadmium', atomicMass: 112.41, group: 12, period: 5, category: 'transition-metal', electronegativity: 1.69, electronConfig: '[Kr] 4d¹⁰ 5s²', standardState: 'solid' },
  { number: 49, symbol: 'In', name: 'Indium', atomicMass: 114.82, group: 13, period: 5, category: 'post-transition', electronegativity: 1.78, electronConfig: '[Kr] 4d¹⁰ 5s² 5p¹', standardState: 'solid' },
  { number: 50, symbol: 'Sn', name: 'Tin', atomicMass: 118.71, group: 14, period: 5, category: 'post-transition', electronegativity: 1.96, electronConfig: '[Kr] 4d¹⁰ 5s² 5p²', standardState: 'solid' },
  { number: 51, symbol: 'Sb', name: 'Antimony', atomicMass: 121.76, group: 15, period: 5, category: 'metalloid', electronegativity: 2.05, electronConfig: '[Kr] 4d¹⁰ 5s² 5p³', standardState: 'solid' },
  { number: 52, symbol: 'Te', name: 'Tellurium', atomicMass: 127.60, group: 16, period: 5, category: 'metalloid', electronegativity: 2.1, electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁴', standardState: 'solid' },
  { number: 53, symbol: 'I', name: 'Iodine', atomicMass: 126.90, group: 17, period: 5, category: 'reactive-nonmetal', electronegativity: 2.66, electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', standardState: 'solid' },
  { number: 54, symbol: 'Xe', name: 'Xenon', atomicMass: 131.29, group: 18, period: 5, category: 'noble-gas', electronegativity: 2.6, electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁶', standardState: 'gas' },
  { number: 55, symbol: 'Cs', name: 'Caesium', atomicMass: 132.91, group: 1, period: 6, category: 'alkali-metal', electronegativity: 0.79, electronConfig: '[Xe] 6s¹', standardState: 'solid' },
  { number: 56, symbol: 'Ba', name: 'Barium', atomicMass: 137.33, group: 2, period: 6, category: 'alkaline-earth', electronegativity: 0.89, electronConfig: '[Xe] 6s²', standardState: 'solid' },
  { number: 57, symbol: 'La', name: 'Lanthanum', atomicMass: 138.91, group: 0, period: 6, category: 'lanthanide', electronegativity: 1.1, electronConfig: '[Xe] 5d¹ 6s²', standardState: 'solid' },
  { number: 58, symbol: 'Ce', name: 'Cerium', atomicMass: 140.12, group: 0, period: 6, category: 'lanthanide', electronegativity: 1.12, electronConfig: '[Xe] 4f¹ 5d¹ 6s²', standardState: 'solid' },
  { number: 74, symbol: 'W', name: 'Tungsten', atomicMass: 183.84, group: 6, period: 6, category: 'transition-metal', electronegativity: 2.36, electronConfig: '[Xe] 4f¹⁴ 5d⁴ 6s²', standardState: 'solid' },
  { number: 78, symbol: 'Pt', name: 'Platinum', atomicMass: 195.08, group: 10, period: 6, category: 'transition-metal', electronegativity: 2.28, electronConfig: '[Xe] 4f¹⁴ 5d⁹ 6s¹', standardState: 'solid' },
  { number: 79, symbol: 'Au', name: 'Gold', atomicMass: 196.97, group: 11, period: 6, category: 'transition-metal', electronegativity: 2.54, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', standardState: 'solid' },
  { number: 80, symbol: 'Hg', name: 'Mercury', atomicMass: 200.59, group: 12, period: 6, category: 'transition-metal', electronegativity: 2.00, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', standardState: 'liquid' },
  { number: 82, symbol: 'Pb', name: 'Lead', atomicMass: 207.2, group: 14, period: 6, category: 'post-transition', electronegativity: 2.33, electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', standardState: 'solid' },
  { number: 92, symbol: 'U', name: 'Uranium', atomicMass: 238.03, group: 0, period: 7, category: 'actinide', electronegativity: 1.38, electronConfig: '[Rn] 5f³ 6d¹ 7s²', standardState: 'solid' }
];

// Map by symbol for quick lookup
export const ELEMENT_MAP: Record<string, ElementData> = {};
for (const el of PERIODIC_TABLE) {
  ELEMENT_MAP[el.symbol] = el;
}

/**
 * 1. Chemical Formula Parser
 * Parses formulas including parentheses and hydrates:
 * e.g. H2O, Ca(OH)2, Al2(SO4)3, CuSO4*5H2O, K4[Fe(CN)6]
 */
export interface FormulaElementCount {
  element: ElementData;
  count: number;
  totalMass: number;
  massPercent: number;
}

export interface FormulaParseResult {
  isValid: boolean;
  formula: string;
  elements: FormulaElementCount[];
  molarMass: number;
  error?: string;
}

export function parseChemicalFormula(input: string): FormulaParseResult {
  const clean = input.trim().replace(/\s+/g, '');
  if (!clean) {
    return { isValid: false, formula: input, elements: [], molarMass: 0, error: 'Please enter a chemical formula.' };
  }

  try {
    // Check for hydrate format (e.g., CuSO4*5H2O or CuSO4.5H2O or CuSO4·5H2O)
    const hydrateParts = clean.split(/[*·.]/);
    const mainFormula = hydrateParts[0];
    const hydrateStr = hydrateParts[1];

    const elementCounts: Record<string, number> = {};

    function parseSubFormula(str: string, multiplier: number = 1) {
      let i = 0;
      function parseGroup(): Record<string, number> {
        const groupCounts: Record<string, number> = {};
        while (i < str.length) {
          const char = str[i];
          if (char === '(' || char === '[' || char === '{') {
            i++;
            const inner = parseGroup();
            let count = 1;
            const matchCount = str.slice(i).match(/^(\d+)/);
            if (matchCount) {
              count = parseInt(matchCount[1], 10);
              i += matchCount[1].length;
            }
            for (const [sym, c] of Object.entries(inner)) {
              groupCounts[sym] = (groupCounts[sym] || 0) + c * count;
            }
          } else if (char === ')' || char === ']' || char === '}') {
            i++;
            return groupCounts;
          } else if (/[A-Z]/.test(char)) {
            // Element match (1 upper, optional 1 lower)
            let symbol = char;
            i++;
            if (i < str.length && /[a-z]/.test(str[i])) {
              symbol += str[i];
              i++;
            }
            let count = 1;
            const matchCount = str.slice(i).match(/^(\d+)/);
            if (matchCount) {
              count = parseInt(matchCount[1], 10);
              i += matchCount[1].length;
            }
            groupCounts[symbol] = (groupCounts[symbol] || 0) + count;
          } else {
            i++;
          }
        }
        return groupCounts;
      }

      const res = parseGroup();
      for (const [sym, count] of Object.entries(res)) {
        elementCounts[sym] = (elementCounts[sym] || 0) + count * multiplier;
      }
    }

    parseSubFormula(mainFormula, 1);

    // Handle hydrate part if present (e.g., 5H2O)
    if (hydrateStr) {
      const matchCoeff = hydrateStr.match(/^(\d+)?(.*)$/);
      const coeff = matchCoeff && matchCoeff[1] ? parseInt(matchCoeff[1], 10) : 1;
      const subWater = matchCoeff ? matchCoeff[2] : hydrateStr;
      parseSubFormula(subWater || 'H2O', coeff);
    }

    // Calculate total molar mass
    let totalMolarMass = 0;
    const elementsList: FormulaElementCount[] = [];

    for (const [symbol, count] of Object.entries(elementCounts)) {
      const el = ELEMENT_MAP[symbol];
      if (!el) {
        return {
          isValid: false,
          formula: input,
          elements: [],
          molarMass: 0,
          error: `Unknown chemical element symbol: "${symbol}"`,
        };
      }
      const mass = el.atomicMass * count;
      totalMolarMass += mass;
      elementsList.push({
        element: el,
        count,
        totalMass: mass,
        massPercent: 0,
      });
    }

    // Calculate percentages
    for (const item of elementsList) {
      item.massPercent = totalMolarMass > 0 ? (item.totalMass / totalMolarMass) * 100 : 0;
    }

    // Sort by mass descending
    elementsList.sort((a, b) => b.totalMass - a.totalMass);

    return {
      isValid: true,
      formula: clean,
      elements: elementsList,
      molarMass: Number(totalMolarMass.toFixed(4)),
    };
  } catch (err: any) {
    return {
      isValid: false,
      formula: input,
      elements: [],
      molarMass: 0,
      error: 'Malformed chemical formula syntax.',
    };
  }
}

/**
 * 2. Solution Preparation from Molarity & Volume
 * Mass (g) = Molarity (mol/L) * Volume (L) * Molar Mass (g/mol)
 */
export function calculateSolutionMass(molarity: number, volumeL: number, molarMass: number) {
  if (molarity < 0 || volumeL < 0 || molarMass <= 0) {
    return { isValid: false, massGrams: 0, error: 'Inputs must be positive numbers.' };
  }
  const massGrams = molarity * volumeL * molarMass;
  const moles = molarity * volumeL;
  return {
    isValid: true,
    massGrams: Number(massGrams.toFixed(4)),
    moles: Number(moles.toFixed(5)),
  };
}

/**
 * 3. Solution Dilution (M1 * V1 = M2 * V2)
 */
export function solveDilution(
  target: 'm1' | 'v1' | 'm2' | 'v2',
  knowns: { m1?: number; v1?: number; m2?: number; v2?: number }
) {
  const { m1, v1, m2, v2 } = knowns;

  switch (target) {
    case 'm1':
      if (v1 && v1 > 0 && m2 !== undefined && v2 !== undefined) {
        return { isValid: true, result: (m2 * v2) / v1, formula: 'M₁ = (M₂ × V₂) / V₁' };
      }
      break;
    case 'v1':
      if (m1 && m1 > 0 && m2 !== undefined && v2 !== undefined) {
        const res = (m2 * v2) / m1;
        const solventNeeded = v2 - res;
        return {
          isValid: true,
          result: res,
          solventNeeded: Math.max(0, solventNeeded),
          formula: 'V₁ = (M₂ × V₂) / M₁',
        };
      }
      break;
    case 'm2':
      if (v2 && v2 > 0 && m1 !== undefined && v1 !== undefined) {
        return { isValid: true, result: (m1 * v1) / v2, formula: 'M₂ = (M₁ × V₁) / V₂' };
      }
      break;
    case 'v2':
      if (m2 && m2 > 0 && m1 !== undefined && v1 !== undefined) {
        return { isValid: true, result: (m1 * v1) / m2, formula: 'V₂ = (M₁ × V₁) / M₂' };
      }
      break;
  }

  return { isValid: false, result: 0, error: 'Please provide valid non-zero known values.' };
}

export type AcidBaseResult =
  | {
      isValid: true;
      pH: number;
      pOH: number;
      concH: number;
      concOH: number;
      nature: 'Acidic' | 'Neutral' | 'Basic';
    }
  | {
      isValid: false;
      pH?: number;
      pOH?: number;
      concH?: number;
      concOH?: number;
      nature?: 'Acidic' | 'Neutral' | 'Basic';
      error: string;
    };

/**
 * 4. pH, pOH, [H+], [OH-] conversions at 25°C
 * Kw = 1.0e-14
 */
export function calculateAcidBase(inputVal: number, inputType: 'pH' | 'pOH' | 'H' | 'OH'): AcidBaseResult {
  if (inputVal <= 0 && (inputType === 'H' || inputType === 'OH')) {
    return { isValid: false, error: 'Concentrations must be strictly greater than 0.' };
  }

  let pH = 7;
  let pOH = 7;
  let concH = 1e-7;
  let concOH = 1e-7;

  switch (inputType) {
    case 'pH':
      pH = inputVal;
      pOH = 14 - pH;
      concH = Math.pow(10, -pH);
      concOH = Math.pow(10, -pOH);
      break;
    case 'pOH':
      pOH = inputVal;
      pH = 14 - pOH;
      concH = Math.pow(10, -pH);
      concOH = Math.pow(10, -pOH);
      break;
    case 'H':
      concH = inputVal;
      pH = -Math.log10(concH);
      pOH = 14 - pH;
      concOH = 1e-14 / concH;
      break;
    case 'OH':
      concOH = inputVal;
      pOH = -Math.log10(concOH);
      pH = 14 - pOH;
      concH = 1e-14 / concOH;
      break;
  }

  const nature: 'Acidic' | 'Neutral' | 'Basic' =
    pH < 6.99 ? 'Acidic' : pH > 7.01 ? 'Basic' : 'Neutral';

  return {
    isValid: true,
    pH: Number(pH.toFixed(3)),
    pOH: Number(pOH.toFixed(3)),
    concH: concH,
    concOH: concOH,
    nature,
  };
}

/**
 * 5. Henderson-Hasselbalch Buffer Equation
 * pH = pKa + log10([Conjugate Base] / [Weak Acid])
 */
export function calculateHendersonHasselbalch(pKa: number, baseConc: number, acidConc: number) {
  if (baseConc <= 0 || acidConc <= 0) {
    return { isValid: false, pH: 0, error: 'Base and acid concentrations must be positive.' };
  }
  const ratio = baseConc / acidConc;
  const pH = pKa + Math.log10(ratio);
  return {
    isValid: true,
    pH: Number(pH.toFixed(3)),
    ratio: Number(ratio.toFixed(4)),
  };
}

/**
 * 6. Ideal Gas Law (PV = nRT)
 * R = 0.082057 L·atm / (mol·K)
 */
export function solveIdealGas(
  target: 'P' | 'V' | 'n' | 'T',
  values: { P?: number; V?: number; n?: number; T?: number }
) {
  const R = 0.0820574; // L·atm / (mol·K)
  const { P, V, n, T } = values;

  switch (target) {
    case 'P':
      if (V && V > 0 && n && n > 0 && T && T > 0) {
        return { isValid: true, value: (n * R * T) / V, unit: 'atm', formula: 'P = (n × R × T) / V' };
      }
      break;
    case 'V':
      if (P && P > 0 && n && n > 0 && T && T > 0) {
        return { isValid: true, value: (n * R * T) / P, unit: 'L', formula: 'V = (n × R × T) / P' };
      }
      break;
    case 'n':
      if (P && P > 0 && V && V > 0 && T && T > 0) {
        return { isValid: true, value: (P * V) / (R * T), unit: 'moles', formula: 'n = (P × V) / (R × T)' };
      }
      break;
    case 'T':
      if (P && P > 0 && V && V > 0 && n && n > 0) {
        const kelvin = (P * V) / (n * R);
        return {
          isValid: true,
          value: kelvin,
          celsius: kelvin - 273.15,
          unit: 'K',
          formula: 'T = (P × V) / (n × R)',
        };
      }
      break;
  }

  return { isValid: false, value: 0, error: 'Provide positive values for known variables.' };
}
