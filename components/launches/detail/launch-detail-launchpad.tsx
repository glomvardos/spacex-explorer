import { LaunchDetailOptionalSection } from '@/components/launches/detail/launch-detail-optional-section';
import { LaunchDetailSection } from '@/components/launches/detail/launch-detail-section';

import { fetchLaunchpad } from '@/lib/data/launch-details';
import { formatNumber } from '@/lib/utils/format-number';

type LaunchDetailLaunchpadProps = {
  launchpadId: string;
};

export async function LaunchDetailLaunchpad({
  launchpadId,
}: LaunchDetailLaunchpadProps) {
  return (
    <LaunchDetailOptionalSection
      load={() => fetchLaunchpad(launchpadId)}
      section="launchpad"
    >
      {(launchpad, section) => (
        <LaunchDetailSection
          icon={section.icon}
          title={section.title}
          titleId="launchpad-heading"
        >
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Name</dt>
              <dd className="mt-1 font-medium">{launchpad.full_name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="mt-1">
                {launchpad.locality}, {launchpad.region}
              </dd>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="mt-1 capitalize">{launchpad.status}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Attempts</dt>
                <dd className="mt-1">
                  {formatNumber(launchpad.launch_attempts)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Successes</dt>
                <dd className="mt-1">
                  {formatNumber(launchpad.launch_successes)}
                </dd>
              </div>
            </div>
          </dl>
          {launchpad.details ? (
            <p className="text-muted-foreground mt-4 text-sm leading-6">
              {launchpad.details}
            </p>
          ) : null}
        </LaunchDetailSection>
      )}
    </LaunchDetailOptionalSection>
  );
}
