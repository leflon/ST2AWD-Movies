import type { FavoriteItem } from '../../types';

/**
 * Props for FavoriteStats component
 */
interface FavoriteStatsProps {
  /** Array of favorite items to calculate statistics from */
  favorites: FavoriteItem[];
}

/**
 * Component that displays statistics about the user's favorite collection
 * Shows counts of movies, TV shows, and average rating
 */
export default function FavoriteStats({ favorites }: FavoriteStatsProps) {
  /**
   * Calculates the average rating of all favorites
   * @returns Formatted average rating or '0' if no favorites
   */
  const getAverageRating = () => {
    if (favorites.length === 0) return '0';

    const sum = favorites.reduce((total, item) => total + item.vote_average, 0);
    return (sum / favorites.length).toFixed(1);
  };

  /**
   * Counts the number of movies in favorites
   * @returns Number of movie items
   */
  const getMovieCount = () => {
    return favorites.filter((item) => item.media_type === 'movie').length;
  };

  /**
   * Counts the number of TV shows in favorites
   * @returns Number of TV show items
   */
  const getTVShowCount = () => {
    return favorites.filter((item) => item.media_type === 'tv').length;
  };

  return (
    <div className='mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
        Your Collection
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-primary'>
            {getMovieCount()}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-400'>Movies</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-primary'>
            {getTVShowCount()}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            TV Shows
          </div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-primary'>
            {getAverageRating()}
          </div>
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            Avg Rating
          </div>
        </div>
      </div>
    </div>
  );
}
