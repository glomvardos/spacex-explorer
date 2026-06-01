'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { endpoints } from '@/lib/constants/endpoints';
import { queryKeys } from '@/lib/constants/query-keys';
import { queryData } from '@/lib/requests/query-data';
import type { ApiError } from '@/lib/types/api';
import type {
  LaunchesQuery,
  LaunchesQueryParams,
  LaunchesQueryRequest,
  LaunchesQueryResponse,
  LaunchSortField,
  SortDirection,
} from '@/lib/types/launches';

const DEFAULT_LAUNCHES_LIMIT = 20;
const DEFAULT_SORT_DIRECTION: SortDirection = 'desc';
const DEFAULT_SORT_FIELD: LaunchSortField = 'date_utc';
const FIRST_PAGE = 1;

function createLaunchesQuery(params: LaunchesQueryParams) {
  const query: LaunchesQuery = {};
  const search = params.search?.trim();

  if (search) {
    query.name = { $options: 'i', $regex: search };
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

export function useInfiniteLaunchesQuery(params: LaunchesQueryParams = {}) {
  return useInfiniteQuery<LaunchesQueryResponse, ApiError>({
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? (lastPage.nextPage ?? lastPage.page + 1) : null,
    initialPageParam: FIRST_PAGE,
    queryFn: ({ pageParam }) => {
      const page = typeof pageParam === 'number' ? pageParam : FIRST_PAGE;
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
    },
    queryKey: [queryKeys.launches, queryKeys.infiniteLaunches, params],
  });
}
