import React, { useState } from 'react';
import {
  Key,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Server,
  Lock,
  RefreshCw,
  Cpu,
  Layers,
  HelpCircle,
  Code2,
  Sliders,
  DollarSign,
  AlertCircle,
  FileCheck,
  EyeOff,
  Flame,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'storage' | 'architecture' | 'restrictions' | 'monitoring';
  title: string;
  description: string;
  importance: 'critical' | 'high' | 'recommended';
  codeHint?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'server-only',
    category: 'architecture',
    title: 'Never expose API keys in browser or client code',
    description: 'Never write your Gemini API key in frontend React, Vue, HTML, or mobile client bundles. Client-side code is publicly inspectable via browser DevTools (Network tab and JavaScript sources). Always proxy AI requests through your own backend server.',
    importance: 'critical',
    codeHint: '// BAD (Client-side exposure):\nconst res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);\n\n// GOOD (Client calls your backend proxy):\nconst res = await fetch("/api/ai/generate", { method: "POST", body: JSON.stringify({ prompt }) });',
  },
  {
    id: 'env-storage',
    category: 'storage',
    title: 'Store key in server environment variables (.env.local)',
    description: 'Keep your API key in a private `.env.local` file on your server, or configure it via your cloud host environment variables (e.g., Google Cloud Run, Vercel, AWS ECS). Never hardcode API keys into Git-tracked source code.',
    importance: 'critical',
    codeHint: '# .env.local (Server only - not prefixed with VITE_ or NEXT_PUBLIC_)\nGEMINI_API_KEY=AIzaSy...',
  },
  {
    id: 'gitignore',
    category: 'storage',
    title: 'Add .env files to .gitignore',
    description: 'Verify your project’s `.gitignore` contains `.env`, `.env.local`, and `.env*.local`. Public GitHub scanning bots detect and report leaked Google API keys in seconds.',
    importance: 'critical',
    codeHint: '# .gitignore\n.env\n.env.local\n.env.*.local\n*.pem',
  },
  {
    id: 'api-restrictions',
    category: 'restrictions',
    title: 'Apply API scope restrictions in Google Cloud Console',
    description: 'In Google Cloud Console > APIs & Services > Credentials, edit your API key under "API restrictions". Set it to "Restrict key" and select exclusively "Generative Language API". This prevents the key from being misused for any other Google Cloud service.',
    importance: 'high',
  },
  {
    id: 'ip-restrictions',
    category: 'restrictions',
    title: 'Set application/IP restrictions for production servers',
    description: 'If your backend runs on dedicated server IP addresses, configure "IP addresses" restrictions in Google Cloud Console. This guarantees requests originating from unauthorized IP addresses will be rejected automatically.',
    importance: 'high',
  },
  {
    id: 'budget-alerts',
    category: 'monitoring',
    title: 'Configure billing thresholds & budget alerts',
    description: 'If your Google Cloud project is connected to a billing account (Pay-As-You-Go), set up budget alerts ($5, $25, $100) in Google Cloud Billing to receive automated email notifications before reaching spending limits.',
    importance: 'high',
  },
  {
    id: 'backoff-retry',
    category: 'architecture',
    title: 'Handle 429 RESOURCE_EXHAUSTED with exponential backoff',
    description: 'Free tier and paid tiers have strict Requests Per Minute (RPM) quotas. Handle HTTP 429 errors gracefully in your server code using exponential backoff with jitter instead of spamming immediate retries.',
    importance: 'recommended',
    codeHint: 'if (error.status === 429) {\n  const delayMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;\n  await new Promise(r => setTimeout(r, delayMs));\n}',
  },
  {
    id: 'revocation-plan',
    category: 'monitoring',
    title: 'Maintain an emergency revocation and rotation workflow',
    description: 'If a secret is ever compromised or exposed in build logs, visit Google AI Studio immediately to delete the compromised key, issue a replacement, and update your server environment variables.',
    importance: 'critical',
  },
];

interface ModelSpec {
  id: string;
  name: string;
  family: string;
  recommendedUse: string;
  contextWindow: string;
  inputModalities: string[];
  outputModalities: string[];
  typicalFreeQuota: string;
  paidAvailability: string;
  pricingNote: string;
}

