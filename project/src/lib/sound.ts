// ============================================================================
//  ЗВУКОВАЯ МАГИЯ БИБЛИОТЕКИ
//  Синтез мистических звуков через Web Audio API — без внешних файлов.
// ============================================================================

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambientNodes: { stop: () => void } | null = null;
let muted = false;

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
  if (masterGain && ctx) {
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(value ? 0 : 0.5, ctx.currentTime + 0.3);
  }
  if (value) stopAmbient();
}

export function isMuted() {
  return muted;
}

// ---- Атмосферный гул (ambient drone) ----------------------------------------

export function startAmbient() {
  if (muted) return;
  const c = ensureContext();
  if (!c || !masterGain) return;
  if (ambientNodes) return;

  const bus = c.createGain();
  bus.gain.value = 0;
  bus.gain.linearRampToValueAtTime(0.18, c.currentTime + 4);
  bus.connect(masterGain);

  const oscillators: OscillatorNode[] = [];
  const filters: BiquadFilterNode[] = [];

  // Layered low drone — root + fifth + octave, slightly detuned.
  const freqs = [55, 82.5, 110, 164.81];
  freqs.forEach((f, i) => {
    const osc = c.createOscillator();
    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.value = f;
    osc.detune.value = (i - 1.5) * 4;

    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400 + i * 80;
    filter.Q.value = 2;

    const gain = c.createGain();
    gain.gain.value = 0.5 / freqs.length;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(bus);
    osc.start();
    oscillators.push(osc);
    filters.push(filter);
  });

  // Slow shimmer LFO on the filter cutoffs for a breathing texture.
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 120;
  lfo.connect(lfoGain);
  filters.forEach((f) => lfoGain.connect(f.frequency));
  lfo.start();
  oscillators.push(lfo);

  ambientNodes = {
    stop: () => {
      bus.gain.cancelScheduledValues(c.currentTime);
      bus.gain.linearRampToValueAtTime(0, c.currentTime + 1.5);
      setTimeout(() => {
        oscillators.forEach((o) => {
          try { o.stop(); } catch { /* already stopped */ }
        });
        try { bus.disconnect(); } catch { /* noop */ }
      }, 1600);
    },
  };
}

export function stopAmbient() {
  if (ambientNodes) {
    ambientNodes.stop();
    ambientNodes = null;
  }
}

// ---- Звон колокольчика (chime) — для открытия мифа --------------------------

export function playChime() {
  if (muted) return;
  const c = ensureContext();
  if (!c || !masterGain) return;

  const now = c.currentTime;
  const out = masterGain;
  // Pentatonic-ish cluster for a mystical bell.
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const gain = c.createGain();
    const peak = 0.22 / (i + 1);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3 + i * 0.4);

    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 3.5 + i * 0.4);
  });
}

// ---- Тихий шёпот (hover blip) — для наведения на карточку --------------------

export function playHover() {
  if (muted) return;
  const c = ensureContext();
  if (!c || !masterGain) return;

  const now = c.currentTime;
  const out = masterGain;
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  osc.connect(gain);
  gain.connect(out);
  osc.start(now);
  osc.stop(now + 0.4);
}

// ---- Закрытие (мягкий низкий тон) -------------------------------------------

export function playClose() {
  if (muted) return;
  const c = ensureContext();
  if (!c || !masterGain) return;

  const now = c.currentTime;
  const out = masterGain;
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(392, now);
  osc.frequency.exponentialRampToValueAtTime(130, now + 0.4);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

  osc.connect(gain);
  gain.connect(out);
  osc.start(now);
  osc.stop(now + 0.7);
}
