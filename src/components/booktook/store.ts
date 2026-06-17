import { useState, useCallback } from 'react';

export interface BookItem {
  id: number;
  cover: string;
  title: string;
  author: string;
  description: string;
  price: number;
  genre: string;
}

export interface Shelf {
  id: number;
  name: string;
  books: BookItem[];
}

export const ALL_BOOKS: BookItem[] = [
  {
    id: 1,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
    title: 'Песнь полуночных колоколов',
    author: 'Эвелина Морн',
    description: 'Когда колокола замолчали на третью ночь, Эвелина поняла — замок живёт. Готический роман о тайне, потере и той темноте, что прячется не снаружи, а внутри нас.',
    price: 349,
    genre: 'Готика',
  },
  {
    id: 2,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
    title: 'Сад забытых имён',
    author: 'Тимур Вечный',
    description: 'В лесу, где каждый светлячок — чья-то незаконченная мечта, молодой маг ищет имя, которое у него похитили при рождении. Эпическое фэнтези о памяти и идентичности.',
    price: 299,
    genre: 'Фэнтези',
  },
  {
    id: 3,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/f6c61476-c62d-4543-ad80-f4fc1dde0104.jpg',
    title: 'Хранитель пепельной башни',
    author: 'Лидия Осень',
    description: 'Библиотека помнила всех — и тех, кто осмелился мечтать, и тех, кто боялся открыть первую страницу. Магический реализм на грани элегии.',
    price: 419,
    genre: 'Магреализм',
  },
  {
    id: 4,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
    title: 'Тени под крыльями',
    author: 'Эвелина Морн',
    description: 'Вторая книга цикла. Тьма разрослась, и граница между сном и явью стала тоньше папиросной бумаги. Продолжение бестселлера.',
    price: 379,
    genre: 'Готика',
  },
  {
    id: 5,
    cover: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
    title: 'Ледяные зеркала',
    author: 'Нора Фрост',
    description: 'Среди вечных льдов есть зеркала, которые показывают не отражение, а будущее. Детектив и мистика в одном флаконе.',
    price: 289,
    genre: 'Мистика',
  },
];

const INITIAL_SHELVES: Shelf[] = [
  { id: 1, name: 'Моя библиотека', books: [ALL_BOOKS[0], ALL_BOOKS[2]] },
  { id: 2, name: 'Хочу прочитать', books: [ALL_BOOKS[1]] },
];

export function useStore() {
  const [cart, setCart] = useState<BookItem[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>(INITIAL_SHELVES);
  const [nextShelfId, setNextShelfId] = useState(3);

  /* ─── КОРЗИНА ─── */
  const addToCart = useCallback((book: BookItem) => {
    setCart((prev) => prev.find((b) => b.id === book.id) ? prev : [...prev, book]);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((s, b) => s + b.price, 0);
  const inCart = useCallback((id: number) => cart.some((b) => b.id === id), [cart]);

  /* ─── ПОЛКИ ─── */
  const addShelf = useCallback((name: string) => {
    setShelves((prev) => [...prev, { id: nextShelfId, name, books: [] }]);
    setNextShelfId((n) => n + 1);
  }, [nextShelfId]);

  const removeShelf = useCallback((id: number) => {
    setShelves((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const renameShelf = useCallback((id: number, name: string) => {
    setShelves((prev) => prev.map((s) => s.id === id ? { ...s, name } : s));
  }, []);

  const addBookToShelf = useCallback((shelfId: number, book: BookItem) => {
    setShelves((prev) => prev.map((s) =>
      s.id === shelfId && !s.books.find((b) => b.id === book.id)
        ? { ...s, books: [...s.books, book] }
        : s
    ));
  }, []);

  const removeBookFromShelf = useCallback((shelfId: number, bookId: number) => {
    setShelves((prev) => prev.map((s) =>
      s.id === shelfId ? { ...s, books: s.books.filter((b) => b.id !== bookId) } : s
    ));
  }, []);

  return {
    cart, addToCart, removeFromCart, clearCart, cartTotal, inCart,
    shelves, addShelf, removeShelf, renameShelf, addBookToShelf, removeBookFromShelf,
  };
}

export type Store = ReturnType<typeof useStore>;
