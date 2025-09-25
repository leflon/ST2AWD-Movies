import { useNavigate } from 'react-router';
import useSWR from 'swr';
import { Star as StarIcon } from 'lucide-react';
import fetcher from '../lib/fetcher';
import { filterMediaResults } from '../lib/utils';
import FavoriteButton from './FavoriteButton';
import type { Movie, TMDBResponse } from '../types';

/**
 * Props for SearchResults component
 */
type SearchResultsProps = {
  /** Search query string */
  query: string;
  /** Optional callback when a movie/show is selected */
  onMovieSelect?: (movie: Movie) => void;
};

/**
 * Individual search result item component
 */
const SearchResultItem = ({
  movie,
  onItemClick,
}: {
  movie: Movie;
  onItemClick: (movie: Movie) => void;
}) => {
  const formatDate = (item: Movie) => {
    const dateString = item.release_date || item.first_air_date;
    if (!dateString) return 'No date';
    return new Date(dateString).getFullYear().toString();
  };

  const getPosterUrl = (posterPath: string | null) => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/w92${posterPath}`;
  };

  return (
    <SearchResultItemContainer movie={movie} onItemClick={onItemClick}>
      <SearchResultPoster
        posterPath={movie.poster_path}
        title={movie.title || movie.name || ''}
        getPosterUrl={getPosterUrl}
      />
      <SearchResultDetails movie={movie} formatDate={formatDate} />
      <SearchResultFavorite movie={movie} />
    </SearchResultItemContainer>
  );
};

/**
 * Container for individual search result item
 */
const SearchResultItemContainer = ({
  movie,
  onItemClick,
  children,
}: {
  movie: Movie;
  onItemClick: (movie: Movie) => void;
  children: React.ReactNode;
}) => (
  <div
    onClick={() => onItemClick(movie)}
    className='flex items-center gap-3 p-3 hover:bg-secondary/10 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0'
  >
    {children}
  </div>
);

/**
 * Poster section of search result item
 */
const SearchResultPoster = ({
  posterPath,
  title,
  getPosterUrl,
}: {
  posterPath: string | null;
  title: string;
  getPosterUrl: (path: string | null) => string | null;
}) => (
  <div className='w-16 h-24 flex-shrink-0'>
    {getPosterUrl(posterPath) ? (
      <img
        src={getPosterUrl(posterPath)!}
        alt={`${title} poster`}
        className='w-full h-full object-cover rounded'
      />
    ) : (
      <div className='w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400'>
        🎬
      </div>
    )}
  </div>
);

/**
 * Details section of search result item
 */
const SearchResultDetails = ({
  movie,
  formatDate,
}: {
  movie: Movie;
  formatDate: (item: Movie) => string;
}) => {
  return (
    <div className='flex-1 min-w-0'>
      <div className='flex items-center gap-2'>
        <h4 className='font-semibold text-text truncate'>
          {movie.title || movie.name}
        </h4>
        <span className='text-sm text-gray-500'>({formatDate(movie)})</span>
      </div>

      {movie.vote_average > 0 && (
        <div className='flex items-center gap-1 mt-1'>
          <StarIcon size={14} className='text-yellow-500 fill-current' />
          <span className='text-sm text-gray-600'>
            {movie.vote_average.toFixed(1)}
          </span>
          <span className='text-xs text-gray-400'>
            ({movie.vote_count} votes)
          </span>
        </div>
      )}

      {movie.overview && (
        <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
          {movie.overview && movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)}...`
            : movie.overview}
        </p>
      )}
    </div>
  );
};

/**
 * Favorite button section of search result item
 */
const SearchResultFavorite = ({ movie }: { movie: Movie }) => {
  return (
    <div className='flex-shrink-0'>
      <FavoriteButton
        item={{
          id: movie.id,
          title: movie.title,
          name: movie.name,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          first_air_date: movie.first_air_date,
          vote_average: movie.vote_average,
          media_type: movie.media_type || 'movie',
        }}
        size={16}
      />
    </div>
  );
};

/**
 * Main SearchResults component that displays search results from TMDB API
 */
const SearchResults = ({ query, onMovieSelect }: SearchResultsProps) => {
  const navigate = useNavigate();
  const { data } = useSWR<TMDBResponse>(
    `/search/multi?query=${encodeURIComponent(query)}`,
    fetcher,
  );

  const handleMovieClick = (movie: Movie) => {
    onMovieSelect?.(movie);
    const mediaType = movie.media_type || 'movie';
    navigate(`/${mediaType}/${movie.id}`);
  };

  // Filter out person results
  const filteredResults = filterMediaResults(data?.results || []);

  if (!data || !data.results || filteredResults.length === 0) {
    return (
      <div className='p-4 text-center text-gray-500 bg-background'>
        No movies found for <b>"{query}"</b>
      </div>
    );
  }

  return (
    <>
      <div className='p-2 text-sm text-gray-500 border-b bg-background'>
        Found {filteredResults.length} results
      </div>
      {filteredResults.slice(0, 10).map((movie) => (
        <SearchResultItem
          key={movie.id}
          movie={movie}
          onItemClick={handleMovieClick}
        />
      ))}
    </>
  );
};

export default SearchResults;
