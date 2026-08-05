export const COLORS = {
  light: {
    clothBase: "#EEE9DF",
    clothHighlight: "#F8F4EC",
    clothShadow: "#D8D0C3",
    inkPrimary: "#20231F",
    inkSecondary: "#777269",
    thread: "#A97916",
    edge: "#B8AE9F",
    holeMetal: "#C9A227",
    accent: "#A97916",
  },
  dark: {
    clothBase: "#171815",
    clothHighlight: "#22231F",
    clothShadow: "#10110F",
    inkPrimary: "#ECE6DB",
    inkSecondary: "#9B968D",
    thread: "#C79A3B",
    edge: "#4D4A43",
    holeMetal: "#C79A3B",
    accent: "#C79A3B",
  },
} as const;

export const SEAM = {
  controlPointSpacing: 110,
  clampMin: 0.35,
  clampMax: 0.65,
  horizontalJitter: 0.06,
  seed: 42,
  corridorDesktop: 270,
  corridorTablet: 155,
  corridorMobile: 85,
  collisionPadding: 40,
} as const;

export const HOLES = {
  spacingDesktop: 52,
  spacingTablet: 44,
  spacingMobile: 36,
  radiusDesktop: 12.5,
  radiusTablet: 10.5,
  radiusMobile: 9,
  offsetFromSeam: 38,
} as const;

export const THREAD = {
  springK: 48,
  dampingC: 14,
  strokeWidth: 9,
  tipRadius: 7.5,
  /** Visible loose cord even at top of page (mockup parity) */
  initialProgress: 0.1,
} as const;

export const DEBUG_STITCHING = false;
