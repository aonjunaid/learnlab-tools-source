import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Copy, Check, RefreshCw, Eye, EyeOff, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS_CHARS = new Set(['0', 'O', 'o', '1', 'l', 'I']);

const WORD_LIST = [
  'apple', 'anchor', 'beacon', 'breeze', 'bridge', 'candle', 'canyon', 'castle',
  'cedar', 'cloud', 'clover', 'comet', 'coral', 'crater', 'crystal', 'delta',
  'desert', 'dolphin', 'dragon', 'echo', 'ember', 'falcon', 'feather', 'forest',
  'galaxy', 'glacier', 'granite', 'harbor', 'haven', 'horizon', 'island', 'jasper',
  'jungle', 'lagoon', 'meadow', 'meteor', 'nebula', 'oasis', 'ocean', 'orbit',
  'pebble', 'phoenix', 'planet', 'portal', 'quartz', 'radar', 'rainbow', 'ravine',
  'ripple', 'river', 'rocket', 'saddle', 'sahara', 'sailor', 'shadow', 'shield',
  'sierra', 'silver', 'solace', 'spark', 'spire', 'spring', 'stream', 'summit',
  'sunset', 'thunder', 'timber', 'topaz', 'valley', 'vector', 'vortex', 'voyage',
  'walnut', 'willow', 'winter', 'zenith', 'zephyr'
];

