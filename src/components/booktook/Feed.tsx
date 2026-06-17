import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Book {
  id: number;
  image: string;
  quote: string;
  author: string;
  hashtags: string[];
  likes: string;
  comments: string;
  tint: string;
}

const books: Book[] = [
  {
    id: 1,
    image: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3bed98dc-b5ab-4985-85f3-79302207887d.jpg',
    quote: 'Тьма не приходит снаружи. Она всегда жила в нас.',
    author: 'Эвелина Морн',
    hashtags: ['#готика', '#тайна', '#замок'],
    likes: '12.4K',
    comments: '843',
    tint: 'from-[#3a0d10]/60',
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/3d41b6bf-317d-45cc-a5dc-41056711102a.jpg',
    quote: 'Каждый светлячок в этом лесу — чья-то незаконченная мечта.',
    author: 'Тимур Вечный',
    hashtags: ['#фэнтези', '#магия', '#приключение'],
    likes: '8.9K',
    comments: '612',
    tint: 'from-[#0d1f3a]/60',
  },
  {
    id: 3,
    image: 'https://cdn.poehali.dev/projects/0bb88797-d7ad-41ed-aa71-b38ecd05ac7c/files/f6c61476-c62d-4543-ad80-f4fc1dde0104.jpg',
    quote: 'Библиотека помнила всех, кто однажды осмелился мечтать.',
    author: 'Лидия Осень',
    hashtags: ['#драма', '#книги', '#ностальгия'],
    likes: '21.1K',
    comments: '1.2K',
    tint: 'from-[#1f1a0d]/60',
  },
];

const ActionButton = ({ icon, count, active, onClick }: { icon: string; count?: string; active?: boolean; onClick?: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 transition active:scale-90">
    <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm ${active ? 'text-rose-400' : 'text-white'}`}>
      <Icon name={icon} size={22} fill={active ? 'currentColor' : 'none'} />
    </span>
    {count && <span className="text-xs font-medium text-white drop-shadow">{count}</span>}
  </button>
);

const Feed = ({ onAuthor }: { onAuthor: () => void }) => {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  return (
    <div className="h-full snap-y snap-mandatory overflow-y-scroll no-scrollbar bg-black">
      {books.map((book) => (
        <section key={book.id} className="relative h-full w-full snap-start">
          <img src={book.image} alt={book.author} className="absolute inset-0 h-full w-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t ${book.tint} via-black/20 to-black/40`} />

          <div className="absolute right-3 bottom-32 flex flex-col items-center gap-5">
            <button onClick={onAuthor} className="transition active:scale-90">
              <span className="block h-12 w-12 rounded-full border-2 border-[#C9A96E] bg-[#2A2A2A] text-center font-serif text-xl leading-[44px] text-[#C9A96E]">
                {book.author[0]}
              </span>
            </button>
            <ActionButton icon="Heart" count={book.likes} active={liked[book.id]} onClick={() => setLiked((p) => ({ ...p, [book.id]: !p[book.id] }))} />
            <ActionButton icon="MessageCircle" count={book.comments} />
            <ActionButton icon="Share2" />
          </div>

          <div className="absolute bottom-28 left-5 right-20">
            <p className="font-serif text-3xl font-medium leading-tight text-white drop-shadow-lg">
              «{book.quote}»
            </p>
            <p className="mt-3 font-sans text-sm text-white/90">@{book.author}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {book.hashtags.map((h) => (
                <span key={h} className="font-sans text-sm font-medium text-[#C9A96E]">{h}</span>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Feed;
