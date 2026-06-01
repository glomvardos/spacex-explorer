import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { LaunchDetail } from '@/components/launches/detail/launch-detail';
import { LaunchDetailSkeleton } from '@/components/launches/detail/launch-detail-skeleton';
import { LaunchesBackButton } from '@/components/launches/detail/launches-back-button';
import { PageSection } from '@/components/ui/page-section';

import { routePaths } from '@/lib/constants/route-paths';
import { createLaunchDetailUrl } from '@/lib/utils/launch-routes';

import { getLaunchDetailPageData } from './launch-detail-page-data';

type PageSearchParams = Record<string, string | string[] | undefined>;

type LaunchDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<PageSearchParams>;
};

async function LaunchDetailPageContent({ id }: { id: string }) {
  const launch = await getLaunchDetailPageData(id);

  return <LaunchDetail launch={launch} />;
}

export default async function LaunchDetailPage({
  params,
  searchParams,
}: LaunchDetailPageProps) {
  const { id } = await params;
  const currentSearchParams = await searchParams;

  if (Object.keys(currentSearchParams).length > 0) {
    redirect(createLaunchDetailUrl(id));
  }

  return (
    <main className="flex-1">
      <PageSection labelledBy="launch-detail-heading">
        <LaunchesBackButton fallbackHref={routePaths.home} />

        <Suspense
          fallback={
            <>
              <h1 id="launch-detail-heading" className="sr-only">
                Loading launch detail
              </h1>
              <LaunchDetailSkeleton />
            </>
          }
        >
          <LaunchDetailPageContent id={id} />
        </Suspense>
      </PageSection>
    </main>
  );
}
