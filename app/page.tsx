import { LaunchesList } from '@/components/launches/launches-list';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';

export default function Home() {
  return (
    <main className="flex-1">
      <PageSection labelledBy="launches-heading">
        <PageHeader
          description="Every SpaceX launch in one timeline."
          title="Launches"
          titleId="launches-heading"
        />

        <LaunchesList />
      </PageSection>
    </main>
  );
}
