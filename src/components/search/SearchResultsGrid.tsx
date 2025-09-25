import MediaCard from '../shared/MediaCard';
import type { Movie } from '../../types';

/**
 * Props for SearchResultsGrid component
 */
interface SearchResultsGridProps {
  /** Array of search results to display */
  results: Movie[];
  /** Current search query for context */
  query: string;
  /** Whether the search is currently loading */
  isLoading?: boolean;
  /** Error state if search failed */
  error?: Error | null;
}

/**
 * Grid component for displaying search results
 * Shows a responsive grid of media cards with loading and error states
 */
export default function SearchResultsGrid({
  results,
  query,
  isLoading = false,
  error = null,
}: SearchResultsGridProps) {
  if (isLoading) {
    return (
      <div className='flex justify-center py-8'>
        <div className='text-gray-500 dark:text-gray-400'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <div className='text-red-500'>
          Error loading results. Please try again.
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className='text-center py-8'>
        <div className='text-gray-500 dark:text-gray-400'>
          No movies or TV shows found for "{query}". Try adjusting your search
          or filters.
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Results header */}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Search Results for "{query}"
        </h2>
        <p className='text-gray-600 dark:text-gray-400'>
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Results grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8'>
        {results.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            showFavoriteButton={true}
            showMediaTypeBadge={true}
            showRating={true}
            className='hover:scale-[1.02] transition-transform'
          />
        ))}
      </div>
    </>
  );
}
