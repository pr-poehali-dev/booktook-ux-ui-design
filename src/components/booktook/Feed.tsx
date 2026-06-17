import { useState } from 'react';
import Icon from '@/components/ui/icon';
import type { Store, BookItem } from './store';
import { ALL_BOOKS } from './store';

const feedBooks = [
  { ...ALL_BOOKS[0], quote: 'Тьма не приходит снаружи. Она всегда жила в нас.', hashtags: ['#готика', '#тайна', '#замок'], likes: '12.4K', comments: '843', tint: 'from-[#3a0d10]/70' },
  { ...ALL_BOOKS[1], quote: 'Каждый светлячок в этом лесу — чья-то незаконченная мечта.', hashtags: ['#фэнтези', '#магия', '#приключение'], likes: '8.9K', comments: '612', tint: 'from-[#0d1f3a]/70' },
  { ...ALL_BOOKS[2], quote: 'Библиотека помнила всех, кто однажды осмелился мечтать.', hashtags: ['#драма', '#книги', '#ностальгия'], likes: '21.1K', comments: '1.2K', tint: 'from-[#1f1a0d]/70' },
  { ...ALL_BOOKS[3], quote: 'Тьма разрослась, и граница между сном и явью стала тоньше.', hashtags: ['#готика', '#цикл', '#мрак'], likes: '6.3K', comments: '418', tint: 'from-[#2a0d10]/70' },
  { ...ALL_BOOKS[4], quote: 'Зеркала не лгут. Они просто показывают то, что мы боимся видеть.', hashtags: ['#мистика', '#детектив', '#лёд'], likes: '9.7K', comments: '531', tint: 'from-[#0d1a2a]/70' },
];

const ActionButton = ({ icon, count, active, onClick }: { icon: string; count?: string; active?: boolean; onClick?: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 transition active:scale-90">
    <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm ${active ? 'text-rose-400' : 'text-white'}`}>
      <Icon name={icon} size={22} fill={active ? 'currentColor' : 'none'} />
    </span>
    {count && <span className="text-xs font-medium text-white drop-shadow">{count}</span>}
  </button>
);

/* Мини-карточка книги из ленты */
function FeedBookModal({ book, store, onClose }: { book: BookItem; store: Store; onClose: () => void }) {
  const isInCart = store.inCart(book.id);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md animate-slide-up overflow-hidden rounded-t-3xl bg-card pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-48 overflow-hidden">
          <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white"><Icon name="X" size={16} /></button>
          <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-0.5 font-sans text-xs font-semibold text-primary-foreground">{book.genre}</span>
        </div>
        <div className="px-6 pt-3">
          <h2 className="font-serif text-2xl font-semibold text-foreground">{book.title}</h2>
          <p className="mt-0.5 font-sans text-sm text-gold">@{book.author}</p>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground line-clamp-3">{book.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-foreground">₽ {book.price}</span>
            <button
              onClick={() => { store.addToCart(book); onClose(); }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-sans font-semibold transition active:scale-95 ${isInCart ? 'border border-gold text-gold' : 'bg-gold text-primary-foreground gold-glow'}`}
            >
              <Icon name={isInCart ? 'ShoppingCart' : 'ShoppingBag'} size={18} />
              {isInCart ? 'Уже в корзине' : 'В корзину'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeedProps {
  onAuthor: () => void;
  store: Store;
}

const Feed = ({ onAuthor, store }: FeedProps) => {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  return (
    <div className="relative h-full">
      {/* Счётчик корзины — плавающий */}
      {store.cart.length > 0 && (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 shadow-lg animate-fade-in">
          <Icon name="ShoppingCart" size={16} className="text-primary-foreground" />
          <span className="font-sans text-xs font-bold text-primary-foreground">{store.cart.length}</span>
        </div>
      )}

      {/* Лента с snap-scroll */}
      <div className="h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar bg-black">
        {feedBooks.map((book) => (
          <section key={book.id} className="relative h-full w-full snap-start snap-always">
            <img src={book.cover} alt={book.author} className="absolute inset-0 h-full w-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t ${book.tint} via-black/10 to-black/50`} />

            {/* Правая колонка — действия */}
            <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5">
              <button onClick={onAuthor} className="transition active:scale-90">
                <span className="block h-12 w-12 rounded-full border-2 border-[#C9A96E] bg-[#2A2A2A] text-center font-serif text-xl leading-[44px] text-[#C9A96E]">
                  {book.author[0]}
                </span>
              </button>
              <ActionButton icon="Heart" count={book.likes} active={liked[book.id]}
                onClick={() => setLiked((p) => ({ ...p, [book.id]: !p[book.id] }))} />
              <ActionButton icon="MessageCircle" count={book.comments} />
              <ActionButton icon="Share2" />
              {/* Кнопка корзины */}
              <ActionButton
                icon="ShoppingBag"
                active={store.inCart(book.id)}
                onClick={() => store.inCart(book.id) ? null : setSelectedBook(book)}
              />
            </div>

            {/* Текст карточки */}
            <div className="absolute bottom-32 left-5 right-20">
              <button onClick={() => setSelectedBook(book)} className="text-left transition active:opacity-80">
                <p className="font-serif text-[26px] font-medium leading-tight text-white drop-shadow-lg">
                  «{book.quote}»
                </p>
              </button>
              <p className="mt-3 font-sans text-sm text-white/90">@{book.author}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {book.hashtags.map((h) => (
                  <span key={h} className="font-sans text-sm font-medium text-[#C9A96E]">{h}</span>
                ))}
              </div>
              {/* Быстрая цена */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => setSelectedBook(book)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-sm font-semibold backdrop-blur-sm transition active:scale-95 ${store.inCart(book.id) ? 'bg-gold/80 text-primary-foreground' : 'bg-white/20 text-white'}`}
                >
                  <Icon name={store.inCart(book.id) ? 'ShoppingCart' : 'ShoppingBag'} size={14} />
                  {store.inCart(book.id) ? 'В корзине' : `₽ ${book.price}`}
                </button>
              </div>
            </div>

            {/* Индикатор свайпа */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
              <Icon name="ChevronUp" size={20} />
            </div>
          </section>
        ))}
      </div>

      {selectedBook && (
        <FeedBookModal book={selectedBook} store={store} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default Feed;
