import { queryData } from '@/lib/api/query-data';
import { endpoints } from '@/lib/constants/endpoints';
import type { LaunchesQueryResponse, SpaceXLaunch } from '@/lib/types/launches';

type FavoriteLaunchesQueryRequest = {
  options: {
    pagination: false;
  };
  query: {
    _id: {
      $in: readonly string[];
    };
  };
};

function sortByFavoriteOrder(
  launches: SpaceXLaunch[],
  ids: readonly string[],
): SpaceXLaunch[] {
  const orderById = new Map(ids.map((id, index) => [id, index]));

  return launches.sort(
    (a, b) =>
      (orderById.get(a.id) ?? ids.length) - (orderById.get(b.id) ?? ids.length),
  );
}

export async function fetchLaunchesByIds(
  ids: readonly string[],
): Promise<SpaceXLaunch[]> {
  if (ids.length === 0) {
    return [];
  }

  const body: FavoriteLaunchesQueryRequest = {
    options: {
      pagination: false,
    },
    query: {
      _id: {
        $in: ids,
      },
    },
  };

  const response = await queryData<LaunchesQueryResponse>(
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
