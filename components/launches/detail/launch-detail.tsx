import { Suspense } from 'react';

import Image from 'next/image';

import {
  BookOpen,
  CalendarDays,
  CirclePlay,
  ExternalLink,
  FileText,
  type LucideIcon,
  MapPin,
  Newspaper,
  Package,
  Rocket,
} from 'lucide-react';

import { LaunchDetailCoresSection } from '@/components/launches/detail/launch-detail-cores-section';
import { LaunchDetailGallery } from '@/components/launches/detail/launch-detail-gallery';
import { LaunchDetailLaunchpad } from '@/components/launches/detail/launch-detail-launchpad';
import { LaunchDetailPayloadsSection } from '@/components/launches/detail/launch-detail-payloads-section';
import { LaunchDetailRocket } from '@/components/launches/detail/launch-detail-rocket';
import { LaunchDetailSectionSkeleton } from '@/components/launches/detail/launch-detail-section';
import { FavoriteButton } from '@/components/launches/favorite-button';
import { LaunchStatusBadge } from '@/components/launches/launch-status-badge';
import { Button } from '@/components/ui/button';

import type { SpaceXLaunch } from '@/lib/types/launches';
import { formatLaunchDate } from '@/lib/utils/format-launch-date';

type LaunchDetailProps = {
  launch: SpaceXLaunch;
};

type ExternalResource = {
  href: string;
  icon: LucideIcon;
  label: string;
};

function getExternalResources(launch: SpaceXLaunch) {
  const webcast =
    launch.links.webcast ??
    (launch.links.youtube_id
      ? `https://www.youtube.com/watch?v=${launch.links.youtube_id}`
      : null);
  const resources: Array<ExternalResource | null> = [
    webcast
      ? {
          href: webcast,
          icon: CirclePlay,
          label: 'Webcast',
        }
      : null,
    launch.links.article
      ? {
          href: launch.links.article,
          icon: Newspaper,
          label: 'Article',
        }
      : null,
    launch.links.wikipedia
      ? {
          href: launch.links.wikipedia,
          icon: BookOpen,
          label: 'Wikipedia',
        }
      : null,
    launch.links.presskit
      ? {
          href: launch.links.presskit,
          icon: FileText,
          label: 'Press kit',
        }
      : null,
  ];

  return resources.filter((resource): resource is ExternalResource =>
    Boolean(resource),
  );
}

export function LaunchDetail({ launch }: LaunchDetailProps) {
  const patchImage = launch.links.patch.large ?? launch.links.patch.small;
  const externalResources = getExternalResources(launch);

  return (
    <div className="flex flex-col gap-6">
      <section
        className="bg-card grid gap-5 rounded-md border p-5 lg:grid-cols-[minmax(0,1fr)_12rem]"
        aria-labelledby="launch-detail-heading"
      >
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <LaunchStatusBadge launch={launch} />
            <FavoriteButton
              launchId={launch.id}
              launchName={launch.name}
              showLabel
            />
          </div>
          <h1
            id="launch-detail-heading"
            className="mt-4 text-3xl font-semibold sm:text-4xl"
          >
            {launch.name}
          </h1>
          <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-sm">
            <CalendarDays className="size-4" aria-hidden="true" />
            <time dateTime={launch.date_utc}>
              {formatLaunchDate(launch.date_utc)}
            </time>
          </p>

          {launch.details ? (
            <p className="text-muted-foreground mt-5 max-w-3xl text-sm leading-6">
              {launch.details}
            </p>
          ) : null}

          {externalResources.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {externalResources.map((resource) => {
                const ResourceIcon = resource.icon;

                return (
                  <Button
                    key={`${resource.label}-${resource.href}`}
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <a href={resource.href} target="_blank" rel="noreferrer">
                      <ResourceIcon aria-hidden="true" />
                      {resource.label}
                      <ExternalLink aria-hidden="true" />
                    </a>
                  </Button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="bg-background grid aspect-square place-items-center rounded-md border p-5">
          {patchImage ? (
            <div className="relative size-full max-h-40 max-w-40">
              <Image
                src={patchImage}
                alt={`${launch.name} mission patch`}
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <Rocket
              className="text-muted-foreground size-12"
              aria-hidden="true"
            />
          )}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Suspense
          fallback={
            <LaunchDetailSectionSkeleton icon={Rocket} title="Rocket" />
          }
        >
          <LaunchDetailRocket rocketId={launch.rocket} />
        </Suspense>
        <Suspense
          fallback={
            <LaunchDetailSectionSkeleton icon={MapPin} title="Launchpad" />
          }
        >
          <LaunchDetailLaunchpad launchpadId={launch.launchpad} />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <LaunchDetailSectionSkeleton icon={Package} title="Payloads" />
        }
      >
        <LaunchDetailPayloadsSection payloadIds={launch.payloads} />
      </Suspense>
      <Suspense
        fallback={
          <LaunchDetailSectionSkeleton icon={Rocket} title="Booster cores" />
        }
      >
        <LaunchDetailCoresSection launchCores={launch.cores} />
      </Suspense>
      <LaunchDetailGallery
        images={launch.links.flickr.original}
        launchName={launch.name}
      />
    </div>
  );
}
