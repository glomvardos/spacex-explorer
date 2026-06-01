'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function handleClick() {
    const isDark =
      resolvedTheme === 'dark' ||
      document.documentElement.classList.contains('dark');

    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      onClick={handleClick}
    >
      <Sun
        aria-hidden="true"
        data-icon="inline-start"
        className="hidden dark:block"
      />
      <Moon
        aria-hidden="true"
        data-icon="inline-start"
        className="dark:hidden"
      />
    </Button>
  );
}
