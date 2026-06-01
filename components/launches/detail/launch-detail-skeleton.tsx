const GALLERY_SKELETONS = [1, 2, 3];
const RELATED_SKELETONS = [1, 2];

export function LaunchDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <div className="bg-card grid gap-5 rounded-md border p-5 lg:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="space-y-4">
          <div className="bg-muted h-6 w-28 rounded-md" />
          <div className="bg-muted h-10 max-w-md rounded" />
          <div className="bg-muted h-4 w-48 rounded" />
          <div className="bg-muted h-24 max-w-3xl rounded" />
          <div className="flex flex-wrap gap-2">
            <div className="bg-muted h-8 w-28 rounded-2xl" />
            <div className="bg-muted h-8 w-28 rounded-2xl" />
            <div className="bg-muted h-8 w-28 rounded-2xl" />
          </div>
        </div>
        <div className="bg-muted aspect-square rounded-md" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {RELATED_SKELETONS.map((item) => (
          <div key={item} className="bg-card rounded-md border p-5">
            <div className="bg-muted h-5 w-32 rounded" />
            <div className="mt-4 space-y-3">
              <div className="bg-muted h-4 w-48 rounded" />
              <div className="bg-muted h-4 w-36 rounded" />
              <div className="bg-muted h-16 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-md border p-5">
        <div className="bg-muted h-5 w-32 rounded" />
        <div className="mt-4 space-y-3">
          <div className="bg-muted h-5 w-48 rounded" />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="bg-muted h-12 rounded" />
            <div className="bg-muted h-12 rounded" />
            <div className="bg-muted h-12 rounded" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-muted h-6 w-36 rounded" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_SKELETONS.map((item) => (
            <div
              key={item}
              className="bg-muted aspect-[4/3] rounded-md border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
