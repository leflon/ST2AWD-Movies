import { useNavigate } from 'react-router';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <header className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-primary mb-2'>
            Amazing Movie Database
          </h1>
          <p className='text-lg text-muted'>
            Discover your next favorite movie
          </p>
        </header>

        <div className='max-w-2xl mx-auto mb-8'>
          <SearchBar
            placeholder='Search for millions of movies...'
            variant='big'
            onSubmit={handleSearch}
          />
        </div>

        <div className='max-w-4xl mx-auto'>
          <div className='text-center text-muted'>
            <p className='mb-4'>Start typing.</p>
            <p className='mt-[100vh]'>
              Nothing else to see here. Please just search a movie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
