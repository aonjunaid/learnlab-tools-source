import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Printer,
  Download,
  Trash2,
  X,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  Copy,
  Check,
} from 'lucide-react';
import {
  LabExperimentEntry,
  loadSavedExperiments,
  deleteExperiment,
  generateMarkdownLabReport,
  exportWorkspaceAsJSON,
} from '../logic/workspace-store';

interface LabNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeExperimentToPin?: Omit<LabExperimentEntry, 'id' | 'timestamp'> | null;
  onSaveActiveExperiment?: () => void;
}

export function LabNotebookModal({
  isOpen,
  onClose,
  activeExperimentToPin,
  onSaveActiveExperiment,
}: LabNotebookModalProps) {
  const [experiments, setExperiments] = useState<LabExperimentEntry[]>([]);
  const [selectedExp, setSelectedExp] = useState<LabExperimentEntry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'report'>('browse');

  useEffect(() => {
    if (isOpen) {
      const list = loadSavedExperiments();
      setExperiments(list);
      if (list.length > 0 && !selectedExp) {
        setSelectedExp(list[0]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteExperiment(id);
    const updated = loadSavedExperiments();
    setExperiments(updated);
    if (selectedExp?.id === id) {
      setSelectedExp(updated[0] || null);
    }
  };

  const handleCopyMarkdown = (exp: LabExperimentEntry) => {
    const md = generateMarkdownLabReport(exp);
    navigator.clipboard.writeText(md);
    setCopiedId(exp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const data = exportWorkspaceAsJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnlab_workspace_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Academic Lab Notebook & Reports
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Local-first experiment records, mathematical derivations, and printable publication reports
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeExperimentToPin && onSaveActiveExperiment && (
              <button
                onClick={() => {
                  onSaveActiveExperiment();
                  const updated = loadSavedExperiments();
                  setExperiments(updated);
                  setSelectedExp(updated[0]);
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Pin Current Tool Trial
              </button>
            )}
            <button
              onClick={handleDownloadJSON}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Backup JSON
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left Sidebar: Saved Entries List */}
          <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto space-y-2.5 max-h-[calc(90vh-80px)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                Saved Experiments ({experiments.length})
              </span>
            </div>

            {experiments.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  No experiments pinned yet
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Click "Pin to Lab Notebook" inside any simulation or chemistry tool to save data here.
                </p>
              </div>
            ) : (
              experiments.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExp(exp)}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedExp?.id === exp.id
                      ? 'bg-teal-50/70 dark:bg-teal-950/30 border-teal-300 dark:border-teal-700 shadow-xs'
                      : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {exp.title}
                    </span>
                    <button
                      onClick={(e) => handleDelete(exp.id, e)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 rounded"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-mono">
                    <span className="uppercase text-teal-600 dark:text-teal-400 font-semibold font-sans">
                      {exp.toolCategory}
                    </span>
                    <span>·</span>
                    <span>{new Date(exp.timestamp).toLocaleDateString()}</span>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">
                    {exp.results[0]?.label}: <strong className="font-mono">{exp.results[0]?.value}</strong>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Area: Experiment Preview & Printable Report */}
          <div className="md:col-span-8 p-6 overflow-y-auto max-h-[calc(90vh-80px)] bg-slate-50/50 dark:bg-slate-900">
            {selectedExp ? (
              <div className="space-y-6">
                {/* Actions Toolbar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">
                      ID: {selectedExp.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyMarkdown(selectedExp)}
                      className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId === selectedExp.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied Markdown
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Markdown
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Lab Report
                    </button>
                  </div>
                </div>

                {/* Printable Academic Paper Container */}
                <div
                  id="printable-lab-report"
                  className="p-8 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm space-y-6 print:border-none print:shadow-none print:p-0"
                >
                  {/* Report Header */}
                  <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold">
                        LearnLab Empirical Investigation · {selectedExp.toolCategory}
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {new Date(selectedExp.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {selectedExp.title}
                    </h1>
                  </div>

                  {/* 1. Objective */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-1">
                      1. Scientific Objective
                    </h3>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {selectedExp.objective}
                    </p>
                  </div>

                  {/* 2. Governing Equations */}
                  {selectedExp.equations.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-2">
                        2. Governing Equations
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedExp.equations.map((eq, i) => (
                          <div
                            key={i}
                            className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs text-teal-700 dark:text-teal-400 font-semibold"
                          >
                            {eq}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Input Parameters Table */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-2">
                      3. Experimental Input Parameters
                    </h3>
                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-mono">
                          <tr>
                            <th className="px-4 py-2">Parameter</th>
                            <th className="px-4 py-2">Input Value</th>
                            <th className="px-4 py-2">Unit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                          {selectedExp.parameters.map((p, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="px-4 py-2 font-sans font-medium text-slate-800 dark:text-slate-200">
                                {p.name}
                              </td>
                              <td className="px-4 py-2 text-slate-900 dark:text-white font-semibold">
                                {p.value}
                              </td>
                              <td className="px-4 py-2 text-slate-400 font-sans">
                                {p.unit || '—'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 4. Computed Results */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-2">
                      4. Calculated Laboratory Results
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedExp.results.map((r, i) => (
                        <div
                          key={i}
                          className="p-3 bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-xl"
                        >
                          <span className="text-[11px] text-teal-800 dark:text-teal-300 font-medium font-sans block">
                            {r.label}
                          </span>
                          <span className="text-lg font-bold font-mono text-teal-950 dark:text-teal-100">
                            {r.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. Substitutions */}
                  {selectedExp.substitutions && selectedExp.substitutions.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mb-2">
                        5. Step-by-Step Mathematical Substitution
                      </h3>
                      <div className="space-y-1.5 p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300">
                        {selectedExp.substitutions.map((sub, i) => (
                          <div key={i} className="leading-relaxed">
                            <span className="text-teal-600 font-bold mr-1.5">{i + 1}.</span>
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 6. Assumptions & Limitations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono block mb-2">
                        Assumptions of Ideal Model
                      </span>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                        {selectedExp.assumptions.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider font-mono block mb-2">
                        Empirical Divergence & Error Sources
                      </span>
                      <ul className="text-xs text-amber-900/80 dark:text-amber-300/80 space-y-1.5 list-disc list-inside">
                        {selectedExp.limitations.map((l, i) => (
                          <li key={i}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 text-slate-400">
                <FileText className="w-12 h-12 mb-3 opacity-40" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Select an experiment from the sidebar to inspect or print
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
