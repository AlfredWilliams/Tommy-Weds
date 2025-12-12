import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle, GlassCard, RevealImage } from '../components/UI';
import { TimelineEvent } from '../types';
import { X } from 'lucide-react';

const events: TimelineEvent[] = [
  {
    year: '',
    title: 'First Glance',
    description: "",
    image: '/assets/images/old1.jpg'
  },
  {
    year: '',
    title: 'First Date',
    description: "",
    image: '/assets/images/old2.jpg'
  },
  {
    year: '2025',
    title: 'The Proposal',
    description: "On a lovely day, Thomas got down on one knee.",
    image: '/assets/images/t8.jpg'
  }
];

const LoveStory = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-24 bg-champagne-50 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle title="Our Journey" subtitle="How it all began" />
        
        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2 z-50"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage}
                alt="Full screen memory"
                className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
              />
            </motion.div>
          )}
        </AnimatePresence>

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
                  {event.year && (
                    <span className="text-6xl font-serif text-champagne-200 absolute -top-8 left-4 md:left-auto md:right-4 z-0 opacity-50">
                      {event.year}
                    </span>
                  )}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif text-champagne-800 mb-3">{event.title}</h3>
                    {event.description && (
                      <p className="text-gray-600 font-sans leading-relaxed">{event.description}</p>
                    )}
                  </div>
                </GlassCard>
              </div>

              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-champagne-500 rounded-full border-4 border-white shadow-md hidden md:block z-20"></div>

              {/* Image */}
              <div className="w-full md:w-1/2 px-6">
                <div 
                  className="relative overflow-hidden rounded-lg shadow-xl luxury-border group cursor-pointer h-96"
                  onClick={() => setSelectedImage(event.image)}
                >
                  <RevealImage 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="text-white border border-white/50 px-4 py-2 rounded-sm uppercase tracking-widest text-xs backdrop-blur-sm">View Full Size</span>
                  </div>
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
