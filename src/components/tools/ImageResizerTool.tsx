import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, Image as ImageIcon, Lock, Unlock, AlertCircle, Info } from 'lucide-react';

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState<number>(0.85);

  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
  const [resizedSizeBytes, setResizedSizeBytes] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load image when file changes
  const handleFileChange = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP, GIF, BMP, etc.).');
      return;
    }
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.naturalWidth);
      setOrigHeight(img.naturalHeight);
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
      imgRef.current = img;
    };
    img.src = url;
  };

  const handleWidthChange = (val: number) => {
    const newW = Math.max(1, val);
    setTargetWidth(newW);
    if (lockAspectRatio && origWidth > 0 && origHeight > 0) {
      const ratio = origHeight / origWidth;
      setTargetHeight(Math.round(newW * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    const newH = Math.max(1, val);
    setTargetHeight(newH);
    if (lockAspectRatio && origWidth > 0 && origHeight > 0) {
      const ratio = origWidth / origHeight;
      setTargetWidth(Math.round(newH * ratio));
    }
  };

  const applyScalePreset = (percent: number) => {
    if (origWidth === 0 || origHeight === 0) return;
    const factor = percent / 100;
    setTargetWidth(Math.round(origWidth * factor));
    setTargetHeight(Math.round(origHeight * factor));
  };

  // Perform canvas resize & conversion
  useEffect(() => {
    if (!imgRef.current || targetWidth <= 0 || targetHeight <= 0) return;

    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    // High quality interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // If converting to JPEG, paint white background for transparent pixels
    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    ctx.drawImage(imgRef.current, 0, 0, targetWidth, targetHeight);

    const dataUrl = canvas.toDataURL(format, quality);
    setResizedDataUrl(dataUrl);

    // Approximate size in bytes from base64
    const stringLength = dataUrl.length - 'data:image/png;base64,'.length;
    const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383687;
    setResizedSizeBytes(Math.round(sizeInBytes));
    setIsProcessing(false);
  }, [targetWidth, targetHeight, format, quality]);

  const handleDownload = () => {
    if (!resizedDataUrl) return;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    const a = document.createElement('a');
    a.href = resizedDataUrl;
    a.download = `resized_${targetWidth}x${targetHeight}_${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResizedDataUrl(null);
    setOrigWidth(0);
    setOrigHeight(0);
    setTargetWidth(0);
    setTargetHeight(0);
  };

  return (
    <div className="space-y-6">
      {/* Upload or Drop Area */}
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileChange(e.dataTransfer.files[0]);
            }
          }}
          className="bg-white dark:bg-neutral-900 border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-400 rounded-xl p-10 text-center cursor-pointer transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />
          <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-3">
            <Upload className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Choose an image or drag & drop here
          </h4>
          <p className="text-xs text-neutral-500 mt-1">
            Supports JPEG, PNG, WebP, GIF, and BMP. Processing runs 100% inside your browser.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="truncate pr-3">
                <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate block">
                  {file.name}
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">
                  Original: {origWidth} × {origHeight} px ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-neutral-500 hover:text-rose-600 flex items-center gap-1 transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change File
              </button>
            </div>

            {/* Dimensions Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Target Dimensions (px)
                </label>
                <button
                  onClick={() => setLockAspectRatio(!lockAspectRatio)}
                  className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                    lockAspectRatio
                      ? 'text-neutral-900 dark:text-neutral-100 font-medium bg-neutral-100 dark:bg-neutral-800'
                      : 'text-neutral-400'
                  }`}
                  title={lockAspectRatio ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                >
                  {lockAspectRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  <span>{lockAspectRatio ? 'Ratio Locked' : 'Ratio Free'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-neutral-500 block mb-1">Width (px)</span>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono font-medium"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500 block mb-1">Height (px)</span>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono font-medium"
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[11px] text-neutral-400 mr-1">Scale:</span>
                {[25, 50, 75, 100, 150, 200].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => applyScalePreset(pct)}
                    className="px-2 py-1 text-[11px] font-mono rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Output Format & Quality */}
            <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                Output Format & Compression
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'image/jpeg', label: 'JPEG (Web)' },
                  { id: 'image/png', label: 'PNG (Lossless)' },
                  { id: 'image/webp', label: 'WebP (Modern)' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setFormat(fmt.id as any)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      format === fmt.id
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>

              {format !== 'image/png' && (
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                    <span>Compression Quality:</span>
                    <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1.0}
                    step={0.05}
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Download CTA */}
            <div className="pt-2">
              <button
                onClick={handleDownload}
                disabled={!resizedDataUrl || isProcessing}
                className="w-full py-3 px-4 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 flex items-center justify-center gap-2 transition-opacity shadow-xs disabled:opacity-40"
              >
                <Download className="w-4 h-4" />
                <span>
                  Download Resized Image ({(resizedSizeBytes / 1024).toFixed(1)} KB)
                </span>
              </button>
            </div>
          </div>

          {/* Visual Preview Column */}
          <div className="lg:col-span-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm flex flex-col items-center">
            <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 self-start mb-3">
              Canvas Live Output Preview
            </h4>

            <div className="w-full max-h-80 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-2">
              {resizedDataUrl ? (
                <img
                  src={resizedDataUrl}
                  alt="Resized preview"
                  className="max-h-72 object-contain rounded"
                />
              ) : (
                <div className="text-xs text-neutral-400">Rendering preview...</div>
              )}
            </div>

            <div className="w-full mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>{targetWidth} × {targetHeight} px</span>
              <span>{(resizedSizeBytes / 1024).toFixed(1)} KB</span>
            </div>

            {/* Disclosed Limitations */}
            <div className="w-full mt-4 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 text-[11px] text-neutral-500 space-y-1">
              <div className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Format & Browser Notes</span>
              </div>
              <p>
                - Animated GIFs are converted to a single static frame upon resizing.
              </p>
              <p>
                - No file bytes leave your computer; all conversions execute inside HTML5 Canvas memory.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
