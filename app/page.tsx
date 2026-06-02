import { Suspense } from 'react';

import { HydratedLaunchesList } from '@/components/launches/list/hydrated-launches-list';
import { LaunchesSkeleton } from '@/components/launches/list/launches-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';

import {
  type PageSearchParams,
  parseLaunchesSearchParams,
} from '@/lib/utils/launches-search-params';

type HomeProps = {
  searchParams: Promise<PageSearchParams>;
};

export default async function Home({ searchParams }: HomeProps) {
  const filters = parseLaunchesSearchParams(await searchParams);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <PageSection labelledBy="launches-heading">
        <PageHeader
          description="Every SpaceX launch in one timeline."
          title="Launches"
          titleId="launches-heading"
        />

        <Suspense fallback={<LaunchesSkeleton />}>
          <HydratedLaunchesList filters={filters} />
        </Suspense>
      </PageSection>
    </main>
  );
}
