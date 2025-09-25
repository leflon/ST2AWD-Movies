import { getPosterUrl, formatDate } from '../lib/utils';

type Season = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
};

type Props = {
  seasons: Season[];
  title?: string;
};

export default function TVSeasons({ seasons, title = 'Seasons' }: Props) {
  const displaySeasons = seasons.filter((season) => season.season_number > 0);

  if (displaySeasons.length === 0) {
    return null;
  }

  return (
    <div className='mb-8'>
      <h2 className='text-2xl font-bold text-text mb-4'>{title}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {displaySeasons.map((season) => (
          <div
            key={season.id}
            className='bg-white rounded-lg shadow-md overflow-hidden'
          >
            <div className='aspect-[2/3] bg-gray-200'>
              {getPosterUrl(season.poster_path, 'w300') ? (
                <img
                  src={getPosterUrl(season.poster_path, 'w300')!}
                  alt={`${season.name} poster`}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                  <div className='text-center'>
                    <div className='text-4xl mb-2'>📺</div>
                    <div className='text-sm'>No Image</div>
                  </div>
                </div>
              )}
            </div>
            <div className='p-3'>
              <h4 className='font-semibold text-text mb-1'>{season.name}</h4>
              <p className='text-sm text-gray-600 mb-1'>
                {season.episode_count} episode
                {season.episode_count !== 1 ? 's' : ''}
              </p>
              {season.air_date && (
                <p className='text-xs text-gray-500'>
                  {formatDate(season.air_date)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
