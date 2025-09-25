import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import type { FavoriteItem } from '../types';

/**
 * Props for FavoriteButton component
 */
interface FavoriteButtonProps {
  item: FavoriteItem;
  size?: number;
  className?: string;
  showText?: boolean;
}

/**
 * Button component for adding/removing items from favorites
 * Displays a heart icon that fills when the item is favorited
 */

export default function FavoriteButton({
  item,
  size = 24,
  className = '',
  showText = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(item.id, item.media_type);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 p-2 rounded-lg transition-all duration-200
        hover:scale-110 active:scale-95
        ${
          favorite
            ? 'text-primary hover:opacity-80 bg-primary/10 hover:bg-primary/20'
            : 'text-muted hover:text-primary bg-surface hover:bg-surface-hover'
        }
        ${className}
      `}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={size}
        className={`
          transition-all duration-200
          ${favorite ? 'fill-current' : 'fill-none'}
        `}
      />
      {showText && (
        <span className='text-sm font-medium'>
          {favorite ? 'Favorited' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
}
