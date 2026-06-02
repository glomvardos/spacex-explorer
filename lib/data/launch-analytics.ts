import { queryData } from '@/lib/api/query-data';
import { endpoints } from '@/lib/constants/endpoints';
import type { LaunchAnalytics, LaunchesPerYear } from '@/lib/types/analytics';
import type { SpaceXQueryResponse } from '@/lib/types/launches';

type AnalyticsLaunch = {
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
};

type AnalyticsQueryRequest = {
  options: {
    pagination: false;
    select: Array<keyof AnalyticsLaunch>;
    sort: { date_utc: 'asc' };
  };
  query: Record<string, never>;
};

function aggregateLaunches(launches: AnalyticsLaunch[]): LaunchAnalytics {
  const perYearByYear = new Map<number, LaunchesPerYear>();
  let success = 0;
  let failure = 0;

  for (const launch of launches) {
    const year = new Date(launch.date_utc).getUTCFullYear();

    if (Number.isNaN(year)) {
      continue;
    }

    let bucket = perYearByYear.get(year);

    if (!bucket) {
      bucket = { failure: 0, success: 0, total: 0, upcoming: 0, year };
      perYearByYear.set(year, bucket);
    }

    bucket.total += 1;

    if (launch.upcoming) {
      bucket.upcoming += 1;
    } else if (launch.success === true) {
      bucket.success += 1;
      success += 1;
    } else if (launch.success === false) {
      bucket.failure += 1;
      failure += 1;
    }
  }

  const perYear = Array.from(perYearByYear.values()).sort(
    (a, b) => a.year - b.year,
  );
  const total = success + failure;
  const successRatePct = total > 0 ? Math.round((success / total) * 100) : 0;

  return {
    perYear,
    successRate: { failure, success, successRatePct, total },
    totalLaunches: launches.length,
  };
}

export async function fetchLaunchAnalytics(): Promise<LaunchAnalytics> {
  const body: AnalyticsQueryRequest = {
    options: {
      pagination: false,
      select: ['date_utc', 'success', 'upcoming'],
      sort: { date_utc: 'asc' },
    },
    query: {},
  };

  const response = await queryData<SpaceXQueryResponse<AnalyticsLaunch>>(
    endpoints.launchesQuery,
    {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );

  return aggregateLaunches(response.docs);
}
