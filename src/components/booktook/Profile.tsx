import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  cover: string;
  title: string;
  author: string;
  description: string;
  price: string;
  genre: string;
}

const books: Book[] = [
  {
    id: 1,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
    title: 'Песнь полуночных колоколов',
    author: 'Эвелина Морн',
    description: 'Когда колокола замолчали на третью ночь, Эвелина поняла — замок живёт. Готический роман о тайне, потере и той темноте, что прячется не снаружи, а внутри нас.',
    price: '₽ 349',
    genre: 'Готика',
  },
  {
    id: 2,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
    title: 'Сад забытых имён',
    author: 'Тимур Вечный',
    description: 'В лесу, где каждый светлячок — чья-то незаконченная мечта, молодой маг ищет имя, которое у него похитили при рождении. Эпическое фэнтези о памяти и идентичности.',
    price: '₽ 299',
    genre: 'Фэнтези',
  },
  {
    id: 3,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/f6c61476-c62d-4543-ad80-f4fc1dde0104.jpg',
    title: 'Хранитель пепельной башни',
    author: 'Лидия Осень',
    description: 'Библиотека помнила всех — и тех, кто осмелился мечтать, и тех, кто боялся открыть первую страницу. Магический реализм на грани элегии.',
    price: '₽ 419',
    genre: 'Магреализм',
  },
  {
    id: 4,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
    title: 'Тени под крыльями',
    author: 'Эвелина Морн',
    description: 'Вторая книга цикла. Тьма разрослась, и теперь граница между сном и явью стала тоньше папиросной бумаги.',
    price: '₽ 379',
    genre: 'Готика',
  },
  {
    id: 5,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
    title: 'Ледяные зеркала',
    author: 'Нора Фрост',
    description: 'Среди вечных льдов есть зеркала, которые показывают не отражение, а будущее. Детектив и мистика в одном флаконе.',
    price: '₽ 289',
    genre: 'Мистика',
  },
];

interface BookCardProps {
  book: Book;
  onClose: () => void;
}

const BookCard = ({ book, onClose }: BookCardProps) => (
  <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
    <div
      className="w-full max-w-md animate-slide-up overflow-hidden rounded-t-3xl bg-card pb-8"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Обложка-шапка */}
      <div className="relative h-64 w-full overflow-hidden">
        <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
        >
          <Icon name="X" size={18} />
        </button>
        <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-0.5 font-sans text-xs font-semibold text-primary-foreground">
          {book.genre}
        </span>
      </div>

      {/* Контент */}
      <div className="px-6 pt-2">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground">{book.title}</h2>
        <p className="mt-1 font-sans text-sm text-gold">@{book.author}</p>

        <p className="mt-4 font-serif text-base leading-relaxed text-muted-foreground">{book.description}</p>

        {/* Дополнительные превью */}
        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[book.cover, book.cover, book.cover].map((c, i) => (
            <img
              key={i}
              src={c}
              alt="preview"
              className="h-16 w-12 shrink-0 rounded-lg object-cover opacity-80 ring-1 ring-border"
            />
          ))}
        </div>

        {/* Кнопка купить */}
        <div className="mt-5 flex items-center gap-3">
          <span className="font-serif text-3xl font-bold text-foreground">{book.price}</span>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold py-3.5 font-sans font-semibold text-primary-foreground shadow-md transition active:scale-95 gold-glow">
            <Icon name="ShoppingBag" size={20} />
            Купить книгу
          </button>
        </div>
        <p className="mt-2 text-center font-sans text-xs text-muted-foreground">
          Защищено Казначеем · безопасная оплата
        </p>
      </div>
    </div>
  </div>
);

interface ProfileProps {
  isArtist: boolean;
  onToggleArtist: () => void;
  dark: boolean;
  onToggleDark: () => void;
}

