import { Globe } from 'lucide-react';
import { formatMoney } from '../../lib/utils';

type BaseDetailsProps = {
  homepage?: string;
  imdbId?: string;
  productionCountries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  status: string;
};

type MovieDetailsProps = BaseDetailsProps & {
  type: 'movie';
  budget?: number;
  revenue?: number;
};

type TVDetailsProps = BaseDetailsProps & {
  type: 'tv';
  showType?: string;
  numberOfEpisodes?: number;
  inProduction?: boolean;
};

type Props = MovieDetailsProps | TVDetailsProps;

export default function MediaDetails(props: Props) {
  const hasFinancialInfo =
    props.type === 'movie' && (props.budget || props.revenue);
  const hasProductionInfo = props.productionCountries.length > 0;
  const hasLinks = props.homepage || props.imdbId;

  if (!hasFinancialInfo && !hasProductionInfo && !hasLinks) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {/* Financial info (Movies only) */}
      {hasFinancialInfo && (
        <div className='bg-secondary p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Box Office</h3>
          {props.budget && props.budget > 0 && (
            <div className='mb-2'>
              <span className='font-bold'>Budget: </span>
              <span className='font-medium'>{formatMoney(props.budget)}</span>
            </div>
          )}
          {props.revenue && props.revenue > 0 && (
            <div>
              <span className='font-bold'>Revenue: </span>
              <span className='font-medium'>{formatMoney(props.revenue)}</span>
            </div>
          )}
        </div>
      )}

      {/* Show info (TV shows only) */}
      {props.type === 'tv' && (
        <div className='bg-secondary p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Show Info</h3>
          <div className='space-y-2'>
            <div>
              <span className='font-bold'>Status: </span>
              <span>{props.status}</span>
            </div>
            {props.showType && (
              <div>
                <span className='font-bold'>Type: </span>
                <span>{props.showType}</span>
              </div>
            )}
            {props.numberOfEpisodes && (
              <div>
                <span className='font-bold'>Episodes: </span>
                <span>{props.numberOfEpisodes}</span>
              </div>
            )}
            {props.inProduction !== undefined && (
              <div>
                <span className='font-bold'>In Production: </span>
                <span>{props.inProduction ? 'Yes' : 'No'}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Production info */}
      {hasProductionInfo && (
        <div className='bg-secondary p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Production</h3>
          <div className='mb-2'>
            <span className='font-bold'>Status: </span>
            <span>{props.status}</span>
          </div>
          <div>
            <span className=' font-bold'>Countries: </span>
            <span>
              {props.productionCountries
                .map((country) => country.name)
                .join(', ')}
            </span>
          </div>
        </div>
      )}

      {/* External links */}
      {hasLinks && (
        <div className='bg-secondary p-6 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold mb-4'>Links</h3>
          <div className='space-y-2'>
            {props.homepage && (
              <a
                href={props.homepage}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-primary hover:text-primary/80 transition-colors'
              >
                <Globe size={16} />
                Official Website
              </a>
            )}
            {props.imdbId && (
              <a
                href={`https://www.imdb.com/title/${props.imdbId}`}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 text-primary hover:text-primary/80 transition-colors'
              >
                <Globe size={16} />
                IMDb
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
