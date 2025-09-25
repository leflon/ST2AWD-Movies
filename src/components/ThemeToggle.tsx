import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
  size?: number;
  className?: string;
  showText?: boolean;
};

export default function ThemeToggle({
  size = 24,
  className = '',
  showText = false,
}: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex items-center gap-2 p-2 rounded-lg transition-all duration-200
        hover:scale-110 active:scale-95
        bg-surface hover:bg-surface-hover
        text-muted hover:text-text
        ${className}
      `}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon size={size} className='transition-transform duration-200' />
      ) : (
        <Sun size={size} className='transition-transform duration-200' />
      )}
      {showText && (
        <span className='text-sm font-medium'>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
}
