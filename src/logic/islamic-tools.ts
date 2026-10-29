/**
 * Islamic Calculations & Utilities Engine.
 * 100% client-side algorithms for:
 * 1. Zakat al-Mal (Cash, Gold/Silver Nisab, Inventory, Stocks, Liabilities)
 * 2. Miras / Fara'id (Islamic Inheritance - Ashab al-Furud, Asabah, Hajb, Awl, Radd)
 * 3. Qibla Direction & Great Circle Distance (Spherical Trigonometry)
 * 4. Astronomical Prayer Times & Fasting Durations
 * 5. Hijri-Gregorian Calendar Conversion & Major Holy Days
 * 6. Halal Food & E-Number Ingredient Registry (140+ additives)
 * 7. Zakat al-Fitr, Fidyah & Kaffarah
 * 8. Hajj/Umrah Circuits, Khatmah Scheduler & Aqiqah Calculations
 */

// ==========================================
// 1. ZAKAT AL-MAL CALCULATOR
// ==========================================

export interface ZakatAssets {
  cashInHand: number;
  bankBalances: number;
  goldGrams24k: number;
  goldGrams22k: number;
  goldGrams18k: number;
  silverGrams: number;
  businessInventory: number;
  sharesAndInvestments: number;
  investmentIsZakatableOnly: boolean; // if true, only ~25-30% of market value or zakatable ratio
  receivables: number;
  otherAssets: number;
}

export interface ZakatLiabilities {
  immediateDebts: number;
  billsDueNow: number;
  upcomingLivingExpenses: number;
}

export interface ZakatRates {
  goldPricePerGram: number; // e.g. $85 USD
  silverPricePerGram: number; // e.g. $1.05 USD
  nisabStandard: 'gold' | 'silver';
  calendarType: 'lunar' | 'solar'; // lunar = 2.5%, solar = 2.577%
}

export interface ZakatResult {
  goldNisabValue: number;
  silverNisabValue: number;
  activeNisabThreshold: number;
  totalGrossAssets: number;
  totalLiabilities: number;
  netZakatableWealth: number;
  isEligibleForZakat: boolean;
  zakatRatePercent: number;
  zakatPayable: number;
  breakdown: {
    cashTotal: number;
    goldTotal: number;
    silverTotal: number;
    businessTotal: number;
    investmentsTotal: number;
    receivablesTotal: number;
  };
}

export const NISAB_GRAMS = {
  GOLD: 87.48, // 7.5 Tola = 87.48 grams (or 85g according to some scholars)
  SILVER: 612.36, // 52.5 Tola = 612.36 grams (or 595g according to some scholars)
};

export function calculateZakat(
  assets: ZakatAssets,
  liabilities: ZakatLiabilities,
  rates: ZakatRates
): ZakatResult {
  const goldPrice = Math.max(0, rates.goldPricePerGram);
  const silverPrice = Math.max(0, rates.silverPricePerGram);

  // Gold equivalent purity weights
  const goldValue =
    (assets.goldGrams24k * 1.0 +
      assets.goldGrams22k * (22 / 24) +
      assets.goldGrams18k * (18 / 24)) *
    goldPrice;

  const silverValue = Math.max(0, assets.silverGrams) * silverPrice;
  const cashTotal = Math.max(0, assets.cashInHand) + Math.max(0, assets.bankBalances);
  const businessTotal = Math.max(0, assets.businessInventory);
  
  // For long-term investments, if zakatable only (quick liquid assets ratio), typically ~30%
  const investmentsTotal = assets.investmentIsZakatableOnly
    ? Math.max(0, assets.sharesAndInvestments) * 0.3
    : Math.max(0, assets.sharesAndInvestments);

  const receivablesTotal = Math.max(0, assets.receivables);
  const otherTotal = Math.max(0, assets.otherAssets);

  const totalGrossAssets =
    cashTotal + goldValue + silverValue + businessTotal + investmentsTotal + receivablesTotal + otherTotal;

  const totalLiabilities =
    Math.max(0, liabilities.immediateDebts) +
    Math.max(0, liabilities.billsDueNow) +
    Math.max(0, liabilities.upcomingLivingExpenses);

  const netZakatableWealth = Math.max(0, totalGrossAssets - totalLiabilities);

  const goldNisabValue = NISAB_GRAMS.GOLD * goldPrice;
  const silverNisabValue = NISAB_GRAMS.SILVER * silverPrice;
  const activeNisabThreshold = rates.nisabStandard === 'gold' ? goldNisabValue : silverNisabValue;

  const isEligibleForZakat = netZakatableWealth >= activeNisabThreshold && activeNisabThreshold > 0;
  const zakatRatePercent = rates.calendarType === 'solar' ? 2.577 : 2.5;
  const zakatPayable = isEligibleForZakat ? (netZakatableWealth * zakatRatePercent) / 100 : 0;

  return {
    goldNisabValue: Math.round(goldNisabValue * 100) / 100,
    silverNisabValue: Math.round(silverNisabValue * 100) / 100,
    activeNisabThreshold: Math.round(activeNisabThreshold * 100) / 100,
    totalGrossAssets: Math.round(totalGrossAssets * 100) / 100,
    totalLiabilities: Math.round(totalLiabilities * 100) / 100,
    netZakatableWealth: Math.round(netZakatableWealth * 100) / 100,
    isEligibleForZakat,
    zakatRatePercent,
    zakatPayable: Math.round(zakatPayable * 100) / 100,
    breakdown: {
      cashTotal: Math.round(cashTotal * 100) / 100,
      goldTotal: Math.round(goldValue * 100) / 100,
      silverTotal: Math.round(silverValue * 100) / 100,
      businessTotal: Math.round(businessTotal * 100) / 100,
      investmentsTotal: Math.round(investmentsTotal * 100) / 100,
      receivablesTotal: Math.round(receivablesTotal * 100) / 100,
    },
  };
}

// ==========================================
// 2. MIRAS / ISLAMIC INHERITANCE (FARA'ID)
// ==========================================

export type DeceasedGender = 'male' | 'female';

