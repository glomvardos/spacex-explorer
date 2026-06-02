import { compareSearchParamKeys } from '@/lib/constants/compare-search-param-keys';
import { routePaths } from '@/lib/constants/route-paths';
import type { CompareSelection, CompareSide } from '@/lib/types/compare';
import type { PageSearchParams } from '@/lib/utils/launches-search-params';

function getSearchParamValue(searchParams: PageSearchParams, key: string) {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

export function parseCompareSearchParams(
  searchParams: PageSearchParams,
): CompareSelection {
  return {
    a: getSearchParamValue(searchParams, compareSearchParamKeys.a),
    b: getSearchParamValue(searchParams, compareSearchParamKeys.b),
  };
}

export function createCompareSearchParams(selection: CompareSelection) {
  const searchParams = new URLSearchParams();

  if (selection.a) {
    searchParams.set(compareSearchParamKeys.a, selection.a);
  }

  if (selection.b) {
    searchParams.set(compareSearchParamKeys.b, selection.b);
  }

  return searchParams;
}

export function createCompareUrl(selection: CompareSelection) {
  const queryString = createCompareSearchParams(selection).toString();

  if (!queryString) {
    return routePaths.compare;
  }

  return `${routePaths.compare}?${queryString}`;
}

export function withCompareSide(
  selection: CompareSelection,
  side: CompareSide,
  id: string,
): CompareSelection {
  return { ...selection, [side]: id };
}
