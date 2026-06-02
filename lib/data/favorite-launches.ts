import { queryData } from '@/lib/api/query-data';
import { endpoints } from '@/lib/constants/endpoints';
import type { LaunchListItem, LaunchListResponse } from '@/lib/types/launches';

const FAVORITE_LAUNCHES_SELECT = [
  'name',
  'date_utc',
  'upcoming',
  'success',
  'details',
  'links.patch',
];

type FavoriteLaunchesQueryRequest = {
  options: {
    pagination: false;
    select: string[];
  };
  query: {
    _id: {
      $in: readonly string[];
    };
  };
};

function sortByFavoriteOrder(
  launches: LaunchListItem[],
  ids: readonly string[],
): LaunchListItem[] {
  const orderById = new Map(ids.map((id, index) => [id, index]));

  return launches.sort(
    (a, b) =>
      (orderById.get(a.id) ?? ids.length) - (orderById.get(b.id) ?? ids.length),
  );
}

export async function fetchLaunchesByIds(
  ids: readonly string[],
): Promise<LaunchListItem[]> {
  if (ids.length === 0) {
    return [];
  }

  const body: FavoriteLaunchesQueryRequest = {
    options: {
      pagination: false,
      select: FAVORITE_LAUNCHES_SELECT,
    },
    query: {
      _id: {
        $in: ids,
      },
    },
  };

  const response = await queryData<LaunchListResponse>(
    endpoints.launchesQuery,
    {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );

  return sortByFavoriteOrder(response.docs, ids);
}
