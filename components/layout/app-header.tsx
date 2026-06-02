import Image from 'next/image';
import Link from 'next/link';

import { AppNav } from '@/components/layout/app-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ThemeToggle } from '@/components/layout/theme-toggle';

import { routePaths } from '@/lib/constants/route-paths';

export function AppHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={routePaths.home} className="flex items-center gap-3">
          <Image
            src="/images/spacex-logo.svg"
            alt="SpaceX"
            width={398}
            height={49}
            priority
            className="h-auto w-32 dark:invert"
          />
          <span className="border-l pl-3 text-sm font-semibold">Explorer</span>
        </Link>

        <div className="flex items-center gap-2">
          <AppNav />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
