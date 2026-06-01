import { CalendarDays } from 'lucide-react';

import { LaunchPatch } from '@/components/launches/launch-patch';
import { LaunchStatusBadge } from '@/components/launches/launch-status-badge';

import type { SpaceXLaunch } from '@/lib/types/launches';
import { formatLaunchDate } from '@/lib/utils/format-launch-date';

export function LaunchRow({ launch }: { launch: SpaceXLaunch }) {
  return (
    <li className="grid gap-3 border-b px-4 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
      <LaunchPatch launch={launch} />

      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold">{launch.name}</h2>
        <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
          <CalendarDays className="size-4" aria-hidden="true" />
          <time dateTime={launch.date_utc}>
            {formatLaunchDate(launch.date_utc)}
          </time>
        </p>
        {launch.details ? (
          <p className="text-muted-foreground mt-2 line-clamp-2 max-w-3xl text-sm leading-6">
            {launch.details}
          </p>
        ) : null}
      </div>

      <LaunchStatusBadge launch={launch} />
    </li>
  );
}
