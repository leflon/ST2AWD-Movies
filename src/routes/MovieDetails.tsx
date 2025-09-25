import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import type {
  Credits,
  CrewMember,
  MovieDetails as MovieDetailsType,
} from '../types';
import MediaBanner from '../components/media/MediaBanner';
import MediaHeader from '../components/media/MediaHeader';
import MediaCast from '../components/media/MediaCast';
import MediaDetails from '../components/media/MediaDetails';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
  } = useSWR<MovieDetailsType>(id ? `/movie/${id}` : null, fetcher);

  const { data: credits } = useSWR<Credits>(
    id ? `/movie/${id}/credits` : null,
    fetcher,
  );

  const getDirectors = (): string[] => {
    return (
      credits?.crew
        .filter((member: CrewMember) => member.job === 'Director')
        .map((director) => director.name) || []
    );
  };

  // Validate ID parameter
  if (!id || isNaN(Number(id))) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar showSearch={true} />
        <NotFound
          title='Invalid Movie ID'
          message='The movie ID provided is invalid. Please check the URL and try again.'
          backPath='/'
          backLabel='Back to Movies'
        />
      </div>
    );
  }

  if (movieLoading) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar showSearch={true} />
        <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
          <LoadingSpinner size={48} text='Loading movie details...' />
        </div>
      </div>
    );
  }

  // Check for error, missing data, or invalid movie data
  if (movieError || !movie || !movie.title || !movie.id) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar showSearch={true} />
        <NotFound
          title='Movie Not Found'
          message={`The movie you are looking for could not be found. ${movieError ? `Error: ${movieError.message}` : 'It may have been removed or the ID is incorrect.'}`}
          backPath='/'
          backLabel='Back to Movies'
        />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar showSearch={true} />
      <MediaBanner
        backdropPath={movie.backdrop_path}
        title={movie.title}
        backPath='/'
      />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <MediaHeader
            type='movie'
            id={movie.id}
            title={movie.title}
            tagline={movie.tagline}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
            releaseDate={movie.release_date}
            runtime={movie.runtime}
            genres={movie.genres}
            overview={movie.overview}
            directors={getDirectors()}
          />
          {credits && <MediaCast cast={credits.cast} />}
          <MediaDetails
            type='movie'
            homepage={movie.homepage}
            productionCountries={movie.production_countries}
            status={movie.status}
            budget={movie.budget}
            revenue={movie.revenue}
          />
        </div>
      </div>
    </div>
  );
}
