/**
 * Geometric Optics and Ray Tracing Engine for LearnLab Tools.
 * Calculates thin lens and spherical mirror image formation, ray coordinates, and optical aberrations.
 */

export type OpticalDeviceType = 'converging-lens' | 'diverging-lens' | 'concave-mirror' | 'convex-mirror';

export interface OpticsInput {
  deviceType: OpticalDeviceType;
  focalLength: number; // magnitude in cm or arbitrary units > 0
  objectDistance: number; // d_o > 0
  objectHeight: number; // h_o > 0
}

export interface RaySegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isVirtual?: boolean;
  label?: string;
  color?: string;
}

export interface OpticsResult {
  deviceType: OpticalDeviceType;
  focalLengthSigned: number; // signed f
  objectDistance: number; // d_o
  objectHeight: number; // h_o
  imageDistance: number; // signed d_i
  imageHeight: number; // signed h_i
  magnification: number; // M
  isReal: boolean;
  isUpright: boolean;
  isMagnified: boolean;
  isAtInfinity: boolean;
  natureDescription: string;
  substitutions: {
    lensEquation: string;
    magnificationEquation: string;
    imageHeightEquation: string;
  };
  rays: RaySegment[];
  opticalElements: {
    axisY: number;
    opticPlaneX: number;
    frontFocusX: number;
    backFocusX: number;
    front2FX: number;
    back2FX: number;
  };
  aberrationsAndLimits: string[];
}

