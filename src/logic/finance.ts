/**
 * Compound Interest Estimator logic.
 * Computes future value, total interest, periodic contributions, and schedule.
 */

export interface CompoundScheduleItem {
  year: number;
  startingBalance: number;
  contributions: number;
  interestEarned: number;
  endingBalance: number;
}

export interface CompoundInterestResult {
  futureValue: number;
  totalPrincipal: number;
  totalContributions: number;
  totalDeposited: number;
  totalInterest: number;
  schedule: CompoundScheduleItem[];
  formulaDescription: string;
}

export function calculateCompoundInterest(
  principal: number,
  annualRatePercent: number,
  years: number,
  compoundingFrequency: number = 12, // times per year (12 = monthly, 1 = annually, 4 = quarterly)
  annualAddition: number = 0,
  additionAtBeginning: boolean = false
): CompoundInterestResult {
  const p = Math.max(0, isNaN(principal) ? 0 : principal);
  const r = Math.max(0, isNaN(annualRatePercent) ? 0 : annualRatePercent) / 100;
  const t = Math.max(0, isNaN(years) ? 0 : years);
  const n = Math.max(1, compoundingFrequency);
  const pmtAnnual = Math.max(0, isNaN(annualAddition) ? 0 : annualAddition);

  const schedule: CompoundScheduleItem[] = [];
  let currentBalance = p;
  let totalContributions = 0;

  const additionPerCompoundingPeriod = pmtAnnual / n;
  const ratePerPeriod = r / n;

  for (let year = 1; year <= Math.ceil(t); year++) {
    const yearStartBalance = currentBalance;
    let yearContributions = 0;
    let yearInterest = 0;

    // Simulate for periods in this year (up to fractional if last year)
    const periodsInThisYear = year <= Math.floor(t) ? n : Math.round((t - Math.floor(t)) * n);

    for (let period = 0; period < periodsInThisYear; period++) {
      if (additionAtBeginning && additionPerCompoundingPeriod > 0) {
        currentBalance += additionPerCompoundingPeriod;
        yearContributions += additionPerCompoundingPeriod;
      }

      const interestThisPeriod = currentBalance * ratePerPeriod;
      yearInterest += interestThisPeriod;
      currentBalance += interestThisPeriod;

      if (!additionAtBeginning && additionPerCompoundingPeriod > 0) {
        currentBalance += additionPerCompoundingPeriod;
        yearContributions += additionPerCompoundingPeriod;
      }
    }

    totalContributions += yearContributions;

    schedule.push({
      year,
      startingBalance: Math.round(yearStartBalance * 100) / 100,
      contributions: Math.round(yearContributions * 100) / 100,
      interestEarned: Math.round(yearInterest * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  const finalBalance = Math.round(currentBalance * 100) / 100;
  const totalPrincipal = Math.round(p * 100) / 100;
  const totalDeposited = Math.round((p + totalContributions) * 100) / 100;
  const totalInterest = Math.max(0, Math.round((finalBalance - totalDeposited) * 100) / 100);

  return {
    futureValue: finalBalance,
    totalPrincipal,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalDeposited,
    totalInterest,
    schedule,
    formulaDescription: `A = P(1 + r/n)^(nt) with ${compoundingFrequency} compounding cycles per year at ${(annualRatePercent).toFixed(2)}% APR.`,
  };
}
