import BatLogo from './BatLogo';

const Splash = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#1E1E1E] paper-texture overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C9A96E]/10 blur-3xl" />

      <div className="flex flex-col items-center animate-fade-in">
        <div className="animate-float text-[#C9A96E] gold-glow rounded-full p-2">
          <BatLogo size={120} animate />
        </div>
        <h1 className="mt-6 font-script text-6xl text-[#C9A96E] drop-shadow-[0_2px_8px_rgba(201,169,110,0.35)]">
          BookTook
        </h1>
        <p className="mt-3 font-serif text-lg italic text-[#D4C9B8]/80">
          Твоя история начинается здесь
        </p>
      </div>

      <div className="absolute bottom-16 flex w-48 flex-col items-center gap-3">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#D4C9B8]/15">
          <div className="animate-loading h-full bg-gradient-to-r from-[#C9A96E]/40 to-[#C9A96E]" />
        </div>
        <button
          onClick={onEnter}
          className="font-sans text-xs uppercase tracking-[0.3em] text-[#C9A96E]/70 transition hover:text-[#C9A96E]"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Splash;
