import { useState } from 'react';
import { Mail, MapPin, Send, Scroll, MessageSquare, User } from 'lucide-react';

export default function ContactsPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="relative px-5 pt-20 pb-12">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="text-center">
          <p className="animate-fade-rise font-display text-xs uppercase tracking-[0.4em] text-amethyst-300/70">
            Шёпот из глубин библиотеки
          </p>
          <h1
            className="animate-fade-rise mt-5 font-display text-4xl font-bold text-glow-gold sm:text-5xl"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="shimmer-text">Контакты</span>
          </h1>
          <div
            className="animate-fade-rise ornament-line mx-auto mt-5 max-w-xs"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="font-display text-xs">✦</span>
          </div>
          <p
            className="animate-fade-rise mx-auto mt-5 max-w-lg font-body text-lg text-mist-300/75"
            style={{ animationDelay: '0.3s' }}
          >
            Хранители библиотеки всегда готовы ответить. Оставьте послание — и
            оно будет прочитано при свете масляных ламп.
          </p>
        </div>

        {/* Info cards */}
        <div
          className="animate-fade-rise mt-12 grid gap-5 sm:grid-cols-3"
          style={{ animationDelay: '0.4s' }}
        >
          <InfoCard
            icon={<Mail size={18} />}
            title="Почта хранителей"
            lines={['librarian@myths.archive', 'Ответ в течение трёх дней']}
          />
          <InfoCard
            icon={<MapPin size={18} />}
            title="Обитель"
            lines={['Склеп древних свитков', 'Улица Безмолвных Созвездий, 7']}
          />
          <InfoCard
            icon={<Scroll size={18} />}
            title="Часы чтения"
            lines={['Ежедневно', 'От заката до первых лучей']}
          />
        </div>

        {/* Form */}
        <div
          className="animate-fade-rise mt-10 overflow-hidden rounded-2xl border border-gold-500/20 bg-night-900/70 p-7 sm:p-10 card-glow"
          style={{ animationDelay: '0.5s' }}
        >
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-gold-200">
            <MessageSquare size={18} className="text-amethyst-300" />
            Оставить послание
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <Field icon={<User size={15} />} label="Имя">
              <input
                type="text"
                required
                placeholder="Как к вам обращаться"
                className="w-full bg-transparent font-body text-lg text-mist-100 placeholder:text-mist-300/40 focus:outline-none"
              />
            </Field>

            <Field icon={<Mail size={15} />} label="Электронная почта">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent font-body text-lg text-mist-100 placeholder:text-mist-300/40 focus:outline-none"
              />
            </Field>

            <Field icon={<Scroll size={15} />} label="Послание">
              <textarea
                required
                rows={4}
                placeholder="Расскажите, что вас привело в библиотеку..."
                className="w-full resize-none bg-transparent font-body text-lg leading-relaxed text-mist-100 placeholder:text-mist-300/40 focus:outline-none"
              />
            </Field>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-gold-500/50 bg-gradient-to-r from-night-800 to-amethyst-600/30 px-7 py-3 font-display text-sm uppercase tracking-[0.2em] text-gold-300 transition-all duration-500 hover:border-gold-300 hover:from-amethyst-600/40 hover:to-night-700 hover:text-gold-200 hover:shadow-[0_0_36px_-6px_rgba(212,168,56,0.6)]"
            >
              <Send
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-1"
              />
              Отправить
            </button>

            {sent && (
              <p className="animate-fade-rise text-center font-body text-base italic text-gold-300">
                Ваше послание принято и затерялось среди свитков. Хранители
                отзовутся в свой срок.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="card-glow card-glow-hover group rounded-xl border border-gold-500/15 bg-night-900/60 p-5 text-center transition-all duration-500 hover:-translate-y-1">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold-500/30 bg-night-800/60 text-gold-400 transition-all duration-500 group-hover:border-gold-400 group-hover:text-gold-300 group-hover:shadow-[0_0_22px_-4px_rgba(212,168,56,0.6)]">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-gold-200">
        {title}
      </h3>
      {lines.map((l, i) => (
        <p
          key={i}
          className={`mt-1.5 font-body text-base ${
            i === 0 ? 'text-mist-200/85' : 'italic text-mist-300/55'
          }`}
        >
          {l}
        </p>
      ))}
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 font-display text-xs uppercase tracking-[0.18em] text-amethyst-300/80">
        {icon}
        {label}
      </span>
      <div className="rounded-lg border border-gold-500/20 bg-night-950/50 px-4 py-3 transition-colors duration-300 focus-within:border-gold-400/60 focus-within:shadow-[0_0_24px_-8px_rgba(212,168,56,0.5)]">
        {children}
      </div>
    </label>
  );
}
