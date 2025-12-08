import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Music, Music2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  // If not home, always use the scrolled style (white bg, dark text)
  const isSolid = !isHome || scrolled || isOpen;

  const navClass = `fixed w-full z-50 transition-all duration-500 ${
    isSolid ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
  }`;

  const linkClass = (isActive: boolean) => `
    text-sm uppercase tracking-[0.15em] hover:text-champagne-600 transition-colors
    ${isActive ? 'text-champagne-600 font-medium' : isSolid ? 'text-gray-800' : 'text-white'}
  `;

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className={`font-serif text-2xl font-bold tracking-tight z-50 ${isSolid ? 'text-champagne-800' : 'text-white'}`}>
          T & V
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {[
            ['Home', '/'],
            ['Story', '/story'],
            ['Events', '/events'],
            ['Party', '/party'],
            ['Gallery', '/gallery'],
            ['RSVP', '/rsvp'],
          ].map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => linkClass(isActive)}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/rsvp">
            <button className="px-5 py-2 bg-champagne-500 text-white text-xs uppercase tracking-widest hover:bg-champagne-600 transition-colors">
              RSVP
            </button>
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden z-50 ${isSolid ? 'text-gray-800' : 'text-white'}`}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-champagne-50 flex flex-col items-center justify-center space-y-8 md:hidden"
            >
               {[
                ['Home', '/'],
                ['Our Story', '/story'],
                ['The Wedding', '/events'],
                ['Wedding Party', '/party'],
                ['Gallery', '/gallery'],
                ['RSVP', '/rsvp'],
              ].map(([label, path]) => (
                <NavLink key={path} to={path} className="font-serif text-2xl text-champagne-900">
                  {label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-champagne-100 py-12 text-center border-t border-champagne-200">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl text-champagne-800 mb-4">Thomas & Vivian</h2>
      <p className="font-sans text-champagne-700 uppercase tracking-widest text-xs mb-8">December 20th, 2025 • Adjumako Entumbil</p>
      <div className="flex justify-center space-x-4 mb-8">
        <Heart className="text-champagne-400 fill-current" size={20} />
      </div>
      <p className="text-champagne-600 text-sm opacity-60">
        © 2025 Eternity. Designed by <a href="https://wa.me/233548272463" target="_blank" rel="noopener noreferrer" className="hover:text-champagne-800 underline transition-colors">Alfred kelvin Williams</a> with Love.
      </p>
    </div>
  </footer>
);

export const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Autoplay prevented", e));
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button 
        onClick={toggle}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur border border-champagne-300 flex items-center justify-center shadow-lg text-champagne-700 hover:bg-champagne-100 transition-all hover:scale-110"
      >
        {playing ? <Music2 size={20} className="animate-pulse" /> : <Music size={20} />}
      </button>
      <audio ref={audioRef} loop src="/assets/song.mp3" />
    </div>
  );
};
