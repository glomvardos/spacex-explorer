import { Suspense } from 'react';

import type { Metadata } from 'next';

import { CompareContent } from '@/components/launches/compare/compare-content';
import { CompareLaunchPicker } from '@/components/launches/compare/compare-launch-picker';
import { CompareSkeleton } from '@/components/launches/compare/compare-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';

import { parseCompareSearchParams } from '@/lib/utils/compare-search-params';
import type { PageSearchParams } from '@/lib/utils/launches-search-params';

export const metadata: Metadata = {
  title: 'Compare launches',
};

type ComparePageProps = {
  searchParams: Promise<PageSearchParams>;
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const selection = parseCompareSearchParams(await searchParams);

  return (
    <main className="flex-1">
      <PageSection labelledBy="compare-heading">
        <PageHeader
          description="Put two launches side by side and compare their date, outcome, rocket, and launchpad."
          title="Compare launches"
          titleId="compare-heading"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <CompareLaunchPicker
            label="First launch"
            selection={selection}
            side="a"
          />
          <CompareLaunchPicker
            label="Second launch"
            selection={selection}
            side="b"
          />
        </div>

        <Suspense fallback={<CompareSkeleton />}>
          <CompareContent selection={selection} />
        </Suspense>
      </PageSection>
    </main>
  );
}
