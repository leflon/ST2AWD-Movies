/**
 * Search components for the search page functionality
 *
 * This module exports components used for search functionality,
 * including filters, results grid, and pagination.
 */

export { default as SearchFilters } from './SearchFilters';
export { default as SearchResultsGrid } from './SearchResultsGrid';
export { default as SearchPagination } from './SearchPagination';

// Export the SearchFilters type separately to avoid naming conflicts
export type { SearchFilters as SearchFiltersType } from './SearchFilters';
