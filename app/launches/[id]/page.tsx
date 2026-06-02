import { Suspense } from 'react';

import type { Metadata } from 'next';

import { LaunchDetail } from '@/components/launches/detail/launch-detail';
import { LaunchDetailSkeleton } from '@/components/launches/detail/launch-detail-skeleton';
import { LaunchesBackButton } from '@/components/launches/detail/launches-back-button';
import { PageSection } from '@/components/ui/page-section';

import { routePaths } from '@/lib/constants/route-paths';
import { fetchLaunch } from '@/lib/data/launch-details';
import { createLaunchDetailUrl } from '@/lib/utils/launch-routes';

import { getLaunchDetailPageData } from './launch-detail-page-data';

type LaunchDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: LaunchDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const canonical = createLaunchDetailUrl(id);

  try {
    const launch = await fetchLaunch(id);

    return {
      title: launch.name,
      description:
        launch.details ??
        `Mission overview, rocket, and launchpad for the ${launch.name} launch.`,
      alternates: { canonical },
    };
  } catch {
    return {
      alternates: { canonical },
    };
  }
}

async function LaunchDetailPageContent({ id }: { id: string }) {
  const launch = await getLaunchDetailPageData(id);

  return <LaunchDetail launch={launch} />;
}

export default async function LaunchDetailPage({
  params,
}: LaunchDetailPageProps) {
  const { id } = await params;

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <PageSection labelledBy="launch-detail-heading">
        <LaunchesBackButton fallbackHref={routePaths.home} />

        <Suspense fallback={<LaunchDetailSkeleton />}>
          <LaunchDetailPageContent id={id} />
        </Suspense>
      </PageSection>
    </main>
  );
}
