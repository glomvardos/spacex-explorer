import type { RefCallback } from 'react';

import { LaunchRow } from '@/components/launches/list/launch-row';
import { LaunchesListFooter } from '@/components/launches/list/launches-list-footer';
import { LaunchesSkeleton } from '@/components/launches/list/launches-skeleton';
import {
  LaunchesEmptyState,
  LaunchesErrorState,
} from '@/components/launches/list/launches-state';

import type { SpaceXLaunch } from '@/lib/types/launches';
import { createLaunchDetailUrl } from '@/lib/utils/launch-routes';

type LaunchesListContentProps = {
  errorMessage: string | null;
  hasNextPage: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  isPending: boolean;
  isRetrying: boolean;
  launches: SpaceXLaunch[];
  loadMoreRef: RefCallback<HTMLDivElement>;
  onRetry: () => void;
  totalLaunches: number;
};

export function LaunchesListContent({
  errorMessage,
  hasNextPage,
  isError,
  isFetchingNextPage,
  isPending,
  isRetrying,
  launches,
  loadMoreRef,
  onRetry,
  totalLaunches,
}: LaunchesListContentProps) {
  if (isPending) {
    return <LaunchesSkeleton />;
  }

  if (isError) {
    return (
      <LaunchesErrorState
        isRetrying={isRetrying}
        message={errorMessage ?? 'Unable to load launches.'}
        onRetry={onRetry}
      />
    );
  }

  if (launches.length === 0) {
    return <LaunchesEmptyState />;
  }

  return (
    <>
      <ul className="bg-card overflow-hidden rounded-md border">
        {launches.map((launch) => (
          <LaunchRow
            key={launch.id}
            href={createLaunchDetailUrl(launch.id)}
            launch={launch}
          />
        ))}
      </ul>

      <LaunchesListFooter
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
        loadedCount={launches.length}
        totalCount={totalLaunches}
      />
    </>
  );
}
