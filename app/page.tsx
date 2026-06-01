import { LaunchesList } from '@/components/launches/launches-list';

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section
        className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"
        aria-labelledby="launches-heading"
      >
        <header className="flex flex-col gap-2 border-b pb-5">
          <p className="text-muted-foreground text-sm font-medium">
            SpaceX Explorer
          </p>
          <div className="max-w-3xl">
            <h1
              id="launches-heading"
              className="text-foreground text-3xl font-semibold tracking-normal sm:text-4xl"
            >
              Launches
            </h1>
            <p className="text-muted-foreground mt-3 text-base leading-7">
              Every SpaceX launch in one timeline.
            </p>
          </div>
        </header>

        <LaunchesList />
      </section>
    </main>
  );
}
