import type { Metadata } from 'next';

import { FavoriteLaunches } from '@/components/launches/favorites/favorite-launches';
import { PageHeader } from '@/components/ui/page-header';
import { PageSection } from '@/components/ui/page-section';

export const metadata: Metadata = {
  title: 'Favorites',
  description: "Launches you've saved to revisit.",
};

export default function FavoritesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
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
