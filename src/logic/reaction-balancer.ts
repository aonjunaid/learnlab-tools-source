/**
 * Chemical Equation Balancer and Stoichiometry Engine for LearnLab Tools.
 * Uses exact rational Gaussian elimination (null-space solver) to compute minimal integer coefficients.
 */

import { parseChemicalFormula, FormulaParseResult } from './chemistry';

export interface ReactionCompound {
  formula: string;
  coeff: number;
  parse: FormulaParseResult;
  isReactant: boolean;
}

export interface ConservationAtomCheck {
  element: string;
  reactantsCount: number;
  productsCount: number;
  isBalanced: boolean;
}

export interface BalancedReactionResult {
  isValid: boolean;
  rawInput: string;
  reactants: ReactionCompound[];
  products: ReactionCompound[];
  balancedEquationString: string;
  atomsLedger: ConservationAtomCheck[];
  error?: string;
}

export interface ReactantQuantity {
  formula: string;
  coeff: number;
  molarMass: number;
  enteredGrams?: number;
  enteredMoles?: number;
  molesUsed: number;
  gramsUsed: number;
  molesRemaining: number;
  gramsRemaining: number;
  isLimiting: boolean;
}

export interface ProductQuantity {
  formula: string;
  coeff: number;
  molarMass: number;
  theoreticalMoles: number;
  theoreticalGrams: number;
  actualGrams?: number;
  percentYield?: number;
}

export interface StoichiometryResult {
  limitingReagentFormula: string;
  reactants: ReactantQuantity[];
  products: ProductQuantity[];
  explanationSteps: string[];
}

// ----------------------------------------------------------------------
// Exact Rational Arithmetic Helper [numerator, denominator]
// ----------------------------------------------------------------------
type Rational = [bigint, bigint];

function gcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function simplifyRational(r: Rational): Rational {
  let [num, den] = r;
  if (den < 0n) {
    num = -num;
    den = -den;
  }
  if (num === 0n) return [0n, 1n];
  const g = gcd(num, den);
  return [num / g, den / g];
}

function addRational(a: Rational, b: Rational): Rational {
  const num = a[0] * b[1] + b[0] * a[1];
  const den = a[1] * b[1];
  return simplifyRational([num, den]);
}

function subRational(a: Rational, b: Rational): Rational {
  const num = a[0] * b[1] - b[0] * a[1];
  const den = a[1] * b[1];
  return simplifyRational([num, den]);
}

function mulRational(a: Rational, b: Rational): Rational {
  return simplifyRational([a[0] * b[0], a[1] * b[1]]);
}

function divRational(a: Rational, b: Rational): Rational {
  if (b[0] === 0n) throw new Error('Division by zero rational');
  return simplifyRational([a[0] * b[1], a[1] * b[0]]);
}

// ----------------------------------------------------------------------
// Chemical Equation Parser & Balancer
// ----------------------------------------------------------------------

