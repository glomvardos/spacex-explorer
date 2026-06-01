'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { DEFAULT_FILTERS } from '@/lib/constants/launch-filters';
import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';
import {
  areLaunchesFiltersEqual,
  hasDefaultLaunchesFilters,
} from '@/lib/utils/launches-filters-state';
import { createLaunchesUrl } from '@/lib/utils/launches-search-params';

type UseLaunchesFiltersInput = {
  initialFilters?: LaunchesFiltersFormState;
};

export function useLaunchesFilters({
  initialFilters = DEFAULT_FILTERS,
}: UseLaunchesFiltersInput) {
  const router = useRouter();
  const [isApplying, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] =
    useState<LaunchesFiltersFormState>(initialFilters);
  const canApply = !areLaunchesFiltersEqual(filters, initialFilters);
  const canReset =
    !hasDefaultLaunchesFilters(filters) ||
    !hasDefaultLaunchesFilters(initialFilters);
  const hasActiveFilters = !hasDefaultLaunchesFilters(initialFilters);

  function applyFilters() {
    if (!canApply) {
      return;
    }

    startTransition(() => {
      router.push(createLaunchesUrl(filters), { scroll: false });
    });
    setIsOpen(false);
  }

  function resetFilters() {
    if (!canReset) {
      return;
    }

    setFilters(DEFAULT_FILTERS);
    startTransition(() => {
      router.push(createLaunchesUrl(DEFAULT_FILTERS), { scroll: false });
    });
    setIsOpen(false);
  }

  function updateFilters(filtersUpdate: Partial<LaunchesFiltersFormState>) {
    setFilters((current) => ({ ...current, ...filtersUpdate }));
  }

  return {
    applyFilters,
    canApply,
    canReset,
    filters,
    hasActiveFilters,
    isApplying,
    isOpen,
    resetFilters,
    setIsOpen,
    updateFilters,
  };
}
