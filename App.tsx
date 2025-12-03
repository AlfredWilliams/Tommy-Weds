import React, { useState, createContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation, Footer, AudioPlayer } from './components/Layout';
import { ParticleBackground } from './components/UI';
import { Photo } from './types';

import Home from './pages/Home';
import LoveStory from './pages/LoveStory';
import Events from './pages/Events';
import Party from './pages/Party';
import Gallery, { QRUpload } from './pages/Gallery';
import RSVP from './pages/RSVP';

// --- Global Context ---
interface AppContextType {
  photos: Photo[];
  addPhoto: (photo: Partial<Photo>) => void;
}

export const AppContext = createContext<AppContextType>({
  photos: [],
  addPhoto: () => {},
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: 'https://picsum.photos/seed/wedding1/800/600', timestamp: Date.now(), approved: true, caption: 'The magical moment' },
    { id: '2', url: 'https://picsum.photos/seed/wedding2/600/800', timestamp: Date.now(), approved: true, caption: 'Details' },
    { id: '3', url: 'https://picsum.photos/seed/wedding3/800/800', timestamp: Date.now(), approved: true, caption: 'Us' },
    { id: '4', url: 'https://picsum.photos/seed/wedding4/800/600', timestamp: Date.now(), approved: true },
    { id: '5', url: 'https://picsum.photos/seed/wedding5/600/800', timestamp: Date.now(), approved: true },
  ]);

  const addPhoto = (photo: Partial<Photo>) => {
    const newPhoto: Photo = {
      id: Math.random().toString(36).substr(2, 9),
      url: photo.url || '',
      timestamp: Date.now(),
      approved: photo.approved || false,
      caption: photo.caption,
      uploadedBy: photo.uploadedBy
    };
    setPhotos(prev => [newPhoto, ...prev]);
  };

  return (
    <AppContext.Provider value={{ photos, addPhoto }}>
      <Router>
        <ScrollToTop />
        <ParticleBackground />
        
        <Routes>
          {/* Standalone QR Upload Page without Navbar/Footer */}
          <Route path="/upload" element={<QRUpload />} />
          
          {/* Main Website Routes */}
          <Route path="*" element={
            <>
              <Navigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/story" element={<LoveStory />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/party" element={<Party />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/rsvp" element={<RSVP />} />
                </Routes>
              </main>
              <Footer />
              <AudioPlayer />
            </>
          } />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
