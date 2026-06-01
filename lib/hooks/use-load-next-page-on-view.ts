'use client';

import { useEffect, useRef } from 'react';

import { useInView } from 'react-intersection-observer';

type UseLoadNextPageOnViewParams = {
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export function useLoadNextPageOnView({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseLoadNextPageOnViewParams) {
  const hasFetchedForCurrentIntersection = useRef(false);
  const { inView, ref } = useInView({
    rootMargin: '0px',
    threshold: 1,
  });

  useEffect(() => {
    if (!inView) {
      hasFetchedForCurrentIntersection.current = false;
      return;
    }

    if (
      !hasNextPage ||
      isFetchingNextPage ||
      hasFetchedForCurrentIntersection.current
    ) {
      return;
    }

    hasFetchedForCurrentIntersection.current = true;
    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return ref;
}
