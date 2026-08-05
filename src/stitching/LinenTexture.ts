/** Seeded hash for stable procedural noise */
function hash2(x: number, y: number, seed = 1) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

function smoothNoise(x: number, y: number, seed: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = hash2(x0, y0, seed);
  const b = hash2(x0 + 1, y0, seed);
  const c = hash2(x0, y0 + 1, seed);
  const d = hash2(x0 + 1, y0 + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, seed: number, octaves = 4) {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    value += amp * smoothNoise(x * freq, y * freq, seed + i * 17);
    amp *= 0.5;
    freq *= 2;
  }
  return value;
}

export type ClothTone = {
  base: [number, number, number];
  highlight: [number, number, number];
  shadow: [number, number, number];
};

export const LIGHT_CLOTH: ClothTone = {
  base: [238, 233, 223],
  highlight: [248, 244, 236],
  shadow: [216, 208, 195],
};

export const DARK_CLOTH: ClothTone = {
  base: [23, 24, 21],
  highlight: [34, 35, 31],
  shadow: [16, 17, 15],
};

function mix(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

/**
 * Paint a seamless linen/canvas tile into an offscreen canvas.
 * Warp + weft fibers, yarn thickness variation, and soft mottling.
 */
export function paintLinenTile(
  size: number,
  tone: ClothTone,
  seed = 42,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  const data = img.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Warp / weft at linen scale
      const warp = Math.sin(((x + fbm(x * 0.08, y * 0.02, seed) * 3) / size) * Math.PI * 2 * 18);
      const weft = Math.sin(((y + fbm(x * 0.02, y * 0.08, seed + 3) * 3) / size) * Math.PI * 2 * 18);
      const weave = (warp * 0.55 + weft * 0.45) * 0.5 + 0.5;

      // Yarn thickness & fiber noise
      const fiber = fbm(x * 0.35, y * 0.35, seed + 9, 5);
      const mottling = fbm(x * 0.015, y * 0.015, seed + 21, 3);

      let t = weave * 0.45 + fiber * 0.35 + mottling * 0.2;
      t = Math.max(0, Math.min(1, t));

      const rgb =
        t > 0.55
          ? mix(tone.base, tone.highlight, (t - 0.55) / 0.45)
          : mix(tone.shadow, tone.base, t / 0.55);

      const i = (y * size + x) * 4;
      data[i] = rgb[0];
      data[i + 1] = rgb[1];
      data[i + 2] = rgb[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas;
}

export function clothToneFromTheme(theme: "light" | "dark"): ClothTone {
  return theme === "dark" ? DARK_CLOTH : LIGHT_CLOTH;
}
