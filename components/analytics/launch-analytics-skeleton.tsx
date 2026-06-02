export function LaunchAnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <div className="bg-card rounded-md border p-5">
        <div className="bg-muted h-5 w-40 rounded" />
        <div className="bg-muted mt-4 h-72 rounded" />
      </div>
      <div className="bg-card rounded-md border p-5">
        <div className="bg-muted h-5 w-32 rounded" />
        <div className="bg-muted mt-4 h-56 rounded" />
      </div>
    </div>
  );
}
