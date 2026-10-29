import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Copy, Check, AlertCircle, Info, Settings2 } from 'lucide-react';

interface SubjectEntry {
  id: string;
  name: string;
  obtained: string;
  maxMarks: string;
}

interface GradeBoundary {
  letter: string;
  minPercent: number;
}

const DEFAULT_GRADE_BOUNDARIES: GradeBoundary[] = [
  { letter: 'A+', minPercent: 90 },
  { letter: 'A', minPercent: 80 },
  { letter: 'B', minPercent: 70 },
  { letter: 'C', minPercent: 60 },
  { letter: 'D', minPercent: 50 },
  { letter: 'F', minPercent: 0 },
];

export function MarksCalculatorTool() {
  const [subjects, setSubjects] = useState<SubjectEntry[]>([
    { id: '1', name: 'Mathematics', obtained: '88', maxMarks: '100' },
    { id: '2', name: 'Physics', obtained: '82', maxMarks: '100' },
    { id: '3', name: 'Chemistry', obtained: '76', maxMarks: '100' },
    { id: '4', name: 'English Literature', obtained: '91', maxMarks: '100' },
    { id: '5', name: 'Computer Science', obtained: '95', maxMarks: '100' },
  ]);

  const [boundaries, setBoundaries] = useState<GradeBoundary[]>(DEFAULT_GRADE_BOUNDARIES);
  const [showGradeSettings, setShowGradeSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  const addSubject = () => {
    const newId = Date.now().toString();
    setSubjects((prev) => [
      ...prev,
      { id: newId, name: `Subject ${prev.length + 1}`, obtained: '0', maxMarks: '100' },
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSubject = (id: string, field: 'name' | 'obtained' | 'maxMarks', val: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  // Calculations
  const stats = useMemo(() => {
    let totalObtained = 0;
    let totalMax = 0;

    const subjectStats = subjects.map((s) => {
      const obt = parseFloat(s.obtained) || 0;
      const max = parseFloat(s.maxMarks) || 100;
      totalObtained += obt;
      totalMax += max;

      const pct = max > 0 ? (obt / max) * 100 : 0;
      const grade =
        boundaries.find((b) => pct >= b.minPercent)?.letter || 'F';

      return {
        ...s,
        obtainedNum: obt,
        maxNum: max,
        percentage: pct,
        grade,
      };
    });

    const overallPercentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
    const overallGrade =
      boundaries.find((b) => overallPercentage >= b.minPercent)?.letter || 'F';

    return {
      subjectStats,
      totalObtained,
      totalMax,
      overallPercentage,
      overallGrade,
    };
  }, [subjects, boundaries]);

  const handleCopy = () => {
    const text = `Academic Marks Summary:\n${stats.subjectStats.map((s) => `${s.name}: ${s.obtainedNum}/${s.maxNum} (${s.percentage.toFixed(1)}% - Grade ${s.grade})`).join('\n')}\nTotal: ${stats.totalObtained}/${stats.totalMax} (${stats.overallPercentage.toFixed(2)}% - Estimated Grade ${stats.overallGrade})\nNote: Informal estimate; verify with institution grading policies.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Settings Toggle */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Student Marks & Overall Grade Estimator
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Enter individual subject scores to calculate cumulative percentages and grade point standings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGradeSettings(!showGradeSettings)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showGradeSettings ? 'Hide Scale' : 'Edit Grade Scale'}</span>
            </button>
            <button
              onClick={addSubject}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 flex items-center gap-1.5 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Subject</span>
            </button>
          </div>
        </div>

        {/* Configurable Grade Cutoffs Editor */}
        {showGradeSettings && (
          <div className="my-4 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs space-y-3">
            <div className="font-semibold text-neutral-800 dark:text-neutral-200">
              Custom Grade Scale Boundaries (Minimum %):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {boundaries.map((b, idx) => (
                <div key={b.letter} className="p-2 bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800">
                  <div className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    Grade {b.letter}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-neutral-400">≥</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={b.minPercent}
                      disabled={b.letter === 'F'}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setBoundaries((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, minPercent: val } : item))
                        );
                      }}
                      className="w-full px-1.5 py-1 text-xs font-mono bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded text-center"
                    />
                    <span className="text-neutral-400">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subjects List */}
        <div className="space-y-3 mt-4">
          <div className="grid grid-cols-12 gap-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider px-2">
            <div className="col-span-5 sm:col-span-5">Subject Name</div>
            <div className="col-span-3 sm:col-span-2">Marks Obtained</div>
            <div className="col-span-3 sm:col-span-2">Max Marks</div>
            <div className="hidden sm:block sm:col-span-2 text-right">Percentage</div>
            <div className="col-span-1 text-center"></div>
          </div>

          {stats.subjectStats.map((sub) => (
            <div
              key={sub.id}
              className="grid grid-cols-12 gap-3 items-center p-2.5 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80"
            >
              <div className="col-span-5 sm:col-span-5">
                <input
                  type="text"
                  value={sub.name}
                  onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                  placeholder="Subject"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={sub.obtained}
                  onChange={(e) => updateSubject(sub.id, 'obtained', e.target.value)}
                  placeholder="85"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-mono text-neutral-900 dark:text-neutral-100 text-right focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <input
                  type="number"
                  min={1}
                  value={sub.maxMarks}
                  onChange={(e) => updateSubject(sub.id, 'maxMarks', e.target.value)}
                  placeholder="100"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-xs font-mono text-neutral-900 dark:text-neutral-100 text-right focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div className="hidden sm:flex sm:col-span-2 items-center justify-end gap-1.5 font-mono text-xs tabular-nums text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold">{sub.percentage.toFixed(1)}%</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold">
                  {sub.grade}
                </span>
              </div>

              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => removeSubject(sub.id)}
                  disabled={subjects.length <= 1}
                  className="p-1 text-neutral-400 hover:text-rose-600 disabled:opacity-20 transition-colors"
                  title="Remove subject"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cumulative Overall Score Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <div>
            <div className="text-xs text-neutral-500">Cumulative Percentage</div>
            <div className="text-3xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
              {stats.overallPercentage.toFixed(2)}%
            </div>
          </div>

          <div>
            <div className="text-xs text-neutral-500">Total Marks Scored</div>
            <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
              {stats.totalObtained} / {stats.totalMax}
            </div>
          </div>

          <div>
            <div className="text-xs text-neutral-500">Estimated Grade Standing</div>
            <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 mt-1">
              Grade {stats.overallGrade}
            </div>
          </div>

          <div className="flex sm:justify-end">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* Verification & Grade Disclaimer */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-500">
          <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-neutral-700 dark:text-neutral-300">
              Unofficial Calculation Notice:
            </strong>{' '}
            Grading schemas, grade boundaries, and credit weighting vary across educational boards, universities, and individual instructors. Results calculated here are informal guides and must not be used as official certified transcripts or verified grade conversions.
          </div>
        </div>
      </div>
    </div>
  );
}
