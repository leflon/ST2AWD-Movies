import { Star, Calendar, Clock, Tv } from 'lucide-react';
import { getRating } from '../../lib/utils';
import type { Genre } from '../../types';

/**
 * Props for MediaInfo component
 */
interface MediaInfoProps {
  /** Media type (movie or tv) */
  type: 'movie' | 'tv';
  /** Media title */
  title: string;
  /** Marketing tagline */
  tagline?: string;
  /** Average user rating */
  voteAverage: number;
  /** Total number of votes */
  voteCount: number;
  /** Array of genres */
  genres: Genre[];
  /** Plot overview */
  overview: string;
  /** Formatted date information */
  dateInfo: string;
  /** Formatted runtime information */
  runtimeInfo: string;
  /** Number of seasons (TV shows only) */
  numberOfSeasons?: number;
}

/**
 * Component that displays basic media information including title, rating, genres, and overview
 */
export default function MediaInfo({
  type,
  title,
  tagline,
  voteAverage,
  voteCount,
  genres,
  overview,
  dateInfo,
  runtimeInfo,
  numberOfSeasons,
}: MediaInfoProps) {
  return (
    <div className='flex-1'>
      <h1 className='text-4xl font-bold text-text mb-2'>{title}</h1>

      {tagline && (
        <p className='text-lg text-gray-600 italic mb-4'>"{tagline}"</p>
      )}

      {/* Rating and basic info */}
      <div className='flex flex-wrap items-center gap-4 mb-6'>
        {voteAverage > 0 && (
          <div className='flex items-center gap-1'>
            <Star className='text-yellow-500 fill-current' size={20} />
            <span className='text-lg font-semibold'>
              {getRating(voteAverage)}
            </span>
            <span className='text-gray-500'>({voteCount} votes)</span>
          </div>
        )}

        <div className='flex items-center gap-1 text-gray-600'>
          <Calendar size={16} />
          <span>{dateInfo}</span>
        </div>

        <div className='flex items-center gap-1 text-gray-600'>
          <Clock size={16} />
          <span>{runtimeInfo}</span>
        </div>

        {type === 'tv' && numberOfSeasons && (
          <div className='flex items-center gap-1 text-gray-600'>
            <Tv size={16} />
            <span>
              {numberOfSeasons} Season{numberOfSeasons !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Genres */}
      {genres.length > 0 && (
        <div className='mb-6'>
          <div className='flex flex-wrap gap-2'>
            {genres.map((genre) => (
              <span
                key={genre.id}
                className='px-3 py-1 bg-primary/10 text-primary rounded-full text-sm'
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Overview */}
      {overview && (
        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-2'>Overview</h3>
          <p className='text-gray-700 leading-relaxed'>{overview}</p>
        </div>
      )}
    </div>
  );
}
