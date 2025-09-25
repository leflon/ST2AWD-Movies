import { Filter } from 'lucide-react';

/**
 * Filter values for search functionality
 */
export interface SearchFilters {
  /** Year filter value */
  year: string;
  /** Media type filter (movie, tv, or all) */
  type: 'movie' | 'tv' | 'all';
  /** Genre filter value (genre ID as string) */
  genre: string;
}

/**
 * Props for SearchFilters component
 */
interface SearchFiltersProps {
  /** Current filter values */
  filters: SearchFilters;
  /** Whether filters are currently visible */
  showFilters: boolean;
  /** Callback to toggle filter visibility */
  onToggleFilters: () => void;
  /** Callback when filter values change */
  onFilterChange: (newFilters: Partial<SearchFilters>) => void;
  /** Callback to clear all filters */
  onClearFilters: () => void;
  /** Current search query for context */
  query: string;
}

/**
 * Available genres from TMDB API
 */
const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

/**
 * Search filters component for the search page
 * Provides year, type, and genre filtering with toggle visibility
 */
export default function SearchFilters({
  filters,
  showFilters,
  onToggleFilters,
  onFilterChange,
  onClearFilters,
  query,
}: SearchFiltersProps) {
  return (
    <>
      {/* Filter toggle */}
      <div className='flex justify-center mb-8'>
        <button
          onClick={onToggleFilters}
          className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
        >
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className='max-w-4xl mx-auto mb-8 p-6 bg-white dark:bg-gray-800 border-2 border-primary dark:border-gray-600 rounded-lg shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {/* Year filter */}
            <div>
              <label className='block text-sm font-semibold mb-2 text-gray-900 dark:text-white'>
                Year
              </label>
              <input
                type='number'
                min='1900'
                max={new Date().getFullYear()}
                value={filters.year}
                onChange={(e) => onFilterChange({ year: e.target.value })}
                placeholder='e.g. 2023'
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>

            {/* Type filter */}
            <div>
              <label className='block text-sm font-semibold mb-2 text-gray-900 dark:text-white'>
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  onFilterChange({
                    type: e.target.value as 'movie' | 'tv' | 'all',
                  })
                }
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              >
                <option value='all'>All</option>
                <option value='movie'>Movies</option>
                <option value='tv'>TV Shows</option>
              </select>
            </div>

            {/* Genre filter */}
            <div>
              <label className='block text-sm font-semibold mb-2 text-gray-900 dark:text-white'>
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => onFilterChange({ genre: e.target.value })}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              >
                <option value=''>All Genres</option>
                {GENRES.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear filters */}
          <div className='mt-4 flex justify-end'>
            <button
              onClick={onClearFilters}
              className='px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
