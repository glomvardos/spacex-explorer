import {
  DEFAULT_FILTERS,
  launchSortParamsByOption,
} from '@/lib/constants/launch-filters';
import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';
import type { LaunchesQueryParams } from '@/lib/types/launches';

export function createLaunchesQueryParams(
  filters: LaunchesFiltersFormState,
): LaunchesQueryParams {
  const params: LaunchesQueryParams = {};
  const search = filters.search.trim();

  if (search) {
    params.search = search;
  }

  if (filters.timeline !== 'all') {
    params.timeline = filters.timeline;
  }

  if (filters.outcome !== 'all') {
    params.outcome = filters.outcome;
  }

  if (filters.dateFrom) {
    params.dateFrom = `${filters.dateFrom}T00:00:00.000Z`;
  }

  if (filters.dateTo) {
    params.dateTo = `${filters.dateTo}T23:59:59.999Z`;
  }

  if (filters.sort !== DEFAULT_FILTERS.sort) {
    const sortParams = launchSortParamsByOption[filters.sort];

    params.sortDirection = sortParams.sortDirection;
    params.sortField = sortParams.sortField;
  }

  return params;
}
