# SpaceX Explorer

Frontend tech task built with Next.js App Router, TypeScript, React Query, and
the public SpaceX REST API v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture Notes

- Next.js App Router is used for the project structure.
- React Query owns list caching, dedupe, manual retry, and infinite loading
  state.
- The launches page reads filter state from URL search params, server-prefetches
  the first page, and hydrates React Query so refresh/back/forward keep the same
  result set.
- SpaceX list data is requested through `POST /launches/query` with API-side
  pagination and sorting.
- Generic API transport lives in `lib/api`; endpoint-specific data functions
  live in `lib/data`; React Query hooks live in `lib/hooks`.
- Basic retry/backoff for SpaceX `429` and `5xx` responses is handled in the
  generic API transport instead of React Query. This keeps API-limit behavior
  consistent for server prefetch, client queries, and future detail requests
  while avoiding multiplied retries from both layers.
- Generic typography components are intentionally not added. The app only
  has a few text styles, so `h1`, `h2`, and `p` styles stay close to the
  components that own the content. Shared components are added where structure
  repeats, such as `PageHeader` and `PageSection`.

## Rendering Strategy (SSR / SSG / ISR)

Every route ships HTML first and then hydrates. The list additionally
dehydrates and rehydrates the React Query cache, so the client does not refetch
the server-rendered first page.

### Tradeoffs

- **List (SSR).** Filters, search, and sort live in the URL and the data keeps
  changing, so the list can't be prerendered. The server renders the first page
  (prefetched into React Query) and the client takes over after that.
  `staleTimes.dynamic` is set to 30 so going back to the list within 30s reuses
  the cached page instead of re-rendering it.
- **Detail (SSG + ISR).** `generateStaticParams` returns `[]`, so the build
  never calls SpaceX. Each launch page is generated the first time someone opens
  it, then cached and revalidated hourly. New launches don't need a rebuild:
  they appear in the live list and generate on first visit. The cost is that the
  first hit on an uncached page is a bit slower, and if a section's fetch fails
  during that render its "unavailable" card is cached until the next revalidate
  (the transport retries 429/5xx, so it rarely gets that far).
- **Detail errors.** Rocket, launchpad, payloads, and cores each load in their
  own `Suspense` and catch their own errors, so a failed section just shows an
  "unavailable" card and the rest of the page still works. Only a failure of the
  launch fetch itself hits `error.tsx`.
- **Analytics (SSG + ISR).** Generated at build, then revalidated hourly, so it
  stays fast but still picks up new launches without a rebuild. The aggregate
  changes rarely, so hourly is plenty.
- **Compare (SSR).** `/compare` reads the two launch ids from the URL
  (`?a=<id>&b=<id>`), so it can't be prerendered and renders per request. The
  launch, rocket, and launchpad fetches are the same cached ones the detail page
  uses, so once a launch has been opened the comparison is fast. A missing id
  shows an inline "not found" column and a failed rocket or launchpad fetch
  shows an inline "unavailable" cell, so one bad id never breaks the whole page.
- **Favorites (client).** They're in `localStorage`, so there's nothing for the
  server to render. You get a skeleton first and the page isn't indexable, which
  is fine for personal data.

## Commands

```bash
npm run dev
npm run lint
npm run build
```
