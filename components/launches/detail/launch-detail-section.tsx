import type { ReactNode } from 'react';

import type { LucideIcon } from 'lucide-react';

import type { PropsWithClassName } from '@/lib/types/props';
import { cn } from '@/lib/utils/cn';

type LaunchDetailSectionProps = PropsWithClassName<{
  ariaBusy?: boolean;
  ariaLabel?: string;
  children: ReactNode;
  icon: LucideIcon;
  title: string;
  titleId?: string;
}>;

type LaunchDetailSectionStateProps = PropsWithClassName<{
  icon: LucideIcon;
  title: string;
}>;

type LaunchDetailSectionErrorProps = LaunchDetailSectionStateProps & {
  message: string;
};

export function LaunchDetailSection({
  ariaBusy,
  ariaLabel,
  children,
  className,
  icon: Icon,
  title,
  titleId,
}: LaunchDetailSectionProps) {
  return (
    <section
      className={cn('bg-card rounded-md border p-5', className)}
      aria-busy={ariaBusy}
      aria-label={ariaLabel}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="flex items-center gap-2 font-semibold">
        <Icon className="size-4" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function LaunchDetailSectionSkeleton({
  className,
  icon,
  title,
}: LaunchDetailSectionStateProps) {
  return (
    <LaunchDetailSection
      ariaBusy
      ariaLabel={`${title} loading`}
      className={className}
      icon={icon}
      title={title}
    >
      <div className="mt-4 space-y-3" aria-hidden="true">
        <div className="bg-muted h-4 w-40 rounded" />
        <div className="bg-muted h-4 w-56 rounded" />
        <div className="bg-muted h-16 rounded" />
      </div>
    </LaunchDetailSection>
  );
}

export function LaunchDetailSectionError({
  className,
  icon,
  message,
  title,
}: LaunchDetailSectionErrorProps) {
  return (
    <LaunchDetailSection className={className} icon={icon} title={title}>
      <p className="text-muted-foreground mt-4 text-sm">{message}</p>
    </LaunchDetailSection>
  );
}
