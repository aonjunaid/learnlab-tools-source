import React, { useState } from 'react';
import {
  solveSpeedDistanceTime,
  solveNewtonsSecondLaw,
  solveOhmsLaw,
  solveDensity,
  solveWaveRelation,
  solveQuadratic,
  solveSlopeDistance,
  ScienceResult,
} from '../../logic/science';
import { Copy, Check, Info, AlertCircle, Sparkles } from 'lucide-react';

export type ScienceSubTool =
  | 'speed'
  | 'newton'
  | 'ohm'
  | 'density'
  | 'wave'
  | 'quadratic'
  | 'geometry';

interface ScientificToolsHubProps {
  initialSubTool?: ScienceSubTool;
}

export function ScientificToolsHub({ initialSubTool = 'speed' }: ScientificToolsHubProps) {
  const [activeSubTool, setActiveSubTool] = useState<ScienceSubTool>(initialSubTool);
  const [copied, setCopied] = useState(false);

  // 1. Speed / Distance / Time
  const [sdtTarget, setSdtTarget] = useState<'speed' | 'distance' | 'time'>('speed');
  const [sdtSpeed, setSdtSpeed] = useState('20');
  const [sdtDistance, setSdtDistance] = useState('100');
  const [sdtTime, setSdtTime] = useState('5');

  // 2. Newton's 2nd Law
  const [newtonTarget, setNewtonTarget] = useState<'force' | 'mass' | 'acceleration'>('force');
  const [newtonForce, setNewtonForce] = useState('98');
  const [newtonMass, setNewtonMass] = useState('10');
  const [newtonAcc, setNewtonAcc] = useState('9.8');

  // 3. Ohm's Law
  const [ohmTarget, setOhmTarget] = useState<'voltage' | 'current' | 'resistance' | 'power'>('voltage');
  const [ohmV, setOhmV] = useState('12');
  const [ohmI, setOhmI] = useState('2');
  const [ohmR, setOhmR] = useState('6');

  // 4. Density
  const [densityTarget, setDensityTarget] = useState<'density' | 'mass' | 'volume'>('density');
  const [densityRho, setDensityRho] = useState('1000');
  const [densityM, setDensityM] = useState('500');
  const [densityV, setDensityV] = useState('0.5');

  // 5. Wave Relation
  const [waveTarget, setWaveTarget] = useState<'speed' | 'frequency' | 'wavelength'>('speed');
  const [waveV, setWaveV] = useState('340');
  const [waveF, setWaveF] = useState('440');
  const [waveL, setWaveL] = useState('0.7727');

  // 6. Quadratic Solver
  const [quadA, setQuadA] = useState('1');
  const [quadB, setQuadB] = useState('-5');
  const [quadC, setQuadC] = useState('6');

  // 7. Geometry 2D
  const [geoX1, setGeoX1] = useState('0');
  const [geoY1, setGeoY1] = useState('0');
  const [geoX2, setGeoX2] = useState('4');
  const [geoY2, setGeoY2] = useState('3');

  // Compute active result
  const sdtResult = solveSpeedDistanceTime(sdtTarget, {
    speed: parseFloat(sdtSpeed),
    distance: parseFloat(sdtDistance),
    time: parseFloat(sdtTime),
  });

  const newtonResult = solveNewtonsSecondLaw(newtonTarget, {
    force: parseFloat(newtonForce),
    mass: parseFloat(newtonMass),
    acceleration: parseFloat(newtonAcc),
  });

  const ohmResult = solveOhmsLaw(ohmTarget, {
    voltage: parseFloat(ohmV),
    current: parseFloat(ohmI),
    resistance: parseFloat(ohmR),
  });

  const densityResult = solveDensity(densityTarget, {
    density: parseFloat(densityRho),
    mass: parseFloat(densityM),
    volume: parseFloat(densityV),
  });

  const waveResult = solveWaveRelation(waveTarget, {
    speed: parseFloat(waveV),
    frequency: parseFloat(waveF),
    wavelength: parseFloat(waveL),
  });

  const quadResult = solveQuadratic(
    parseFloat(quadA),
    parseFloat(quadB),
    parseFloat(quadC)
  );

  const geoResult = solveSlopeDistance(
    parseFloat(geoX1),
    parseFloat(geoY1),
    parseFloat(geoX2),
    parseFloat(geoY2)
  );

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderScienceCard = (res: ScienceResult) => (
    <div className="space-y-5">
      {res.isValid ? (
        <div className="p-5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-neutral-500 font-medium">Solved Variable:</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-neutral-900 dark:text-neutral-50 mt-1 tabular-nums">
              {res.formattedValue}
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Primary SI formula: {res.equation}
            </div>
          </div>
          <button
            onClick={() => copyText(res.formattedValue)}
            className="self-start sm:self-center px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Result'}
          </button>
        </div>
      ) : (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 flex items-start gap-2 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold">Calculation Undefined / Invalid Input</div>
            <div className="mt-0.5">{res.errorMessage}</div>
          </div>
        </div>
      )}

      {res.isValid && (
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-3">
          <div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              Substitution & Computation Steps:
            </div>
            {res.substitutions.map((sub, i) => (
              <div key={i} className="font-mono bg-neutral-100 dark:bg-neutral-950 px-3 py-1.5 rounded text-neutral-800 dark:text-neutral-200 w-fit mb-1">
                {sub}
              </div>
            ))}
          </div>

          <div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              Physical Assumptions:
            </div>
            <ul className="space-y-1">
              {res.assumptions.map((asm, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px]">
                  <span className="text-neutral-400">·</span>
                  <span>{asm}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Sub-tool Selector */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-x-auto scrollbar-none">
        {[
          { id: 'speed', label: 'Speed / Distance / Time' },
          { id: 'newton', label: "Newton's 2nd Law (F = ma)" },
          { id: 'ohm', label: "Ohm's Law (V = IR)" },
          { id: 'density', label: 'Density (ρ = m/V)' },
          { id: 'wave', label: 'Wave Equation (v = fλ)' },
          { id: 'quadratic', label: 'Quadratic Equation' },
          { id: 'geometry', label: '2D Slope & Distance' },
        ].map((tab) => {
          const isActive = activeSubTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTool(tab.id as ScienceSubTool)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Workspace Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
        {/* 1. Speed Distance Time */}
        {activeSubTool === 'speed' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Uniform Speed, Distance & Elapsed Time
              </h3>
              <p className="text-xs text-neutral-500">
                Solves kinematic relations ($v = d / t$) under constant velocity assumptions.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Variable to Calculate
              </label>
              <div className="flex gap-2">
                {(['speed', 'distance', 'time'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSdtTarget(t)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                      sdtTarget === t
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    Solve for {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sdtTarget !== 'distance' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Distance (meters)
                  </label>
                  <input
                    type="number"
                    value={sdtDistance}
                    onChange={(e) => setSdtDistance(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {sdtTarget !== 'speed' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Speed (m/s)
                  </label>
                  <input
                    type="number"
                    value={sdtSpeed}
                    onChange={(e) => setSdtSpeed(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {sdtTarget !== 'time' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Time (seconds)
                  </label>
                  <input
                    type="number"
                    value={sdtTime}
                    onChange={(e) => setSdtTime(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
            </div>

            {renderScienceCard(sdtResult)}
          </div>
        )}

        {/* 2. Newton's 2nd Law */}
        {activeSubTool === 'newton' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Newton's Second Law of Motion
              </h3>
              <p className="text-xs text-neutral-500">
                Calculates the relationship between net resultant force, inertial mass, and linear acceleration ($F = m \cdot a$).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Variable
              </label>
              <div className="flex gap-2">
                {(['force', 'mass', 'acceleration'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setNewtonTarget(t)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                      newtonTarget === t
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    Solve for {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {newtonTarget !== 'force' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Net Force (Newtons, N)
                  </label>
                  <input
                    type="number"
                    value={newtonForce}
                    onChange={(e) => setNewtonForce(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {newtonTarget !== 'mass' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Mass (kg)
                  </label>
                  <input
                    type="number"
                    value={newtonMass}
                    onChange={(e) => setNewtonMass(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {newtonTarget !== 'acceleration' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Acceleration (m/s²)
                  </label>
                  <input
                    type="number"
                    value={newtonAcc}
                    onChange={(e) => setNewtonAcc(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
            </div>

            {renderScienceCard(newtonResult)}
          </div>
        )}

        {/* 3. Ohm's Law */}
        {activeSubTool === 'ohm' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Ohm's Law & DC Electrical Power
              </h3>
              <p className="text-xs text-neutral-500">
                Solves voltage ($V$), current ($I$), resistance ($R$), and electric power dissipation ($P = V \cdot I$).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Variable
              </label>
              <div className="flex flex-wrap gap-2">
                {(['voltage', 'current', 'resistance', 'power'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setOhmTarget(t)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                      ohmTarget === t
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    Solve for {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ohmTarget !== 'voltage' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Voltage (V)
                  </label>
                  <input
                    type="number"
                    value={ohmV}
                    onChange={(e) => setOhmV(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {ohmTarget !== 'current' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Current (Amperes, A)
                  </label>
                  <input
                    type="number"
                    value={ohmI}
                    onChange={(e) => setOhmI(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {ohmTarget !== 'resistance' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Resistance (Ohms, Ω)
                  </label>
                  <input
                    type="number"
                    value={ohmR}
                    onChange={(e) => setOhmR(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
            </div>

            {renderScienceCard(ohmResult)}
          </div>
        )}

        {/* 4. Density */}
        {activeSubTool === 'density' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Volumetric Density ($\rho = m / V$)
              </h3>
              <p className="text-xs text-neutral-500">
                Calculates material density, total mass, or occupied volume for homogeneous matter.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Variable
              </label>
              <div className="flex gap-2">
                {(['density', 'mass', 'volume'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setDensityTarget(t)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                      densityTarget === t
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    Solve for {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {densityTarget !== 'density' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Density (kg/m³)
                  </label>
                  <input
                    type="number"
                    value={densityRho}
                    onChange={(e) => setDensityRho(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {densityTarget !== 'mass' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Mass (kg)
                  </label>
                  <input
                    type="number"
                    value={densityM}
                    onChange={(e) => setDensityM(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {densityTarget !== 'volume' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Volume (m³)
                  </label>
                  <input
                    type="number"
                    value={densityV}
                    onChange={(e) => setDensityV(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
            </div>

            {renderScienceCard(densityResult)}
          </div>
        )}

        {/* 5. Wave Relation */}
        {activeSubTool === 'wave' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Wave Equation ($v = f \cdot \lambda$)
              </h3>
              <p className="text-xs text-neutral-500">
                Relates phase speed, oscillation frequency, and spatial wavelength in harmonic waves.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Variable
              </label>
              <div className="flex gap-2">
                {(['speed', 'frequency', 'wavelength'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setWaveTarget(t)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors ${
                      waveTarget === t
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    Solve for {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {waveTarget !== 'speed' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Wave Speed (m/s)
                  </label>
                  <input
                    type="number"
                    value={waveV}
                    onChange={(e) => setWaveV(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {waveTarget !== 'frequency' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Frequency (Hertz, Hz)
                  </label>
                  <input
                    type="number"
                    value={waveF}
                    onChange={(e) => setWaveF(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
              {waveTarget !== 'wavelength' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Wavelength (meters, m)
                  </label>
                  <input
                    type="number"
                    value={waveL}
                    onChange={(e) => setWaveL(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                  />
                </div>
              )}
            </div>

            {renderScienceCard(waveResult)}
          </div>
        )}

        {/* 6. Quadratic Equation */}
        {activeSubTool === 'quadratic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Quadratic Equation Solver ($ax^2 + bx + c = 0$)
              </h3>
              <p className="text-xs text-neutral-500">
                Solves real and complex roots using the quadratic formula with discriminant analysis and vertex computation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Coefficient a (x²)
                </label>
                <input
                  type="number"
                  value={quadA}
                  onChange={(e) => setQuadA(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Coefficient b (x)
                </label>
                <input
                  type="number"
                  value={quadB}
                  onChange={(e) => setQuadB(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Constant c
                </label>
                <input
                  type="number"
                  value={quadC}
                  onChange={(e) => setQuadC(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                />
              </div>
            </div>

            {quadResult.isValid ? (
              <div className="space-y-4">
                <div className="p-5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
                  <div className="text-xs text-neutral-500 font-medium">Roots & Nature of Solutions:</div>
                  <div className="text-2xl font-mono font-bold text-neutral-900 dark:text-neutral-50 mt-1">
                    {quadResult.roots.r2 ? (
                      <span>x₁ = {quadResult.roots.r1}, x₂ = {quadResult.roots.r2}</span>
                    ) : (
                      <span>x = {quadResult.roots.r1}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-mono mt-2 tabular-nums">
                    <span>Discriminant Δ = {quadResult.discriminant}</span>
                    <span>·</span>
                    <span>Vertex = {quadResult.vertex.formatted}</span>
                    <span>·</span>
                    <span>Axis of symmetry: {quadResult.axisOfSymmetry}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-2">
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Step-by-Step Algebraic Proof:
                  </div>
                  {quadResult.steps.map((st, i) => (
                    <div key={i} className="font-mono text-[11px] leading-relaxed">
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 text-xs text-rose-700">
                {quadResult.errorMessage}
              </div>
            )}
          </div>
        )}

        {/* 7. 2D Coordinate Geometry */}
        {activeSubTool === 'geometry' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                2D Geometry: Slope, Distance, Midpoint & Line Equation
              </h3>
              <p className="text-xs text-neutral-500">
                Calculates Euclidean distance, linear slope, midpoint, and slope-intercept form between two Cartesian points.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Point 1: x₁
                </label>
                <input
                  type="number"
                  value={geoX1}
                  onChange={(e) => setGeoX1(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Point 1: y₁
                </label>
                <input
                  type="number"
                  value={geoY1}
                  onChange={(e) => setGeoY1(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Point 2: x₂
                </label>
                <input
                  type="number"
                  value={geoX2}
                  onChange={(e) => setGeoX2(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Point 2: y₂
                </label>
                <input
                  type="number"
                  value={geoY2}
                  onChange={(e) => setGeoY2(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm font-mono"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-neutral-500">Euclidean Distance</div>
                    <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
                      {geoResult.distance.toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Slope (m) & Angle</div>
                    <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
                      {typeof geoResult.slope === 'number' ? geoResult.slope.toFixed(4) : geoResult.slope}{' '}
                      <span className="text-xs font-normal text-neutral-500">({geoResult.angleDegrees.toFixed(1)}°)</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Line Equation</div>
                    <div className="text-xl font-bold font-mono text-neutral-900 dark:text-neutral-50 tabular-nums mt-1">
                      {geoResult.lineEquation}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                  Midpoint: {geoResult.midpoint.formatted}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Derivation Steps:
                </div>
                {geoResult.steps.map((st, i) => (
                  <div key={i} className="font-mono text-[11px]">
                    {st}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
