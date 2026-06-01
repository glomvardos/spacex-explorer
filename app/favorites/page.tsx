import { FavoriteLaunches } from '@/components/launches/favorites/favorite-launches';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';

export default function FavoritesPage() {
  return (
    <main className="flex-1">
      <PageSection labelledBy="favorites-heading">
        <PageHeader
          description="Launches you've saved to revisit."
          title="Favorites"
          titleId="favorites-heading"
        />

        <FavoriteLaunches />
      </PageSection>
    </main>
  );
}