const Profile = ({ isArtist, onToggleArtist, dark, onToggleDark }: ProfileProps) => {
  const [tab, setTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const tabs = isArtist
    ? ['Мастерская', 'Библиотека', 'Портфолио']
    : ['Мастерская', 'Библиотека', 'Опубликовано'];

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-background paper-texture pb-24">
      {/* Шапка профиля */}
      <div className="relative px-5 pt-8">
        {/* Бургер кнопка */}
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute right-5 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-foreground transition active:scale-90"
        >
          <Icon name="Menu" size={20} />
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

          <button
            onClick={onToggleArtist}
            className="mt-4 flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2 font-sans text-sm font-medium text-gold transition active:scale-95"
          >
            <Icon name={isArtist ? 'Check' : 'Palette'} size={16} />
            {isArtist ? 'Художник · проверен' : 'Стать художником'}
          </button>
        </div>
      </div>

      {/* Вкладки */}
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

      {/* Полка с книгами */}
      <div className="pt-5">
        <p className="mb-3 px-5 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {tab === 2 && isArtist ? 'Галерея работ' : 'Полка с книгами'}
        </p>

        {/* 3D-карусель — горизонтальный скролл */}
        <div className="relative">
          {/* Деревянная полка — фон */}
          <div className="px-5">
            <div
              className="flex items-end gap-4 overflow-x-auto no-scrollbar pb-2 pt-3"
              style={{ perspective: '900px' }}
            >
              {books.map((book, i) => (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="shrink-0 overflow-hidden rounded-lg shadow-xl transition-transform duration-200 active:scale-95 hover:scale-105"
                  style={{
                    width: 88,
                    transform: `rotateY(${(i % 3 - 1) * 8}deg)`,
                    animationDelay: `${i * 0.25}s`,
                  }}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Деревянная доска полки */}
            <div className="h-3.5 w-full rounded-sm bg-gradient-to-b from-[#6b4423] via-[#5c3a1e] to-[#3d2510] shadow-lg" />
            <div className="h-2 w-[97%] rounded-b-md bg-[#2e1c0e] shadow-md" />
          </div>
        </div>

        {/* Названия под полкой */}
        <div className="mt-4 px-5 space-y-1">
          <p className="font-sans text-xs text-muted-foreground">Нажми на книгу, чтобы открыть карточку</p>
        </div>
      </div>

      {/* Бургер-меню (bottom sheet) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-full max-w-md animate-slide-up rounded-t-3xl bg-card pb-8 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-border" />

            <h3 className="px-6 font-serif text-xl font-semibold text-foreground">Настройки</h3>

            <div className="mt-4 space-y-1 px-3">
              {/* Смена темы */}
              <button
                onClick={() => { onToggleDark(); setMenuOpen(false); }}
                className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition hover:bg-background active:scale-[0.98]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon name={dark ? 'Sun' : 'Moon'} size={20} />
                </span>
                <div>
                  <p className="font-sans font-medium text-foreground">{dark ? 'Светлая тема' : 'Тёмная тема'}</p>
                  <p className="font-sans text-xs text-muted-foreground">Сейчас: {dark ? 'тёмная' : 'светлая'}</p>
                </div>
                <Icon name="ChevronRight" size={18} className="ml-auto text-muted-foreground" />
              </button>

              {/* Кошелёк */}
              <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition hover:bg-background active:scale-[0.98]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon name="Wallet" size={20} />
                </span>
                <div>
                  <p className="font-sans font-medium text-foreground">Кошелёк · Казначей</p>
                  <p className="font-sans text-xs text-muted-foreground">Баланс: ₽ 1 240</p>
                </div>
                <Icon name="ChevronRight" size={18} className="ml-auto text-muted-foreground" />
              </button>

              {/* Уведомления */}
              <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition hover:bg-background active:scale-[0.98]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Icon name="Bell" size={20} />
                </span>
                <div>
                  <p className="font-sans font-medium text-foreground">Уведомления</p>
                  <p className="font-sans text-xs text-muted-foreground">Управление оповещениями</p>
                </div>
                <Icon name="ChevronRight" size={18} className="ml-auto text-muted-foreground" />
              </button>

              {/* Конфиденциальность */}
              <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition hover:bg-background active:scale-[0.98]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Icon name="Shield" size={20} />
                </span>
                <div>
                  <p className="font-sans font-medium text-foreground">Конфиденциальность</p>
                  <p className="font-sans text-xs text-muted-foreground">Приватность и безопасность</p>
                </div>
                <Icon name="ChevronRight" size={18} className="ml-auto text-muted-foreground" />
              </button>

              <div className="mx-4 my-2 border-t border-border" />

              {/* Выход */}
              <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition hover:bg-background active:scale-[0.98]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <Icon name="LogOut" size={20} />
                </span>
                <p className="font-sans font-medium text-destructive">Выйти из аккаунта</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Карточка книги */}
      {selectedBook && (
        <BookCard book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default Profile;
