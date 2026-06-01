import type { ReactNode } from 'react';

import { MapPin, Package, Rocket, type LucideIcon } from 'lucide-react';

import { LaunchDetailSectionError } from '@/components/launches/detail/launch-detail-section';

const launchDetailSections = {
  boosterCores: {
    errorMessage: 'Booster core details are unavailable.',
    icon: Rocket,
    title: 'Booster cores',
  },
  launchpad: {
    errorMessage: 'Launchpad details are unavailable.',
    icon: MapPin,
    title: 'Launchpad',
  },
  payloads: {
    errorMessage: 'Payload details are unavailable.',
    icon: Package,
    title: 'Payloads',
  },
  rocket: {
    errorMessage: 'Rocket details are unavailable.',
    icon: Rocket,
    title: 'Rocket',
  },
} satisfies Record<
  string,
  {
    errorMessage: string;
    icon: LucideIcon;
    title: string;
  }
>;

type LaunchDetailSectionKey = keyof typeof launchDetailSections;
type LaunchDetailSectionState = (typeof launchDetailSections)[LaunchDetailSectionKey];

type LaunchDetailOptionalSectionProps<TData> = {
  children: (data: TData, section: LaunchDetailSectionState) => ReactNode;
  load: () => Promise<TData>;
  section: LaunchDetailSectionKey;
};

export async function LaunchDetailOptionalSection<TData>({
  children,
  load,
  section,
}: LaunchDetailOptionalSectionProps<TData>) {
  const sectionState = launchDetailSections[section];
  let data: TData;

  try {
    data = await load();
  } catch {
    return (
      <LaunchDetailSectionError
        icon={sectionState.icon}
        title={sectionState.title}
        message={sectionState.errorMessage}
      />
    );
  }

  return children(data, sectionState);
}
