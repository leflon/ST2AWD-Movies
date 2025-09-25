/**
 * Fetcher function for SWR that makes requests to The Movie Database (TMDB) API
 *
 * This function automatically:
 * - Prepends the TMDB API base URL to the endpoint
 * - Adds the required Authorization header with Bearer token
 * - Handles HTTP errors by throwing descriptive error messages
 * - Parses and returns JSON response data
 *
 * @param endpoint - The API endpoint path (e.g., '/movie/123', '/search/multi?query=batman')
 */
export default async function fetcher(endpoint: string) {
  const url = `https://api.themoviedb.org/3${endpoint}`;
  const headers = new Headers();
  headers.append(
    'Authorization',
    `Bearer ${import.meta.env.VITE_PUBLIC_TMDB_API_KEY}`,
  );
  return fetch(url, { headers }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  });
}
