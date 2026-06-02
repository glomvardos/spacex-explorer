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
  rocket: string;
  launchpad: string;
  payloads: string[];
  cores: SpaceXLaunchCore[];
  links: {
    article: string | null;
    flickr: {
      original: string[];
      small: string[];
    };
    patch: {
      small: string | null;
      large: string | null;
    };
    presskit: string | null;
    webcast: string | null;
    wikipedia: string | null;
    youtube_id: string | null;
  };
};

export type SpaceXLaunchCore = {
  core: string | null;
  flight: number | null;
  gridfins: boolean | null;
  landing_attempt: boolean | null;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
  legs: boolean | null;
  reused: boolean | null;
};

export type SpaceXRocket = {
  id: string;
  name: string;
  active: boolean;
  company: string;
  country: string;
  description: string;
  first_flight: string;
  success_rate_pct: number;
};

export type SpaceXLaunchpad = {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  status: string;
  details: string | null;
  launch_attempts: number;
  launch_successes: number;
};

export type SpaceXPayload = {
  id: string;
  name: string;
  type: string;
  customers: string[];
  manufacturers: string[];
  mass_kg: number | null;
  nationalities: string[];
  orbit: string | null;
};

export type SpaceXCore = {
  id: string;
  block: number | null;
  reuse_count: number;
  serial: string;
  status: string;
};

export type LaunchCoreDetail = {
  core: SpaceXCore | null;
  launchCore: SpaceXLaunchCore;
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

export type LaunchListItem = Pick<
  SpaceXLaunch,
  'id' | 'name' | 'date_utc' | 'details' | 'success' | 'upcoming'
> & {
  links: {
    patch: SpaceXLaunch['links']['patch'];
  };
};

export type LaunchListResponse = SpaceXQueryResponse<LaunchListItem>;

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
    select: string[];
    sort: Partial<Record<LaunchSortField, SortDirection>>;
  };
  query: LaunchesQuery;
};
