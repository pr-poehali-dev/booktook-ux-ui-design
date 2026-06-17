import { useEffect, useState } from 'react';
import BatLogo from './BatLogo';

const Splash = ({ onEnter }: { onEnter: () => void }) => {
  const [phase, setPhase] = useState<'intro' | 'show' | 'ready'>('intro');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 300);
    const t2 = setTimeout(() => setPhase('ready'), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#1E1E1E] overflow-hidden">
      {/* Фоновое зарево — пульсирует в ритм взмахов */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: phase === 'intro' ? 0 : 1 }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#C9A96E]/12 blur-[72px] bat-glow-pulse" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-[#C9A96E]/18 blur-[40px] bat-glow-pulse" style={{ animationDelay: '0.3s' }} />
      </div>

      {/* Текстура */}
      <div className="pointer-events-none absolute inset-0 paper-texture opacity-60" />

      {/* Частицы пыли */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-[#C9A96E] dust-particle"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 15}%`,
            animationDelay: `${i * 0.4}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Основной блок */}
      <div
        className="flex flex-col items-center transition-all duration-700"
        style={{
          opacity: phase === 'intro' ? 0 : 1,
          transform: phase === 'intro' ? 'translateY(24px) scale(0.92)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Летучая мышь с золотым сиянием */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-36 w-36 rounded-full bg-[#C9A96E]/20 blur-2xl bat-glow-pulse" />
          <div className="relative text-[#C9A96E]">
            <BatLogo size={140} animate />
          </div>
        </div>

        {/* Логотип */}
        <h1
          className="mt-5 font-script text-7xl text-[#C9A96E] transition-all duration-500"
          style={{
            textShadow: '0 0 40px rgba(201,169,110,0.5), 0 2px 12px rgba(201,169,110,0.3)',
            opacity: phase === 'show' || phase === 'ready' ? 1 : 0,
            transitionDelay: '0.2s',
          }}
        >
          BookTook
        </h1>

        <p
          className="mt-3 font-serif text-lg italic text-[#D4C9B8]/75 tracking-wide transition-opacity duration-500"
          style={{ opacity: phase === 'ready' ? 1 : 0, transitionDelay: '0.1s' }}
        >
          Твоя история начинается здесь
        </p>
      </div>

      {/* Индикатор загрузки */}
      <div className="absolute bottom-16 flex w-52 flex-col items-center gap-4">
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-[#D4C9B8]/12">
          {phase !== 'intro' && (
            <div className="animate-loading absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#C9A96E]/30 via-[#C9A96E] to-[#C9A96E]/30" />
          )}
        </div>

        <button
          onClick={onEnter}
          className="group flex items-center gap-2 font-sans text-xs uppercase tracking-[0.35em] text-[#C9A96E]/60 transition-all duration-300 hover:text-[#C9A96E]"
          style={{ opacity: phase === 'ready' ? 1 : 0, transition: 'opacity 0.5s, color 0.3s' }}
        >
          <span className="inline-block h-px w-4 bg-[#C9A96E]/40 transition-all group-hover:w-6 group-hover:bg-[#C9A96E]" />
          Войти
          <span className="inline-block h-px w-4 bg-[#C9A96E]/40 transition-all group-hover:w-6 group-hover:bg-[#C9A96E]" />
        </button>
      </div>
    </div>
  );
};

export default Splash;
