import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { FavoriteItem, FavoritesContextType } from '../types';

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('movie-favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
      setFavorites([]);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('movie-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites((prev) => {
      // Check if item already exists
      const exists = prev.some(
        (fav) => fav.id === item.id && fav.media_type === item.media_type,
      );
      if (exists) return prev;

      return [...prev, item];
    });
  };

  const removeFromFavorites = (
    id: number,
    mediaType: 'movie' | 'tv' | 'person',
  ) => {
    setFavorites((prev) =>
      prev.filter((item) => !(item.id === id && item.media_type === mediaType)),
    );
  };

  const isFavorite = (id: number, mediaType: 'movie' | 'tv' | 'person') => {
    return favorites.some(
      (item) => item.id === id && item.media_type === mediaType,
    );
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id, item.media_type)) {
      removeFromFavorites(item.id, item.media_type);
    } else {
      addToFavorites(item);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
