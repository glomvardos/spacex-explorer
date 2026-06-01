'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { storageKeys } from '@/lib/constants/storage-keys';

const STORAGE_KEY = storageKeys.favoriteLaunches;
const EMPTY_FAVORITES: readonly string[] = [];

let snapshot: readonly string[] = EMPTY_FAVORITES;
let isInitialized = false;
const listeners = new Set<() => void>();

function parseStoredFavorites(raw: string | null): readonly string[] {
  if (!raw) {
    return EMPTY_FAVORITES;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return EMPTY_FAVORITES;
    }

    const ids = parsed.filter(
      (value): value is string => typeof value === 'string',
    );

    return ids.length > 0 ? ids : EMPTY_FAVORITES;
  } catch {
    return EMPTY_FAVORITES;
  }
}

function readFromStorage(): readonly string[] {
  return parseStoredFavorites(window.localStorage.getItem(STORAGE_KEY));
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function handleStorageEvent(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) {
    return;
  }

  snapshot = readFromStorage();
  emit();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener('storage', handleStorageEvent);
  }

  listeners.add(listener);

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorageEvent);
    }
  };
}

function getSnapshot(): readonly string[] {
  if (!isInitialized) {
    snapshot = readFromStorage();
    isInitialized = true;
  }

  return snapshot;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY_FAVORITES;
}

function setFavorites(next: readonly string[]) {
  snapshot = next.length > 0 ? next : EMPTY_FAVORITES;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore write failures (e.g. storage disabled or quota exceeded).
  }

  emit();
}

function toggleFavorite(launchId: string) {
  const current = getSnapshot();
  const next = current.includes(launchId)
    ? current.filter((id) => id !== launchId)
    : [launchId, ...current];

  setFavorites(next);
}

export function useFavoriteLaunches() {
  const favoriteIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isFavorite = useCallback(
    (launchId: string) => favoriteIds.includes(launchId),
    [favoriteIds],
  );

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  };
}
