import { ListFilter } from 'lucide-react';

import { LaunchesFiltersForm } from '@/components/launches/launches-filters-form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';

type LaunchesFiltersDrawerProps = {
  applyFilters: () => void;
  canApply: boolean;
  canReset: boolean;
  filters: LaunchesFiltersFormState;
  isApplying: boolean;
  isOpen: boolean;
  resetFilters: () => void;
  setOpen: (isOpen: boolean) => void;
  updateFilters: (filtersUpdate: Partial<LaunchesFiltersFormState>) => void;
};

export function LaunchesFiltersDrawer({
  applyFilters,
  canApply,
  canReset,
  filters,
  isApplying,
  isOpen,
  resetFilters,
  setOpen,
  updateFilters,
}: LaunchesFiltersDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <div className="flex justify-end">
        <SheetTrigger asChild>
          <Button type="button" variant="outline">
            <ListFilter aria-hidden="true" data-icon="inline-start" />
            Filters
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent
        side="right"
        className="data-[side=right]:w-full"
        aria-describedby={undefined}
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <LaunchesFiltersForm
          applyFilters={applyFilters}
          canApply={canApply}
          canReset={canReset}
          filters={filters}
          isApplying={isApplying}
          resetFilters={resetFilters}
          updateFilters={updateFilters}
        />
      </SheetContent>
    </Sheet>
  );
}
