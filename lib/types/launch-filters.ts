import type {
  LaunchOutcomeFilter,
  LaunchSortField,
  LaunchTimelineFilter,
  SortDirection,
} from '@/lib/types/launches';

export type LaunchSortOption =
  | 'date-desc'
  | 'date-asc'
  | 'name-asc'
  | 'name-desc';

export type LaunchesFiltersFormState = {
  dateFrom: string;
  dateTo: string;
  outcome: LaunchOutcomeFilter;
  search: string;
  sort: LaunchSortOption;
  timeline: LaunchTimelineFilter;
};

export type LaunchSortParams = {
  sortDirection: SortDirection;
  sortField: LaunchSortField;
};
