import {
  formatDate,
  formatRuntime,
  formatRuntimeFromArray,
} from '../../lib/utils';
import FavoriteButton from '../FavoriteButton';
import MediaPoster from './MediaPoster';
import MediaInfo from './MediaInfo';
import MediaCreators from './MediaCreators';
import type { FavoriteItem, Genre } from '../../types';

/**
 * Props for movie media header
 */
interface MovieHeaderProps {
  type: 'movie';
  id: number;
  title: string;
  tagline?: string;
  posterPath: string | null;
  voteAverage: number;
  voteCount: number;
  releaseDate: string;
  runtime: number;
  genres: Genre[];
  overview: string;
  directors: string[];
}

/**
 * Props for TV show media header
 */
interface TVHeaderProps {
  type: 'tv';
  id: number;
  title: string;
  tagline?: string;
  posterPath: string | null;
  voteAverage: number;
  voteCount: number;
  firstAirDate: string;
  lastAirDate?: string;
  episodeRunTime: number[];
  numberOfSeasons: number;
  genres: Genre[];
  overview: string;
  creators: string[];
  networks: string[];
  status: string;
  inProduction: boolean;
}

type MediaHeaderProps = MovieHeaderProps | TVHeaderProps;

/**
 * Main MediaHeader component that displays comprehensive media information
 * including poster, title, ratings, genres, and creator details
 */
export default function MediaHeader(props: MediaHeaderProps) {
  const getDateInfo = () => {
    if (props.type === 'movie') {
      return formatDate(props.releaseDate);
    } else {
      if (!props.firstAirDate) return 'Unknown';
      const startYear = new Date(props.firstAirDate).getFullYear();

      if (props.status === 'Ended' && props.lastAirDate) {
        const endYear = new Date(props.lastAirDate).getFullYear();
        return startYear === endYear
          ? startYear.toString()
          : `${startYear} - ${endYear}`;
      }

      return props.inProduction
        ? `${startYear} - Present`
        : startYear.toString();
    }
  };

  const getRuntimeInfo = () => {
    if (props.type === 'movie') {
      return formatRuntime(props.runtime);
    } else {
      return formatRuntimeFromArray(props.episodeRunTime);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row gap-8 mb-8'>
      <MediaPoster
        posterPath={props.posterPath}
        title={props.title}
        type={props.type}
      />

      <div className='flex-1'>
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <MediaInfo
              type={props.type}
              title={props.title}
              tagline={props.tagline}
              voteAverage={props.voteAverage}
              voteCount={props.voteCount}
              genres={props.genres}
              overview={props.overview}
              dateInfo={getDateInfo()}
              runtimeInfo={getRuntimeInfo()}
              numberOfSeasons={
                props.type === 'tv' ? props.numberOfSeasons : undefined
              }
            />
          </div>

          <FavoriteButton
            item={
              {
                id: props.id,
                title: props.type === 'movie' ? props.title : undefined,
                name: props.type === 'tv' ? props.title : undefined,
                poster_path: props.posterPath,
                release_date:
                  props.type === 'movie' ? props.releaseDate : undefined,
                first_air_date:
                  props.type === 'tv' ? props.firstAirDate : undefined,
                vote_average: props.voteAverage,
                media_type: props.type,
              } as FavoriteItem
            }
            size={28}
            showText={true}
            className='ml-4'
          />
        </div>

        <MediaCreators
          type={props.type}
          directors={props.type === 'movie' ? props.directors : undefined}
          creators={props.type === 'tv' ? props.creators : undefined}
          networks={props.type === 'tv' ? props.networks : undefined}
        />
      </div>
    </div>
  );
}
