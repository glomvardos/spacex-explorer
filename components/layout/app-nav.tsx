'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { navItems } from '@/lib/constants/nav-items';
import { cn } from '@/lib/utils/cn';

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
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
