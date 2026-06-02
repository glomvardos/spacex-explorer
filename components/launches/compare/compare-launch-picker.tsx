'use client';

import { useId, useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Loader2, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useDebouncedValue } from '@/lib/hooks/use-debounced-value';
import { launchSearchQueryOptions } from '@/lib/queries/launch-search-query-options';
import type { CompareSelection, CompareSide } from '@/lib/types/compare';
import { cn } from '@/lib/utils/cn';
import {
  createCompareUrl,
  withCompareSide,
} from '@/lib/utils/compare-search-params';
import { formatLaunchDate } from '@/lib/utils/format-launch-date';

const SEARCH_DEBOUNCE_MS = 300;

type CompareLaunchPickerProps = {
  label: string;
  selection: CompareSelection;
  side: CompareSide;
};

export function CompareLaunchPicker({
  label,
  selection,
  side,
}: CompareLaunchPickerProps) {
  const router = useRouter();
  const inputId = useId();
  const [search, setSearch] = useState('');
  const [isNavigating, startTransition] = useTransition();
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const selectedId = selection[side];
  const otherId = side === 'a' ? selection.b : selection.a;

  const { data, error, isError, isFetching } = useQuery({
    ...launchSearchQueryOptions(debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const results = data ?? [];
  const hasSearch = debouncedSearch.trim().length > 0;
  const isSearching = isFetching && hasSearch;

  function navigateToSelection(id: string) {
    startTransition(() => {
      router.push(createCompareUrl(withCompareSide(selection, side, id)), {
        scroll: false,
      });
    });
  }

  function selectLaunch(id: string) {
    setSearch('');
    navigateToSelection(id);
  }

  return (
    <div className="bg-card rounded-md border p-4">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={inputId}>{label}</Label>
        {selectedId ? (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => navigateToSelection('')}
            disabled={isNavigating}
          >
            <X aria-hidden="true" />
            Clear
          </Button>
        ) : null}
      </div>

      <div className="relative mt-2">
        <Search
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
        <Input
          id={inputId}
          type="search"
          autoComplete="off"
          className="pl-8"
          placeholder="Search by mission name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {isSearching || isNavigating ? (
          <Loader2
            className="text-muted-foreground absolute top-1/2 right-2.5 size-4 -translate-y-1/2 animate-spin"
            aria-hidden="true"
          />
        ) : null}
      </div>

      {hasSearch ? (
        <div className="mt-3">
          {isError ? (
            <p className="text-muted-foreground text-sm" role="status">
              {error?.message ?? 'Unable to search launches.'}
            </p>
          ) : isSearching && results.length === 0 ? (
            <p className="text-muted-foreground text-sm" role="status">
              Searching launches...
            </p>
          ) : results.length === 0 ? (
            <p className="text-muted-foreground text-sm" role="status">
              No launches match that search.
            </p>
          ) : (
            <ul
              aria-label={`${label} search results`}
              className="flex max-h-72 flex-col gap-1 overflow-y-auto"
            >
              {results.map((launch) => {
                const isSelectedHere = launch.id === selectedId;
                const isSelectedOther = launch.id === otherId;

                return (
                  <li key={launch.id}>
                    <button
                      type="button"
                      onClick={() => selectLaunch(launch.id)}
                      disabled={isSelectedOther || isNavigating}
                      aria-current={isSelectedHere ? 'true' : undefined}
                      className={cn(
                        'focus-visible:ring-ring/30 hover:bg-muted flex w-full flex-col rounded-md px-3 py-2 text-left transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                        isSelectedHere && 'bg-muted',
                      )}
                    >
                      <span className="truncate text-sm font-medium">
                        {launch.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {formatLaunchDate(launch.date_utc)}
                        {isSelectedOther ? ' · already compared' : ''}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
