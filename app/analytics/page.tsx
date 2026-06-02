import { Suspense } from 'react';

import { LaunchAnalyticsCharts } from '@/components/analytics/launch-analytics-charts';
import { LaunchAnalyticsSkeleton } from '@/components/analytics/launch-analytics-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';

import { fetchLaunchAnalytics } from '@/lib/data/launch-analytics';

async function AnalyticsContent() {
  const analytics = await fetchLaunchAnalytics();

  return <LaunchAnalyticsCharts analytics={analytics} />;
}

export default function AnalyticsPage() {
  return (
    <main className="flex-1">
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
