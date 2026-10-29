import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  AlertTriangle,
  Flame,
  Wind,
  Activity,
  Maximize2,
  Sliders,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { calculateOptics } from '../../logic/optics';
import { saveExperiment } from '../../logic/workspace-store';

type ConceptId =
  | 'projectile'
  | 'pendulum'
  | 'arrhenius'
  | 'realgas'
  | 'calorimetry'
  | 'optics';

interface ConceptDefinition {
  id: ConceptId;
  name: string;
  field: 'Physics' | 'Chemistry';
  tagline: string;
  equationLatex: string;
  equationDescription: string;
  defaultScenario: string;
  presetScenarios: { label: string; scenario: string; values: Record<string, number> }[];
  variables: {
    key: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    description: string;
  }[];
  assumptions: string[];
  limitations: string[];
}

const CONCEPTS: ConceptDefinition[] = [
  // 1. Projectile Motion
  {
    id: 'projectile',
    name: 'Projectile Motion & Ballistics',
    field: 'Physics',
    tagline: '2D kinematics under constant gravitational acceleration',
    equationLatex: 'y(x) = h₀ + x·tan(θ) - [g·x²] / [2·v₀²·cos²(θ)]',
    equationDescription: 'Predicts the parabolic trajectory, maximum flight height, and ground range of a launched object under uniform gravity.',
    defaultScenario: 'Kicking a soccer ball from the grass towards a goal on an outdoor pitch.',
    presetScenarios: [
      {
        label: 'Soccer Ball Kick',
        scenario: 'A forward kicks a regulation soccer ball from the ground at 22 m/s and 35°.',
        values: { v0: 22, angle: 35, h0: 0, g: 9.81 },
      },
      {
        label: 'Artillery Shell',
        scenario: 'A military cannon launches a heavy projectile at 150 m/s at a 45° angle from a 20 m cliff.',
        values: { v0: 150, angle: 45, h0: 20, g: 9.81 },
      },
      {
        label: 'Lunar Golf Shot',
        scenario: 'An astronaut hits a golf ball on the Moon with 1/6th Earth gravity and zero atmosphere.',
        values: { v0: 30, angle: 40, h0: 0, g: 1.62 },
      },
    ],
    variables: [
      { key: 'v0', label: 'Initial Velocity (v₀)', unit: 'm/s', min: 1, max: 200, step: 1, defaultValue: 25, description: 'Speed of projectile at launch' },
      { key: 'angle', label: 'Launch Angle (θ)', unit: '°', min: 1, max: 89, step: 1, defaultValue: 45, description: 'Angle of elevation above horizontal ground' },
      { key: 'h0', label: 'Initial Height (h₀)', unit: 'm', min: 0, max: 100, step: 1, defaultValue: 0, description: 'Elevation of launch point above ground level' },
      { key: 'g', label: 'Gravitational Field (g)', unit: 'm/s²', min: 1, max: 25, step: 0.1, defaultValue: 9.81, description: 'Downward gravitational acceleration' },
    ],
    assumptions: [
      'Uniform downward gravitational acceleration (g is strictly constant over trajectory).',
      'Flat, non-rotating Earth surface (Coriolis effect and curvature are ignored).',
      'The projectile is treated as an ideal zero-volume point mass.',
      'Complete absence of atmospheric medium (pure vacuum: zero air resistance drag, zero crosswind, zero buoyant lift).',
    ],
    limitations: [
      'Air Drag (Aerodynamic Drag): Real objects experience quadratic air resistance F_drag = 0.5·ρ·v²·C_d·A, which compresses the descending trajectory, steepens landing angle, and cuts practical range by 20% to 50%.',
      'Magnus Effect (Spin): Ball rotation produces aerodynamic lift or curve, deviating from a planar 2D parabola.',
      'Atmospheric Density Variations: High-altitude shells pass through thinner air, invalidating constant air properties.',
    ],
  },

  // 2. Simple Pendulum
  {
    id: 'pendulum',
    name: 'Simple Pendulum & Harmonic Motion',
    field: 'Physics',
    tagline: 'Periodic oscillation under gravitational restoring force',
    equationLatex: 'T = 2π·√(L / g)    and    θ(t) = θ₀·cos(ω·t)',
    equationDescription: 'Calculates the period and angular position of a suspended swinging mass under small-angle harmonic motion.',
    defaultScenario: 'A grandfather clock brass pendulum swinging inside a living room.',
    presetScenarios: [
      {
        label: 'Grandfather Clock',
        scenario: 'A 0.994 meter pendulum designed to have an exact 2-second round-trip period.',
        values: { L: 0.994, theta0: 8, g: 9.81, mass: 1.5 },
      },
      {
        label: 'Playground Swing',
        scenario: 'A child swings on a 2.5 meter chain swing with a large 35° initial displacement.',
        values: { L: 2.5, theta0: 35, g: 9.81, mass: 25 },
      },
      {
        label: 'Foucault Lab Pendulum',
        scenario: 'A tall university science museum pendulum suspended from an 18-meter ceiling.',
        values: { L: 18.0, theta0: 5, g: 9.81, mass: 28 },
      },
    ],
    variables: [
      { key: 'L', label: 'Rod / String Length (L)', unit: 'm', min: 0.1, max: 25, step: 0.1, defaultValue: 1.0, description: 'Distance from pivot axis to center of mass of bob' },
      { key: 'theta0', label: 'Initial Release Angle (θ₀)', unit: '°', min: 1, max: 75, step: 1, defaultValue: 15, description: 'Angular displacement at release' },
      { key: 'g', label: 'Local Gravity (g)', unit: 'm/s²', min: 1, max: 25, step: 0.1, defaultValue: 9.81, description: 'Acceleration due to gravity' },
      { key: 'mass', label: 'Bob Mass (m)', unit: 'kg', min: 0.1, max: 50, step: 0.5, defaultValue: 1.0, description: 'Mass of the suspended bob' },
    ],
    assumptions: [
      'Small-angle approximation holds (sin(θ) ≈ θ in radians, valid strictly for angles < 15°).',
      'String or rod is completely massless, inextensible, and frictionless at the pivot.',
      'No damping forces (zero air drag, zero pivot bearing friction).',
      'The bob behaves as an infinitely small point mass concentrated at the rope end.',
    ],
    limitations: [
      'Large Angle Error: For angles θ₀ > 15°, the period is actually longer: T ≈ 2π√(L/g) · (1 + 1/16·θ₀² + ...). At 45°, period is ~3.7% slower than the model.',
      'Air Friction & Damping: Real pendulums exhibit exponential decay θ(t) = θ₀·e^(-γt)·cos(ωt) and will inevitably halt without an escapement spring.',
      'Physical Pendulum Inertia: Real rods have distributed mass; rotational moment of inertia I ≠ m·L².',
    ],
  },

  // 3. Arrhenius Kinetics
  {
    id: 'arrhenius',
    name: 'Chemical Kinetics & Arrhenius Equation',
    field: 'Chemistry',
    tagline: 'Temperature dependence of chemical reaction rate constants',
    equationLatex: 'k = A·exp(-Ea / [R·T])    and    t₁/₂ = ln(2) / k',
    equationDescription: 'Models how thermal kinetic energy enables reactant molecules to overcome the activation energy barrier Ea to form products.',
    defaultScenario: 'Decomposition of hydrogen peroxide catalyzed in an aqueous flask.',
    presetScenarios: [
      {
        label: 'Aqueous Peroxide Decomposition',
        scenario: 'Decomposition of H₂O₂ catalyzed by enzyme catalase (Ea = 30 kJ/mol).',
        values: { Ea: 30, tempC: 25, A: 1000000 },
      },
      {
        label: 'Industrial Haber Process',
        scenario: 'Ammonia synthesis from N₂ and H₂ with iron catalyst operating at 450°C (Ea = 95 kJ/mol).',
        values: { Ea: 95, tempC: 450, A: 50000000 },
      },
      {
        label: 'Food Spoilage (Refrigerated vs Room)',
        scenario: 'Bacterial milk souring reaction (Ea = 75 kJ/mol) comparing fridge (4°C) to counter (25°C).',
        values: { Ea: 75, tempC: 4, A: 2500000 },
      },
    ],
    variables: [
      { key: 'Ea', label: 'Activation Energy (Ea)', unit: 'kJ/mol', min: 5, max: 250, step: 1, defaultValue: 50, description: 'Minimum energy barrier to reach transition state complex' },
      { key: 'tempC', label: 'Temperature (T)', unit: '°C', min: -50, max: 800, step: 5, defaultValue: 25, description: 'Reaction mixture temperature' },
      { key: 'A', label: 'Pre-exponential Frequency (A)', unit: 's⁻¹', min: 1000, max: 100000000, step: 10000, defaultValue: 1000000, description: 'Collision frequency and steric orientation factor' },
    ],
    assumptions: [
      'Activation energy Ea and frequency factor A remain constant across all temperature ranges.',
      'Reaction follows simple single-step collision theory with Maxwell-Boltzmann energy distribution.',
      'Reactant concentrations do not alter the intrinsic reaction pathway.',
      'No quantum mechanical tunneling of light particles (such as H⁺ protons).',
    ],
    limitations: [
      'Multi-step Mechanisms: Real complex reactions consist of multiple elementary steps with different rate-determining steps at different temperatures.',
      'Steric & Orientation Limits: Pre-exponential factor A is temperature-dependent in Transition State Theory (A ∝ T or T²).',
      'Solvent Cage Effects: In liquid solutions, diffusion limits prevent molecules from colliding freely as they would in gas phase.',
    ],
  },

  // 4. Real vs Ideal Gas
  {
    id: 'realgas',
    name: 'Real vs. Ideal Gas (Van der Waals Equation)',
    field: 'Chemistry',
    tagline: 'Molecular volume and intermolecular attraction corrections',
    equationLatex: '[P + a·(n/V)²] · [V - n·b] = n·R·T',
    equationDescription: 'Contrasts ideal point-particle behavior against real gas intermolecular attractions (parameter a) and finite molecular excluded volume (parameter b).',
    defaultScenario: 'Pressurized carbon dioxide gas stored inside an industrial scuba cylinder.',
    presetScenarios: [
      {
        label: 'CO₂ Scuba Cylinder',
        scenario: 'Carbon dioxide gas compressed to 50 atm inside a 10 L tank at 25°C.',
        values: { n: 20, V: 10, tempC: 25, a: 3.59, b: 0.0427 },
      },
      {
        label: 'Cryogenic Nitrogen (77K)',
        scenario: 'Nitrogen gas cooled near liquefaction where intermolecular attraction is dominant.',
        values: { n: 10, V: 5, tempC: -150, a: 1.39, b: 0.0391 },
      },
      {
        label: 'Helium at Room Temperature',
        scenario: 'Helium gas at standard pressure where ideal gas behavior is almost identical to real gas.',
        values: { n: 2, V: 44.8, tempC: 20, a: 0.034, b: 0.0237 },
      },
    ],
    variables: [
      { key: 'n', label: 'Amount of Gas (n)', unit: 'mol', min: 0.5, max: 50, step: 0.5, defaultValue: 10, description: 'Moles of gas in container' },
      { key: 'V', label: 'Container Volume (V)', unit: 'L', min: 1, max: 100, step: 1, defaultValue: 10, description: 'Volume of the vessel' },
      { key: 'tempC', label: 'Temperature (T)', unit: '°C', min: -180, max: 500, step: 5, defaultValue: 25, description: 'Absolute thermal state' },
      { key: 'a', label: 'Attraction Parameter (a)', unit: 'L²·atm/mol²', min: 0.01, max: 10, step: 0.05, defaultValue: 3.59, description: 'Magnitude of attractive van der Waals dispersion forces' },
      { key: 'b', label: 'Excluded Volume (b)', unit: 'L/mol', min: 0.01, max: 0.15, step: 0.005, defaultValue: 0.0427, description: 'Finite physical volume occupied by one mole of molecules' },
    ],
    assumptions: [
      'Gas molecules interact solely via simple pairwise dipole/dispersion attractions and hard-sphere repulsions.',
      'The gas is in a pure homogeneous single-phase state (no condensation or meniscus).',
      'Temperature is uniform throughout the volume with zero thermal gradient.',
    ],
    limitations: [
      'Phase Change Discontinuity: When compressed past the critical point, gas condenses into a liquid, which the Van der Waals equation cannot model without Maxwell construction.',
      'High-Density Breakdown: At very high pressures (>100 atm), molecules deform and repulsive potentials require multi-parameter Virial or Redlich-Kwong equations.',
      'Chemical Reactivity: Assumes molecules do not dimerize (e.g. 2NO₂ ⇌ N₂O₄) or dissociate.',
    ],
  },

  // 5. Calorimetry
  {
    id: 'calorimetry',
    name: 'Calorimetry & Specific Heat Capacity',
    field: 'Physics',
    tagline: 'Thermal energy transfer and sensible heat exchange',
    equationLatex: 'Q = m · c · (T_final - T_initial)',
    equationDescription: 'Calculates the thermal energy in Joules required to heat or cool a known mass of substance with specific heat capacity c.',
    defaultScenario: 'Heating a pot of tap water on an electric kitchen stovetop.',
    presetScenarios: [
      {
        label: 'Heating Tea Water',
        scenario: 'Heating 0.5 kg of water (c = 4184 J/kg·K) from room temperature (20°C) to near boiling (95°C).',
        values: { mass: 0.5, c: 4184, T_initial: 20, T_final: 95 },
      },
      {
        label: 'Copper Heat Sink',
        scenario: 'A 0.25 kg computer copper heat sink (c = 385 J/kg·K) warming up from 25°C to 75°C under CPU load.',
        values: { mass: 0.25, c: 385, T_initial: 25, T_final: 75 },
      },
      {
        label: 'Aluminium Engine Block',
        scenario: 'Cooling a 15 kg aluminium car component (c = 900 J/kg·K) from 120°C to 40°C.',
        values: { mass: 15, c: 900, T_initial: 120, T_final: 40 },
      },
    ],
    variables: [
      { key: 'mass', label: 'Mass of Substance (m)', unit: 'kg', min: 0.05, max: 50, step: 0.05, defaultValue: 0.5, description: 'Total mass being heated or cooled' },
      { key: 'c', label: 'Specific Heat Capacity (c)', unit: 'J/(kg·°C)', min: 100, max: 5000, step: 25, defaultValue: 4184, description: 'Thermal energy per kg per degree Celsius' },
      { key: 'T_initial', label: 'Initial Temperature (T_i)', unit: '°C', min: -40, max: 300, step: 1, defaultValue: 20, description: 'Starting temperature of system' },
      { key: 'T_final', label: 'Final Temperature (T_f)', unit: '°C', min: -40, max: 300, step: 1, defaultValue: 95, description: 'Target temperature of system' },
    ],
    assumptions: [
      'Zero heat exchange with surroundings (perfect adiabatic isolation).',
      'Specific heat capacity c is strictly constant over the entire temperature interval ΔT.',
      'No phase changes occur during the process (substance remains pure solid/liquid/gas).',
      'Thermal equilibrium is instantaneous and uniform throughout the mass (infinite thermal conductivity).',
    ],
    limitations: [
      'Convective & Radiative Heat Loss: In reality, hot bodies radiate and lose heat Q_loss = h·A·(T - T_ambient) continuously, requiring 10% to 30% more energy.',
      'Calorimeter Container Thermal Mass: The pot or vessel absorbs part of the energy (Q_vessel = C_cal · ΔT).',
      'Evaporative Cooling: Boiling or open liquid heating suffers significant latent heat loss via surface vaporization.',
    ],
  },

  // 6. Geometric Optics & Ray Tracing
  {
    id: 'optics',
    name: 'Geometric Optics & Ray Tracing',
    field: 'Physics',
    tagline: 'Image formation via thin lenses and spherical mirrors',
    equationLatex: '1/f = 1/dₒ + 1/dᵢ    and    M = -dᵢ / dₒ = hᵢ / hₒ',
    equationDescription: 'Traces principal light rays through converging/diverging lenses and mirrors to locate real and virtual image formation and magnification.',
    defaultScenario: 'A magnifying glass (f = 15 cm) held 25 cm from a printed postage stamp.',
    presetScenarios: [
      {
        label: 'Reading Magnifier (Real Inverted)',
        scenario: 'A convex lens with focal length 15 cm placed 35 cm away from text.',
        values: { f: 15, d_o: 35, h_o: 8, deviceMode: 1 },
      },
      {
        label: 'Virtual Magnification (Inside Focus)',
        scenario: 'A jeweller holds a 10 cm focal length lens 6 cm from a gemstone, producing an upright virtual image.',
        values: { f: 10, d_o: 6, h_o: 6, deviceMode: 1 },
      },
      {
        label: 'Diverging / Eyeglass Lens',
        scenario: 'A corrective concave lens (f = -20 cm) producing a diminished virtual image of distant objects.',
        values: { f: 20, d_o: 40, h_o: 10, deviceMode: 2 },
      },
    ],
    variables: [
      { key: 'f', label: 'Focal Length (|f|)', unit: 'cm', min: 2, max: 50, step: 1, defaultValue: 15, description: 'Distance from optical center to focal point' },
      { key: 'd_o', label: 'Object Distance (dₒ)', unit: 'cm', min: 2, max: 80, step: 1, defaultValue: 30, description: 'Distance from object to lens/mirror plane' },
      { key: 'h_o', label: 'Object Height (hₒ)', unit: 'cm', min: 1, max: 25, step: 0.5, defaultValue: 8, description: 'Height of physical object above optical axis' },
      { key: 'deviceMode', label: 'Device (1=Converging, 2=Diverging)', unit: 'mode', min: 1, max: 2, step: 1, defaultValue: 1, description: '1 for converging convex, 2 for diverging concave' },
    ],
    assumptions: [
      'Paraxial ray approximation: ray angles with the optical axis are small enough that sin θ ≈ tan θ ≈ θ.',
      'Thin lens approximation: lens thickness is negligible compared to radii of curvature.',
      'Monochromatic illumination (single wavelength λ without dispersion).',
      'Homogeneous, isotropic transmission medium (air refractive index n = 1.000).',
    ],
    limitations: [
      'Spherical Aberration: Real spherical lenses cause rays entering near the edge to focus closer than central rays, blurring the image.',
      'Chromatic Aberration: Real glass has wavelength-dependent refractive index n(λ), causing colored color-fringing halos around high-contrast edges.',
      'Diffraction Limit: Wave optics prevents an infinitesimal point focus; every image is limited by an Airy diffraction disk θ = 1.22 λ / D.',
    ],
  },
];

