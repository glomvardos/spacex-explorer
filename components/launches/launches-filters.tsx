import { LaunchesFiltersDrawer } from '@/components/launches/launches-filters-drawer';

import { useLaunchesFilters } from '@/lib/hooks/use-launches-filters';
import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';

type LaunchesFiltersProps = {
  filters: LaunchesFiltersFormState;
};

export function LaunchesFilters({ filters }: LaunchesFiltersProps) {
  const launchesFilters = useLaunchesFilters({
    initialFilters: filters,
  });

  return (
    <LaunchesFiltersDrawer
      canApply={launchesFilters.canApply}
      canReset={launchesFilters.canReset}
      filters={launchesFilters.filters}
      isOpen={launchesFilters.isOpen}
      isApplying={launchesFilters.isApplying}
      applyFilters={launchesFilters.applyFilters}
      resetFilters={launchesFilters.resetFilters}
      setOpen={launchesFilters.setIsOpen}
      updateFilters={launchesFilters.updateFilters}
    />
  );
}