export function balanceChemicalEquation(input: string): BalancedReactionResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: false,
      rawInput: input,
      reactants: [],
      products: [],
      balancedEquationString: '',
      atomsLedger: [],
      error: 'Please enter a chemical reaction (e.g. C6H12O6 + O2 -> CO2 + H2O).',
    };
  }

  // Split by reaction arrow: ->, -->, =, =>, →, ⇌
  const arrowRegex = /->|-->|=>|→|⇌|=/;
  const parts = trimmed.split(arrowRegex);
  if (parts.length !== 2) {
    return {
      isValid: false,
      rawInput: input,
      reactants: [],
      products: [],
      balancedEquationString: '',
      atomsLedger: [],
      error: 'Please include an arrow "->" or "=" separating reactants and products.',
    };
  }

  const reactantStrs = parts[0]
    .split('+')
    .map((s) => s.trim().replace(/^\d+/, '').trim())
    .filter(Boolean);
  const productStrs = parts[1]
    .split('+')
    .map((s) => s.trim().replace(/^\d+/, '').trim())
    .filter(Boolean);

  if (reactantStrs.length === 0 || productStrs.length === 0) {
    return {
      isValid: false,
      rawInput: input,
      reactants: [],
      products: [],
      balancedEquationString: '',
      atomsLedger: [],
      error: 'Both reactants and products must contain at least one chemical species.',
    };
  }

  // Parse each compound
  const reactantParses: FormulaParseResult[] = [];
  for (const r of reactantStrs) {
    const res = parseChemicalFormula(r);
    if (!res.isValid) {
      return {
        isValid: false,
        rawInput: input,
        reactants: [],
        products: [],
        balancedEquationString: '',
        atomsLedger: [],
        error: `Invalid reactant "${r}": ${res.error || 'unrecognized formula'}`,
      };
    }
    reactantParses.push(res);
  }

  const productParses: FormulaParseResult[] = [];
  for (const p of productStrs) {
    const res = parseChemicalFormula(p);
    if (!res.isValid) {
      return {
        isValid: false,
        rawInput: input,
        reactants: [],
        products: [],
        balancedEquationString: '',
        atomsLedger: [],
        error: `Invalid product "${p}": ${res.error || 'unrecognized formula'}`,
      };
    }
    productParses.push(res);
  }

  // Collect all unique elements
  const allElementsSet = new Set<string>();
  const allCompounds = [...reactantParses, ...productParses];
  for (const c of allCompounds) {
    for (const el of c.elements) {
      allElementsSet.add(el.element.symbol);
    }
  }

  const elementsList = Array.from(allElementsSet);
  const numElements = elementsList.length;
  const numCompounds = allCompounds.length;

  // Build matrix A: rows = elements, cols = compounds
  // reactants have positive count, products have negative count
  const matrix: Rational[][] = [];
  for (let r = 0; r < numElements; r++) {
    const elSymbol = elementsList[r];
    const row: Rational[] = [];
    for (let c = 0; c < numCompounds; c++) {
      const isReactant = c < reactantParses.length;
      const parsed = allCompounds[c];
      const match = parsed.elements.find((e) => e.element.symbol === elSymbol);
      const count = match ? match.count : 0;
      const signedCount = isReactant ? BigInt(count) : BigInt(-count);
      row.push([signedCount, 1n]);
    }
    matrix.push(row);
  }

  // Solve for nullspace of matrix A: A * x = 0
  const nullVector = solveNullSpace(matrix, numElements, numCompounds);
  if (!nullVector) {
    return {
      isValid: false,
      rawInput: input,
      reactants: [],
      products: [],
      balancedEquationString: '',
      atomsLedger: [],
      error: 'Could not balance equation. Verify all elements exist on both sides of the reaction.',
    };
  }

  // Construct balanced reactants and products
  const reactants: ReactionCompound[] = [];
  for (let i = 0; i < reactantParses.length; i++) {
    reactants.push({
      formula: reactantParses[i].formula,
      coeff: Number(nullVector[i]),
      parse: reactantParses[i],
      isReactant: true,
    });
  }

  const products: ReactionCompound[] = [];
  for (let i = 0; i < productParses.length; i++) {
    const idx = reactantParses.length + i;
    products.push({
      formula: productParses[i].formula,
      coeff: Number(nullVector[idx]),
      parse: productParses[i],
      isReactant: false,
    });
  }

  // Verify conservation of atoms
  const atomsLedger: ConservationAtomCheck[] = [];
  for (const el of elementsList) {
    let rCount = 0;
    for (const r of reactants) {
      const match = r.parse.elements.find((e) => e.element.symbol === el);
      if (match) rCount += match.count * r.coeff;
    }
    let pCount = 0;
    for (const p of products) {
      const match = p.parse.elements.find((e) => e.element.symbol === el);
      if (match) pCount += match.count * p.coeff;
    }
    atomsLedger.push({
      element: el,
      reactantsCount: rCount,
      productsCount: pCount,
      isBalanced: rCount === pCount && rCount > 0,
    });
  }

  // Format balanced equation string
  const rFormat = reactants
    .map((r) => `${r.coeff > 1 ? r.coeff : ''}${r.formula}`)
    .join(' + ');
  const pFormat = products
    .map((p) => `${p.coeff > 1 ? p.coeff : ''}${p.formula}`)
    .join(' + ');
  const balancedEquationString = `${rFormat} → ${pFormat}`;

  return {
    isValid: true,
    rawInput: input,
    reactants,
    products,
    balancedEquationString,
    atomsLedger,
  };
}

