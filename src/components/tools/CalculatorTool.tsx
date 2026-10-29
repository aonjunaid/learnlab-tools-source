import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  History,
  Trash2,
  Binary,
  Layers,
  Percent,
  DollarSign,
  Printer,
  LineChart,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react';

type CalculatorMode =
  | 'elementary'
  | 'scientific'
  | 'graphing'
  | 'financial'
  | 'printing'
  | 'programmer';

type WordSize = 'QWORD' | 'DWORD' | 'WORD' | 'BYTE';
type BitBase = 'HEX' | 'DEC' | 'OCT' | 'BIN';

interface CalculationRecord {
  id: string;
  expression: string;
  result: string;
  mode: CalculatorMode;
  timestamp: string;
}

interface TapeItem {
  id: string;
  operator: string;
  value: number;
  subtotal: number;
  timestamp: string;
  isTotal?: boolean;
}

export function CalculatorTool() {
  const [activeMode, setActiveMode] = useState<CalculatorMode>('scientific');
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CalculationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ll_calc_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showHistory, setShowHistory] = useState(false);

  // Sync history
  useEffect(() => {
    try {
      localStorage.setItem('ll_calc_history', JSON.stringify(history.slice(0, 50)));
    } catch {
      // ignore
    }
  }, [history]);

  const addHistory = useCallback((expr: string, res: string, mode: CalculatorMode) => {
    setHistory((prev) => [
      {
        id: Math.random().toString(36).substring(2, 9),
        expression: expr,
        result: res,
        mode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev.slice(0, 49),
    ]);
  }, []);

  // ==========================================
  // 1 & 2. ELEMENTARY & SCIENTIFIC STATE
  // ==========================================
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [angleUnit, setAngleUnit] = useState<'DEG' | 'RAD'>('DEG');
  const [memory, setMemory] = useState<number | null>(null);
  const [secondFunction, setSecondFunction] = useState(false);

  const evaluateMath = useCallback((expr: string): string => {
    try {
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/π/g, `${Math.PI}`)
        .replace(/\be\b/g, `${Math.E}`);

      if (!/^[\d+\-*/.()% \t,eE]+$/.test(sanitized)) {
        return 'Error';
      }

      sanitized = sanitized.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

      const val = new Function(`return (${sanitized})`)();
      if (typeof val !== 'number' || !isFinite(val)) {
        return 'Error';
      }
      return String(Number(Math.round(Number(val + 'e12')) + 'e-12'));
    } catch {
      return 'Error';
    }
  }, []);

  const handleInputChar = useCallback((char: string) => {
    setDisplay((prev) => {
      if (prev === '0' || prev === 'Error') return char;
      return prev + char;
    });
  }, []);

  const handleOperator = useCallback((op: string) => {
    setDisplay((prev) => {
      if (prev === 'Error') return '0' + op;
      const last = prev.trim().slice(-1);
      if (['+', '−', '×', '÷', '^'].includes(last)) {
        return prev.slice(0, -1) + op;
      }
      return prev + op;
    });
  }, []);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setExpression('');
  }, []);

  const handleBackspace = useCallback(() => {
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  }, []);

  const handleEquals = useCallback(() => {
    if (display === 'Error') return;
    const res = evaluateMath(display);
    setExpression(display + ' =');
    setDisplay(res);
    if (res !== 'Error') {
      addHistory(display, res, activeMode);
    }
  }, [display, evaluateMath, addHistory, activeMode]);

  const applyScientificFunction = useCallback(
    (fnName: string) => {
      try {
        const currentVal = parseFloat(evaluateMath(display));
        if (isNaN(currentVal)) {
          setDisplay('Error');
          return;
        }

        let result = 0;
        const rad = angleUnit === 'DEG' ? (currentVal * Math.PI) / 180 : currentVal;

        switch (fnName) {
          case 'sin':
            result = Math.sin(rad);
            break;
          case 'cos':
            result = Math.cos(rad);
            break;
          case 'tan':
            if (angleUnit === 'DEG' && Math.abs(currentVal % 180) === 90) {
              setDisplay('Error');
              return;
            }
            result = Math.tan(rad);
            break;
          case 'asin':
            if (currentVal < -1 || currentVal > 1) {
              setDisplay('Error');
              return;
            }
            result = Math.asin(currentVal);
            if (angleUnit === 'DEG') result = (result * 180) / Math.PI;
            break;
          case 'acos':
            if (currentVal < -1 || currentVal > 1) {
              setDisplay('Error');
              return;
            }
            result = Math.acos(currentVal);
            if (angleUnit === 'DEG') result = (result * 180) / Math.PI;
            break;
          case 'atan':
            result = Math.atan(currentVal);
            if (angleUnit === 'DEG') result = (result * 180) / Math.PI;
            break;
          case 'sqrt':
            if (currentVal < 0) {
              setDisplay('Error');
              return;
            }
            result = Math.sqrt(currentVal);
            break;
          case 'cbrt':
            result = Math.cbrt(currentVal);
            break;
          case 'sqr':
            result = currentVal * currentVal;
            break;
          case 'cube':
            result = currentVal * currentVal * currentVal;
            break;
          case 'ln':
            if (currentVal <= 0) {
              setDisplay('Error');
              return;
            }
            result = Math.log(currentVal);
            break;
          case 'log10':
            if (currentVal <= 0) {
              setDisplay('Error');
              return;
            }
            result = Math.log10(currentVal);
            break;
          case 'exp':
            result = Math.exp(currentVal);
            break;
          case '10pow':
            result = Math.pow(10, currentVal);
            break;
          case 'recip':
            if (currentVal === 0) {
              setDisplay('Error');
              return;
            }
            result = 1 / currentVal;
            break;
          case 'abs':
            result = Math.abs(currentVal);
            break;
          case 'fact':
            if (currentVal < 0 || !Number.isInteger(currentVal) || currentVal > 170) {
              setDisplay('Error');
              return;
            }
            let f = 1;
            for (let i = 2; i <= currentVal; i++) f *= i;
            result = f;
            break;
          default:
            return;
        }

        const formatted = String(Number(Math.round(Number(result + 'e12')) + 'e-12'));
        setExpression(`${fnName}(${currentVal}) =`);
        setDisplay(formatted);
        addHistory(`${fnName}(${currentVal})`, formatted, activeMode);
      } catch {
        setDisplay('Error');
      }
    },
    [display, evaluateMath, angleUnit, addHistory, activeMode]
  );

  const handleMemory = useCallback(
    (action: 'MC' | 'MR' | 'M+' | 'M-' | 'MS') => {
      const current = parseFloat(display);
      if (isNaN(current)) return;
      switch (action) {
        case 'MC':
          setMemory(null);
          break;
        case 'MR':
          if (memory !== null) setDisplay(String(memory));
          break;
        case 'MS':
          setMemory(current);
          break;
        case 'M+':
          setMemory((prev) => (prev ?? 0) + current);
          break;
        case 'M-':
          setMemory((prev) => (prev ?? 0) - current);
          break;
      }
    },
    [display, memory]
  );

  // ==========================================
  // 3. GRAPHING CALCULATOR STATE (TI-84 style)
  // ==========================================
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [graphFunction, setGraphFunction] = useState('sin(x)');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-5);
  const [yMax, setYMax] = useState(5);
  const [mouseCoord, setMouseCoord] = useState<{ x: number; y: number } | null>(null);

  // Evaluate expression f(x)
  const evalGraphFx = useCallback((expr: string, xVal: number): number | null => {
    try {
      let formatted = expr
        .replace(/\bpi\b/gi, `${Math.PI}`)
        .replace(/\be\b/gi, `${Math.E}`)
        .replace(/\bsin\b/gi, 'Math.sin')
        .replace(/\bcos\b/gi, 'Math.cos')
        .replace(/\btan\b/gi, 'Math.tan')
        .replace(/\bsqrt\b/gi, 'Math.sqrt')
        .replace(/\babs\b/gi, 'Math.abs')
        .replace(/\bln\b/gi, 'Math.log')
        .replace(/\blog\b/gi, 'Math.log10')
        .replace(/\bexp\b/gi, 'Math.exp')
        .replace(/\^/g, '**');

      // Replace x (avoid Math.exp or similar words)
      formatted = formatted.replace(/\bx\b/g, `(${xVal})`);

      const res = new Function(`return (${formatted})`)();
      if (typeof res !== 'number' || !isFinite(res) || isNaN(res)) return null;
      return res;
    } catch {
      return null;
    }
  }, []);

  // Draw graph to canvas
  useEffect(() => {
    if (activeMode !== 'graphing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, width, height);

    // Coordinate transforms
    const toScreenX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toScreenY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Draw Grid
    ctx.strokeStyle = '#1e293b'; // slate-800
    ctx.lineWidth = 1;

    // X grid lines
    const xStep = Math.max(1, Math.round((xMax - xMin) / 10));
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const sx = toScreenX(x);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.stroke();

      // Tick label
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`${x}`, sx + 3, toScreenY(0) + 12);
    }

    // Y grid lines
    const yStep = Math.max(1, Math.round((yMax - yMin) / 10));
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const sy = toScreenY(y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();

      if (y !== 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '10px monospace';
        ctx.fillText(`${y}`, toScreenX(0) + 4, sy - 3);
      }
    }

    // Draw Axes (X and Y = 0)
    ctx.strokeStyle = '#475569'; // slate-600
    ctx.lineWidth = 1.5;

    // X Axis
    const originY = toScreenY(0);
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y Axis
    const originX = toScreenX(0);
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Plot function f(x)
    ctx.strokeStyle = '#14b8a6'; // teal-500
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    let isDrawing = false;
    const stepPx = 1;
    for (let px = 0; px <= width; px += stepPx) {
      const x = xMin + (px / width) * (xMax - xMin);
      const y = evalGraphFx(graphFunction, x);

      if (y !== null && isFinite(y)) {
        const py = toScreenY(y);
        if (py >= -100 && py <= height + 100) {
          if (!isDrawing) {
            ctx.moveTo(px, py);
            isDrawing = true;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          isDrawing = false;
        }
      } else {
        isDrawing = false;
      }
    }
    ctx.stroke();

    // Crosshair if hovering
    if (mouseCoord) {
      const mx = toScreenX(mouseCoord.x);
      const my = toScreenY(mouseCoord.y);

      ctx.strokeStyle = '#f59e0b'; // amber-500
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(mx, 0);
      ctx.lineTo(mx, height);
      ctx.moveTo(0, my);
      ctx.lineTo(width, my);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point circle
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(mx, my, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [activeMode, graphFunction, xMin, xMax, yMin, yMax, mouseCoord, evalGraphFx]);

  // Handle Canvas mouse move for coordinate readout
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const x = xMin + (px / rect.width) * (xMax - xMin);
    const y = evalGraphFx(graphFunction, x);
    if (y !== null) {
      setMouseCoord({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) });
    }
  };

  // ==========================================
  // 4. PRINTING CALCULATOR (Paper Tape Roll)
  // ==========================================
  const [tapeEntries, setTapeEntries] = useState<TapeItem[]>([
    { id: '1', operator: '+', value: 125.5, subtotal: 125.5, timestamp: '10:14 AM' },
    { id: '2', operator: '+', value: 45.0, subtotal: 170.5, timestamp: '10:14 AM' },
    { id: '3', operator: '-', value: 15.2, subtotal: 155.3, timestamp: '10:15 AM' },
  ]);
  const [tapeCurrentInput, setTapeCurrentInput] = useState<string>('0');
  const [tapeTaxRate, setTapeTaxRate] = useState<number>(8.25); // %
  const tapeRunningTotal = tapeEntries.length > 0 ? tapeEntries[tapeEntries.length - 1].subtotal : 0;

  const pushTapeItem = (op: '+' | '-' | '*' | '/' | 'TAX+' | 'TAX-') => {
    const val = parseFloat(tapeCurrentInput);
    if (isNaN(val) && op !== 'TAX+' && op !== 'TAX-') return;

    let newSub = tapeRunningTotal;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (op === '+') newSub += val;
    else if (op === '-') newSub -= val;
    else if (op === '*') newSub *= val;
    else if (op === '/') newSub = val !== 0 ? newSub / val : newSub;
    else if (op === 'TAX+') {
      const taxAmount = (tapeRunningTotal * tapeTaxRate) / 100;
      setTapeEntries((prev) => [
        ...prev,
        { id: Math.random().toString(), operator: '+TAX', value: taxAmount, subtotal: tapeRunningTotal + taxAmount, timestamp: timeStr },
      ]);
      setTapeCurrentInput('0');
      return;
    } else if (op === 'TAX-') {
      const taxAmount = (tapeRunningTotal * tapeTaxRate) / (100 + tapeTaxRate);
      setTapeEntries((prev) => [
        ...prev,
        { id: Math.random().toString(), operator: '-TAX', value: taxAmount, subtotal: tapeRunningTotal - taxAmount, timestamp: timeStr },
      ]);
      setTapeCurrentInput('0');
      return;
    }

    setTapeEntries((prev) => [
      ...prev,
      { id: Math.random().toString(), operator: op, value: val, subtotal: newSub, timestamp: timeStr },
    ]);
    setTapeCurrentInput('0');
  };

  const downloadTapeCSV = () => {
    let csv = 'Timestamp,Operator,Amount,RunningSubtotal\n';
    for (const item of tapeEntries) {
      csv += `"${item.timestamp}","${item.operator}",${item.value},${item.subtotal}\n`;
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculator_audit_roll_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ==========================================
  // 5. PROGRAMMER / BITWISE STATE
  // ==========================================
  const [progValue, setProgValue] = useState<bigint>(0n);
  const [wordSize, setWordSize] = useState<WordSize>('DWORD');
  const [progBase, setProgBase] = useState<BitBase>('DEC');

  const getMask = (ws: WordSize): bigint => {
    switch (ws) {
      case 'BYTE': return 0xffn;
      case 'WORD': return 0xffffn;
      case 'DWORD': return 0xffffffffn;
      case 'QWORD': return 0xffffffffffffffffn;
    }
  };

  const getBitsCount = (ws: WordSize): number => {
    switch (ws) {
      case 'BYTE': return 8;
      case 'WORD': return 16;
      case 'DWORD': return 32;
      case 'QWORD': return 64;
    }
  };

  const currentMask = getMask(wordSize);
  const clampedProgValue = progValue & currentMask;
  const hexString = clampedProgValue.toString(16).toUpperCase();
  const decString = clampedProgValue.toString(10);
  const octString = clampedProgValue.toString(8);
  const bitCount = getBitsCount(wordSize);
  const binString = clampedProgValue.toString(2).padStart(bitCount, '0');

  const handleProgDigit = (digit: string) => {
    let radix = 10;
    if (progBase === 'HEX') radix = 16;
    else if (progBase === 'OCT') radix = 8;
    else if (progBase === 'BIN') radix = 2;

    const currentStr = clampedProgValue.toString(radix);
    const newStr = currentStr === '0' ? digit : currentStr + digit;
    try {
      const parsed = BigInt(
        progBase === 'HEX' ? '0x' + newStr : progBase === 'OCT' ? '0o' + newStr : progBase === 'BIN' ? '0b' + newStr : newStr
      );
      setProgValue(parsed & currentMask);
    } catch {
      // ignore
    }
  };

  const toggleBit = (bitIndex: number) => {
    const bitMask = 1n << BigInt(bitIndex);
    setProgValue((prev) => (prev ^ bitMask) & currentMask);
  };

  // ==========================================
  // 6. FINANCIAL LOAN & AMORTIZATION STATE
  // ==========================================
  const [loanPrincipal, setLoanPrincipal] = useState<number>(250000);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(5.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [extraPaymentMonthly, setExtraPaymentMonthly] = useState<number>(0);
  const [showAmortizationTable, setShowAmortizationTable] = useState(false);

  const loanMetrics = useMemo(() => {
    const P = loanPrincipal;
    const annualRate = loanInterestRate / 100;
    const monthlyRate = annualRate / 12;
    const totalMonths = loanTermYears * 12;

    if (P <= 0 || totalMonths <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, amortization: [], interestPercent: 0 };
    }

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = P / totalMonths;
    } else {
      monthlyPayment = (P * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    let balance = P;
    const schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    let sumInterest = 0;

    for (let m = 1; m <= totalMonths && balance > 0; m++) {
      const interestForMonth = balance * monthlyRate;
      let principalForMonth = monthlyPayment - interestForMonth + extraPaymentMonthly;
      if (principalForMonth > balance) principalForMonth = balance;
      balance = Math.max(0, balance - principalForMonth);
      sumInterest += interestForMonth;

      schedule.push({
        month: m,
        payment: principalForMonth + interestForMonth,
        principal: principalForMonth,
        interest: interestForMonth,
        balance,
      });

      if (balance <= 0) break;
    }

    const totalPaid = P + sumInterest;
    const interestPercent = totalPaid > 0 ? (sumInterest / totalPaid) * 100 : 0;

    return { monthlyPayment, totalPayment: totalPaid, totalInterest: sumInterest, amortization: schedule, interestPercent };
  }, [loanPrincipal, loanInterestRate, loanTermYears, extraPaymentMonthly]);

  // Copy helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher Tabs (6 Calculator Types from RankRed taxonomy) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl" role="tablist">
          <button
            onClick={() => setActiveMode('elementary')}
            role="tab"
            aria-selected={activeMode === 'elementary'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeMode === 'elementary'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Basic (4-Op)
          </button>
          <button
            onClick={() => setActiveMode('scientific')}
            role="tab"
            aria-selected={activeMode === 'scientific'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeMode === 'scientific'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            Scientific
          </button>
          <button
            onClick={() => setActiveMode('graphing')}
            role="tab"
            aria-selected={activeMode === 'graphing'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeMode === 'graphing'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            Graphing (TI-84)
          </button>
          <button
            onClick={() => setActiveMode('printing')}
            role="tab"
            aria-selected={activeMode === 'printing'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeMode === 'printing'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            Printing Tape
          </button>
          <button
            onClick={() => setActiveMode('financial')}
            role="tab"
            aria-selected={activeMode === 'financial'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeMode === 'financial'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Financial Loan
          </button>
          <button
            onClick={() => setActiveMode('programmer')}
            role="tab"
            aria-selected={activeMode === 'programmer'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeMode === 'programmer'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Binary className="w-3.5 h-3.5" />
            Programmer
          </button>
        </div>

        {(activeMode === 'elementary' || activeMode === 'scientific') && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            History ({history.length})
          </button>
        )}
      </div>

      {/* ========================================================== */}
      {/* 1 & 2. BASIC / SCIENTIFIC VIEW */}
      {/* ========================================================== */}
      {(activeMode === 'elementary' || activeMode === 'scientific') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`${showHistory ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
            {/* Display Screen */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-inner flex flex-col justify-between min-h-[130px] border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                <span className="flex items-center gap-2">
                  {activeMode === 'scientific' && (
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-teal-400 font-bold">
                      {angleUnit}
                    </span>
                  )}
                  {memory !== null && (
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-amber-400 font-bold">
                      M = {memory}
                    </span>
                  )}
                </span>
                <span className="truncate max-w-[280px] text-slate-400">{expression || '\u00A0'}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 mt-2">
                <button
                  onClick={() => handleCopy(display)}
                  title="Copy result"
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <div className="text-3xl sm:text-4xl font-mono font-semibold tracking-tight overflow-x-auto text-right whitespace-nowrap scrollbar-thin">
                  {display}
                </div>
              </div>
            </div>

            {/* Scientific Function Bar */}
            {activeMode === 'scientific' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 px-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setAngleUnit(angleUnit === 'DEG' ? 'RAD' : 'DEG')}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono rounded font-medium text-xs"
                    >
                      {angleUnit}
                    </button>
                    <button
                      onClick={() => setSecondFunction(!secondFunction)}
                      className={`px-2.5 py-1 font-mono rounded font-medium text-xs ${
                        secondFunction ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      2nd
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    {(['MC', 'MR', 'M+', 'M-', 'MS'] as const).map((mKey) => (
                      <button
                        key={mKey}
                        onClick={() => handleMemory(mKey)}
                        className="px-2 py-1 text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:text-teal-600 rounded"
                      >
                        {mKey}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 text-xs font-mono">
                  <button onClick={() => applyScientificFunction(secondFunction ? 'asin' : 'sin')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{secondFunction ? 'sin⁻¹' : 'sin'}</button>
                  <button onClick={() => applyScientificFunction(secondFunction ? 'acos' : 'cos')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{secondFunction ? 'cos⁻¹' : 'cos'}</button>
                  <button onClick={() => applyScientificFunction(secondFunction ? 'atan' : 'tan')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{secondFunction ? 'tan⁻¹' : 'tan'}</button>
                  <button onClick={() => applyScientificFunction(secondFunction ? 'sqr' : 'sqrt')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{secondFunction ? 'x²' : '√x'}</button>
                  <button onClick={() => applyScientificFunction(secondFunction ? 'cube' : 'cbrt')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{secondFunction ? 'x³' : '∛x'}</button>
                  <button onClick={() => handleOperator('^')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">x^y</button>
                  <button onClick={() => applyScientificFunction(secondFunction ? 'exp' : 'ln')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{secondFunction ? 'eˣ' : 'ln'}</button>
                  <button onClick={() => applyScientificFunction(secondFunction ? '10pow' : 'log10')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">{secondFunction ? '10ˣ' : 'log₁₀'}</button>
                  <button onClick={() => applyScientificFunction('recip')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">1/x</button>
                  <button onClick={() => applyScientificFunction('fact')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">n!</button>
                  <button onClick={() => handleInputChar('π')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">π</button>
                  <button onClick={() => handleInputChar('e')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">e</button>
                </div>
              </div>
            )}

            {/* Standard Keypad */}
            <div className="grid grid-cols-4 gap-2 font-mono">
              <button onClick={handleClear} className="p-3 sm:p-4 bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold rounded-xl">C</button>
              <button onClick={() => handleInputChar('(')} className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">(</button>
              <button onClick={() => handleInputChar(')')} className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">)</button>
              <button onClick={() => handleOperator('÷')} className="p-3 sm:p-4 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-lg">÷</button>

              <button onClick={() => handleInputChar('7')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">7</button>
              <button onClick={() => handleInputChar('8')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">8</button>
              <button onClick={() => handleInputChar('9')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">9</button>
              <button onClick={() => handleOperator('×')} className="p-3 sm:p-4 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-lg">×</button>

              <button onClick={() => handleInputChar('4')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">4</button>
              <button onClick={() => handleInputChar('5')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">5</button>
              <button onClick={() => handleInputChar('6')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">6</button>
              <button onClick={() => handleOperator('−')} className="p-3 sm:p-4 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-lg">−</button>

              <button onClick={() => handleInputChar('1')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">1</button>
              <button onClick={() => handleInputChar('2')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">2</button>
              <button onClick={() => handleInputChar('3')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">3</button>
              <button onClick={() => handleOperator('+')} className="p-3 sm:p-4 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-lg">+</button>

              <button onClick={() => handleInputChar('0')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">0</button>
              <button onClick={() => handleInputChar('.')} className="p-3 sm:p-4 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg">.</button>
              <button onClick={handleBackspace} className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-sm">⌫</button>
              <button onClick={handleEquals} className="p-3 sm:p-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md text-lg">=</button>
            </div>
          </div>

          {/* Ledger Side Panel */}
          {showHistory && (
            <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  Calculation Ledger
                </span>
                {history.length > 0 && (
                  <button onClick={() => setHistory([])} className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setDisplay(item.result)}
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 cursor-pointer text-right"
                  >
                    <div className="text-[11px] font-mono text-slate-500 truncate">{item.expression}</div>
                    <div className="text-sm font-mono font-bold text-slate-900 dark:text-white">= {item.result}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* 3. GRAPHING CALCULATOR (TI-84 style function plotter) */}
      {/* ========================================================== */}
      {activeMode === 'graphing' && (
        <div className="space-y-5">
          {/* Function presets bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Quick Curves:</span>
            {[
              { label: 'Sine Wave: sin(x)', fn: 'sin(x)' },
              { label: 'Parabola: x^2 - 4', fn: 'x^2 - 4' },
              { label: 'Cubic: x^3 - 3*x', fn: 'x^3 - 3*x' },
              { label: 'Damped Wave: exp(-0.2*x)*sin(2*x)', fn: 'exp(-0.2*x)*sin(2*x)' },
              { label: 'Gaussian: exp(-x^2)', fn: 'exp(-x^2)' },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setGraphFunction(preset.fn)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-700 dark:text-slate-300 rounded-lg font-mono transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Equation Input Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <span className="text-teal-400 font-mono font-bold text-base">f(x) =</span>
            <input
              type="text"
              value={graphFunction}
              onChange={(e) => setGraphFunction(e.target.value)}
              placeholder="e.g. sin(x), x^2 - 4, cos(2*x)..."
              className="flex-1 bg-slate-800 text-white px-3 py-2 rounded-xl font-mono text-sm border border-slate-700 focus:ring-2 focus:ring-teal-500"
            />
            {mouseCoord && (
              <div className="text-xs font-mono text-amber-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                x: {mouseCoord.x}, y: {mouseCoord.y}
              </div>
            )}
          </div>

          {/* Interactive Graph Canvas */}
          <div className="relative border border-slate-800 rounded-2xl overflow-hidden shadow-lg bg-slate-900">
            <canvas
              ref={canvasRef}
              width={760}
              height={380}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={() => setMouseCoord(null)}
              className="w-full h-[380px] block cursor-crosshair"
            />

            {/* Quick zoom controls */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-slate-800/80 backdrop-blur p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => {
                  setXMin((prev) => prev * 0.75);
                  setXMax((prev) => prev * 0.75);
                  setYMin((prev) => prev * 0.75);
                  setYMax((prev) => prev * 0.75);
                }}
                className="p-1.5 text-slate-300 hover:text-white rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setXMin((prev) => prev * 1.33);
                  setXMax((prev) => prev * 1.33);
                  setYMin((prev) => prev * 1.33);
                  setYMax((prev) => prev * 1.33);
                }}
                className="p-1.5 text-slate-300 hover:text-white rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setXMin(-10);
                  setXMax(10);
                  setYMin(-5);
                  setYMax(5);
                }}
                className="p-1.5 text-slate-300 hover:text-white rounded"
                title="Reset View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Window Domain & Range Bounds */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <label className="text-slate-500 block mb-1">X Min</label>
              <input
                type="number"
                value={xMin}
                onChange={(e) => setXMin(parseFloat(e.target.value) || -10)}
                className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1">X Max</label>
              <input
                type="number"
                value={xMax}
                onChange={(e) => setXMax(parseFloat(e.target.value) || 10)}
                className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Y Min</label>
              <input
                type="number"
                value={yMin}
                onChange={(e) => setYMin(parseFloat(e.target.value) || -5)}
                className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
            <div>
              <label className="text-slate-500 block mb-1">Y Max</label>
              <input
                type="number"
                value={yMax}
                onChange={(e) => setYMax(parseFloat(e.target.value) || 5)}
                className="w-full px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 4. PRINTING CALCULATOR (Sharp / Victor Paper Roll Tape) */}
      {/* ========================================================== */}
      {activeMode === 'printing' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Keypad */}
          <div className="md:col-span-7 space-y-4">
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex flex-col justify-between min-h-[110px]">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>PAPER TAPE ACCUMULATOR</span>
                <span>SUBTOTAL: ${tapeRunningTotal.toFixed(2)}</span>
              </div>
              <div className="text-3xl font-mono font-bold text-right mt-2 text-teal-400">
                {tapeCurrentInput}
              </div>
            </div>

            {/* Commercial Tax & Operational Keys */}
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              <button
                onClick={() => pushTapeItem('TAX+')}
                className="p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold rounded-xl"
              >
                +TAX ({tapeTaxRate}%)
              </button>
              <button
                onClick={() => pushTapeItem('TAX-')}
                className="p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold rounded-xl"
              >
                -TAX
              </button>
              <button
                onClick={() => setTapeCurrentInput('0')}
                className="p-3 bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold rounded-xl"
              >
                CE
              </button>
              <button
                onClick={() => pushTapeItem('/')}
                className="p-3 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-base"
              >
                ÷
              </button>

              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '7' : prev + '7'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">7</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '8' : prev + '8'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">8</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '9' : prev + '9'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">9</button>
              <button onClick={() => pushTapeItem('*')} className="p-3.5 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-base">×</button>

              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '4' : prev + '4'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">4</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '5' : prev + '5'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">5</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '6' : prev + '6'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">6</button>
              <button onClick={() => pushTapeItem('-')} className="p-3.5 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-base">−</button>

              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '1' : prev + '1'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">1</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '2' : prev + '2'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">2</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '3' : prev + '3'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">3</button>
              <button onClick={() => pushTapeItem('+')} className="p-3.5 bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold rounded-xl text-base">+</button>

              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '0' : prev + '0'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">0</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev.includes('.') ? prev : prev + '.'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">.</button>
              <button onClick={() => setTapeCurrentInput((prev) => (prev === '0' ? '00' : prev + '00'))} className="p-3.5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-base">00</button>
              <button
                onClick={() => {
                  setTapeEntries((prev) => [
                    ...prev,
                    { id: Math.random().toString(), operator: '*', value: tapeRunningTotal, subtotal: tapeRunningTotal, timestamp: new Date().toLocaleTimeString(), isTotal: true },
                  ]);
                }}
                className="p-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-base shadow"
              >
                TOTAL
              </button>
            </div>
          </div>

          {/* Virtual Paper Roll Tape Display */}
          <div className="md:col-span-5 bg-amber-50/60 dark:bg-slate-850 p-4 rounded-2xl border-2 border-dashed border-amber-300/80 dark:border-slate-700 font-mono text-xs space-y-3 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200 dark:border-slate-700">
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-amber-600" />
                Audit Paper Roll
              </span>
              <div className="flex items-center gap-2">
                {tapeEntries.length > 0 && (
                  <button
                    onClick={downloadTapeCSV}
                    className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-sans font-medium"
                  >
                    <Download className="w-3 h-3" />
                    CSV
                  </button>
                )}
                <button onClick={() => setTapeEntries([])} className="text-[11px] text-rose-500 hover:underline font-sans">
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              {tapeEntries.length === 0 ? (
                <div className="py-12 text-center text-slate-400">Tape roll is empty. Start adding figures.</div>
              ) : (
                tapeEntries.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-800 ${
                      item.isTotal ? 'font-extrabold text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/30 px-1 rounded' : ''
                    }`}
                  >
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    <span className="text-slate-500 font-bold">{item.operator}</span>
                    <span className={item.operator === '-' ? 'text-rose-600 font-semibold' : 'text-slate-800 dark:text-slate-200'}>
                      {item.value.toFixed(2)}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      = {item.subtotal.toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-amber-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">GRAND TOTAL:</span>
              <span className="text-lg font-extrabold font-mono text-teal-700 dark:text-teal-400">
                ${tapeRunningTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 5. FINANCIAL LOAN & AMORTIZATION VIEW */}
      {/* ========================================================== */}
      {activeMode === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Loan Amount ($)
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={loanPrincipal}
                onChange={(e) => setLoanPrincipal(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                step="0.05"
                value={loanInterestRate}
                onChange={(e) => setLoanInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Loan Term (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-teal-500"
              >
                <option value={5}>5 Years (60 Months)</option>
                <option value={10}>10 Years (120 Months)</option>
                <option value={15}>15 Years (180 Months)</option>
                <option value={20}>20 Years (240 Months)</option>
                <option value={30}>30 Years (360 Months)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Extra Monthly Payment ($)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={extraPaymentMonthly}
                onChange={(e) => setExtraPaymentMonthly(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-2xl">
              <span className="text-xs font-medium text-teal-700 dark:text-teal-400">Monthly Payment</span>
              <div className="text-2xl font-bold font-mono text-teal-900 dark:text-teal-200 mt-1">
                ${loanMetrics.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-teal-600 dark:text-teal-400">Principal &amp; Interest</span>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl">
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Total Interest Paid</span>
              <div className="text-2xl font-bold font-mono text-amber-900 dark:text-amber-200 mt-1">
                ${loanMetrics.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-amber-600 dark:text-amber-400">
                {loanMetrics.interestPercent.toFixed(1)}% of total repayments
              </span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Total Loan Cost</span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                ${loanMetrics.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-slate-500">Over {loanMetrics.amortization.length} monthly payments</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>Principal: ${(loanPrincipal).toLocaleString()} ({ (100 - loanMetrics.interestPercent).toFixed(1) }%)</span>
              <span>Interest: ${(loanMetrics.totalInterest).toLocaleString(undefined, { maximumFractionDigits: 0 })} ({ loanMetrics.interestPercent.toFixed(1) }%)</span>
            </div>
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div style={{ width: `${100 - loanMetrics.interestPercent}%` }} className="bg-teal-500 h-full" />
              <div style={{ width: `${loanMetrics.interestPercent}%` }} className="bg-amber-500 h-full" />
            </div>
          </div>

          <div>
            <button
              onClick={() => setShowAmortizationTable(!showAmortizationTable)}
              className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              {showAmortizationTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showAmortizationTable ? 'Collapse Amortization Schedule' : 'View Full Amortization Schedule by Month'}
            </button>

            {showAmortizationTable && (
              <div className="mt-3 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="max-h-[360px] overflow-y-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 sticky top-0">
                      <tr>
                        <th className="p-2.5">Month</th>
                        <th className="p-2.5">Payment</th>
                        <th className="p-2.5">Principal</th>
                        <th className="p-2.5">Interest</th>
                        <th className="p-2.5 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                      {loanMetrics.amortization.slice(0, 120).map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-2 text-slate-500">#{row.month}</td>
                          <td className="p-2">${row.payment.toFixed(2)}</td>
                          <td className="p-2 text-teal-600 dark:text-teal-400">${row.principal.toFixed(2)}</td>
                          <td className="p-2 text-amber-600 dark:text-amber-400">${row.interest.toFixed(2)}</td>
                          <td className="p-2 text-right">${row.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 6. PROGRAMMER / BITWISE VIEW */}
      {/* ========================================================== */}
      {activeMode === 'programmer' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Word Size:</span>
              {(['QWORD', 'DWORD', 'WORD', 'BYTE'] as WordSize[]).map((ws) => (
                <button
                  key={ws}
                  onClick={() => setWordSize(ws)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded transition-colors ${
                    wordSize === ws
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {ws} ({getBitsCount(ws)}b)
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Input Base:</span>
              {(['HEX', 'DEC', 'OCT', 'BIN'] as BitBase[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setProgBase(b)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded transition-colors ${
                    progBase === b
                      ? 'bg-teal-600 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-2.5 font-mono">
            {[
              { base: 'HEX', val: hexString, prefix: '0x' },
              { base: 'DEC', val: decString, prefix: '' },
              { base: 'OCT', val: octString, prefix: '0o' },
              { base: 'BIN', val: binString, prefix: '0b' },
            ].map(({ base, val, prefix }) => (
              <div
                key={base}
                onClick={() => setProgBase(base as BitBase)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                  progBase === base ? 'bg-slate-800/80 ring-1 ring-teal-500' : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${progBase === base ? 'bg-teal-500 text-slate-900' : 'text-slate-400 bg-slate-800'}`}>
                    {base}
                  </span>
                  <span className="text-xs text-slate-500">{prefix}</span>
                </div>
                <div className="text-base sm:text-lg font-semibold tracking-wide truncate ml-4 select-all">
                  {val}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Bit Toggle Matrix ({bitCount} bits)
              </span>
              <span className="text-[11px] text-slate-500">Click any individual bit to flip 0 ↔ 1</span>
            </div>

            <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 pt-2">
              {Array.from({ length: bitCount }).map((_, i) => {
                const bitIndex = bitCount - 1 - i;
                const isSet = ((clampedProgValue >> BigInt(bitIndex)) & 1n) === 1n;
                return (
                  <button
                    key={bitIndex}
                    onClick={() => toggleBit(bitIndex)}
                    className={`p-2 rounded flex flex-col items-center justify-center ${
                      isSet
                        ? 'bg-teal-600 text-white font-bold shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <span className="text-xs font-mono">{isSet ? '1' : '0'}</span>
                    <span className="text-[9px] opacity-70 font-mono">{bitIndex}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 font-mono">
            <button onClick={() => setProgValue((~clampedProgValue) & currentMask)} className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl">NOT (~)</button>
            <button onClick={() => setProgValue((clampedProgValue << 1n) & currentMask)} className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl">LSH (&lt;&lt;)</button>
            <button onClick={() => setProgValue((clampedProgValue >> 1n) & currentMask)} className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl">RSH (&gt;&gt;)</button>
            <button onClick={() => setProgValue(0n)} className="p-3 bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold rounded-xl">CLR</button>
            <button onClick={() => setProgValue(0n)} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl col-span-2">⌫ Reset</button>

            {['D', 'E', 'F', 'A', 'B', 'C', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((digit) => {
              const isHexOnly = ['A', 'B', 'C', 'D', 'E', 'F'].includes(digit);
              const isOctDigit = ['0', '1', '2', '3', '4', '5', '6', '7'].includes(digit);
              const isBinDigit = ['0', '1'].includes(digit);

              let disabled = false;
              if (progBase === 'BIN' && !isBinDigit) disabled = true;
              else if (progBase === 'OCT' && !isOctDigit) disabled = true;
              else if (progBase === 'DEC' && isHexOnly) disabled = true;

              return (
                <button
                  key={digit}
                  disabled={disabled}
                  onClick={() => handleProgDigit(digit)}
                  className={`p-3 sm:p-4 rounded-xl font-bold text-base ${
                    disabled
                      ? 'bg-slate-100 dark:bg-slate-850 text-slate-300 dark:text-slate-700 cursor-not-allowed'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-teal-500'
                  }`}
                >
                  {digit}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
