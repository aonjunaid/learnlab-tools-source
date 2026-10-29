import React, { useState, useRef, useEffect } from 'react';
import {
  FileUp,
  Download,
  Copy,
  Check,
  RefreshCw,
  ArrowRightLeft,
  Settings2,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Table,
  Music,
  Code2,
  ShieldCheck,
  AlertCircle,
  Eye,
  Sliders,
  X,
  FileCheck2,
  Layers,
  Zap,
} from 'lucide-react';
import {
  SUPPORTED_FORMATS,
  FormatDefinition,
  detectFormatFromFile,
  getCompatibleTargets,
  convertImage,
  convertMediaToWav,
  csvToJson,
  jsonToCsv,
  jsonToYaml,
  yamlToJson,
  jsonToXml,
  xmlToJson,
  csvToSql,
  csvToMarkdownTable,
  markdownTableToCsv,
  markdownToHtml,
  htmlToMarkdown,
  jsonToTypeScript,
} from '../../logic/universal-converter';

interface ConvertedResult {
  fileName: string;
  targetFormat: string;
  blob?: Blob;
  dataUrl?: string;
  textContent?: string;
  originalSize: number;
  convertedSize: number;
  type: 'image' | 'text' | 'audio' | 'binary';
}

export function UniversalFileConverterTool() {
  const [activeTab, setActiveTab] = useState<'universal' | 'matrix' | 'playground'>('universal');

  // File conversion state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceFormat, setSourceFormat] = useState<string>('png');
  const [targetFormat, setTargetFormat] = useState<string>('jpeg');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState<string | null>(null);
  const [convertedResult, setConvertedResult] = useState<ConvertedResult | null>(null);

  // Options
  const [imageQuality, setImageQuality] = useState<number>(0.9);
  const [imageMaxWidth, setImageMaxWidth] = useState<number>(1920);
  const [grayscale, setGrayscale] = useState<boolean>(false);
  const [csvDelimiter, setCsvDelimiter] = useState<string>(',');
  const [tableName, setTableName] = useState<string>('dataset');
  const [copiedResult, setCopiedResult] = useState<boolean>(false);

  // Live Playground State
  const [playgroundSource, setPlaygroundSource] = useState<string>('json');
  const [playgroundTarget, setPlaygroundTarget] = useState<string>('yaml');
  const [playgroundInput, setPlaygroundInput] = useState<string>(
    JSON.stringify(
      [
        { id: 1, name: 'Alice Smith', role: 'Scientist', score: 98 },
        { id: 2, name: 'Bob Jones', role: 'Engineer', score: 94 },
        { id: 3, name: 'Carol White', role: 'Researcher', score: 99 },
      ],
      null,
      2
    )
  );
  const [playgroundOutput, setPlaygroundOutput] = useState<string>('');
  const [playgroundError, setPlaygroundError] = useState<string | null>(null);
  const [copiedPlayground, setCopiedPlayground] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-detect format on file select
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setConversionError(null);
    setConvertedResult(null);

    const detected = detectFormatFromFile(file);
    setSourceFormat(detected);

    const compatible = getCompatibleTargets(detected);
    if (compatible.length > 0) {
      setTargetFormat(compatible[0].id);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Convert File execution
  const executeConversion = async () => {
    if (!selectedFile) return;

    setIsConverting(true);
    setConversionError(null);

    try {
      const srcDef = SUPPORTED_FORMATS.find((f) => f.id === sourceFormat);
      const tgtDef = SUPPORTED_FORMATS.find((f) => f.id === targetFormat);
      const originalSize = selectedFile.size;
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
      const ext = tgtDef?.extension || `.${targetFormat}`;
      const outName = `${baseName}_converted${ext}`;

      // 1. Image Conversions
      if (srcDef?.category === 'image' && tgtDef?.category === 'image') {
        const res = await convertImage(selectedFile, {
          targetFormat: targetFormat as any,
          quality: imageQuality,
          maxWidth: imageMaxWidth > 0 ? imageMaxWidth : undefined,
          grayscale,
        });

        setConvertedResult({
          fileName: outName,
          targetFormat,
          blob: res.blob,
          dataUrl: res.dataUrl,
          originalSize,
          convertedSize: res.blob.size,
          type: 'image',
        });
        setIsConverting(false);
        return;
      }

      // 2. Audio Conversions (Audio/Video -> WAV)
      if (tgtDef?.id === 'wav') {
        const wavBlob = await convertMediaToWav(selectedFile);
        const dataUrl = URL.createObjectURL(wavBlob);
        setConvertedResult({
          fileName: outName,
          targetFormat: 'wav',
          blob: wavBlob,
          dataUrl,
          originalSize,
          convertedSize: wavBlob.size,
          type: 'audio',
        });
        setIsConverting(false);
        return;
      }

      // 3. Text / Data / Document conversions
      const rawText = await selectedFile.text();
      let outText = '';

      // CSV conversions
      if (sourceFormat === 'csv') {
        if (targetFormat === 'json') outText = csvToJson(rawText, csvDelimiter);
        else if (targetFormat === 'tsv') outText = rawText.replace(/,/g, '\t');
        else if (targetFormat === 'sql') outText = csvToSql(rawText, tableName, csvDelimiter);
        else if (targetFormat === 'markdown-table') outText = csvToMarkdownTable(rawText, csvDelimiter);
        else if (targetFormat === 'yaml') outText = jsonToYaml(csvToJson(rawText, csvDelimiter));
        else if (targetFormat === 'xml') outText = jsonToXml(csvToJson(rawText, csvDelimiter));
        else outText = rawText;
      }
      // JSON conversions
      else if (sourceFormat === 'json') {
        if (targetFormat === 'csv') outText = jsonToCsv(rawText, csvDelimiter);
        else if (targetFormat === 'tsv') outText = jsonToCsv(rawText, '\t');
        else if (targetFormat === 'yaml') outText = jsonToYaml(rawText);
        else if (targetFormat === 'xml') outText = jsonToXml(rawText);
        else if (targetFormat === 'typescript-types') outText = jsonToTypeScript(rawText);
        else if (targetFormat === 'sql') outText = csvToSql(jsonToCsv(rawText), tableName);
        else outText = rawText;
      }
      // YAML conversions
      else if (sourceFormat === 'yaml') {
        const jsonStr = yamlToJson(rawText);
        if (targetFormat === 'json') outText = jsonStr;
        else if (targetFormat === 'csv') outText = jsonToCsv(jsonStr, csvDelimiter);
        else if (targetFormat === 'xml') outText = jsonToXml(jsonStr);
        else outText = jsonStr;
      }
      // XML conversions
      else if (sourceFormat === 'xml') {
        const jsonStr = xmlToJson(rawText);
        if (targetFormat === 'json') outText = jsonStr;
        else if (targetFormat === 'csv') outText = jsonToCsv(jsonStr, csvDelimiter);
        else if (targetFormat === 'yaml') outText = jsonToYaml(jsonStr);
        else outText = jsonStr;
      }
      // Markdown conversions
      else if (sourceFormat === 'markdown') {
        if (targetFormat === 'html') outText = markdownToHtml(rawText);
        else if (targetFormat === 'txt') outText = rawText.replace(/[*_#`[\]()]/g, '');
        else if (targetFormat === 'csv') outText = markdownTableToCsv(rawText);
        else outText = rawText;
      }
      // HTML conversions
      else if (sourceFormat === 'html') {
        if (targetFormat === 'markdown') outText = htmlToMarkdown(rawText);
        else if (targetFormat === 'txt') outText = rawText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        else outText = rawText;
      } else {
        outText = rawText;
      }

      const textBlob = new Blob([outText], { type: tgtDef?.mimeType || 'text/plain' });
      setConvertedResult({
        fileName: outName,
        targetFormat,
        blob: textBlob,
        textContent: outText,
        originalSize,
        convertedSize: textBlob.size,
        type: 'text',
      });
    } catch (err: any) {
      setConversionError(err.message || 'Failed to convert file. Check file integrity.');
    } finally {
      setIsConverting(false);
    }
  };

  // Live playground conversion updater
  useEffect(() => {
    if (activeTab !== 'playground') return;

    try {
      setPlaygroundError(null);
      let res = '';

      if (playgroundSource === 'json' && playgroundTarget === 'yaml') {
        res = jsonToYaml(playgroundInput);
      } else if (playgroundSource === 'json' && playgroundTarget === 'csv') {
        res = jsonToCsv(playgroundInput, csvDelimiter);
      } else if (playgroundSource === 'json' && playgroundTarget === 'xml') {
        res = jsonToXml(playgroundInput);
      } else if (playgroundSource === 'json' && playgroundTarget === 'typescript-types') {
        res = jsonToTypeScript(playgroundInput);
      } else if (playgroundSource === 'csv' && playgroundTarget === 'json') {
        res = csvToJson(playgroundInput, csvDelimiter);
      } else if (playgroundSource === 'csv' && playgroundTarget === 'sql') {
        res = csvToSql(playgroundInput, tableName, csvDelimiter);
      } else if (playgroundSource === 'csv' && playgroundTarget === 'markdown-table') {
        res = csvToMarkdownTable(playgroundInput, csvDelimiter);
      } else if (playgroundSource === 'yaml' && playgroundTarget === 'json') {
        res = yamlToJson(playgroundInput);
      } else if (playgroundSource === 'markdown' && playgroundTarget === 'html') {
        res = markdownToHtml(playgroundInput);
      } else if (playgroundSource === 'html' && playgroundTarget === 'markdown') {
        res = htmlToMarkdown(playgroundInput);
      } else {
        res = playgroundInput;
      }

      setPlaygroundOutput(res);
    } catch (err: any) {
      setPlaygroundError(err.message);
    }
  }, [playgroundSource, playgroundTarget, playgroundInput, csvDelimiter, tableName, activeTab]);

  const downloadResult = () => {
    if (!convertedResult?.blob) return;
    const url = URL.createObjectURL(convertedResult.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = convertedResult.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyResultText = () => {
    if (!convertedResult?.textContent) return;
    navigator.clipboard.writeText(convertedResult.textContent);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compatibleTargets = getCompatibleTargets(sourceFormat);

  // Preset button action
  const applyPreset = (src: string, tgt: string) => {
    setSourceFormat(src);
    setTargetFormat(tgt);
    setActiveTab('universal');
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-neutral-800 dark:text-neutral-200">
      {/* Privacy & Zero-Upload Guarantee */}
      <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/20 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-950 dark:text-indigo-200">
              100% Client-Side In-Browser Conversion Guarantee
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              All file conversions, resizing, and transformations run locally in WebAssembly &amp; Canvas. Your files are never uploaded to any server.
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white dark:bg-neutral-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shrink-0">
          Zero Telemetry · 0 B Sent
        </span>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-2">
          <button
            onClick={() => setActiveTab('universal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'universal'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Universal File Converter</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'matrix'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Popular Presets Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'playground'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Live Data & Text Playground</span>
          </button>
        </div>
      </div>

      {/* View 1: Universal Drag & Drop File Converter */}
      {activeTab === 'universal' && (
        <div className="space-y-6">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all bg-white dark:bg-neutral-900 flex flex-col items-center justify-center space-y-4 ${
              selectedFile
                ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50/20'
                : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shadow-2xs">
              <FileUp className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {selectedFile ? selectedFile.name : 'Drag and drop any file here, or click to browse'}
              </p>
              <p className="text-xs text-neutral-500">
                Supports Images (PNG, JPG, WebP, SVG, ICO), Data (CSV, JSON, YAML, XML, SQL), Documents &amp; Audio
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              >
                {selectedFile ? 'Change File' : 'Browse Local Files'}
              </button>

              {selectedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setConvertedResult(null);
                  }}
                  className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-400 transition-colors"
                >
                  Clear File
                </button>
              )}
            </div>

            {selectedFile && (
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 w-full justify-center">
                <span>Size: {formatFileSize(selectedFile.size)}</span>
                <span>•</span>
                <span>Detected: {sourceFormat.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Format Selection & Conversion Controls */}
          {selectedFile && (
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6 shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Source Format
                  </label>
                  <select
                    value={sourceFormat}
                    onChange={(e) => {
                      setSourceFormat(e.target.value);
                      const comp = getCompatibleTargets(e.target.value);
                      if (comp.length > 0) setTargetFormat(comp[0].id);
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-neutral-100"
                  >
                    {SUPPORTED_FORMATS.map((fmt) => (
                      <option key={fmt.id} value={fmt.id}>
                        {fmt.name} ({fmt.extension})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Target Format
                  </label>
                  <select
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-indigo-500"
                  >
                    {compatibleTargets.map((fmt) => (
                      <option key={fmt.id} value={fmt.id}>
                        {fmt.name} ({fmt.extension})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion Parameters & Tuning */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/60 dark:border-neutral-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  <Settings2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Conversion Settings &amp; Optimizations</span>
                </div>

                {/* Image Specific Settings */}
                {(targetFormat === 'jpeg' || targetFormat === 'webp' || targetFormat === 'png') && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Quality</span>
                        <span className="font-mono font-bold">{Math.round(imageQuality * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={imageQuality}
                        onChange={(e) => setImageQuality(parseFloat(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Max Width</span>
                        <span className="font-mono font-bold">{imageMaxWidth}px</span>
                      </div>
                      <input
                        type="range"
                        min="320"
                        max="3840"
                        step="80"
                        value={imageMaxWidth}
                        onChange={(e) => setImageMaxWidth(parseInt(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <input
                        type="checkbox"
                        id="grayscale-toggle"
                        checked={grayscale}
                        onChange={(e) => setGrayscale(e.target.checked)}
                        className="rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor="grayscale-toggle" className="text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer">
                        Convert to Grayscale (B&amp;W)
                      </label>
                    </div>
                  </div>
                )}

                {/* Data Specific Settings */}
                {(targetFormat === 'csv' || sourceFormat === 'csv') && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-neutral-600 dark:text-neutral-400">Delimiter</label>
                      <select
                        value={csvDelimiter}
                        onChange={(e) => setCsvDelimiter(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs"
                      >
                        <option value=",">Comma (,)</option>
                        <option value=";">Semicolon (;)</option>
                        <option value="&#9;">Tab (\t)</option>
                        <option value="|">Pipe (|)</option>
                      </select>
                    </div>

                    {targetFormat === 'sql' && (
                      <div className="space-y-1">
                        <label className="text-neutral-600 dark:text-neutral-400">SQL Table Name</label>
                        <input
                          type="text"
                          value={tableName}
                          onChange={(e) => setTableName(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={executeConversion}
                disabled={isConverting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing in Browser...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Convert to {targetFormat.toUpperCase()}</span>
                  </>
                )}
              </button>

              {conversionError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{conversionError}</span>
                </div>
              )}
            </div>
          )}

          {/* Converted Result Display */}
          {convertedResult && (
            <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10 space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/60 dark:border-emerald-900/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                    <FileCheck2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      Conversion Complete: {convertedResult.fileName}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-mono">
                      {formatFileSize(convertedResult.originalSize)} ➔ {formatFileSize(convertedResult.convertedSize)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {convertedResult.textContent && (
                    <button
                      onClick={copyResultText}
                      className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedResult ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedResult ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  )}

                  <button
                    onClick={downloadResult}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {convertedResult.fileName}</span>
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              {convertedResult.type === 'image' && convertedResult.dataUrl && (
                <div className="flex justify-center p-4 bg-neutral-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <img
                    src={convertedResult.dataUrl}
                    alt="Converted output"
                    className="max-h-80 object-contain rounded-lg shadow-xs"
                  />
                </div>
              )}

              {convertedResult.type === 'audio' && convertedResult.dataUrl && (
                <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">Audio Preview:</span>
                  <audio controls src={convertedResult.dataUrl} className="w-full" />
                </div>
              )}

              {convertedResult.type === 'text' && convertedResult.textContent && (
                <pre className="p-4 rounded-xl bg-neutral-950 text-neutral-200 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto border border-neutral-800 selection:bg-indigo-600">
                  <code>{convertedResult.textContent}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      {/* View 2: Popular Presets Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
              Popular 1-Click File Conversion Presets
            </h3>
            <p className="text-xs text-neutral-500">
              Pick a preset conversion route to immediately launch with pre-configured formats.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'PNG to JPG', src: 'png', tgt: 'jpeg', icon: 'ImageIcon', desc: 'Compress high-res PNG into lightweight JPG with quality tuning' },
              { title: 'JPG to PNG', src: 'jpeg', tgt: 'png', icon: 'ImageIcon', desc: 'Convert JPG to lossless PNG for crisp editing and alpha channels' },
              { title: 'Image to WebP', src: 'png', tgt: 'webp', icon: 'Zap', desc: 'Optimize images for modern web vitals with ultra-high compression' },
              { title: 'Image to Favicon (ICO)', src: 'png', tgt: 'ico', icon: 'Sparkles', desc: 'Generate multi-resolution browser favicons for web apps' },
              { title: 'CSV to JSON', src: 'csv', tgt: 'json', icon: 'Table', desc: 'Transform spreadsheet records into structured JSON array of objects' },
              { title: 'JSON to CSV', src: 'json', tgt: 'csv', icon: 'Table', desc: 'Export API payloads and database dumps into Excel-ready CSV files' },
              { title: 'JSON to YAML', src: 'json', tgt: 'yaml', icon: 'Code2', desc: 'Convert config files from JSON to human-readable YAML' },
              { title: 'YAML to JSON', src: 'yaml', tgt: 'json', icon: 'Code2', desc: 'Translate Kubernetes or Docker configs back to JSON' },
              { title: 'Markdown to HTML', src: 'markdown', tgt: 'html', icon: 'FileText', desc: 'Render documentation markdown into semantic HTML tags' },
              { title: 'HTML to Markdown', src: 'html', tgt: 'markdown', icon: 'FileText', desc: 'Strip web pages down to clean GitHub-flavored Markdown text' },
              { title: 'CSV to SQL Inserts', src: 'csv', tgt: 'sql', icon: 'Code2', desc: 'Generate CREATE TABLE and INSERT statements for PostgreSQL / MySQL' },
              { title: 'Video/Audio to WAV', src: 'mp3', tgt: 'wav', icon: 'Music', desc: 'Extract uncompressed 16-bit PCM audio from media streams' },
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset.src, preset.tgt)}
                className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-400 dark:hover:border-indigo-600 text-left transition-colors flex flex-col justify-between group shadow-2xs cursor-pointer"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {preset.title}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                      {preset.src} ➔ {preset.tgt}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                    {preset.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* View 3: Live Data & Text Playground */}
      {activeTab === 'playground' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-neutral-700 dark:text-neutral-300">From:</span>
                <select
                  value={playgroundSource}
                  onChange={(e) => setPlaygroundSource(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-semibold"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="yaml">YAML</option>
                  <option value="markdown">Markdown</option>
                  <option value="html">HTML</option>
                </select>
              </div>

              <button
                onClick={() => {
                  const s = playgroundSource;
                  const t = playgroundTarget;
                  setPlaygroundSource(t);
                  setPlaygroundTarget(s);
                  setPlaygroundInput(playgroundOutput || playgroundInput);
                }}
                className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
                title="Swap source and target"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5">
                <span className="font-bold text-neutral-700 dark:text-neutral-300">To:</span>
                <select
                  value={playgroundTarget}
                  onChange={(e) => setPlaygroundTarget(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-neutral-800 font-semibold"
                >
                  <option value="yaml">YAML</option>
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                  <option value="sql">SQL Inserts</option>
                  <option value="markdown-table">Markdown Table</option>
                  <option value="typescript-types">TypeScript Types</option>
                  <option value="html">HTML</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(playgroundOutput);
                  setCopiedPlayground(true);
                  setTimeout(() => setCopiedPlayground(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedPlayground ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPlayground ? 'Copied' : 'Copy Converted'}</span>
              </button>
            </div>
          </div>

          {playgroundError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              {playgroundError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">Input ({playgroundSource.toUpperCase()})</span>
                <button
                  onClick={() => {
                    if (playgroundSource === 'json') {
                      setPlaygroundInput(
                        JSON.stringify(
                          [
                            { item: 'Laptop', price: 999, inStock: true },
                            { item: 'Monitor', price: 299, inStock: false },
                          ],
                          null,
                          2
                        )
                      );
                    } else if (playgroundSource === 'csv') {
                      setPlaygroundInput('name,age,city\nAlice,28,Seattle\nBob,34,Boston');
                    } else if (playgroundSource === 'markdown') {
                      setPlaygroundInput('# Sample Title\n\n- Feature 1\n- Feature 2\n\n**Bold text**');
                    }
                  }}
                  className="hover:underline text-[11px]"
                >
                  Load Sample
                </button>
              </div>
              <textarea
                value={playgroundInput}
                onChange={(e) => setPlaygroundInput(e.target.value)}
                rows={14}
                className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                placeholder="Paste or type content here..."
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="font-semibold uppercase tracking-wider">Converted Output ({playgroundTarget.toUpperCase()})</span>
                <span className="font-mono text-[11px]">{playgroundOutput.length} chars</span>
              </div>
              <textarea
                readOnly
                value={playgroundOutput}
                rows={14}
                className="w-full p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 font-mono text-xs leading-relaxed focus:outline-none shadow-2xs select-all text-neutral-900 dark:text-neutral-100"
                placeholder="Converted output will appear here in real-time..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
