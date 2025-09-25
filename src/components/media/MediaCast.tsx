import { Users } from 'lucide-react';
import { getPosterUrl } from '../../lib/utils';
import type { CastMember } from '../../types';

/**
 * Props for MediaCast component
 */
interface MediaCastProps {
  /** Array of cast members to display */
  cast: CastMember[];
  /** Title for the cast section */
  title?: string;
  /** Maximum number of cast members to display */
  maxItems?: number;
}

/**
 * Component that displays a grid of cast members with their photos and character names
 */
export default function MediaCast({
  cast,
  title = 'Cast',
  maxItems = 12,
}: MediaCastProps) {
  const displayCast = cast.slice(0, maxItems);

  if (displayCast.length === 0) {
    return null;
  }

  return (
    <div className='mb-8'>
      <h2 className='text-2xl font-bold text-text mb-4'>{title}</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {displayCast.map((actor) => (
          <div key={actor.id} className='text-center'>
            <div className='aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-2'>
              {getPosterUrl(actor.profile_path, 'w185') ? (
                <img
                  src={getPosterUrl(actor.profile_path, 'w185')!}
                  alt={actor.name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                  <Users size={32} />
                </div>
              )}
            </div>
            <h4 className='text-sm font-semibold text-text line-clamp-2'>
              {actor.name}
            </h4>
            <p className='text-xs text-gray-600 line-clamp-2'>
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
