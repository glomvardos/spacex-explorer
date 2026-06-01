import { Package } from 'lucide-react';

import { LaunchDetailSection } from '@/components/launches/detail/launch-detail-section';

import type { SpaceXPayload } from '@/lib/types/launches';
import { formatNumber } from '@/lib/utils/format-number';

type LaunchDetailPayloadsProps = {
  payloads: SpaceXPayload[];
};

export function LaunchDetailPayloads({ payloads }: LaunchDetailPayloadsProps) {
  if (payloads.length === 0) {
    return null;
  }

  return (
    <LaunchDetailSection
      icon={Package}
      title="Payloads"
      titleId="payloads-heading"
    >
      <div className="mt-4 grid gap-4">
        {payloads.map((payload) => (
          <article
            key={payload.id}
            className="border-t pt-4 first:border-t-0 first:pt-0"
          >
            <h3 className="font-medium">{payload.name}</h3>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="mt-1">{payload.type}</dd>
              </div>
              {payload.orbit ? (
                <div>
                  <dt className="text-muted-foreground">Orbit</dt>
                  <dd className="mt-1">{payload.orbit}</dd>
                </div>
              ) : null}
              {payload.mass_kg !== null ? (
                <div>
                  <dt className="text-muted-foreground">Mass</dt>
                  <dd className="mt-1">{formatNumber(payload.mass_kg)} kg</dd>
                </div>
              ) : null}
              {payload.customers.length > 0 ? (
                <div>
                  <dt className="text-muted-foreground">Customers</dt>
                  <dd className="mt-1">{payload.customers.join(', ')}</dd>
                </div>
              ) : null}
              {payload.manufacturers.length > 0 ? (
                <div>
                  <dt className="text-muted-foreground">Manufacturers</dt>
                  <dd className="mt-1">{payload.manufacturers.join(', ')}</dd>
                </div>
              ) : null}
              {payload.nationalities.length > 0 ? (
                <div>
                  <dt className="text-muted-foreground">Nationalities</dt>
                  <dd className="mt-1">{payload.nationalities.join(', ')}</dd>
                </div>
              ) : null}
            </dl>
          </article>
        ))}
      </div>
    </LaunchDetailSection>
  );
}
