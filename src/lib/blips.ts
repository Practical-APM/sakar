"use client";

/** Tiny Web Audio 8-bit blips. Muted by default until user enables. */
export function createBlipEngine() {
  let ctx: AudioContext | null = null;
  let muted = true;

  const ensure = () => {
    if (!ctx) ctx = new AudioContext();
    return ctx;
  };

  const blip = (freq: number, dur = 0.08, type: OscillatorType = "square") => {
    if (muted) return;
    try {
      const ac = ensure();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0.04;
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start();
      osc.stop(ac.currentTime + dur);
    } catch {
      /* ignore autoplay / unsupported */
    }
  };

  return {
    get muted() {
      return muted;
    },
    setMuted(v: boolean) {
      muted = v;
      if (!v) ensure();
    },
    start: () => blip(520, 0.12),
    select: () => blip(660, 0.06),
    confirm: () => {
      blip(440, 0.05);
      window.setTimeout(() => blip(660, 0.08), 60);
    },
    coin: () => {
      blip(988, 0.05);
      window.setTimeout(() => blip(1319, 0.12), 50);
    },
  };
}

export type BlipEngine = ReturnType<typeof createBlipEngine>;
