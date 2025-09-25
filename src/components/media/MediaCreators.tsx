/**
 * Props for MediaCreators component
 */
interface MediaCreatorsProps {
  /** Media type (movie or tv) */
  type: 'movie' | 'tv';
  /** Array of director names (for movies) */
  directors?: string[];
  /** Array of creator names (for TV shows) */
  creators?: string[];
  /** Array of network names (for TV shows) */
  networks?: string[];
}

/**
 * Component that displays creators, directors, and networks for media items
 */
export default function MediaCreators({
  type,
  directors = [],
  creators = [],
  networks = [],
}: MediaCreatorsProps) {
  if (type === 'movie') {
    return directors.length > 0 ? (
      <div className='mb-6'>
        <h3 className='text-xl font-semibold mb-2'>
          Director{directors.length > 1 ? 's' : ''}
        </h3>
        <div className='flex flex-wrap gap-2'>
          {directors.map((director, index) => (
            <span key={index} className='text-gray-700 font-medium'>
              {director}
            </span>
          ))}
        </div>
      </div>
    ) : null;
  }

  return (
    <>
      {creators.length > 0 && (
        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-2'>
            Creator{creators.length > 1 ? 's' : ''}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {creators.map((creator, index) => (
              <span key={index} className='text-gray-700 font-medium'>
                {creator}
              </span>
            ))}
          </div>
        </div>
      )}
      {networks.length > 0 && (
        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-2'>
            Network{networks.length > 1 ? 's' : ''}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {networks.map((network, index) => (
              <span key={index} className='text-gray-700 font-medium'>
                {network}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
