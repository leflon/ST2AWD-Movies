import NavbarLogo from './navbar/NavbarLogo';
import NavbarSearch from './navbar/NavbarSearch';
import NavbarLinks from './navbar/NavbarLinks';
import ThemeToggle from './ThemeToggle';

/**
 * Props for Navbar component
 */
interface NavbarProps {
  /** Whether to show the search bar */
  showSearch?: boolean;
}

/**
 * Main navigation bar component
 * Contains logo, search functionality, navigation links, and theme toggle
 */
export default function Navbar({ showSearch = false }: NavbarProps) {
  return (
    <nav className='bg-background border-b-2 border-subtle sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <NavbarLogo />
          <NavbarSearch showSearch={showSearch} />
          <div className='flex items-center gap-4'>
            <NavbarLinks />
            <ThemeToggle size={20} />
          </div>
        </div>
      </div>
    </nav>
  );
}
