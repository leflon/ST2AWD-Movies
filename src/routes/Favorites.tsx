import { Trash2 } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import Navbar from '../components/Navbar';
import EmptyFavorites from '../components/favorites/EmptyFavorites';
import FavoriteCard from '../components/favorites/FavoriteCard';
import FavoriteStats from '../components/favorites/FavoriteStats';

/**
 * Favorites page component that displays the user's saved favorite movies and TV shows
 * Shows an empty state when no favorites exist, otherwise displays a grid of favorite items
 */
export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();

  /**
   * Handles clearing all favorites with confirmation
   */
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      clearFavorites();
    }
  };

  if (favorites.length === 0) {
    return (
      <div className='min-h-screen'>
        <Navbar showSearch={true} />
        <div className='container mx-auto px-4 py-8'>
          <EmptyFavorites />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <Navbar showSearch={true} />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>My Favorites</h1>
              <p className='text-gray-600 dark:text-gray-400'>
                {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
              </p>
            </div>

            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className='inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'
              >
                <Trash2 size={16} />
                Clear All
              </button>
            )}
          </div>

          {/* Favorites Grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {favorites.map((item) => (
              <FavoriteCard key={`${item.media_type}-${item.id}`} item={item} />
            ))}
          </div>

          <FavoriteStats favorites={favorites} />
        </div>
      </div>
    </div>
  );
}