export function PasswordGeneratorTool() {
  const [mode, setMode] = useState<'random' | 'passphrase' | 'pin'>('random');

  // Random mode options
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  // Passphrase mode options
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [capitalizeWords, setCapitalizeWords] = useState(true);
  const [includeNumberInPassphrase, setIncludeNumberInPassphrase] = useState(true);

  // PIN mode options
  const [pinLength, setPinLength] = useState(6);

  // State
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedBulkIndex, setCopiedBulkIndex] = useState<number | null>(null);
  const [bulkList, setBulkList] = useState<string[]>([]);
  const [showBulk, setShowBulk] = useState(false);

  // Secure random number generator using window.crypto
  const getCryptoRandomInt = (max: number): number => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };

  const generateSingleRandomPassword = useCallback((): string => {
    let charset = '';
    if (includeUpper) charset += UPPERCASE_CHARS;
    if (includeLower) charset += LOWERCASE_CHARS;
    if (includeNumbers) charset += NUMBER_CHARS;
    if (includeSymbols) charset += SYMBOL_CHARS;

    if (excludeAmbiguous) {
      charset = charset
        .split('')
        .filter((c) => !AMBIGUOUS_CHARS.has(c))
        .join('');
    }

    if (!charset) return '';

    // Guarantee at least 1 character from each selected class
    const required: string[] = [];
    if (includeUpper) {
      const filtered = excludeAmbiguous ? UPPERCASE_CHARS.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)) : UPPERCASE_CHARS.split('');
      if (filtered.length) required.push(filtered[getCryptoRandomInt(filtered.length)]);
    }
    if (includeLower) {
      const filtered = excludeAmbiguous ? LOWERCASE_CHARS.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)) : LOWERCASE_CHARS.split('');
      if (filtered.length) required.push(filtered[getCryptoRandomInt(filtered.length)]);
    }
    if (includeNumbers) {
      const filtered = excludeAmbiguous ? NUMBER_CHARS.split('').filter((c) => !AMBIGUOUS_CHARS.has(c)) : NUMBER_CHARS.split('');
      if (filtered.length) required.push(filtered[getCryptoRandomInt(filtered.length)]);
    }
    if (includeSymbols) {
      const symbols = SYMBOL_CHARS.split('');
      required.push(symbols[getCryptoRandomInt(symbols.length)]);
    }

    const remainingLength = Math.max(0, length - required.length);
    const chars = [...required];

    for (let i = 0; i < remainingLength; i++) {
      const idx = getCryptoRandomInt(charset.length);
      chars.push(charset[idx]);
    }

    // Shuffle characters using Fisher-Yates with crypto
    for (let i = chars.length - 1; i > 0; i--) {
      const j = getCryptoRandomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join('');
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  const generatePassphrase = useCallback((): string => {
    const chosenWords: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      const word = WORD_LIST[getCryptoRandomInt(WORD_LIST.length)];
      chosenWords.push(capitalizeWords ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    }
    let phrase = chosenWords.join(separator);
    if (includeNumberInPassphrase) {
      const num = getCryptoRandomInt(100);
      phrase += `${separator}${num}`;
    }
    return phrase;
  }, [wordCount, separator, capitalizeWords, includeNumberInPassphrase]);

  const generatePin = useCallback((): string => {
    let result = '';
    for (let i = 0; i < pinLength; i++) {
      result += NUMBER_CHARS[getCryptoRandomInt(10)];
    }
    return result;
  }, [pinLength]);

  const generatePassword = useCallback(() => {
    let newPass = '';
    if (mode === 'random') {
      newPass = generateSingleRandomPassword();
    } else if (mode === 'passphrase') {
      newPass = generatePassphrase();
    } else {
      newPass = generatePin();
    }
    setPassword(newPass);

    // Also update bulk list if visible
    if (showBulk) {
      const bulk: string[] = [];
      for (let i = 0; i < 5; i++) {
        if (mode === 'random') bulk.push(generateSingleRandomPassword());
        else if (mode === 'passphrase') bulk.push(generatePassphrase());
        else bulk.push(generatePin());
      }
      setBulkList(bulk);
    }
  }, [mode, generateSingleRandomPassword, generatePassphrase, generatePin, showBulk]);

  useEffect(() => {
    generatePassword();
  }, [mode, length, wordCount, pinLength, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous, separator, capitalizeWords, includeNumberInPassphrase]);

  // Entropy & strength calculations
  const entropyStats = useMemo(() => {
    if (!password) return { bits: 0, label: 'None', color: 'bg-neutral-300', crackTime: '0 seconds' };

    let pool = 0;
    if (mode === 'random') {
      if (includeUpper) pool += 26;
      if (includeLower) pool += 26;
      if (includeNumbers) pool += 10;
      if (includeSymbols) pool += SYMBOL_CHARS.length;
      if (excludeAmbiguous) pool -= 6;
      pool = Math.max(2, pool);
      const bits = Math.round(password.length * Math.log2(pool));

      let label = 'Very Weak';
      let color = 'bg-rose-500';
      let crackTime = '< 1 second';

      if (bits >= 100) {
        label = 'Very Strong';
        color = 'bg-emerald-500';
        crackTime = 'Billions of centuries';
      } else if (bits >= 75) {
        label = 'Strong';
        color = 'bg-emerald-600';
        crackTime = 'Millions of years';
      } else if (bits >= 55) {
        label = 'Moderate';
        color = 'bg-amber-500';
        crackTime = 'Several centuries';
      } else if (bits >= 35) {
        label = 'Weak';
        color = 'bg-orange-500';
        crackTime = 'A few hours';
      }

      return { bits, label, color, crackTime };
    } else if (mode === 'passphrase') {
      const bits = Math.round(wordCount * Math.log2(WORD_LIST.length) + (includeNumberInPassphrase ? 7 : 0));
      return {
        bits,
        label: bits >= 60 ? 'Strong' : 'Moderate',
        color: bits >= 60 ? 'bg-emerald-500' : 'bg-amber-500',
        crackTime: bits >= 60 ? 'Centuries' : 'Decades',
      };
    } else {
      const bits = Math.round(pinLength * Math.log2(10));
      return {
        bits,
        label: pinLength >= 8 ? 'Moderate (PIN)' : 'Short PIN',
        color: pinLength >= 8 ? 'bg-amber-500' : 'bg-rose-500',
        crackTime: pinLength >= 8 ? 'Several hours' : 'Instant (< 1s)',
      };
    }
  }, [password, mode, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous, wordCount, includeNumberInPassphrase, pinLength]);

  const handleCopyMain = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBulk = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBulkIndex(index);
    setTimeout(() => setCopiedBulkIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
        <button
          onClick={() => setMode('random')}
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            mode === 'random'
              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Password
        </button>
        <button
          onClick={() => setMode('passphrase')}
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            mode === 'passphrase'
              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Memorable Passphrase
        </button>
        <button
          onClick={() => setMode('pin')}
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            mode === 'pin'
              ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Numeric PIN
        </button>
      </div>

      {/* Main Password Showcase */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <span
              className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-neutral-900 dark:text-neutral-50 truncate select-all"
              aria-label="Generated password"
            >
              {showPassword ? password : '•'.repeat(password.length)}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={generatePassword}
              className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              title="Regenerate password"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyMain}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Strength & Entropy Status */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              Strength: {entropyStats.label}
            </span>
            <div className="w-24 bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${entropyStats.color} transition-all duration-300`}
                style={{ width: `${Math.min(100, (entropyStats.bits / 120) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-neutral-400 tabular-nums">
              {entropyStats.bits} bits of entropy
            </span>
          </div>

          <div className="text-neutral-500 text-[11px]">
            <span>Est. crack time: </span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {entropyStats.crackTime}
            </span>
          </div>
        </div>
      </div>

      {/* Controls & Configuration */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-5">
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Configuration & Rules
        </h3>

        {mode === 'random' && (
          <div className="space-y-5">
            {/* Length Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                <span>Password Length</span>
                <span className="font-mono text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {length} chars
                </span>
              </div>
              <input
                type="range"
                min={6}
                max={64}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
                className="w-full accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>6 min</span>
                <span>16 recommended</span>
                <span>32 strong</span>
                <span>64 max</span>
              </div>
            </div>

            {/* Character Set Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => setIncludeUpper(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900"
                />
                <span className="text-xs text-neutral-800 dark:text-neutral-200">
                  Uppercase Letters (A-Z)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => setIncludeLower(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900"
                />
                <span className="text-xs text-neutral-800 dark:text-neutral-200">
                  Lowercase Letters (a-z)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900"
                />
                <span className="text-xs text-neutral-800 dark:text-neutral-200">
                  Numbers (0-9)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="rounded text-neutral-900 focus:ring-neutral-900"
                />
                <span className="text-xs text-neutral-800 dark:text-neutral-200">
                  Symbols (!@#$%^&*)
                </span>
              </label>
            </div>

            <label className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900"
              />
              <span>Avoid ambiguous characters (e.g. 0, O, o, 1, l, I)</span>
            </label>
          </div>
        )}

        {mode === 'passphrase' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                <span>Number of Words</span>
                <span className="font-mono text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {wordCount} words
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value, 10))}
                className="w-full accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                  Separator
                </label>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-mono"
                >
                  <option value="-">Hyphen (-)</option>
                  <option value="_">Underscore (_)</option>
                  <option value=".">Period (.)</option>
                  <option value=" ">Space ( )</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <input
                  type="checkbox"
                  checked={capitalizeWords}
                  onChange={(e) => setCapitalizeWords(e.target.checked)}
                  className="rounded text-neutral-900"
                />
                <span>Capitalize each word</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <input
                  type="checkbox"
                  checked={includeNumberInPassphrase}
                  onChange={(e) => setIncludeNumberInPassphrase(e.target.checked)}
                  className="rounded text-neutral-900"
                />
                <span>Append random number</span>
              </label>
            </div>
          </div>
        )}

        {mode === 'pin' && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                <span>PIN Length</span>
                <span className="font-mono text-base font-bold text-neutral-900 dark:text-neutral-100">
                  {pinLength} digits
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={12}
                value={pinLength}
                onChange={(e) => setPinLength(parseInt(e.target.value, 10))}
                className="w-full accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bulk Generator Option */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              Bulk Generation
            </h4>
            <p className="text-[11px] text-neutral-500">
              Create a batch of 5 distinct passwords meeting your active parameters.
            </p>
          </div>
          <button
            onClick={() => {
              if (!showBulk) {
                setShowBulk(true);
                generatePassword();
              } else {
                setShowBulk(false);
              }
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            {showBulk ? 'Hide Batch' : 'Generate Batch (5)'}
          </button>
        </div>

        {showBulk && bulkList.length > 0 && (
          <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            {bulkList.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 font-mono text-xs"
              >
                <span className="truncate pr-3 text-neutral-900 dark:text-neutral-100">
                  {item}
                </span>
                <button
                  onClick={() => handleCopyBulk(item, idx)}
                  className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded transition-colors shrink-0"
                  title="Copy password"
                >
                  {copiedBulkIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
