import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle, GoldButton, RevealImage } from '../components/UI';

const Countdown = () => {
  const targetDate = new Date('2025-12-20T11:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-4 md:mx-8">
      <span className="text-3xl md:text-5xl font-serif text-white font-medium drop-shadow-md">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-champagne-100 mt-2 font-sans opacity-80">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center py-8">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

const Home = () => {
  const heroImages = [
    '/assets/images/thomas.png',
    '/assets/images/1.png',
    '/assets/images/2.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentImageIndex}
              src={heroImages[currentImageIndex]} 
              alt="Couple" 
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 drop-shadow-xl">
              Thomas <span className="text-champagne-300 italic">&</span> Vivian
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          >
            <p className="text-white/90 font-serif text-xl md:text-2xl italic tracking-wide mb-12">
              December 20th, 2025 • Adjumako Entumbil.
            </p>

            <p className="text-champagne-200 text-sm md:text-base uppercase tracking-[0.4em] mb-6 font-sans">
              Save the Date
            </p>
            
            <div className="mb-12">
               <Countdown />
            </div>

            <a href="#/events">
              <GoldButton className="min-w-[200px]">Explore the Wedding</GoldButton>
            </a>
          </motion.div>
        </div>
        
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.5 }}
           transition={{ delay: 3, duration: 1 }}
           className="absolute bottom-10 w-full flex justify-center animate-bounce"
        >
           <div className="w-[1px] h-16 bg-white/50"></div>
        </motion.div>

        {/* Progressive Loading Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 z-20">
          <motion.div 
            key={currentImageIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 9, ease: "linear" }}
            className="h-full bg-champagne-400"
          />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-champagne-50 relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <SectionTitle title="A Love Story Begins" subtitle="Join Us" />
          <p className="font-serif text-xl md:text-2xl text-champagne-800 leading-relaxed opacity-80 mb-10">
            "We met in school when life was simple and love was the last thing on our minds. But one moment changed everything a  shared laugh, a gentle glance, and suddenly the world felt softer. From study partners to soul partners, we’ve grown through seasons, storms, and dreams. Now, with hearts full of gratitude, we invite you to witness the beginning of our forever as we say ‘I do.’"
          </p>
          <div className="mt-16 flex justify-center">
            <div className="bg-white p-12 rounded shadow-sm border border-champagne-100 max-w-2xl w-full">
               <h3 className="font-serif text-3xl text-champagne-800 mb-6">The Celebration</h3>
               <div className="space-y-4 text-gray-600 font-sans">
                 <p className="text-xl font-medium text-champagne-900 uppercase tracking-widest">Adjumako Entumbil</p>
                 <p className="text-2xl font-serif text-champagne-700">Starting at 11:00 AM</p>
                 <div className="w-24 h-[1px] bg-champagne-200 mx-auto my-6"></div>
                 <p className="italic text-lg">Ceremony, Reception & After Party</p>
                 <p className="text-sm opacity-70 mt-2">All events will be held at this beautiful location.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Gallery Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionTitle title="Captured Moments" subtitle="A Glimpse" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[700px]">
            
            {/* Column 1 - Images */}
            <div className="flex flex-col gap-6 h-[500px] md:h-full">
              <div className="relative overflow-hidden rounded-lg shadow-md flex-1 group cursor-pointer">
                 <RevealImage src="/assets/images/t1.jpg" alt="Thomas & Vivian" className="w-full h-full" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md flex-1 group cursor-pointer">
                 <RevealImage src="/assets/images/t7.jpg" alt="Thomas & Vivian" className="w-full h-full" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

            {/* Column 2 - Video (Center) */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl border border-champagne-200 h-[600px] md:h-full transform md:-translate-y-4 md:shadow-2xl z-10 bg-black group">
              <video 
                src="/assets/videos/output.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-500" 
              />
              <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="text-white/90 font-serif text-lg italic tracking-widest drop-shadow-md">Love in Motion</p>
              </div>
            </div>

            {/* Column 3 - Images */}
            <div className="flex flex-col gap-6 h-[500px] md:h-full">
              <div className="relative overflow-hidden rounded-lg shadow-md flex-1 group cursor-pointer">
                 <RevealImage src="/assets/images/t11.jpg" alt="Thomas & Vivian" className="w-full h-full" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-md flex-1 group cursor-pointer">
                 <RevealImage src="/assets/images/t8.jpg" alt="Thomas & Vivian" className="w-full h-full" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </div>
            </div>

          </div>

          <div className="text-center mt-16">
            <a href="#/gallery">
              <button className="text-champagne-600 uppercase tracking-widest text-xs border-b border-champagne-300 pb-2 hover:text-champagne-800 hover:border-champagne-600 transition-all">
                  View Full Gallery
              </button>
            </a>
          </div>

        </div>
      </section>

      {/* Share Your Memories Section */}
      <section className="py-20 bg-champagne-50 border-t border-champagne-100">
        <div className="container mx-auto px-6 text-center">
          <SectionTitle title="Share Your Memories" subtitle="Capture the Moment" />
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white shadow-xl rounded-lg border-2 border-champagne-300 mb-8 max-w-xs transform hover:scale-105 transition-transform duration-500">
              <img src="/assets/images/qrcode.png" alt="Upload QR Code" className="w-full h-auto" />
            </div>
            <p className="text-gray-600 font-serif text-lg mb-8 max-w-lg mx-auto leading-relaxed">
              Help us capture every moment! Scan the code or click the button below to upload your photos and videos directly to our digital wedding album.
            </p>
            <a href="#/upload">
              <GoldButton>Upload Photos Now</GoldButton>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
