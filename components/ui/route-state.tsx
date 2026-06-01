import type { ReactNode } from 'react';

import type { LucideIcon } from 'lucide-react';

type RouteStateProps = {
  action?: ReactNode;
  description: string;
  icon: LucideIcon;
  role?: 'alert';
  title: string;
  titleId: string;
};

export function RouteState({
  action,
  description,
  icon: Icon,
  role,
  title,
  titleId,
}: RouteStateProps) {
  const descriptionId = `${titleId}-description`;

  return (
    <div
      className="bg-card rounded-md border px-5 py-10 text-center"
      role={role}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <Icon className="text-muted-foreground mx-auto size-8" aria-hidden />
      <h1 id={titleId} className="mt-4 text-lg font-semibold">
        {title}
      </h1>
      <p id={descriptionId} className="text-muted-foreground mt-2 text-sm">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
