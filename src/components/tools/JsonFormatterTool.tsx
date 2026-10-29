import React, { useState, useMemo, useCallback } from 'react';
import { Copy, Check, Download, Trash2, RefreshCw, AlertCircle, CheckCircle2, ArrowDownAZ, Minimize2, FileCode } from 'lucide-react';

const SAMPLE_JSON = `{
  "app": "Everyday Tools",
  "version": "1.0.0",
  "features": [
    "Calculator",
    "Unit Converter",
    "Word Counter",
    "JSON Formatter",
    "Color Picker",
    "Password Generator",
    "QR Code Generator"
  ],
  "settings": {
    "theme": "system",
    "clientOnly": true,
    "metrics": {
      "offlineReady": true,
      "privacyPreserved": true
    }
  }
}`;

export function JsonFormatterTool() {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [indentSize, setIndentSize] = useState<number | 'tab'>(2);
  const [copied, setCopied] = useState(false);
  const [repairMessage, setRepairMessage] = useState<string | null>(null);

  // Parse & Validation
  const validation = useMemo(() => {
    if (!inputJson.trim()) {
      return { isValid: null, message: '', errorLine: null, errorCol: null };
    }
    try {
      const parsed = JSON.parse(inputJson);

      // Calculate keys and depth
      let keyCount = 0;
      const getDepth = (obj: any): number => {
        if (typeof obj !== 'object' || obj === null) return 0;
        let maxSubDepth = 0;
        for (const k of Object.keys(obj)) {
          keyCount++;
          maxSubDepth = Math.max(maxSubDepth, getDepth(obj[k]));
        }
        return 1 + maxSubDepth;
      };
      const depth = getDepth(parsed);

      return {
        isValid: true,
        parsed,
        keyCount,
        depth,
        sizeBytes: new Blob([inputJson]).size,
      };
    } catch (err: any) {
      const msg = err.message || 'Invalid JSON syntax';
      let errorLine = null;
      let errorCol = null;

      // Extract line and column if available
      const lineMatch = msg.match(/line (\d+) column (\d+)/i) || msg.match(/position (\d+)/i);
      if (lineMatch && lineMatch[2]) {
        errorLine = parseInt(lineMatch[1], 10);
        errorCol = parseInt(lineMatch[2], 10);
      } else if (lineMatch && lineMatch[1]) {
        const pos = parseInt(lineMatch[1], 10);
        const upToError = inputJson.substring(0, pos);
        errorLine = upToError.split('\n').length;
        errorCol = upToError.split('\n').pop()?.length || 1;
      }

      return {
        isValid: false,
        message: msg,
        errorLine,
        errorCol,
        sizeBytes: new Blob([inputJson]).size,
      };
    }
  }, [inputJson]);

  // Actions
  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(inputJson);
      const spacer = indentSize === 'tab' ? '\t' : indentSize;
      setInputJson(JSON.stringify(parsed, null, spacer));
      setRepairMessage(null);
    } catch (e) {
      // If invalid, try to alert user
    }
  }, [inputJson, indentSize]);

  const handleMinify = useCallback(() => {
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setRepairMessage(null);
    } catch (e) {
      // ignore
    }
  }, [inputJson]);

  const sortObjectDeep = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectDeep);
    } else if (obj !== null && typeof obj === 'object') {
      const sorted: Record<string, any> = {};
      Object.keys(obj)
        .sort()
        .forEach((key) => {
          sorted[key] = sortObjectDeep(obj[key]);
        });
      return sorted;
    }
    return obj;
  };

  const handleSortKeys = useCallback(() => {
    try {
      const parsed = JSON.parse(inputJson);
      const sorted = sortObjectDeep(parsed);
      const spacer = indentSize === 'tab' ? '\t' : indentSize;
      setInputJson(JSON.stringify(sorted, null, spacer));
      setRepairMessage('Keys alphabetically sorted');
      setTimeout(() => setRepairMessage(null), 3000);
    } catch (e) {
      // ignore
    }
  }, [inputJson, indentSize]);

  const handleRepair = useCallback(() => {
    let fixed = inputJson;
    // 1. Convert single quotes to double quotes around keys/values
    fixed = fixed.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, '"$1"');
    // 2. Remove trailing commas before } or ]
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
    // 3. Fix unquoted keys (e.g. { foo: "bar" })
    fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');

    try {
      const parsed = JSON.parse(fixed);
      const spacer = indentSize === 'tab' ? '\t' : indentSize;
      setInputJson(JSON.stringify(parsed, null, spacer));
      setRepairMessage('Successfully repaired common syntax issues!');
      setTimeout(() => setRepairMessage(null), 3000);
    } catch {
      setInputJson(fixed);
      setRepairMessage('Applied quote & trailing comma fixes, check remaining syntax.');
      setTimeout(() => setRepairMessage(null), 4000);
    }
  }, [inputJson, indentSize]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([inputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payload_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Line count for visual gutter
  const lineCount = useMemo(() => {
    return Math.max(1, inputJson.split('\n').length);
  }, [inputJson]);

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Formatting Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleFormat}
              disabled={validation.isValid === false}
              className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium flex items-center gap-1.5 disabled:opacity-40 transition-colors shadow-xs"
            >
              <FileCode className="w-3.5 h-3.5" />
              Prettify
            </button>
            <button
              onClick={handleMinify}
              disabled={validation.isValid === false}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium flex items-center gap-1.5 disabled:opacity-40 transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              Minify
            </button>
            <button
              onClick={handleSortKeys}
              disabled={validation.isValid === false}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium flex items-center gap-1.5 disabled:opacity-40 transition-colors"
            >
              <ArrowDownAZ className="w-3.5 h-3.5" />
              Sort Keys
            </button>
            <button
              onClick={handleRepair}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium transition-colors"
              title="Fix single quotes, trailing commas, and unquoted keys"
            >
              Fix Quotes & Commas
            </button>

            {/* Indent selector */}
            <div className="flex items-center gap-1 ml-2 text-neutral-500">
              <span>Indent:</span>
              <select
                value={indentSize}
                onChange={(e) => {
                  const val = e.target.value === 'tab' ? 'tab' : parseInt(e.target.value, 10);
                  setIndentSize(val);
                }}
                className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-800 dark:text-neutral-200"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value="tab">Tabs</option>
              </select>
            </div>
          </div>

          {/* Utility buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInputJson(SAMPLE_JSON)}
              className="px-2.5 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Sample
            </button>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              className="px-2.5 py-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1 transition-colors"
              title="Download as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            {inputJson.length > 0 && (
              <button
                onClick={() => setInputJson('')}
                className="p-1.5 text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 rounded transition-colors"
                title="Clear content"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {repairMessage && (
          <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{repairMessage}</span>
          </div>
        )}
      </div>

      {/* Editor Container with Line Numbers */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
        <div className="flex">
          {/* Line numbers gutter */}
          <div className="bg-neutral-100 dark:bg-neutral-950/80 select-none py-4 px-3 text-right font-mono text-xs text-neutral-400 border-r border-neutral-200 dark:border-neutral-800 leading-6">
            {Array.from({ length: Math.min(lineCount, 500) }).map((_, i) => (
              <div
                key={i}
                className={
                  validation.errorLine === i + 1
                    ? 'text-rose-600 dark:text-rose-400 font-bold'
                    : ''
                }
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative flex-1">
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Paste or write raw JSON here..."
              rows={16}
              spellCheck={false}
              className="w-full h-full p-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono text-xs leading-6 focus:outline-none resize-y selection:bg-neutral-200 dark:selection:bg-neutral-800"
              aria-label="JSON Code Editor"
            />
          </div>
        </div>

        {/* Validation Status Bar */}
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {validation.isValid === true && (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Valid JSON
              </span>
            )}
            {validation.isValid === false && (
              <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                <AlertCircle className="w-4 h-4" />
                {validation.message}
                {validation.errorLine && ` (Line ${validation.errorLine}${validation.errorCol ? `, Col ${validation.errorCol}` : ''})`}
              </span>
            )}
            {validation.isValid === null && (
              <span className="text-neutral-400">Waiting for JSON payload...</span>
            )}
          </div>

          {validation.isValid === true && (
            <div className="flex items-center gap-4 text-neutral-500 font-mono tabular-nums">
              <span>Keys: {validation.keyCount}</span>
              <span>·</span>
              <span>Max Depth: {validation.depth}</span>
              <span>·</span>
              <span>Size: {(validation.sizeBytes / 1024).toFixed(2)} KB</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
