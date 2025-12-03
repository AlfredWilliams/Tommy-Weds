import React from 'react';
import { SectionTitle } from '../components/UI';
import { PartyMember } from '../types';
import { motion } from 'framer-motion';

const party: PartyMember[] = [
  { name: 'Sarah Miller', role: 'Maid of Honor', bio: 'Sister of the bride and best friend since birth.', image: 'https://picsum.photos/seed/sarah/400/500', side: 'bride' },
  { name: 'Emily Davis', role: 'Bridesmaid', bio: 'College roommate and travel companion.', image: 'https://picsum.photos/seed/emily/400/500', side: 'bride' },
  { name: 'Jessica Chen', role: 'Bridesmaid', bio: 'Childhood friend and partner in crime.', image: 'https://picsum.photos/seed/jessica/400/500', side: 'bride' },
  { name: 'James Wilson', role: 'Best Man', bio: 'Brother of the groom and fellow adventurer.', image: 'https://picsum.photos/seed/james/400/500', side: 'groom' },
  { name: 'Michael Brown', role: 'Groomsman', bio: 'High school soccer teammate.', image: 'https://picsum.photos/seed/mike/400/500', side: 'groom' },
  { name: 'David Lee', role: 'Groomsman', bio: 'University friend and architect.', image: 'https://picsum.photos/seed/david/400/500', side: 'groom' },
];

const PartyCard: React.FC<{ member: PartyMember }> = ({ member }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
  >
    <div className="h-80 overflow-hidden relative">
      <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <p className="text-white text-sm font-light italic">"{member.bio}"</p>
      </div>
    </div>
    <div className="p-6 text-center border-b-4 border-champagne-300">
      <h3 className="font-serif text-xl text-champagne-900">{member.name}</h3>
      <p className="text-xs uppercase tracking-widest text-champagne-500 mt-2">{member.role}</p>
    </div>
  </motion.div>
);

const Party = () => {
  const bridesmaids = party.filter(p => p.side === 'bride');
  const groomsmen = party.filter(p => p.side === 'groom');

  return (
    <div className="pt-32 pb-24 bg-champagne-50 min-h-screen">
      <div className="container mx-auto px-6">
        <SectionTitle title="The Wedding Party" subtitle="Our Favorite People" />
        
        <div className="mb-20">
          <h3 className="text-center font-serif text-3xl text-champagne-800 mb-10 italic">The Bridesmaids</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bridesmaids.map((p, i) => <PartyCard key={i} member={p} />)}
          </div>
        </div>

        <div>
          <h3 className="text-center font-serif text-3xl text-champagne-800 mb-10 italic">The Groomsmen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groomsmen.map((p, i) => <PartyCard key={i} member={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Party;