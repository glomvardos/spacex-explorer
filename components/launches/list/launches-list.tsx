'use client';

import { useMemo } from 'react';

import { LaunchesFilters } from '@/components/launches/list/launches-filters';
import { LaunchesListContent } from '@/components/launches/list/launches-list-content';

import { useInfiniteLaunchesQuery } from '@/lib/hooks/use-infinite-launches-query';
import { useLoadNextPageOnView } from '@/lib/hooks/use-load-next-page-on-view';
import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';
import type { LaunchesQueryParams } from '@/lib/types/launches';
import { createLaunchesUrl } from '@/lib/utils/launches-search-params';

type LaunchesListProps = {
  filters: LaunchesFiltersFormState;
  params: LaunchesQueryParams;
};

export function LaunchesList({ filters, params }: LaunchesListProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteLaunchesQuery(params);
  const loadMoreRef = useLoadNextPageOnView({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const launches = useMemo(
    () => data?.pages.flatMap((page) => page.docs) ?? [],
    [data],
  );
  const totalLaunches = data?.pages[0]?.totalDocs ?? 0;
  const filtersUrl = createLaunchesUrl(filters);

  return (
    <div className="flex flex-col gap-4">
      <LaunchesFilters key={filtersUrl} filters={filters} />
      <LaunchesListContent
        errorMessage={error?.message ?? null}
        hasNextPage={hasNextPage}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        isPending={isPending}
        isRetrying={isFetching}
        launches={launches}
        loadMoreRef={loadMoreRef}
        onRetry={() => void refetch()}
        totalLaunches={totalLaunches}
      />
    </div>
  );
}
