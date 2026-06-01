'use client';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useFavoriteLaunches } from '@/lib/hooks/use-favorite-launches';
import { cn } from '@/lib/utils/cn';

type FavoriteButtonProps = {
  className?: string;
  launchId: string;
  launchName: string;
  showLabel?: boolean;
};

export function FavoriteButton({
  className,
  launchId,
  launchName,
  showLabel = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoriteLaunches();
  const favorited = isFavorite(launchId);

  const label = favorited
    ? `Remove ${launchName} from favorites`
    : `Add ${launchName} to favorites`;

  return (
    <Button
      type="button"
      variant="outline"
      size={showLabel ? 'sm' : 'icon'}
      aria-label={label}
      aria-pressed={favorited}
      className={className}
      onClick={() => toggleFavorite(launchId)}
    >
      <Heart
        aria-hidden="true"
        data-icon={showLabel ? 'inline-start' : undefined}
        className={cn(
          favorited && 'fill-current text-red-500 dark:text-red-400',
        )}
      />
      {showLabel ? (favorited ? 'Saved' : 'Save') : null}
    </Button>
  );
}
