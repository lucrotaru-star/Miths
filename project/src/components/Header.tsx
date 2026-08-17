import { BookOpen, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isMuted, setMuted, startAmbient, stopAmbient } from '@/lib/sound';

interface HeaderProps {
  current: 'home' | 'contacts';
  onNavigate: (page: 'home' | 'contacts') => void;
}

export default function Header({ current, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    return () => stopAmbient();
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setMuted(!next);
    if (next) startAmbient();
    else stopAmbient();
  };

  const go = (page: 'home' | 'contacts') => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="absolute inset-0 -z-10 bg-night-950/70 backdrop-blur-md" />
      <div className="gold-divider absolute bottom-0 left-0 right-0" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          onClick={() => go('home')}
          className="group flex items-center gap-3 text-left"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 bg-night-800/60 text-gold-400 transition-all duration-500 group-hover:border-gold-400 group-hover:text-gold-300 group-hover:shadow-[0_0_24px_-2px_rgba(212,168,56,0.6)]">
            <BookOpen size={18} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-wide text-gold-300 text-glow-gold">
              Библиотека мифов
            </span>
            <span className="block font-body text-sm italic text-mist-300/70">
              Мифы и легенды народов мира
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 sm:flex">
          <NavButton
            label="Главная"
            active={current === 'home'}
            onClick={() => go('home')}
          />
          <NavButton
            label="Контакты"
            active={current === 'contacts'}
            onClick={() => go('contacts')}
          />
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/30 text-gold-400 transition hover:border-gold-400 hover:text-gold-300"
            aria-label={soundOn ? 'Выключить звук' : 'Включить звук'}
            title={soundOn ? 'Выключить звук' : 'Включить звук'}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/30 text-gold-400 transition hover:border-gold-400 hover:text-gold-300 sm:hidden"
            aria-label="Меню"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-rise border-t border-gold-500/20 bg-night-950/95 px-5 py-4 sm:hidden">
          <div className="flex flex-col gap-3">
            <NavButton
              label="Главная"
              active={current === 'home'}
              onClick={() => go('home')}
              full
            />
            <NavButton
              label="Контакты"
              active={current === 'contacts'}
              onClick={() => go('contacts')}
              full
            />
          </div>
        </div>
      )}
    </header>
  );
}

function NavButton({
  label,
  active,
  onClick,
  full,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative font-display text-sm uppercase tracking-[0.18em] transition-colors duration-300 ${
        full ? 'w-full text-left py-2' : ''
      } ${
        active
          ? 'text-gold-300'
          : 'text-mist-300/70 hover:text-gold-300'
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-gold-400 to-transparent transition-all duration-500 ${
          active ? 'w-full' : 'w-0'
        } ${full ? 'left-0' : ''}`}
      />
    </button>
  );
}
