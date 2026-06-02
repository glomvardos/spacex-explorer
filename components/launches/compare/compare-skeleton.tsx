const SKELETON_ROWS = [1, 2, 3, 4, 5, 6, 7];

export function CompareSkeleton() {
  return (
    <div className="bg-card rounded-md border p-4" aria-hidden="true">
      <div className="grid grid-cols-[10rem_1fr_1fr] gap-4 border-b pb-4">
        <div />
        <div className="bg-muted mx-auto size-16 rounded-md" />
        <div className="bg-muted mx-auto size-16 rounded-md" />
      </div>
      <div className="mt-4 space-y-4">
        {SKELETON_ROWS.map((row) => (
          <div key={row} className="grid grid-cols-[10rem_1fr_1fr] gap-4">
            <div className="bg-muted h-4 w-24 rounded" />
            <div className="bg-muted h-4 w-28 rounded" />
            <div className="bg-muted h-4 w-28 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
