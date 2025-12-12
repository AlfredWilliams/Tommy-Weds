import { type FC } from 'react';
import { SectionTitle, GlassCard } from '../components/UI';
import { MapPin, Clock, Info } from 'lucide-react';
import { WeddingEvent } from '../types';

const eventsList: WeddingEvent[] = [
  {
    title: 'The Wedding Ceremony',
    time: '11:00 AM',
    location: 'Adjumako Entumbil',
    address: 'Adjumako Entumbil, Ghana',
    description: 'Join us as we exchange vows and celebrate our union. Please arrive promptly to be seated.',
    icon: 'ceremony',
    mapUrl: 'https://maps.google.com/maps?q=Adjumako+Entumbil&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  {
    title: 'Reception & Celebration',
    time: 'Immediately Following',
    location: 'Adjumako Entumbil',
    address: 'Adjumako Entumbil, Ghana',
    description: 'The celebration continues at the same beautiful location with dining, music, and dancing.',
    icon: 'party',
    mapUrl: ''
  }
];

const Events = () => {
  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle title="The Wedding Details" subtitle="When & Where" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
           {/* Left Column: Events */}
           <div className="space-y-8">
             {eventsList.map((evt, idx) => (
               <GlassCard key={idx} className="border-l-4 border-champagne-400">
                 <div className="flex items-start">
                    <div className="bg-champagne-100 p-3 rounded-full mr-4 text-champagne-700">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-champagne-900 mb-1">{evt.title}</h3>
                      <p className="text-champagne-600 font-medium mb-2">{evt.time}</p>
                      <div className="flex items-center text-gray-500 mb-2 text-sm">
                        <MapPin size={16} className="mr-1" />
                        {evt.location}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{evt.description}</p>
                    </div>
                 </div>
               </GlassCard>
             ))}
             
             <div className="bg-white p-6 rounded shadow-sm border border-champagne-200 mt-8">
                <h4 className="font-serif text-xl mb-4 flex items-center text-champagne-800">
                  <Info size={20} className="mr-2" /> Dress Code
                </h4>
                <p className="text-gray-600">
                  <span className="font-semibold text-champagne-900">Style Guide.</span> You can wear anything of your choice but look gentle and neat.
                </p>
             </div>
           </div>

           {/* Right Column: Map */}
           <div className="h-full min-h-[400px] lg:min-h-auto rounded-lg overflow-hidden shadow-xl border-4 border-white relative">
             <iframe 
               src={eventsList[0].mapUrl} 
               width="100%" 
               height="100%" 
               style={{ border: 0, minHeight: '100%' }} 
               allowFullScreen 
               loading="lazy"
               title="Wedding Location"
               className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
             ></iframe>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
