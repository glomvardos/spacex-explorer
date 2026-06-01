import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { LaunchesList } from '@/components/launches/launches-list';

import { DEFAULT_PAGE_SIZE } from '@/lib/constants/pagination';
import { infiniteLaunchesQueryOptions } from '@/lib/data/launches-query-options';
import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';
import { createLaunchesQueryParams } from '@/lib/utils/create-launches-query-params';

type HydratedLaunchesListProps = {
  filters: LaunchesFiltersFormState;
};

export async function HydratedLaunchesList({
  filters,
}: HydratedLaunchesListProps) {
  const params = {
    ...createLaunchesQueryParams(filters),
    limit: DEFAULT_PAGE_SIZE,
  };
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(infiniteLaunchesQueryOptions(params));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LaunchesList filters={filters} params={params} />
    </HydrationBoundary>
  );
}
