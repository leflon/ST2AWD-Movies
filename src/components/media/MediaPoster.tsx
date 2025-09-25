import { getPosterUrl } from '../../lib/utils';

/**
 * Props for MediaPoster component
 */
interface MediaPosterProps {
  /** Path to the poster image */
  posterPath: string | null;
  /** Media title for alt text */
  title: string;
  /** Media type for fallback icon */
  type: 'movie' | 'tv';
}

/**
 * Component that displays a media poster with fallback for missing images
 */
export default function MediaPoster({ posterPath, title, type }: MediaPosterProps) {
  return (
    <div className='flex-shrink-0'>
      <div className='w-64 mx-auto lg:mx-0'>
        {getPosterUrl(posterPath) ? (
          <img
            src={getPosterUrl(posterPath)!}
            alt={`${title} poster`}
            className='w-full rounded-lg shadow-lg'
          />
        ) : (
          <div className='w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center'>
            <div className='text-center text-gray-400'>
              <div className='text-6xl mb-4'>
                {type === 'movie' ? '🎬' : '📺'}
              </div>
              <div>No Poster</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
