import type { ReactNode } from 'react';

import type { PropsWithClassName } from '@/lib/types/props';
import { cn } from '@/lib/utils/cn';

type PageSectionProps = PropsWithClassName<{
  children: ReactNode;
  labelledBy: string;
}>;

export function PageSection({
  children,
  className,
  labelledBy,
}: PageSectionProps) {
  return (
    <section
      className={cn(
        'mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8',
        className,
      )}
      aria-labelledby={labelledBy}
    >
      {children}
    </section>
  );
}
