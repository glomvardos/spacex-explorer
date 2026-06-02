import { ArrowLeftRight } from 'lucide-react';

export function CompareEmptyState() {
  return (
    <div className="bg-card rounded-md border px-5 py-10 text-center">
      <ArrowLeftRight
        className="text-muted-foreground mx-auto size-8"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-semibold">Pick two launches</h2>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-6">
        Search for a launch in each column above to compare their date, outcome,
        rocket, and launchpad side by side.
      </p>
    </div>
  );
}
