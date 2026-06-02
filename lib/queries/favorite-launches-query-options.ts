import { queryOptions } from '@tanstack/react-query';

import { queryKeys } from '@/lib/constants/query-keys';
import { fetchLaunchesByIds } from '@/lib/data/favorite-launches';
import type { ApiError } from '@/lib/types/api';
import type { LaunchListItem } from '@/lib/types/launches';

const FAVORITE_LAUNCHES_STALE_TIME = 60 * 1000;

type FavoriteLaunchesQueryKey = [
  typeof queryKeys.launches,
  typeof queryKeys.favoriteLaunches,
  readonly string[],
];

export function favoriteLaunchesQueryOptions(ids: readonly string[]) {
  return queryOptions<
    LaunchListItem[],
    ApiError,
    LaunchListItem[],
    FavoriteLaunchesQueryKey
  >({
    enabled: ids.length > 0,
    queryFn: () => fetchLaunchesByIds(ids),
    queryKey: [queryKeys.launches, queryKeys.favoriteLaunches, ids],
    staleTime: FAVORITE_LAUNCHES_STALE_TIME,
  });
}
