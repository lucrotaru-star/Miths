import { BookOpen, MapPin, User } from 'lucide-react';
import type { Myth } from '@/data/myths';
import { playHover } from '@/lib/sound';

interface MythCardProps {
  myth: Myth;
  onRead: () => void;
  index: number;
}

export default function MythCard({ myth, onRead, index }: MythCardProps) {
  return (
    <article
      onMouseEnter={() => playHover()}
      className="card-glow card-glow-hover group relative flex flex-col overflow-hidden rounded-2xl border border-gold-500/15 bg-night-900/70 transition-all duration-500 hover:-translate-y-1.5"
      style={{ animation: `fade-rise 0.8s ${index * 0.08}s both` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={myth.image}
          alt={myth.title}
          loading="lazy"
          className="h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-amethyst-600/20 via-transparent to-gold-500/10 mix-blend-overlay" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-night-950/70 px-3 py-1 font-display text-[11px] uppercase tracking-[0.16em] text-gold-300 backdrop-blur-sm">
          <MapPin size={11} />
          {myth.culture}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold leading-snug text-gold-200 transition-colors duration-300 group-hover:text-glow-gold">
          {myth.title}
        </h3>

        <p className="mt-3 font-body text-base leading-relaxed text-mist-300/80">
          {myth.summary}
        </p>

        <div className="mt-auto pt-5">
          <p className="flex items-center gap-2 font-body text-sm italic text-amethyst-300/70">
            <User size={13} />
            {myth.author}
          </p>

          <button
            onClick={onRead}
            className="group/btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-gradient-to-r from-night-800 to-night-700 px-5 py-2.5 font-display text-sm uppercase tracking-[0.16em] text-gold-300 transition-all duration-500 hover:border-gold-400 hover:from-amethyst-600/40 hover:to-night-700 hover:text-gold-200 hover:shadow-[0_0_28px_-4px_rgba(212,168,56,0.6)]"
          >
            <BookOpen size={15} className="transition-transform duration-500 group-hover/btn:scale-110" />
            Читать
          </button>
        </div>
      </div>
    </article>
  );
}
