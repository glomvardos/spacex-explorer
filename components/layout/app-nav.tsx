'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { routePaths } from '@/lib/constants/route-paths';
import { cn } from '@/lib/utils/cn';

type NavItem = {
  href: string;
  label: string;
  matches: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: routePaths.home,
    label: 'Launches',
    matches: (pathname) =>
      pathname === routePaths.home || pathname.startsWith('/launches'),
  },
  {
    href: routePaths.favorites,
    label: 'Favorites',
    matches: (pathname) => pathname.startsWith(routePaths.favorites),
  },
  {
    href: routePaths.analytics,
    label: 'Analytics',
    matches: (pathname) => pathname.startsWith(routePaths.analytics),
  },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = item.matches(pathname);

        return (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              'text-muted-foreground',
              isActive && 'bg-muted text-foreground',
            )}
          >
            <Link href={item.href} aria-current={isActive ? 'page' : undefined}>
              {item.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
