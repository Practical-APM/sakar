"use client";

/**
 * Web Audio 8-bit SFX + hard-hitting looping BGM.
 * BGM: "YcoqPzRt1OQ" from YouTube (https://youtu.be/YcoqPzRt1OQ)
 *
 * BGM is decoded into an AudioBuffer and played through the same
 * AudioContext as SFX (HTMLAudioElement was silent for some setups).
 */

const BGM_SRC = "/audio/bgm_new.mp4";

export function createBlipEngine() {
  let ctx: AudioContext | null = null;
  let muted = true;
  let volume = 0.85; // 0..1 user BGM level
  let master: GainNode | null = null;
  let sfxBus: GainNode | null = null;
  let bgmGain: GainNode | null = null;
  let bgmBuffer: AudioBuffer | null = null;
  let bgmSource: AudioBufferSourceNode | null = null;
  let loadPromise: Promise<AudioBuffer> | null = null;
  let wantBgm = false;

  const ensure = () => {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 1;
      master.connect(ctx.destination);

      sfxBus = ctx.createGain();
      sfxBus.gain.value = 1;
      sfxBus.connect(master);

      bgmGain = ctx.createGain();
      bgmGain.gain.value = 0;
      bgmGain.connect(master);
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  };

  const loadBgm = () => {
    if (bgmBuffer) return Promise.resolve(bgmBuffer);
    if (loadPromise) return loadPromise;
    const ac = ensure();
    loadPromise = (async () => {
      const res = await fetch(BGM_SRC, { cache: "force-cache" });
      if (!res.ok) throw new Error(`BGM HTTP ${res.status}`);
      const raw = await res.arrayBuffer();
      // copy — decodeAudioData may detach the buffer
      const copy = raw.slice(0);
      const decoded = await ac.decodeAudioData(copy);
      bgmBuffer = decoded;
      return decoded;
    })().catch((err) => {
      loadPromise = null;
      console.warn("[bgm] load failed", err);
      throw err;
    });
    return loadPromise;
  };

  const stopSource = () => {
    if (!bgmSource) return;
    try {
      bgmSource.onended = null;
      bgmSource.stop();
    } catch {
      /* already stopped */
    }
    try {
      bgmSource.disconnect();
    } catch {
      /* */
    }
    bgmSource = null;
  };

  const applyGain = (target: number, seconds = 0.35) => {
    if (!ctx || !bgmGain) return;
    const g = bgmGain.gain;
    const now = ctx.currentTime;
    const from = Math.max(0.0001, g.value);
    g.cancelScheduledValues(now);
    g.setValueAtTime(from, now);
    g.linearRampToValueAtTime(Math.max(0.0001, target), now + seconds);
  };

  const startBgm = async () => {
    wantBgm = true;
    try {
      const ac = ensure();
      if (ac.state === "suspended") await ac.resume();
      const buffer = await loadBgm();
      if (!wantBgm || muted) return;

      stopSource();
      if (!bgmGain) return;

      const src = ac.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      src.connect(bgmGain);
      src.start(0);
      bgmSource = src;
      applyGain(Math.max(0.05, volume), 0.45);
    } catch (err) {
      console.warn("[bgm] start failed", err);
    }
  };

  const stopBgm = () => {
    wantBgm = false;
    applyGain(0.0001, 0.25);
    window.setTimeout(() => {
      if (!wantBgm) stopSource();
    }, 280);
  };

  const tone = (
    dest: AudioNode,
    freq: number,
    when: number,
    dur: number,
    type: OscillatorType,
    peak: number,
  ) => {
    if (!ctx || freq <= 0) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(peak, when + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(gain);
    gain.connect(dest);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  };

  const blip = (freq: number, dur = 0.08, type: OscillatorType = "square") => {
    if (muted) return;
    try {
      const ac = ensure();
      if (!sfxBus) return;
      tone(sfxBus, freq, ac.currentTime, dur, type, 0.06);
    } catch {
      /* ignore */
    }
  };

  return {
    get muted() {
      return muted;
    },
    get volume() {
      return volume;
    },
    /** 0..1 BGM level (still silent while muted). */
    setVolume(v: number) {
      volume = Math.min(1, Math.max(0, v));
      if (!muted && wantBgm) applyGain(Math.max(0.0001, volume), 0.08);
    },
    setMuted(v: boolean) {
      muted = v;
      if (!v) return startBgm();
      stopBgm();
      return Promise.resolve();
    },
    /** Kick off decode early after a user gesture. */
    preload() {
      try {
        ensure();
        void loadBgm();
      } catch {
        /* */
      }
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
