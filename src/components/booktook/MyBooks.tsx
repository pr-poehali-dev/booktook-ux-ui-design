import { useState } from 'react';
import Icon from '@/components/ui/icon';

const drafts = [
  { id: 1, title: 'Песнь полуночных колоколов', words: '24 100' },
  { id: 2, title: 'Сад забытых имён', words: '8 420' },
  { id: 3, title: 'Хранитель пепельной башни', words: '41 980' },
];

const covers = [
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
  'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/f6c61476-c62d-4543-ad80-f4fc1dde0104.jpg',
];

const tabs = [
  { id: 'workshop', label: 'Мастерская', icon: 'PenLine' },
  { id: 'library', label: 'Библиотека', icon: 'Library' },
  { id: 'published', label: 'Опубликовано', icon: 'BookOpen' },
];

const MyBooks = ({ onEditor, onStudio }: { onEditor: () => void; onStudio: () => void }) => {
  const [tab, setTab] = useState('workshop');

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-background paper-texture px-5 pb-24 pt-6">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Мои книги</h1>

      <div className="mt-5 flex gap-2 rounded-xl bg-card p-1.5 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-xs font-medium transition ${
              tab === t.id ? 'bg-gold text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            <Icon name={t.icon} size={18} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'workshop' && (
        <div className="mt-6 space-y-3 animate-fade-in">
          {drafts.map((d) => (
            <div key={d.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-3">
                  <h3 className="font-serif text-xl font-medium text-foreground">{d.title}</h3>
                  <p className="mt-0.5 font-sans text-xs text-muted-foreground">{d.words} слов · черновик</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={onEditor} className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold transition active:scale-90">
                    <Icon name="BookOpen" size={18} />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive transition active:scale-90">
                    <Icon name="Trash2" size={18} />
                  </button>
                </div>
              </div>
              <button onClick={onStudio} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gold/40 py-2 font-sans text-sm font-medium text-gold transition active:scale-95">
                <Icon name="Clapperboard" size={16} /> Студия — обложка и трейлер
              </button>
            </div>
          ))}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 font-sans font-semibold text-primary-foreground shadow-md transition active:scale-95 gold-glow">
            <Icon name="Plus" size={20} /> Создать новый проект
          </button>
        </div>
      )}

      {(tab === 'library' || tab === 'published') && (
        <div className="mt-6 grid grid-cols-2 gap-4 animate-fade-in">
          {covers.concat(covers).map((c, i) => (
            <div key={i} className="overflow-hidden rounded-xl shadow-md">
              <div className="relative aspect-[3/4]">
                <img src={c} alt="cover" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 font-serif text-sm font-medium text-white">
                  {tab === 'library' ? 'Куплено' : 'В свет выпущено'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
