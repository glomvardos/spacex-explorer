import type { PropsWithClassName } from '@/lib/types/props';
import { cn } from '@/lib/utils/cn';

type PageHeaderProps = PropsWithClassName<{
  description: string;
  title: string;
  titleId: string;
}>;

export function PageHeader({
  className,
  description,
  title,
  titleId,
}: PageHeaderProps) {
  return (
    <div className={cn('border-b pb-5', className)}>
      <div className="max-w-3xl">
        <h1 id={titleId} className="text-3xl font-semibold sm:text-4xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-3 text-base leading-7">
          {description}
        </p>
      </div>
    </div>
  );
}
