import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, GlassCard } from '../components/UI';
import { TimelineEvent } from '../types';

const events: TimelineEvent[] = [
  {
    year: '2019',
    title: 'First Glance',
    description: "We met at a small coffee shop in Paris. It was raining, and Alexander offered his umbrella.",
    image: 'https://picsum.photos/seed/meet/600/400'
  },
  {
    year: '2020',
    title: 'First Date',
    description: "Our first official date was a walk along the Seine followed by a late dinner.",
    image: 'https://picsum.photos/seed/date/600/400'
  },
  {
    year: '2022',
    title: 'Moving In',
    description: "We decided to build a home together, filling it with laughter, plants, and too many books.",
    image: 'https://picsum.photos/seed/home/600/400'
  },
  {
    year: '2023',
    title: 'The Proposal',
    description: "On a quiet hike in the Swiss Alps, Alexander got down on one knee.",
    image: 'https://picsum.photos/seed/proposal/600/400'
  }
];

const LoveStory = () => {
  return (
    <div className="pt-32 pb-24 bg-champagne-50 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle title="Our Journey" subtitle="How it all began" />
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-champagne-300/50 hidden md:block"></div>

          {events.map((event, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row items-center mb-24 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content */}
              <div className="w-full md:w-1/2 px-6 mb-8 md:mb-0">
                <GlassCard className={`relative ${index % 2 === 0 ? 'text-left md:text-left' : 'text-left md:text-right'}`}>
                  <span className="text-6xl font-serif text-champagne-200 absolute -top-8 left-4 md:left-auto md:right-4 z-0 opacity-50">
                    {event.year}
                  </span>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif text-champagne-800 mb-3">{event.title}</h3>
                    <p className="text-gray-600 font-sans leading-relaxed">{event.description}</p>
                  </div>
                </GlassCard>
              </div>

              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-champagne-500 rounded-full border-4 border-white shadow-md hidden md:block z-20"></div>

              {/* Image */}
              <div className="w-full md:w-1/2 px-6">
                <div className="overflow-hidden rounded-lg shadow-xl luxury-border">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center mt-12">
             <h3 className="font-serif text-3xl text-champagne-800">And Forever to Go...</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoveStory;
