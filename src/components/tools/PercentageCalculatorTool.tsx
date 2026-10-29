import React, { useState } from 'react';
import { Copy, Check, RotateCcw, AlertCircle, ArrowRight } from 'lucide-react';
import {
  calculatePercentageOf,
  calculatePercentageShare,
  calculatePercentageChange,
  calculateReversePercentage,
} from '../../logic/percentages';

type PercentageMode = 'percentage-of' | 'percentage-share' | 'percentage-change' | 'reverse';

export function PercentageCalculatorTool() {
  const [mode, setMode] = useState<PercentageMode>('percentage-of');

  // Mode 1: What is X% of Y?
  const [val1Percent, setVal1Percent] = useState('15');
  const [val1Total, setVal1Total] = useState('240');

  // Mode 2: X is what % of Y?
  const [val2Part, setVal2Part] = useState('45');
  const [val2Total, setVal2Total] = useState('180');

  // Mode 3: % Increase / Decrease from X to Y
  const [val3From, setVal3From] = useState('80');
  const [val3To, setVal3To] = useState('120');

  // Mode 4: Reverse (X is P% of what?)
  const [val4Amount, setVal4Amount] = useState('75');
  const [val4Percent, setVal4Percent] = useState('25');

  const [copied, setCopied] = useState(false);

  // Results
  const result1 = calculatePercentageOf(parseFloat(val1Percent), parseFloat(val1Total));
  const result2 = calculatePercentageShare(parseFloat(val2Part), parseFloat(val2Total));
  const result3 = calculatePercentageChange(parseFloat(val3From), parseFloat(val3To));
  const result4 = calculateReversePercentage(parseFloat(val4Amount), parseFloat(val4Percent));

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-x-auto scrollbar-none">
        {[
          { id: 'percentage-of', label: 'X% of Y' },
          { id: 'percentage-share', label: 'X is what % of Y' },
          { id: 'percentage-change', label: '% Increase / Decrease' },
          { id: 'reverse', label: 'Reverse Percentage' },
        ].map((tab) => {
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as PercentageMode)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Calculation Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        {mode === 'percentage-of' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Calculate Percentage of a Value
              </h3>
              <p className="text-xs text-neutral-500">
                Find the numeric portion represented by a given percentage of a base quantity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Percentage (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={val1Percent}
                    onChange={(e) => setVal1Percent(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">
                    %
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Of Base Value (Total)
                </label>
                <input
                  type="number"
                  value={val1Total}
                  onChange={(e) => setVal1Total(e.target.value)}
                  placeholder="e.g. 240"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Answer Display */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-neutral-500">
                  {val1Percent || '0'}% of {val1Total || '0'} is:
                </div>
                <div className="text-3xl font-mono font-bold text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
                  {result1.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
              </div>
              <button
                onClick={() => copyText(String(result1.value))}
                className="self-start sm:self-center px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy Result'}
              </button>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
              <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                Formula & Step-by-Step Calculation:
              </div>
              <div className="font-mono bg-neutral-100 dark:bg-neutral-950 px-3 py-1.5 rounded text-neutral-800 dark:text-neutral-200 w-fit">
                Result = ({val1Percent || '0'} / 100) × {val1Total || '0'} = {result1.value}
              </div>
              {result1.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[11px]">
                  <span className="text-neutral-400">·</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'percentage-share' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Calculate Percentage Share
              </h3>
              <p className="text-xs text-neutral-500">
                Determine what fraction or percentage one quantity is of another total.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Part Amount (X)
                </label>
                <input
                  type="number"
                  value={val2Part}
                  onChange={(e) => setVal2Part(e.target.value)}
                  placeholder="e.g. 45"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Total Amount (Y)
                </label>
                <input
                  type="number"
                  value={val2Total}
                  onChange={(e) => setVal2Total(e.target.value)}
                  placeholder="e.g. 180"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Answer Display */}
            {result2.isUndefined ? (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Calculation Undefined</div>
                  <div className="mt-0.5">{result2.steps[0]}</div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-500">
                    {val2Part || '0'} is what percentage of {val2Total || '0'}?
                  </div>
                  <div className="text-3xl font-mono font-bold text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
                    {result2.percentage.toLocaleString(undefined, { maximumFractionDigits: 4 })}%
                  </div>
                </div>
                <button
                  onClick={() => copyText(`${result2.percentage.toFixed(4)}%`)}
                  className="self-start sm:self-center px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Result'}
                </button>
              </div>
            )}

            {!result2.isUndefined && (
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Formula:
                </div>
                <div className="font-mono bg-neutral-100 dark:bg-neutral-950 px-3 py-1.5 rounded text-neutral-800 dark:text-neutral-200 w-fit">
                  ({val2Part || '0'} ÷ {val2Total || '0'}) × 100 = {result2.percentage.toFixed(4)}%
                </div>
                {result2.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    <span className="text-neutral-400">·</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === 'percentage-change' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Percentage Increase or Decrease
              </h3>
              <p className="text-xs text-neutral-500">
                Measure relative growth or drop between two numbers, including absolute difference.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Starting Value (Original)
                </label>
                <input
                  type="number"
                  value={val3From}
                  onChange={(e) => setVal3From(e.target.value)}
                  placeholder="e.g. 80"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Final Value (New)
                </label>
                <input
                  type="number"
                  value={val3To}
                  onChange={(e) => setVal3To(e.target.value)}
                  placeholder="e.g. 120"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Answer Display */}
            {result3.isUndefined ? (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Cannot Compute Percentage From Zero</div>
                  <div className="mt-0.5">{result3.steps[0]} Absolute difference is {result3.absoluteChange}.</div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-500">
                    Change from {val3From} to {val3To}:
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className={`text-3xl font-mono font-bold tabular-nums ${
                        result3.type === 'increase'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : result3.type === 'decrease'
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-neutral-900 dark:text-neutral-100'
                      }`}
                    >
                      {result3.percentageChange > 0 ? '+' : ''}
                      {result3.percentageChange.toLocaleString(undefined, { maximumFractionDigits: 4 })}%
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      ({result3.type === 'increase' ? 'Increase' : result3.type === 'decrease' ? 'Decrease' : 'No change'})
                    </span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5 tabular-nums">
                    Absolute change: {result3.absoluteChange > 0 ? '+' : ''}{result3.absoluteChange}
                  </div>
                </div>
                <button
                  onClick={() => copyText(`${result3.percentageChange.toFixed(4)}%`)}
                  className="self-start sm:self-center px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Result'}
                </button>
              </div>
            )}

            {!result3.isUndefined && (
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Formula & Steps:
                </div>
                <div className="font-mono bg-neutral-100 dark:bg-neutral-950 px-3 py-1.5 rounded text-neutral-800 dark:text-neutral-200 w-fit">
                  ((New - Original) ÷ |Original|) × 100 = (({val3To} - {val3From}) ÷ |{val3From}|) × 100
                </div>
                {result3.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    <span className="text-neutral-400">·</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === 'reverse' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Reverse Percentage Calculator
              </h3>
              <p className="text-xs text-neutral-500">
                Find the original base number when you already know that X is P% of it (e.g., finding the pre-discount or pre-tax total).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Known Amount (Result)
                </label>
                <input
                  type="number"
                  value={val4Amount}
                  onChange={(e) => setVal4Amount(e.target.value)}
                  placeholder="e.g. 75"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Is What Percentage (%)?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={val4Percent}
                    onChange={(e) => setVal4Percent(e.target.value)}
                    placeholder="e.g. 25"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-base font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Display */}
            {result4.isUndefined ? (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Percentage Cannot Be Zero</div>
                  <div className="mt-0.5">{result4.steps[0]}</div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-500">
                    If {val4Amount} is {val4Percent}% of total, the original base was:
                  </div>
                  <div className="text-3xl font-mono font-bold text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
                    {result4.baseValue.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                  </div>
                </div>
                <button
                  onClick={() => copyText(String(result4.baseValue))}
                  className="self-start sm:self-center px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Result'}
                </button>
              </div>
            )}

            {!result4.isUndefined && (
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Formula & Steps:
                </div>
                <div className="font-mono bg-neutral-100 dark:bg-neutral-950 px-3 py-1.5 rounded text-neutral-800 dark:text-neutral-200 w-fit">
                  Base = {val4Amount} ÷ ({val4Percent} / 100) = {result4.baseValue}
                </div>
                {result4.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px]">
                    <span className="text-neutral-400">·</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
