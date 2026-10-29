import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { calculateCalendarAge, calculateDateDifference } from '../../logic/dateCalculations';

export function AgeDateCalculatorTool() {
  const [mode, setMode] = useState<'age' | 'diff' | 'countdown'>('age');

  // Today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Age Calculator
  const [birthDateStr, setBirthDateStr] = useState('2000-01-15');
  const [asOfDateStr, setAsOfDateStr] = useState(todayStr);

  // Date Difference
  const [startDateStr, setStartDateStr] = useState('2024-01-01');
  const [endDateStr, setEndDateStr] = useState(todayStr);

  // Countdown
  const [targetDateStr, setTargetDateStr] = useState('2026-12-31');

  const [copied, setCopied] = useState(false);

  // Parse dates safely (avoiding UTC timezone shifts)
  const parseLocalDate = (dateStr: string): Date => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const ageResult = calculateCalendarAge(parseLocalDate(birthDateStr), parseLocalDate(asOfDateStr));
  const diffResult = calculateDateDifference(parseLocalDate(startDateStr), parseLocalDate(endDateStr));

  // Countdown computation
  const targetDate = parseLocalDate(targetDateStr);
  const now = new Date();
  const utcTarget = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const utcToday = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const daysUntilTarget = Math.ceil((utcTarget - utcToday) / (1000 * 60 * 60 * 24));

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
        <button
          onClick={() => setMode('age')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            mode === 'age'
              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Age Calculator
        </button>
        <button
          onClick={() => setMode('diff')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            mode === 'diff'
              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Date Difference
        </button>
        <button
          onClick={() => setMode('countdown')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
            mode === 'countdown'
              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Days Until Target
        </button>
      </div>

      {mode === 'age' && (
        <div className="space-y-6">
          {/* Inputs */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDateStr}
                  onChange={(e) => setBirthDateStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Age As Of Date
                </label>
                <input
                  type="date"
                  value={asOfDateStr}
                  onChange={(e) => setAsOfDateStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Main Result Card */}
            {ageResult ? (
              <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-5">
                <div className="p-5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-neutral-500 font-medium">Exact Calendar Age:</div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
                      {ageResult.years} <span className="text-sm font-sans font-normal text-neutral-500">years</span>{' '}
                      {ageResult.months} <span className="text-sm font-sans font-normal text-neutral-500">months</span>{' '}
                      {ageResult.days} <span className="text-sm font-sans font-normal text-neutral-500">days</span>
                    </div>
                    {ageResult.isBornLeapDay && (
                      <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Born on Leap Day (February 29). Non-leap year birthdays celebrated on February 28 / March 1.
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      copyText(
                        `${ageResult.years} years, ${ageResult.months} months, ${ageResult.days} days`
                      )
                    }
                    className="self-start sm:self-center px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy Age'}
                  </button>
                </div>

                {/* Secondary Elapsed Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <div className="text-[11px] text-neutral-500">Total Days Elapsed</div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums mt-0.5">
                      {ageResult.totalDays.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <div className="text-[11px] text-neutral-500">Total Weeks Elapsed</div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums mt-0.5">
                      {ageResult.totalWeeks.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <div className="text-[11px] text-neutral-500">Total Hours (Approx)</div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums mt-0.5">
                      {ageResult.totalHours.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <div className="text-[11px] text-neutral-500">Next Birthday Countdown</div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums mt-0.5">
                      {ageResult.nextBirthdayDays}{' '}
                      <span className="text-xs font-normal text-neutral-500">days</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                      {ageResult.nextBirthdayDate}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Calendar Age vs Elapsed Days:
                  </span>{' '}
                  Calendar age preserves month and year boundaries (e.g., February has 28 or 29 days, while August has 31). Elapsed days strictly counts astronomical 24-hour day passages.
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200">
                Birth date cannot be after the "As of" date. Please verify your selected dates.
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'diff' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          {diffResult && (
            <div className="p-5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 space-y-3">
              <div className="text-xs text-neutral-500 font-medium">Time Span Between Dates:</div>
              <div className="text-2xl font-mono font-bold text-neutral-900 dark:text-neutral-50 tabular-nums">
                {diffResult.years} years, {diffResult.months} months, {diffResult.days} days
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400 font-mono tabular-nums">
                = {diffResult.totalDays.toLocaleString()} calendar days ({diffResult.totalWeeks.toLocaleString()} weeks)
              </div>
            </div>
          )}
        </div>
      )}

      {mode === 'countdown' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Select Target Event / Date
            </label>
            <input
              type="date"
              value={targetDateStr}
              onChange={(e) => setTargetDateStr(e.target.value)}
              className="w-full sm:w-80 px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div className="p-5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
            <div className="text-xs text-neutral-500 font-medium">Countdown from Today:</div>
            <div className="text-3xl font-mono font-bold text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
              {daysUntilTarget > 0 ? (
                <>
                  {daysUntilTarget.toLocaleString()}{' '}
                  <span className="text-sm font-sans font-normal text-neutral-500">
                    days remaining
                  </span>
                </>
              ) : daysUntilTarget === 0 ? (
                'Today is the target date!'
              ) : (
                <>
                  {Math.abs(daysUntilTarget).toLocaleString()}{' '}
                  <span className="text-sm font-sans font-normal text-neutral-500">
                    days ago
                  </span>
                </>
              )}
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              Target date: {targetDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
