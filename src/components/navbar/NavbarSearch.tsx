import SearchBar from '../SearchBar';
import { useNavigate } from 'react-router';

/**
 * Props for NavbarSearch component
 */
interface NavbarSearchProps {
  /** Whether to show the search bar */
  showSearch: boolean;
}

/**
 * Search component for the navigation bar
 * Displays search bar when enabled and handles search navigation
 */
export default function NavbarSearch({
  showSearch = false,
}: NavbarSearchProps) {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (!showSearch) {
    return null;
  }

  return (
    <div className='flex-1 max-w-md mx-8'>
      <SearchBar
        variant='small'
        placeholder='Search movies and TV shows...'
        onSubmit={handleSearch}
      />
    </div>
  );
}
