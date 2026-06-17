import { useState } from 'react';
import Icon from '@/components/ui/icon';

const covers = [
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/f6c61476-c62d-4543-ad80-f4fc1dde0104.jpg',
];

const AiBubble = ({ name, emoji, children }: { name: string; emoji: string; children: React.ReactNode }) => (
  <div className="flex gap-3">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-lg">{emoji}</span>
    <div className="rounded-2xl rounded-tl-sm bg-card p-4 shadow-sm">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-gold">{name}</p>
      <div className="mt-1.5 font-serif text-base text-card-foreground">{children}</div>
    </div>
  </div>
);

const steps = ['Проверка', 'Сценарий', 'Исполнитель', 'Сборка'];

const Studio = ({ onArtist }: { onArtist: () => void }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(false);

  const startBuild = () => {
    setProgress(true);
    setTimeout(() => setProgress(false), 2600);
  };

  return (
    <div className="flex h-full flex-col bg-background paper-texture">
      <div className="border-b border-border px-5 py-4">
        <h1 className="font-serif text-2xl font-semibold text-foreground">🎬 Студия</h1>
        <div className="mt-3 flex gap-1.5">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full ${i <= step ? 'bg-gold' : 'bg-border'}`} />
              <p className={`mt-1 text-center text-[10px] font-medium ${i <= step ? 'text-gold' : 'text-muted-foreground'}`}>{s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar px-5 py-5">
        {step === 0 && (
          <div className="animate-fade-in space-y-4">
            <AiBubble name="Пограничник" emoji="🛡️">
              Рукопись проверена — запрещённого контента нет. Можно создавать трейлер!
            </AiBubble>
            <button onClick={() => setStep(1)} className="w-full rounded-xl bg-gold py-3 font-sans font-semibold text-primary-foreground gold-glow active:scale-95">
              Далее → Сценарий
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in space-y-4">
            <AiBubble name="Режиссёр" emoji="🎬">
              Предлагаю две раскадровки для трейлера. Какая ближе?
            </AiBubble>
            {['Туманный сад → колокол → силуэт в окне', 'Крупный план свечи → тень на стене → хлопок крыльев'].map((sc, i) => (
              <button key={i} onClick={() => setStep(2)} className="w-full rounded-xl border border-border bg-card p-4 text-left transition active:scale-95">
                <p className="font-sans text-xs font-semibold text-gold">Вариант {i + 1}</p>
                <p className="mt-1 font-serif text-base text-card-foreground">{sc}</p>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <AiBubble name="Режиссёр" emoji="🎬">Отлично! Кто создаст визуал?</AiBubble>
            <button onClick={() => setStep(3)} className="w-full rounded-xl border border-gold/40 bg-card p-4 text-left transition active:scale-95">
              <p className="font-serif text-lg text-card-foreground">🦇 Попросить Художника</p>
              <p className="mt-0.5 font-sans text-xs text-muted-foreground">Бесплатная генерация нейросетью</p>
            </button>
            <button onClick={onArtist} className="w-full rounded-xl border border-border bg-card p-4 text-left transition active:scale-95">
              <p className="font-serif text-lg text-card-foreground">🎨 Нанять мастера</p>
              <p className="mt-0.5 font-sans text-xs text-muted-foreground">Маркетплейс художников-людей</p>
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in space-y-4">
            <AiBubble name="Художник" emoji="🦇">Готово! Выбери обложку:</AiBubble>
            <div className="grid grid-cols-3 gap-2">
              {covers.map((c, i) => (
                <div key={i} className="overflow-hidden rounded-lg border-2 border-transparent transition active:border-gold">
                  <img src={c} alt="variant" className="aspect-[3/4] w-full object-cover" />
                </div>
              ))}
            </div>
            {progress ? (
              <div className="rounded-xl bg-card p-4">
                <p className="font-sans text-sm text-card-foreground">Сборка трейлера…</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                  <div className="animate-loading h-full bg-gold" />
                </div>
              </div>
            ) : (
              <button onClick={startBuild} className="w-full rounded-xl bg-gold py-3 font-sans font-semibold text-primary-foreground gold-glow active:scale-95">
                Собрать трейлер
              </button>
            )}
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/40 py-3 font-sans font-semibold text-gold active:scale-95">
              <Icon name="Upload" size={18} /> Опубликовать в ленту
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studio;
