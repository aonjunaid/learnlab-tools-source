import React, { useState, useEffect, useMemo } from 'react';
import {
  Compass,
  DollarSign,
  BookOpen,
  Clock,
  Calendar,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  MapPin,
  Heart,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  List,
} from 'lucide-react';
import {
  calculateZakat,
  calculateMiras,
  calculateQibla,
  calculatePrayerTimes,
  gregorianToHijri,
  searchENumbers,
  calculateFitrahAndFidyah,
  calculateKhatmahPlan,
  WORLD_CITIES,
  TAWAF_CIRCUITS,
  ISLAMIC_EVENTS,
  CalculationMethod,
  HalalStatus,
  ZakatAssets,
  ZakatLiabilities,
  ZakatRates,
  MirasFamilyTree,
} from '../../logic/islamic-tools';

export const IslamicToolsSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'zakat' | 'miras' | 'qibla' | 'prayer' | 'tasbeeh' | 'calendar' | 'halal' | 'hajj'
  >('zakat');

  // ==========================================
  // TAB 1: ZAKAT AL-MAL STATE
  // ==========================================
  const [zakatRates, setZakatRates] = useState<ZakatRates>({
    goldPricePerGram: 85,
    silverPricePerGram: 1.05,
    nisabStandard: 'silver', // Most beneficial for the poor according to majority scholars
    calendarType: 'lunar',
  });

  const [zakatAssets, setZakatAssets] = useState<ZakatAssets>({
    cashInHand: 2500,
    bankBalances: 12000,
    goldGrams24k: 0,
    goldGrams22k: 45,
    goldGrams18k: 0,
    silverGrams: 0,
    businessInventory: 4000,
    sharesAndInvestments: 5000,
    investmentIsZakatableOnly: true,
    receivables: 800,
    otherAssets: 0,
  });

  const [zakatLiabilities, setZakatLiabilities] = useState<ZakatLiabilities>({
    immediateDebts: 1200,
    billsDueNow: 650,
    upcomingLivingExpenses: 0,
  });

  const zakatResult = useMemo(
    () => calculateZakat(zakatAssets, zakatLiabilities, zakatRates),
    [zakatAssets, zakatLiabilities, zakatRates]
  );

  // ==========================================
  // TAB 2: MIRAS INHERITANCE STATE
  // ==========================================
  const [mirasTree, setMirasTree] = useState<MirasFamilyTree>({
    deceasedGender: 'male',
    estateValue: 100000,
    funeralCosts: 2500,
    debtsOwed: 7500,
    wasiyyahBequest: 5000,
    husband: false,
    wivesCount: 1,
    sonsCount: 2,
    daughtersCount: 1,
    father: true,
    mother: true,
    paternalGrandfather: false,
    paternalGrandmother: false,
    maternalGrandmother: false,
    fullBrothersCount: 0,
    fullSistersCount: 0,
  });

  const mirasResult = useMemo(() => calculateMiras(mirasTree), [mirasTree]);

  // ==========================================
  // TAB 3: QIBLA FINDER STATE
  // ==========================================
  const [selectedCity, setSelectedCity] = useState<string>('London');
  const [customLat, setCustomLat] = useState<number>(51.5074);
  const [customLng, setCustomLng] = useState<number>(-0.1278);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const qiblaResult = useMemo(() => calculateQibla(customLat, customLng), [customLat, customLng]);

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    const city = WORLD_CITIES.find((c) => c.name === cityName);
    if (city) {
      setCustomLat(city.lat);
      setCustomLng(city.lng);
      setGpsError(null);
    }
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCustomLat(Math.round(pos.coords.latitude * 10000) / 10000);
        setCustomLng(Math.round(pos.coords.longitude * 10000) / 10000);
        setSelectedCity('My Location (GPS)');
        setGpsLoading(false);
      },
      (err) => {
        setGpsError(err.message || 'Unable to retrieve location.');
        setGpsLoading(false);
      },
      { timeout: 10000 }
    );
  };

  // ==========================================
  // TAB 4: PRAYER TIMES STATE
  // ==========================================
  const [prayerMethod, setPrayerMethod] = useState<CalculationMethod>('MWL');
  const [selectedPrayerDate, setSelectedPrayerDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const prayerResult = useMemo(() => {
    const d = new Date(selectedPrayerDate + 'T12:00:00');
    return calculatePrayerTimes(customLat, customLng, d, prayerMethod);
  }, [customLat, customLng, selectedPrayerDate, prayerMethod]);

  // ==========================================
  // TAB 5: DIGITAL TASBEEH STATE
  // ==========================================
  const [tasbeehCount, setTasbeehCount] = useState<number>(0);
  const [tasbeehTarget, setTasbeehTarget] = useState<number>(33);
  const [totalTasbeehSession, setTotalTasbeehSession] = useState<number>(0);
  const [selectedDhikr, setSelectedDhikr] = useState<string>('سُبْحَانَ اللَّهِ (SubhanAllah)');

  const DHIKR_PRESETS = [
    { label: 'سُبْحَانَ اللَّهِ (SubhanAllah)', translation: 'Glory be to Allah' },
    { label: 'الْحَمْدُ لِلَّهِ (Alhamdulillah)', translation: 'All praise is due to Allah' },
    { label: 'اللَّهُ أَكْبَرُ (Allahu Akbar)', translation: 'Allah is the Greatest' },
    { label: 'لَا إِلَهَ إِلَّا اللَّهُ (La ilaha illallah)', translation: 'There is no deity except Allah' },
    { label: 'أَسْتَغْفِرُ اللَّهَ (Astaghfirullah)', translation: 'I seek forgiveness from Allah' },
    { label: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ (Salawat)', translation: 'Blessings upon Prophet Muhammad' },
    { label: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ (Hawqala)', translation: 'There is no power except with Allah' },
  ];

  const handleTasbeehClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(25);
    }
    const next = tasbeehCount + 1;
    setTotalTasbeehSession((prev) => prev + 1);
    if (tasbeehTarget > 0 && next >= tasbeehTarget) {
      if (navigator.vibrate) {
        navigator.vibrate([50, 50, 100]);
      }
      setTasbeehCount(0);
    } else {
      setTasbeehCount(next);
    }
  };

  // ==========================================
  // TAB 6: HIJRI CALENDAR STATE
  // ==========================================
  const [gregorianInputDate, setGregorianInputDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [hijriOffset, setHijriOffset] = useState<number>(0);

  const calculatedHijri = useMemo(() => {
    const d = new Date(gregorianInputDate + 'T12:00:00');
    return gregorianToHijri(d, hijriOffset);
  }, [gregorianInputDate, hijriOffset]);

  // ==========================================
  // TAB 7: HALAL E-NUMBERS SEARCH
  // ==========================================
  const [eSearchQuery, setESearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<HalalStatus | 'All'>('All');

  const filteredENumbers = useMemo(() => {
    return searchENumbers(
      eSearchQuery,
      statusFilter === 'All' ? undefined : (statusFilter as HalalStatus)
    );
  }, [eSearchQuery, statusFilter]);

  // ==========================================
  // TAB 8: HAJJ & LIFE TOOLS STATE
  // ==========================================
  const [tawafLap, setTawafLap] = useState<number>(1);
  const [saiLap, setSaiLap] = useState<number>(1);

  // Fitrah & Fidyah state
  const [fitrahState, setFitrahState] = useState({
    familyCount: 4,
    ratePerPerson: 10,
    missedFasts: 0,
    fidyahRate: 10,
    brokenOaths: 0,
    costPerMeal: 6,
  });

  const fitrahResult = useMemo(
    () =>
      calculateFitrahAndFidyah({
        familyMembersCount: fitrahState.familyCount,
        ratePerPersonFitrah: fitrahState.ratePerPerson,
        missedFastsIllnessCount: fitrahState.missedFasts,
        fidyahRatePerDay: fitrahState.fidyahRate,
        brokenOathsCount: fitrahState.brokenOaths,
        brokenFastsDeliberateCount: 0,
        costPerMeal: fitrahState.costPerMeal,
      }),
    [fitrahState]
  );

  // Khatmah planner state
  const [khatmahDays, setKhatmahDays] = useState<number>(30);
  const khatmahResult = useMemo(() => calculateKhatmahPlan(khatmahDays), [khatmahDays]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6 text-slate-800 dark:text-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Comprehensive Islamic Faith Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Islamic Utilities & Calculators
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            100% private in-browser tools: Zakat al-Mal, Miras inheritance, Qibla compass, solar prayer times, digital tasbeeh, Hijri calendar, and halal food additives.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Zero Server Uploads &amp; Complete Privacy</span>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'zakat', label: 'Zakat al-Mal', icon: DollarSign },
          { id: 'miras', label: 'Miras (Inheritance)', icon: BookOpen },
          { id: 'qibla', label: 'Qibla Finder', icon: Compass },
          { id: 'prayer', label: 'Prayer Times', icon: Clock },
          { id: 'tasbeeh', label: 'Digital Tasbeeh', icon: Heart },
          { id: 'calendar', label: 'Hijri Calendar', icon: Calendar },
          { id: 'halal', label: 'Halal Food (E-Codes)', icon: Search },
          { id: 'hajj', label: 'Hajj, Fitrah & Quran', icon: List },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ZAKAT AL-MAL CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'zakat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-5">
            {/* Rates & Nisab Benchmarks */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                1. Market Rates &amp; Nisab Threshold
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Gold Spot Price ($/gram)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={zakatRates.goldPricePerGram}
                    onChange={(e) =>
                      setZakatRates({ ...zakatRates, goldPricePerGram: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    87.48g Nisab: ${zakatResult.goldNisabValue.toLocaleString()}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Silver Spot Price ($/gram)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={zakatRates.silverPricePerGram}
                    onChange={(e) =>
                      setZakatRates({ ...zakatRates, silverPricePerGram: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    612.36g Nisab: ${zakatResult.silverNisabValue.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Active Nisab Standard
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setZakatRates({ ...zakatRates, nisabStandard: 'silver' })}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border ${
                        zakatRates.nisabStandard === 'silver'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Silver Standard (Recommended)
                    </button>
                    <button
                      type="button"
                      onClick={() => setZakatRates({ ...zakatRates, nisabStandard: 'gold' })}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border ${
                        zakatRates.nisabStandard === 'gold'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Gold Standard
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Year Cycle (Rate)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setZakatRates({ ...zakatRates, calendarType: 'lunar' })}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border ${
                        zakatRates.calendarType === 'lunar'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Lunar Hijri (2.5%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setZakatRates({ ...zakatRates, calendarType: 'solar' })}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium border ${
                        zakatRates.calendarType === 'solar'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Solar Gregorian (2.577%)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Assets Input Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                2. Zakatable Assets
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Cash in Hand ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.cashInHand}
                    onChange={(e) => setZakatAssets({ ...zakatAssets, cashInHand: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Bank Balances ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.bankBalances}
                    onChange={(e) => setZakatAssets({ ...zakatAssets, bankBalances: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Gold (22 Karat - grams)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.goldGrams22k}
                    onChange={(e) => setZakatAssets({ ...zakatAssets, goldGrams22k: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Gold (24 Karat - grams)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.goldGrams24k}
                    onChange={(e) => setZakatAssets({ ...zakatAssets, goldGrams24k: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Silver Holdings (grams)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.silverGrams}
                    onChange={(e) => setZakatAssets({ ...zakatAssets, silverGrams: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Trade / Merchandise Inventory ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.businessInventory}
                    onChange={(e) => setZakatAssets({ ...zakatAssets, businessInventory: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Stocks / Mutual Funds ($)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setZakatAssets({
                          ...zakatAssets,
                          investmentIsZakatableOnly: !zakatAssets.investmentIsZakatableOnly,
                        })
                      }
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {zakatAssets.investmentIsZakatableOnly ? 'Zakatable Ratio (30%)' : 'Full Market Value'}
                    </button>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.sharesAndInvestments}
                    onChange={(e) =>
                      setZakatAssets({ ...zakatAssets, sharesAndInvestments: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Good Receivables (Money owed to you) ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatAssets.receivables}
                    onChange={(e) => setZakatAssets({ ...zakatAssets, receivables: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Deductions / Liabilities */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                3. Short-Term Debts &amp; Immediate Liabilities (Deductible)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Immediate Debts Due Now ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatLiabilities.immediateDebts}
                    onChange={(e) =>
                      setZakatLiabilities({ ...zakatLiabilities, immediateDebts: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Overdue Bills &amp; Rent Due ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={zakatLiabilities.billsDueNow}
                    onChange={(e) =>
                      setZakatLiabilities({ ...zakatLiabilities, billsDueNow: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-md border border-emerald-800 space-y-5 sticky top-20">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-800/80">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                    Net Zakat Payable
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1">
                    ${zakatResult.zakatPayable.toLocaleString()}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    zakatResult.isEligibleForZakat
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  }`}
                >
                  {zakatResult.isEligibleForZakat ? 'Nisab Met (Obligatory)' : 'Below Nisab (No Zakat)'}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-emerald-900/60">
                  <span className="text-emerald-200">Total Zakatable Assets</span>
                  <span className="font-semibold">${zakatResult.totalGrossAssets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-900/60">
                  <span className="text-emerald-200">Deductible Liabilities</span>
                  <span className="font-semibold text-rose-300">-${zakatResult.totalLiabilities.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-900/60">
                  <span className="text-emerald-200">Net Zakatable Wealth</span>
                  <span className="font-semibold text-white">${zakatResult.netZakatableWealth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-900/60">
                  <span className="text-emerald-200">
                    Active Nisab ({zakatRates.nisabStandard === 'gold' ? '87.48g Gold' : '612.36g Silver'})
                  </span>
                  <span className="font-semibold">${zakatResult.activeNisabThreshold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-emerald-200">Applied Rate</span>
                  <span className="font-semibold">{zakatResult.zakatRatePercent}%</span>
                </div>
              </div>

              {/* Asset breakdown list */}
              <div className="bg-emerald-900/50 rounded-xl p-4 border border-emerald-800 text-xs space-y-2">
                <span className="font-semibold text-emerald-200 uppercase tracking-wider block mb-1">
                  Valuation Breakdown
                </span>
                <div className="flex justify-between text-slate-300">
                  <span>Cash &amp; Bank:</span>
                  <span className="font-mono">${zakatResult.breakdown.cashTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Gold Jewelry/Bullion:</span>
                  <span className="font-mono">${zakatResult.breakdown.goldTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Business Inventory:</span>
                  <span className="font-mono">${zakatResult.breakdown.businessTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Stocks / Shares:</span>
                  <span className="font-mono">${zakatResult.breakdown.investmentsTotal.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-emerald-300/80 leading-relaxed italic">
                * Zakat is obligatory once wealth meets or exceeds the Nisab and has been maintained for one full lunar year (Hawl).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MIRAS (ISLAMIC INHERITANCE / FARA'ID) */}
      {/* ========================================================================= */}
      {activeTab === 'miras' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Miras / Islamic Inheritance (Fara'id) Calculator
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distributes estate strictly according to Quranic fixed shares (Ashab al-Furud) and residuary heirs (Asabah).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Deceased:</span>
                <button
                  type="button"
                  onClick={() => setMirasTree({ ...mirasTree, deceasedGender: 'male', husband: false })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                    mirasTree.deceasedGender === 'male'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Male (Deceased)
                </button>
                <button
                  type="button"
                  onClick={() => setMirasTree({ ...mirasTree, deceasedGender: 'female', wivesCount: 0 })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                    mirasTree.deceasedGender === 'female'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Female (Deceased)
                </button>
              </div>
            </div>

            {/* Estate Financial Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Gross Estate Value ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={mirasTree.estateValue}
                  onChange={(e) => setMirasTree({ ...mirasTree, estateValue: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Funeral &amp; Burial Expenses ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={mirasTree.funeralCosts}
                  onChange={(e) => setMirasTree({ ...mirasTree, funeralCosts: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Debts to Settle ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={mirasTree.debtsOwed}
                  onChange={(e) => setMirasTree({ ...mirasTree, debtsOwed: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Wasiyyah (Bequest, max 1/3) ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={mirasTree.wasiyyahBequest}
                  onChange={(e) => setMirasTree({ ...mirasTree, wasiyyahBequest: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                />
              </div>
            </div>

            {/* Family Relatives Inputs */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Surviving Relatives
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {mirasTree.deceasedGender === 'female' ? (
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                    <label className="text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={mirasTree.husband}
                        onChange={(e) => setMirasTree({ ...mirasTree, husband: e.target.checked })}
                        className="rounded text-emerald-600"
                      />
                      Surviving Husband
                    </label>
                  </div>
                ) : (
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                    <label className="text-xs font-medium text-slate-800 dark:text-slate-200 block mb-1">
                      Wives (1-4)
                    </label>
                    <select
                      value={mirasTree.wivesCount}
                      onChange={(e) => setMirasTree({ ...mirasTree, wivesCount: parseInt(e.target.value) || 0 })}
                      className="w-full text-xs py-1 px-2 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    >
                      <option value="0">0 Wives</option>
                      <option value="1">1 Wife</option>
                      <option value="2">2 Wives</option>
                      <option value="3">3 Wives</option>
                      <option value="4">4 Wives</option>
                    </select>
                  </div>
                )}

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <label className="text-xs font-medium text-slate-800 dark:text-slate-200 block mb-1">
                    Sons Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={mirasTree.sonsCount}
                    onChange={(e) => setMirasTree({ ...mirasTree, sonsCount: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs py-1 px-2 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <label className="text-xs font-medium text-slate-800 dark:text-slate-200 block mb-1">
                    Daughters Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={mirasTree.daughtersCount}
                    onChange={(e) => setMirasTree({ ...mirasTree, daughtersCount: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs py-1 px-2 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <label className="text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      checked={mirasTree.father}
                      onChange={(e) => setMirasTree({ ...mirasTree, father: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    Father Alive
                  </label>
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <label className="text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      checked={mirasTree.mother}
                      onChange={(e) => setMirasTree({ ...mirasTree, mother: e.target.checked })}
                      className="rounded text-emerald-600"
                    />
                    Mother Alive
                  </label>
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                  <label className="text-xs font-medium text-slate-800 dark:text-slate-200 block mb-1">
                    Brothers / Sisters
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="number"
                      min="0"
                      title="Full Brothers"
                      placeholder="Brothers"
                      value={mirasTree.fullBrothersCount}
                      onChange={(e) => setMirasTree({ ...mirasTree, fullBrothersCount: parseInt(e.target.value) || 0 })}
                      className="w-1/2 text-xs py-1 px-1 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    />
                    <input
                      type="number"
                      min="0"
                      title="Full Sisters"
                      placeholder="Sisters"
                      value={mirasTree.fullSistersCount}
                      onChange={(e) => setMirasTree({ ...mirasTree, fullSistersCount: parseInt(e.target.value) || 0 })}
                      className="w-1/2 text-xs py-1 px-1 border rounded bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inheritance Result Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Distribution Table
                </span>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Net Distributable: ${mirasResult.netDistributableEstate.toLocaleString()}
                </div>
              </div>
              <div className="px-3 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Rule Applied: {mirasResult.doctrineApplied}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Heir Class</th>
                    <th className="py-3 px-4">Heir Count</th>
                    <th className="py-3 px-4">Quranic Share</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Per Person</th>
                    <th className="py-3 px-4">Jurisprudence Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mirasResult.shares.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-500">
                        No surviving eligible heirs entered or net estate is zero.
                      </td>
                    </tr>
                  ) : (
                    mirasResult.shares.map((share, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {share.heir}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{share.count}</td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {share.fractionDisplay}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          ${share.totalAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300 font-medium">
                          ${share.perPersonAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                          {share.notes}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {mirasResult.explanation.length > 0 && (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <span className="font-semibold block text-slate-700 dark:text-slate-300">
                  Estate Execution Sequence:
                </span>
                {mirasResult.explanation.map((exp, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{exp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: QIBLA FINDER & COMPASS */}
      {/* ========================================================================= */}
      {activeTab === 'qibla' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 space-y-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                Select Location
              </h3>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleUseGPS}
                  disabled={gpsLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{gpsLoading ? 'Detecting Location...' : 'Use My GPS Location'}</span>
                </button>
              </div>

              {gpsError && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-700 dark:text-amber-300">
                  {gpsError}
                </div>
              )}

              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Or Pick a Major Global City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => handleCitySelect(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  {WORLD_CITIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}, {c.country} ({c.lat > 0 ? `${c.lat}°N` : `${-c.lat}°S`},{' '}
                      {c.lng > 0 ? `${c.lng}°E` : `${-c.lng}°W`})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLat}
                    onChange={(e) => setCustomLat(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={customLng}
                    onChange={(e) => setCustomLng(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                  <span className="font-medium">Target Coordinates:</span>
                  <span className="font-mono">Kaaba (21.4225° N, 39.8262° E)</span>
                </div>
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                  <span className="font-medium">Direct Distance:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {qiblaResult.distanceKm.toLocaleString()} km ({qiblaResult.distanceMiles.toLocaleString()} miles)
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                  <span className="font-medium">Cardinal Direction:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">{qiblaResult.compassDirection}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compass Visualizer */}
          <div className="md:col-span-6 flex flex-col items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                Qibla Heading
              </span>
              <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {qiblaResult.bearingDegrees}°
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Turn your body to face {qiblaResult.bearingDegrees}° from True North
              </span>
            </div>

            {/* Simulated 360 Degree Compass Dial */}
            <div className="relative w-64 h-64 rounded-full border-4 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-inner flex items-center justify-center">
              {/* Cardinal markings */}
              <span className="absolute top-2 font-bold text-xs text-rose-500">N (0°)</span>
              <span className="absolute right-3 font-bold text-xs text-slate-500">E (90°)</span>
              <span className="absolute bottom-2 font-bold text-xs text-slate-500">S (180°)</span>
              <span className="absolute left-3 font-bold text-xs text-slate-500">W (270°)</span>

              {/* Center Hub */}
              <div className="w-5 h-5 rounded-full bg-slate-400 dark:bg-slate-600 z-20 border-2 border-white dark:border-slate-900" />

              {/* Rotating Pointer Needle */}
              <div
                className="absolute w-1 h-28 origin-bottom z-10 transition-transform duration-500 ease-out"
                style={{
                  bottom: '50%',
                  transform: `rotate(${qiblaResult.bearingDegrees}deg)`,
                }}
              >
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[24px] border-b-emerald-600 -translate-x-1.5" />
                <div className="w-1 h-full bg-emerald-600 mx-auto" />
              </div>
            </div>

            <div className="mt-4 text-[11px] text-slate-500 text-center max-w-xs">
              Align device top toward True North to locate Kaaba in Makkah.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PRAYER TIMES & FASTING DURATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'prayer' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Location Coordinates
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCitySelect(e.target.value)}
                    className="w-full text-xs py-2 px-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                  >
                    {WORLD_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}, {c.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Calendar Date
                </label>
                <input
                  type="date"
                  value={selectedPrayerDate}
                  onChange={(e) => setSelectedPrayerDate(e.target.value)}
                  className="w-full text-xs py-1.5 px-3 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Calculation Convention
                </label>
                <select
                  value={prayerMethod}
                  onChange={(e) => setPrayerMethod(e.target.value as CalculationMethod)}
                  className="w-full text-xs py-2 px-2 border rounded-lg bg-slate-50 dark:bg-slate-800 dark:border-slate-700"
                >
                  <option value="MWL">Muslim World League (Fajr 18°, Isha 17°)</option>
                  <option value="ISNA">ISNA - North America (Fajr 15°, Isha 15°)</option>
                  <option value="UmmAlQura">Umm Al-Qura, Makkah (Fajr 18.5°, Isha 90m)</option>
                  <option value="Karachi">Univ. Islamic Sciences Karachi (Fajr 18°, Isha 18°)</option>
                  <option value="Egyptian">Egyptian General Authority (Fajr 19.5°, Isha 17.5°)</option>
                </select>
              </div>
            </div>

            {/* Current Prayer Notification Card */}
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                  Next Upcoming Prayer
                </span>
                <div className="text-2xl sm:text-3xl font-black mt-0.5">
                  {prayerResult.nextPrayer.name} at {prayerResult.nextPrayer.time}
                </div>
              </div>
              <div className="flex gap-4 text-xs font-medium bg-emerald-950/30 px-4 py-2.5 rounded-xl border border-emerald-400/20">
                <div>
                  <span className="text-emerald-200 block">Suhoor Ends (Fajr)</span>
                  <span className="font-bold text-white text-sm">{prayerResult.suhoorEnds}</span>
                </div>
                <div className="border-l border-emerald-400/30 pl-4">
                  <span className="text-emerald-200 block">Iftar Break (Maghrib)</span>
                  <span className="font-bold text-white text-sm">{prayerResult.iftarTime}</span>
                </div>
                <div className="border-l border-emerald-400/30 pl-4">
                  <span className="text-emerald-200 block">Fasting Duration</span>
                  <span className="font-bold text-white text-sm">{prayerResult.fastingDurationHours}</span>
                </div>
              </div>
            </div>

            {/* Prayer Times Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
              {[
                { name: 'Fajr', time: prayerResult.fajr, desc: 'Dawn / Start of Fast' },
                { name: 'Sunrise', time: prayerResult.sunrise, desc: 'Shuruq' },
                { name: 'Dhuhr', time: prayerResult.dhuhr, desc: 'Solar Noon' },
                { name: 'Asr (Standard)', time: prayerResult.asrStandard, desc: 'Shafi‘i / Maliki / Hanbali' },
                { name: 'Maghrib', time: prayerResult.maghrib, desc: 'Sunset / Iftar' },
                { name: 'Isha', time: prayerResult.isha, desc: 'Night' },
              ].map((p, i) => (
                <div
                  key={i}
                  className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 text-center hover:border-emerald-500 transition-colors"
                >
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {p.name}
                  </span>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                    {p.time}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{p.desc}</span>
                </div>
              ))}
            </div>

            {/* Additional Asr Hanafi & Tahajjud */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Asr (Hanafi juristic shadow 2:1):</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{prayerResult.asrHanafi}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Qiyam al-Layl / Tahajjud (Last third of night):</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{prayerResult.qiyamTahajjud}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DIGITAL TASBEEH & DHIKR COUNTER */}
      {/* ========================================================================= */}
      {activeTab === 'tasbeeh' && (
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-center space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Interactive Dhikr Companion
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedDhikr}
              </h3>
            </div>

            {/* Preset Selector */}
            <div className="flex flex-wrap justify-center gap-2">
              {DHIKR_PRESETS.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSelectedDhikr(d.label);
                    setTasbeehCount(0);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                    selectedDhikr === d.label
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Target Selector */}
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-slate-500">Target Cycle:</span>
              {[33, 99, 100, 0].map((tgt) => (
                <button
                  key={tgt}
                  type="button"
                  onClick={() => setTasbeehTarget(tgt)}
                  className={`px-3 py-1 rounded-md font-semibold ${
                    tasbeehTarget === tgt
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {tgt === 0 ? 'Free / Unlimited' : `${tgt} Count`}
                </button>
              ))}
            </div>

            {/* Huge Clicker Button */}
            <div className="py-4">
              <button
                type="button"
                onClick={handleTasbeehClick}
                className="w-48 h-48 rounded-full mx-auto bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all flex flex-col items-center justify-center border-4 border-emerald-300/40 select-none cursor-pointer"
              >
                <span className="text-5xl font-black font-mono tracking-tight">{tasbeehCount}</span>
                {tasbeehTarget > 0 && (
                  <span className="text-xs text-emerald-100 mt-1">/ {tasbeehTarget}</span>
                )}
                <span className="text-[11px] text-emerald-200 mt-2 uppercase tracking-widest font-semibold">
                  Tap to Count
                </span>
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-center gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500">
                Session Total: <strong className="text-slate-900 dark:text-white">{totalTasbeehSession}</strong>
              </span>
              <button
                type="button"
                onClick={() => setTasbeehCount(0)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Current
              </button>
              <button
                type="button"
                onClick={() => {
                  setTasbeehCount(0);
                  setTotalTasbeehSession(0);
                }}
                className="text-rose-500 hover:underline"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: HIJRI CALENDAR & EVENTS */}
      {/* ========================================================================= */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Hijri &amp; Gregorian Date Converter
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Gregorian Date
                </label>
                <input
                  type="date"
                  value={gregorianInputDate}
                  onChange={(e) => setGregorianInputDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Local Sighting Adjustment (-2 to +2 days)
                </label>
                <div className="flex gap-2">
                  {[-2, -1, 0, 1, 2].map((offset) => (
                    <button
                      key={offset}
                      type="button"
                      onClick={() => setHijriOffset(offset)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-semibold border ${
                        hijriOffset === offset
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {offset > 0 ? `+${offset}d` : `${offset}d`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Converted Output Card */}
            <div className="mt-4 p-5 rounded-xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-emerald-800">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                  Equivalent Islamic Hijri Date
                </span>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  {calculatedHijri.formatted}
                </div>
                <span className="text-sm text-emerald-300 font-arabic mt-0.5 block">
                  {calculatedHijri.day} {calculatedHijri.monthArabic} {calculatedHijri.year} هـ
                </span>
              </div>
              <div className="text-xs bg-emerald-950/60 p-3 rounded-lg border border-emerald-800 text-emerald-200 space-y-1">
                <div>Month: {calculatedHijri.month} of 12 ({calculatedHijri.monthName})</div>
                <div>Ayyam al-Beed (White Days): 13, 14, 15 {calculatedHijri.monthName}</div>
              </div>
            </div>
          </div>

          {/* Key Islamic Events Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Major Islamic Annual Milestones &amp; Holy Days
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {ISLAMIC_EVENTS.map((ev, i) => (
                <div key={i} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{ev.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {ev.hijriDate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ev.description}</p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                      ev.importance === 'Eid'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                        : ev.importance === 'Fasting'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {ev.importance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: HALAL FOOD & E-NUMBER CHECKER */}
      {/* ========================================================================= */}
      {activeTab === 'halal' && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search code (e.g. E120, E471), name (Gelatin, Carmine), or category..."
                  value={eSearchQuery}
                  onChange={(e) => setESearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto">
                {(['All', 'Halal', 'Mushbooh (Doubtful)', 'Haram'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border ${
                      statusFilter === st
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredENumbers.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                No food additive matches found for "{eSearchQuery}".
              </div>
            ) : (
              filteredENumbers.map((item) => (
                <div
                  key={item.code}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                        {item.code}
                      </span>
                      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                        {item.name}
                      </h4>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        item.status === 'Halal'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : item.status === 'Haram'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
                    <span>Category: {item.category}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Origin: {item.source}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: HAJJ & UMRAH, FITRAH & QURAN LIFE COMPANION */}
      {/* ========================================================================= */}
      {activeTab === 'hajj' && (
        <div className="space-y-6">
          {/* 1. Tawaf Circuit Tracker */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                  Tawaf &amp; Sa'i Circuit Tracker (7 Rounds)
                </h3>
                <p className="text-xs text-slate-500">
                  Track circuits around the Kaaba with recommended supplications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTawafLap(1)}
                className="text-xs text-emerald-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Circuit
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTawafLap(num)}
                  className={`w-10 h-10 rounded-full font-bold text-sm transition ${
                    tawafLap === num
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/20'
                      : tawafLap > num
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Selected Circuit Dua */}
            {(() => {
              const dua = TAWAF_CIRCUITS[tawafLap - 1] || TAWAF_CIRCUITS[0];
              return (
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block">
                    Circuit #{dua.circuitNumber} Du'a:
                  </span>
                  <p className="text-base font-arabic text-right text-slate-900 dark:text-white leading-loose">
                    {dua.arabic}
                  </p>
                  <p className="text-xs italic text-slate-600 dark:text-slate-300">
                    "{dua.transliteration}"
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {dua.translation}
                  </p>
                </div>
              );
            })()}

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                disabled={tawafLap <= 1}
                onClick={() => setTawafLap((p) => Math.max(1, p - 1))}
                className="px-4 py-2 border rounded-lg text-xs font-semibold disabled:opacity-40"
              >
                Previous Circuit
              </button>
              <button
                type="button"
                disabled={tawafLap >= 7}
                onClick={() => setTawafLap((p) => Math.min(7, p + 1))}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 disabled:opacity-40"
              >
                Next Circuit #{Math.min(7, tawafLap + 1)}
              </button>
            </div>
          </div>

          {/* 2. Zakat al-Fitr, Fidyah & Kaffarah Quick Calculator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                Fitrah &amp; Fidyah Calculator
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Family Members (Fitrah)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={fitrahState.familyCount}
                      onChange={(e) => setFitrahState({ ...fitrahState, familyCount: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Fitrah Rate ($/person)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={fitrahState.ratePerPerson}
                      onChange={(e) => setFitrahState({ ...fitrahState, ratePerPerson: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Missed Fasts (Illness Fidyah)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={fitrahState.missedFasts}
                      onChange={(e) => setFitrahState({ ...fitrahState, missedFasts: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Broken Oaths (Kaffarah)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={fitrahState.brokenOaths}
                      onChange={(e) => setFitrahState({ ...fitrahState, brokenOaths: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Total Zakat al-Fitr:</span>
                    <span className="font-bold text-slate-900 dark:text-white">${fitrahResult.totalFitrah}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Total Fidyah for Illness:</span>
                    <span className="font-bold text-slate-900 dark:text-white">${fitrahResult.totalFidyah}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Oath Kaffarah ({fitrahResult.oathKaffarahMeals} meals):</span>
                    <span className="font-bold text-slate-900 dark:text-white">${fitrahResult.oathKaffarahCost}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Grand Total:</span>
                    <span>${fitrahResult.grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Quran Khatmah Reading Planner */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                Quran Khatmah (Completion) Scheduler
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Target Days to Complete Entire Qur'an (604 Pages)
                </label>
                <div className="flex gap-2 mb-3">
                  {[7, 10, 15, 30, 60].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setKhatmahDays(d)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-semibold border ${
                        khatmahDays === d
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {d} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-300">Daily Reading Goal:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                    {khatmahResult.dailyPages} pages/day (~{khatmahResult.dailyJuz} Juz)
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-300">Reading After Each of 5 Prayers:</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {khatmahResult.pagesPerPrayer} pages / prayer
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-emerald-200 dark:border-emerald-800">
                  Tip: Reading 4 pages after Fajr, Dhuhr, Asr, Maghrib, and Isha effortlessly completes the Quran in 30 days!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
