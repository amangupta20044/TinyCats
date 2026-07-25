import { createContext } from 'react';

export interface FavoritesContextType {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string, name?: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
