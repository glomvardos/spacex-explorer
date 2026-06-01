import type { RefCallback } from 'react';

import { Loader2 } from 'lucide-react';

type LaunchesListFooterProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMoreRef: RefCallback<HTMLDivElement>;
  loadedCount: number;
  totalCount: number;
};

export function LaunchesListFooter({
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
  loadedCount,
  totalCount,
}: LaunchesListFooterProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <p className="text-muted-foreground text-sm" aria-live="polite">
        Showing {loadedCount} of {totalCount} launches
      </p>

      {hasNextPage ? (
        <div
          ref={loadMoreRef}
          className="text-muted-foreground flex min-h-8 items-center gap-2 text-sm"
          aria-live="polite"
        >
          {isFetchingNextPage ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Loading more launches
            </>
          ) : (
            <span className="sr-only">Scroll for more launches</span>
          )}
        </div>
      ) : null}
    </div>
  );
}