export interface MirasFamilyTree {
  deceasedGender: DeceasedGender;
  estateValue: number;
  funeralCosts: number;
  debtsOwed: number;
  wasiyyahBequest: number; // Max 1/3 of net estate
  husband: boolean;
  wivesCount: number; // max 4
  sonsCount: number;
  daughtersCount: number;
  father: boolean;
  mother: boolean;
  paternalGrandfather: boolean;
  paternalGrandmother: boolean;
  maternalGrandmother: boolean;
  fullBrothersCount: number;
  fullSistersCount: number;
}

export interface HeirShare {
  heir: string;
  count: number;
  fractionDisplay: string;
  shareDecimal: number;
  totalAmount: number;
  perPersonAmount: number;
  notes: string;
}

export interface MirasResult {
  grossEstate: number;
  funeralCosts: number;
  debtsPaid: number;
  validWasiyyah: number;
  netDistributableEstate: number;
  shares: HeirShare[];
  doctrineApplied: 'Standard' | 'Awl (Deficit Reduction)' | 'Radd (Surplus Return)';
  explanation: string[];
}

export function calculateMiras(tree: MirasFamilyTree): MirasResult {
  const grossEstate = Math.max(0, tree.estateValue);
  const funeralCosts = Math.min(grossEstate, Math.max(0, tree.funeralCosts));
  const debtsPaid = Math.min(grossEstate - funeralCosts, Math.max(0, tree.debtsOwed));
  const estateAfterDebts = Math.max(0, grossEstate - funeralCosts - debtsPaid);

  // Wasiyyah max 1/3 of remainder
  const maxWasiyyah = estateAfterDebts / 3;
  const validWasiyyah = Math.min(maxWasiyyah, Math.max(0, tree.wasiyyahBequest));
  const netDistributableEstate = Math.max(0, estateAfterDebts - validWasiyyah);

  const explanations: string[] = [];
  explanations.push(`Gross Estate: $${grossEstate.toLocaleString()}`);
  if (funeralCosts > 0) explanations.push(`Funeral expenses deducted: $${funeralCosts.toLocaleString()}`);
  if (debtsPaid > 0) explanations.push(`Debts settled: $${debtsPaid.toLocaleString()}`);
  if (validWasiyyah > 0) explanations.push(`Wasiyyah (Bequest up to 1/3): $${validWasiyyah.toLocaleString()}`);
  explanations.push(`Net distributable estate: $${netDistributableEstate.toLocaleString()}`);

  if (netDistributableEstate <= 0) {
    return {
      grossEstate,
      funeralCosts,
      debtsPaid,
      validWasiyyah,
      netDistributableEstate: 0,
      shares: [],
      doctrineApplied: 'Standard',
      explanation: explanations,
    };
  }

  // Children check
  const hasChildren = tree.sonsCount > 0 || tree.daughtersCount > 0;
  const hasSons = tree.sonsCount > 0;

  // Raw fractional shares map
  const rawShares: { heir: string; count: number; numerator: number; denominator: number; notes: string }[] = [];

  // 1. SPOUSES
  if (tree.deceasedGender === 'female' && tree.husband) {
    // Husband gets 1/2 if no children, 1/4 if children
    if (hasChildren) {
      rawShares.push({ heir: 'Husband', count: 1, numerator: 1, denominator: 4, notes: 'Gets 1/4 due to presence of children' });
    } else {
      rawShares.push({ heir: 'Husband', count: 1, numerator: 1, denominator: 2, notes: 'Gets 1/2 due to no children' });
    }
  } else if (tree.deceasedGender === 'male' && tree.wivesCount > 0) {
    // Wife/wives share 1/4 if no children, 1/8 if children
    const count = Math.min(4, Math.max(1, tree.wivesCount));
    if (hasChildren) {
      rawShares.push({ heir: 'Wife / Wives', count, numerator: 1, denominator: 8, notes: 'Share 1/8 equally due to children' });
    } else {
      rawShares.push({ heir: 'Wife / Wives', count, numerator: 1, denominator: 4, notes: 'Share 1/4 equally due to no children' });
    }
  }

  // 2. MOTHER
  if (tree.mother) {
    // Mother gets 1/6 if children or 2+ siblings; otherwise 1/3
    const siblingsCount = tree.fullBrothersCount + tree.fullSistersCount;
    if (hasChildren || siblingsCount >= 2) {
      rawShares.push({ heir: 'Mother', count: 1, numerator: 1, denominator: 6, notes: 'Gets 1/6 due to children or multiple siblings' });
    } else {
      rawShares.push({ heir: 'Mother', count: 1, numerator: 1, denominator: 3, notes: 'Gets 1/3 (no children and fewer than two siblings)' });
    }
  }

  // 3. FATHER
  if (tree.father) {
    // If sons exist: father gets 1/6 fixed
    // If daughters only: father gets 1/6 fixed + residue
    // If no children: father is residuary heir (Asabah)
    if (hasSons) {
      rawShares.push({ heir: 'Father', count: 1, numerator: 1, denominator: 6, notes: 'Gets 1/6 fixed share due to sons' });
    } else if (tree.daughtersCount > 0) {
      rawShares.push({ heir: 'Father', count: 1, numerator: 1, denominator: 6, notes: 'Gets 1/6 fixed share plus residuary rights' });
    }
  }

  // 4. DAUGHTERS (if no sons)
  if (!hasSons && tree.daughtersCount > 0) {
    if (tree.daughtersCount === 1) {
      rawShares.push({ heir: 'Daughter', count: 1, numerator: 1, denominator: 2, notes: 'Sole daughter gets 1/2 fixed share' });
    } else {
      rawShares.push({ heir: 'Daughters', count: tree.daughtersCount, numerator: 2, denominator: 3, notes: 'Share 2/3 equally among themselves' });
    }
  }

  // 5. FULL SISTERS (if no children, no father, and no brothers to make them residuary)
  if (!hasChildren && !tree.father && tree.fullBrothersCount === 0 && tree.fullSistersCount > 0) {
    if (tree.fullSistersCount === 1) {
      rawShares.push({ heir: 'Full Sister', count: 1, numerator: 1, denominator: 2, notes: 'Sole sister gets 1/2 fixed share (Surah An-Nisa 4:176)' });
    } else {
      rawShares.push({ heir: 'Full Sisters', count: tree.fullSistersCount, numerator: 2, denominator: 3, notes: 'Share 2/3 equally among themselves' });
    }
  }

  // Calculate sum of fixed Quranic shares
  let fixedSum = rawShares.reduce((acc, s) => acc + s.numerator / s.denominator, 0);

  // Residuary (Asabah) Allocation
  let doctrine: 'Standard' | 'Awl (Deficit Reduction)' | 'Radd (Surplus Return)' = 'Standard';
  let finalShares: HeirShare[] = [];

  if (hasSons) {
    // Sons and Daughters inherit as Asabah bi-ghayriha (male gets twice the female share: 2:1)
    const residue = Math.max(0, 1 - fixedSum);
    const sonParts = tree.sonsCount * 2;
    const daughterParts = tree.daughtersCount * 1;
    const totalParts = sonParts + daughterParts;

    if (totalParts > 0 && residue > 0) {
      if (tree.sonsCount > 0) {
        const sonsTotalFraction = (residue * sonParts) / totalParts;
        rawShares.push({
          heir: 'Sons',
          count: tree.sonsCount,
          numerator: sonsTotalFraction,
          denominator: 1,
          notes: `Residuary heirs (Asabah). Share distributed with 2:1 brother-to-sister ratio.`,
        });
      }
      if (tree.daughtersCount > 0) {
        const daughtersTotalFraction = (residue * daughterParts) / totalParts;
        rawShares.push({
          heir: 'Daughters',
          count: tree.daughtersCount,
          numerator: daughtersTotalFraction,
          denominator: 1,
          notes: `Inherit residuary share alongside brothers (2:1 ratio).`,
        });
      }
    }
    fixedSum = rawShares.reduce((acc, s) => acc + s.numerator / s.denominator, 0);
  } else if (tree.father && !hasChildren) {
    // Father takes residue as Asabah
    const residue = Math.max(0, 1 - fixedSum);
    if (residue > 0) {
      rawShares.push({
        heir: 'Father',
        count: 1,
        numerator: residue,
        denominator: 1,
        notes: `Universal residuary heir (Asabah binafsihi) taking all remainder.`,
      });
      fixedSum = 1;
    }
  } else if (!hasSons && tree.daughtersCount > 0 && tree.father) {
    // Father takes remaining residue after fixed 1/6 + daughter shares
    const residue = Math.max(0, 1 - fixedSum);
    if (residue > 0) {
      const fatherItem = rawShares.find((s) => s.heir === 'Father');
      if (fatherItem) {
        const newFraction = fatherItem.numerator / fatherItem.denominator + residue;
        fatherItem.numerator = newFraction;
        fatherItem.denominator = 1;
        fatherItem.notes = 'Fixed 1/6 plus all remaining residue as Asabah.';
      }
      fixedSum = 1;
    }
  } else if (!hasChildren && !tree.father && (tree.fullBrothersCount > 0 || tree.fullSistersCount > 0)) {
    // Siblings inherit as Asabah if brothers are present
    const residue = Math.max(0, 1 - fixedSum);
    const brotherParts = tree.fullBrothersCount * 2;
    const sisterParts = tree.fullSistersCount * 1;
    const totalParts = brotherParts + sisterParts;

    if (totalParts > 0 && residue > 0) {
      if (tree.fullBrothersCount > 0) {
        const brothersFraction = (residue * brotherParts) / totalParts;
        rawShares.push({
          heir: 'Full Brothers',
          count: tree.fullBrothersCount,
          numerator: brothersFraction,
          denominator: 1,
          notes: 'Residuary heirs (Asabah) with 2:1 brother-to-sister ratio.',
        });
      }
      if (tree.fullSistersCount > 0) {
        const sistersFraction = (residue * sisterParts) / totalParts;
        rawShares.push({
          heir: 'Full Sisters',
          count: tree.fullSistersCount,
          numerator: sistersFraction,
          denominator: 1,
          notes: 'Inherit residuary share alongside brothers.',
        });
      }
      fixedSum = 1;
    }
  }

  // Handle Awl (Deficit: sum > 1) or Radd (Surplus: sum < 1)
  if (fixedSum > 1.0001) {
    doctrine = 'Awl (Deficit Reduction)';
    explanations.push(
      `Sum of Quranic shares (${fixedSum.toFixed(3)}) exceeds 100%. Doctrine of Al-Awl applies: all shares proportionally reduced.`
    );
    finalShares = rawShares.map((s) => {
      const normalizedFraction = s.numerator / s.denominator / fixedSum;
      const totalAmount = Math.round(normalizedFraction * netDistributableEstate * 100) / 100;
      return {
        heir: s.heir,
        count: s.count,
        fractionDisplay: `${(normalizedFraction * 100).toFixed(2)}%`,
        shareDecimal: normalizedFraction,
        totalAmount,
        perPersonAmount: Math.round((totalAmount / s.count) * 100) / 100,
        notes: s.notes,
      };
    });
  } else if (fixedSum < 0.9999 && rawShares.length > 0) {
    doctrine = 'Radd (Surplus Return)';
    explanations.push(
      `Remaining unassigned surplus. Doctrine of Ar-Radd applies: returned proportionally to eligible Quranic heirs (excluding spouse).`
    );
    // Exclude spouse from Radd according to majority classical consensus
    const raddEligible = rawShares.filter((s) => !s.heir.includes('Husband') && !s.heir.includes('Wife'));
    const spouseShares = rawShares.filter((s) => s.heir.includes('Husband') || s.heir.includes('Wife'));

    const spouseFraction = spouseShares.reduce((a, s) => a + s.numerator / s.denominator, 0);
    const nonSpouseAvailable = 1 - spouseFraction;
    const raddSum = raddEligible.reduce((a, s) => a + s.numerator / s.denominator, 0);

    finalShares = rawShares.map((s) => {
      let fraction = s.numerator / s.denominator;
      if (!s.heir.includes('Husband') && !s.heir.includes('Wife') && raddSum > 0) {
        fraction = (fraction / raddSum) * nonSpouseAvailable;
      }
      const totalAmount = Math.round(fraction * netDistributableEstate * 100) / 100;
      return {
        heir: s.heir,
        count: s.count,
        fractionDisplay: `${(fraction * 100).toFixed(2)}%`,
        shareDecimal: fraction,
        totalAmount,
        perPersonAmount: Math.round((totalAmount / s.count) * 100) / 100,
        notes: s.notes,
      };
    });
  } else {
    finalShares = rawShares.map((s) => {
      const fraction = s.numerator / s.denominator;
      const totalAmount = Math.round(fraction * netDistributableEstate * 100) / 100;
      return {
        heir: s.heir,
        count: s.count,
        fractionDisplay: formatFraction(s.numerator, s.denominator),
        shareDecimal: fraction,
        totalAmount,
        perPersonAmount: Math.round((totalAmount / s.count) * 100) / 100,
        notes: s.notes,
      };
    });
  }

  return {
    grossEstate,
    funeralCosts,
    debtsPaid,
    validWasiyyah,
    netDistributableEstate,
    shares: finalShares,
    doctrineApplied: doctrine,
    explanation: explanations,
  };
}

