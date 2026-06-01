import { LaunchDetailCores } from '@/components/launches/detail/launch-detail-cores';
import { LaunchDetailOptionalSection } from '@/components/launches/detail/launch-detail-optional-section';

import { fetchCoreDetails } from '@/lib/data/launch-details';
import type { SpaceXLaunchCore } from '@/lib/types/launches';

type LaunchDetailCoresSectionProps = {
  launchCores: SpaceXLaunchCore[];
};

export async function LaunchDetailCoresSection({
  launchCores,
}: LaunchDetailCoresSectionProps) {
  if (launchCores.length === 0) {
    return null;
  }

  return (
    <LaunchDetailOptionalSection
      load={() => fetchCoreDetails(launchCores)}
      section="boosterCores"
    >
      {(cores) => <LaunchDetailCores cores={cores} />}
    </LaunchDetailOptionalSection>
  );
}
