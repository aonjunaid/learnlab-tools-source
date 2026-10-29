import React, { useState, useMemo } from 'react';
import {
  FlaskRound as Flask,
  Table,
  Scale,
  Droplet,
  Flame,
  Wind,
  Search,
  Info,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  PERIODIC_TABLE,
  ElementData,
  parseChemicalFormula,
  calculateSolutionMass,
  solveDilution,
  calculateAcidBase,
  calculateHendersonHasselbalch,
  solveIdealGas,
} from '../../logic/chemistry';
import {
  balanceChemicalEquation,
  calculateStoichiometry,
  BalancedReactionResult,
  StoichiometryResult,
} from '../../logic/reaction-balancer';
import { saveExperiment } from '../../logic/workspace-store';

export function ChemistrySuiteTool() {
  const [activeTab, setActiveTab] = useState<
    'periodic' | 'molarmass' | 'reactions' | 'solutions' | 'acidbase' | 'gaslaw'
  >('periodic');

  // ==========================================
  // 1. PERIODIC TABLE STATE
  // ==========================================
  const [elementSearch, setElementSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedElement, setSelectedElement] = useState<ElementData>(PERIODIC_TABLE[0]); // Hydrogen default

  const filteredElements = useMemo(() => {
    return PERIODIC_TABLE.filter((el) => {
      const matchesSearch =
        el.name.toLowerCase().includes(elementSearch.toLowerCase()) ||
        el.symbol.toLowerCase().includes(elementSearch.toLowerCase()) ||
        el.number.toString() === elementSearch.trim();
      const matchesCategory =
        categoryFilter === 'all' || el.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [elementSearch, categoryFilter]);

  const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
    'alkali-metal': { bg: 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800', text: 'text-rose-800 dark:text-rose-300', label: 'Alkali Metal' },
    'alkaline-earth': { bg: 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800', text: 'text-amber-800 dark:text-amber-300', label: 'Alkaline Earth' },
    'transition-metal': { bg: 'bg-blue-100 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-300', label: 'Transition Metal' },
    'post-transition': { bg: 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800', text: 'text-emerald-800 dark:text-emerald-300', label: 'Post-Transition' },
    'metalloid': { bg: 'bg-teal-100 dark:bg-teal-950/60 border-teal-300 dark:border-teal-800', text: 'text-teal-800 dark:text-teal-300', label: 'Metalloid' },
    'reactive-nonmetal': { bg: 'bg-indigo-100 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800', text: 'text-indigo-800 dark:text-indigo-300', label: 'Reactive Nonmetal' },
    'noble-gas': { bg: 'bg-purple-100 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800', text: 'text-purple-800 dark:text-purple-300', label: 'Noble Gas' },
    'lanthanide': { bg: 'bg-cyan-100 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-800', text: 'text-cyan-800 dark:text-cyan-300', label: 'Lanthanide' },
    'actinide': { bg: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 border-fuchsia-300 dark:border-fuchsia-800', text: 'text-fuchsia-800 dark:text-fuchsia-300', label: 'Actinide' },
    'unknown': { bg: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700', text: 'text-slate-800 dark:text-slate-300', label: 'Unknown' },
  };

  // ==========================================
  // 2. MOLAR MASS & ELEMENTAL COMPOSITION STATE
  // ==========================================
  const [formulaInput, setFormulaInput] = useState('CuSO4*5H2O');
  const [gramInput, setGramInput] = useState<number>(100);
  const formulaResult = useMemo(() => parseChemicalFormula(formulaInput), [formulaInput]);

  // Mass <-> Moles converter
  const molesCalculated = useMemo(() => {
    if (!formulaResult.isValid || formulaResult.molarMass <= 0 || gramInput <= 0) return 0;
    return gramInput / formulaResult.molarMass;
  }, [formulaResult, gramInput]);

  // ==========================================
  // 3. SOLUTION PREPARATION & DILUTION STATE
  // ==========================================
  const [solTargetMolarity, setSolTargetMolarity] = useState<number>(0.25);
  const [solVolumeML, setSolVolumeML] = useState<number>(500);
  const [solMolarMass, setSolMolarMass] = useState<number>(58.44); // NaCl default

  const prepResult = useMemo(() => {
    return calculateSolutionMass(solTargetMolarity, solVolumeML / 1000, solMolarMass);
  }, [solTargetMolarity, solVolumeML, solMolarMass]);

  // Dilution state (M1 V1 = M2 V2)
  const [dilutionTarget, setDilutionTarget] = useState<'v1' | 'm2' | 'v2' | 'm1'>('v1');
  const [dilM1, setDilM1] = useState<number>(12.0); // e.g. 12M stock HCl
  const [dilV1, setDilV1] = useState<number>(0);
  const [dilM2, setDilM2] = useState<number>(1.0);  // e.g. 1M target
  const [dilV2, setDilV2] = useState<number>(250);  // 250 mL target

  const dilutionResult = useMemo(() => {
    return solveDilution(dilutionTarget, {
      m1: dilM1,
      v1: dilutionTarget === 'v1' ? undefined : dilV1,
      m2: dilM2,
      v2: dilutionTarget === 'v2' ? undefined : dilV2,
    });
  }, [dilutionTarget, dilM1, dilV1, dilM2, dilV2]);

  // ==========================================
  // 4. ACID-BASE & pH STATE
  // ==========================================
  const [phInputMode, setPhInputMode] = useState<'pH' | 'pOH' | 'H' | 'OH'>('pH');
  const [phInputVal, setPhInputVal] = useState<number>(3.5);
  const acidBaseResult = useMemo(() => {
    return calculateAcidBase(phInputVal, phInputMode);
  }, [phInputVal, phInputMode]);

  // Buffer state
  const [bufferPka, setBufferPka] = useState<number>(4.76); // Acetic acid pKa
  const [bufferBaseConc, setBufferBaseConc] = useState<number>(0.1); // Acetate
  const [bufferAcidConc, setBufferAcidConc] = useState<number>(0.1); // Acetic acid
  const bufferResult = useMemo(() => {
    return calculateHendersonHasselbalch(bufferPka, bufferBaseConc, bufferAcidConc);
  }, [bufferPka, bufferBaseConc, bufferAcidConc]);

  // ==========================================
  // 5. IDEAL GAS LAW STATE (PV = nRT)
  // ==========================================
  const [gasTarget, setGasTarget] = useState<'P' | 'V' | 'n' | 'T'>('P');
  const [gasP, setGasP] = useState<number>(1.0);
  const [gasV, setGasV] = useState<number>(22.414);
  const [gasN, setGasN] = useState<number>(1.0);
  const [gasT, setGasT] = useState<number>(273.15); // Kelvin (0 C)

  const gasResult = useMemo(() => {
    return solveIdealGas(gasTarget, {
      P: gasTarget === 'P' ? undefined : gasP,
      V: gasTarget === 'V' ? undefined : gasV,
      n: gasTarget === 'n' ? undefined : gasN,
      T: gasTarget === 'T' ? undefined : gasT,
    });
  }, [gasTarget, gasP, gasV, gasN, gasT]);

  // ==========================================
  // REACTION BALANCER & STOICHIOMETRY STATE
  // ==========================================
  const [reactionInput, setReactionInput] = useState('C6H12O6 + O2 -> CO2 + H2O');
  const [reactantAmounts, setReactantAmounts] = useState<Record<string, { amount: number; unit: 'grams' | 'moles' }>>({
    'C6H12O6': { amount: 180, unit: 'grams' },
    'O2': { amount: 192, unit: 'grams' },
  });
  const [actualYieldGrams, setActualYieldGrams] = useState<Record<string, number>>({});
  const [pinnedSuccess, setPinnedSuccess] = useState(false);

  const balancedResult = useMemo(() => {
    return balanceChemicalEquation(reactionInput);
  }, [reactionInput]);

  const stoichiometryResult = useMemo(() => {
    if (!balancedResult.isValid) return null;
    const inputs = balancedResult.reactants.map((r) => {
      const entry = reactantAmounts[r.formula] || { amount: 0, unit: 'grams' };
      return {
        formula: r.formula,
        amount: entry.amount,
        unit: entry.unit,
      };
    });
    const actuals = balancedResult.products.map((p) => ({
      formula: p.formula,
      grams: actualYieldGrams[p.formula] || 0,
    }));
    return calculateStoichiometry(balancedResult, inputs, actuals);
  }, [balancedResult, reactantAmounts, actualYieldGrams]);

  const handlePinReactionExperiment = () => {
    if (!balancedResult.isValid) return;
    saveExperiment({
      title: `Chemical Reaction: ${balancedResult.balancedEquationString}`,
      toolCategory: 'chemistry',
      objective: 'Stoichiometric balance of chemical species, atom conservation validation, and determination of limiting reagent and theoretical yield.',
      equations: [
        balancedResult.balancedEquationString,
        'Moles (n) = Mass (m) / Molar Mass (M)',
        'Limiting Reagent = min(n_i / coeff_i)',
        'Theoretical Yield = n_limiting × coeff_product × M_product',
      ],
      parameters: balancedResult.reactants.map((r) => ({
        name: `Reactant ${r.formula}`,
        value: `${reactantAmounts[r.formula]?.amount ?? 0}`,
        unit: reactantAmounts[r.formula]?.unit ?? 'grams',
      })),
      results: [
        { label: 'Balanced Reaction', value: balancedResult.balancedEquationString },
        { label: 'Limiting Reagent', value: stoichiometryResult?.limitingReagentFormula || 'Equal / Unspecified' },
        ...(stoichiometryResult?.products.map((p) => ({
          label: `Theoretical Yield (${p.formula})`,
          value: `${p.theoreticalGrams.toFixed(2)} g (${p.theoreticalMoles.toFixed(4)} mol)`,
        })) || []),
      ],
      substitutions: stoichiometryResult?.explanationSteps,
      assumptions: [
        'Reaction proceeds to 100% completion (zero side reactions or dynamic chemical equilibria).',
        'Pure stoichiometric reactants at standard temperature and pressure.',
        'Total mass of all reactants equals total mass of all products according to Lavoisier conservation of mass.',
      ],
      limitations: [
        'Real chemical syntheses often encounter equilibrium constants (K_eq < 1), incomplete conversion, or competing side products.',
        'Mechanical losses during filtration, recrystallization, and transfer reduce actual yield percentage.',
      ],
    });
    setPinnedSuccess(true);
    setTimeout(() => setPinnedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Module Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl" role="tablist">
          <button
            onClick={() => setActiveTab('periodic')}
            role="tab"
            aria-selected={activeTab === 'periodic'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'periodic'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            Periodic Table
          </button>
          <button
            onClick={() => setActiveTab('molarmass')}
            role="tab"
            aria-selected={activeTab === 'molarmass'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'molarmass'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Molar Mass & Composition
          </button>
          <button
            onClick={() => setActiveTab('reactions')}
            role="tab"
            aria-selected={activeTab === 'reactions'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'reactions'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Reaction Balancer & Stoichiometry
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            role="tab"
            aria-selected={activeTab === 'solutions'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'solutions'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            Solutions & Dilution (M₁V₁=M₂V₂)
          </button>
          <button
            onClick={() => setActiveTab('acidbase')}
            role="tab"
            aria-selected={activeTab === 'acidbase'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'acidbase'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            pH & Buffer (Henderson-Hasselbalch)
          </button>
          <button
            onClick={() => setActiveTab('gaslaw')}
            role="tab"
            aria-selected={activeTab === 'gaslaw'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'gaslaw'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            Ideal Gas Law (PV=nRT)
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* TAB 1: INTERACTIVE PERIODIC TABLE */}
      {/* ========================================================== */}
      {activeTab === 'periodic' && (
        <div className="space-y-6">
          {/* Controls: Search and Category Filtering */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={elementSearch}
                onChange={(e) => setElementSearch(e.target.value)}
                placeholder="Search by element name, symbol, or atomic # (e.g. Fe, Carbon, 26)..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  categoryFilter === 'all'
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                All Categories
              </button>
              {Object.entries(categoryColors).slice(0, 7).map(([key, meta]) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                    categoryFilter === key
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {meta.label}
                </button>
              ))}
            </div>
          </div>

          {/* Element Inspector Card & Quick View */}
          {selectedElement && (
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20 text-center">
                <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">
                  #{selectedElement.number}
                </span>
                <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                  {selectedElement.symbol}
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                  {selectedElement.name}
                </span>
                <span className="text-xs font-mono text-slate-500 mt-0.5">
                  {selectedElement.atomicMass.toFixed(3)} u
                </span>
              </div>

              <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-slate-400 text-[10px] block font-sans">Category</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {categoryColors[selectedElement.category]?.label || selectedElement.category}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-slate-400 text-[10px] block font-sans">Period & Group</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Period {selectedElement.period}, Group {selectedElement.group || '—'}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-slate-400 text-[10px] block font-sans">Electron Config</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    {selectedElement.electronConfig}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                  <span className="text-slate-400 text-[10px] block font-sans">Electronegativity</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedElement.electronegativity ?? 'N/A'} (Pauling)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Periodic Elements Interactive Grid */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
              Elements Grid ({filteredElements.length} shown) — Click to inspect
            </span>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {filteredElements.map((el) => {
                const color = categoryColors[el.category] || categoryColors['unknown'];
                const isSelected = selectedElement.number === el.number;

                return (
                  <button
                    key={el.number}
                    onClick={() => setSelectedElement(el)}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                      color.bg
                    } ${
                      isSelected
                        ? 'ring-2 ring-teal-500 shadow-md scale-105'
                        : 'hover:scale-102 hover:shadow-xs'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-500 font-bold self-start">
                      {el.number}
                    </span>
                    <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white my-0.5">
                      {el.symbol}
                    </span>
                    <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400 truncate w-full">
                      {el.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 2: MOLAR MASS & ELEMENTAL COMPOSITION */}
      {/* ========================================================== */}
      {activeTab === 'molarmass' && (
        <div className="space-y-6">
          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Common Compounds:</span>
            {[
              { label: 'Water (H₂O)', val: 'H2O' },
              { label: 'Glucose (C₆H₁₂O₆)', val: 'C6H12O6' },
              { label: 'Calcium Hydroxide [Ca(OH)₂]', val: 'Ca(OH)2' },
              { label: 'Copper(II) Sulfate Pentahydrate', val: 'CuSO4*5H2O' },
              { label: 'Potassium Ferricyanide', val: 'K4[Fe(CN)6]' },
              { label: 'Aluminium Sulfate', val: 'Al2(SO4)3' },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setFormulaInput(p.val)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-700 dark:text-slate-300 rounded-lg transition-colors font-mono"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Formula Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Chemical Formula (Supports Parentheses, Brackets, &amp; Hydrates)
            </label>
            <input
              type="text"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              placeholder="e.g. CuSO4*5H2O, Ca(OH)2, NaHCO3..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-base font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Molar Mass Result Display */}
          {formulaResult.isValid ? (
            <div className="space-y-5">
              <div className="p-5 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                    Total Molecular Weight / Molar Mass
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-teal-900 dark:text-teal-100 mt-1">
                    {formulaResult.molarMass.toFixed(4)} <span className="text-lg font-normal text-teal-600">g/mol</span>
                  </div>
                </div>

                {/* Grams to Moles Quick Converter */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-100 dark:border-teal-850 flex items-center gap-3 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-slate-400 block font-sans">Mass in grams</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={gramInput}
                      onChange={(e) => setGramInput(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-20 px-2 py-1 border border-slate-200 dark:border-slate-700 rounded text-xs font-mono font-bold"
                    />
                    <span className="text-slate-400 ml-1">g</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                  <div>
                    <label className="text-[10px] text-slate-400 block font-sans">Amount of substance</label>
                    <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                      {molesCalculated.toFixed(4)} mol
                    </span>
                  </div>
                </div>
              </div>

              {/* Composition Stack Bar */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Mass Fraction Composition Breakdown
                </span>
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-700">
                  {formulaResult.elements.map((el, idx) => {
                    const colors = ['bg-teal-500', 'bg-blue-500', 'bg-indigo-500', 'bg-amber-500', 'bg-rose-500', 'bg-emerald-500', 'bg-purple-500'];
                    return (
                      <div
                        key={el.element.symbol}
                        style={{ width: `${el.massPercent}%` }}
                        className={`${colors[idx % colors.length]} h-full`}
                        title={`${el.element.name} (${el.element.symbol}): ${el.massPercent.toFixed(2)}%`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Elements Breakdown Table */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="p-3">Element</th>
                      <th className="p-3">Symbol</th>
                      <th className="p-3 text-center">Atoms in Formula</th>
                      <th className="p-3">Atomic Weight</th>
                      <th className="p-3">Subtotal Mass</th>
                      <th className="p-3 text-right">Mass Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {formulaResult.elements.map((row) => (
                      <tr key={row.element.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3 font-semibold">{row.element.name}</td>
                        <td className="p-3 font-bold text-teal-600 dark:text-teal-400">{row.element.symbol}</td>
                        <td className="p-3 text-center font-bold">{row.count}</td>
                        <td className="p-3">{row.element.atomicMass.toFixed(3)} u</td>
                        <td className="p-3">{row.totalMass.toFixed(3)} g/mol</td>
                        <td className="p-3 text-right font-bold">{row.massPercent.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300">
              {formulaResult.error}
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB: REACTION BALANCER & STOICHIOMETRY */}
      {/* ========================================================== */}
      {activeTab === 'reactions' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Linear Algebra Chemical Equation Balancer & Limiting Reagent Solver
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Balances arbitrary chemical reactions using exact Gaussian elimination over rationals, verifies atom conservation, and computes theoretical yield.
                </p>
              </div>

              {balancedResult.isValid && (
                <button
                  onClick={handlePinReactionExperiment}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs ${
                    pinnedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                  }`}
                >
                  {pinnedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Pinned to Lab Notebook!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Pin to Lab Notebook
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Common Reaction Presets
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Combustion of Glucose', eq: 'C6H12O6 + O2 -> CO2 + H2O' },
                  { label: 'Thermite Reaction', eq: 'Al + Fe2O3 -> Al2O3 + Fe' },
                  { label: 'Haber-Bosch Ammonia', eq: 'N2 + H2 -> NH3' },
                  { label: 'Neutralization', eq: 'Al(OH)3 + H2SO4 -> Al2(SO4)3 + H2O' },
                  { label: 'Precipitation', eq: 'CuSO4 + NaOH -> Cu(OH)2 + Na2SO4' },
                  { label: 'Iron Rusting', eq: 'Fe + O2 -> Fe2O3' },
                  { label: 'Permanganate Redox', eq: 'KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setReactionInput(preset.eq);
                      // Clear amounts
                      setReactantAmounts({});
                      setActualYieldGrams({});
                    }}
                    className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-850 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input field */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Chemical Reaction String (Reactants → Products)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={reactionInput}
                  onChange={(e) => setReactionInput(e.target.value)}
                  placeholder="e.g. C6H12O6 + O2 -> CO2 + H2O or Al + Fe2O3 -> Al2O3 + Fe"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Results */}
            {balancedResult.isValid ? (
              <div className="space-y-6 pt-2">
                {/* Balanced Equation Showcase */}
                <div className="p-4 bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-700 dark:text-teal-400 font-bold block mb-1">
                    Balanced Stoichiometric Equation
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-teal-950 dark:text-teal-100 tracking-wide">
                    {balancedResult.reactants.map((r, i) => (
                      <span key={r.formula}>
                        {i > 0 && <span className="text-slate-400 mx-2">+</span>}
                        {r.coeff > 1 && <span className="text-amber-600 dark:text-amber-400 font-black">{r.coeff}</span>}
                        <span>{r.formula}</span>
                      </span>
                    ))}
                    <span className="text-teal-600 dark:text-teal-400 mx-3">→</span>
                    {balancedResult.products.map((p, i) => (
                      <span key={p.formula}>
                        {i > 0 && <span className="text-slate-400 mx-2">+</span>}
                        {p.coeff > 1 && <span className="text-amber-600 dark:text-amber-400 font-black">{p.coeff}</span>}
                        <span>{p.formula}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Atom Conservation Matrix Table */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono mb-2">
                    Conservation of Mass & Atom Ledger
                  </h4>
                  <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-left font-mono">
                      <thead className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                        <tr>
                          <th className="px-4 py-2">Element</th>
                          <th className="px-4 py-2 text-center">Reactant Atoms</th>
                          <th className="px-4 py-2 text-center">Product Atoms</th>
                          <th className="px-4 py-2 text-right">Conservation Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                        {balancedResult.atomsLedger.map((row) => (
                          <tr key={row.element} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                            <td className="px-4 py-2 font-bold text-teal-600 dark:text-teal-400">{row.element}</td>
                            <td className="px-4 py-2 text-center">{row.reactantsCount}</td>
                            <td className="px-4 py-2 text-center">{row.productsCount}</td>
                            <td className="px-4 py-2 text-right">
                              {row.isBalanced ? (
                                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold font-sans">
                                  <Check className="w-3.5 h-3.5" /> Balanced
                                </span>
                              ) : (
                                <span className="text-rose-600 font-semibold font-sans">Imbalanced</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Stoichiometry & Limiting Reagent Section */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                      Stoichiometric Yield & Limiting Reagent Solver
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter the known mass (g) or moles (mol) for reactants to compute the limiting reagent and theoretical yields.
                    </p>
                  </div>

                  {/* Reactants Input Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {balancedResult.reactants.map((r) => {
                      const cur = reactantAmounts[r.formula] || { amount: 0, unit: 'grams' };
                      return (
                        <div
                          key={r.formula}
                          className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
                              {r.coeff > 1 ? `${r.coeff} ` : ''}{r.formula}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {r.parse.molarMass.toFixed(2)} g/mol
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={cur.amount || ''}
                              placeholder="Amount"
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setReactantAmounts((prev) => ({
                                  ...prev,
                                  [r.formula]: { ...cur, amount: val },
                                }));
                              }}
                              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono"
                            />
                            <select
                              value={cur.unit}
                              onChange={(e) => {
                                const u = e.target.value as 'grams' | 'moles';
                                setReactantAmounts((prev) => ({
                                  ...prev,
                                  [r.formula]: { ...cur, unit: u },
                                }));
                              }}
                              className="px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium"
                            >
                              <option value="grams">g</option>
                              <option value="moles">mol</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stoichiometry Computed Cards */}
                  {stoichiometryResult ? (
                    <div className="space-y-4 pt-2">
                      <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-800 dark:text-amber-300 font-mono uppercase">
                            Limiting Reagent:
                          </span>
                          <span className="text-base font-extrabold font-mono text-amber-900 dark:text-amber-200">
                            {stoichiometryResult.limitingReagentFormula}
                          </span>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">
                          Governs maximum possible yield
                        </span>
                      </div>

                      {/* Theoretical Yield Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {stoichiometryResult.products.map((p) => (
                          <div
                            key={p.formula}
                            className="p-3 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5"
                          >
                            <span className="text-[11px] font-mono uppercase text-slate-500 block">
                              Theoretical Yield ({p.formula})
                            </span>
                            <div className="text-xl font-bold font-mono text-teal-600 dark:text-teal-400">
                              {p.theoreticalGrams.toFixed(2)} <span className="text-xs font-normal">g</span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400 block">
                              = {p.theoreticalMoles.toFixed(4)} mol
                            </span>

                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">Actual (g):</span>
                              <input
                                type="number"
                                min="0"
                                step="any"
                                placeholder="Optional"
                                value={actualYieldGrams[p.formula] || ''}
                                onChange={(e) => {
                                  const v = parseFloat(e.target.value) || 0;
                                  setActualYieldGrams((prev) => ({ ...prev, [p.formula]: v }));
                                }}
                                className="w-20 px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-right font-mono"
                              />
                            </div>
                            {p.percentYield !== undefined && (
                              <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 text-right">
                                Yield: {p.percentYield.toFixed(1)}%
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Step-by-Step Derivation log */}
                      <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        <span className="font-sans font-bold text-slate-500 text-[11px] block uppercase mb-1">
                          Calculated Substitution Steps:
                        </span>
                        {stoichiometryResult.explanationSteps.map((step, idx) => (
                          <div key={idx} className="leading-relaxed">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl text-xs text-slate-500 text-center">
                      Enter reactant quantities above to calculate limiting reagents and product yields.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300">
                {balancedResult.error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 3: SOLUTIONS & DILUTION (M1 V1 = M2 V2) */}
      {/* ========================================================== */}
      {activeTab === 'solutions' && (
        <div className="space-y-8">
          {/* Section A: Solution Preparation */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold">
                  A
                </span>
                Prepare Solution from Pure Solid (Solute Mass Equation)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Formula: <span className="font-mono text-teal-600">Mass (g) = Molarity (mol/L) × Volume (L) × Molar Mass (g/mol)</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Target Concentration (M or mol/L)
                </label>
                <input
                  type="number"
                  min="0.001"
                  step="0.05"
                  value={solTargetMolarity}
                  onChange={(e) => setSolTargetMolarity(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Desired Volume (mL)
                </label>
                <input
                  type="number"
                  min="1"
                  step="50"
                  value={solVolumeML}
                  onChange={(e) => setSolVolumeML(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Solute Molar Mass (g/mol)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={solMolarMass}
                  onChange={(e) => setSolMolarMass(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs"
                />
              </div>
            </div>

            {prepResult.isValid && (
              <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-teal-700 dark:text-teal-300 font-semibold block">
                    Weigh out and dissolve:
                  </span>
                  <div className="text-2xl font-bold font-mono text-teal-950 dark:text-teal-100 mt-0.5">
                    {prepResult.massGrams} g <span className="text-sm font-normal text-teal-600">of solute</span>
                  </div>
                </div>
                <div className="text-right font-mono text-slate-600 dark:text-slate-400">
                  <span>{prepResult.moles} moles solute</span>
                  <span className="block text-[11px] text-slate-400">Dilute with water up to {solVolumeML} mL mark</span>
                </div>
              </div>
            )}
          </div>

          {/* Section B: Solution Dilution (M1V1 = M2V2) */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold">
                  B
                </span>
                Dilution Calculator (M₁ × V₁ = M₂ × V₂)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Conservation of moles during dilution: determine required stock volume or final concentration.
              </p>
            </div>

            {/* Target Variable Chooser */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Solve for:</span>
              {[
                { id: 'v1', label: 'Stock Volume (V₁)' },
                { id: 'm2', label: 'Final Concentration (M₂)' },
                { id: 'v2', label: 'Final Volume (V₂)' },
                { id: 'm1', label: 'Stock Concentration (M₁)' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setDilutionTarget(t.id as any)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    dilutionTarget === t.id
                      ? 'bg-teal-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div>
                <label className="text-[11px] font-sans text-slate-500 block mb-1">Stock M₁ (M)</label>
                <input
                  type="number"
                  step="0.1"
                  value={dilM1}
                  disabled={dilutionTarget === 'm1'}
                  onChange={(e) => setDilM1(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-sans text-slate-500 block mb-1">Stock V₁ (mL)</label>
                <input
                  type="number"
                  step="5"
                  value={dilV1}
                  disabled={dilutionTarget === 'v1'}
                  onChange={(e) => setDilV1(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-sans text-slate-500 block mb-1">Target M₂ (M)</label>
                <input
                  type="number"
                  step="0.05"
                  value={dilM2}
                  disabled={dilutionTarget === 'm2'}
                  onChange={(e) => setDilM2(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-sans text-slate-500 block mb-1">Target V₂ (mL)</label>
                <input
                  type="number"
                  step="10"
                  value={dilV2}
                  disabled={dilutionTarget === 'v2'}
                  onChange={(e) => setDilV2(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>

            {dilutionResult.isValid && (
              <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-teal-700 dark:text-teal-400 font-semibold block">
                    Calculated Result:
                  </span>
                  <div className="text-2xl font-bold font-mono text-teal-950 dark:text-teal-100 mt-0.5">
                    {dilutionResult.result.toFixed(3)}{' '}
                    <span className="text-sm font-normal text-teal-600">
                      {dilutionTarget.startsWith('v') ? 'mL' : 'M'}
                    </span>
                  </div>
                </div>

                {dilutionResult.solventNeeded !== undefined && (
                  <div className="text-right text-xs font-mono text-slate-600 dark:text-slate-400">
                    <span className="block font-sans text-slate-400 text-[10px]">Procedure:</span>
                    <span>Take {dilutionResult.result.toFixed(2)} mL of stock M₁</span>
                    <span className="block text-teal-600 dark:text-teal-400 font-bold">
                      Add {dilutionResult.solventNeeded.toFixed(2)} mL of solvent
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 4: pH, pOH & ACID-BASE EQUILIBRIUM */}
      {/* ========================================================== */}
      {activeTab === 'acidbase' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                pH, pOH, and Hydronium / Hydroxide Ion Converter (25°C)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Governed by the water ion product constant: <span className="font-mono text-teal-600">Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Input Mode:</span>
              {(['pH', 'pOH', 'H', 'OH'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setPhInputMode(m)}
                  className={`px-3 py-1 rounded-lg font-mono font-bold transition-colors ${
                    phInputMode === m
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {m === 'H' ? '[H⁺]' : m === 'OH' ? '[OH⁻]' : m}
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Enter Value for {phInputMode === 'H' ? '[H⁺] (mol/L)' : phInputMode === 'OH' ? '[OH⁻] (mol/L)' : phInputMode}
              </label>
              <input
                type="number"
                step={phInputMode === 'H' || phInputMode === 'OH' ? '0.0001' : '0.1'}
                value={phInputVal}
                onChange={(e) => setPhInputVal(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm font-bold"
              />
            </div>

            {acidBaseResult.isValid && (
              <div className="space-y-4">
                {/* Visual pH Scale Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span className="text-rose-600">Acidic (0 - 6)</span>
                    <span className="text-emerald-600">Neutral (7)</span>
                    <span className="text-indigo-600">Basic (8 - 14)</span>
                  </div>
                  <div className="relative w-full h-4 rounded-full bg-linear-to-r from-rose-500 via-emerald-400 to-indigo-600 shadow-inner">
                    <div
                      style={{ left: `${Math.min(100, Math.max(0, ((acidBaseResult.pH ?? 7) / 14) * 100))}%` }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-6 bg-white border-2 border-slate-900 rounded shadow"
                      title={`Current pH: ${acidBaseResult.pH}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-sans">pH</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{acidBaseResult.pH}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-sans">pOH</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{acidBaseResult.pOH}</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-sans">[H⁺]</span>
                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400">
                      {acidBaseResult.concH?.toExponential(3)} M
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] block font-sans">[OH⁻]</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      {acidBaseResult.concOH?.toExponential(3)} M
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section B: Henderson-Hasselbalch Buffer */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Henderson-Hasselbalch Buffer System
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Equation: <span className="font-mono text-teal-600">pH = pKa + log₁₀([Conjugate Base] / [Weak Acid])</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="text-[11px] font-sans text-slate-500 block mb-1">Acid pKa</label>
                <input
                  type="number"
                  step="0.01"
                  value={bufferPka}
                  onChange={(e) => setBufferPka(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-sans text-slate-500 block mb-1">[Conjugate Base A⁻] (M)</label>
                <input
                  type="number"
                  step="0.01"
                  value={bufferBaseConc}
                  onChange={(e) => setBufferBaseConc(Math.max(0.001, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-sans text-slate-500 block mb-1">[Weak Acid HA] (M)</label>
                <input
                  type="number"
                  step="0.01"
                  value={bufferAcidConc}
                  onChange={(e) => setBufferAcidConc(Math.max(0.001, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>

            {bufferResult.isValid && (
              <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-teal-700 dark:text-teal-400 font-semibold block">Buffer Equilibrium pH:</span>
                  <div className="text-2xl font-bold font-mono text-teal-900 dark:text-teal-100 mt-0.5">
                    {bufferResult.pH}
                  </div>
                </div>
                <div className="text-right text-xs font-mono text-slate-500">
                  <span>[A⁻]/[HA] Ratio: {bufferResult.ratio}</span>
                  <span className="block text-[11px] text-slate-400">
                    Optimal buffering zone: {(bufferPka - 1).toFixed(2)} to {(bufferPka + 1).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* TAB 5: IDEAL GAS LAW (PV = nRT) */}
      {/* ========================================================== */}
      {activeTab === 'gaslaw' && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ideal Gas Law (PV = nRT)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Universal gas constant: <span className="font-mono text-teal-600">R = 0.082057 L·atm / (mol·K)</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Target Unknown:</span>
            {[
              { id: 'P', label: 'Pressure (P)' },
              { id: 'V', label: 'Volume (V)' },
              { id: 'n', label: 'Moles (n)' },
              { id: 'T', label: 'Temperature (T)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setGasTarget(t.id as any)}
                className={`px-3 py-1 rounded-lg font-mono font-bold transition-colors ${
                  gasTarget === t.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div>
              <label className="text-[11px] font-sans text-slate-500 block mb-1">Pressure P (atm)</label>
              <input
                type="number"
                step="0.1"
                value={gasP}
                disabled={gasTarget === 'P'}
                onChange={(e) => setGasP(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="text-[11px] font-sans text-slate-500 block mb-1">Volume V (Liters)</label>
              <input
                type="number"
                step="0.5"
                value={gasV}
                disabled={gasTarget === 'V'}
                onChange={(e) => setGasV(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="text-[11px] font-sans text-slate-500 block mb-1">Moles n (mol)</label>
              <input
                type="number"
                step="0.1"
                value={gasN}
                disabled={gasTarget === 'n'}
                onChange={(e) => setGasN(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div>
              <label className="text-[11px] font-sans text-slate-500 block mb-1">Temp T (Kelvin)</label>
              <input
                type="number"
                step="1"
                value={gasT}
                disabled={gasTarget === 'T'}
                onChange={(e) => setGasT(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>
          </div>

          {gasResult.isValid && (
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-xl flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-teal-700 dark:text-teal-400 font-semibold font-sans block">
                  Computed {gasTarget}:
                </span>
                <div className="text-2xl font-bold text-teal-950 dark:text-teal-100 mt-0.5">
                  {gasResult.value.toFixed(4)} <span className="text-sm font-normal">{gasResult.unit}</span>
                </div>
              </div>

              {gasResult.celsius !== undefined && (
                <div className="text-right text-slate-500">
                  <span>Equivalent: {gasResult.celsius.toFixed(2)} °C</span>
                  <span className="block text-[11px] text-slate-400">{gasResult.formula}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
