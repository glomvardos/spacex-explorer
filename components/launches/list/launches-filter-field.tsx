import type { ReactNode } from 'react';

import { Label } from '@/components/ui/label';

type LaunchesFilterFieldProps = {
  children: ReactNode;
  htmlFor: string;
  label: string;
};

export function LaunchesFilterField({
  children,
  htmlFor,
  label,
}: LaunchesFilterFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