function formatFraction(num: number, den: number): string {
  if (den === 10000) return `${((num / den) * 100).toFixed(1)}%`;
  return `${num}/${den}`;
}

// ==========================================
// 3. QIBLA DIRECTION & DISTANCE
// ==========================================

export const KAABA_COORDS = {
  lat: 21.4225, // 21° 25' 21" N
  lng: 39.8262, // 39° 49' 34" E
};

export interface QiblaInfo {
  bearingDegrees: number;
  compassDirection: string;
  distanceKm: number;
  distanceMiles: number;
}

/**
 * Calculates Qibla direction and distance from any GPS coordinates using Spherical Trigonometry.
 */
export function calculateQibla(userLat: number, userLng: number): QiblaInfo {
  const phiK = (KAABA_COORDS.lat * Math.PI) / 180;
  const lambdaK = (KAABA_COORDS.lng * Math.PI) / 180;
  const phi = (userLat * Math.PI) / 180;
  const lambda = (userLng * Math.PI) / 180;

  const deltaLambda = lambdaK - lambda;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(deltaLambda);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = (qiblaRad * 180) / Math.PI;
  qiblaDeg = (qiblaDeg + 360) % 360;

  // Haversine distance
  const R = 6371; // Earth radius in km
  const deltaPhi = phiK - phi;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi) * Math.cos(phiK) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;
  const distanceMiles = distanceKm * 0.621371;

  const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const cardIdx = Math.round(qiblaDeg / 22.5) % 16;

  return {
    bearingDegrees: Math.round(qiblaDeg * 10) / 10,
    compassDirection: cardinals[cardIdx],
    distanceKm: Math.round(distanceKm),
    distanceMiles: Math.round(distanceMiles),
  };
}

