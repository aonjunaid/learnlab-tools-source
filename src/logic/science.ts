/**
 * Scientific problem solving algorithms.
 * Each solver validates inputs, documents the equation, substitutions, and assumptions.
 */

export interface ScienceResult {
  targetVariable: string;
  value: number;
  unit: string;
  formattedValue: string;
  equation: string;
  substitutions: string[];
  assumptions: string[];
  isValid: boolean;
  errorMessage?: string;
}

// 1. Speed / Distance / Time (v = d / t)
export function solveSpeedDistanceTime(
  target: 'speed' | 'distance' | 'time',
  params: { speed?: number; distance?: number; time?: number }
): ScienceResult {
  const { speed, distance, time } = params;

  if (target === 'speed') {
    if (distance === undefined || time === undefined) {
      return { targetVariable: 'Speed (v)', value: 0, unit: 'm/s', formattedValue: '—', equation: 'v = d / t', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide distance and time.' };
    }
    if (time <= 0) {
      return { targetVariable: 'Speed (v)', value: 0, unit: 'm/s', formattedValue: 'Undefined', equation: 'v = d / t', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Time must be strictly positive (greater than 0).' };
    }
    const val = distance / time;
    return {
      targetVariable: 'Speed (v)',
      value: val,
      unit: 'm/s',
      formattedValue: `${val.toFixed(4)} m/s (${(val * 3.6).toFixed(4)} km/h)`,
      equation: 'v = d / t',
      substitutions: [`v = ${distance} m / ${time} s = ${val.toFixed(4)} m/s`],
      assumptions: ['Constant uniform speed', 'Straight-line motion with zero acceleration'],
      isValid: true,
    };
  }

  if (target === 'distance') {
    if (speed === undefined || time === undefined) {
      return { targetVariable: 'Distance (d)', value: 0, unit: 'm', formattedValue: '—', equation: 'd = v × t', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide speed and time.' };
    }
    if (time < 0) {
      return { targetVariable: 'Distance (d)', value: 0, unit: 'm', formattedValue: 'Invalid', equation: 'd = v × t', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Time cannot be negative.' };
    }
    const val = speed * time;
    return {
      targetVariable: 'Distance (d)',
      value: val,
      unit: 'm',
      formattedValue: `${val.toFixed(4)} m (${(val / 1000).toFixed(4)} km)`,
      equation: 'd = v × t',
      substitutions: [`d = ${speed} m/s × ${time} s = ${val.toFixed(4)} m`],
      assumptions: ['Constant uniform velocity', 'Elapsed time is non-negative'],
      isValid: true,
    };
  }

  // target === 'time'
  if (distance === undefined || speed === undefined) {
    return { targetVariable: 'Time (t)', value: 0, unit: 's', formattedValue: '—', equation: 't = d / v', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide distance and speed.' };
  }
  if (speed <= 0) {
    return { targetVariable: 'Time (t)', value: 0, unit: 's', formattedValue: 'Undefined', equation: 't = d / v', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Speed must be strictly greater than 0.' };
  }
  const val = distance / speed;
  return {
    targetVariable: 'Time (t)',
    value: val,
    unit: 's',
    formattedValue: `${val.toFixed(4)} seconds (${(val / 60).toFixed(2)} min)`,
    equation: 't = d / v',
    substitutions: [`t = ${distance} m / ${speed} m/s = ${val.toFixed(4)} s`],
    assumptions: ['Non-zero positive velocity', 'Uniform motion trajectory'],
    isValid: true,
  };
}

// 2. Newton's Second Law (F = m * a)
export function solveNewtonsSecondLaw(
  target: 'force' | 'mass' | 'acceleration',
  params: { force?: number; mass?: number; acceleration?: number }
): ScienceResult {
  const { force, mass, acceleration } = params;

  if (target === 'force') {
    if (mass === undefined || acceleration === undefined) {
      return { targetVariable: 'Net Force (F)', value: 0, unit: 'N', formattedValue: '—', equation: 'F = m · a', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide mass and acceleration.' };
    }
    if (mass <= 0) {
      return { targetVariable: 'Net Force (F)', value: 0, unit: 'N', formattedValue: 'Invalid', equation: 'F = m · a', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Mass must be strictly positive.' };
    }
    const val = mass * acceleration;
    return {
      targetVariable: 'Net Force (F)',
      value: val,
      unit: 'N',
      formattedValue: `${val.toFixed(4)} N (kg·m/s²)`,
      equation: 'F = m · a',
      substitutions: [`F = ${mass} kg × ${acceleration} m/s² = ${val.toFixed(4)} N`],
      assumptions: ['Classical Newtonian mechanics (v ≪ c)', 'Constant mass system', 'Net external resultant force'],
      isValid: true,
    };
  }

  if (target === 'mass') {
    if (force === undefined || acceleration === undefined) {
      return { targetVariable: 'Inertial Mass (m)', value: 0, unit: 'kg', formattedValue: '—', equation: 'm = F / a', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide force and acceleration.' };
    }
    if (acceleration === 0) {
      return { targetVariable: 'Inertial Mass (m)', value: 0, unit: 'kg', formattedValue: 'Undefined', equation: 'm = F / a', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Acceleration cannot be zero for mass calculation.' };
    }
    const val = force / acceleration;
    if (val < 0) {
      return { targetVariable: 'Inertial Mass (m)', value: 0, unit: 'kg', formattedValue: 'Invalid', equation: 'm = F / a', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Resulting mass cannot be negative. Check force and acceleration vector signs.' };
    }
    return {
      targetVariable: 'Inertial Mass (m)',
      value: val,
      unit: 'kg',
      formattedValue: `${val.toFixed(4)} kg (${(val * 1000).toFixed(1)} g)`,
      equation: 'm = F / a',
      substitutions: [`m = ${force} N / ${acceleration} m/s² = ${val.toFixed(4)} kg`],
      assumptions: ['Non-zero acceleration', 'Inertial frame of reference'],
      isValid: true,
    };
  }

  // target === 'acceleration'
  if (force === undefined || mass === undefined) {
    return { targetVariable: 'Acceleration (a)', value: 0, unit: 'm/s²', formattedValue: '—', equation: 'a = F / m', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide force and mass.' };
  }
  if (mass <= 0) {
    return { targetVariable: 'Acceleration (a)', value: 0, unit: 'm/s²', formattedValue: 'Undefined', equation: 'a = F / m', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Mass must be strictly positive (m > 0).' };
  }
  const val = force / mass;
  return {
    targetVariable: 'Acceleration (a)',
    value: val,
    unit: 'm/s²',
    formattedValue: `${val.toFixed(4)} m/s²`,
    equation: 'a = F / m',
    substitutions: [`a = ${force} N / ${mass} kg = ${val.toFixed(4)} m/s²`],
    assumptions: ['Constant mass', 'Uniform acceleration throughout the interval'],
    isValid: true,
  };
}

// 3. Ohm's Law & Electric Power (V = I * R, P = V * I)
export function solveOhmsLaw(
  target: 'voltage' | 'current' | 'resistance' | 'power',
  params: { voltage?: number; current?: number; resistance?: number; power?: number }
): ScienceResult {
  const { voltage, current, resistance } = params;

  if (target === 'voltage') {
    if (current === undefined || resistance === undefined) {
      return { targetVariable: 'Voltage (V)', value: 0, unit: 'V', formattedValue: '—', equation: 'V = I · R', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide current (I) and resistance (R).' };
    }
    const val = current * resistance;
    const pwr = val * current;
    return {
      targetVariable: 'Voltage (V)',
      value: val,
      unit: 'V',
      formattedValue: `${val.toFixed(4)} Volts (Power: ${pwr.toFixed(4)} W)`,
      equation: 'V = I · R',
      substitutions: [`V = ${current} A × ${resistance} Ω = ${val.toFixed(4)} V`],
      assumptions: ['Linear Ohmic conductor', 'Constant temperature and material resistance'],
      isValid: true,
    };
  }

  if (target === 'current') {
    if (voltage === undefined || resistance === undefined) {
      return { targetVariable: 'Current (I)', value: 0, unit: 'A', formattedValue: '—', equation: 'I = V / R', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide voltage (V) and resistance (R).' };
    }
    if (resistance <= 0) {
      return { targetVariable: 'Current (I)', value: 0, unit: 'A', formattedValue: 'Undefined', equation: 'I = V / R', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Resistance must be greater than zero to prevent ideal short circuit.' };
    }
    const val = voltage / resistance;
    const pwr = voltage * val;
    return {
      targetVariable: 'Current (I)',
      value: val,
      unit: 'A',
      formattedValue: `${val.toFixed(4)} Amperes (${(val * 1000).toFixed(2)} mA, Power: ${pwr.toFixed(4)} W)`,
      equation: 'I = V / R',
      substitutions: [`I = ${voltage} V / ${resistance} Ω = ${val.toFixed(4)} A`],
      assumptions: ['Ohmic circuit behavior', 'Direct current (DC) steady state'],
      isValid: true,
    };
  }

  if (target === 'resistance') {
    if (voltage === undefined || current === undefined) {
      return { targetVariable: 'Resistance (R)', value: 0, unit: 'Ω', formattedValue: '—', equation: 'R = V / I', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide voltage (V) and current (I).' };
    }
    if (current === 0) {
      return { targetVariable: 'Resistance (R)', value: 0, unit: 'Ω', formattedValue: 'Infinite (Open circuit)', equation: 'R = V / I', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Current is zero; represents an open circuit (infinite resistance).' };
    }
    const val = voltage / current;
    return {
      targetVariable: 'Resistance (R)',
      value: val,
      unit: 'Ω',
      formattedValue: `${val.toFixed(4)} Ohms (Ω)`,
      equation: 'R = V / I',
      substitutions: [`R = ${voltage} V / ${current} A = ${val.toFixed(4)} Ω`],
      assumptions: ['Steady DC conditions', 'Linear conductor properties'],
      isValid: true,
    };
  }

  // target === 'power'
  if (voltage !== undefined && current !== undefined) {
    const val = voltage * current;
    return {
      targetVariable: 'Power (P)',
      value: val,
      unit: 'W',
      formattedValue: `${val.toFixed(4)} Watts`,
      equation: 'P = V · I',
      substitutions: [`P = ${voltage} V × ${current} A = ${val.toFixed(4)} W`],
      assumptions: ['Direct current resistive circuit', 'Zero reactance'],
      isValid: true,
    };
  } else if (current !== undefined && resistance !== undefined) {
    const val = current * current * resistance;
    return {
      targetVariable: 'Power (P)',
      value: val,
      unit: 'W',
      formattedValue: `${val.toFixed(4)} Watts`,
      equation: 'P = I² · R',
      substitutions: [`P = (${current} A)² × ${resistance} Ω = ${val.toFixed(4)} W`],
      assumptions: ['Joule heating in resistive load'],
      isValid: true,
    };
  } else if (voltage !== undefined && resistance !== undefined && resistance > 0) {
    const val = (voltage * voltage) / resistance;
    return {
      targetVariable: 'Power (P)',
      value: val,
      unit: 'W',
      formattedValue: `${val.toFixed(4)} Watts`,
      equation: 'P = V² / R',
      substitutions: [`P = (${voltage} V)² / ${resistance} Ω = ${val.toFixed(4)} W`],
      assumptions: ['Resistive power dissipation'],
      isValid: true,
    };
  }

  return { targetVariable: 'Power (P)', value: 0, unit: 'W', formattedValue: '—', equation: 'P = V · I', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide at least two known electrical quantities.' };
}

// 4. Density Calculator (ρ = m / V)
export function solveDensity(
  target: 'density' | 'mass' | 'volume',
  params: { density?: number; mass?: number; volume?: number }
): ScienceResult {
  const { density, mass, volume } = params;

  if (target === 'density') {
    if (mass === undefined || volume === undefined) {
      return { targetVariable: 'Density (ρ)', value: 0, unit: 'kg/m³', formattedValue: '—', equation: 'ρ = m / V', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide mass and volume.' };
    }
    if (volume <= 0) {
      return { targetVariable: 'Density (ρ)', value: 0, unit: 'kg/m³', formattedValue: 'Undefined', equation: 'ρ = m / V', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Volume must be strictly positive (V > 0).' };
    }
    if (mass < 0) {
      return { targetVariable: 'Density (ρ)', value: 0, unit: 'kg/m³', formattedValue: 'Invalid', equation: 'ρ = m / V', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Mass cannot be negative.' };
    }
    const val = mass / volume;
    return {
      targetVariable: 'Density (ρ)',
      value: val,
      unit: 'kg/m³',
      formattedValue: `${val.toFixed(4)} kg/m³ (${(val / 1000).toFixed(4)} g/cm³)`,
      equation: 'ρ = m / V',
      substitutions: [`ρ = ${mass} kg / ${volume} m³ = ${val.toFixed(4)} kg/m³`],
      assumptions: ['Homogeneous material composition', 'Uniform density distribution without voids'],
      isValid: true,
    };
  }

  if (target === 'mass') {
    if (density === undefined || volume === undefined) {
      return { targetVariable: 'Mass (m)', value: 0, unit: 'kg', formattedValue: '—', equation: 'm = ρ · V', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide density and volume.' };
    }
    if (density < 0 || volume < 0) {
      return { targetVariable: 'Mass (m)', value: 0, unit: 'kg', formattedValue: 'Invalid', equation: 'm = ρ · V', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Density and volume cannot be negative.' };
    }
    const val = density * volume;
    return {
      targetVariable: 'Mass (m)',
      value: val,
      unit: 'kg',
      formattedValue: `${val.toFixed(4)} kg (${(val * 1000).toFixed(2)} g)`,
      equation: 'm = ρ · V',
      substitutions: [`m = ${density} kg/m³ × ${volume} m³ = ${val.toFixed(4)} kg`],
      assumptions: ['Constant volumetric density'],
      isValid: true,
    };
  }

  // target === 'volume'
  if (mass === undefined || density === undefined) {
    return { targetVariable: 'Volume (V)', value: 0, unit: 'm³', formattedValue: '—', equation: 'V = m / ρ', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide mass and density.' };
  }
  if (density <= 0) {
    return { targetVariable: 'Volume (V)', value: 0, unit: 'm³', formattedValue: 'Undefined', equation: 'V = m / ρ', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Density must be strictly positive.' };
  }
  const val = mass / density;
  return {
    targetVariable: 'Volume (V)',
    value: val,
    unit: 'm³',
    formattedValue: `${val.toFixed(6)} m³ (${(val * 1000).toFixed(3)} Liters)`,
    equation: 'V = m / ρ',
    substitutions: [`V = ${mass} kg / ${density} kg/m³ = ${val.toFixed(6)} m³`],
    assumptions: ['Incompressible fluid or solid state'],
    isValid: true,
  };
}

// 5. Wave Relation (v = f * λ)
export function solveWaveRelation(
  target: 'speed' | 'frequency' | 'wavelength',
  params: { speed?: number; frequency?: number; wavelength?: number }
): ScienceResult {
  const { speed, frequency, wavelength } = params;

  if (target === 'speed') {
    if (frequency === undefined || wavelength === undefined) {
      return { targetVariable: 'Wave Speed (v)', value: 0, unit: 'm/s', formattedValue: '—', equation: 'v = f · λ', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide frequency (f) and wavelength (λ).' };
    }
    if (frequency <= 0 || wavelength <= 0) {
      return { targetVariable: 'Wave Speed (v)', value: 0, unit: 'm/s', formattedValue: 'Invalid', equation: 'v = f · λ', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Frequency and wavelength must be strictly positive.' };
    }
    const val = frequency * wavelength;
    return {
      targetVariable: 'Wave Speed (v)',
      value: val,
      unit: 'm/s',
      formattedValue: `${val.toFixed(4)} m/s`,
      equation: 'v = f · λ',
      substitutions: [`v = ${frequency} Hz × ${wavelength} m = ${val.toFixed(4)} m/s`],
      assumptions: ['Linear medium propagation', 'Harmonic sinusoidal wave in non-dispersive medium'],
      isValid: true,
    };
  }

  if (target === 'frequency') {
    if (speed === undefined || wavelength === undefined) {
      return { targetVariable: 'Frequency (f)', value: 0, unit: 'Hz', formattedValue: '—', equation: 'f = v / λ', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide wave speed (v) and wavelength (λ).' };
    }
    if (wavelength <= 0) {
      return { targetVariable: 'Frequency (f)', value: 0, unit: 'Hz', formattedValue: 'Undefined', equation: 'f = v / λ', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Wavelength must be strictly greater than 0.' };
    }
    const val = speed / wavelength;
    return {
      targetVariable: 'Frequency (f)',
      value: val,
      unit: 'Hz',
      formattedValue: `${val.toFixed(4)} Hz (${val >= 1000 ? (val / 1000).toFixed(3) + ' kHz' : ''})`,
      equation: 'f = v / λ',
      substitutions: [`f = ${speed} m/s / ${wavelength} m = ${val.toFixed(4)} Hz`],
      assumptions: ['Constant phase velocity'],
      isValid: true,
    };
  }

  // target === 'wavelength'
  if (speed === undefined || frequency === undefined) {
    return { targetVariable: 'Wavelength (λ)', value: 0, unit: 'm', formattedValue: '—', equation: 'λ = v / f', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Provide wave speed (v) and frequency (f).' };
  }
  if (frequency <= 0) {
    return { targetVariable: 'Wavelength (λ)', value: 0, unit: 'm', formattedValue: 'Undefined', equation: 'λ = v / f', substitutions: [], assumptions: [], isValid: false, errorMessage: 'Frequency must be strictly greater than 0.' };
  }
  const val = speed / frequency;
  return {
    targetVariable: 'Wavelength (λ)',
    value: val,
    unit: 'm',
    formattedValue: `${val.toFixed(4)} m (${(val * 100).toFixed(2)} cm)`,
    equation: 'λ = v / f',
    substitutions: [`λ = ${speed} m/s / ${frequency} Hz = ${val.toFixed(4)} m`],
    assumptions: ['Uniform wave speed'],
    isValid: true,
  };
}

// 6. Quadratic Equation Solver (ax² + bx + c = 0)
export interface QuadraticResult {
  a: number;
  b: number;
  c: number;
  discriminant: number;
  rootType: 'two-distinct-real' | 'one-repeated-real' | 'two-complex-conjugates' | 'linear' | 'degenerate';
  roots: {
    r1: string;
    r2?: string;
  };
  vertex: {
    h: number;
    k: number;
    formatted: string;
  };
  axisOfSymmetry: string;
  steps: string[];
  isValid: boolean;
  errorMessage?: string;
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    return {
      a: 0, b: 0, c: 0, discriminant: 0, rootType: 'degenerate',
      roots: { r1: '—' }, vertex: { h: 0, k: 0, formatted: '—' },
      axisOfSymmetry: '—', steps: [], isValid: false, errorMessage: 'Please enter valid numerical coefficients a, b, and c.'
    };
  }

  if (a === 0) {
    if (b === 0) {
      return {
        a: 0, b: 0, c, discriminant: 0, rootType: 'degenerate',
        roots: { r1: c === 0 ? 'Infinitely many solutions (identity 0 = 0)' : 'No solution (contradiction)' },
        vertex: { h: 0, k: 0, formatted: 'None (constant)' },
        axisOfSymmetry: 'None',
        steps: ['When a = 0 and b = 0, the equation reduces to the constant statement ' + c + ' = 0.'],
        isValid: false,
        errorMessage: 'When a = 0 and b = 0, this is not a solvable equation.'
      };
    }
    const linearRoot = -c / b;
    return {
      a: 0, b, c, discriminant: 0, rootType: 'linear',
      roots: { r1: String(Number(linearRoot.toFixed(6))) },
      vertex: { h: 0, k: 0, formatted: 'None (linear equation)' },
      axisOfSymmetry: 'None',
      steps: [
        'Coefficient a = 0, so this is a linear equation: ' + b + 'x + ' + c + ' = 0',
        b + 'x = ' + -c,
        'x = ' + -c + ' / ' + b + ' = ' + linearRoot.toFixed(6)
      ],
      isValid: true
    };
  }

  const discriminant = b * b - 4 * a * c;
  const h = -b / (2 * a);
  const k = a * h * h + b * h + c;
  const vertexFormatted = `(${h.toFixed(4)}, ${k.toFixed(4)})`;
  const axis = `x = ${h.toFixed(4)}`;

  const steps: string[] = [
    `1. Identify coefficients: a = ${a}, b = ${b}, c = ${c}`,
    `2. Compute discriminant Δ = b² - 4ac = (${b})² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${discriminant}`,
  ];

  if (discriminant > 0) {
    const sqrtDisc = Math.sqrt(discriminant);
    const r1 = (-b + sqrtDisc) / (2 * a);
    const r2 = (-b - sqrtDisc) / (2 * a);
    steps.push(`3. Since Δ > 0, there are two distinct real roots:`);
    steps.push(`   x₁ = (-b + √Δ) / (2a) = (${-b} + ${sqrtDisc.toFixed(4)}) / ${2 * a} = ${r1.toFixed(6)}`);
    steps.push(`   x₂ = (-b - √Δ) / (2a) = (${-b} - ${sqrtDisc.toFixed(4)}) / ${2 * a} = ${r2.toFixed(6)}`);
    steps.push(`4. Vertex is at (${h.toFixed(4)}, ${k.toFixed(4)}), opening ${a > 0 ? 'upwards' : 'downwards'}.`);

    return {
      a, b, c, discriminant, rootType: 'two-distinct-real',
      roots: { r1: String(Number(r1.toFixed(6))), r2: String(Number(r2.toFixed(6))) },
      vertex: { h, k, formatted: vertexFormatted },
      axisOfSymmetry: axis,
      steps,
      isValid: true,
    };
  } else if (discriminant === 0) {
    const r1 = -b / (2 * a);
    steps.push(`3. Since Δ = 0, there is one repeated real root:`);
    steps.push(`   x = -b / (2a) = ${-b} / ${2 * a} = ${r1.toFixed(6)}`);
    steps.push(`4. Vertex touches the x-axis at (${h.toFixed(4)}, 0).`);

    return {
      a, b, c, discriminant, rootType: 'one-repeated-real',
      roots: { r1: String(Number(r1.toFixed(6))) },
      vertex: { h, k, formatted: vertexFormatted },
      axisOfSymmetry: axis,
      steps,
      isValid: true,
    };
  } else {
    // Complex roots
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-discriminant) / (2 * Math.abs(a));
    const r1 = `${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`;
    const r2 = `${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;

    steps.push(`3. Since Δ < 0, there are two complex conjugate roots:`);
    steps.push(`   x₁,₂ = (-b ± i√|Δ|) / (2a) = (${-b} ± i√${Math.abs(discriminant)}) / ${2 * a}`);
    steps.push(`   x₁ = ${r1}`);
    steps.push(`   x₂ = ${r2}`);
    steps.push(`4. The parabola does not intersect the real x-axis.`);

    return {
      a, b, c, discriminant, rootType: 'two-complex-conjugates',
      roots: { r1, r2 },
      vertex: { h, k, formatted: vertexFormatted },
      axisOfSymmetry: axis,
      steps,
      isValid: true,
    };
  }
}

// 7. 2D Coordinate Geometry (Slope, Distance, Midpoint, Line Equation)
export interface SlopeDistanceResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  slope: number | 'undefined';
  distance: number;
  midpoint: { x: number; y: number; formatted: string };
  angleDegrees: number;
  lineEquation: string;
  steps: string[];
  isValid: boolean;
}

export function solveSlopeDistance(x1: number, y1: number, x2: number, y2: number): SlopeDistanceResult {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const midpoint = { x: midX, y: midY, formatted: `(${midX.toFixed(4)}, ${midY.toFixed(4)})` };

  const steps: string[] = [
    `1. Points: P₁(${x1}, ${y1}) and P₂(${x2}, ${y2})`,
    `2. Δx = x₂ - x₁ = ${x2} - ${x1} = ${dx}`,
    `3. Δy = y₂ - y₁ = ${y2} - ${y1} = ${dy}`,
    `4. Distance d = √(Δx² + Δy²) = √(${dx}² + ${dy}²) = √(${dx * dx + dy * dy}) = ${distance.toFixed(6)}`,
    `5. Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2) = (${midX.toFixed(4)}, ${midY.toFixed(4)})`
  ];

  if (dx === 0) {
    steps.push(`6. Slope m = Δy / Δx = ${dy} / 0 = undefined (vertical line)`);
    steps.push(`7. Line equation: x = ${x1}`);
    return {
      x1, y1, x2, y2,
      slope: 'undefined',
      distance,
      midpoint,
      angleDegrees: dy >= 0 ? 90 : -90,
      lineEquation: `x = ${x1}`,
      steps,
      isValid: true,
    };
  }

  const slope = dy / dx;
  const angleRad = Math.atan2(dy, dx);
  const angleDeg = (angleRad * 180) / Math.PI;

  // y - y1 = m(x - x1) -> y = mx - m*x1 + y1 -> y = mx + b
  const b = y1 - slope * x1;
  const lineEquation =
    b === 0
      ? `y = ${slope.toFixed(4)}x`
      : b > 0
      ? `y = ${slope.toFixed(4)}x + ${b.toFixed(4)}`
      : `y = ${slope.toFixed(4)}x - ${Math.abs(b).toFixed(4)}`;

  steps.push(`6. Slope m = Δy / Δx = ${dy} / ${dx} = ${slope.toFixed(6)}`);
  steps.push(`7. Inclination angle θ = arctan(m) = ${angleDeg.toFixed(2)}°`);
  steps.push(`8. y-intercept b = y₁ - m·x₁ = ${y1} - (${slope.toFixed(4)})(${x1}) = ${b.toFixed(4)}`);
  steps.push(`9. Standard slope-intercept equation: ${lineEquation}`);

  return {
    x1, y1, x2, y2,
    slope,
    distance,
    midpoint,
    angleDegrees: angleDeg,
    lineEquation,
    steps,
    isValid: true,
  };
}
