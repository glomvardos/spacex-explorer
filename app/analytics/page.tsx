import { Suspense } from 'react';

import type { Metadata } from 'next';

import { LaunchAnalyticsCharts } from '@/components/analytics/launch-analytics-charts';
import { LaunchAnalyticsSkeleton } from '@/components/analytics/launch-analytics-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';

import { fetchLaunchAnalytics } from '@/lib/data/launch-analytics';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'Launch cadence and success rate across SpaceX history.',
};

async function AnalyticsContent() {
  const analytics = await fetchLaunchAnalytics();

  return <LaunchAnalyticsCharts analytics={analytics} />;
}

export default function AnalyticsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <PageSection labelledBy="analytics-heading">
        <PageHeader
          description="Launch cadence and success rate across SpaceX history."
          title="Analytics"
          titleId="analytics-heading"
        />

        <Suspense fallback={<LaunchAnalyticsSkeleton />}>
          <AnalyticsContent />
        </Suspense>
      </PageSection>
    </main>
  );
}
