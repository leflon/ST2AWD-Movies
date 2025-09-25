import { Link } from 'react-router';
import { Star, Calendar } from 'lucide-react';
import FavoriteButton from '../FavoriteButton';
import type { FavoriteItem, MediaType } from '../../types';

/**
 * Props for MediaCard component
 */
interface MediaCardProps {
  /** Media item data */
  item: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    media_type?: MediaType;
  };
  /** Whether to show the favorite button */
  showFavoriteButton?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom poster size (default: 'w300') */
  posterSize?: string;
  /** Whether to show the media type badge */
  showMediaTypeBadge?: boolean;
  /** Whether to show the rating overlay */
  showRating?: boolean;
}

/**
 * Shared media card component for displaying movie/TV show information
 * Used across Search results, Favorites, and other media listings
 */
export default function MediaCard({
  item,
  showFavoriteButton = true,
  className = '',
  posterSize = 'w300',
  showMediaTypeBadge = true,
  showRating = true,
}: MediaCardProps) {
  /**
   * Generates a complete URL for a poster image
   * @param posterPath - The relative path from TMDB API
   * @param size - The image size variant
   * @returns Complete URL or null if no poster path provided
   */
  const getPosterUrl = (
    posterPath: string | null,
    size: string = posterSize,
  ) => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
  };

  /**
   * Formats a date string to display the year
   * @param item - The media item containing date information
   * @returns Formatted year or 'No date' if invalid
   */
  const formatDate = (item: MediaCardProps['item']) => {
    const dateString = item.release_date || item.first_air_date;
    if (!dateString) return 'No date';
    return new Date(dateString).getFullYear().toString();
  };

  /**
   * Formats a rating number to one decimal place
   * @param rating - Rating value (typically 0-10)
   * @returns Formatted rating string or 'N/A' if invalid
   */
  const getRating = (rating: number) => {
    return rating > 0 ? rating.toFixed(1) : 'N/A';
  };

  /**
   * Gets the display title for the item
   * @param item - The media item
   * @returns Title or name, fallback to 'Untitled'
   */
  const getTitle = (item: MediaCardProps['item']) => {
    return item.title || item.name || 'Untitled';
  };

  /**
   * Gets the media type for routing
   * @param item - The media item
   * @returns Media type, defaults to 'movie'
   */
  const getMediaType = (item: MediaCardProps['item']) => {
    return item.media_type || 'movie';
  };

  /**
   * Converts the item to FavoriteItem format for the favorite button
   * @param item - The media item
   * @returns FavoriteItem compatible object
   */
  const toFavoriteItem = (item: MediaCardProps['item']): FavoriteItem => {
    return {
      id: item.id,
      title: item.title,
      name: item.name,
      poster_path: item.poster_path,
      release_date: item.release_date,
      first_air_date: item.first_air_date,
      vote_average: item.vote_average,
      media_type: getMediaType(item),
    };
  };

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}
    >
      {/* Favorite Button Overlay */}
      {showFavoriteButton && getMediaType(item) !== 'person' && (
        <div className='absolute top-2 right-2 z-10'>
          <FavoriteButton item={toFavoriteItem(item)} size={20} />
        </div>
      )}

      {/* Link to Detail Page */}
      <Link to={`/${getMediaType(item)}/${item.id}`} className='block'>
        {/* Poster */}
        <div className='aspect-[2/3] bg-gray-200 dark:bg-gray-700 relative overflow-hidden'>
          {getPosterUrl(item.poster_path) ? (
            <img
              src={getPosterUrl(item.poster_path)!}
              alt={`${getTitle(item)} poster`}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500'>
              <div className='text-center'>
                <div className='text-4xl mb-2'>
                  {getMediaType(item) === 'movie' ? '🎬' : '📺'}
                </div>
                <div className='text-sm'>No Image</div>
              </div>
            </div>
          )}

          {/* Rating overlay */}
          {showRating && item.vote_average > 0 && (
            <div className='absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1'>
              <Star size={10} className='fill-yellow-400 text-yellow-400' />
              {getRating(item.vote_average)}
            </div>
          )}

          {/* Media type badge */}
          {showMediaTypeBadge && (
            <div className='absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded'>
              {getMediaType(item) === 'movie' ? 'Movie' : 'TV Show'}
            </div>
          )}
        </div>

        {/* Info */}
        <div className='p-3'>
          <h3 className='font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-primary transition-colors'>
            {getTitle(item)}
          </h3>
          <div className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400'>
            <Calendar size={12} />
            <span>{formatDate(item)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
