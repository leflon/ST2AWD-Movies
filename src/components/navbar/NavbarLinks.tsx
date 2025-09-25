import { Link } from 'react-router';
import { Heart } from 'lucide-react';

/**
 * Navigation links component for the navbar
 * Displays Home and Favorites links with favorites counter
 */
export default function NavbarLinks() {
  return (
    <div className='flex items-center gap-4'>
      <Link
        to='/'
        className='text-muted hover:text-primary transition-colors font-medium'
      >
        Home
      </Link>

      {/* Favorites */}
      <Link
        to='/favorites'
        className='relative flex items-center gap-1 text-muted hover:text-primary transition-colors font-medium'
      >
        <Heart size={20} />
        <span>Favorites</span>
      </Link>
    </div>
  );
}
