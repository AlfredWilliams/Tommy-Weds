import { useState } from 'react';
import { SectionTitle, GoldButton, GlassCard } from '../components/UI';
import { RSVPStatus } from '../types';
import { Sparkles, Wand2 } from 'lucide-react';
import { generateWeddingWish } from '../services/geminiService';

const RSVP = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: RSVPStatus.ACCEPTED,
    guests: 1,
    diet: '',
    message: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleGenerateWish = async (tone: 'sentimental' | 'funny' | 'formal') => {
    setIsGenerating(true);
    const wish = await generateWeddingWish(tone, 'guest');
    setFormData(prev => ({ ...prev, message: wish }));
    setIsGenerating(false);
  };

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <GlassCard className="border-t-4 border-champagne-400">
          {step === 1 ? (
            <>
              <div className="text-center mb-10">
                <SectionTitle title="RSVP" subtitle="Kindly Reply" />
                <p className="text-gray-600 -mt-8 mb-6">Please respond by August 1st, 2024</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white border border-champagne-200 p-3 focus:outline-none focus:border-champagne-500 transition-colors"
                    placeholder="e.g. Jane Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-white border border-champagne-200 p-3 focus:outline-none focus:border-champagne-500 transition-colors"
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, attendance: RSVPStatus.ACCEPTED})}
                    className={`p-4 border ${formData.attendance === RSVPStatus.ACCEPTED ? 'bg-champagne-100 border-champagne-500 text-champagne-900' : 'bg-white border-champagne-200 text-gray-500'} transition-all`}
                  >
                    Joyfully Accept
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, attendance: RSVPStatus.DECLINED})}
                    className={`p-4 border ${formData.attendance === RSVPStatus.DECLINED ? 'bg-gray-100 border-gray-500 text-gray-900' : 'bg-white border-champagne-200 text-gray-500'} transition-all`}
                  >
                    Regretfully Decline
                  </button>
                </div>

                {formData.attendance === RSVPStatus.ACCEPTED && (
                  <div className="animate-fade-in-up">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Number of Guests</label>
                    <select 
                      className="w-full bg-white border border-champagne-200 p-3 focus:outline-none focus:border-champagne-500"
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: Number(e.target.value)})}
                    >
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs uppercase tracking-widest text-gray-500">Leave a Message</label>
                    <div className="group relative">
                      <button type="button" className="text-xs text-champagne-600 flex items-center hover:text-champagne-800">
                        <Wand2 size={12} className="mr-1" /> AI Assist
                      </button>
                      {/* AI Dropdown */}
                      <div className="absolute right-0 bottom-full mb-2 w-48 bg-white shadow-lg rounded p-2 hidden group-hover:block z-10 border border-champagne-100">
                         <p className="text-xs text-gray-400 mb-2 px-2">Generate a wish:</p>
                         <button type="button" onClick={() => handleGenerateWish('sentimental')} className="block w-full text-left text-sm px-2 py-1 hover:bg-champagne-50">Sentimental</button>
                         <button type="button" onClick={() => handleGenerateWish('funny')} className="block w-full text-left text-sm px-2 py-1 hover:bg-champagne-50">Funny</button>
                         <button type="button" onClick={() => handleGenerateWish('formal')} className="block w-full text-left text-sm px-2 py-1 hover:bg-champagne-50">Formal</button>
                      </div>
                    </div>
                  </div>
                  <textarea 
                    rows={4}
                    className="w-full bg-white border border-champagne-200 p-3 focus:outline-none focus:border-champagne-500 transition-colors"
                    placeholder="Write your wishes here..."
                    value={isGenerating ? 'Generating magical words...' : formData.message}
                    disabled={isGenerating}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <GoldButton className="w-full" disabled={isGenerating}>
                  {isGenerating ? 'Writing...' : 'Confirm RSVP'}
                </GoldButton>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="mb-6 inline-block p-4 rounded-full bg-green-50 text-green-600">
                <Sparkles size={40} />
              </div>
              <h2 className="font-serif text-4xl text-champagne-900 mb-4">Response Received</h2>
              <p className="text-gray-600 mb-8">
                {formData.attendance === RSVPStatus.ACCEPTED 
                  ? "We can't wait to celebrate with you!" 
                  : "We will miss you, but we'll celebrate in spirit!"}
              </p>
              <p className="text-sm text-gray-500 italic">"Love is not just looking at each other, it's looking in the same direction."</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default RSVP;