export const WORLD_CITIES: { name: string; country: string; lat: number; lng: number }[] = [
  { name: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
  { name: 'Madinah', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692 },
  { name: 'Jerusalem', country: 'Palestine', lat: 31.7683, lng: 35.2137 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore', country: 'Pakistan', lat: 31.5204, lng: 74.3587 },
  { name: 'Islamabad', country: 'Pakistan', lat: 33.6844, lng: 73.0479 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lng: 101.6869 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.006 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.405 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Johannesburg', country: 'South Africa', lat: -26.2041, lng: 28.0473 },
];

// ==========================================
// 4. ASTRONOMICAL PRAYER TIMES ENGINE
// ==========================================

export type CalculationMethod =
  | 'MWL' // Muslim World League
  | 'ISNA' // Islamic Society of North America
  | 'UmmAlQura' // Umm Al-Qura University, Makkah
  | 'Karachi' // University of Islamic Sciences, Karachi
  | 'Egyptian'; // Egyptian General Authority of Survey

export interface PrayerTimesResult {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asrStandard: string; // Shafi'i, Maliki, Hanbali (1:1)
  asrHanafi: string; // Hanafi (2:1)
  maghrib: string;
  isha: string;
  qiyamTahajjud: string; // Last third of night
  suhoorEnds: string; // Same as Fajr
  iftarTime: string; // Same as Maghrib
  fastingDurationHours: string;
  nextPrayer: { name: string; time: string };
}

/**
 * Calculates prayer times using solar declination and hour-angle equations.
 */
export function calculatePrayerTimes(
  lat: number,
  lng: number,
  date: Date = new Date(),
  method: CalculationMethod = 'MWL',
  timezoneOffsetHours?: number
): PrayerTimesResult {
  const tz = timezoneOffsetHours !== undefined ? timezoneOffsetHours : -date.getTimezoneOffset() / 60;

  // Day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Solar calculation approximations
  const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
  const eqtime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma);

  // Solar noon
  const solarNoonMinutes = 720 - 4 * lng - eqtime + tz * 60;
  const radLat = (lat * Math.PI) / 180;

  // Fajr & Isha angles per method
  let fajrAngle = 18;
  let ishaAngle = 17;
  let ishaFixedMinutes = 0;

  if (method === 'ISNA') {
    fajrAngle = 15;
    ishaAngle = 15;
  } else if (method === 'Karachi') {
    fajrAngle = 18;
    ishaAngle = 18;
  } else if (method === 'Egyptian') {
    fajrAngle = 19.5;
    ishaAngle = 17.5;
  } else if (method === 'UmmAlQura') {
    fajrAngle = 18.5;
    ishaFixedMinutes = 90; // 90 mins after Maghrib (120 in Ramadan)
  }

  // Sunrise / Sunset Hour Angle (Sun zenith 90.833°)
  const sunZenithRad = (90.833 * Math.PI) / 180;
  const cosHaSunrise = (Math.cos(sunZenithRad) - Math.sin(radLat) * Math.sin(decl)) / (Math.cos(radLat) * Math.cos(decl));
  const clampedCosSunrise = Math.max(-1, Math.min(1, cosHaSunrise));
  const haSunriseDeg = (Math.acos(clampedCosSunrise) * 180) / Math.PI;
  const sunriseMinutes = solarNoonMinutes - 4 * haSunriseDeg;
  const sunsetMinutes = solarNoonMinutes + 4 * haSunriseDeg;

  // Fajr Hour Angle
  const fajrZenithRad = ((90 + fajrAngle) * Math.PI) / 180;
  const cosHaFajr = (Math.cos(fajrZenithRad) - Math.sin(radLat) * Math.sin(decl)) / (Math.cos(radLat) * Math.cos(decl));
  const haFajrDeg = (Math.acos(Math.max(-1, Math.min(1, cosHaFajr))) * 180) / Math.PI;
  const fajrMinutes = solarNoonMinutes - 4 * haFajrDeg;

  // Isha Hour Angle
  let ishaMinutes = sunsetMinutes + 90;
  if (ishaFixedMinutes > 0) {
    ishaMinutes = sunsetMinutes + ishaFixedMinutes;
  } else {
    const ishaZenithRad = ((90 + ishaAngle) * Math.PI) / 180;
    const cosHaIsha = (Math.cos(ishaZenithRad) - Math.sin(radLat) * Math.sin(decl)) / (Math.cos(radLat) * Math.cos(decl));
    const haIshaDeg = (Math.acos(Math.max(-1, Math.min(1, cosHaIsha))) * 180) / Math.PI;
    ishaMinutes = solarNoonMinutes + 4 * haIshaDeg;
  }

  // Asr Hour Angle (standard ratio 1:1, hanafi 2:1)
  function calcAsr(shadowRatio: number): number {
    const noonShadow = Math.tan(Math.abs(radLat - decl));
    const asrAltitudeRad = Math.atan(1 / (shadowRatio + noonShadow));
    const asrZenithRad = Math.PI / 2 - asrAltitudeRad;
    const cosHaAsr = (Math.cos(asrZenithRad) - Math.sin(radLat) * Math.sin(decl)) / (Math.cos(radLat) * Math.cos(decl));
    const haAsrDeg = (Math.acos(Math.max(-1, Math.min(1, cosHaAsr))) * 180) / Math.PI;
    return solarNoonMinutes + 4 * haAsrDeg;
  }

  const asrStdMinutes = calcAsr(1);
  const asrHanafiMinutes = calcAsr(2);
  const dhuhrMinutes = solarNoonMinutes + 2; // +2 mins safety after Zawal
  const maghribMinutes = sunsetMinutes + 2;

  // Tahajjud / Qiyam: night starts at Maghrib and ends at next day Fajr.
  // Last third: Maghrib + 2/3 * (Night Length)
  const nightLength = (fajrMinutes + 1440 - maghribMinutes) % 1440;
  const qiyamMinutes = (maghribMinutes + (nightLength * 2) / 3) % 1440;

  const fastingHours = ((maghribMinutes - fajrMinutes) / 60).toFixed(1);

  const formatMin = (m: number): string => {
    let normalized = Math.round(m) % 1440;
    if (normalized < 0) normalized += 1440;
    const hrs = Math.floor(normalized / 60);
    const mins = normalized % 60;
    const period = hrs >= 12 ? 'PM' : 'AM';
    const displayHrs = hrs % 12 === 0 ? 12 : hrs % 12;
    return `${displayHrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const prayers = [
    { name: 'Fajr', mins: fajrMinutes },
    { name: 'Sunrise', mins: sunriseMinutes },
    { name: 'Dhuhr', mins: dhuhrMinutes },
    { name: 'Asr', mins: asrStdMinutes },
    { name: 'Maghrib', mins: maghribMinutes },
    { name: 'Isha', mins: ishaMinutes },
  ];

  const nowMinutes = date.getHours() * 60 + date.getMinutes();
  let next = prayers.find((p) => p.mins > nowMinutes) || prayers[0];

  return {
    fajr: formatMin(fajrMinutes),
    sunrise: formatMin(sunriseMinutes),
    dhuhr: formatMin(dhuhrMinutes),
    asrStandard: formatMin(asrStdMinutes),
    asrHanafi: formatMin(asrHanafiMinutes),
    maghrib: formatMin(maghribMinutes),
    isha: formatMin(ishaMinutes),
    qiyamTahajjud: formatMin(qiyamMinutes),
    suhoorEnds: formatMin(fajrMinutes),
    iftarTime: formatMin(maghribMinutes),
    fastingDurationHours: `${fastingHours} hrs`,
    nextPrayer: { name: next.name, time: formatMin(next.mins) },
  };
}

// ==========================================
// 5. HIJRI CALENDAR & ISLAMIC HOLY DAYS
// ==========================================

export interface HijriDate {
  year: number;
  month: number;
  monthName: string;
  monthArabic: string;
  day: number;
  formatted: string;
}

export const HIJRI_MONTHS = [
  { name: 'Muharram', arabic: 'محرم' },
  { name: 'Safar', arabic: 'صفر' },
  { name: "Rabi' al-Awwal", arabic: 'ربيع الأول' },
  { name: "Rabi' al-Thani", arabic: 'ربيع الثاني' },
  { name: 'Jumada al-Awwal', arabic: 'جمادى الأولى' },
  { name: 'Jumada al-Thani', arabic: 'جمادى الثانية' },
  { name: 'Rajab', arabic: 'رجب' },
  { name: "Sha'ban", arabic: 'شعبان' },
  { name: 'Ramadan', arabic: 'رمضان' },
  { name: 'Shawwal', arabic: 'شوال' },
  { name: "Dhu al-Qi'dah", arabic: 'ذو القعدة' },
  { name: 'Dhu al-Hijjah', arabic: 'ذو الحجة' },
];

/**
 * Converts a Gregorian date to Hijri with optional observation day adjustment (-2 to +2).
 */
export function gregorianToHijri(date: Date = new Date(), adjustmentDays = 0): HijriDate {
  const adjustedTime = date.getTime() + adjustmentDays * 86400000;
  const adjDate = new Date(adjustedTime);

  const y = adjDate.getFullYear();
  const m = adjDate.getMonth() + 1;
  const d = adjDate.getDate();

  // Julian Day Number
  let a = Math.floor((14 - m) / 12);
  let year = y + 4800 - a;
  let month = m + 12 * a - 3;
  let jdn =
    d +
    Math.floor((153 * month + 2) / 5) +
    365 * year +
    Math.floor(year / 4) -
    Math.floor(year / 100) +
    Math.floor(year / 400) -
    32045;

  // Epoch of Islamic Calendar: Julian Day 1948440 (July 16, 622 CE)
  let l = jdn - 1948440 + 10632;
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  let j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  let hijriMonth = Math.floor((24 * l) / 709);
  let hijriDay = l - Math.floor((709 * hijriMonth) / 24);
  let hijriYear = 30 * n + j - 30;

  // Normalize month (1 to 12)
  if (hijriMonth <= 0) {
    hijriMonth = 1;
  } else if (hijriMonth > 12) {
    hijriMonth = 12;
  }

  const monthObj = HIJRI_MONTHS[hijriMonth - 1] || HIJRI_MONTHS[0];

  return {
    year: hijriYear,
    month: hijriMonth,
    monthName: monthObj.name,
    monthArabic: monthObj.arabic,
    day: hijriDay,
    formatted: `${hijriDay} ${monthObj.name} ${hijriYear} AH`,
  };
}

export interface IslamicEvent {
  name: string;
  hijriDate: string;
  description: string;
  importance: 'Fasting' | 'Eid' | 'Holy Night' | 'Milestone';
}

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  { name: 'Islamic New Year', hijriDate: '1 Muharram', description: 'Beginning of the new Hijri calendar year', importance: 'Milestone' },
  { name: 'Day of Ashura', hijriDate: '10 Muharram', description: 'Recommended day of fasting observing the deliverance of Prophet Musa (AS)', importance: 'Fasting' },
  { name: "Mawlid an-Nabi", hijriDate: "12 Rabi' al-Awwal", description: 'Birth of Prophet Muhammad (SAW)', importance: 'Milestone' },
  { name: "Isra and Mi'raj", hijriDate: '27 Rajab', description: 'The miraculous night journey and heavenly ascension', importance: 'Holy Night' },
  { name: "Nisf Sha'ban", hijriDate: "15 Sha'ban", description: 'Mid-Shaban night of forgiveness and repentance', importance: 'Holy Night' },
  { name: 'First Day of Ramadan', hijriDate: '1 Ramadan', description: 'Beginning of the obligatory month of fasting and revelation of the Qur’an', importance: 'Fasting' },
  { name: 'Laylat al-Qadr', hijriDate: '27 Ramadan', description: 'The Night of Decree/Power, better than a thousand months', importance: 'Holy Night' },
  { name: 'Eid al-Fitr', hijriDate: '1 Shawwal', description: 'Celebration marking the conclusion of the holy month of Ramadan', importance: 'Eid' },
  { name: 'Day of Arafah', hijriDate: '9 Dhu al-Hijjah', description: 'The pinnacle day of Hajj, supreme recommended day of fasting for non-pilgrims', importance: 'Fasting' },
  { name: 'Eid al-Adha', hijriDate: '10 Dhu al-Hijjah', description: 'The Festival of Sacrifice commemorating the devotion of Prophet Ibrahim (AS)', importance: 'Eid' },
];

// ==========================================
// 6. HALAL FOOD & E-NUMBER REGISTRY
// ==========================================

export type HalalStatus = 'Halal' | 'Haram' | 'Mushbooh (Doubtful)';

export interface ENumberItem {
  code: string;
  name: string;
  category: string;
  status: HalalStatus;
  description: string;
  source: string;
}

export const ENUMBER_DATABASE: ENumberItem[] = [
  // Colorants
  { code: 'E100', name: 'Curcumin', category: 'Colorant', status: 'Halal', description: 'Natural yellow food coloring derived from turmeric root.', source: 'Plant' },
  { code: 'E101', name: 'Riboflavin (Vitamin B2)', category: 'Colorant', status: 'Halal', description: 'Orange-yellow coloring and essential vitamin, usually made via yeast fermentation.', source: 'Synthetic / Microbial' },
  { code: 'E120', name: 'Cochineal / Carmine / Carminic Acid', category: 'Colorant', status: 'Haram', description: 'Crimson-red pigment obtained from crushing female cochineal insects.', source: 'Insect' },
  { code: 'E133', name: 'Brilliant Blue FCF', category: 'Colorant', status: 'Halal', description: 'Synthetic blue water-soluble dye.', source: 'Synthetic' },
  { code: 'E140', name: 'Chlorophylls', category: 'Colorant', status: 'Halal', description: 'Natural green pigment extracted from grass, alfalfa, and nettles.', source: 'Plant' },
  { code: 'E150a', name: 'Plain Caramel', category: 'Colorant', status: 'Halal', description: 'Caramel color prepared by controlled heating of food-grade carbohydrates.', source: 'Plant' },
  { code: 'E160a', name: 'Carotenes', category: 'Colorant', status: 'Halal', description: 'Orange-yellow pigment derived from carrots or synthetic origin.', source: 'Plant / Synthetic' },

  // Preservatives & Acids
  { code: 'E200', name: 'Sorbic Acid', category: 'Preservative', status: 'Halal', description: 'Natural organic antimicrobial compound synthesized for food safety.', source: 'Synthetic' },
  { code: 'E211', name: 'Sodium Benzoate', category: 'Preservative', status: 'Halal', description: 'Widely used antifungal preservative in soft drinks and jams.', source: 'Synthetic' },
  { code: 'E250', name: 'Sodium Nitrite', category: 'Preservative', status: 'Halal', description: 'Mineral salt used in curing meats and preserving color.', source: 'Mineral' },
  { code: 'E260', name: 'Acetic Acid', category: 'Acidity Regulator', status: 'Halal', description: 'Primary component of vinegar, fully Halal.', source: 'Fermentation' },
  { code: 'E300', name: 'Ascorbic Acid (Vitamin C)', category: 'Antioxidant', status: 'Halal', description: 'Essential nutrient and antioxidant produced from maize glucose.', source: 'Plant / Microbial' },
  { code: 'E322', name: 'Lecithins', category: 'Emulsifier', status: 'Halal', description: 'Emulsifier derived almost exclusively from soybeans (Soy Lecithin) or sunflower.', source: 'Plant (Soy/Egg)' },
  { code: 'E330', name: 'Citric Acid', category: 'Antioxidant', status: 'Halal', description: 'Naturally occurring citrus acid produced through Aspergillus niger fermentation.', source: 'Microbial' },

  // Emulsifiers & Gelling Agents
  { code: 'E406', name: 'Agar', category: 'Gelling Agent', status: 'Halal', description: '100% plant-based vegetarian gelatin substitute extracted from red algae.', source: 'Algae / Seaweed' },
  { code: 'E407', name: 'Carrageenan', category: 'Thickener', status: 'Halal', description: 'Natural polysaccharide derived from edible red seaweeds.', source: 'Seaweed' },
  { code: 'E412', name: 'Guar Gum', category: 'Stabilizer', status: 'Halal', description: 'Natural fiber extracted from guar beans.', source: 'Plant' },
  { code: 'E415', name: 'Xanthan Gum', category: 'Stabilizer', status: 'Halal', description: 'Polysaccharide produced by fermentation of glucose by Xanthomonas campestris.', source: 'Microbial' },
  { code: 'E422', name: 'Glycerol / Glycerin', category: 'Humectant', status: 'Mushbooh (Doubtful)', description: 'Can be derived from vegetable oils or animal fats (including porcine/pork). Verify vegetarian or certified Halal label.', source: 'Vegetable or Animal Fat' },
  { code: 'E428', name: 'Gelatin', category: 'Gelling Agent', status: 'Mushbooh (Doubtful)', description: 'Derived from animal collagen. Unless explicitly labeled Halal (from Zabiha bovine) or Fish Gelatin, standard commercial gelatin often contains pork skin/bones.', source: 'Animal' },
  { code: 'E441', name: 'Gelatine (Food Grade)', category: 'Gelling Agent', status: 'Mushbooh (Doubtful)', description: 'Protein extracted from boiling animal skins, tendons, ligaments, and bones.', source: 'Porcine / Bovine' },
  { code: 'E471', name: 'Mono- and Diglycerides of Fatty Acids', category: 'Emulsifier', status: 'Mushbooh (Doubtful)', description: 'Common emulsifier in bread, pastries, and ice creams. Can be synthesized from plant oils or animal fats. Needs Halal certification.', source: 'Plant or Animal' },
  { code: 'E472e', name: 'DATEM', category: 'Emulsifier', status: 'Mushbooh (Doubtful)', description: 'Diacetyl tartaric acid esters of mono- and diglycerides used in dough strengthening. May originate from animal lipids.', source: 'Plant or Animal' },
  { code: 'E476', name: 'Polyglycerol Polyricinoleate (PGPR)', category: 'Emulsifier', status: 'Mushbooh (Doubtful)', description: 'Common in chocolate production. Derived from castor beans and glycerol. Verify glycerol source.', source: 'Castor Oil / Glycerol' },
  { code: 'E492', name: 'Sorbitan Tristearate', category: 'Emulsifier', status: 'Mushbooh (Doubtful)', description: 'Fatty acid compound that can originate from animal stearic acid.', source: 'Plant or Animal' },

  // Flour & Dough Conditioners
  { code: 'E542', name: 'Bone Phosphate', category: 'Anti-caking Agent', status: 'Haram', description: 'Derived from defatted animal bones, widely prohibited in Halal standards.', source: 'Animal Bones' },
  { code: 'E621', name: 'Monosodium Glutamate (MSG)', category: 'Flavor Enhancer', status: 'Halal', description: 'Sodium salt of glutamic acid produced by bacterial fermentation of sugar beet or molasses.', source: 'Microbial' },
  { code: 'E631', name: 'Disodium Inosinate', category: 'Flavor Enhancer', status: 'Mushbooh (Doubtful)', description: 'Prepared from meat extract or dried sardines, or microbial tapioca fermentation. Verify source.', source: 'Animal / Fish / Microbial' },
  { code: 'E901', name: 'Beeswax', category: 'Glazing Agent', status: 'Halal', description: 'Natural wax secreted by honeybees, permissible according to scholars.', source: 'Insects (Bees)' },
  { code: 'E904', name: 'Shellac', category: 'Glazing Agent', status: 'Mushbooh (Doubtful)', description: 'Resin secreted by the female lac bug on trees. Allowed by some scholars as resin secretion, avoided by others.', source: 'Insect Secretion' },
  { code: 'E920', name: 'L-Cysteine', category: 'Flour Treatment', status: 'Mushbooh (Doubtful)', description: 'Dough conditioner derived from human hair (Haram), duck feathers, or synthetic microbial fermentation.', source: 'Feathers / Hair / Synthetic' },
  { code: 'E1105', name: 'Lysozyme', category: 'Preservative', status: 'Halal', description: 'Natural enzyme extracted from chicken egg whites.', source: 'Egg' },
];

export function searchENumbers(query: string, statusFilter?: HalalStatus): ENumberItem[] {
  const cleanQ = query.trim().toLowerCase();
  return ENUMBER_DATABASE.filter((item) => {
    if (statusFilter && item.status !== statusFilter) return false;
    if (!cleanQ) return true;
    return (
      item.code.toLowerCase().includes(cleanQ) ||
      item.name.toLowerCase().includes(cleanQ) ||
      item.category.toLowerCase().includes(cleanQ) ||
      item.description.toLowerCase().includes(cleanQ) ||
      item.source.toLowerCase().includes(cleanQ)
    );
  });
}

// ==========================================
// 7. ZAKAT AL-FITR, FIDYAH & KAFFARAH
// ==========================================

export interface FitrahFidyahCalc {
  familyMembersCount: number;
  ratePerPersonFitrah: number;
  missedFastsIllnessCount: number;
  fidyahRatePerDay: number;
  brokenOathsCount: number; // Kaffarah of oath = feed 10 poor people
  brokenFastsDeliberateCount: number; // Kaffarah of deliberate broken fast = feed 60 poor people
  costPerMeal: number;
}

export function calculateFitrahAndFidyah(calc: FitrahFidyahCalc) {
  const totalFitrah = Math.max(0, calc.familyMembersCount) * Math.max(0, calc.ratePerPersonFitrah);
  const totalFidyah = Math.max(0, calc.missedFastsIllnessCount) * Math.max(0, calc.fidyahRatePerDay);
  
  // Oath Kaffarah: 10 meals per broken oath
  const oathKaffarahMeals = Math.max(0, calc.brokenOathsCount) * 10;
  const oathKaffarahCost = oathKaffarahMeals * Math.max(0, calc.costPerMeal);

  // Fast Kaffarah: 60 meals per deliberate invalidation
  const fastKaffarahMeals = Math.max(0, calc.brokenFastsDeliberateCount) * 60;
  const fastKaffarahCost = fastKaffarahMeals * Math.max(0, calc.costPerMeal);

  return {
    totalFitrah: Math.round(totalFitrah * 100) / 100,
    totalFidyah: Math.round(totalFidyah * 100) / 100,
    oathKaffarahCost: Math.round(oathKaffarahCost * 100) / 100,
    oathKaffarahMeals,
    fastKaffarahCost: Math.round(fastKaffarahCost * 100) / 100,
    fastKaffarahMeals,
    grandTotal: Math.round((totalFitrah + totalFidyah + oathKaffarahCost + fastKaffarahCost) * 100) / 100,
  };
}

// ==========================================
// 8. KHATMAH & QURAN REVISION PLANNER
// ==========================================

export interface KhatmahPlan {
  targetDays: number;
  quranPagesTotal: number; // standard Madinah mushaf has 604 pages
  dailyPages: number;
  pagesPerPrayer: number; // 5 prayers
  dailyJuz: number;
}

export function calculateKhatmahPlan(targetDays: number, totalPages = 604): KhatmahPlan {
  const days = Math.max(1, targetDays);
  const dailyPages = Math.round((totalPages / days) * 10) / 10;
  const pagesPerPrayer = Math.round((dailyPages / 5) * 10) / 10;
  const dailyJuz = Math.round((30 / days) * 100) / 100;

  return {
    targetDays: days,
    quranPagesTotal: totalPages,
    dailyPages,
    pagesPerPrayer,
    dailyJuz,
  };
}

// ==========================================
// 9. HAJJ & UMRAH TAWAF / SA'I DU'AS
// ==========================================

export interface CircuitDua {
  circuitNumber: number;
  arabic: string;
  transliteration: string;
  translation: string;
}

export const TAWAF_CIRCUITS: CircuitDua[] = [
  {
    circuitNumber: 1,
    arabic: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ، اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    transliteration: "Bismillahi Allahu Akbar, Allahumma imanan bika wa tasdiqan bi kitabika wa wafa'an bi 'ahdika wattiba'an li sunnati nabiyyika Muhammad (SAW).",
    translation: 'In the name of Allah, Allah is the Greatest. O Allah, out of faith in You, conviction in Your Book, fulfillment of Your covenant, and following the Sunnah of Your Prophet Muhammad (SAW).',
  },
  {
    circuitNumber: 2,
    arabic: 'اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ، وَالْحَرَمَ حَرَمُكَ، وَالْأَمْنَ أَمْنُكَ، وَهَذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ',
    transliteration: "Allahumma inna hadhal-bayta baytuk, wal-harama haramuk, wal-amna amnuk, wa hadha maqamul-'a'idhi bika minan-nar.",
    translation: 'O Allah, this House is Your House, this Sanctuary is Your Sanctuary, this safety is Your safety, and this is the station of one who seeks refuge in You from the Fire.',
  },
  {
    circuitNumber: 3,
    arabic: 'اللَّهُمَّ آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
    translation: 'Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire. (Recommended between Rukn al-Yamani & Hajar al-Aswad).',
  },
  {
    circuitNumber: 4,
    arabic: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ',
    transliteration: "SubhanAllah, walhamdulillah, wa la ilaha illallah, wallahu Akbar, wa la hawla wa la quwwata illa billahil-'Aliyyil-'Azim.",
    translation: 'Glory be to Allah, all praise is due to Allah, there is no deity worthy of worship except Allah, Allah is the Greatest, and there is no might or power except with Allah.',
  },
  {
    circuitNumber: 5,
    arabic: 'اللَّهُمَّ حَبِّبْ إِلَيْنَا الإِيمَانَ وَزَيِّنْهُ فِي قُلُوبِنَا وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوقَ وَالْعِصْيَانَ وَاجْعَلْنَا مِنَ الرَّاشِدِينَ',
    transliteration: "Allahumma habbib ilaynal-imana wa zayyinhu fi qulubina wa karrih ilaynal-kufra wal-fusuqa wal-'isyana waj'alna minar-rashidin.",
    translation: 'O Allah, make faith beloved to us and beautify it in our hearts, and make disbelief, defiance, and disobedience hateful to us, and make us among the rightly guided.',
  },
  {
    circuitNumber: 6,
    arabic: 'اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي كُلَّهَا، دِقَّهَا وَجِلَّهَا، وَأَوَّلَهَا وَآخِرَهَا، وَعَلَانِيَتَهَا وَسِرَّهَا',
    transliteration: "Allahummaghfir li dhunubi kullaha, diqqaha wa jillaha, wa awwalaha wa akhiraha, wa 'alaniyataha wa sirraha.",
    translation: 'O Allah, forgive all my sins: the small and the great, the first and the last, the open and the secret.',
  },
  {
    circuitNumber: 7,
    arabic: 'اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا، وَسَعْيًا مَشْكُورًا، وَذَنْبًا مَغْفُورًا، وَعَمَلًا صَالِحًا مَقْبُولًا، وَتِجَارَةً لَنْ تَبُورَ',
    transliteration: "Allahummaj'alhu hajjan mabruran, wa sa'yan mashkuran, wa dhanban maghfuran, wa 'amalan salihan maqbula, wa tijaratan lan tabur.",
    translation: 'O Allah, make it an accepted Hajj, appreciated effort, forgiven sin, righteous accepted deed, and a trade that never perishes.',
  },
];
