import React, { useState, useMemo } from 'react';
import { Copy, Check, DollarSign, AlertCircle, Info, Calendar } from 'lucide-react';
import { calculateCompoundInterest } from '../../logic/finance';

export function CompoundInterestTool() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('6.5');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState('12'); // monthly
  const [monthlyAddition, setMonthlyAddition] = useState('200');
  const [additionTiming, setAdditionTiming] = useState<'end' | 'beginning'>('end');
  const [copied, setCopied] = useState(false);

  const numPrincipal = parseFloat(principal) || 0;
  const numRate = parseFloat(rate) || 0;
  const numYears = parseFloat(years) || 1;
  const numFreq = parseInt(frequency, 10) || 12;
  const numAnnualAddition = (parseFloat(monthlyAddition) || 0) * 12;

  const result = useMemo(() => {
    return calculateCompoundInterest(
      numPrincipal,
      numRate,
      numYears,
      numFreq,
      numAnnualAddition,
      additionTiming === 'beginning'
    );
  }, [numPrincipal, numRate, numYears, numFreq, numAnnualAddition, additionTiming]);

  const copyResult = () => {
    navigator.clipboard.writeText(
      `Future Balance: $${result.futureValue.toLocaleString()} (Total Deposited: $${result.totalDeposited.toLocaleString()}, Interest: $${result.totalInterest.toLocaleString()})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
            Investment Parameters
          </h3>
          <p className="text-xs text-neutral-500">
            Estimate future investment growth based on mathematical compounding intervals and ongoing savings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Initial Principal ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="10000"
                className="w-full pl-7 pr-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Annual Interest Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min={0}
                max={100}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="6.5"
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-xs">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Time Horizon (Years)
            </label>
            <input
              type="number"
              min={1}
              max={60}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Compounding Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="1">Annually (1×/yr)</option>
              <option value="2">Semi-Annually (2×/yr)</option>
              <option value="4">Quarterly (4×/yr)</option>
              <option value="12">Monthly (12×/yr)</option>
              <option value="365">Daily (365×/yr)</option>
            </select>
          </div>
        </div>

        {/* Regular Contributions Strip */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Monthly Additional Deposit ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">
                $
              </span>
              <input
                type="number"
                min={0}
                value={monthlyAddition}
                onChange={(e) => setMonthlyAddition(e.target.value)}
                placeholder="200"
                className="w-full pl-7 pr-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              Deposit Timing
            </label>
            <select
              value={additionTiming}
              onChange={(e) => setAdditionTiming(e.target.value as any)}
              className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="end">End of each period (Ordinary Annuity)</option>
              <option value="beginning">Beginning of each period (Annuity Due)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Projected Ending Balance</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
            ${result.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Total Interest Earned</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums mt-1">
            +${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <div className="text-[11px] font-medium text-neutral-500">Total Capital Contributed</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
            ${result.totalDeposited.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">
            ${result.totalPrincipal.toLocaleString()} initial + ${result.totalContributions.toLocaleString()} additions
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-medium text-neutral-500">Interest-to-Deposit Ratio</div>
          <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
            {result.totalDeposited > 0
              ? `${((result.totalInterest / result.totalDeposited) * 100).toFixed(1)}%`
              : '0%'}
          </div>
          <button
            onClick={copyResult}
            className="mt-2 text-xs text-neutral-700 dark:text-neutral-300 font-medium hover:underline flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy summary'}</span>
          </button>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
          Annual Growth & Balance Schedule
        </h4>
        <p className="text-xs text-neutral-500 mb-4">
          Year-by-year compounding progression based on a {rate}% annual nominal rate.
        </p>

        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 font-semibold sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Year</th>
                <th className="py-2.5 px-3">Starting Balance</th>
                <th className="py-2.5 px-3">Deposits Added</th>
                <th className="py-2.5 px-3">Interest Earned</th>
                <th className="py-2.5 px-3">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {result.schedule.map((row) => (
                <tr key={row.year} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="py-2 px-3 font-bold text-neutral-800 dark:text-neutral-200">
                    Year {row.year}
                  </td>
                  <td className="py-2 px-3 tabular-nums text-neutral-600 dark:text-neutral-400">
                    ${row.startingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2 px-3 tabular-nums text-neutral-600 dark:text-neutral-400">
                    ${row.contributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2 px-3 tabular-nums text-emerald-600 dark:text-emerald-400">
                    +${row.interestEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2 px-3 tabular-nums font-bold text-neutral-900 dark:text-neutral-100">
                    ${row.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Disclosures */}
        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-500">
          <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              <strong className="text-neutral-700 dark:text-neutral-300">Important Disclosure & Assumptions:</strong>{' '}
              Calculations assume a constant nominal annual percentage rate and regular compounding with immediate reinvestment. Projections do not account for inflation, taxes, management expenses, fees, or market volatility.
            </p>
            <p className="text-[11px] text-neutral-400">
              This estimator is an educational simulation and does not represent guaranteed future investment returns or financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
