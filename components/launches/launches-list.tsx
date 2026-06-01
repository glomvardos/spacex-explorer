'use client';

import { useMemo } from 'react';

import { LaunchRow } from '@/components/launches/launch-row';
import { LaunchesListFooter } from '@/components/launches/launches-list-footer';
import { LaunchesSkeleton } from '@/components/launches/launches-skeleton';
import {
  LaunchesEmptyState,
  LaunchesErrorState,
} from '@/components/launches/launches-state';

import { useInfiniteLaunchesQuery } from '@/lib/hooks/use-infinite-launches-query';
import { useLoadNextPageOnView } from '@/lib/hooks/use-load-next-page-on-view';

const LAUNCHES_PAGE_SIZE = 20;

export function LaunchesList() {
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
  } = useInfiniteLaunchesQuery({ limit: LAUNCHES_PAGE_SIZE });
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

  if (isPending) {
    return <LaunchesSkeleton />;
  }

  if (isError) {
    return (
      <LaunchesErrorState
        isRetrying={isFetching}
        message={error.message}
        onRetry={() => void refetch()}
      />
    );
  }

  if (launches.length === 0) {
    return <LaunchesEmptyState />;
  }

  return (
    <div className="space-y-4">
      <ul className="bg-card overflow-hidden rounded-md border">
        {launches.map((launch) => (
          <LaunchRow key={launch.id} launch={launch} />
        ))}
      </ul>

      <LaunchesListFooter
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
        loadedCount={launches.length}
        totalCount={totalLaunches}
      />
    </div>
  );
}
