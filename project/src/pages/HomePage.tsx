import { useState } from 'react';
import { ChevronDown, ScrollText } from 'lucide-react';
import { MYTHS, type Myth } from '@/data/myths';
import MythCard from '@/components/MythCard';
import MythModal from '@/components/MythModal';

export default function HomePage() {
  const [active, setActive] = useState<Myth | null>(null);

  const scrollToMyths = () => {
    document.getElementById('myths')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-[88vh] items-center justify-center px-5 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-rise font-display text-xs uppercase tracking-[0.4em] text-amethyst-300/80">
            Древние знания оживают
          </p>

          <h1
            className="animate-fade-rise mt-6 font-display text-5xl font-bold leading-[1.1] sm:text-6xl md:text-7xl"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="shimmer-text text-glow-gold">Библиотека мифов</span>
          </h1>

          <div
            className="animate-fade-rise ornament-line mx-auto mt-6 max-w-md"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="font-display text-sm">✦</span>
          </div>

          <p
            className="animate-fade-rise mx-auto mt-6 max-w-xl font-body text-xl leading-relaxed text-mist-200/85 text-glow-soft"
            style={{ animationDelay: '0.3s' }}
          >
            Шагните под своды древней библиотеки, где хранятся предания народов
            мира. Здесь оживают боги и герои, чудовища и творцы — голоса,
            звучащие сквозь тысячелетия.
          </p>

          <div
            className="animate-fade-rise mt-10 flex flex-col items-center gap-4"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={scrollToMyths}
              className="group inline-flex items-center gap-3 rounded-full border border-gold-500/50 bg-gradient-to-r from-night-800/80 to-amethyst-600/30 px-8 py-3.5 font-display text-sm uppercase tracking-[0.2em] text-gold-300 transition-all duration-500 hover:border-gold-300 hover:from-amethyst-600/40 hover:to-night-700 hover:text-gold-200 hover:shadow-[0_0_40px_-6px_rgba(212,168,56,0.6)]"
            >
              <ScrollText size={16} className="transition-transform duration-500 group-hover:scale-110" />
              Войти в библиотеку
            </button>

            <button
              onClick={scrollToMyths}
              aria-label="Прокрутить к мифам"
              className="animate-float-soft mt-6 grid h-11 w-11 place-items-center rounded-full border border-gold-500/30 text-gold-400/70 transition hover:border-gold-300 hover:text-gold-200"
            >
              <ChevronDown size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* ===================== MYTHS ===================== */}
      <section id="myths" className="relative px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-amethyst-300/70">
              Свитки древних преданий
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-gold-200 text-glow-gold sm:text-4xl">
              Собрание мифов
            </h2>
            <div className="ornament-line mx-auto mt-5 max-w-sm">
              <span className="font-display text-xs">✦</span>
            </div>
            <p className="mx-auto mt-5 max-w-xl font-body text-lg text-mist-300/70">
              Каждый свиток — окно в иной мир. Выберите предание и прикоснитесь
              к истории, рассказанной задолго до нас.
            </p>
          </div>

          {/* ============================================================
              СЕТКА КАРТОЧЕК МИФОВ
              --------------------------------------------------------------
              Карточки генерируются автоматически из массива MYTHS
              (см. src/data/myths.ts). Чтобы добавить новый миф —
              добавьте объект в массив; чтобы удалить — уберите.
              Никаких изменений в этом файле не требуется.
             ============================================================ */}
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {MYTHS.map((myth, i) => (
              <MythCard
                key={myth.id}
                myth={myth}
                index={i}
                onRead={() => setActive(myth)}
              />
            ))}
          </div>
        </div>
      </section>

      <MythModal myth={active} onClose={() => setActive(null)} />
    </>
  );
}
