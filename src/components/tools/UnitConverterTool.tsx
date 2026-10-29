import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Copy, Check } from 'lucide-react';

interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
}

interface UnitCategory {
  id: string;
  name: string;
  baseUnit: string;
  units: UnitDef[];
}

const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    baseUnit: 'Meter',
    units: [
      { id: 'm', name: 'Meter', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', name: 'Kilometer', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: 'mm', name: 'Millimeter', symbol: 'mm', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mi', name: 'Mile', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'ft', name: 'Foot', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'in', name: 'Inch', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: 'nmi', name: 'Nautical Mile', symbol: 'nmi', toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    ],
  },
  {
    id: 'mass',
    name: 'Mass & Weight',
    baseUnit: 'Kilogram',
    units: [
      { id: 'kg', name: 'Kilogram', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      { id: 'g', name: 'Gram', symbol: 'g', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 't', name: 'Metric Ton', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'lb', name: 'Pound', symbol: 'lb', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
      { id: 'st', name: 'Stone', symbol: 'st', toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    baseUnit: 'Celsius',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      { id: 'k', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    baseUnit: 'Square Meter',
    units: [
      { id: 'sqm', name: 'Square Meter', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      { id: 'sqkm', name: 'Square Kilometer', symbol: 'km²', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'sqft', name: 'Square Foot', symbol: 'ft²', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: 'sqmi', name: 'Square Mile', symbol: 'mi²', toBase: (v) => v * 2589988.11, fromBase: (v) => v / 2589988.11 },
      { id: 'ac', name: 'Acre', symbol: 'ac', toBase: (v) => v * 4046.856, fromBase: (v) => v / 4046.856 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    baseUnit: 'Liter',
    units: [
      { id: 'l', name: 'Liter', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ml', name: 'Milliliter', symbol: 'mL', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'cum', name: 'Cubic Meter', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'gal', name: 'US Gallon', symbol: 'gal', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { id: 'qt', name: 'US Quart', symbol: 'qt', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      { id: 'pt', name: 'US Pint', symbol: 'pt', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      { id: 'cup', name: 'US Cup', symbol: 'cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      { id: 'floz', name: 'Fluid Ounce (US)', symbol: 'fl oz', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
      { id: 'tbsp', name: 'Tablespoon (US)', symbol: 'tbsp', toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
      { id: 'tsp', name: 'Teaspoon (US)', symbol: 'tsp', toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
    ],
  },
  {
    id: 'speed',
    name: 'Speed',
    baseUnit: 'Meter/Second',
    units: [
      { id: 'ms', name: 'Meter per second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kmh', name: 'Kilometer per hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'mph', name: 'Mile per hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'kn', name: 'Knot', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      { id: 'fts', name: 'Foot per second', symbol: 'ft/s', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    baseUnit: 'Second',
    units: [
      { id: 's', name: 'Second', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ms', name: 'Millisecond', symbol: 'ms', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'min', name: 'Minute', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: 'h', name: 'Hour', symbol: 'h', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'd', name: 'Day', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: 'wk', name: 'Week', symbol: 'wk', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: 'mo', name: 'Month (30 days)', symbol: 'mo', toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
      { id: 'yr', name: 'Year (365 days)', symbol: 'yr', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressure',
    baseUnit: 'Pascal',
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'mpa', name: 'Megapascal', symbol: 'MPa', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      { id: 'mbar', name: 'Millibar / hPa', symbol: 'mbar', toBase: (v) => v * 100, fromBase: (v) => v / 100 },
      { id: 'psi', name: 'Pounds/Sq Inch', symbol: 'psi', toBase: (v) => v * 6894.75729, fromBase: (v) => v / 6894.75729 },
      { id: 'atm', name: 'Standard Atmosphere', symbol: 'atm', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      { id: 'mmhg', name: 'Millimeters of Mercury', symbol: 'mmHg', toBase: (v) => v * 133.322387, fromBase: (v) => v / 133.322387 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy & Work',
    baseUnit: 'Joule',
    units: [
      { id: 'j', name: 'Joule', symbol: 'J', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cal', name: 'Gram Calorie', symbol: 'cal', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      { id: 'kcal', name: 'Kilocalorie (Food)', symbol: 'kcal', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      { id: 'wh', name: 'Watt-hour', symbol: 'Wh', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'kwh', name: 'Kilowatt-hour', symbol: 'kWh', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
      { id: 'btu', name: 'British Thermal Unit', symbol: 'BTU', toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
      { id: 'ftlb', name: 'Foot-pound', symbol: 'ft·lb', toBase: (v) => v * 1.355818, fromBase: (v) => v / 1.355818 },
    ],
  },
  {
    id: 'power',
    name: 'Power',
    baseUnit: 'Watt',
    units: [
      { id: 'w', name: 'Watt', symbol: 'W', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kw', name: 'Kilowatt', symbol: 'kW', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'mw', name: 'Megawatt', symbol: 'MW', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'hp', name: 'Mechanical Horsepower', symbol: 'hp', toBase: (v) => v * 745.699872, fromBase: (v) => v / 745.699872 },
      { id: 'ps', name: 'Metric Horsepower', symbol: 'PS', toBase: (v) => v * 735.49875, fromBase: (v) => v / 735.49875 },
    ],
  },
  {
    id: 'digital',
    name: 'Digital Data (Decimal & Binary)',
    baseUnit: 'Byte',
    units: [
      // Decimal (SI 1000-based)
      { id: 'b', name: 'Byte', symbol: 'B', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kb', name: 'Kilobyte (Decimal 10³)', symbol: 'KB', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'mb', name: 'Megabyte (Decimal 10⁶)', symbol: 'MB', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'gb', name: 'Gigabyte (Decimal 10⁹)', symbol: 'GB', toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
      { id: 'tb', name: 'Terabyte (Decimal 10¹²)', symbol: 'TB', toBase: (v) => v * 1000000000000, fromBase: (v) => v / 1000000000000 },

      // Binary (IEC 1024-based)
      { id: 'kib', name: 'Kibibyte (Binary 2¹⁰)', symbol: 'KiB', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: 'mib', name: 'Mebibyte (Binary 2²⁰)', symbol: 'MiB', toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: 'gib', name: 'Gibibyte (Binary 2³⁰)', symbol: 'GiB', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { id: 'tib', name: 'Tebibyte (Binary 2⁴⁰)', symbol: 'TiB', toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },

      // Bits
      { id: 'bit', name: 'Bit (1/8 Byte)', symbol: 'bit', toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      { id: 'mbit', name: 'Megabit (Network rate)', symbol: 'Mb', toBase: (v) => (v * 1000000) / 8, fromBase: (v) => (v * 8) / 1000000 },
      { id: 'gbit', name: 'Gigabit (Network rate)', symbol: 'Gb', toBase: (v) => (v * 1000000000) / 8, fromBase: (v) => (v * 8) / 1000000000 },
    ],
  },
];

export function UnitConverterTool() {
  const [selectedCatId, setSelectedCatId] = useState('length');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnitId, setFromUnitId] = useState('m');
  const [toUnitId, setToUnitId] = useState('ft');
  const [precision, setPrecision] = useState<number>(4);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeCategory = useMemo(() => {
    return UNIT_CATEGORIES.find((c) => c.id === selectedCatId) || UNIT_CATEGORIES[0];
  }, [selectedCatId]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.units.length >= 2) {
      setFromUnitId(cat.units[0].id);
      setToUnitId(cat.units[1].id);
    }
  };

  const fromUnit = useMemo(() => {
    return activeCategory.units.find((u) => u.id === fromUnitId) || activeCategory.units[0];
  }, [activeCategory, fromUnitId]);

  const toUnit = useMemo(() => {
    return activeCategory.units.find((u) => u.id === toUnitId) || activeCategory.units[1] || activeCategory.units[0];
  }, [activeCategory, toUnitId]);

  const numericInput = useMemo(() => {
    const val = parseFloat(inputValue);
    return isNaN(val) ? 0 : val;
  }, [inputValue]);

  const convertedValue = useMemo(() => {
    if (!fromUnit || !toUnit) return 0;
    const base = fromUnit.toBase(numericInput);
    return toUnit.fromBase(base);
  }, [numericInput, fromUnit, toUnit]);

  const formatNumber = (num: number, prec: number): string => {
    if (isNaN(num)) return '0';
    if (!isFinite(num)) return 'Infinity';
    if (num !== 0 && (Math.abs(num) < 0.000001 || Math.abs(num) > 1000000000)) {
      return num.toExponential(prec);
    }
    const factor = Math.pow(10, prec);
    const rounded = Math.round(num * factor) / factor;
    return String(rounded);
  };

  const handleSwap = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const comparisonList = useMemo(() => {
    if (!fromUnit) return [];
    const base = fromUnit.toBase(numericInput);
    return activeCategory.units.map((u) => {
      const val = u.fromBase(base);
      return {
        unit: u,
        value: formatNumber(val, precision),
        raw: val,
      };
    });
  }, [activeCategory, fromUnit, numericInput, precision]);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-x-auto scrollbar-none">
        {UNIT_CATEGORIES.map((cat) => {
          const isActive = cat.id === selectedCatId;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Main Conversion Panel */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* From Input */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              Source Value & Unit
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="0"
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-lg font-mono font-semibold text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <select
                value={fromUnitId}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="w-48 px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 shrink-0"
              >
                {activeCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              onClick={handleSwap}
              title="Swap units"
              aria-label="Swap units"
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* To Input / Result */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              Target Value & Unit
            </label>
            <div className="flex gap-2">
              <div className="w-full flex items-center justify-between px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg">
                <span className="text-lg font-mono font-bold text-neutral-900 dark:text-neutral-100 tabular-nums truncate">
                  {formatNumber(convertedValue, precision)}
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(formatNumber(convertedValue, precision), 'main-res')
                  }
                  title="Copy result"
                  aria-label="Copy result"
                  className="ml-2 p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded transition-colors"
                >
                  {copiedKey === 'main-res' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <select
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-48 px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 shrink-0"
              >
                {activeCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Precision & Equation Bar */}
        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="font-mono">
            <span>{inputValue || '0'} {fromUnit.symbol}</span>
            <span className="mx-2">=</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {formatNumber(convertedValue, precision)} {toUnit.symbol}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Decimal places:</span>
            <div className="flex items-center gap-1">
              {[0, 2, 4, 6, 8].map((p) => (
                <button
                  key={p}
                  onClick={() => setPrecision(p)}
                  className={`px-2 py-1 rounded text-xs font-mono font-medium border transition-colors ${
                    precision === p
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Unit Reference Grid */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Complete {activeCategory.name} Translation Table
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Equivalent values for {inputValue || '0'} {fromUnit.name} across all available units
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {comparisonList.map((item) => {
            const isCurrent = item.unit.id === toUnitId;
            return (
              <div
                key={item.unit.id}
                className={`p-3 rounded-lg border transition-colors flex items-center justify-between ${
                  isCurrent
                    ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-50/70 dark:bg-neutral-800/40'
                    : 'border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="truncate pr-2">
                  <div className="text-[11px] text-neutral-500 font-medium truncate">
                    {item.unit.name} ({item.unit.symbol})
                  </div>
                  <div className="text-sm font-bold font-mono text-neutral-900 dark:text-neutral-100 tabular-nums truncate">
                    {item.value}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setToUnitId(item.unit.id)}
                    className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => copyToClipboard(item.value, item.unit.id)}
                    title="Copy value"
                    className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded transition-colors"
                  >
                    {copiedKey === item.unit.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
