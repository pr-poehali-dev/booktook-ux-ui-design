import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import type { Store, BookItem, Shelf } from './store';
import { ALL_BOOKS } from './store';

const drafts = [
  { id: 1, title: 'Песнь полуночных колоколов', words: '24 100' },
  { id: 2, title: 'Сад забытых имён', words: '8 420' },
  { id: 3, title: 'Хранитель пепельной башни', words: '41 980' },
];

const tabs = [
  { id: 'workshop', label: 'Мастерская', icon: 'PenLine' },
  { id: 'library', label: 'Библиотека', icon: 'Library' },
  { id: 'published', label: 'Опубликовано', icon: 'BookOpen' },
];

/* ── Карточка книги (мини-модал) ── */
function BookModal({ book, store, onClose }: { book: BookItem; store: Store; onClose: () => void }) {
  const bought = store.shelves.some((s) => s.books.find((b) => b.id === book.id));
  const isInCart = store.inCart(book.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md animate-slide-up overflow-hidden rounded-t-3xl bg-card pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-56 w-full overflow-hidden">
          <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
            <Icon name="X" size={18} />
          </button>
          <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-0.5 font-sans text-xs font-semibold text-primary-foreground">{book.genre}</span>
        </div>
        <div className="px-6 pt-3">
          <h2 className="font-serif text-2xl font-semibold text-foreground">{book.title}</h2>
          <p className="mt-0.5 font-sans text-sm text-gold">@{book.author}</p>
          <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground">{book.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-serif text-2xl font-bold text-foreground">₽ {book.price}</span>
            {bought ? (
              <span className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-muted py-3 font-sans text-sm font-medium text-muted-foreground">
                <Icon name="Check" size={18} /> Уже куплено
              </span>
            ) : (
              <button
                onClick={() => { store.addToCart(book); onClose(); }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-sans font-semibold transition active:scale-95 ${isInCart ? 'border border-gold text-gold' : 'bg-gold text-primary-foreground gold-glow'}`}
              >
                <Icon name={isInCart ? 'ShoppingCart' : 'ShoppingBag'} size={18} />
                {isInCart ? 'В корзине' : 'В корзину'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Корзина ── */
function CartSheet({ store, onClose }: { store: Store; onClose: () => void }) {
  const [paid, setPaid] = useState(false);

  const handlePay = () => {
    setPaid(true);
    // Добавляем все книги из корзины на первую полку
    store.cart.forEach((b) => {
      if (store.shelves[0]) store.addBookToShelf(store.shelves[0].id, b);
    });
    setTimeout(() => { store.clearCart(); onClose(); setPaid(false); }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md animate-slide-up rounded-t-3xl bg-card pb-8 pt-2" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
        <div className="flex items-center justify-between px-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">Корзина</h2>
          <button onClick={onClose}><Icon name="X" size={20} className="text-muted-foreground" /></button>
        </div>

        {paid ? (
          <div className="flex flex-col items-center py-10 gap-3 animate-fade-in">
            <span className="text-5xl">🦇</span>
            <p className="font-serif text-xl text-gold">Оплата прошла!</p>
            <p className="font-sans text-sm text-muted-foreground">Книги добавлены в библиотеку</p>
          </div>
        ) : store.cart.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-2">
            <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
            <p className="font-sans text-sm text-muted-foreground">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="mt-4 max-h-64 overflow-y-auto no-scrollbar space-y-2 px-6">
              {store.cart.map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-xl bg-background p-3">
                  <img src={b.cover} alt={b.title} className="h-14 w-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-medium text-foreground truncate">{b.title}</p>
                    <p className="font-sans text-xs text-muted-foreground">{b.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-semibold text-gold">₽ {b.price}</span>
                    <button onClick={() => store.removeFromCart(b.id)} className="text-muted-foreground active:scale-90">
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 px-6">
              <div className="flex justify-between py-2 border-t border-border">
                <span className="font-sans text-sm text-muted-foreground">Итого</span>
                <span className="font-serif text-xl font-bold text-foreground">₽ {store.cartTotal}</span>
              </div>
              <p className="mt-1 mb-3 font-sans text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="Shield" size={12} className="text-gold" /> Защищено Казначеем · безопасная оплата
              </p>
              <button onClick={handlePay} className="w-full rounded-xl bg-gold py-3.5 font-sans font-semibold text-primary-foreground gold-glow active:scale-95">
                Оплатить ₽ {store.cartTotal}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Одна полка ── */
function ShelfRow({ shelf, store, onBookClick, onDelete }: {
  shelf: Shelf;
  store: Store;
  onBookClick: (b: BookItem) => void;
  onDelete: (id: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(shelf.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const confirmRename = () => {
    store.renameShelf(shelf.id, name.trim() || shelf.name);
    setEditing(false);
  };

  return (
    <div className="mt-5">
      {/* Заголовок полки */}
      <div className="flex items-center gap-2 px-1 mb-2">
        {editing ? (
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={confirmRename}
            onKeyDown={(e) => e.key === 'Enter' && confirmRename()}
            autoFocus
            className="flex-1 bg-transparent font-serif text-lg font-semibold text-foreground outline-none border-b border-gold"
          />
        ) : (
          <h3 className="flex-1 font-serif text-lg font-semibold text-foreground">{shelf.name}</h3>
        )}
        <button onClick={() => { setEditing(true); setTimeout(() => inputRef.current?.select(), 50); }}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition active:scale-90">
          <Icon name="Pencil" size={15} />
        </button>
        <button onClick={() => onDelete(shelf.id)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-destructive/70 transition active:scale-90">
          <Icon name="Trash2" size={15} />
        </button>
      </div>

      {/* Горизонтальный скролл книг */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
          {shelf.books.length === 0 && (
            <p className="font-sans text-sm text-muted-foreground py-2">Полка пуста</p>
          )}
          {shelf.books.map((book) => (
            <button key={book.id} onClick={() => onBookClick(book)}
              className="shrink-0 group relative overflow-hidden rounded-lg shadow-md transition active:scale-95 hover:shadow-xl"
              style={{ width: 80 }}>
              <img src={book.cover} alt={book.title} className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-1 left-1 right-1 font-serif text-[10px] leading-tight text-white line-clamp-2">{book.title}</p>
              <button
                onClick={(e) => { e.stopPropagation(); store.removeBookFromShelf(shelf.id, book.id); }}
                className="absolute right-1 top-1 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <Icon name="X" size={10} />
              </button>
            </button>
          ))}
          {/* Добавить книгу на полку */}
          <AddBookToShelf shelfId={shelf.id} store={store} />
        </div>
        {/* Деревянная доска */}
        <div className="h-2.5 mx-1 rounded-sm bg-gradient-to-b from-[#6b4423] to-[#3d2510] shadow-md" />
        <div className="h-1.5 mx-3 rounded-b bg-[#2e1c0e]" />
      </div>
    </div>
  );
}

/* ── Кнопка добавления книги на полку ── */
function AddBookToShelf({ shelfId, store }: { shelfId: number; store: Store }) {
  const [open, setOpen] = useState(false);
  const shelf = store.shelves.find((s) => s.id === shelfId);

  const available = ALL_BOOKS.filter((b) => !shelf?.books.find((sb) => sb.id === b.id));

  return (
    <div className="relative shrink-0">
      <button onClick={() => setOpen((v) => !v)}
        className="flex h-full w-16 min-h-[80px] items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition active:scale-95 hover:border-gold hover:text-gold">
        <Icon name="Plus" size={22} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-52 rounded-xl border border-border bg-card shadow-xl animate-scale-in">
          <p className="px-3 pt-3 pb-1 font-sans text-xs text-muted-foreground uppercase tracking-wide">Выбери книгу</p>
          {available.length === 0 && <p className="px-3 pb-3 font-sans text-xs text-muted-foreground">Все книги уже на полке</p>}
          {available.map((b) => (
            <button key={b.id} onClick={() => { store.addBookToShelf(shelfId, b); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left transition hover:bg-background active:scale-95">
              <img src={b.cover} alt={b.title} className="h-10 w-7 rounded object-cover" />
              <div className="min-w-0">
                <p className="font-sans text-xs font-medium text-foreground truncate">{b.title}</p>
                <p className="font-sans text-[10px] text-muted-foreground">{b.author}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Главный компонент ── */
interface MyBooksProps {
  onEditor: () => void;
  onStudio: () => void;
  store: Store;
}

const MyBooks = ({ onEditor, onStudio, store }: MyBooksProps) => {
  const [tab, setTab] = useState('workshop');
  const [showCart, setShowCart] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [addingShelf, setAddingShelf] = useState(false);
  const [newShelfName, setNewShelfName] = useState('');

  const handleAddShelf = () => {
    if (newShelfName.trim()) {
      store.addShelf(newShelfName.trim());
      setNewShelfName('');
      setAddingShelf(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-background paper-texture pb-24 pt-6">
      {/* Шапка с корзиной */}
      <div className="flex items-center justify-between px-5">
        <h1 className="font-serif text-4xl font-semibold text-foreground">Мои книги</h1>
        <button onClick={() => setShowCart(true)} className="relative flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-foreground transition active:scale-90">
          <Icon name="ShoppingCart" size={20} />
          {store.cart.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-primary-foreground">
              {store.cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Вкладки */}
      <div className="mt-5 mx-5 flex gap-2 rounded-xl bg-card p-1.5 shadow-sm">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-xs font-medium transition ${tab === t.id ? 'bg-gold text-primary-foreground' : 'text-muted-foreground'}`}>
            <Icon name={t.icon} size={18} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Мастерская ── */}
      {tab === 'workshop' && (
        <div className="mt-6 px-5 space-y-3 animate-fade-in">
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

      {/* ── Библиотека — полки ── */}
      {tab === 'library' && (
        <div className="animate-fade-in">
          {store.shelves.map((shelf) => (
            <div key={shelf.id} className="px-5">
              <ShelfRow
                shelf={shelf}
                store={store}
                onBookClick={setSelectedBook}
                onDelete={(id) => store.removeShelf(id)}
              />
            </div>
          ))}

          {/* Добавить полку */}
          <div className="mt-6 px-5">
            {addingShelf ? (
              <div className="flex gap-2 items-center animate-fade-in">
                <input
                  value={newShelfName}
                  onChange={(e) => setNewShelfName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddShelf()}
                  placeholder="Название полки…"
                  autoFocus
                  className="flex-1 rounded-xl border border-gold/40 bg-card px-4 py-2.5 font-sans text-sm text-foreground outline-none"
                />
                <button onClick={handleAddShelf} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-primary-foreground active:scale-90">
                  <Icon name="Check" size={18} />
                </button>
                <button onClick={() => setAddingShelf(false)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground active:scale-90">
                  <Icon name="X" size={18} />
                </button>
              </div>
            ) : (
              <button onClick={() => setAddingShelf(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 font-sans text-sm font-medium text-muted-foreground transition hover:border-gold hover:text-gold active:scale-95">
                <Icon name="Plus" size={18} /> Добавить полку
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Опубликовано ── */}
      {tab === 'published' && (
        <div className="mt-6 px-5 grid grid-cols-2 gap-4 animate-fade-in">
          {ALL_BOOKS.slice(0, 4).map((b) => (
            <button key={b.id} onClick={() => setSelectedBook(b)} className="overflow-hidden rounded-xl shadow-md active:scale-95">
              <div className="relative aspect-[3/4]">
                <img src={b.cover} alt={b.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 font-serif text-xs font-medium text-white leading-snug">{b.title}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Модалки */}
      {selectedBook && <BookModal book={selectedBook} store={store} onClose={() => setSelectedBook(null)} />}
      {showCart && <CartSheet store={store} onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default MyBooks;
