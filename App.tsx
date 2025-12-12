import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation, Footer, AudioPlayer } from './components/Layout';
import { ParticleBackground } from './components/UI';
import { motion, AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import LoveStory from './pages/LoveStory';
import Events from './pages/Events';
import Gallery, { QRUpload } from './pages/Gallery';
import RSVP from './pages/RSVP';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Preloader Component ---
const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fcfbf7]"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="text-center px-4"
    >
      <h1 className="font-serif text-4xl md:text-6xl text-champagne-600 tracking-tight mb-2">
        Thomas <span className="italic text-champagne-400">&</span> Vivian
      </h1>
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "60px", opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="h-[1px] bg-champagne-400 mx-auto my-4"
      />
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="font-serif text-2xl md:text-3xl text-champagne-500 italic"
      >
        Wed
      </motion.p>
    </motion.div>
  </motion.div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="w-full"
        >
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
        </motion.div>
      )}
    </>
  );
};

export default App;
