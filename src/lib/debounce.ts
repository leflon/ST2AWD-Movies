import { useEffect, useState } from 'react';

/**
 * Custom React hook that debounces a value by delaying updates until after a specified delay
 *
 * This hook is useful for preventing excessive API calls or expensive operations that
 * should only happen after the user has stopped changing a value (like search input).
 *
 * @param value - The reactive value to debounce (e.g., user input, search query)
 * @param delay - The debounce delay in milliseconds before the value updates
 * @returns The debounced value that only updates after the delay period
 */
export default function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const to = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(to);
    };
  }, [value, delay]);

  return debouncedValue;
}
