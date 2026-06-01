'use client';

import { RefreshCw, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageSection } from '@/components/ui/page-section';
import { RouteState } from '@/components/ui/route-state';

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex-1">
      <PageSection labelledBy="app-error-heading">
        <RouteState
          role="alert"
          icon={Rocket}
          title="Something went wrong"
          titleId="app-error-heading"
          description="The page failed to load."
          action={
            <Button type="button" onClick={reset}>
              <RefreshCw aria-hidden />
              Retry
            </Button>
          }
        />
      </PageSection>
    </main>
  );
}
