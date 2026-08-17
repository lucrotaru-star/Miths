import { useEffect } from 'react';
import { X, MapPin, User } from 'lucide-react';
import type { Myth } from '@/data/myths';
import { playChime, playClose } from '@/lib/sound';

interface MythModalProps {
  myth: Myth | null;
  onClose: () => void;
}

export default function MythModal({ myth, onClose }: MythModalProps) {
  useEffect(() => {
    if (!myth) return;
    playChime();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [myth, onClose]);

  const handleClose = () => {
    playClose();
    onClose();
  };

  if (!myth) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={myth.title}
    >
      {/* Overlay */}
      <button
        onClick={handleClose}
        aria-label="Закрыть"
        className="animate-overlay-in fixed inset-0 cursor-default bg-night-950/85 backdrop-blur-md"
      />

      {/* Panel */}
      <div className="animate-scale-in relative z-10 my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-gold-500/30 bg-night-900/95 shadow-[0_0_80px_-10px_rgba(168,125,224,0.4)]">
        {/* Banner */}
        <div className="relative h-44 sm:h-56">
          <img
            src={myth.image}
            alt={myth.title}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-amethyst-600/20 to-gold-500/10 mix-blend-overlay" />

          <button
            onClick={handleClose}
            aria-label="Закрыть"
            className="group absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-gold-400/40 bg-night-950/70 text-gold-300 backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-gold-300 hover:text-gold-200 hover:shadow-[0_0_24px_-2px_rgba(212,168,56,0.7)]"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-night-950/70 px-3 py-1 font-display text-[11px] uppercase tracking-[0.16em] text-gold-300 backdrop-blur-sm">
              <MapPin size={11} />
              {myth.culture}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-7 sm:px-10 sm:py-9">
          <h2 className="font-display text-2xl font-semibold leading-tight text-gold-200 text-glow-gold sm:text-3xl">
            {myth.title}
          </h2>

          <p className="mt-3 flex items-center gap-2 font-body text-sm italic text-amethyst-300/80">
            <User size={13} />
            {myth.author}
          </p>

          <div className="ornament-line my-6">
            <span className="font-display text-xs">✦</span>
          </div>

          <div className="space-y-4">
            {myth.fullText.map((para, i) => (
              <p
                key={i}
                className={`font-body text-lg leading-relaxed text-mist-200/85 ${
                  i === 0
                    ? 'first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-gold-400 first-letter:leading-[0.8]'
                    : ''
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="ornament-line mt-8">
            <span className="font-display text-xs">✦</span>
          </div>
        </div>
      </div>
    </div>
  );
}
