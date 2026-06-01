import { queryData } from '@/lib/api/query-data';
import { endpoints } from '@/lib/constants/endpoints';
import type {
  LaunchSortField,
  LaunchesQuery,
  LaunchesQueryParams,
  LaunchesQueryRequest,
  LaunchesQueryResponse,
  SortDirection,
} from '@/lib/types/launches';

const DEFAULT_LAUNCHES_LIMIT = 20;
const DEFAULT_SORT_DIRECTION: SortDirection = 'desc';
const DEFAULT_SORT_FIELD: LaunchSortField = 'date_utc';
const regexSpecialCharacters = /[.*+?^${}()|[\]\\]/g;

type FetchLaunchesPageInput = {
  page: number;
  params?: LaunchesQueryParams;
};

function escapeRegExp(value: string) {
  return value.replace(regexSpecialCharacters, '\\$&');
}

function createLaunchesQuery(params: LaunchesQueryParams) {
  const query: LaunchesQuery = {};
  const search = params.search?.trim();

  if (search) {
    query.name = {
      $options: 'i',
      $regex: escapeRegExp(search),
    };
  }

  switch (params.timeline) {
    case 'upcoming':
      query.upcoming = true;
      break;
    case 'past':
      query.upcoming = false;
      break;
  }

  switch (params.outcome) {
    case 'success':
      query.success = true;
      break;
    case 'failure':
      query.success = false;
      break;
  }

  if (params.dateFrom || params.dateTo) {
    query.date_utc = {};

    if (params.dateFrom) {
      query.date_utc.$gte = params.dateFrom;
    }

    if (params.dateTo) {
      query.date_utc.$lte = params.dateTo;
    }
  }

  return query;
}

export function fetchLaunchesPage({
  page,
  params = {},
}: FetchLaunchesPageInput) {
  const sortField = params.sortField ?? DEFAULT_SORT_FIELD;
  const sortDirection = params.sortDirection ?? DEFAULT_SORT_DIRECTION;
  const body: LaunchesQueryRequest = {
    options: {
      limit: params.limit ?? DEFAULT_LAUNCHES_LIMIT,
      page,
      sort: { [sortField]: sortDirection },
    },
    query: createLaunchesQuery(params),
  };

  return queryData<LaunchesQueryResponse>(endpoints.launchesQuery, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}
