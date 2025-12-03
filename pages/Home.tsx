import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, GoldButton } from '../components/UI';
import { Link } from 'react-router-dom';

const Countdown = () => {
  const targetDate = new Date('2025-12-20T16:00:00').getTime();
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
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/thomas.png" 
            alt="Couple" 
            className="w-full h-full object-cover brightness-[0.6] scale-105 animate-[float_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 drop-shadow-xl">
              Thomas <span className="text-champagne-300 italic">&</span> Vivian
            </h1>
            <p className="text-white/90 font-serif text-xl md:text-2xl italic tracking-wide mb-12">
              December 20th, 2025 • Villa Cetinale, Tuscany
            </p>

            <p className="text-champagne-200 text-sm md:text-base uppercase tracking-[0.4em] mb-6 font-sans">
              Save the Date
            </p>
            
            <div className="mb-12">
               <Countdown />
            </div>

            <Link to="/events">
              <GoldButton className="min-w-[200px]">Explore the Wedding</GoldButton>
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 w-full flex justify-center animate-bounce opacity-50">
           <div className="w-[1px] h-16 bg-white/50"></div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-champagne-50 relative">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <SectionTitle title="A Love Story Begins" subtitle="Join Us" />
          <p className="font-serif text-xl md:text-2xl text-champagne-800 leading-relaxed opacity-80 mb-10">
            "We met under the stars and fell in love under the sun. Now, we invite you to join us as we begin our greatest adventure yet in the rolling hills of Tuscany."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded shadow-sm border border-champagne-100">
               <h3 className="font-serif text-2xl text-champagne-800 mb-2">The Ceremony</h3>
               <p className="text-gray-600 font-sans text-sm">4:00 PM in the Gardens</p>
            </div>
            <div className="bg-white p-8 rounded shadow-sm border border-champagne-100">
               <h3 className="font-serif text-2xl text-champagne-800 mb-2">The Reception</h3>
               <p className="text-gray-600 font-sans text-sm">6:00 PM in the Ballroom</p>
            </div>
            <div className="bg-white p-8 rounded shadow-sm border border-champagne-100">
               <h3 className="font-serif text-2xl text-champagne-800 mb-2">After Party</h3>
               <p className="text-gray-600 font-sans text-sm">11:00 PM by the Pool</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;