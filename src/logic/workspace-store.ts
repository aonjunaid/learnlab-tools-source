/**
 * Local-First Workspace Persistence and Academic Lab Report Engine for LearnLab Tools.
 * Stores experiments, calculator audit rolls, and notes locally in the browser.
 * Generates formatted, publication-grade printable lab reports.
 */

export interface LabExperimentEntry {
  id: string;
  title: string;
  toolCategory: 'chemistry' | 'physics' | 'optics' | 'kinetics' | 'calculator' | 'everyday';
  timestamp: number;
  authorName?: string;
  objective: string;
  equations: string[];
  parameters: { name: string; value: string; unit?: string }[];
  results: { label: string; value: string }[];
  substitutions?: string[];
  assumptions: string[];
  limitations: string[];
  userNotes?: string;
  canvasSnapshotDataUrl?: string;
}

export interface PaperTapeEntry {
  id: string;
  timestamp: number;
  title: string;
  items: { operation: string; value: number; formatted: string; timestamp: number }[];
  subtotal: number;
  taxAmount: number;
  total: number;
}

const EXPERIMENTS_STORAGE_KEY = 'learnlab_experiments_v1';
const TAPES_STORAGE_KEY = 'learnlab_paper_tapes_v1';

// ----------------------------------------------------------------------
// Experiments Management
// ----------------------------------------------------------------------

export function loadSavedExperiments(): LabExperimentEntry[] {
  try {
    const raw = localStorage.getItem(EXPERIMENTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load experiments from localStorage:', err);
    return [];
  }
}

export function saveExperiment(entry: Omit<LabExperimentEntry, 'id' | 'timestamp'>): LabExperimentEntry {
  const experiments = loadSavedExperiments();
  const newEntry: LabExperimentEntry = {
    ...entry,
    id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
  };

  // Prepend to list (most recent first), cap at 50 to prevent storage exhaustion
  const updated = [newEntry, ...experiments].slice(0, 50);
  try {
    localStorage.setItem(EXPERIMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save experiment to localStorage:', err);
  }
  return newEntry;
}

export function deleteExperiment(id: string): void {
  const experiments = loadSavedExperiments().filter((e) => e.id !== id);
  try {
    localStorage.setItem(EXPERIMENTS_STORAGE_KEY, JSON.stringify(experiments));
  } catch (err) {
    console.error('Failed to delete experiment:', err);
  }
}

// ----------------------------------------------------------------------
// Paper Tape Rolls Management
// ----------------------------------------------------------------------

export function loadSavedTapes(): PaperTapeEntry[] {
  try {
    const raw = localStorage.getItem(TAPES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load paper tapes:', err);
    return [];
  }
}

export function savePaperTape(tape: Omit<PaperTapeEntry, 'id' | 'timestamp'>): PaperTapeEntry {
  const tapes = loadSavedTapes();
  const newEntry: PaperTapeEntry = {
    ...tape,
    id: `tape_${Date.now()}`,
    timestamp: Date.now(),
  };

  const updated = [newEntry, ...tapes].slice(0, 30);
  try {
    localStorage.setItem(TAPES_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save paper tape:', err);
  }
  return newEntry;
}

// ----------------------------------------------------------------------
// Export Utilities
// ----------------------------------------------------------------------

export function exportWorkspaceAsJSON(): string {
  const payload = {
    appName: 'LearnLab Tools Workspace',
    exportedAt: new Date().toISOString(),
    experiments: loadSavedExperiments(),
    paperTapes: loadSavedTapes(),
  };
  return JSON.stringify(payload, null, 2);
}

export function generateMarkdownLabReport(exp: LabExperimentEntry): string {
  const dateStr = new Date(exp.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let md = `# Laboratory Investigation Report: ${exp.title}\n\n`;
  md += `**Investigator:** ${exp.authorName || 'LearnLab Student / Researcher'}  \n`;
  md += `**Date:** ${dateStr}  \n`;
  md += `**Domain:** ${exp.toolCategory.toUpperCase()}  \n\n`;

  md += `## 1. Objective\n${exp.objective}\n\n`;

  md += `## 2. Theoretical Principles & Governing Equations\n`;
  for (const eq of exp.equations) {
    md += `- $$${eq}$$\n`;
  }
  md += `\n`;

  md += `## 3. Experimental Input Parameters\n`;
  md += `| Parameter | Value | Unit |\n|---|---|---|\n`;
  for (const p of exp.parameters) {
    md += `| ${p.name} | ${p.value} | ${p.unit || '—'} |\n`;
  }
  md += `\n`;

  md += `## 4. Calculated Results\n`;
  md += `| Measurement | Computed Output |\n|---|---|\n`;
  for (const r of exp.results) {
    md += `| ${r.label} | ${r.value} |\n`;
  }
  md += `\n`;

  if (exp.substitutions && exp.substitutions.length > 0) {
    md += `## 5. Step-by-Step Mathematical Substitution\n`;
    for (const sub of exp.substitutions) {
      md += `1. ${sub}\n`;
    }
    md += `\n`;
  }

  md += `## 6. Assumptions & Real-World Deviations\n`;
  md += `### Assumptions:\n`;
  for (const a of exp.assumptions) {
    md += `- ${a}\n`;
  }
  md += `\n### Empirical Limitations & Sources of Error:\n`;
  for (const l of exp.limitations) {
    md += `- ${l}\n`;
  }
  md += `\n`;

  if (exp.userNotes) {
    md += `## 7. Investigator Notes & Observations\n${exp.userNotes}\n\n`;
  }

  md += `---\n*Generated by LearnLab Tools — Free tools for everyday tasks, scientific problem-solving and smarter learning.*`;
  return md;
}
