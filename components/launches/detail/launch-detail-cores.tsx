import { Rocket } from 'lucide-react';

import { LaunchDetailSection } from '@/components/launches/detail/launch-detail-section';

import type { LaunchCoreDetail } from '@/lib/types/launches';
import { formatNumber } from '@/lib/utils/format-number';

type LaunchDetailCoresProps = {
  cores: LaunchCoreDetail[];
};

function displayLanding(core: LaunchCoreDetail) {
  const { launchCore } = core;

  if (launchCore.landing_attempt === null) {
    return null;
  }

  if (!launchCore.landing_attempt) {
    return 'No attempt';
  }

  if (launchCore.landing_success === null) {
    return 'Attempted';
  }

  return launchCore.landing_success ? 'Successful' : 'Failed';
}

function hasCoreDetails(core: LaunchCoreDetail) {
  return (
    core.core !== null ||
    core.launchCore.flight !== null ||
    core.launchCore.reused !== null ||
    core.launchCore.landing_attempt !== null ||
    core.launchCore.landing_type !== null
  );
}

export function LaunchDetailCores({ cores }: LaunchDetailCoresProps) {
  const visibleCores = cores.filter(hasCoreDetails);

  if (visibleCores.length === 0) {
    return null;
  }

  return (
    <LaunchDetailSection
      icon={Rocket}
      title="Booster cores"
      titleId="cores-heading"
    >
      <div className="mt-4 grid gap-4">
        {visibleCores.map((core, index) => {
          const landing = displayLanding(core);

          return (
            <article
              key={core.core?.id ?? `${index}-${core.launchCore.flight}`}
              className="border-t pt-4 first:border-t-0 first:pt-0"
            >
              <h3 className="font-medium">
                {core.core?.serial ?? `Core ${index + 1}`}
              </h3>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                {core.launchCore.flight !== null ? (
                  <div>
                    <dt className="text-muted-foreground">Flight</dt>
                    <dd className="mt-1">{core.launchCore.flight}</dd>
                  </div>
                ) : null}
                {core.core ? (
                  <div>
                    <dt className="text-muted-foreground">Status</dt>
                    <dd className="mt-1 capitalize">{core.core.status}</dd>
                  </div>
                ) : null}
                {core.launchCore.reused !== null ? (
                  <div>
                    <dt className="text-muted-foreground">Reused</dt>
                    <dd className="mt-1">
                      {core.launchCore.reused ? 'Yes' : 'No'}
                    </dd>
                  </div>
                ) : null}
                {landing ? (
                  <div>
                    <dt className="text-muted-foreground">Landing</dt>
                    <dd className="mt-1">{landing}</dd>
                  </div>
                ) : null}
                {core.launchCore.landing_type ? (
                  <div>
                    <dt className="text-muted-foreground">Landing type</dt>
                    <dd className="mt-1">{core.launchCore.landing_type}</dd>
                  </div>
                ) : null}
                {core.core ? (
                  <div>
                    <dt className="text-muted-foreground">Reuse count</dt>
                    <dd className="mt-1">
                      {formatNumber(core.core.reuse_count)}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </article>
          );
        })}
      </div>
    </LaunchDetailSection>
  );
}
