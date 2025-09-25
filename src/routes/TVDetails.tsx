import { useParams } from 'react-router';
import useSWR from 'swr';
import LoadingSpinner from '../components/LoadingSpinner';
import MediaBanner from '../components/media/MediaBanner';
import MediaCast from '../components/media/MediaCast';
import MediaDetails from '../components/media/MediaDetails';
import MediaHeader from '../components/media/MediaHeader';
import Navbar from '../components/Navbar';
import NotFound from '../components/NotFound';
import TVSeasons from '../components/TVSeasons';
import fetcher from '../lib/fetcher';
import type { Credits, TVDetails as TVDetailsType } from '../types';

export default function TVDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: tvShow,
    error: tvError,
    isLoading: tvLoading,
  } = useSWR<TVDetailsType>(id ? `/tv/${id}` : null, fetcher);

  const { data: credits } = useSWR<Credits>(
    id ? `/tv/${id}/credits` : null,
    fetcher,
  );

  const getCreators = (): string[] => {
    return tvShow?.created_by.map((creator) => creator.name) || [];
  };

  const getNetworks = (): string[] => {
    return tvShow?.networks.map((network) => network.name) || [];
  };

  // Validate ID parameter
  if (!id || isNaN(Number(id))) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar showSearch={true} />
        <NotFound
          title='Invalid TV Show ID'
          message='The TV show ID provided is invalid. Please check the URL and try again.'
          backPath='/'
          backLabel='Back to TV Shows'
        />
      </div>
    );
  }

  if (tvLoading) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar showSearch={true} />
        <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
          <LoadingSpinner size={48} text='Loading TV show details...' />
        </div>
      </div>
    );
  }

  // Check for error, missing data, or invalid TV show data
  if (tvError || !tvShow || !tvShow.name || !tvShow.id) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar showSearch={true} />
        <NotFound
          title='TV Show Not Found'
          message={`The TV show you are looking for could not be found. ${tvError ? `Error: ${tvError.message}` : 'It may have been removed or the ID is incorrect.'}`}
          backPath='/'
          backLabel='Back to TV Shows'
        />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Navbar showSearch={true} />
      <MediaBanner
        backdropPath={tvShow.backdrop_path}
        title={tvShow.name}
        backPath='/'
      />

      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <MediaHeader
            type='tv'
            id={tvShow.id}
            title={tvShow.name}
            tagline={tvShow.tagline}
            posterPath={tvShow.poster_path}
            voteAverage={tvShow.vote_average}
            voteCount={tvShow.vote_count}
            firstAirDate={tvShow.first_air_date}
            lastAirDate={tvShow.last_air_date}
            episodeRunTime={tvShow.episode_run_time}
            numberOfSeasons={tvShow.number_of_seasons}
            genres={tvShow.genres}
            overview={tvShow.overview}
            creators={getCreators()}
            networks={getNetworks()}
            status={tvShow.status}
            inProduction={tvShow.in_production}
          />

          {credits && <MediaCast cast={credits.cast} />}

          <TVSeasons seasons={tvShow.seasons} />

          <MediaDetails
            type='tv'
            homepage={tvShow.homepage}
            productionCountries={tvShow.production_countries}
            status={tvShow.status}
            showType={tvShow.type}
            numberOfEpisodes={tvShow.number_of_episodes}
            inProduction={tvShow.in_production}
          />
        </div>
      </div>
    </div>
  );
}
