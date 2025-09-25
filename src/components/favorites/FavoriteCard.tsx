import MediaCard from '../shared/MediaCard';
import type { FavoriteItem } from '../../types';

/**
 * Props for FavoriteCard component
 */
interface FavoriteCardProps {
  /** Favorite item to display */
  item: FavoriteItem;
}

/**
 * Individual favorite item card component
 * Uses the shared MediaCard component for consistent styling across the app
 */
export default function FavoriteCard({ item }: FavoriteCardProps) {
  return (
    <MediaCard
      item={item}
      showFavoriteButton={true}
      showMediaTypeBadge={true}
      showRating={true}
      className='hover:scale-[1.02] transition-transform'
    />
  );
}
