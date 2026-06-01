const SKELETON_ROWS = [1, 2, 3, 4, 5, 6];

export function LaunchesSkeleton() {
  return (
    <ul
      className="bg-card overflow-hidden rounded-md border"
      aria-hidden="true"
    >
      {SKELETON_ROWS.map((row) => (
        <li
          key={row}
          className="grid gap-3 border-b px-4 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
        >
          <div className="bg-muted size-14 rounded-md" />
          <div className="space-y-3">
            <div className="bg-muted h-4 w-48 rounded" />
            <div className="bg-muted h-3 w-36 rounded" />
            <div className="bg-muted h-3 max-w-xl rounded" />
          </div>
          <div className="bg-muted h-7 w-24 rounded-md" />
        </li>
      ))}
    </ul>
  );
}
