import { RefreshCw, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function LaunchesEmptyState() {
  return (
    <div className="bg-card rounded-md border px-5 py-10 text-center">
      <Rocket
        className="text-muted-foreground mx-auto size-8"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-semibold">No launches found</h2>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-6">
        SpaceX did not return any launches for the current view.
      </p>
    </div>
  );
}

type LaunchesErrorStateProps = {
  isRetrying: boolean;
  message: string;
  onRetry: () => void;
};

export function LaunchesErrorState({
  isRetrying,
  message,
  onRetry,
}: LaunchesErrorStateProps) {
  return (
    <div
      className="bg-card rounded-md border px-5 py-8 text-center"
      role="alert"
    >
      <Rocket
        className="text-muted-foreground mx-auto size-8"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-semibold">Launches failed to load</h2>
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