const GEMINI_MODELS: ModelSpec[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash (Flagship Fast)',
    family: 'General & Multimodal',
    recommendedUse: 'High-throughput reasoning, chat, summarization, coding, and large-document analysis.',
    contextWindow: '1M tokens (up to ~700k words or 1hr audio)',
    inputModalities: ['Text', 'Images', 'Audio', 'Video', 'PDFs'],
    outputModalities: ['Text', 'Code'],
    typicalFreeQuota: '15 RPM | 1M TPM | 1,500 RPD (subject to Google project eligibility)',
    paidAvailability: 'Available on Pay-as-you-go / Blaze projects with higher scalable quotas',
    pricingNote: 'Cost-efficient flagship model designed for low latency and high frequency.',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro (Deep Reasoning & STEM)',
    family: 'Advanced Reasoning',
    recommendedUse: 'Complex mathematical proofs, advanced code architecture, research synthesis, and multi-file codebases.',
    contextWindow: '2M tokens (up to ~1.4M words)',
    inputModalities: ['Text', 'Images', 'Audio', 'Video', 'Code'],
    outputModalities: ['Text', 'Code'],
    typicalFreeQuota: '2 RPM | 32k TPM | 50 RPD (strict free tier limitations)',
    paidAvailability: 'Requires billing account for production scale & higher rate limits',
    pricingNote: 'Highest intelligence tier for rigorous STEM and algorithmic problem-solving.',
  },
  {
    id: 'gemini-2.0-flash-lite',
    name: 'Gemini 2.0 Flash Lite (Ultra Low-Latency)',
    family: 'Lightweight & Efficient',
    recommendedUse: 'Real-time autocomplete, quick classification, spelling correction, and budget-constrained mobile backends.',
    contextWindow: '1M tokens',
    inputModalities: ['Text', 'Images', 'Audio', 'Video'],
    outputModalities: ['Text'],
    typicalFreeQuota: '30 RPM | 1M TPM | 1,500 RPD',
    paidAvailability: 'Supported on all active AI Studio projects',
    pricingNote: 'Ultra-cost-effective tier optimized for sub-second responses.',
  },
  {
    id: 'gemini-3.5-transcribe',
    name: 'Gemini Audio & Transcription',
    family: 'Audio & Speech',
    recommendedUse: 'Verbatim transcription, timestamped dialogue segmentation, and audio content notes.',
    contextWindow: 'Audio streams up to multiple hours',
    inputModalities: ['Audio (MP3, WAV, WebM)'],
    outputModalities: ['Text', 'Timestamps'],
    typicalFreeQuota: 'Varies by audio duration and project limits',
    paidAvailability: 'Pay-as-you-go billing recommended for long recordings',
    pricingNote: 'Calculated by audio duration or token equivalents.',
  },
  {
    id: 'gemini-nano-banana-2.1',
    name: 'Gemini Image Generation (Nano Banana Series)',
    family: 'Visual Generation',
    recommendedUse: 'High-fidelity raster image generation, editing, and inpainting (1K, 2K, 4K resolution).',
    contextWindow: 'Prompt + reference images',
    inputModalities: ['Text', 'Image references'],
    outputModalities: ['Images (PNG, JPEG)'],
    typicalFreeQuota: 'Restricted / paid-only on most Google Cloud projects',
    paidAvailability: 'Requires verified Google Cloud billing / Paid API key flow',
    pricingNote: 'Priced per generated image tile and resolution.',
  },
];