export function ScienceVisualizerTool() {
  const [activeConceptId, setActiveConceptId] = useState<ConceptId>('projectile');
  const activeConcept = useMemo(
    () => CONCEPTS.find((c) => c.id === activeConceptId) || CONCEPTS[0],
    [activeConceptId]
  );

  // User Scenario description & variable state
  const [userScenario, setUserScenario] = useState<string>(activeConcept.defaultScenario);
  const [variableValues, setVariableValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const v of activeConcept.variables) {
      init[v.key] = v.defaultValue;
    }
    return init;
  });

  // Track if any variable is missing / invalid
  const missingVariables = useMemo(() => {
    const missing: string[] = [];
    for (const v of activeConcept.variables) {
      const val = variableValues[v.key];
      if (val === undefined || isNaN(val) || val === null) {
        missing.push(v.label);
      }
    }
    return missing;
  }, [activeConcept, variableValues]);

  // Sync when active concept changes
  useEffect(() => {
    setUserScenario(activeConcept.defaultScenario);
    const newVals: Record<string, number> = {};
    for (const v of activeConcept.variables) {
      newVals[v.key] = v.defaultValue;
    }
    setVariableValues(newVals);
    setIsPlaying(true);
    setAnimTime(0);
  }, [activeConceptId]);

  // Animation controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [animTime, setAnimTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);

  // Animation frame loop
  useEffect(() => {
    let lastTimestamp = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTimestamp) / 1000;
      lastTimestamp = time;

      if (isPlaying) {
        setAnimTime((prev) => prev + dt);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  // ==========================================
  // MATHEMATICAL CALCULATIONS (Concept Specific)
  // ==========================================
  const calculations = useMemo(() => {
    if (missingVariables.length > 0) return null;

    if (activeConcept.id === 'projectile') {
      const v0 = variableValues['v0'];
      const angleDeg = variableValues['angle'];
      const h0 = variableValues['h0'];
      const g = variableValues['g'];

      const angleRad = (angleDeg * Math.PI) / 180;
      const vx = v0 * Math.cos(angleRad);
      const vy0 = v0 * Math.sin(angleRad);

      // Time to apex: vy = 0 -> t_apex = vy0 / g
      const tApex = vy0 / g;
      const yMax = h0 + (vy0 * vy0) / (2 * g);

      // Total flight time: h0 + vy0*t - 0.5*g*t^2 = 0
      // 0.5*g*t^2 - vy0*t - h0 = 0
      const disc = vy0 * vy0 + 2 * g * h0;
      const tTotal = (vy0 + Math.sqrt(disc)) / g;
      const range = vx * tTotal;

      return {
        step1: `Horizontal velocity: vx = v₀·cos(θ) = ${v0}·cos(${angleDeg}°) = ${vx.toFixed(2)} m/s`,
        step2: `Vertical velocity: vy₀ = v₀·sin(θ) = ${v0}·sin(${angleDeg}°) = ${vy0.toFixed(2)} m/s`,
        step3: `Time to apex: t_apex = vy₀ / g = ${vy0.toFixed(2)} / ${g} = ${tApex.toFixed(2)} s`,
        step4: `Max height: H_max = h₀ + vy₀² / (2g) = ${h0} + (${vy0.toFixed(2)})² / (2·${g}) = ${yMax.toFixed(2)} m`,
        step5: `Total flight time: t_flight = [vy₀ + √(vy₀² + 2gh₀)] / g = ${tTotal.toFixed(2)} s`,
        step6: `Total ground range: R = vx · t_flight = ${vx.toFixed(2)} · ${tTotal.toFixed(2)} = ${range.toFixed(2)} m`,
        results: [
          { label: 'Ground Range (R)', value: `${range.toFixed(2)} m` },
          { label: 'Max Altitude (H_max)', value: `${yMax.toFixed(2)} m` },
          { label: 'Flight Time (t_total)', value: `${tTotal.toFixed(2)} s` },
          { label: 'Apex Time (t_apex)', value: `${tApex.toFixed(2)} s` },
        ],
        raw: { vx, vy0, tApex, yMax, tTotal, range },
      };
    }

    if (activeConcept.id === 'pendulum') {
      const L = variableValues['L'];
      const theta0 = variableValues['theta0'];
      const g = variableValues['g'];
      const mass = variableValues['mass'];

      const omega = Math.sqrt(g / L);
      const period = (2 * Math.PI) / omega;
      const frequency = 1 / period;

      // Small angle vs Exact correction
      const thetaRad = (theta0 * Math.PI) / 180;
      const correctedPeriod = period * (1 + (1 / 16) * thetaRad * thetaRad);
      const maxSpeed = omega * L * thetaRad;

      return {
        step1: `Angular frequency: ω = √(g / L) = √(${g} / ${L}) = ${omega.toFixed(3)} rad/s`,
        step2: `Small-angle period: T₀ = 2π / ω = 2π / ${omega.toFixed(3)} = ${period.toFixed(3)} s`,
        step3: `Exact corrected period (first-order expansion): T ≈ T₀·[1 + (1/16)·θ₀²] = ${period.toFixed(3)}·[1 + ${(
          (1 / 16) *
          thetaRad *
          thetaRad
        ).toFixed(4)}] = ${correctedPeriod.toFixed(3)} s`,
        step4: `Natural frequency: f = 1 / T = ${frequency.toFixed(3)} Hz`,
        step5: `Max linear speed at lowest point: v_max = ω·L·θ₀(rad) = ${maxSpeed.toFixed(2)} m/s`,
        results: [
          { label: 'Period (T₀)', value: `${period.toFixed(3)} s` },
          { label: 'Large-Angle Corrected T', value: `${correctedPeriod.toFixed(3)} s` },
          { label: 'Oscillation Frequency', value: `${frequency.toFixed(3)} Hz` },
          { label: 'Max Tangential Velocity', value: `${maxSpeed.toFixed(2)} m/s` },
        ],
        raw: { omega, period, correctedPeriod, frequency, maxSpeed },
      };
    }

    if (activeConcept.id === 'arrhenius') {
      const Ea = variableValues['Ea']; // kJ/mol
      const tempC = variableValues['tempC'];
      const A = variableValues['A'];

      const R = 8.314462; // J/(mol·K)
      const T_K = tempC + 273.15;
      const Ea_J = Ea * 1000;

      const exponent = -Ea_J / (R * T_K);
      const k = A * Math.exp(exponent);
      const halfLife = k > 0 ? Math.LN2 / k : Infinity;

      return {
        step1: `Convert temperature: T(K) = ${tempC}°C + 273.15 = ${T_K.toFixed(2)} K`,
        step2: `Activation energy in Joules: Ea = ${Ea} kJ/mol = ${Ea_J} J/mol`,
        step3: `Exponent factor: -Ea / (R·T) = -${Ea_J} / (${R} · ${T_K.toFixed(2)}) = ${exponent.toFixed(4)}`,
        step4: `Exponential fraction: exp(-Ea / RT) = e^(${exponent.toFixed(4)}) = ${Math.exp(exponent).toExponential(3)}`,
        step5: `Rate constant: k = A · exp(-Ea / RT) = ${A} · ${Math.exp(exponent).toExponential(3)} = ${k.toExponential(3)} s⁻¹`,
        step6: `First-order half-life: t₁/₂ = ln(2) / k = 0.69315 / ${k.toExponential(3)} = ${
          halfLife < 10000 ? halfLife.toFixed(2) + ' s' : halfLife.toExponential(2) + ' s'
        }`,
        results: [
          { label: 'Rate Constant (k)', value: `${k.toExponential(3)} s⁻¹` },
          { label: 'First-Order Half-Life (t₁/₂)', value: halfLife < 1000 ? `${halfLife.toFixed(2)} s` : `${halfLife.toExponential(2)} s` },
          { label: 'Thermal Energy (RT)', value: `${((R * T_K) / 1000).toFixed(3)} kJ/mol` },
          { label: 'Boltzmann Probability', value: `${Math.exp(exponent).toExponential(3)}` },
        ],
        raw: { k, halfLife, T_K, exponent },
      };
    }

    if (activeConcept.id === 'realgas') {
      const n = variableValues['n'];
      const V = variableValues['V'];
      const tempC = variableValues['tempC'];
      const a = variableValues['a'];
      const b = variableValues['b'];

      const R = 0.0820574; // L·atm / (mol·K)
      const T_K = tempC + 273.15;

      // Ideal gas: P = nRT / V
      const pIdeal = (n * R * T_K) / V;

      // Van der Waals: P_vdw = (nRT) / (V - nb) - a(n/V)^2
      const effectiveVol = V - n * b;
      let pVdw = 0;
      let attractionDrop = 0;

      if (effectiveVol > 0) {
        attractionDrop = a * Math.pow(n / V, 2);
        pVdw = (n * R * T_K) / effectiveVol - attractionDrop;
      }

      const discrepancyPercent = pIdeal > 0 ? ((pVdw - pIdeal) / pIdeal) * 100 : 0;

      return {
        step1: `Absolute Temperature: T = ${tempC}°C + 273.15 = ${T_K.toFixed(2)} K`,
        step2: `Ideal Gas Pressure: P_ideal = n·R·T / V = (${n} · 0.08206 · ${T_K.toFixed(1)}) / ${V} = ${pIdeal.toFixed(3)} atm`,
        step3: `Excluded molecular volume: V - n·b = ${V} - (${n} · ${b}) = ${effectiveVol.toFixed(3)} L`,
        step4: `Intermolecular attraction reduction: a·(n/V)² = ${a} · (${n} / ${V})² = ${attractionDrop.toFixed(3)} atm`,
        step5: `Van der Waals Pressure: P_real = [n·R·T / (V - nb)] - a·(n/V)² = ${pVdw.toFixed(3)} atm`,
        step6: `Deviation from Ideal: ${(pVdw - pIdeal).toFixed(3)} atm (${discrepancyPercent.toFixed(1)}%)`,
        results: [
          { label: 'Ideal Gas Pressure (P_ideal)', value: `${pIdeal.toFixed(3)} atm` },
          { label: 'Van der Waals Pressure (P_real)', value: `${pVdw.toFixed(3)} atm` },
          { label: 'Net Deviation', value: `${(pVdw - pIdeal).toFixed(3)} atm` },
          { label: 'Compression Deviation %', value: `${discrepancyPercent.toFixed(1)}%` },
        ],
        raw: { pIdeal, pVdw, discrepancyPercent, effectiveVol },
      };
    }

    if (activeConcept.id === 'calorimetry') {
      const mass = variableValues['mass'];
      const c = variableValues['c'];
      const Ti = variableValues['T_initial'];
      const Tf = variableValues['T_final'];

      const deltaT = Tf - Ti;
      const Q_Joules = mass * c * deltaT;
      const Q_kJ = Q_Joules / 1000;

      return {
        step1: `Temperature difference: ΔT = T_final - T_initial = ${Tf}°C - ${Ti}°C = ${deltaT.toFixed(2)} °C`,
        step2: `Thermal energy equation: Q = m · c · ΔT`,
        step3: `Substitution: Q = ${mass} kg · ${c} J/(kg·°C) · ${deltaT.toFixed(2)} °C`,
        step4: `Thermal Energy Transferred: Q = ${Q_Joules.toFixed(1)} Joules (${Q_kJ.toFixed(3)} kJ)`,
        results: [
          { label: 'Thermal Energy (Q)', value: `${Q_kJ.toFixed(2)} kJ` },
          { label: 'Energy in Joules', value: `${Q_Joules.toLocaleString()} J` },
          { label: 'Temperature Change (ΔT)', value: `${deltaT.toFixed(2)} °C` },
          { label: 'Thermal Heat Capacity (C)', value: `${(mass * c).toFixed(1)} J/°C` },
        ],
        raw: { deltaT, Q_Joules, Q_kJ },
      };
    }

    else if (activeConcept.id === 'optics') {
      const f = variableValues['f'] ?? 15;
      const d_o = variableValues['d_o'] ?? 30;
      const h_o = variableValues['h_o'] ?? 8;
      const deviceMode = variableValues['deviceMode'] ?? 1;
      const deviceType = deviceMode === 2 ? 'diverging-lens' : 'converging-lens';

      const opt = calculateOptics({
        deviceType,
        focalLength: f,
        objectDistance: d_o,
        objectHeight: h_o,
      });

      return {
        step1: `Thin lens equation: 1/f = 1/d_o + 1/d_i  ⟹  ${opt.substitutions.lensEquation}`,
        step2: `Magnification: M = - (d_i / d_o)  ⟹  ${opt.substitutions.magnificationEquation}`,
        step3: `Image height: h_i = M · h_o  ⟹  ${opt.substitutions.imageHeightEquation}`,
        step4: `Image Nature: ${opt.natureDescription}`,
        results: [
          { label: 'Image Distance (d_i)', value: opt.isAtInfinity ? 'At Infinity (∞)' : `${opt.imageDistance.toFixed(2)} cm` },
          { label: 'Magnification (M)', value: opt.isAtInfinity ? 'N/A' : `${opt.magnification.toFixed(2)}×` },
          { label: 'Image Height (h_i)', value: opt.isAtInfinity ? 'N/A' : `${opt.imageHeight.toFixed(2)} cm` },
          { label: 'Image Classification', value: opt.isAtInfinity ? 'Parallel Beam' : `${opt.isReal ? 'Real' : 'Virtual'}, ${opt.isUpright ? 'Upright' : 'Inverted'}` },
        ],
        raw: {
          d_i: opt.imageDistance,
          h_i: opt.imageHeight,
          M: opt.magnification,
          isReal: opt.isReal ? 1 : 0,
          isUpright: opt.isUpright ? 1 : 0,
          isAtInfinity: opt.isAtInfinity ? 1 : 0,
        },
      };
    }

    return null;
  }, [activeConcept, variableValues, missingVariables]);

  // ==========================================
  // DYNAMIC CANVAS ANIMATION RENDERING
  // ==========================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, width, height);

    if (missingVariables.length > 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Please enter all missing variables to start visualizer', width / 2, height / 2);
      return;
    }

    // Concept 1: Projectile Canvas
    if (activeConcept.id === 'projectile' && calculations?.raw) {
      const raw = calculations.raw;
      const vx = raw.vx ?? 0;
      const vy0 = raw.vy0 ?? 0;
      const tTotal = raw.tTotal ?? 1;
      const range = raw.range ?? 1;
      const yMax = raw.yMax ?? 1;
      const g = variableValues['g'] ?? 9.81;
      const h0 = variableValues['h0'] ?? 0;

      const padding = 50;
      const scaleX = (width - padding * 2) / Math.max(10, range * 1.15);
      const scaleY = (height - padding * 2) / Math.max(10, yMax * 1.3);

      const toScreenX = (x: number) => padding + x * scaleX;
      const toScreenY = (y: number) => height - padding - y * scaleY;

      // Draw Ground
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding - 20, height - padding);
      ctx.lineTo(width - padding + 20, height - padding);
      ctx.stroke();

      // Ground grass markers
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, height - padding, width, padding);

      // Draw Ideal Vacuum Parabolic Trajectory
      ctx.strokeStyle = '#0d9488'; // teal-600
      ctx.lineWidth = 2.5;
      ctx.setLineDash([]);
      ctx.beginPath();

      const numPoints = 120;
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * tTotal;
        const x = vx * t;
        const y = h0 + vy0 * t - 0.5 * g * t * t;
        const sx = toScreenX(x);
        const sy = toScreenY(Math.max(0, y));

        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Draw Real-world Drag Trajectory Comparison (Dashed orange curve)
      ctx.strokeStyle = '#f97316'; // orange-500
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();

      // Approximate air drag: range reduced by ~30%, apex shifted left
      const dragFactor = 0.72;
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * (tTotal * 0.85);
        // Drag deceleration in x and y
        const x = vx * t * (1 - 0.3 * (t / tTotal));
        const y = h0 + vy0 * t - 0.5 * (g + 2.5 * (vy0 / 25)) * t * t;
        const sx = toScreenX(x * dragFactor);
        const sy = toScreenY(Math.max(0, y));

        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Animated flying projectile ball
      const tCurrent = (animTime * 1.5) % (tTotal + 0.8);
      if (tCurrent <= tTotal) {
        const curX = vx * tCurrent;
        const curY = h0 + vy0 * tCurrent - 0.5 * g * tCurrent * tCurrent;
        const ballSX = toScreenX(curX);
        const ballSY = toScreenY(Math.max(0, curY));

        // Glow
        ctx.fillStyle = '#2dd4bf';
        ctx.beginPath();
        ctx.arc(ballSX, ballSY, 6, 0, Math.PI * 2);
        ctx.fill();

        // Velocity vector arrow
        const curVy = vy0 - g * tCurrent;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ballSX, ballSY);
        ctx.lineTo(ballSX + vx * 0.4, ballSY - curVy * 0.4);
        ctx.stroke();
      }

      // Range & Apex Legend Markers
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Target Range: ${range.toFixed(1)}m`, toScreenX(range), height - padding + 20);
      ctx.fillText(`Apex: ${yMax.toFixed(1)}m`, toScreenX(range / 2), toScreenY(yMax) - 10);

      // Legend overlay
      ctx.fillStyle = '#0d9488';
      ctx.fillRect(padding, 20, 14, 4);
      ctx.fillStyle = '#e2e8f0';
      ctx.textAlign = 'left';
      ctx.fillText('Ideal Vacuum Parabola', padding + 20, 24);

      ctx.fillStyle = '#f97316';
      ctx.fillRect(padding + 200, 20, 14, 4);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Real-World with Air Drag', padding + 220, 24);
    }

    // Concept 2: Pendulum Canvas
    else if (activeConcept.id === 'pendulum' && calculations?.raw) {
      const raw = calculations.raw;
      const omega = raw.omega ?? 1;
      const period = raw.period ?? 1;
      const theta0Deg = variableValues['theta0'] ?? 15;
      const theta0Rad = (theta0Deg * Math.PI) / 180;

      const pivotX = width / 2;
      const pivotY = 50;
      const armLength = height - 120;

      // Current angle from harmonic oscillation
      const curTheta = theta0Rad * Math.cos(omega * animTime);
      const bobX = pivotX + armLength * Math.sin(curTheta);
      const bobY = pivotY + armLength * Math.cos(curTheta);

      // Draw Pivot
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Swing Arc guideline
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, armLength, Math.PI / 2 - theta0Rad, Math.PI / 2 + theta0Rad);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw String
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Draw Bob
      ctx.fillStyle = '#14b8a6';
      ctx.beginPath();
      ctx.arc(bobX, bobY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Readouts
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        `Angle: ${((curTheta * 180) / Math.PI).toFixed(1)}°  |  Period T: ${period.toFixed(2)}s`,
        width / 2,
        height - 20
      );
    }

    // Concept 3: Arrhenius Reaction Coordinate Diagram
    else if (activeConcept.id === 'arrhenius') {
      const Ea = variableValues['Ea'];
      const tempC = variableValues['tempC'];

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;

      // Axes: X = Reaction Progress, Y = Free Energy (G)
      ctx.beginPath();
      ctx.moveTo(60, height - 50);
      ctx.lineTo(width - 40, height - 50); // X axis
      ctx.moveTo(60, height - 50);
      ctx.lineTo(60, 40); // Y axis
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Reaction Progress (Reactants → Products)', width / 2, height - 20);

      // Energy curve: Reactants -> Peak (Transition State) -> Products
      const rY = height - 120; // Reactants baseline
      const pY = height - 80;  // Exothermic Products baseline
      const peakY = Math.max(50, rY - Ea * 1.3);

      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(60, rY);
      ctx.bezierCurveTo(width * 0.3, rY, width * 0.4, peakY, width * 0.5, peakY);
      ctx.bezierCurveTo(width * 0.6, peakY, width * 0.7, pY, width - 40, pY);
      ctx.stroke();

      // Activation Barrier Arrow
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width * 0.5, rY);
      ctx.lineTo(width * 0.5, peakY);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Activation Energy Ea = ${Ea} kJ/mol`, width * 0.5 + 10, (rY + peakY) / 2);

      // Thermal energy bar representing RT
      const thermalHeight = ((tempC + 273.15) / 500) * 80;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(80, rY - thermalHeight, 16, thermalHeight);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px monospace';
      ctx.fillText(`Thermal (RT): ${(tempC + 273.15).toFixed(0)} K`, 105, rY - thermalHeight / 2);
    }

    // Concept 4: Real Gas vs Ideal Gas Isotherm
    else if (activeConcept.id === 'realgas') {
      const n = variableValues['n'];
      const tempC = variableValues['tempC'];
      const a = variableValues['a'];
      const b = variableValues['b'];
      const R = 0.08206;
      const T_K = tempC + 273.15;

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;

      // Axes: X = Volume (V), Y = Pressure (P)
      ctx.beginPath();
      ctx.moveTo(60, height - 50);
      ctx.lineTo(width - 40, height - 50);
      ctx.moveTo(60, height - 50);
      ctx.lineTo(60, 40);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Volume (V in Liters)', width / 2, height - 20);

      // Plot Ideal Gas Isotherm (dashed teal)
      ctx.strokeStyle = '#2dd4bf';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let v = 2; v <= 50; v += 0.5) {
        const p = (n * R * T_K) / v;
        const sx = 60 + ((v - 2) / 48) * (width - 120);
        const sy = height - 50 - Math.min(height - 100, p * 4);
        if (v === 2) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Plot Van der Waals Real Gas (solid orange)
      ctx.strokeStyle = '#f97316';
      ctx.setLineDash([]);
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      for (let v = 2; v <= 50; v += 0.5) {
        if (v <= n * b) continue;
        const p = (n * R * T_K) / (v - n * b) - a * Math.pow(n / v, 2);
        const sx = 60 + ((v - 2) / 48) * (width - 120);
        const sy = height - 50 - Math.min(height - 100, Math.max(0, p) * 4);
        if (v === 2.5) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Legend
      ctx.fillStyle = '#2dd4bf';
      ctx.fillRect(80, 20, 14, 3);
      ctx.fillStyle = '#e2e8f0';
      ctx.textAlign = 'left';
      ctx.font = '11px sans-serif';
      ctx.fillText('Ideal Gas (P = nRT / V)', 100, 24);

      ctx.fillStyle = '#f97316';
      ctx.fillRect(260, 20, 14, 3);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Real Gas (Van der Waals)', 280, 24);
    }

    // Concept 5: Calorimetry Heating Curve
    else if (activeConcept.id === 'calorimetry' && calculations?.raw) {
      const raw = calculations.raw as any;
      const deltaT = raw.deltaT ?? 0;
      const Q_kJ = raw.Q_kJ ?? 0;
      const Ti = variableValues['T_initial'];
      const Tf = variableValues['T_final'];

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;

      // Axes: X = Heat Added (Q), Y = Temperature (°C)
      ctx.beginPath();
      ctx.moveTo(60, height - 50);
      ctx.lineTo(width - 40, height - 50);
      ctx.moveTo(60, height - 50);
      ctx.lineTo(60, 40);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Thermal Energy Added Q (kJ)', width / 2, height - 20);

      // Heating line
      const startY = height - 50 - Math.max(10, ((Ti + 40) / 200) * (height - 100));
      const endY = height - 50 - Math.max(10, ((Tf + 40) / 200) * (height - 100));

      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(80, startY);
      ctx.lineTo(width - 80, endY);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(80, startY, 5, 0, Math.PI * 2);
      ctx.arc(width - 80, endY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Ti: ${Ti}°C`, 90, startY - 8);
      ctx.fillText(`Tf: ${Tf}°C (ΔT = ${deltaT.toFixed(1)}°C)`, width - 180, endY - 8);
    }

    // Concept 6: Geometric Optics & Ray Tracing
    else if (activeConcept.id === 'optics' && calculations?.raw) {
      const raw = calculations.raw as any;
      const f = variableValues['f'] ?? 15;
      const d_o = variableValues['d_o'] ?? 30;
      const h_o = variableValues['h_o'] ?? 8;
      const deviceMode = variableValues['deviceMode'] ?? 1;
      const isConverging = deviceMode === 1;
      const d_i = raw.d_i ?? 0;
      const h_i = raw.h_i ?? 0;
      const isReal = raw.isReal === 1;
      const isAtInfinity = raw.isAtInfinity === 1;

      const originX = width / 2;
      const originY = height / 2;
      const scale = Math.min((width - 80) / 100, (height - 80) / 40);

      // 1. Draw Optical Axis (horizontal centerline)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(30, originY);
      ctx.lineTo(width - 30, originY);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Lens/Mirror at Center (x = originX)
      ctx.strokeStyle = isConverging ? '#38bdf8' : '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(originX, 40);
      ctx.lineTo(originX, height - 40);
      ctx.stroke();

      // Lens Arrows at tips (convex <---> or concave >---<)
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (isConverging) {
        ctx.moveTo(originX - 8, 50);
        ctx.lineTo(originX, 40);
        ctx.lineTo(originX + 8, 50);
        ctx.moveTo(originX - 8, height - 50);
        ctx.lineTo(originX, height - 40);
        ctx.lineTo(originX + 8, height - 50);
      } else {
        ctx.moveTo(originX - 8, 35);
        ctx.lineTo(originX, 45);
        ctx.lineTo(originX + 8, 35);
        ctx.moveTo(originX - 8, height - 35);
        ctx.lineTo(originX, height - 45);
        ctx.lineTo(originX + 8, height - 35);
      }
      ctx.stroke();

      // 3. Focal Points (F and 2F)
      const fPixels = f * scale;
      const focalPoints = [
        { label: 'F₁', x: originX - fPixels },
        { label: '2F₁', x: originX - 2 * fPixels },
        { label: 'F₂', x: originX + fPixels },
        { label: '2F₂', x: originX + 2 * fPixels },
      ];

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      for (const pt of focalPoints) {
        if (pt.x > 30 && pt.x < width - 30) {
          ctx.beginPath();
          ctx.arc(pt.x, originY, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillText(pt.label, pt.x, originY + 16);
        }
      }

      // 4. Object Arrow (Left of lens: x = originX - d_o * scale)
      const objX = originX - d_o * scale;
      const objTipY = originY - h_o * scale;

      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(objX, originY);
      ctx.lineTo(objX, objTipY);
      ctx.stroke();

      // Arrow head for object
      ctx.beginPath();
      ctx.moveTo(objX - 5, objTipY + 8);
      ctx.lineTo(objX, objTipY);
      ctx.lineTo(objX + 5, objTipY + 8);
      ctx.fill();

      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Object', objX, originY + 28);
      ctx.fillText(`hₒ=${h_o}cm`, objX, objTipY - 6);

      // 5. Image Arrow (if not at infinity)
      if (!isAtInfinity) {
        const imgX = originX + d_i * scale;
        const imgTipY = originY - h_i * scale;

        ctx.strokeStyle = isReal ? '#34d399' : '#e879f9';
        ctx.fillStyle = isReal ? '#34d399' : '#e879f9';
        ctx.lineWidth = 3;
        if (!isReal) ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.moveTo(imgX, originY);
        ctx.lineTo(imgX, imgTipY);
        ctx.stroke();
        ctx.setLineDash([]);

        const arrowDir = h_i >= 0 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(imgX - 5, imgTipY + 8 * arrowDir);
        ctx.lineTo(imgX, imgTipY);
        ctx.lineTo(imgX + 5, imgTipY + 8 * arrowDir);
        ctx.fill();

        ctx.fillText(isReal ? 'Real Image' : 'Virtual Image', imgX, originY + 28);
        ctx.fillText(`hᵢ=${h_i.toFixed(1)}cm`, imgX, imgTipY - 6 * arrowDir);

        // Principal Rays
        // Ray 1: Parallel to Axis
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(objX, objTipY);
        ctx.lineTo(originX, objTipY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(originX, objTipY);
        if (isConverging) {
          const slope = (originY - objTipY) / fPixels;
          const endX = width - 40;
          ctx.lineTo(endX, objTipY + slope * (endX - originX));
          ctx.stroke();

          if (!isReal) {
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(originX, objTipY);
            ctx.lineTo(imgX, imgTipY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        } else {
          const slope = (objTipY - originY) / fPixels;
          ctx.lineTo(width - 40, objTipY + slope * (width - 40 - originX));
          ctx.stroke();
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(originX, objTipY);
          ctx.lineTo(originX - fPixels, originY);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Ray 2: Chief Ray through Center
        ctx.strokeStyle = '#34d399';
        ctx.beginPath();
        ctx.moveTo(objX, objTipY);
        ctx.lineTo(originX, originY);
        const chiefSlope = (originY - objTipY) / (originX - objX);
        const endX2 = isReal ? Math.max(imgX + 40, width - 60) : width - 60;
        ctx.lineTo(endX2, originY + chiefSlope * (endX2 - originX));
        ctx.stroke();

        if (!isReal) {
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(originX, originY);
          ctx.lineTo(imgX, imgTipY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // Legend overlay
      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${isConverging ? 'Converging Convex Lens' : 'Diverging Concave Lens'} (f = ${f} cm)`, 40, 30);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`dₒ = ${d_o} cm | dᵢ = ${isAtInfinity ? '∞' : `${d_i.toFixed(1)} cm`} | M = ${raw.M ? raw.M.toFixed(2) : '—'}×`, 40, 48);
    }
  }, [activeConcept, variableValues, animTime, calculations, isPlaying, missingVariables]);

  const [pinnedSuccess, setPinnedSuccess] = useState(false);

  const handlePinSimulationExperiment = () => {
    if (!calculations || missingVariables.length > 0) return;
    saveExperiment({
      title: `${activeConcept.name}: Investigation`,
      toolCategory: activeConcept.field === 'Chemistry' ? 'chemistry' : 'physics',
      objective: `Empirical simulation and mathematical modeling of ${activeConcept.name.toLowerCase()} (${userScenario}).`,
      equations: [
        activeConcept.equationLatex,
        calculations.step1,
        calculations.step2,
      ],
      parameters: activeConcept.variables.map((v) => ({
        name: v.label,
        value: `${variableValues[v.key] ?? v.defaultValue}`,
        unit: v.unit,
      })),
      results: calculations.results,
      substitutions: [
        calculations.step1,
        calculations.step2,
        calculations.step3,
        calculations.step4,
      ],
      assumptions: activeConcept.assumptions,
      limitations: activeConcept.limitations,
      userNotes: `Scenario analyzed: ${userScenario}`,
    });
    setPinnedSuccess(true);
    setTimeout(() => setPinnedSuccess(false), 2500);
  };

  const handleVariableChange = (key: string, val: number) => {
    setVariableValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const loadPreset = (preset: { label: string; scenario: string; values: Record<string, number> }) => {
    setUserScenario(preset.scenario);
    setVariableValues(preset.values);
  };

  return (
    <div className="space-y-6">
      {/* Concept Selector Pill Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl" role="tablist">
          {CONCEPTS.map((concept) => (
            <button
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              role="tab"
              aria-selected={activeConceptId === concept.id}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeConceptId === concept.id
                  ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              {concept.name.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {calculations && missingVariables.length === 0 && (
          <button
            onClick={handlePinSimulationExperiment}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs ${
              pinnedSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            {pinnedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Pinned to Lab Notebook!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Pin to Lab Notebook
              </>
            )}
          </button>
        )}
      </div>

      {/* Real-World Situation & Scenario Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300">
                {activeConcept.field}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {activeConcept.name}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeConcept.tagline}
            </p>
          </div>

          {/* Quick preset scenarios */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Try Scenario:</span>
            {activeConcept.presetScenarios.map((preset) => (
              <button
                key={preset.label}
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 hover:border-teal-500 text-slate-700 dark:text-slate-300 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real-world situation narrative input */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Real-World Situation / Problem Description:
          </label>
          <input
            type="text"
            value={userScenario}
            onChange={(e) => setUserScenario(e.target.value)}
            placeholder="Describe the physical setup or experiment..."
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Missing Values Warning (Never invent missing values!) */}
        {missingVariables.length > 0 && (
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <span className="font-bold">Missing Required Variables: </span>
              Please provide numerical values for: <strong>{missingVariables.join(', ')}</strong>. The visualizer does not fabricate missing data.
            </div>
          </div>
        )}

        {/* Interactive Sliders & Numerical Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {activeConcept.variables.map((v) => {
            const currentVal = variableValues[v.key];
            return (
              <div
                key={v.key}
                className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {v.label}
                  </span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                    {currentVal ?? '—'} {v.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={v.min}
                  max={v.max}
                  step={v.step}
                  value={currentVal ?? v.defaultValue}
                  onChange={(e) => handleVariableChange(v.key, parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{v.min} {v.unit}</span>
                  <input
                    type="number"
                    value={currentVal ?? ''}
                    onChange={(e) => {
                      const parsed = parseFloat(e.target.value);
                      handleVariableChange(v.key, isNaN(parsed) ? (undefined as any) : parsed);
                    }}
                    className="w-16 px-1 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-center font-mono text-[11px]"
                  />
                  <span>{v.max} {v.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Canvas Animation Viewport */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg space-y-2 p-4">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE DYNAMIC BEHAVIOR SIMULATOR
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1 text-[11px] font-sans"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={() => setAnimTime(0)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-sans flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restart
            </button>
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={760}
          height={320}
          className="w-full h-[320px] rounded-xl block"
        />
      </div>

      {/* KPI Prediction Summary Grid */}
      {calculations?.results && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {calculations.results.map((r) => (
            <div
              key={r.label}
              className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
            >
              <span className="text-[11px] font-medium text-slate-500 block">{r.label}</span>
              <div className="text-lg font-bold font-mono text-teal-600 dark:text-teal-400 mt-0.5">
                {r.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step-by-Step Mathematical Derivation Ledger */}
      {calculations && (
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-teal-600" />
              Governing Equation &amp; Step-by-Step Substitution
            </h3>
            <span className="text-xs font-mono text-teal-600 font-bold">
              {activeConcept.equationLatex}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {activeConcept.equationDescription}
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1.5 leading-relaxed">
            {Object.entries(calculations)
              .filter(([k]) => k.startsWith('step'))
              .map(([k, val]) => (
                <div key={k} className="flex items-start gap-2">
                  <span className="text-teal-500 select-none">▸</span>
                  <span>{String(val)}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Assumptions vs. Real-World Divergence (Anti-Slop Scientific Rigor) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Ideal Assumptions */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Underlying Theoretical Assumptions
          </div>
          <p className="text-xs text-slate-500">
            Conditions required for the mathematical model to hold with 100% precision:
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {activeConcept.assumptions.map((assump, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{assump}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Why Model Diverges in the Real World */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/40 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Why The Model Diverges in Reality ({userScenario.slice(0, 32)}...)
          </div>
          <p className="text-xs text-slate-500">
            Real physical factors that cause laboratory observations to differ from formula predictions:
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            {activeConcept.limitations.map((limit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>{limit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
