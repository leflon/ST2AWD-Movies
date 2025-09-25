import { useState } from 'react';
import { useSearchParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { filterMediaResults } from '../lib/utils';
import type { TMDBResponse } from '../types';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import SearchFiltersComponent from '../components/search/SearchFilters';
import type { SearchFiltersType } from '../components/search';
import SearchResultsGrid from '../components/search/SearchResultsGrid';
import SearchPagination from '../components/search/SearchPagination';

/**
 * Search page component that allows users to search and filter movies and TV shows
 * Provides comprehensive search functionality with filters for year, type, and genre
 */
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Extract current search parameters
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState<SearchFiltersType>({
    year: searchParams.get('year') || '',
    type: (searchParams.get('type') as 'movie' | 'tv' | 'all') || 'all',
    genre: searchParams.get('genre') || '',
  });

  /**
   * Builds the API endpoint based on current filters and search parameters
   * @returns API endpoint string or null if no query provided
   */
  const buildEndpoint = () => {
    if (!query) return null;

    let endpoint = '';
    const params = new URLSearchParams();
    params.set('query', query);
    params.set('page', page.toString());

    // Set endpoint based on media type filter
    if (filters.type === 'all') {
      endpoint = '/search/multi';
    } else if (filters.type === 'movie') {
      endpoint = '/search/movie';
    } else {
      endpoint = '/search/tv';
    }

    // Add year filter based on media type
    if (filters.year) {
      if (filters.type === 'movie') {
        params.set('year', filters.year);
      } else if (filters.type === 'tv') {
        params.set('first_air_date_year', filters.year);
      }
    }

    // Add genre filter
    if (filters.genre) {
      params.set('with_genres', filters.genre);
    }

    return `${endpoint}?${params.toString()}`;
  };

  // Fetch search results
  const { data, error, isLoading } = useSWR<TMDBResponse>(
    buildEndpoint(),
    fetcher,
  );

  /**
   * Handles new search queries
   * @param newQuery - The new search query string
   */
  const handleSearch = (newQuery: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('q', newQuery);
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  /**
   * Handles filter changes and updates URL parameters
   * @param newFilters - Partial filter updates
   */
  const handleFilterChange = (newFilters: Partial<SearchFiltersType>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');

    // Update URL parameters with new filter values
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  /**
   * Handles clearing all filters
   */
  const handleClearFilters = () => {
    const clearedFilters: SearchFiltersType = {
      year: '',
      type: 'all',
      genre: '',
    };
    setFilters(clearedFilters);

    const newParams = new URLSearchParams({
      q: query,
      page: '1',
    });
    setSearchParams(newParams);
  };

  /**
   * Handles page navigation
   * @param newPage - The new page number to navigate to
   */
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Toggles filter visibility
   */
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Show search input if no query provided
  if (!query) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar />
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto mb-8'>
            <SearchBar
              placeholder='Search for movies and TV shows...'
              variant='big'
              onSubmit={handleSearch}
            />
          </div>
          <div className='text-center text-gray-500 dark:text-gray-400'>
            <p>Enter a search query to see results</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        {/* Header with search bar */}
        <div className='mb-8'>
          <div className='max-w-2xl mx-auto mb-4'>
            <SearchBar
              placeholder='Search for movies and TV shows...'
              variant='small'
              onSubmit={handleSearch}
            />
          </div>
        </div>

        {/* Search Filters */}
        <SearchFiltersComponent
          filters={filters}
          showFilters={showFilters}
          onToggleFilters={handleToggleFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Search Results */}
        <div className='max-w-6xl mx-auto'>
          <SearchResultsGrid
            results={filterMediaResults(data?.results || [])}
            query={query}
            isLoading={isLoading}
            error={error}
          />

          {/* Pagination */}
          {data && data.total_pages > 1 && (
            <SearchPagination
              currentPage={page}
              totalPages={data.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
