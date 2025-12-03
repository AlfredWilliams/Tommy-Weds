import React from 'react';
import { SectionTitle, GlassCard } from '../components/UI';
import { MapPin, Clock, Info } from 'lucide-react';
import { WeddingEvent } from '../types';

const eventsList: WeddingEvent[] = [
  {
    title: 'The Ceremony',
    time: '4:00 PM',
    location: 'Villa Cetinale Gardens',
    address: 'Strada Comunale di Cetinale, 9, 53018 Sovicille SI, Italy',
    description: 'Join us in the Italian gardens for an outdoor ceremony. Please arrive by 3:30 PM.',
    icon: 'ceremony',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.953885465943!2d11.215571315486836!3d43.29415697913506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a3bf60416955d%3A0x6b6771457883505!2sVilla%20Cetinale!5e0!3m2!1sen!2sus!4v1645564859384!5m2!1sen!2sus'
  },
  {
    title: 'Cocktail Hour',
    time: '5:30 PM',
    location: 'The Lemon Grove',
    address: 'Villa Cetinale, Upper Terrace',
    description: 'Drinks and hors d\'oeuvres will be served while the sun sets over the Tuscan hills.',
    icon: 'reception',
    mapUrl: ''
  },
  {
    title: 'Reception Dinner',
    time: '7:00 PM',
    location: 'Main Ballroom',
    address: 'Villa Cetinale',
    description: 'A three-course Italian dinner followed by speeches and dancing into the night.',
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
                  <span className="font-semibold text-champagne-900">Black Tie Optional.</span> Gentlemen are requested to wear a tuxedo or dark suit. Ladies are encouraged to wear floor-length gowns or formal cocktail dresses.
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
