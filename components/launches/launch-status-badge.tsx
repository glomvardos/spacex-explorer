import {
  CheckCircle2,
  Clock3,
  type LucideIcon,
  Rocket,
  XCircle,
} from 'lucide-react';

import type { SpaceXLaunch } from '@/lib/types/launches';
import { cn } from '@/lib/utils/cn';

type LaunchStatus = {
  className: string;
  icon: LucideIcon;
  label: string;
};

function getLaunchStatus(launch: SpaceXLaunch): LaunchStatus {
  if (launch.upcoming) {
    return {
      className: 'border-sky-200 bg-sky-500/10 text-sky-700',
      icon: Clock3,
      label: 'Upcoming',
    };
  }

  if (launch.success === true) {
    return {
      className: 'border-emerald-200 bg-emerald-500/10 text-emerald-700',
      icon: CheckCircle2,
      label: 'Successful',
    };
  }

  if (launch.success === false) {
    return {
      className: 'border-red-200 bg-red-500/10 text-red-700',
      icon: XCircle,
      label: 'Failed',
    };
  }

  return {
    className: 'bg-muted text-muted-foreground',
    icon: Rocket,
    label: 'Unknown',
  };
}

export function LaunchStatusBadge({ launch }: { launch: SpaceXLaunch }) {
  const status = getLaunchStatus(launch);
  const StatusIcon = status.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium',
        status.className,
      )}
    >
      <StatusIcon className="size-3.5" aria-hidden="true" />
      {status.label}
    </div>
  );
}