export function calculateOptics(input: OpticsInput): OpticsResult {
  const { deviceType, focalLength, objectDistance, objectHeight } = input;
  const fMag = Math.max(0.1, Math.abs(focalLength));
  const d_o = Math.max(0.1, Math.abs(objectDistance));
  const h_o = objectHeight || 10;

  // Sign convention for focal length:
  // Converging lens & Concave mirror have positive f
  // Diverging lens & Convex mirror have negative f
  const isConverging = deviceType === 'converging-lens' || deviceType === 'concave-mirror';
  const isLens = deviceType === 'converging-lens' || deviceType === 'diverging-lens';
  const f = isConverging ? fMag : -fMag;

  // Thin lens / Mirror equation: 1/f = 1/d_o + 1/d_i
  // => 1/d_i = 1/f - 1/d_o = (d_o - f) / (f * d_o)
  // => d_i = (f * d_o) / (d_o - f)
  const denom = d_o - f;
  const isAtInfinity = Math.abs(denom) < 0.001;

  let d_i = 0;
  let M = 0;
  let h_i = 0;

  if (!isAtInfinity) {
    d_i = (f * d_o) / denom;
    M = -d_i / d_o;
    h_i = M * h_o;
  }

  // Real vs Virtual classification:
  // For lenses: d_i > 0 is real (opposite side, x > 0), d_i < 0 is virtual (same side, x < 0).
  // For mirrors: d_i > 0 is real (same side, in front), d_i < 0 is virtual (behind mirror).
  const isReal = isAtInfinity ? false : d_i > 0;
  const isUpright = M > 0;
  const isMagnified = Math.abs(M) > 1;

  // Description
  let natureDescription = '';
  if (isAtInfinity) {
    natureDescription = 'Image is at infinity (refracted/reflected rays emerge parallel; no focused image formed).';
  } else {
    const realStr = isReal ? 'Real' : 'Virtual';
    const orientStr = isUpright ? 'Upright' : 'Inverted';
    const sizeStr = Math.abs(Math.abs(M) - 1) < 0.01 ? 'Same size' : isMagnified ? 'Magnified (enlarged)' : 'Diminished (reduced)';
    natureDescription = `${realStr}, ${orientStr}, ${sizeStr} (Magnification M = ${M.toFixed(2)}×, Image distance = ${d_i.toFixed(2)} cm)`;
  }

  // Ray tracing coordinates in a normalized coordinate system:
  // Optical plane is at x = 0.
  // Object is at x = -d_o, with tip at (-d_o, h_o).
  // Focal points are at (-fMag, 0) and (+fMag, 0).
  const rays: RaySegment[] = [];
  const objTip = { x: -d_o, y: h_o };

  if (isLens) {
    // Lens: Light passes from left (x < 0) to right (x > 0)
    // Ray 1: Parallel to axis, refracts through back focal point (if converging) or diverges from front focal point (if diverging)
    rays.push({
      x1: objTip.x,
      y1: objTip.y,
      x2: 0,
      y2: objTip.y,
      label: 'Parallel Ray',
      color: '#38bdf8', // sky-400
    });

    if (isConverging) {
      // Passes through (f, 0)
      const slope1 = (0 - objTip.y) / (f - 0);
      const targetX1 = Math.max(d_i + 20, f * 2.5);
      const targetY1 = objTip.y + slope1 * targetX1;
      rays.push({
        x1: 0,
        y1: objTip.y,
        x2: targetX1,
        y2: targetY1,
        color: '#38bdf8',
      });

      // Virtual back-extension if virtual image (d_i < 0)
      if (d_i < 0) {
        rays.push({
          x1: 0,
          y1: objTip.y,
          x2: d_i,
          y2: h_i,
          isVirtual: true,
          color: '#38bdf8',
        });
      }
    } else {
      // Diverging lens: Refracts as if coming from front focal point (-fMag, 0)
      const slope1 = (objTip.y - 0) / (0 - (-fMag));
      const targetX1 = 120;
      const targetY1 = objTip.y + slope1 * targetX1;
      rays.push({
        x1: 0,
        y1: objTip.y,
        x2: targetX1,
        y2: targetY1,
        color: '#38bdf8',
      });
      // Virtual trace back to front focus and image
      rays.push({
        x1: 0,
        y1: objTip.y,
        x2: -fMag,
        y2: 0,
        isVirtual: true,
        color: '#38bdf8',
      });
    }

    // Ray 2: Central (Chief) Ray through optical center (0, 0) without deviation
    const slope2 = (0 - objTip.y) / (0 - objTip.x);
    const targetX2 = Math.max(d_i + 20, 100);
    const targetY2 = slope2 * targetX2;
    rays.push({
      x1: objTip.x,
      y1: objTip.y,
      x2: targetX2,
      y2: targetY2,
      label: 'Chief Ray',
      color: '#34d399', // emerald-400
    });

    if (d_i < 0) {
      // Virtual extension behind
      rays.push({
        x1: 0,
        y1: 0,
        x2: d_i,
        y2: h_i,
        isVirtual: true,
        color: '#34d399',
      });
    }
  } else {
    // Mirror: Light reflects back to left (for real) or virtual behind mirror (x > 0)
    // Ray 1: Parallel to axis, reflects through focus
    rays.push({
      x1: objTip.x,
      y1: objTip.y,
      x2: 0,
      y2: objTip.y,
      label: 'Parallel Ray',
      color: '#38bdf8',
    });

    if (isConverging) {
      // Concave mirror: Focus is at x = -fMag
      const slope = (0 - objTip.y) / (-fMag - 0);
      const targetX = -d_o - 40;
      const targetY = objTip.y + slope * (targetX - 0);
      rays.push({
        x1: 0,
        y1: objTip.y,
        x2: targetX,
        y2: targetY,
        color: '#38bdf8',
      });
      if (d_i < 0) {
        // Virtual extension behind mirror
        rays.push({
          x1: 0,
          y1: objTip.y,
          x2: -d_i, // behind mirror
          y2: h_i,
          isVirtual: true,
          color: '#38bdf8',
        });
      }
    } else {
      // Convex mirror: Focus is behind mirror at x = +fMag
      const slope = (objTip.y - 0) / (0 - fMag);
      rays.push({
        x1: 0,
        y1: objTip.y,
        x2: -d_o - 40,
        y2: objTip.y + slope * (-d_o - 40),
        color: '#38bdf8',
      });
      rays.push({
        x1: 0,
        y1: objTip.y,
        x2: fMag,
        y2: 0,
        isVirtual: true,
        color: '#38bdf8',
      });
    }

    // Ray 2: Chief ray to vertex (0, 0) reflects at equal angle
    rays.push({
      x1: objTip.x,
      y1: objTip.y,
      x2: 0,
      y2: 0,
      label: 'Vertex Ray',
      color: '#34d399',
    });
    rays.push({
      x1: 0,
      y1: 0,
      x2: -d_o - 40,
      y2: -(objTip.y / d_o) * (-d_o - 40),
      color: '#34d399',
    });
    if (d_i < 0) {
      rays.push({
        x1: 0,
        y1: 0,
        x2: -d_i,
        y2: h_i,
        isVirtual: true,
        color: '#34d399',
      });
    }
  }

  return {
    deviceType,
    focalLengthSigned: f,
    objectDistance: d_o,
    objectHeight: h_o,
    imageDistance: d_i,
    imageHeight: h_i,
    magnification: M,
    isReal,
    isUpright,
    isMagnified,
    isAtInfinity,
    natureDescription,
    substitutions: {
      lensEquation: `1 / d_i = 1 / (${f.toFixed(1)}) - 1 / (${d_o.toFixed(1)})  ⟹  d_i = ${isAtInfinity ? '∞' : d_i.toFixed(2)} cm`,
      magnificationEquation: `M = - (d_i / d_o) = - (${d_i.toFixed(2)} / ${d_o.toFixed(2)}) = ${M.toFixed(3)}`,
      imageHeightEquation: `h_i = M × h_o = (${M.toFixed(3)}) × ${h_o.toFixed(1)} cm = ${h_i.toFixed(2)} cm`,
    },
    rays,
    opticalElements: {
      axisY: 0,
      opticPlaneX: 0,
      frontFocusX: -fMag,
      backFocusX: fMag,
      front2FX: -2 * fMag,
      back2FX: 2 * fMag,
    },
    aberrationsAndLimits: [
      'Thin Lens / Paraxial Approximation: Valid when ray angles with the optical axis are small (sin θ ≈ θ) and lens thickness is negligible compared to radius of curvature.',
      'Spherical Aberration: In real thick/spherical lenses, marginal rays at the edge bend more sharply than paraxial rays, causing focal blur.',
      'Chromatic Aberration: Real glass has wavelength-dependent refractive index n(λ) (dispersion); blue light focuses closer than red light.',
      'Diffraction Limit (Airy Disk): Real apertures cause wave diffraction limiting maximum optical resolution according to Rayleigh criterion θ = 1.22 λ / D.',
    ],
  };
}
