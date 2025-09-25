/**
 * Common media item interface that contains shared properties
 * between movies and TV shows from TMDB API
 */
export interface BaseMediaItem {
  /** Unique identifier for the media item */
  id: number;
  /** Plot synopsis of the media */
  overview: string;
  /** Path to the poster image (relative to TMDB image base URL) */
  poster_path: string | null;
  /** Path to the backdrop image (relative to TMDB image base URL) */
  backdrop_path: string | null;
  /** Average user rating (0-10 scale) */
  vote_average: number;
  /** Total number of user votes */
  vote_count: number;
  /** Array of genre classifications */
  genres: Array<{ id: number; name: string }>;
  /** Production companies involved in creating the media */
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  /** Countries where the media was produced */
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  /** Languages spoken in the media */
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  /** Official website URL */
  homepage: string;
  /** Current status of the media (Released, In Production, etc.) */
  status: string;
  /** Marketing tagline or slogan */
  tagline: string;
}

/**
 * Cast member information from movie/TV show credits
 */
export interface CastMember {
  /** Unique identifier for the person */
  id: number;
  /** Real name of the actor */
  name: string;
  /** Character name they portray */
  character: string;
  /** Path to the person's profile image */
  profile_path: string | null;
  /** Billing order in the credits */
  order: number;
}

/**
 * Crew member information from movie/TV show credits
 */
export interface CrewMember {
  /** Unique identifier for the person */
  id: number;
  /** Real name of the crew member */
  name: string;
  /** Specific job title (Director, Producer, etc.) */
  job: string;
  /** Department they work in (Directing, Production, etc.) */
  department: string;
  /** Path to the person's profile image */
  profile_path: string | null;
}

/**
 * Complete credits information including cast and crew
 */
export interface Credits {
  /** Array of cast members */
  cast: CastMember[];
  /** Array of crew members */
  crew: CrewMember[];
}

/**
 * Movie-specific details extending base media properties
 */
export interface MovieDetails extends BaseMediaItem {
  /** Movie title */
  title: string;
  /** Release date in YYYY-MM-DD format */
  release_date: string;
  /** Runtime duration in minutes */
  runtime: number;
  /** Production budget in USD */
  budget: number;
  /** Box office revenue in USD */
  revenue: number;
  /** IMDb identifier */
  imdb_id: string;
}

/**
 * TV show creator information
 */
export interface Creator {
  /** Unique identifier for the creator */
  id: number;
  /** Creator's name */
  name: string;
  /** Path to the creator's profile image */
  profile_path: string | null;
}

/**
 * TV network information
 */
export interface Network {
  /** Unique identifier for the network */
  id: number;
  /** Network name */
  name: string;
  /** Path to the network's logo image */
  logo_path: string | null;
  /** Country of origin for the network */
  origin_country: string;
}

/**
 * TV show season information
 */
export interface Season {
  /** Unique identifier for the season */
  id: number;
  /** Season name or title */
  name: string;
  /** Season description */
  overview: string;
  /** Path to the season's poster image */
  poster_path: string | null;
  /** Season number (0 for specials, 1+ for regular seasons) */
  season_number: number;
  /** Total number of episodes in the season */
  episode_count: number;
  /** Season premiere date in YYYY-MM-DD format */
  air_date: string;
}

/**
 * TV show-specific details extending base media properties
 */
export interface TVDetails extends BaseMediaItem {
  /** TV show name/title */
  name: string;
  /** First air date in YYYY-MM-DD format */
  first_air_date: string;
  /** Last air date in YYYY-MM-DD format */
  last_air_date: string;
  /** Typical episode runtime in minutes (array for varying lengths) */
  episode_run_time: number[];
  /** Array of show creators */
  created_by: Creator[];
  /** Networks that aired/stream the show */
  networks: Network[];
  /** Total number of episodes across all seasons */
  number_of_episodes: number;
  /** Total number of seasons */
  number_of_seasons: number;
  /** Array of season information */
  seasons: Season[];
  /** Type of TV show (Documentary, Reality, etc.) */
  type: string;
  /** Whether the show is still in production */
  in_production: boolean;
}

/**
 * Simplified movie/TV item for search results and lists
 */
export interface Movie {
  /** Unique identifier */
  id: number;
  /** Movie title (for movies) */
  title?: string;
  /** Show name (for TV shows) */
  name?: string;
  /** Path to poster image */
  poster_path: string | null;
  /** Movie release date */
  release_date?: string;
  /** TV show first air date */
  first_air_date?: string;
  /** Plot overview */
  overview: string;
  /** Average user rating */
  vote_average: number;
  /** Total number of votes */
  vote_count: number;
  /** Media type classification */
  media_type?: 'movie' | 'tv' | 'person';
}

/**
 * TMDB API response structure for search and list endpoints
 */
export interface TMDBResponse {
  /** Array of media items matching the query */
  results: Movie[];
  /** Total number of results available */
  total_results: number;
  /** Total number of pages available */
  total_pages: number;
}

/**
 * Favorite item stored in user's favorites list
 */
export interface FavoriteItem {
  /** Unique identifier */
  id: number;
  /** Movie title (for movies) */
  title?: string;
  /** Show name (for TV shows) */
  name?: string;
  /** Path to poster image */
  poster_path: string | null;
  /** Movie release date */
  release_date?: string;
  /** TV show first air date */
  first_air_date?: string;
  /** Average user rating */
  vote_average: number;
  /** Media type classification */
  media_type: 'movie' | 'tv' | 'person';
}

/**
 * Genre classification
 */
export interface Genre {
  /** Unique identifier for the genre */
  id: number;
  /** Genre name (Action, Comedy, etc.) */
  name: string;
}

/**
 * Theme context values for application theming
 */
export interface ThemeContextType {
  /** Current theme mode */
  theme: 'light' | 'dark';
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Function to set a specific theme */
  setTheme: (theme: ThemeMode) => void;
}

/**
 * Favorites context values for managing user's favorite items
 */
export interface FavoritesContextType {
  /** Array of user's favorite items */
  favorites: FavoriteItem[];
  /** Add an item to favorites */
  addToFavorites: (item: FavoriteItem) => void;
  /** Remove an item from favorites */
  removeFromFavorites: (
    id: number,
    mediaType: 'movie' | 'tv' | 'person',
  ) => void;
  /** Check if an item is in favorites */
  isFavorite: (id: number, mediaType: 'movie' | 'tv' | 'person') => boolean;
  /** Toggle favorite status of an item */
  toggleFavorite: (item: FavoriteItem) => void;
  /** Clear all favorites */
  clearFavorites: () => void;
}

/**
 * Search bar component variants
 */
export type SearchBarVariant = 'big' | 'small';

/**
 * Media type for routing and display purposes
 */
export type MediaType = 'movie' | 'tv' | 'person';

/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark';
