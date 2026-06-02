SpaceX Explorer (Frontend, Next.js/React/TypeScript)

Overview  
Build a frontend SpaceX Explorer using the public SpaceX API. Focus on UI/UX, state management, performance and TypeScript.

Data Source (mandatory)  
SpaceX REST API v4: [https://api.spacexdata.com/v4](https://api.spacexdata.com/v4)

Core endpoints you'll likely need:  
POST /launches/query (server-side pagination/filter/sort)  
GET /rockets/:id  
GET /launchpads/:id  
Optional: GET /payloads/:id, GET /cores/:id

Requirements  
Next.js \+ TypeScript project (App Router or Pages Router; explain choice).  
Strong TypeScript types (no any in core logic).  
Good UX: loading, empty, and error states; responsive; accessible.

Must-Have Features  
Launches List  
Server-side pagination via /launches/query (do not fetch all and filter client-side).  
Filters: upcoming/past, success/failure, date range.  
Sort by date/name.  
Search by mission name.  
Infinite scroll or "Load more."  
Skeletons and error states (with retry).

Launch Detail  
Route: /launches/\[id\]  
Show launch info (name, date, success, details, links) \+ related rocket and launchpad (fetched by ID).  
Image gallery (Flickr images if available).

Favorites  
Bookmark launches; persist in LocalStorage.  
Favorites page to view/remove saved items.

Frontend Engineering Focus  
Data Layer  
Use React Query or SWR for caching, dedupe, and background refresh.  
Respect API limits; implement basic retry/backoff for 429/5xx.

Performance  
Virtualize long lists (e.g., react-window).  
Memoize expensive components/selectors.

Accessibility  
Semantic HTML, labels, keyboard navigation, focus management, ARIA where needed.

Styling  
Any consistent approach (CSS Modules, Tailwind, styled-components).

Optional Bonuses  
\- Charts: launches per year/success rate (e.g., Chart.js/Recharts).  
\- Offline support for favorites and cached lists (service worker).  
\- SSR/SSG for the list or details with hydration; explain tradeoffs.  
\- Compare two selected launches side-by-side (date, success, rocket, launchpad). Shareable URL is a plus.

Deliverables  
GitHub repo link:  
README including:  
How to run:  
Architecture decisions (App vs Pages Router, SWR/React Query vs custom fetchers).  
SpaceX API usage (queries, pagination strategy).  
Performance and accessibility considerations.  
Tradeoffs and what you'd do next with more time.  
Known limitations/TODOs.

Evaluation  
TypeScript correctness and component design.  
UX polish, accessibility, and error/empty/loading states.  
API usage with proper pagination/filtering and caching.  
Performance practices (virtualization, memoization).  
Code clarity and documentation.

Timebox  
Aim for 3–5 hours. It's fine to leave TODOs if documented.