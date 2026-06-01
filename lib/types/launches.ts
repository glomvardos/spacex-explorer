export type LaunchTimelineFilter = 'all' | 'upcoming' | 'past';

export type LaunchOutcomeFilter = 'all' | 'success' | 'failure';

export type LaunchSortField = 'date_utc' | 'name';

export type SortDirection = 'asc' | 'desc';

export type LaunchesQueryParams = {
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  outcome?: LaunchOutcomeFilter;
  search?: string;
  sortDirection?: SortDirection;
  sortField?: LaunchSortField;
  timeline?: LaunchTimelineFilter;
};

export type SpaceXLaunch = {
  id: string;
  name: string;
  date_utc: string;
  upcoming: boolean;
  success: boolean | null;
  details: string | null;
  links: {
    article: string | null;
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
    wikipedia: string | null;
  };
};

export type SpaceXQueryResponse<TDoc> = {
  docs: TDoc[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export type LaunchesQueryResponse = SpaceXQueryResponse<SpaceXLaunch>;

export type LaunchesQuery = {
  date_utc?: {
    $gte?: string;
    $lte?: string;
  };
  name?: {
    $options: 'i';
    $regex: string;
  };
  success?: boolean;
  upcoming?: boolean;
};

export type LaunchesQueryRequest = {
  options: {
    limit: number;
    page: number;
    sort: Partial<Record<LaunchSortField, SortDirection>>;
  };
  query: LaunchesQuery;
};
