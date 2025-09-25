/**
 * Generates a complete URL for a movie/TV show poster image
 * @param posterPath - The relative path from TMDB API
 * @param size - The image size variant (default: 'w500')
 * @returns Complete URL or null if no poster path provided
 */
export const getPosterUrl = (
  posterPath: string | null,
  size: string = 'w500',
) => {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};

/**
 * Generates a complete URL for a backdrop image
 * @param backdropPath - The relative path from TMDB API
 * @returns Complete URL or null if no backdrop path provided
 */
export const getBackdropUrl = (backdropPath: string | null) => {
  if (!backdropPath) return null;
  return `https://image.tmdb.org/t/p/w1280${backdropPath}`;
};

/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Formatted date string or 'Unknown' if invalid
 */
export const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Extracts and formats the year from a date string
 * @param dateString - ISO date string (YYYY-MM-DD)
 * @returns Year as string or 'Unknown' if invalid
 */
export const formatYear = (dateString: string) => {
  if (!dateString) return 'Unknown';
  return new Date(dateString).getFullYear().toString();
};

/**
 * Converts runtime in minutes to hours and minutes format
 * @param minutes - Runtime duration in minutes
 * @returns Formatted runtime string (e.g., "2h 30m" or "45m")
 */
export const formatRuntime = (minutes: number) => {
  if (!minutes) return 'Unknown';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
};

/**
 * Calculates average runtime from an array of runtimes and formats it
 * @param runtimes - Array of runtime durations in minutes
 * @returns Formatted average runtime string
 */
export const formatRuntimeFromArray = (runtimes: number[]) => {
  if (!runtimes || runtimes.length === 0) return 'Unknown';
  const avgRuntime = Math.round(
    runtimes.reduce((a, b) => a + b, 0) / runtimes.length,
  );
  return `${avgRuntime}m`;
};

/**
 * Formats a monetary amount as USD currency
 * @param amount - Amount in USD
 * @returns Formatted currency string or 'Unknown' if invalid
 */
export const formatMoney = (amount: number) => {
  if (!amount) return 'Unknown';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a rating number to one decimal place
 * @param rating - Rating value (typically 0-10)
 * @returns Formatted rating string or 'N/A' if invalid
 */
export const getRating = (rating: number) => {
  return rating > 0 ? rating.toFixed(1) : 'N/A';
};

/**
 * Filters out person results from search results, keeping only movies and TV shows
 * @param results - Array of search results from TMDB API
 * @returns Filtered array containing only movie and TV show results
 */
export const filterMediaResults = <T extends { media_type?: string }>(
  results: T[],
): T[] => {
  return results.filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv',
  );
};
