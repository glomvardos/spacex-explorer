import Link from 'next/link';

import { Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PageSection } from '@/components/ui/page-section';
import { RouteState } from '@/components/ui/route-state';

import { routePaths } from '@/lib/constants/route-paths';

export default function NotFound() {
  return (
    <main className="flex-1">
      <PageSection labelledBy="not-found-heading">
        <RouteState
          icon={Rocket}
          title="Page not found"
          titleId="not-found-heading"
          description="This page does not exist."
          action={
            <Button asChild>
              <Link href={routePaths.home}>Back to launches</Link>
            </Button>
          }
        />
      </PageSection>
    </main>
  );
}
