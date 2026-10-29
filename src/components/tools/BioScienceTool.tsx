import React, { useState, useMemo } from 'react';
import {
  Dna,
  FlaskConical,
  Search,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Info,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

// Standard Genetic Code codon table
const GENETIC_CODE: Record<string, { aa: string; name: string }> = {
  UUU: { aa: 'F', name: 'Phenylalanine' }, UUC: { aa: 'F', name: 'Phenylalanine' },
  UUA: { aa: 'L', name: 'Leucine' },       UUG: { aa: 'L', name: 'Leucine' },
  CUU: { aa: 'L', name: 'Leucine' },       CUC: { aa: 'L', name: 'Leucine' },
  CUA: { aa: 'L', name: 'Leucine' },       CUG: { aa: 'L', name: 'Leucine' },
  AUU: { aa: 'I', name: 'Isoleucine' },    AUC: { aa: 'I', name: 'Isoleucine' },
  AUA: { aa: 'I', name: 'Isoleucine' },    AUG: { aa: 'M', name: 'Methionine (Start)' },
  GUU: { aa: 'V', name: 'Valine' },        GUC: { aa: 'V', name: 'Valine' },
  GUA: { aa: 'V', name: 'Valine' },        GUG: { aa: 'V', name: 'Valine' },

  UCU: { aa: 'S', name: 'Serine' },        UCC: { aa: 'S', name: 'Serine' },
  UCA: { aa: 'S', name: 'Serine' },        UCG: { aa: 'S', name: 'Serine' },
  CCU: { aa: 'P', name: 'Proline' },       CCC: { aa: 'P', name: 'Proline' },
  CCA: { aa: 'P', name: 'Proline' },       CCG: { aa: 'P', name: 'Proline' },
  ACU: { aa: 'T', name: 'Threonine' },     ACC: { aa: 'T', name: 'Threonine' },
  ACA: { aa: 'T', name: 'Threonine' },     ACG: { aa: 'T', name: 'Threonine' },
  GCU: { aa: 'A', name: 'Alanine' },       GCC: { aa: 'A', name: 'Alanine' },
  GCA: { aa: 'A', name: 'Alanine' },       GCG: { aa: 'A', name: 'Alanine' },

  UAU: { aa: 'Y', name: 'Tyrosine' },      UAC: { aa: 'Y', name: 'Tyrosine' },
  UAA: { aa: '*', name: 'Stop (Ochre)' },  UAG: { aa: '*', name: 'Stop (Amber)' },
  CAU: { aa: 'H', name: 'Histidine' },     CAC: { aa: 'H', name: 'Histidine' },
  CAA: { aa: 'Q', name: 'Glutamine' },     CAG: { aa: 'Q', name: 'Glutamine' },
  AAU: { aa: 'N', name: 'Asparagine' },    AAC: { aa: 'N', name: 'Asparagine' },
  AAA: { aa: 'K', name: 'Lysine' },        AAG: { aa: 'K', name: 'Lysine' },
  GAU: { aa: 'D', name: 'Aspartate' },     GAC: { aa: 'D', name: 'Aspartate' },
  GAA: { aa: 'E', name: 'Glutamate' },     GAG: { aa: 'E', name: 'Glutamate' },

  UGU: { aa: 'C', name: 'Cysteine' },      UGC: { aa: 'C', name: 'Cysteine' },
  UGA: { aa: '*', name: 'Stop (Opal)' },   UGG: { aa: 'W', name: 'Tryptophan' },
  CGU: { aa: 'R', name: 'Arginine' },      CGC: { aa: 'R', name: 'Arginine' },
  CGA: { aa: 'R', name: 'Arginine' },      CGG: { aa: 'R', name: 'Arginine' },
  AGU: { aa: 'S', name: 'Serine' },        AGC: { aa: 'S', name: 'Serine' },
  AGA: { aa: 'R', name: 'Arginine' },      AGG: { aa: 'R', name: 'Arginine' },
  GGU: { aa: 'G', name: 'Glycine' },       GGC: { aa: 'G', name: 'Glycine' },
  GGA: { aa: 'G', name: 'Glycine' },       GGG: { aa: 'G', name: 'Glycine' },
};

export function BioScienceTool() {
  const [activeTab, setActiveTab] = useState<'genetics' | 'pubchem' | 'alphafold'>('genetics');

  // ==========================================
  // 1. GENETICS WORKBENCH STATE
  // ==========================================
  const [dnaInput, setDnaInput] = useState<string>('ATGGGTCGTCGTTACTAA');
  const [copiedSeq, setCopiedSeq] = useState(false);

  // Clean DNA Sequence
  const cleanDna = useMemo(() => {
    return dnaInput.toUpperCase().replace(/[^ATCGN]/g, '');
  }, [dnaInput]);

  // Central Dogma calculations
  const geneticsMetrics = useMemo(() => {
    const seq = cleanDna;
    const len = seq.length;

    if (len === 0) {
      return {
        rna: '',
        reverseComp: '',
        gcPercent: 0,
        tm: 0,
        mw: 0,
        codons: [],
        polypeptide: '',
      };
    }

    // Transcription: DNA -> RNA (T -> U)
    const rna = seq.replace(/T/g, 'U');

    // Reverse Complement (5' -> 3')
    const compMap: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C', N: 'N' };
    const reverseComp = seq
      .split('')
      .reverse()
      .map((b) => compMap[b] || 'N')
      .join('');

    // GC metrics
    let aCount = 0, tCount = 0, cCount = 0, gCount = 0;
    for (const b of seq) {
      if (b === 'A') aCount++;
      else if (b === 'T') tCount++;
      else if (b === 'C') cCount++;
      else if (b === 'G') gCount++;
    }

    const gcPercent = len > 0 ? ((gCount + cCount) / len) * 100 : 0;

    // Melting Temperature Tm
    // Wallace rule for <= 14bp: 2*(A+T) + 4*(G+C)
    // Marmur-Doty for > 14bp: 64.9 + 41*(G+C - 16.4)/N
    let tm = 0;
    if (len > 0) {
      if (len <= 14) {
        tm = 2 * (aCount + tCount) + 4 * (gCount + cCount);
      } else {
        tm = 64.9 + 41 * ((gCount + cCount - 16.4) / len);
      }
    }

    // Molecular weight of ssDNA approx ~330 g/mol per nucleotide
    const mw = len * 330;

    // Translation (codon by codon)
    const codons: { triplet: string; aa: string; name: string }[] = [];
    let polypeptide = '';

    for (let i = 0; i + 2 < rna.length; i += 3) {
      const triplet = rna.slice(i, i + 3);
      const entry = GENETIC_CODE[triplet] || { aa: '?', name: 'Unknown' };
      codons.push({ triplet, aa: entry.aa, name: entry.name });
      polypeptide += entry.aa;
    }

    return {
      rna,
      reverseComp,
      gcPercent,
      tm,
      mw,
      codons,
      polypeptide,
    };
  }, [cleanDna]);

  // ==========================================
  // 2. PUBCHEM EXPLORER STATE
  // ==========================================
  const [chemQuery, setChemQuery] = useState('Aspirin');
  const [chemLoading, setChemLoading] = useState(false);
  const [chemError, setChemError] = useState<string | null>(null);
  const [chemData, setChemData] = useState<{
    cid: number;
    name: string;
    properties: Record<string, any>;
    imageUrl: string;
    pubchemUrl: string;
  } | null>({
    cid: 2244,
    name: 'Aspirin',
    properties: {
      MolecularFormula: 'C9H8O4',
      MolecularWeight: '180.16',
      CanonicalSMILES: 'CC(=O)OC1=CC=CC=C1C(=O)O',
      InChIKey: 'BSYNRYMUTXBXSQ-UHFFFAOYSA-N',
      XLogP: 1.2,
      TPSA: 63.6,
      HBondDonorCount: 1,
      HBondAcceptorCount: 4,
      RotatableBondCount: 2,
    },
    imageUrl: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244/PNG?image_size=300x300',
    pubchemUrl: 'https://pubchem.ncbi.nlm.nih.gov/compound/2244',
  });

  const searchPubChem = async (queryToSearch: string) => {
    const q = queryToSearch.trim();
    if (!q) return;

    setChemLoading(true);
    setChemError(null);

    try {
      const res = await fetch(`/api/pubchem/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Failed with status ${res.status}`);
      }
      const data = await res.json();
      setChemData(data);
    } catch (err: any) {
      setChemError(err.message || 'Error searching PubChem database.');
    } finally {
      setChemLoading(false);
    }
  };

  // Lipinski's Rule of 5 evaluation
  const lipinskiAnalysis = useMemo(() => {
    if (!chemData?.properties) return null;
    const p = chemData.properties;
    const mw = parseFloat(p.MolecularWeight) || 0;
    const logP = parseFloat(p.XLogP) || 0;
    const hbd = parseInt(p.HBondDonorCount, 10) || 0;
    const hba = parseInt(p.HBondAcceptorCount, 10) || 0;

    const passMW = mw <= 500;
    const passLogP = logP <= 5;
    const passHBD = hbd <= 5;
    const passHBA = hba <= 10;

    const violations = [!passMW, !passLogP, !passHBD, !passHBA].filter(Boolean).length;

    return {
      mw,
      logP,
      hbd,
      hba,
      passMW,
      passLogP,
      passHBD,
      passHBA,
      violations,
      isDrugLike: violations <= 1,
    };
  }, [chemData]);

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('genetics')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'genetics'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Dna className="w-3.5 h-3.5" />
            Central Dogma & DNA / RNA
          </button>
          <button
            onClick={() => setActiveTab('pubchem')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'pubchem'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            PubChem Small Molecule Explorer
          </button>
          <button
            onClick={() => setActiveTab('alphafold')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'alphafold'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AlphaFold Structural Guide
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 1. CENTRAL DOGMA & GENETICS WORKBENCH */}
      {/* ========================================================== */}
      {activeTab === 'genetics' && (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Central Dogma Engine: </span>
              Transcribes DNA nucleotide sequences to messenger RNA ($T \to U$), translates codons into polypeptide
              amino acid chains, calculates oligonucleotide GC content, melting temperature ($T_m$), and reverse complements.
            </div>
          </div>

          {/* Quick-try presets */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Quick Sequences:</span>
            {[
              { label: 'Start Peptide (Met-Gly-Arg...)', seq: 'ATGGGTCGTCGTTACTAA' },
              { label: 'Insulin Exon Fragment', seq: 'ATGGCCCTGTGGATGCGCCTCCTGCCCCTGCTGGCGCTGCTGGCCCTCTGGGGACCT' },
              { label: 'TATA Box Promoter', seq: 'TATAAAAGGCGGGGCTAC' },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setDnaInput(preset.seq)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Sequence Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                5′ → 3′ DNA Coding Strand
              </label>
              <span className="text-xs font-mono text-slate-500">{cleanDna.length} bp</span>
            </div>
            <textarea
              rows={3}
              value={dnaInput}
              onChange={(e) => setDnaInput(e.target.value)}
              placeholder="Paste DNA sequence (A, T, C, G)..."
              className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-xs uppercase tracking-wider text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Key Biophysical Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl">
              <span className="text-[11px] font-medium text-slate-500">GC Content</span>
              <div className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400 mt-0.5">
                {geneticsMetrics.gcPercent.toFixed(1)}%
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl">
              <span className="text-[11px] font-medium text-slate-500">Melting Temp (Tm)</span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {geneticsMetrics.tm.toFixed(1)} °C
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl">
              <span className="text-[11px] font-medium text-slate-500">Molecular Weight</span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                {(geneticsMetrics.mw).toLocaleString()} g/mol
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl">
              <span className="text-[11px] font-medium text-slate-500">Peptide Length</span>
              <div className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                {geneticsMetrics.polypeptide.length} residues
              </div>
            </div>
          </div>

          {/* Transcribed mRNA & Reverse Complement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>mRNA Transcript (5′ → 3′)</span>
                <span className="text-[11px] font-mono text-teal-600">T → U</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg font-mono text-xs text-teal-700 dark:text-teal-300 break-all select-all">
                {geneticsMetrics.rna || '—'}
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Reverse Complement (5′ → 3′)</span>
                <span className="text-[11px] font-mono text-indigo-600">Antiparallel</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-lg font-mono text-xs text-indigo-700 dark:text-indigo-300 break-all select-all">
                {geneticsMetrics.reverseComp || '—'}
              </div>
            </div>
          </div>

          {/* Polypeptide Translation Breakdown */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Amino Acid Translation (Reading Frame 1)
              </h4>
              <span className="text-xs font-mono font-bold text-teal-600">
                {geneticsMetrics.polypeptide || '—'}
              </span>
            </div>

            {geneticsMetrics.codons.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-1 font-mono text-xs">
                {geneticsMetrics.codons.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col items-center"
                  >
                    <span className="text-[10px] text-slate-400">Codon #{idx + 1}</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400 text-sm mt-0.5">{c.triplet}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                      {c.aa} ({c.name.split(' ')[0]})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">Provide at least 3 nucleotides to display codon translation.</p>
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 2. PUBCHEM COMPOUND EXPLORER */}
      {/* ========================================================== */}
      {activeTab === 'pubchem' && (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
            <FlaskConical className="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">PubChem PUG REST Integration: </span>
              Queries chemical structures, calculated physicochemical parameters, 2D depictions, and evaluates
              Lipinski’s Rule of 5 drug-likeness criteria directly from the National Center for Biotechnology Information (NCBI).
            </div>
          </div>

          {/* Quick Example Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Quick Compounds:</span>
            {['Aspirin', 'Caffeine', 'Ibuprofen', 'Paracetamol', 'Glucose', 'Penicillin'].map((name) => (
              <button
                key={name}
                onClick={() => {
                  setChemQuery(name);
                  searchPubChem(name);
                }}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                {name}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchPubChem(chemQuery);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={chemQuery}
                onChange={(e) => setChemQuery(e.target.value)}
                placeholder="Search chemical compound by name (e.g. Dopamine, Metformin, Curcumin)..."
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              type="submit"
              disabled={chemLoading}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              {chemLoading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {chemError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300">
              {chemError}
            </div>
          )}

          {/* Compound Inspector Card */}
          {chemData && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              {/* 2D Structure Canvas */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <img
                  src={chemData.imageUrl}
                  alt={`2D chemical structure of ${chemData.name}`}
                  className="max-h-56 max-w-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-lg bg-white p-2 shadow-sm"
                />
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={chemData.pubchemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                  >
                    View on PubChem (CID {chemData.cid})
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Physicochemical Properties & Lipinski Diagnostics */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                    {chemData.name}
                  </h3>
                  <div className="text-xs font-mono text-slate-500">
                    Formula: {chemData.properties.MolecularFormula} • MW: {chemData.properties.MolecularWeight} g/mol
                  </div>
                </div>

                {/* Lipinski Rule of 5 Card */}
                {lipinskiAnalysis && (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                        Lipinski's Rule of 5 (Drug-Likeness)
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          lipinskiAnalysis.isDrugLike
                            ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {lipinskiAnalysis.isDrugLike ? 'Passes (Drug-Like)' : `${lipinskiAnalysis.violations} Violation(s)`}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">MW ≤ 500:</span>
                        <span className={lipinskiAnalysis.passMW ? 'text-emerald-600' : 'text-rose-500 font-bold'}>
                          {lipinskiAnalysis.mw} g/mol {lipinskiAnalysis.passMW ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">XLogP ≤ 5:</span>
                        <span className={lipinskiAnalysis.passLogP ? 'text-emerald-600' : 'text-rose-500 font-bold'}>
                          {lipinskiAnalysis.logP} {lipinskiAnalysis.passLogP ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">H-Donors ≤ 5:</span>
                        <span className={lipinskiAnalysis.passHBD ? 'text-emerald-600' : 'text-rose-500 font-bold'}>
                          {lipinskiAnalysis.hbd} {lipinskiAnalysis.passHBD ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">H-Acceptors ≤ 10:</span>
                        <span className={lipinskiAnalysis.passHBA ? 'text-emerald-600' : 'text-rose-500 font-bold'}>
                          {lipinskiAnalysis.hba} {lipinskiAnalysis.passHBA ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Properties Table */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded">
                    <span className="text-slate-500 block text-[10px]">TPSA</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {chemData.properties.TPSA ?? '—'} Å²
                    </span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-850 rounded">
                    <span className="text-slate-500 block text-[10px]">Rotatable Bonds</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {chemData.properties.RotatableBondCount ?? '—'}
                    </span>
                  </div>
                </div>

                {/* SMILES & InChIKey */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-mono text-slate-500">Canonical SMILES:</div>
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[11px] text-slate-700 dark:text-slate-300 break-all select-all">
                    {chemData.properties.CanonicalSMILES || '—'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* 3. ALPHAFOLD STRUCTURAL CONFIDENCE GUIDE */}
      {/* ========================================================== */}
      {activeTab === 'alphafold' && (
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              AlphaFold per-residue confidence metric (pLDDT)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              AlphaFold predicts 3D coordinates along with a predicted Local Distance Difference Test (pLDDT) score
              between 0 and 100 for each amino acid residue. The scientific standard defines four distinct confidence tiers:
            </p>
          </div>

          {/* 4-Band Color Scale Cards as mandated by the Science Skill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#0053D6]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Very High</span>
              </div>
              <div className="text-base font-mono font-bold text-[#0053D6]">pLDDT &gt; 90</div>
              <p className="text-[11px] text-slate-500 leading-tight">
                High-accuracy backbone and reliable side-chain rotamers. Suitable for atomic coordination and ligand binding analysis.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#65CBF3]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Confident</span>
              </div>
              <div className="text-base font-mono font-bold text-[#0284c7]">70 &le; pLDDT &le; 90</div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Generally good backbone accuracy and reliable domain fold topology.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FFDB13]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Low</span>
              </div>
              <div className="text-base font-mono font-bold text-[#d97706]">50 &le; pLDDT &lt; 70</div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Secondary structure elements may be present, but domain orientation should be interpreted with caution.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-[#FF7D45]" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Very Low</span>
              </div>
              <div className="text-base font-mono font-bold text-[#FF7D45]">pLDDT &lt; 50</div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Often corresponds to intrinsically disordered protein regions (IDRs) or flexible linkers in physiological conditions.
              </p>
            </div>
          </div>

          {/* External Databases links */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Authoritative Structural Biology Repositories
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a
                href="https://alphafold.ebi.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
              >
                <span>AlphaFold Protein Structure Database (EMBL-EBI)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://www.rcsb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
              >
                <span>RCSB Protein Data Bank (PDB)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
