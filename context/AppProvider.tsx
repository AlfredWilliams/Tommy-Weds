import { useState, type FC, type ReactNode } from 'react';
import { AppContext } from './AppContext';
import { Photo } from '../types';

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', url: '/assets/images/t1.jpg', timestamp: Date.now(), approved: true, caption: 'Timeless moments' },
    { id: '2', url: '/assets/images/t3.jpg', timestamp: Date.now(), approved: true },
    { id: '3', url: '/assets/images/t5.jpg', timestamp: Date.now(), approved: true, caption: 'Pure happiness' },
    { id: '4', url: '/assets/images/t7.jpg', timestamp: Date.now(), approved: true },
    { id: '5', url: '/assets/images/t8.jpg', timestamp: Date.now(), approved: true, caption: 'Just the two of us' },
    { id: '6', url: '/assets/images/t10.jpg', timestamp: Date.now(), approved: true },
    { id: '7', url: '/assets/images/t11.jpg', timestamp: Date.now(), approved: true, caption: 'Walking together' },
    { id: '8', url: '/assets/images/t16.jpg', timestamp: Date.now(), approved: true },
    { id: '9', url: '/assets/images/t17.jpg', timestamp: Date.now(), approved: true },
    { id: '10', url: '/assets/images/t18.jpg', timestamp: Date.now(), approved: true, caption: 'Celebration' },
    { id: '11', url: '/assets/images/t19.jpg', timestamp: Date.now(), approved: true },
    { id: '12', url: '/assets/images/t20.jpg', timestamp: Date.now(), approved: true, caption: 'Love forever' },
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
