export const endpoints = {
  core: '/cores/:id',
  launch: '/launches/:id',
  launchpad: '/launchpads/:id',
  launchesQuery: '/launches/query',
  payload: '/payloads/:id',
  rocket: '/rockets/:id',
} as const;
