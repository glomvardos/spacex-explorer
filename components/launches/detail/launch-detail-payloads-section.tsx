import { LaunchDetailPayloads } from '@/components/launches/detail/launch-detail-payloads';
import { LaunchDetailOptionalSection } from '@/components/launches/detail/launch-detail-optional-section';

import { fetchPayloads } from '@/lib/data/launch-details';

type LaunchDetailPayloadsSectionProps = {
  payloadIds: string[];
};

export async function LaunchDetailPayloadsSection({
  payloadIds,
}: LaunchDetailPayloadsSectionProps) {
  if (payloadIds.length === 0) {
    return null;
  }

  return (
    <LaunchDetailOptionalSection
      load={() => fetchPayloads(payloadIds)}
      section="payloads"
    >
      {(payloads) => <LaunchDetailPayloads payloads={payloads} />}
    </LaunchDetailOptionalSection>
  );
}
