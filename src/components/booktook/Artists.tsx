import { useState } from 'react';
import Icon from '@/components/ui/icon';

const artists = [
  { name: 'Вера Глейзер', tag: '@vera.art', rating: '4.9', works: 128 },
  { name: 'Олег Тень', tag: '@oleg.shade', rating: '4.8', works: 94 },
  { name: 'Мира Кальт', tag: '@mira.k', rating: '5.0', works: 211 },
];

const works = [
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/f6c61476-c62d-4543-ad80-f4fc1dde0104.jpg',
];

const Artists = () => {
  const [deal, setDeal] = useState(false);

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-background paper-texture px-5 pb-24 pt-6">
      <h1 className="font-serif text-4xl font-semibold text-foreground">🎨 Крыло Художника</h1>
      <p className="mt-1 font-sans text-sm text-muted-foreground">Мастера для обложек и трейлеров</p>

      <div className="mt-6 space-y-4">
        {artists.map((a) => (
          <div key={a.tag} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-gold/10 font-serif text-xl text-gold">
                {a.name[0]}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-serif text-lg font-medium text-foreground">{a.name}</h3>
                  <Icon name="BadgeCheck" size={16} className="text-gold" />
                </div>
                <p className="font-sans text-xs text-muted-foreground">{a.tag} · {a.works} работ</p>
              </div>
              <div className="flex items-center gap-1 text-gold">
                <Icon name="Star" size={14} fill="currentColor" />
                <span className="font-sans text-sm font-semibold">{a.rating}</span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {works.map((w, i) => (
                <img key={i} src={w} alt="work" className="aspect-square w-full rounded-lg object-cover" />
              ))}
            </div>
            <button onClick={() => setDeal(true)} className="mt-3 w-full rounded-lg bg-gold py-2.5 font-sans font-semibold text-primary-foreground transition active:scale-95">
              Связаться и заключить сделку
            </button>
          </div>
        ))}
      </div>

      {deal && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDeal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-t-3xl bg-card p-6 animate-fade-in">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
            <h2 className="font-serif text-2xl font-semibold text-foreground">Протокол безопасной сделки</h2>
            <p className="mt-1 flex items-center gap-1 font-sans text-xs text-muted-foreground">
              <Icon name="Shield" size={14} className="text-gold" /> Защищено Казначеем
            </p>

            <div className="mt-4 space-y-3">
              <p className="font-sans text-sm font-medium text-foreground">Тип оплаты</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="rounded-lg border-2 border-gold bg-gold/10 p-3 text-left">
                  <p className="font-sans text-sm font-semibold text-foreground">Фиксированная</p>
                  <p className="font-sans text-xs text-muted-foreground">Сумма заморожена</p>
                </button>
                <button className="rounded-lg border border-border p-3 text-left">
                  <p className="font-sans text-sm font-semibold text-foreground">Процент с продаж</p>
                  <p className="font-sans text-xs text-muted-foreground">Для готовых к выпуску</p>
                </button>
              </div>

              <div className="rounded-xl bg-background p-4 text-center">
                <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">Таймер сделки</p>
                <p className="mt-1 font-serif text-3xl font-semibold text-gold">Осталось: 7 дней</p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg border border-border py-2 font-sans text-xs font-medium text-foreground">Продлить срок</button>
                  <button className="flex-1 rounded-lg border border-border py-2 font-sans text-xs font-medium text-foreground">Сократить срок</button>
                </div>
              </div>

              <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                <Icon name="Scale" size={12} className="mb-0.5 mr-1 inline text-gold" />
                Автоарбитраж: срок истёк — возврат денег. Работа сдана и не принята за 48 ч — перевод художнику.
              </p>

              <button onClick={() => setDeal(false)} className="mt-2 w-full rounded-xl bg-gold py-3 font-sans font-semibold text-primary-foreground gold-glow active:scale-95">
                Заключить сделку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
