import { DEFAULT_FILTERS } from '@/lib/constants/launch-filters';
import { launchesSearchParamKeys } from '@/lib/constants/launches-search-param-keys';
import { routePaths } from '@/lib/constants/route-paths';
import type {
  LaunchSortOption,
  LaunchesFiltersFormState,
} from '@/lib/types/launch-filters';
import type {
  LaunchOutcomeFilter,
  LaunchTimelineFilter,
} from '@/lib/types/launches';

export type PageSearchParams = Record<string, string | string[] | undefined>;

const dateInputPattern = /^\d{4}-\d{2}-\d{2}$/;

const outcomeFilters = {
  all: 'all',
  failure: 'failure',
  success: 'success',
} satisfies Record<LaunchOutcomeFilter, LaunchOutcomeFilter>;

const sortOptions = {
  'date-asc': 'date-asc',
  'date-desc': 'date-desc',
  'name-asc': 'name-asc',
  'name-desc': 'name-desc',
} satisfies Record<LaunchSortOption, LaunchSortOption>;

const timelineFilters = {
  all: 'all',
  past: 'past',
  upcoming: 'upcoming',
} satisfies Record<LaunchTimelineFilter, LaunchTimelineFilter>;

function getSearchParamValue(searchParams: PageSearchParams, key: string) {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function getDateFilter(value: string | undefined) {
  if (!value || !dateInputPattern.test(value)) {
    return '';
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
  ) {
    return '';
  }

  return value;
}

function getOutcomeFilter(value: string | undefined) {
  if (!value || !(value in outcomeFilters)) {
    return DEFAULT_FILTERS.outcome;
  }

  return outcomeFilters[value as keyof typeof outcomeFilters];
}

function getSortOption(value: string | undefined) {
  if (!value || !(value in sortOptions)) {
    return DEFAULT_FILTERS.sort;
  }

  return sortOptions[value as keyof typeof sortOptions];
}

function getTimelineFilter(value: string | undefined) {
  if (!value || !(value in timelineFilters)) {
    return DEFAULT_FILTERS.timeline;
  }

  return timelineFilters[value as keyof typeof timelineFilters];
}

export function parseLaunchesSearchParams(
  searchParams: PageSearchParams,
): LaunchesFiltersFormState {
  return {
    dateFrom: getDateFilter(
      getSearchParamValue(searchParams, launchesSearchParamKeys.dateFrom),
    ),
    dateTo: getDateFilter(
      getSearchParamValue(searchParams, launchesSearchParamKeys.dateTo),
    ),
    outcome: getOutcomeFilter(
      getSearchParamValue(searchParams, launchesSearchParamKeys.outcome),
    ),
    search:
      getSearchParamValue(searchParams, launchesSearchParamKeys.search) ?? '',
    sort: getSortOption(
      getSearchParamValue(searchParams, launchesSearchParamKeys.sort),
    ),
    timeline: getTimelineFilter(
      getSearchParamValue(searchParams, launchesSearchParamKeys.timeline),
    ),
  };
}

export function createLaunchesSearchParams(filters: LaunchesFiltersFormState) {
  const searchParams = new URLSearchParams();
  const search = filters.search.trim();

  if (search) {
    searchParams.set(launchesSearchParamKeys.search, search);
  }

  if (filters.timeline !== DEFAULT_FILTERS.timeline) {
    searchParams.set(launchesSearchParamKeys.timeline, filters.timeline);
  }

  if (filters.outcome !== DEFAULT_FILTERS.outcome) {
    searchParams.set(launchesSearchParamKeys.outcome, filters.outcome);
  }

  if (filters.dateFrom) {
    searchParams.set(launchesSearchParamKeys.dateFrom, filters.dateFrom);
  }

  if (filters.dateTo) {
    searchParams.set(launchesSearchParamKeys.dateTo, filters.dateTo);
  }

  if (filters.sort !== DEFAULT_FILTERS.sort) {
    searchParams.set(launchesSearchParamKeys.sort, filters.sort);
  }

  return searchParams;
}

export function createLaunchesUrl(filters: LaunchesFiltersFormState) {
  const searchParams = createLaunchesSearchParams(filters);
  const queryString = searchParams.toString();

  if (!queryString) {
    return routePaths.home;
  }

  return `${routePaths.home}?${queryString}`;
}
