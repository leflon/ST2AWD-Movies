import { Search } from 'lucide-react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useDebounce from '../lib/debounce';
import SearchResults from './SearchResults';
import type { Movie, SearchBarVariant } from '../types';

/**
 * Props for SearchBar component
 */
interface SearchBarProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Visual variant of the search bar */
  variant?: SearchBarVariant;
  /** Default value for the search input */
  defaultValue?: string;
  /** Callback fired when input value changes */
  onChange?: (value: string) => void;
  /** Callback fired when form is submitted */
  onSubmit?: (value: string) => void;
}

/**
 * Search bar component with dropdown results
 * Provides real-time search with debounced API calls and dropdown results
 */
const SearchBar = ({
  placeholder = 'Search for millions of movies...',
  variant = 'big',
  onChange,
  onSubmit,
}: SearchBarProps) => {
  const variantClasses = variant === 'big' ? 'py-2 px-4 text-2xl' : 'py-1 px-2';
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
    onChange?.(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit?.(query);
      setIsOpen(false);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    const title = movie.title || movie.name || '';
    setQuery(title);
    setIsOpen(false);
    onSubmit?.(title);
  };

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit} className='relative'>
        <input
          type='text'
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(query.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Delay to allow click events
          placeholder={placeholder}
          className={
            'w-full h-full border-primary border-4 rounded-full text-text outline-0 focus:ring-2 focus:ring-primary/50 transition-all ' +
            variantClasses
          }
        />
        <button
          type='submit'
          className='absolute right-4 top-1/2 translate-y-[-50%] text-muted hover:text-primary transition-colors'
        >
          <Search size={variant === 'big' ? 24 : 20} />
        </button>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && debouncedQuery && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-background border-2 border-primary rounded-lg shadow-lg max-h-96 overflow-y-auto z-50'>
          <ErrorBoundary
            fallback={
              <div className='p-4 text-center text-red-500'>
                <div>Something went wrong while searching movies.</div>
                <div className='text-sm text-gray-500 mt-1'>
                  Please try again.
                </div>
              </div>
            }
          >
            <Suspense
              fallback={
                <div className='p-4 text-center text-gray-500'>
                  Searching...
                </div>
              }
            >
              <SearchResults
                query={debouncedQuery}
                onMovieSelect={handleMovieSelect}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
