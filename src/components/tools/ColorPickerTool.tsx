import React, { useState, useMemo, useCallback } from 'react';
import { Copy, Check, Pipette, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

// Color conversion helpers
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (cleaned.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return null;
  }
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = (h % 360) / 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  if (s === 0) {
    const val = Math.round(l * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

  return { r, g, b };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = ((1 - rNorm - k) / (1 - k)) * 100;
  const m = ((1 - gNorm - k) / (1 - k)) * 100;
  const y = ((1 - bNorm - k) / (1 - k)) * 100;
  return {
    c: Math.round(c),
    m: Math.round(m),
    y: Math.round(y),
    k: Math.round(k * 100),
  };
}

// Relative luminance WCAG 2.1 formula
function getRelativeLuminance(r: number, g: number, b: number): number {
  const sRGB = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

function getContrastRatio(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const PRESET_PALETTES = [
  { name: 'Indigo Electric', hex: '#4F46E5' },
  { name: 'Sky Blue', hex: '#0284C7' },
  { name: 'Emerald Forest', hex: '#059669' },
  { name: 'Amber Glow', hex: '#D97706' },
  { name: 'Crimson Rose', hex: '#E11D48' },
  { name: 'Violet Velvet', hex: '#7C3AED' },
  { name: 'Slate Neutral', hex: '#475569' },
  { name: 'Dark Charcoal', hex: '#1E293B' },
];

export function ColorPickerTool() {
  const [hexInput, setHexInput] = useState('#4F46E5');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const rgb = useMemo(() => {
    return hexToRgb(hexInput) || { r: 79, g: 70, b: 229 };
  }, [hexInput]);

  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);
  const cmyk = useMemo(() => rgbToCmyk(rgb.r, rgb.g, rgb.b), [rgb]);

  // Formatted strings
  const hexString = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  // Shades generator (50 to 900)
  const shades = useMemo(() => {
    const lightnessSteps = [96, 90, 80, 70, 60, 50, 40, 30, 20, 10];
    const labels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

    return lightnessSteps.map((l, index) => {
      const shadeRgb = hslToRgb(hsl.h, hsl.s, l);
      const hex = rgbToHex(shadeRgb.r, shadeRgb.g, shadeRgb.b);
      return {
        label: labels[index],
        hex,
        rgb: shadeRgb,
        lightness: l,
      };
    });
  }, [hsl]);

  // Contrast calculations
  const whiteRgb = { r: 255, g: 255, b: 255 };
  const darkRgb = { r: 15, g: 23, b: 42 }; // #0F172A

  const contrastWhite = useMemo(() => getContrastRatio(rgb, whiteRgb), [rgb]);
  const contrastDark = useMemo(() => getContrastRatio(rgb, darkRgb), [rgb]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // EyeDropper API
  const handleEyeDropper = async () => {
    if ('EyeDropper' in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          setHexInput(result.sRGBHex.toUpperCase());
        }
      } catch {
        // User canceled pipette
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Studio Panel */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Color Preview Swatch */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div
              className="w-full h-44 rounded-xl border border-neutral-200/80 dark:border-neutral-800 flex items-end p-4 shadow-inner relative transition-colors"
              style={{ backgroundColor: hexString }}
            >
              <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-between w-full">
                <span className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 tabular-nums">
                  {hexString}
                </span>
                <span className="text-[11px] font-mono text-neutral-500">
                  {rgbString}
                </span>
              </div>
            </div>

            {/* Quick Picker Bar */}
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={hexString}
                onChange={(e) => setHexInput(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-200 dark:border-neutral-800 p-0.5 bg-neutral-100 dark:bg-neutral-800 shrink-0"
                title="Open color wheel"
              />
              <input
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#000000"
                maxLength={7}
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono font-semibold text-neutral-900 dark:text-neutral-100 uppercase focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
              />
              {'EyeDropper' in window && (
                <button
                  onClick={handleEyeDropper}
                  className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5 text-xs font-medium shrink-0"
                  title="Pick color from screen"
                >
                  <Pipette className="w-3.5 h-3.5" />
                  Sample
                </button>
              )}
            </div>
          </div>

          {/* Formats Card */}
          <div className="lg:col-span-7 space-y-2.5">
            {[
              { label: 'HEX', value: hexString, key: 'hex' },
              { label: 'RGB', value: rgbString, key: 'rgb' },
              { label: 'HSL', value: hslString, key: 'hsl' },
              { label: 'CMYK', value: cmykString, key: 'cmyk' },
              { label: 'CSS Property', value: `color: ${hexString};`, key: 'css' },
            ].map((f) => (
              <div
                key={f.key}
                className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="flex items-center gap-3 truncate">
                  <span className="w-14 text-[11px] font-semibold text-neutral-500 shrink-0">
                    {f.label}
                  </span>
                  <span className="font-mono text-xs font-medium text-neutral-900 dark:text-neutral-100 tabular-nums truncate">
                    {f.value}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(f.value, f.key)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded transition-colors ml-2 shrink-0"
                  title="Copy to clipboard"
                >
                  {copiedKey === f.key ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preset Palettes */}
        <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800">
          <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2.5">
            Curated Inspiration
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PRESET_PALETTES.map((p) => (
              <button
                key={p.hex}
                onClick={() => setHexInput(p.hex)}
                className="group p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all text-left"
              >
                <div
                  className="w-full h-8 rounded-md mb-1.5 shadow-xs"
                  style={{ backgroundColor: p.hex }}
                />
                <div className="text-[10px] font-mono text-neutral-700 dark:text-neutral-300 truncate">
                  {p.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated 10-Step Shades Ramp */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          Tonal Scale & Shades (50 – 900)
        </h3>
        <p className="text-xs text-neutral-500 mb-4">
          Click any tone step to adopt it as your current primary color.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {shades.map((step) => {
            const isDarkTone = step.lightness < 50;
            return (
              <button
                key={step.label}
                onClick={() => setHexInput(step.hex)}
                className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:scale-[1.02] transition-transform text-left flex flex-col justify-between h-20 shadow-xs"
                style={{ backgroundColor: step.hex }}
              >
                <span
                  className={`text-[11px] font-bold font-mono ${
                    isDarkTone ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`text-[10px] font-mono ${
                    isDarkTone ? 'text-neutral-200' : 'text-neutral-700'
                  }`}
                >
                  {step.hex}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* WCAG 2.1 Contrast Testing */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          WCAG 2.1 Accessibility Contrast Checker
        </h3>
        <p className="text-xs text-neutral-500 mb-5">
          Evaluating contrast ratios against light (#FFFFFF) and dark (#0F172A) backgrounds according to W3C standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Against White */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-semibold text-neutral-800">Against Pure White</span>
              <span className="text-lg font-bold font-mono text-neutral-900 tabular-nums">
                {contrastWhite.toFixed(2)}:1
              </span>
            </div>

            <div
              className="my-3 p-3 rounded-lg border border-neutral-200"
              style={{ backgroundColor: '#FFFFFF', color: hexString }}
            >
              <div className="text-base font-bold">Sample Headline Text</div>
              <div className="text-xs">Regular body copy readability demonstration</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-700">
                {contrastWhite >= 4.5 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span>AA Normal (≥ 4.5:1)</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-700">
                {contrastWhite >= 3.0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span>AA Large (≥ 3:1)</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-700">
                {contrastWhite >= 7.0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span>AAA Normal (≥ 7:1)</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-700">
                {contrastWhite >= 4.5 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span>AAA Large (≥ 4.5:1)</span>
              </div>
            </div>
          </div>

          {/* Test Against Dark Slate */}
          <div className="p-4 rounded-xl border border-neutral-800 bg-[#0F172A]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-semibold text-neutral-200">Against Dark Slate</span>
              <span className="text-lg font-bold font-mono text-white tabular-nums">
                {contrastDark.toFixed(2)}:1
              </span>
            </div>

            <div
              className="my-3 p-3 rounded-lg border border-neutral-700"
              style={{ backgroundColor: '#0F172A', color: hexString }}
            >
              <div className="text-base font-bold">Sample Headline Text</div>
              <div className="text-xs">Regular body copy readability demonstration</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-neutral-300">
                {contrastDark >= 4.5 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>AA Normal (≥ 4.5:1)</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                {contrastDark >= 3.0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>AA Large (≥ 3:1)</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                {contrastDark >= 7.0 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>AAA Normal (≥ 7:1)</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                {contrastDark >= 4.5 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                )}
                <span>AAA Large (≥ 4.5:1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
