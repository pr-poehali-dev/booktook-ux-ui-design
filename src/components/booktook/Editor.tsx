import { useState } from 'react';
import Icon from '@/components/ui/icon';

const initialText = `Колокола молчали уже третью ночь.

Эвелина прижалась к холодному стеклу и смотрела, как туман медленно поглощает сад. Где-то там, за пеленой, её ждал ответ — или окончательная тишина.

Она знала: стоит сделать шаг за порог, и обратной дороги не будет.`;

const chat = [
  { from: 'ai', text: 'Сильное начало! Атмосфера тревоги задана с первой строки.' },
  { from: 'me', text: 'Как усилить напряжение в третьем абзаце?' },
  { from: 'ai', text: 'Попробуй добавить тактильную деталь — что Эвелина чувствует кончиками пальцев. Это заземлит страх.' },
];

const Editor = () => {
  const [showChat, setShowChat] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [title, setTitle] = useState('Песнь полуночных колоколов');

  return (
    <div className="relative flex h-full flex-col bg-background paper-texture">
      <div className="border-b border-border px-5 py-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent font-serif text-2xl font-semibold text-foreground outline-none"
        />
        <p className="mt-0.5 font-sans text-xs text-muted-foreground">Сохранено · 24 100 слов</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col items-center gap-4 border-r border-border bg-card/50 px-2 py-5">
          <button onClick={() => setShowHint((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold transition active:scale-90">
            <span className="text-xl">🦇</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition active:scale-90">
            <Icon name="Sparkles" size={18} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition active:scale-90">
            <Icon name="BookMarked" size={18} />
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto no-scrollbar px-5 py-6">
          {showHint && (
            <div className="mb-5 flex gap-3 rounded-xl border border-gold/30 bg-gold/10 p-4 animate-scale-in">
              <span className="text-xl">🦇</span>
              <div>
                <p className="font-sans text-xs font-semibold uppercase tracking-wide text-gold">Личный Помощник</p>
                <p className="mt-1 font-serif text-base italic text-foreground">
                  «Туман» встречается дважды близко. Заменим один на «дымку»?
                </p>
              </div>
              <button onClick={() => setShowHint(false)} className="ml-auto text-muted-foreground">
                <Icon name="X" size={16} />
              </button>
            </div>
          )}
          <p className="whitespace-pre-line font-serif text-lg leading-relaxed text-foreground">{initialText}</p>
        </div>
      </div>

      <button
        onClick={() => setShowChat(true)}
        className="absolute bottom-24 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-lg transition active:scale-90 gold-glow"
      >
        <Icon name="MessageSquare" size={24} />
      </button>

      {showChat && (
        <div className="absolute inset-0 z-20 flex flex-col bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🦇</span>
              <h3 className="font-serif text-xl font-medium text-foreground">Личный Помощник</h3>
            </div>
            <button onClick={() => setShowChat(false)} className="text-muted-foreground">
              <Icon name="X" size={22} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar px-5 py-5">
            {chat.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 font-sans text-sm ${
                  m.from === 'me' ? 'bg-gold text-primary-foreground' : 'flex gap-2 bg-card text-card-foreground'
                }`}>
                  {m.from === 'ai' && <span>🦇</span>}
                  <span>{m.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border px-4 py-3">
            <input placeholder="Спросить Помощника…" className="flex-1 rounded-full bg-card px-4 py-2.5 font-sans text-sm text-foreground outline-none" />
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-primary-foreground">
              <Icon name="Send" size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
