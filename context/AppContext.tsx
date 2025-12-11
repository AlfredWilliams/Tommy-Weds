import { createContext } from 'react';
import { Photo } from '../types';

export interface AppContextType {
  photos: Photo[];
  addPhoto: (photo: Partial<Photo>) => void;
}

export const AppContext = createContext<AppContextType | null>(null);