import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';  
import Splash from '@/components/booktook/Splash';
import Feed from '@/components/booktook/Feed';
import MyBooks from '@/components/booktook/MyBooks';
import Editor from '@/components/booktook/Editor';
import Studio from '@/components/booktook/Studio';
import Artists from '@/components/booktook/Artists';
import Profile from '@/components/booktook/Profile';

type Screen = 'splash' | 'feed' | 'books' | 'editor' | 'studio' | 'artists' | 'profile';

const navItems: { id: Screen; icon: string; label: string }[] = [
  { id: 'feed', icon: 'Home', label: 'Лента' },
  { id: 'books', icon: 'BookMarked', label: 'Книги' },
  { id: 'artists', icon: 'Palette', label: 'Художники' },
  { id: 'profile', icon: 'User', label: 'Профиль' },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>('splash');
  const [dark, setDark] = useState(true);
  const [isArtist, setIsArtist] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const showNav = !['splash', 'editor', 'studio'].includes(screen);
  const backScreens: Record<string, Screen> = { editor: 'books', studio: 'books' };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-0 sm:p-6">
      <div className="relative h-screen w-full overflow-hidden bg-background shadow-2xl sm:h-[860px] sm:max-w-[400px] sm:rounded-[2.5rem] sm:border-8 sm:border-neutral-800">
        {/* Top bar */}
        {showNav && (
          <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-3">
            <span className="font-script text-2xl text-gold drop-shadow">BookTook</span>
          </div>
        )}

        {(screen === 'editor' || screen === 'studio') && (
          <button
            onClick={() => setScreen(backScreens[screen])}
            className="absolute left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-gold backdrop-blur-sm"
          >
            <Icon name="ArrowLeft" size={18} />
          </button>
        )}

        {/* Screens */}
        <div className={`h-full ${showNav ? 'pb-16' : ''} ${showNav && screen !== 'feed' ? 'pt-12' : ''}`}>
          {screen === 'splash' && <Splash onEnter={() => setScreen('feed')} />}
          {screen === 'feed' && <Feed onAuthor={() => setScreen('profile')} />}
          {screen === 'books' && <MyBooks onEditor={() => setScreen('editor')} onStudio={() => setScreen('studio')} />}
          {screen === 'editor' && <Editor />}
          {screen === 'studio' && <Studio onArtist={() => setScreen('artists')} />}
          {screen === 'artists' && <Artists />}
          {screen === 'profile' && <Profile isArtist={isArtist} onToggleArtist={() => setIsArtist((v) => !v)} dark={dark} onToggleDark={() => setDark((v) => !v)} />}
        </div>

        {/* Bottom nav */}
        {showNav && (
          <nav className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-border bg-card/90 px-2 py-2 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1 transition ${
                  screen === item.id ? 'text-gold' : 'text-muted-foreground'
                }`}
              >
                <Icon name={item.icon} size={22} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Index;