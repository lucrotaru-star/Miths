import { useMemo } from 'react';

interface Particle {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  min: number;
  max: number;
}

interface Mote {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  peak: number;
}

// Deterministic pseudo-random so the layout is stable across renders.
function makeParticles(count: number, seed: number): Particle[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 1 + rand() * 2.4,
    delay: rand() * 6,
    duration: 3 + rand() * 5,
    min: 0.15 + rand() * 0.2,
    max: 0.7 + rand() * 0.3,
  }));
}

function makeMotes(count: number, seed: number): Mote[] {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    size: 2 + rand() * 4,
    delay: rand() * 14,
    duration: 14 + rand() * 16,
    drift: (rand() - 0.5) * 120,
    peak: 0.3 + rand() * 0.4,
  }));
}

export default function AnimatedBackground() {
  const stars = useMemo(() => makeParticles(70, 42), []);
  const motes = useMemo(() => makeMotes(22, 137), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-radial-glow">
      {/* Drifting violet mist layers */}
      <div
        className="absolute -inset-[10%] opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 30% 20%, rgba(111,63,168,0.35), transparent 70%), radial-gradient(ellipse 45% 35% at 75% 60%, rgba(212,168,56,0.12), transparent 70%)',
          animation: 'mist-drift 24s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -inset-[10%] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 40% 30% at 60% 80%, rgba(139,92,199,0.25), transparent 70%)',
          animation: 'mist-drift 32s ease-in-out infinite reverse',
        }}
      />

      {/* Twinkling stars */}
      {stars.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold-300"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--min': p.min,
              '--max': p.max,
              animation: `twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Rising gold motes */}
      {motes.map((m, i) => (
        <span
          key={`m-${i}`}
          className="absolute bottom-0 rounded-full bg-gold-400 blur-[1px]"
          style={
            {
              left: `${m.left}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              '--drift': `${m.drift}px`,
              '--peak': m.peak,
              animation: `drift-up ${m.duration}s linear ${m.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(10,7,18,0.7) 100%)',
        }}
      />
    </div>
  );
}
