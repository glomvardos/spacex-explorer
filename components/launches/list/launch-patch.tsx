import Image from 'next/image';

import { Rocket } from 'lucide-react';

import type { LaunchListItem } from '@/lib/types/launches';

export function LaunchPatch({
  launch,
}: {
  launch: Pick<LaunchListItem, 'links'>;
}) {
  if (!launch.links.patch.small) {
    return (
      <div className="bg-muted text-muted-foreground grid size-14 place-items-center rounded-md border">
        <Rocket className="size-5" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="bg-background grid size-14 place-items-center rounded-md border">
      <div className="relative size-11">
        <Image
          src={launch.links.patch.small}
          alt=""
          fill
          sizes="44px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
