'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { infiniteLaunchesQueryOptions } from '@/lib/data/launches-query-options';
import type { LaunchesQueryParams } from '@/lib/types/launches';

export function useInfiniteLaunchesQuery(params: LaunchesQueryParams = {}) {
  return useInfiniteQuery(infiniteLaunchesQueryOptions(params));
}
