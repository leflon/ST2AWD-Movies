import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { ThemeMode, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';

    try {
      const stored = localStorage.getItem('movie-theme');
      if (stored === 'light' || stored === 'dark') {
        return stored as ThemeMode;
      }
    } catch (error) {
      console.error('Failed to read theme from localStorage:', error);
    }

    // Fall back to system preference
    try {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      return systemTheme;
    } catch {
      return 'light';
    }
  };

  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    const applyTheme = (newTheme: ThemeMode) => {
      try {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('movie-theme', newTheme);
      } catch (error) {
        console.error('Failed to apply theme:', error);
      }
    };

    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
