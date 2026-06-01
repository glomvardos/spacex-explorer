import Link from 'next/link';

import { CalendarDays } from 'lucide-react';

import { LaunchPatch } from '@/components/launches/list/launch-patch';
import { LaunchStatusBadge } from '@/components/launches/launch-status-badge';

import type { SpaceXLaunch } from '@/lib/types/launches';
import { formatLaunchDate } from '@/lib/utils/format-launch-date';

type LaunchRowProps = {
  href: string;
  launch: SpaceXLaunch;
};

export function LaunchRow({ href, launch }: LaunchRowProps) {
  return (
    <li className="border-b last:border-b-0">
      <Link
        href={href}
        className="focus-visible:ring-ring/30 hover:bg-muted/60 dark:hover:bg-muted/35 grid gap-3 px-4 py-4 transition-colors duration-200 focus-visible:ring-3 focus-visible:outline-none sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
      >
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
      </Link>
    </li>
  );
}
