import type { RefCallback } from 'react';

import { LaunchesListFooter } from '@/components/launches/list/launches-list-footer';
import { LaunchesRows } from '@/components/launches/list/launches-rows';
import { LaunchesSkeleton } from '@/components/launches/list/launches-skeleton';
import {
  LaunchesEmptyState,
  LaunchesErrorState,
} from '@/components/launches/list/launches-state';

import type { LaunchListItem } from '@/lib/types/launches';

type LaunchesListContentProps = {
  errorMessage: string | null;
  hasNextPage: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  isPending: boolean;
  isRetrying: boolean;
  launches: LaunchListItem[];
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
      <LaunchesRows launches={launches} />

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
