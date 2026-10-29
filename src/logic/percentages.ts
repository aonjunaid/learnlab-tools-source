/**
 * Pure calculation functions for Percentage operations.
 * Handles zero denominators, invalid values, and edge cases.
 */

export interface PercentageOfResult {
  value: number;
  formula: string;
  steps: string[];
}

export interface PercentageShareResult {
  percentage: number;
  formula: string;
  steps: string[];
  isUndefined?: boolean;
}

export interface PercentageChangeResult {
  absoluteChange: number;
  percentageChange: number;
  type: 'increase' | 'decrease' | 'no-change';
  formula: string;
  steps: string[];
  isUndefined?: boolean;
}

export interface ReversePercentageResult {
  baseValue: number;
  formula: string;
  steps: string[];
  isUndefined?: boolean;
}

export function calculatePercentageOf(percent: number, total: number): PercentageOfResult {
  if (isNaN(percent) || isNaN(total)) {
    return { value: 0, formula: 'Invalid input', steps: [] };
  }
  const value = (percent / 100) * total;
  return {
    value,
    formula: `(${percent} / 100) × ${total}`,
    steps: [
      `Convert percentage to decimal: ${percent}% = ${percent / 100}`,
      `Multiply decimal by base value: ${percent / 100} × ${total} = ${value}`
    ]
  };
}

export function calculatePercentageShare(part: number, total: number): PercentageShareResult {
  if (isNaN(part) || isNaN(total)) {
    return { percentage: 0, formula: 'Invalid input', steps: [], isUndefined: true };
  }
  if (total === 0) {
    return {
      percentage: 0,
      formula: `(${part} / 0) × 100`,
      steps: ['Cannot compute percentage share when the base denominator is 0 (division by zero is undefined).'],
      isUndefined: true
    };
  }
  const percentage = (part / total) * 100;
  return {
    percentage,
    formula: `(${part} / ${total}) × 100`,
    steps: [
      `Divide part by whole: ${part} / ${total} = ${(part / total).toFixed(6)}`,
      `Multiply by 100 to convert to percentage: ${(part / total).toFixed(6)} × 100 = ${percentage.toFixed(4)}%`
    ]
  };
}

export function calculatePercentageChange(original: number, newValue: number): PercentageChangeResult {
  if (isNaN(original) || isNaN(newValue)) {
    return { absoluteChange: 0, percentageChange: 0, type: 'no-change', formula: 'Invalid input', steps: [], isUndefined: true };
  }
  const absoluteChange = newValue - original;

  if (original === 0) {
    if (newValue === 0) {
      return {
        absoluteChange: 0,
        percentageChange: 0,
        type: 'no-change',
        formula: '0 → 0 (0% change)',
        steps: ['No change between zero and zero.']
      };
    }
    return {
      absoluteChange,
      percentageChange: 0,
      type: newValue > 0 ? 'increase' : 'decrease',
      formula: `(${absoluteChange} / 0) × 100`,
      steps: ['Original value is 0; relative percentage change from zero is mathematically undefined.'],
      isUndefined: true
    };
  }

  const percentageChange = (absoluteChange / Math.abs(original)) * 100;
  const type = percentageChange > 0 ? 'increase' : percentageChange < 0 ? 'decrease' : 'no-change';

  return {
    absoluteChange,
    percentageChange,
    type,
    formula: `((${newValue} - ${original}) / |${original}|) × 100`,
    steps: [
      `Calculate difference: ${newValue} - ${original} = ${absoluteChange}`,
      `Divide by original absolute value: ${absoluteChange} / ${Math.abs(original)} = ${(absoluteChange / Math.abs(original)).toFixed(6)}`,
      `Convert to percentage: ${(absoluteChange / Math.abs(original)).toFixed(6)} × 100 = ${percentageChange.toFixed(4)}%`
    ]
  };
}

export function calculateReversePercentage(result: number, percentage: number): ReversePercentageResult {
  if (isNaN(result) || isNaN(percentage)) {
    return { baseValue: 0, formula: 'Invalid input', steps: [], isUndefined: true };
  }
  if (percentage === 0) {
    return {
      baseValue: 0,
      formula: `${result} / (0 / 100)`,
      steps: ['Cannot determine base value when the percentage is 0% (division by zero is undefined).'],
      isUndefined: true
    };
  }
  const baseValue = result / (percentage / 100);
  return {
    baseValue,
    formula: `${result} / (${percentage} / 100)`,
    steps: [
      `Express percentage as decimal: ${percentage}% = ${percentage / 100}`,
      `Divide final amount by decimal: ${result} / ${percentage / 100} = ${baseValue}`
    ]
  };
}
