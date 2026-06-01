import type { SubmitEvent } from 'react';

import { RotateCcw, Search } from 'lucide-react';

import { LaunchesFilterField } from '@/components/launches/list/launches-filter-field';
import {
  launchOutcomeOptions,
  launchSortOptions,
  launchTimelineOptions,
} from '@/lib/constants/launch-filters';
import { LaunchesSelectFilter } from '@/components/launches/list/launches-select-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetFooter } from '@/components/ui/sheet';

import type { LaunchesFiltersFormState } from '@/lib/types/launch-filters';

type LaunchesFiltersFormProps = {
  applyFilters: () => void;
  canApply: boolean;
  canReset: boolean;
  filters: LaunchesFiltersFormState;
  isApplying: boolean;
  resetFilters: () => void;
  updateFilters: (filtersUpdate: Partial<LaunchesFiltersFormState>) => void;
};

export function LaunchesFiltersForm({
  applyFilters,
  canApply,
  canReset,
  filters,
  isApplying,
  resetFilters,
  updateFilters,
}: LaunchesFiltersFormProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    applyFilters();
  }

  return (
    <form
      className="flex flex-1 flex-col gap-4 px-6 pb-6"
      aria-label="Launch filters"
      onSubmit={handleSubmit}
    >
      <LaunchesFilterField htmlFor="launch-search" label="Mission">
        <Input
          id="launch-search"
          type="search"
          placeholder="Search mission name"
          value={filters.search}
          onChange={(event) => updateFilters({ search: event.target.value })}
        />
      </LaunchesFilterField>

      <LaunchesSelectFilter
        id="launch-timeline"
        label="Timeline"
        options={launchTimelineOptions}
        value={filters.timeline}
        onValueChange={(timeline) => updateFilters({ timeline })}
      />

      <LaunchesSelectFilter
        id="launch-outcome"
        label="Outcome"
        options={launchOutcomeOptions}
        value={filters.outcome}
        onValueChange={(outcome) => updateFilters({ outcome })}
      />

      <LaunchesSelectFilter
        id="launch-sort"
        label="Sort"
        options={launchSortOptions}
        value={filters.sort}
        onValueChange={(sort) => updateFilters({ sort })}
      />

      <LaunchesFilterField htmlFor="launch-date-from" label="From">
        <Input
          id="launch-date-from"
          type="date"
          max={filters.dateTo || undefined}
          value={filters.dateFrom}
          onChange={(event) => updateFilters({ dateFrom: event.target.value })}
        />
      </LaunchesFilterField>

      <LaunchesFilterField htmlFor="launch-date-to" label="To">
        <Input
          id="launch-date-to"
          type="date"
          min={filters.dateFrom || undefined}
          value={filters.dateTo}
          onChange={(event) => updateFilters({ dateTo: event.target.value })}
        />
      </LaunchesFilterField>

      <SheetFooter className="p-0">
        <Button type="submit" disabled={!canApply || isApplying}>
          <Search aria-hidden="true" data-icon="inline-start" />
          {isApplying ? 'Applying' : 'Apply filters'}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!canReset || isApplying}
          onClick={resetFilters}
        >
          <RotateCcw aria-hidden="true" data-icon="inline-start" />
          Reset
        </Button>
      </SheetFooter>
    </form>
  );
}
