import Link from 'next/link';

import { Heart, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { routePaths } from '@/lib/constants/route-paths';

export function FavoritesEmptyState() {
  return (
    <div className="bg-card rounded-md border px-5 py-10 text-center">
      <Heart
        className="text-muted-foreground mx-auto size-8"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-semibold">No favorites yet</h2>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-6">
        Save launches you want to revisit and find them here.
      </p>
      <Button asChild className="mt-5">
        <Link href={routePaths.home}>Browse launches</Link>
      </Button>
    </div>
  );
}

type FavoritesErrorStateProps = {
  isRetrying: boolean;
  message: string;
  onRetry: () => void;
};

export function FavoritesErrorState({
  isRetrying,
  message,
  onRetry,
}: FavoritesErrorStateProps) {
  return (
    <div
      className="bg-card rounded-md border px-5 py-8 text-center"
      role="alert"
    >
      <Heart
        className="text-muted-foreground mx-auto size-8"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-semibold">Favorites failed to load</h2>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-6">
        {message}
      </p>
      <Button
        type="button"
        className="mt-5"
        onClick={onRetry}
        disabled={isRetrying}
      >
        <RefreshCw aria-hidden="true" />
        Retry
      </Button>
    </div>
  );
}
