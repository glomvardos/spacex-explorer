'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

/**
 * Returns `false` during server render and the first client render, then
 * `true` once mounted. Use it to gate UI that depends on client-only state
 * (such as LocalStorage favorites) without causing hydration mismatches.
 */
export function useIsHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
