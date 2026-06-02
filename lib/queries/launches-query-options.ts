import { type InfiniteData, infiniteQueryOptions } from '@tanstack/react-query';

import { FIRST_PAGE } from '@/lib/constants/pagination';
import { queryKeys } from '@/lib/constants/query-keys';
import { fetchLaunchesPage } from '@/lib/data/launches-list';
import type { ApiError } from '@/lib/types/api';
import type {
  LaunchListResponse,
  LaunchesQueryParams,
} from '@/lib/types/launches';

const LAUNCHES_STALE_TIME = 60 * 1000;

type InfiniteLaunchesQueryKey = [
  typeof queryKeys.launches,
  typeof queryKeys.infiniteLaunches,
  LaunchesQueryParams,
];

function getNextLaunchesPage(lastPage: LaunchListResponse) {
  if (!lastPage.hasNextPage) {
    return null;
  }

  return lastPage.nextPage ?? lastPage.page + 1;
}

function getLaunchesPageParam(pageParam: unknown) {
  if (typeof pageParam === 'number') {
    return pageParam;
  }

  return FIRST_PAGE;
}

export function infiniteLaunchesQueryOptions(params: LaunchesQueryParams = {}) {
  return infiniteQueryOptions<
    LaunchListResponse,
    ApiError,
    InfiniteData<LaunchListResponse, number>,
    InfiniteLaunchesQueryKey,
    number
  >({
    getNextPageParam: getNextLaunchesPage,
    initialPageParam: FIRST_PAGE,
    queryFn: ({ pageParam }) =>
      fetchLaunchesPage({
        page: getLaunchesPageParam(pageParam),
        params,
      }),
    queryKey: [queryKeys.launches, queryKeys.infiniteLaunches, params],
    staleTime: LAUNCHES_STALE_TIME,
  });
}
