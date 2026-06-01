'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/constants/query-keys';
import { fetchLaunchesPage } from '@/lib/data/launches';
import type { ApiError } from '@/lib/types/api';
import type {
  LaunchesQueryParams,
  LaunchesQueryResponse,
} from '@/lib/types/launches';

const FIRST_PAGE = 1;

export function useInfiniteLaunchesQuery(params: LaunchesQueryParams = {}) {
  return useInfiniteQuery<LaunchesQueryResponse, ApiError>({
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? (lastPage.nextPage ?? lastPage.page + 1) : null,
    initialPageParam: FIRST_PAGE,
    queryFn: ({ pageParam }) =>
      fetchLaunchesPage({
        page: typeof pageParam === 'number' ? pageParam : FIRST_PAGE,
        params,
      }),
    queryKey: [queryKeys.launches, queryKeys.infiniteLaunches, params],
  });
}
