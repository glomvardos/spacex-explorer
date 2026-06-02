import { queryOptions } from '@tanstack/react-query';

import { FIRST_PAGE } from '@/lib/constants/pagination';
import { queryKeys } from '@/lib/constants/query-keys';
import { fetchLaunchesPage } from '@/lib/data/launches-list';
import type { ApiError } from '@/lib/types/api';
import type { LaunchListItem, LaunchListResponse } from '@/lib/types/launches';

const LAUNCH_SEARCH_LIMIT = 8;
const LAUNCH_SEARCH_STALE_TIME = 60 * 1000;

type LaunchSearchQueryKey = [
  typeof queryKeys.launches,
  typeof queryKeys.searchLaunches,
  string,
];

export function launchSearchQueryOptions(search: string) {
  const trimmedSearch = search.trim();

  return queryOptions<
    LaunchListResponse,
    ApiError,
    LaunchListItem[],
    LaunchSearchQueryKey
  >({
    enabled: trimmedSearch.length > 0,
    queryFn: () =>
      fetchLaunchesPage({
        page: FIRST_PAGE,
        params: { limit: LAUNCH_SEARCH_LIMIT, search: trimmedSearch },
      }),
    queryKey: [queryKeys.launches, queryKeys.searchLaunches, trimmedSearch],
    select: (response) => response.docs,
    staleTime: LAUNCH_SEARCH_STALE_TIME,
  });
}
