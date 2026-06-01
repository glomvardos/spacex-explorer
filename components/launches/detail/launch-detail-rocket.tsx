import { LaunchDetailOptionalSection } from '@/components/launches/detail/launch-detail-optional-section';
import { LaunchDetailSection } from '@/components/launches/detail/launch-detail-section';

import { fetchRocket } from '@/lib/data/launch-details';

type LaunchDetailRocketProps = {
  rocketId: string;
};

export async function LaunchDetailRocket({
  rocketId,
}: LaunchDetailRocketProps) {
  return (
    <LaunchDetailOptionalSection
      load={() => fetchRocket(rocketId)}
      section="rocket"
    >
      {(rocket, section) => (
        <LaunchDetailSection
          icon={section.icon}
          title={section.title}
          titleId="rocket-heading"
        >
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Name</dt>
              <dd className="mt-1 font-medium">{rocket.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Origin</dt>
              <dd className="mt-1">
                {rocket.company}, {rocket.country}
              </dd>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">First flight</dt>
                <dd className="mt-1">{rocket.first_flight}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="mt-1">{rocket.active ? 'Active' : 'Retired'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Success rate</dt>
                <dd className="mt-1">{rocket.success_rate_pct}%</dd>
              </div>
            </div>
          </dl>
          <p className="text-muted-foreground mt-4 text-sm leading-6">
            {rocket.description}
          </p>
        </LaunchDetailSection>
      )}
    </LaunchDetailOptionalSection>
  );
}
