import React, { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { toast } from 'sonner';
import { FavoritesContext } from './FavoritesContext';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    return getStorageItem<string[]>(LOCAL_STORAGE_KEYS.FAVORITES, []);
  });

  useEffect(() => {
    setStorageItem(LOCAL_STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string, name?: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        toast.info(name ? `Removed ${name} from favorites` : 'Removed from favorites');
        return prev.filter((favId) => favId !== id);
      } else {
        toast.success(name ? `Added ${name} to favorites ❤️` : 'Added to favorites ❤️');
        return [...prev, id];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
