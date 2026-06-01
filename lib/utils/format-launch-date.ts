const launchDateFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function formatLaunchDate(dateUtc: string) {
  return launchDateFormatter.format(new Date(dateUtc));
}