export function GeminiApiAccessTool() {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'checklist' | 'models' | 'code' | 'troubleshoot'>('overview');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ll_gemini_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [selectedLanguage, setSelectedLanguage] = useState<'node' | 'python' | 'nextjs'>('node');
  const [copiedCode, setCopiedCode] = useState(false);
  const [modelFilter, setModelFilter] = useState<string>('all');

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('ll_gemini_checklist', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const completedCount = CHECKLIST_ITEMS.filter((i) => checkedItems[i.id]).length;
  const healthPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  const getCodeSnippet = () => {
    switch (selectedLanguage) {
      case 'node':
        return `// server.js (Node.js / Express Server - 100% Server-Side)
// Run: npm install @google/genai express dotenv
require('dotenv').config();
const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());

// Initialize SDK using server environment variable ONLY
// User-Agent 'aistudio-build' is recommended for Google AI Studio applets
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: { 'User-Agent': 'aistudio-build' }
  }
});

// Safe backend API proxy - Client never touches the key!
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ output: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit or quota exceeded. Please try again shortly.' });
    }
    res.status(500).json({ error: 'Internal server failure processing AI request' });
  }
});

app.listen(3000, () => console.log('Server running securely on port 3000'));`;

      case 'python':
        return `# server.py (Python FastAPI - 100% Server-Side)
# Run: pip install google-genai fastapi uvicorn pydantic
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types

app = FastAPI(title="Secure Gemini API Proxy")

# Retrieve key strictly from operating system environment
API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY environment variable is missing on server!")

client = genai.Client(api_key=API_KEY)

class GenerateRequest(BaseModel):
    prompt: str

@app.post("/api/ai/generate")
async def generate_text(payload: GenerateRequest):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=payload.prompt,
        )
        return {"output": response.text}
    except Exception as e:
        err_msg = str(e)
        if "429" in err_msg or "RESOURCE_EXHAUSTED" in err_msg:
            raise HTTPException(status_code=429, detail="Quota or rate limit exceeded")
        raise HTTPException(status_code=500, detail="Server error processing model request")`;

      case 'nextjs':
        return `// app/api/ai/generate/route.ts (Next.js App Router Route Handler)
// Key is accessed via process.env.GEMINI_API_KEY on the Node server
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: { 'User-Agent': 'aistudio-build' }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ output: response.text });
  } catch (error: any) {
    console.error('Gemini error:', error);
    const status = error.status === 429 ? 429 : 500;
    return NextResponse.json(
      { error: error.status === 429 ? 'Quota limit reached' : 'AI Generation failed' },
      { status }
    );
  }
}`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredModels = GEMINI_MODELS.filter((m) => {
    if (modelFilter === 'all') return true;
    if (modelFilter === 'text') return m.family.includes('General') || m.family.includes('Advanced');
    if (modelFilter === 'multimodal') return m.inputModalities.length > 2;
    if (modelFilter === 'specialized') return m.family.includes('Audio') || m.family.includes('Visual');
    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-neutral-800 dark:text-neutral-200">
      {/* 1. Critical Security Notice & Boundary Banner */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-amber-950 dark:text-amber-100">
                Official Google AI Studio Key & Quota Architecture Policy
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 dark:bg-amber-900/80 text-amber-900 dark:text-amber-200">
                Security Standard
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
              Google API keys, model availability, token allocations, and rate limits are managed <strong>exclusively by Google</strong> through your linked Google Cloud Project. No third-party tool, script, or website can generate, guarantee, or grant unlimited quotas, bypass billing restrictions, or prevent key expiration.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Key Security */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
              <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Zero Key Input Policy</span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
              This application <strong>never</strong> asks you to paste, transmit, or store your API key. Never input your API key into any third-party web form.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
              <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Multi-Model Access</span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
              A single key works with multiple models available to its Google Cloud project, but quotas (RPM/TPM) and model eligibility vary per project tier.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
              <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Server-Side Calling Only</span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
              API keys must remain strictly in backend server environment variables (`process.env.GEMINI_API_KEY`). Never bundle keys into frontend JavaScript.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Direct Official AI Studio Action Bar */}
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Official Portal</span>
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
            Create or Manage Keys in Google AI Studio
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xl">
            Google AI Studio is the authentic, direct portal to generate API keys, create Google Cloud projects, and view active quota limits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs hover:shadow-indigo-500/20 cursor-pointer"
          >
            <Key className="w-4 h-4" />
            <span>Open Google AI Studio Keys</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href="https://console.cloud.google.com/iam-admin/quotas"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Sliders className="w-4 h-4 text-neutral-500" />
            <span>GCP Quotas Console</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Quotas & Limits Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('steps')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'steps'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Key Creation Walkthrough</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Security Checklist ({completedCount}/{CHECKLIST_ITEMS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'models'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Model Matrix & Rate Limits</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Safe Backend Snippets</span>
          </button>

          <button
            onClick={() => setActiveTab('troubleshoot')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'troubleshoot'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Error Codes (429, 403)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Quotas Demystified */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900 dark:text-neutral-100">
                <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <span>Free Tier (Google AI Studio)</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Google provides developers with a generous free tier for prototyping and personal projects without requiring credit cards in most regions.
              </p>
              <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-600 font-bold">•</span>
                  <span><strong>Rate limits:</strong> Typically 15 Requests Per Minute (RPM) and 1,000,000 Tokens Per Minute (TPM) on `gemini-2.5-flash`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-600 font-bold">•</span>
                  <span><strong>Daily limits:</strong> Up to 1,500 Requests Per Day (RPD). Once exhausted, calls return HTTP 429 until midnight UTC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-emerald-600 font-bold">•</span>
                  <span><strong>Data terms:</strong> Prompts on the free tier may be reviewed by human reviewers to improve Google products (per Google terms).</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900 dark:text-neutral-100">
                <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <DollarSign className="w-4 h-4" />
                </span>
                <span>Pay-As-You-Go / Blaze Tier (GCP Billing)</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                When you link a Google Cloud Billing account to your project in Google Cloud Console, your project graduates from free quotas to scalable production quotas.
              </p>
              <ul className="text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-indigo-600 font-bold">•</span>
                  <span><strong>Higher RPM & TPM:</strong> Higher request throughput (up to 1,000+ RPM depending on model and project quota requests).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-indigo-600 font-bold">•</span>
                  <span><strong>Zero Daily Cap:</strong> No 1,500 RPD hard cap. Usage is billed per million input/output tokens according to Google’s published pricing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-indigo-600 font-bold">•</span>
                  <span><strong>Enterprise Privacy:</strong> Customer data is not used to train Google models on paid tier projects.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Facts Callout */}
          <div className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Important Technical Clarifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <div className="space-y-1">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Are keys project-scoped?</h4>
                <p>
                  Yes. Every API key generated in Google AI Studio is fundamentally an API credential inside a <strong>Google Cloud Project</strong>. The project governs which APIs are enabled (`generativelanguage.googleapis.com`), billing status, and IAM role permissions.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Can an API key expire or be revoked?</h4>
                <p>
                  Yes. Google may revoke a key automatically if it is detected on public repositories (GitHub, GitLab), or if security policies or Terms of Service violations occur. You can also rotate or delete keys at any time in Google AI Studio.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Does one key work for all models?</h4>
                <p>
                  Generally yes, for standard models (`gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-2.0-flash`). However, specialized models (like Imagen image generation or Veo video models) may require a paid billing account or specific region enablement.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">How do I monitor active quota usage?</h4>
                <p>
                  Visit the <strong>Google Cloud Console Quotas</strong> page for your project. There you can see real-time graphs of RPM and TPM usage against your project quota ceilings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 4-Step Walkthrough */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
              How to Create an API Key in Google AI Studio
            </h3>
            <p className="text-xs text-neutral-500">
              Follow these verified steps directly on Google AI Studio’s official web console.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center font-mono">
                  1
                </span>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Navigate to Google AI Studio
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 pl-10 leading-relaxed">
                Open <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">https://aistudio.google.com/app/apikey</a> and log in using your primary Google account. If this is your first visit, review and accept Google AI Studio’s Developer Terms of Service.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center font-mono">
                  2
                </span>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Click &ldquo;Create API Key&rdquo; & Select Google Cloud Project
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 pl-10 leading-relaxed">
                Click the blue <strong>&ldquo;Create API key&rdquo;</strong> button. You can choose to create a key in an existing Google Cloud project or let AI Studio provision a new default project automatically.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center font-mono">
                  3
                </span>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Copy & Secure the Key Immediately in Server Secrets
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 pl-10 leading-relaxed">
                Copy your key string (which begins with <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px]">AIzaSy...</code>) and place it directly into your server’s <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px]">.env.local</code> file as <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px]">GEMINI_API_KEY</code>. Never send this key through email, chat, or client-side bundles.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center font-mono">
                  4
                </span>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Test Models & Inspect Quotas in GCP Console
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 pl-10 leading-relaxed">
                In Google AI Studio’s Playground, test different models (<code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-[11px]">gemini-2.5-flash</code>) with sample prompts. Check the GCP Quotas page to verify your Requests Per Minute (RPM) allocation and confirm whether billing has been attached.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Security Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Your API Key Security Posture
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  healthPercent === 100
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : healthPercent >= 60
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                }`}>
                  {healthPercent}% Compliant
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Audit your implementation against Google’s official cloud security best practices.
              </p>
            </div>

            <button
              onClick={() => {
                const all: Record<string, boolean> = {};
                CHECKLIST_ITEMS.forEach((i) => (all[i.id] = true));
                setCheckedItems(all);
                localStorage.setItem('ll_gemini_checklist', JSON.stringify(all));
              }}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 self-start sm:self-center transition-colors"
            >
              Mark All as Completed
            </button>
          </div>

          <div className="space-y-3">
            {CHECKLIST_ITEMS.map((item) => {
              const isDone = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none space-y-2 ${
                    isDone
                      ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      aria-checked={isDone}
                      role="checkbox"
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
                      }`}
                    >
                      {isDone && <Check className="w-3.5 h-3.5" />}
                    </button>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-bold ${isDone ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-neutral-900 dark:text-neutral-100'}`}>
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.importance === 'critical'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : item.importance === 'high'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                        }`}>
                          {item.importance}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {item.description}
                      </p>
                      {item.codeHint && (
                        <pre className="mt-2 p-2.5 rounded-lg bg-neutral-950 text-neutral-200 text-[11px] font-mono overflow-x-auto">
                          <code>{item.codeHint}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Model Matrix & Rate Limits */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                Gemini Models & Quota Parameter Guide
              </h3>
              <p className="text-xs text-neutral-500">
                Understand context windows, supported modalities, and typical tier limits.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs">
              <button
                onClick={() => setModelFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  modelFilter === 'all' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setModelFilter('text')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  modelFilter === 'text' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                Text & STEM
              </button>
              <button
                onClick={() => setModelFilter('multimodal')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  modelFilter === 'multimodal' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                Multimodal
              </button>
              <button
                onClick={() => setModelFilter('specialized')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  modelFilter === 'specialized' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs' : 'text-neutral-500'
                }`}
              >
                Audio / Vision
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredModels.map((model) => (
              <div
                key={model.id}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                        {model.name}
                      </h4>
                      <code className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                        {model.id}
                      </code>
                    </div>
                    <span className="text-xs text-neutral-500">{model.family}</span>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 self-start sm:self-center">
                    Context: {model.contextWindow}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {model.recommendedUse}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Typical Free Quota</span>
                    </span>
                    <p className="text-[11px] text-neutral-500 font-mono">
                      {model.typicalFreeQuota}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Paid Tier / Scalability</span>
                    </span>
                    <p className="text-[11px] text-neutral-500">
                      {model.paidAvailability}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-500">
                  <span>Input: {model.inputModalities.join(', ')}</span>
                  <span>•</span>
                  <span>Output: {model.outputModalities.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Code Templates */}
      {activeTab === 'code' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                Safe Server-Side Integration Architecture
              </h3>
              <p className="text-xs text-neutral-500">
                Production-grade patterns to call the official `@google/genai` SDK without exposing keys.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs">
                <button
                  onClick={() => setSelectedLanguage('node')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedLanguage === 'node' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs' : 'text-neutral-500'
                  }`}
                >
                  Node.js / Express
                </button>
                <button
                  onClick={() => setSelectedLanguage('python')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedLanguage === 'python' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs' : 'text-neutral-500'
                  }`}
                >
                  Python FastAPI
                </button>
                <button
                  onClick={() => setSelectedLanguage('nextjs')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedLanguage === 'nextjs' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs' : 'text-neutral-500'
                  }`}
                >
                  Next.js App Router
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-neutral-950 text-neutral-200 font-mono text-xs leading-relaxed overflow-x-auto border border-neutral-800 selection:bg-indigo-600">
            <code>{getCodeSnippet()}</code>
          </pre>
        </div>
      )}

      {/* Tab 6: Error Codes & Troubleshooting */}
      {activeTab === 'troubleshoot' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
              API Error Resolution & Quota Diagnostics
            </h3>
            <p className="text-xs text-neutral-500">
              How to interpret and resolve common HTTP status responses from Google’s Generative Language API.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  HTTP 429
                </span>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  RESOURCE_EXHAUSTED (Rate Limit or Quota Reached)
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Cause:</strong> You sent requests faster than your Requests Per Minute (RPM) threshold (e.g. 15 RPM), exceeded Tokens Per Minute (TPM), or reached the daily free ceiling (1,500 RPD).
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Resolution:</strong> Implement exponential backoff in your server code. Check Google Cloud Console Quotas. If your app requires continuous production traffic, link a billing account to graduate from the 1,500 RPD cap.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                  HTTP 403
                </span>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  PERMISSION_DENIED (API Restrictions or Disabled Service)
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Cause:</strong> The API key may have expired, was deleted, has an improper IP/HTTP referrer restriction, or the &ldquo;Generative Language API&rdquo; is not enabled in your Google Cloud Project.
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Resolution:</strong> Open Google Cloud Console &rarr; APIs &amp; Services &rarr; Enabled APIs. Confirm &ldquo;Generative Language API&rdquo; is active. Check API Key Restrictions to ensure your server IP isn't blocked.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  HTTP 404
                </span>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  NOT_FOUND (Invalid Model Name or Deprecated Endpoint)
                </h4>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Cause:</strong> A typo in the model name (e.g. attempting to call deprecated legacy models like `gemini-1.5-flash` or `gemini-pro`).
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Resolution:</strong> Upgrade your code to use the latest supported models: <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">gemini-2.5-flash</code> or <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">gemini-2.5-pro</code> with the modern <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">@google/genai</code> SDK.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