// ----------------------------------------------------------------------
// Null Space Solver via Reduced Row Echelon Form (RREF)
// ----------------------------------------------------------------------
function solveNullSpace(
  matrix: Rational[][],
  rows: number,
  cols: number
): bigint[] | null {
  // Deep clone matrix
  const A: Rational[][] = matrix.map((row) => row.map((val) => [...val] as Rational));

  // Perform Gaussian elimination to RREF
  let lead = 0;
  for (let r = 0; r < rows; r++) {
    if (lead >= cols) break;
    let i = r;
    while (A[i][lead][0] === 0n) {
      i++;
      if (i === rows) {
        i = r;
        lead++;
        if (lead === cols) break;
      }
    }
    if (lead >= cols) break;

    // Swap row i and r
    const temp = A[i];
    A[i] = A[r];
    A[r] = temp;

    // Scale row r so lead is 1
    const leadVal = A[r][lead];
    for (let j = 0; j < cols; j++) {
      A[r][j] = divRational(A[r][j], leadVal);
    }

    // Eliminate other rows
    for (let k = 0; k < rows; k++) {
      if (k !== r) {
        const factor = A[k][lead];
        for (let j = 0; j < cols; j++) {
          A[k][j] = subRational(A[k][j], mulRational(factor, A[r][j]));
        }
      }
    }
    lead++;
  }

  // Find pivot columns
  const pivotColForVar: number[] = new Array(cols).fill(-1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (A[r][c][0] !== 0n) {
        pivotColForVar[c] = r;
        break;
      }
    }
  }

  // Vector with rational entries
  const sol: Rational[] = [];
  // Set free variable at the end to 1
  for (let c = 0; c < cols - 1; c++) {
    const rowIdx = pivotColForVar[c];
    if (rowIdx !== -1) {
      const lastVal = A[rowIdx][cols - 1];
      sol.push([-lastVal[0], lastVal[1]]);
    } else {
      sol.push([0n, 1n]);
    }
  }
  sol.push([1n, 1n]); // Free variable = 1

  // If any entry is <= 0, try flipping signs
  const allNegative = sol.every((r) => r[0] < 0n);
  if (allNegative) {
    for (let i = 0; i < sol.length; i++) {
      sol[i] = [-sol[i][0], sol[i][1]];
    }
  }

  // If any is still non-positive, systematic integer search fallback for small equations
  if (sol.some((r) => r[0] <= 0n)) {
    return bruteForceSolve(matrix, rows, cols);
  }

  // Find LCM of all denominators to make all coefficients integers
  let commonDenom = 1n;
  for (const r of sol) {
    const d = r[1];
    commonDenom = (commonDenom * d) / gcd(commonDenom, d);
  }

  const intCoeffs: bigint[] = sol.map((r) => (r[0] * commonDenom) / r[1]);

  // Divide by overall GCD of all coefficients
  let overallGcd = intCoeffs[0];
  for (let i = 1; i < intCoeffs.length; i++) {
    overallGcd = gcd(overallGcd, intCoeffs[i]);
  }

  if (overallGcd > 0n) {
    for (let i = 0; i < intCoeffs.length; i++) {
      intCoeffs[i] = intCoeffs[i] / overallGcd;
    }
  }

  return intCoeffs;
}

// Small integer fallback (coefficients 1..24)
function bruteForceSolve(
  matrix: Rational[][],
  rows: number,
  cols: number
): bigint[] | null {
  if (cols > 6) return null;

  function testCoeffs(c: number[]): boolean {
    for (let r = 0; r < rows; r++) {
      let sum = 0n;
      for (let j = 0; j < cols; j++) {
        sum += matrix[r][j][0] * BigInt(c[j]);
      }
      if (sum !== 0n) return false;
    }
    return true;
  }

  const maxVal = 16;
  const c = new Array(cols).fill(1);

  function recurse(index: number): boolean {
    if (index === cols) {
      return testCoeffs(c);
    }
    for (let val = 1; val <= maxVal; val++) {
      c[index] = val;
      if (recurse(index + 1)) return true;
    }
    return false;
  }

  if (recurse(0)) {
    return c.map((v) => BigInt(v));
  }
  return null;
}

// ----------------------------------------------------------------------
// Stoichiometry & Limiting Reagent Solver
// ----------------------------------------------------------------------

