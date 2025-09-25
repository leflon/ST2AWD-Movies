import { Link } from 'react-router';
import { Film } from 'lucide-react';

/**
 * Logo component for the navigation bar
 * Displays the application logo and name with link to home page
 */
export default function NavbarLogo() {
  return (
    <Link
      to='/'
      className='flex items-center gap-2 text-primary hover:opacity-80 transition-all'
    >
      <Film size={32} />
      <span className='text-xl font-bold'>MovieDB</span>
    </Link>
  );
}
