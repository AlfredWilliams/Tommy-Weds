import { useEffect, useContext, useState, useRef, ChangeEvent } from 'react';
import { SectionTitle, GoldButton, GlassCard } from '../components/UI';
import { Camera, Check, Upload, Trash2, Smartphone, QrCode } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { Photo } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// --- Gallery View ---
const GalleryGrid = () => {
  const context = useContext(AppContext);

  // Safely handle null context
  if (!context) return null;
  const { photos } = context;
  
  const approvedPhotos = photos.filter(p => p.approved);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Captured Moments" subtitle="Gallery" />
        
        {approvedPhotos.length === 0 ? (
          <div className="text-center py-20 opacity-60">
            <Camera size={48} className="mx-auto mb-4 text-champagne-400" />
            <p className="font-serif text-xl">No photos yet. Be the first to upload!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {approvedPhotos.map((photo) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={photo.id} 
                className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-md"
              >
                <img src={photo.url} alt="Wedding moment" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-serif italic">{photo.caption}</p>
                    <p className="text-xs text-white/70 mt-1">By {photo.uploadedBy || 'Guest'}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- QR Upload View ---
export const QRUpload = () => {
  const context = useContext(AppContext);
  // Add safety check
  if (!context) return null;
  const { addPhoto } = context;

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (ev) => {
        setTimeout(() => {
          if (ev.target?.result) {
            addPhoto({
              url: ev.target.result as string,
              caption: '',
              uploadedBy: 'Guest Mobile',
              approved: true // Auto approve for demo
            });
            setUploading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
          }
        }, 1500); // Simulate upload delay
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-champagne-50 flex flex-col items-center justify-center p-6 text-center">
      <AnimatePresence>
        {success ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          >
             <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
               <Check size={48} className="text-green-600" />
             </div>
             <h2 className="font-serif text-3xl text-champagne-900 mb-2">Thank You!</h2>
             <p className="text-gray-600">Your photo has been shared.</p>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 bg-champagne-200 rounded-full flex items-center justify-center animate-pulse">
                <Smartphone size={40} className="text-champagne-800" />
              </div>
            </div>
            <h1 className="font-serif text-4xl text-champagne-900 mb-4">Share the Love</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Take a photo or upload one from your gallery to instantly add it to the live wedding album.
            </p>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border-2 border-dashed border-champagne-300 rounded-xl p-10 cursor-pointer hover:bg-champagne-50 transition-colors shadow-sm"
            >
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
              />
              {uploading ? (
                <div className="flex flex-col items-center">
                   <div className="w-10 h-10 border-4 border-champagne-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                   <p className="text-champagne-800 font-medium">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                   <Upload size={48} className="text-champagne-400 mb-4" />
                   <span className="font-serif text-xl text-champagne-800">Tap to Upload</span>
                   <span className="text-xs uppercase tracking-widest text-gray-400 mt-2">High Quality Photos Only</span>
                </div>
              )}
            </div>

            <div className="mt-12 opacity-60">
              <img src="https://picsum.photos/seed/flower/100/100" className="w-16 h-16 rounded-full mx-auto mb-4 object-cover grayscale" alt="decoration" />
              <p className="font-serif text-sm">Thomas & Vivian</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryGrid;
