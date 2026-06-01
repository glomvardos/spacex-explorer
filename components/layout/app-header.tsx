import Image from 'next/image';

import { ThemeToggle } from '@/components/layout/theme-toggle';

export function AppHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/spacex-logo.webp"
            alt="SpaceX"
            width={92}
            height={30}
            priority
            className="h-5 w-auto dark:invert"
          />
          <span className="border-l pl-3 text-sm font-semibold">Explorer</span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
