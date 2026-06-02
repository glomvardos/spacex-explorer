# SpaceX Explorer

SpaceX Explorer is a small app for browsing the history of SpaceX launches. You
can search, filter and sort the launches, open one to see its details, rocket,
launch site and photos, save launches to come back to, and compare two launches
side by side. There is also a page of charts showing how many launches happened
each year and the overall success rate.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Use `npm run build` for a production build and
`npm run lint` to check the code.

Live link: https://spacex-explorer-rho.vercel.app

## Architecture decisions

I built the app on the Next.js App Router. It lets the first view render on the
server and arrive ready to read, while only the interactive parts run in the
browser. Most of the app stays server rendered, and search, favorites, the
charts and the image viewer are the pieces that run on the client.

For data I used React Query rather than writing fetching by hand. It handles
caching, removing duplicate requests, refreshing in the background, and loading
and error states, which covers most of what the list and detail screens need.
The actual network calls live in one small shared layer, so the same code runs
whether a page is built on the server or in the browser.

Filters, search and sorting are kept in the page address instead of in
component state. A filtered view can then be shared or bookmarked, and it
survives a refresh or the browser back button.

## Data and pagination

The app reads from the public SpaceX API. The launch list is paged on the
server: each time you reach the bottom of the list it asks for the next page,
instead of downloading every launch and filtering in the browser. Searching,
filtering by status or date, and sorting are all done by the API as well, so
the browser only holds the rows it is currently showing.

Every request asks only for the fields a screen actually uses, which keeps
responses small. A detail page loads the launch and then its rocket and launch
site, and those results are cached and refreshed quietly in the background, so
opening the same launch again is instant and the compare page reuses the same
data. If the API is briefly busy or returns an error, requests are retried a few
times with a short, growing delay before the screen falls back to an error
message with a retry button.

## Performance

- The first page of the list is rendered on the server and arrives ready to
  show, so there is no loading flash on the first visit.
- Long lists are virtualized, so only the rows on screen are rendered no matter
  how far you scroll.
- Responses are trimmed to the fields in use, and detail data is cached and
  shared with the compare page to avoid repeat requests.
- Images load only when needed and are sized in advance so they do not shift the
  layout as they appear.
- List rows do not prefetch in the background, which stops scrolling from firing
  a large number of requests at once.

## Accessibility

- Real headings, landmarks, lists and a comparison table are used so the page
  structure is clear without sight.
- Every control has a label, decorative icons are hidden from assistive
  technology, and the active page is marked in the navigation.
- The whole app works with the keyboard, focus stays visible, and overlays such
  as the menu, filters and image viewer keep focus inside while open and hand it
  back when closed.
- A skip link lets keyboard users jump straight past the header to the content.
- Loading, empty and error states are announced rather than only shown.
- The layout adapts from phone to desktop and supports light and dark mode.

## Tradeoffs

- The list is rendered fresh on each request, because what it shows depends on
  the filters in the address and the data changes over time, so it cannot be
  built ahead of time. Detail and analytics pages are built on first visit and
  then refreshed in the background, which keeps them fast and lets new launches
  show up without a rebuild. The cost is that the first visit to a launch nobody
  has opened yet is a little slower while it is prepared.
- Favorites are stored in the browser. They stay private to the device and need
  no account, but they do not follow you to another device.
- Detail pages cope with partial failures. If one section such as the rocket or
  launch site cannot load, that section shows a short "unavailable" note and the
  rest of the page still works.

## What I'd do with more time

- Offline support, so saved launches and recently viewed data stay readable
  without a connection. This is two pieces of work rather than one, because the
  launch list is requested in a way the browser cannot cache on its own, so the
  saved data and the rest of the app would need to be handled separately. I left
  it out rather than ship a version that is easy to get subtly wrong.
- Automated tests: small unit tests for the address and filter helpers, a few
  component tests for favorites and the launch picker, and one test that walks
  through the main flow end to end.
- Move keyboard focus to the top of each page after navigating, so the change of
  page is felt as well as announced.
- Richer detail pages, such as a map of the launch site and crew information
  where it exists.
- Smaller gallery thumbnails, loading the full size photo only when one is
  opened.

## Known limitations

- There is no offline mode yet, as described above.
- Favorites are tied to a single device and browser, since they are not linked
  to an account.
- There are no automated tests yet.
