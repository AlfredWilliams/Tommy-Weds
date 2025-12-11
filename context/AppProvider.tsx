import { useState, type FC, type ReactNode } from 'react';
import { AppContext } from './AppContext';
import { Photo } from '../types';

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: 'https://picsum.photos/seed/wedding1/800/600', timestamp: Date.now(), approved: true, caption: 'The magical moment' },
    { id: '2', url: 'https://picsum.photos/seed/wedding2/600/800', timestamp: Date.now(), approved: true, caption: 'Details' },
    { id: '3', url: 'https://picsum.photos/seed/wedding3/800/800', timestamp: Date.now(), approved: true, caption: 'Us' },
    { id: '4', url: 'https://picsum.photos/seed/wedding4/800/600', timestamp: Date.now(), approved: true },
    { id: '5', url: 'https://picsum.photos/seed/wedding5/600/800', timestamp: Date.now(), approved: true },
  ]);

  const addPhoto = (photo: Partial<Photo>) => {
    const newPhoto: Photo = {
      id: Math.random().toString(36).substr(2, 9),
      url: photo.url || '',
      timestamp: Date.now(),
      approved: photo.approved || false,
      caption: photo.caption,
      uploadedBy: photo.uploadedBy
    };
    setPhotos(prev => [newPhoto, ...prev]);
  };

  return (
    <AppContext.Provider value={{ photos, addPhoto }}>
      {children}
    </AppContext.Provider>
  );
};