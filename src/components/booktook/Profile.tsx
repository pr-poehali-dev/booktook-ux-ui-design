import { useState } from 'react';
import Icon from '@/components/ui/icon';

const shelf = [
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/f6c61476-c62d-4543-ad80-f4fc1dde0104.jpg',
];

const Profile = ({ isArtist, onToggleArtist }: { isArtist: boolean; onToggleArtist: () => void }) => {
  const [tab, setTab] = useState(0);
  const tabs = isArtist
    ? ['Мастерская', 'Библиотека', 'Портфолио']
    : ['Мастерская', 'Библиотека', 'Опубликовано'];

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-background paper-texture pb-24">
      <div className="relative px-5 pt-8">
        <button onClick={() => alert('Кошелёк · Казначей')} className="absolute right-5 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Icon name="Wallet" size={20} />
        </button>

        <div className="flex flex-col items-center">
          <div className="relative">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold bg-card font-serif text-4xl text-gold gold-glow">
              Э
            </span>
            {isArtist && (
              <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-base">
                🎨
              </span>
            )}
          </div>
          <h1 className="mt-3 flex items-center gap-1 font-serif text-3xl font-semibold text-foreground">
            Эвелина Морн {isArtist && <span className="text-gold">✨</span>}
          </h1>
          <p className="font-sans text-sm text-muted-foreground">@evelina.morn</p>

          <div className="mt-4 flex gap-8">
            {[['128', 'Подписки'], ['4.2K', 'Подписчики'], ['58K', 'Лайки']].map(([n, l]) => (
              <div key={l} className="text-center">
                <p className="font-serif text-xl font-semibold text-foreground">{n}</p>
                <p className="font-sans text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>

          <button onClick={onToggleArtist} className="mt-4 flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2 font-sans text-sm font-medium text-gold transition active:scale-95">
            <Icon name={isArtist ? 'Check' : 'Palette'} size={16} />
            {isArtist ? 'Художник · проверен' : 'Стать художником'}
          </button>
        </div>
      </div>

      <div className="mt-6 flex border-b border-border px-5">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`flex-1 border-b-2 pb-3 font-sans text-sm font-medium transition ${
              tab === i ? 'border-gold text-gold' : 'border-transparent text-muted-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-5 pt-6">
        <p className="mb-4 text-center font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {tab === 2 && isArtist ? 'Полка с картинами' : 'Полка с книгами'}
        </p>
        <div className="relative">
          <div className="flex items-end justify-center gap-3 [perspective:800px]">
            {shelf.map((c, i) => (
              <div
                key={i}
                className="animate-float overflow-hidden rounded-md shadow-xl transition"
                style={{
                  transform: `rotateY(${(i - 1) * 18}deg) translateZ(${i === 1 ? 30 : 0}px)`,
                  width: i === 1 ? 120 : 96,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <img src={c} alt="book" className="aspect-[3/4] w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="mx-auto mt-1 h-3 w-full max-w-xs rounded-sm bg-gradient-to-b from-[#5c3d1e] to-[#3a2511] shadow-lg" />
          <div className="mx-auto h-2 w-[92%] rounded-b-md bg-[#2a1a0c]" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
