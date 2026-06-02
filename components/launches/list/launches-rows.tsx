'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { LaunchRow } from '@/components/launches/list/launch-row';

import type { LaunchListItem } from '@/lib/types/launches';
import { createLaunchDetailUrl } from '@/lib/utils/launch-routes';

// Below this many rows the DOM cost is negligible, so we skip virtualization
// (this also keeps the server-rendered first page as plain, hydration-safe
// markup; virtualization only engages client-side once more pages load).
const VIRTUALIZATION_THRESHOLD = 40;
const ESTIMATED_ROW_HEIGHT = 100;
const OVERSCAN = 6;

type LaunchesRowsProps = {
  launches: LaunchListItem[];
};

export function LaunchesRows({ launches }: LaunchesRowsProps) {
  if (launches.length <= VIRTUALIZATION_THRESHOLD) {
    return <PlainLaunchesRows launches={launches} />;
  }

  return <VirtualizedLaunchesRows launches={launches} />;
}

function PlainLaunchesRows({ launches }: LaunchesRowsProps) {
  return (
    <ul className="bg-card overflow-hidden rounded-md border">
      {launches.map((launch, index) => (
        <LaunchRow
          key={launch.id}
          href={createLaunchDetailUrl(launch.id)}
          isLast={index === launches.length - 1}
          launch={launch}
        />
      ))}
    </ul>
  );
}

function VirtualizedLaunchesRows({ launches }: LaunchesRowsProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      setScrollMargin(listRef.current?.offsetTop ?? 0);
    }

    measure();
    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: launches.length,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: OVERSCAN,
    scrollMargin,
  });

  return (
    <ul
      ref={listRef}
      className="bg-card relative overflow-hidden rounded-md border"
      style={{ height: `${virtualizer.getTotalSize()}px` }}
    >
      {virtualizer.getVirtualItems().map((item) => {
        const launch = launches[item.index];

        return (
          <LaunchRow
            key={launch.id}
            ref={virtualizer.measureElement}
            data-index={item.index}
            href={createLaunchDetailUrl(launch.id)}
            isLast={item.index === launches.length - 1}
            launch={launch}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${item.start - virtualizer.options.scrollMargin}px)`,
            }}
          />
        );
      })}
    </ul>
  );
}