export function calculateStoichiometry(
  balanced: BalancedReactionResult,
  reactantInputs: { formula: string; amount: number; unit: 'grams' | 'moles' }[],
  actualProductGrams?: { formula: string; grams: number }[]
): StoichiometryResult | null {
  if (!balanced.isValid || balanced.reactants.length === 0) return null;

  const steps: string[] = [];
  steps.push(`Balanced Equation: ${balanced.balancedEquationString}`);

  // 1. Calculate moles available for each reactant
  const reactantsData: ReactantQuantity[] = [];
  let minRatio = Infinity;
  let limitingFormula = '';

  for (const r of balanced.reactants) {
    const input = reactantInputs.find((inp) => inp.formula === r.formula);
    const molarMass = r.parse.molarMass;
    let molesAvailable = 0;
    let gramsAvailable = 0;

    if (input && input.amount > 0) {
      if (input.unit === 'grams') {
        gramsAvailable = input.amount;
        molesAvailable = input.amount / molarMass;
      } else {
        molesAvailable = input.amount;
        gramsAvailable = input.amount * molarMass;
      }
    }

    const ratio = r.coeff > 0 && molesAvailable > 0 ? molesAvailable / r.coeff : Infinity;
    if (ratio < minRatio && ratio > 0) {
      minRatio = ratio;
      limitingFormula = r.formula;
    }

    reactantsData.push({
      formula: r.formula,
      coeff: r.coeff,
      molarMass,
      enteredGrams: input?.unit === 'grams' ? input.amount : undefined,
      enteredMoles: input?.unit === 'moles' ? input.amount : undefined,
      molesUsed: 0,
      gramsUsed: 0,
      molesRemaining: 0,
      gramsRemaining: 0,
      isLimiting: false,
    });
  }

  // If no reactant amounts provided, cannot proceed
  if (minRatio === Infinity || !limitingFormula) {
    return null;
  }

  steps.push(
    `Limiting Reagent Determination: Reactant with minimum (Moles / Coefficient) is ${limitingFormula} (ratio = ${minRatio.toFixed(4)} mol/equiv).`
  );

  // 2. Compute consumption and remaining for each reactant
  for (const rData of reactantsData) {
    const coeff = rData.coeff;
    const molesConsumed = minRatio * coeff;
    const gramsConsumed = molesConsumed * rData.molarMass;

    const totalMoles = (rData.enteredMoles ?? (rData.enteredGrams ? rData.enteredGrams / rData.molarMass : 0));
    const totalGrams = (rData.enteredGrams ?? (rData.enteredMoles ? rData.enteredMoles * rData.molarMass : 0));

    const molesRemaining = Math.max(0, totalMoles - molesConsumed);
    const gramsRemaining = Math.max(0, totalGrams - gramsConsumed);

    rData.molesUsed = molesConsumed;
    rData.gramsUsed = gramsConsumed;
    rData.molesRemaining = molesRemaining;
    rData.gramsRemaining = gramsRemaining;
    rData.isLimiting = rData.formula === limitingFormula;

    steps.push(
      `${rData.formula}: Consumed ${molesConsumed.toFixed(4)} mol (${gramsConsumed.toFixed(2)} g); Remaining: ${gramsRemaining.toFixed(2)} g.`
    );
  }

  // 3. Compute theoretical yields for products
  const productsData: ProductQuantity[] = [];
  for (const p of balanced.products) {
    const theoreticalMoles = minRatio * p.coeff;
    const theoreticalGrams = theoreticalMoles * p.parse.molarMass;

    const actual = actualProductGrams?.find((a) => a.formula === p.formula);
    let percentYield: number | undefined = undefined;
    if (actual && actual.grams >= 0 && theoreticalGrams > 0) {
      percentYield = (actual.grams / theoreticalGrams) * 100;
    }

    productsData.push({
      formula: p.formula,
      coeff: p.coeff,
      molarMass: p.parse.molarMass,
      theoreticalMoles,
      theoreticalGrams,
      actualGrams: actual?.grams,
      percentYield,
    });

    steps.push(
      `Product ${p.formula}: Theoretical Yield = ${theoreticalMoles.toFixed(4)} mol × ${p.parse.molarMass.toFixed(2)} g/mol = ${theoreticalGrams.toFixed(2)} g.`
    );
  }

  return {
    limitingReagentFormula: limitingFormula,
    reactants: reactantsData,
    products: productsData,
    explanationSteps: steps,
  };
}
