import { DEFAULT_FILTERS } from '@/lib/constants/launch-filters';
import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';

export function areLaunchesFiltersEqual(
  filters: LaunchesFiltersFormState,
  nextFilters: LaunchesFiltersFormState,
) {
  return (
    filters.dateFrom === nextFilters.dateFrom &&
    filters.dateTo === nextFilters.dateTo &&
    filters.outcome === nextFilters.outcome &&
    filters.search.trim() === nextFilters.search.trim() &&
    filters.sort === nextFilters.sort &&
    filters.timeline === nextFilters.timeline
  );
}

export function hasDefaultLaunchesFilters(filters: LaunchesFiltersFormState) {
  return areLaunchesFiltersEqual(filters, DEFAULT_FILTERS);
}
