import { routePaths } from '@/lib/constants/route-paths';

export type NavItem = {
  href: string;
  label: string;
  matches: (pathname: string) => boolean;
};

export const navItems: NavItem[] = [
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
    href: routePaths.compare,
    label: 'Compare',
    matches: (pathname) => pathname.startsWith(routePaths.compare),
  },
  {
    href: routePaths.analytics,
    label: 'Analytics',
    matches: (pathname) => pathname.startsWith(routePaths.analytics),
  },
];
