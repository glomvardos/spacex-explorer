import type {
  LaunchSortOption,
  LaunchSortParams,
  LaunchesFiltersFormState,
} from '@/lib/types/launch-filters';
import type {
  LaunchOutcomeFilter,
  LaunchTimelineFilter,
} from '@/lib/types/launches';

export const DEFAULT_FILTERS: LaunchesFiltersFormState = {
  dateFrom: '',
  dateTo: '',
  outcome: 'all',
  search: '',
  sort: 'date-desc',
  timeline: 'all',
};

export const launchSortParamsByOption = {
  'date-asc': { sortDirection: 'asc', sortField: 'date_utc' },
  'date-desc': { sortDirection: 'desc', sortField: 'date_utc' },
  'name-asc': { sortDirection: 'asc', sortField: 'name' },
  'name-desc': { sortDirection: 'desc', sortField: 'name' },
} satisfies Record<LaunchSortOption, LaunchSortParams>;

export const launchTimelineOptions: {
  label: string;
  value: LaunchTimelineFilter;
}[] = [
  { label: 'All launches', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
];

export const launchOutcomeOptions: {
  label: string;
  value: LaunchOutcomeFilter;
}[] = [
  { label: 'All outcomes', value: 'all' },
  { label: 'Successful', value: 'success' },
  { label: 'Failed', value: 'failure' },
];

export const launchSortOptions: { label: string; value: LaunchSortOption }[] =
  [
    { label: 'Newest first', value: 'date-desc' },
    { label: 'Oldest first', value: 'date-asc' },
    { label: 'Name A-Z', value: 'name-asc' },
    { label: 'Name Z-A', value: 'name-desc' },
  ];
