import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { getBackdropUrl } from '../../lib/utils';

type Props = {
  backdropPath: string | null;
  title: string;
  backPath?: string;
};

export default function MediaBanner({
  backdropPath,
  title,
  backPath = '/',
}: Props) {
  return (
    <>
      {getBackdropUrl(backdropPath) && (
        <div className='relative h-96 lg:h-[500px] overflow-hidden'>
          <img
            src={getBackdropUrl(backdropPath)!}
            alt={`${title} backdrop`}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-black/50' />

          {/* Back button overlay */}
          <div className='absolute top-4 left-4'>
            <Link
              to={backPath}
              className='inline-flex items-center gap-2 px-4 py-2 bg-black/70 text-white rounded-lg hover:bg-black/80 transition-colors'
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
