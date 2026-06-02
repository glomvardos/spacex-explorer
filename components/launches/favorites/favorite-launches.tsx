'use client';

import { useMemo } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  FavoritesEmptyState,
  FavoritesErrorState,
} from '@/components/launches/favorites/favorite-launches-state';
import { LaunchesRows } from '@/components/launches/list/launches-rows';
import { LaunchesSkeleton } from '@/components/launches/list/launches-skeleton';

import { useFavoriteLaunches } from '@/lib/hooks/use-favorite-launches';
import { useIsHydrated } from '@/lib/hooks/use-is-hydrated';
import { favoriteLaunchesQueryOptions } from '@/lib/queries/favorite-launches-query-options';

export function FavoriteLaunches() {
  const isHydrated = useIsHydrated();
  const { favoriteIds } = useFavoriteLaunches();

  const { data, error, isError, isFetching, isPending, refetch } = useQuery({
    ...favoriteLaunchesQueryOptions(favoriteIds),
    placeholderData: keepPreviousData,
  });

  const launches = useMemo(
    () => (data ?? []).filter((launch) => favoriteIds.includes(launch.id)),
    [data, favoriteIds],
  );

  if (!isHydrated) {
    return <LaunchesSkeleton />;
  }

  if (favoriteIds.length === 0) {
    return <FavoritesEmptyState />;
  }

  if (isPending) {
    return <LaunchesSkeleton />;
  }

  if (isError && launches.length === 0) {
    return (
      <FavoritesErrorState
        isRetrying={isFetching}
        message={error?.message ?? 'Unable to load favorites.'}
        onRetry={() => void refetch()}
      />
    );
  }

  if (launches.length === 0) {
    return <FavoritesEmptyState />;
  }

  return <LaunchesRows launches={launches} />;
}
