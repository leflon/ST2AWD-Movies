import { Link } from 'react-router';
import { Heart } from 'lucide-react';

/**
 * Component displayed when the user has no favorite items
 * Shows a helpful message and link to browse movies/shows
 */
export default function EmptyFavorites() {
  return (
    <div className='max-w-4xl mx-auto text-center'>
      <div className='mb-8'>
        <Heart size={64} className='mx-auto text-gray-400 mb-4' />
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          No Favorites Yet
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          Start adding movies and TV shows to your favorites to see them
          here!
        </p>
      </div>
      <Link
        to='/'
        className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
      >
        Browse Movies & Shows
      </Link>
    </div>
  );
}
