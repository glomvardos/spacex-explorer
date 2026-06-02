'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import type { LaunchAnalytics } from '@/lib/types/analytics';

const OUTCOME_COLOR = {
  failure: '#ef4444',
  success: '#10b981',
  upcoming: '#0ea5e9',
} as const;

const chartConfig = {
  failure: { color: OUTCOME_COLOR.failure, label: 'Failed' },
  success: { color: OUTCOME_COLOR.success, label: 'Successful' },
  upcoming: { color: OUTCOME_COLOR.upcoming, label: 'Upcoming' },
} satisfies ChartConfig;

type LaunchAnalyticsChartsProps = {
  analytics: LaunchAnalytics;
};

export function LaunchAnalyticsCharts({
  analytics,
}: LaunchAnalyticsChartsProps) {
  const { perYear, successRate, totalLaunches } = analytics;
  const firstYear = perYear.at(0)?.year;
  const lastYear = perYear.at(-1)?.year;
  const range =
    firstYear && lastYear && firstYear !== lastYear
      ? ` from ${firstYear} to ${lastYear}`
      : '';

  const successRateData = [
    {
      fill: 'var(--color-success)',
      name: 'success',
      value: successRate.success,
    },
    {
      fill: 'var(--color-failure)',
      name: 'failure',
      value: successRate.failure,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section
        className="bg-card rounded-md border p-5"
        aria-labelledby="launches-per-year-heading"
      >
        <h2 id="launches-per-year-heading" className="text-lg font-semibold">
          Launches per year
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {totalLaunches} launches{range}
        </p>
        <p className="sr-only">
          {totalLaunches} SpaceX launches{range}, grouped by year and outcome.
        </p>

        <ChartContainer
          config={chartConfig}
          className="mt-4 aspect-auto h-72 w-full"
        >
          <BarChart
            data={perYear}
            margin={{ bottom: 0, left: 0, right: 8, top: 8 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={8}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) =>
                    String(payload?.[0]?.payload?.year ?? '')
                  }
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="success"
              stackId="launches"
              fill="var(--color-success)"
            />
            <Bar
              dataKey="failure"
              stackId="launches"
              fill="var(--color-failure)"
            />
            <Bar
              dataKey="upcoming"
              stackId="launches"
              fill="var(--color-upcoming)"
            />
          </BarChart>
        </ChartContainer>
      </section>

      <section
        className="bg-card rounded-md border p-5"
        aria-labelledby="success-rate-heading"
      >
        <h2 id="success-rate-heading" className="text-lg font-semibold">
          Success rate
        </h2>
        <p className="sr-only">
          {successRate.successRatePct}% of {successRate.total} completed
          launches were successful: {successRate.success} successful and{' '}
          {successRate.failure} failed.
        </p>

        {successRate.total > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 sm:items-center">
            <div>
              <p className="text-4xl font-semibold tabular-nums">
                {successRate.successRatePct}%
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                of {successRate.total} completed launches successful
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-full"
                    style={{ background: OUTCOME_COLOR.success }}
                    aria-hidden="true"
                  />
                  Successful
                  <span className="text-muted-foreground ml-auto tabular-nums">
                    {successRate.success}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className="size-3 rounded-full"
                    style={{ background: OUTCOME_COLOR.failure }}
                    aria-hidden="true"
                  />
                  Failed
                  <span className="text-muted-foreground ml-auto tabular-nums">
                    {successRate.failure}
                  </span>
                </li>
              </ul>
            </div>

            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-56"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="name" hideLabel />}
                />
                <Pie
                  data={successRateData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="62%"
                  outerRadius="92%"
                  paddingAngle={2}
                />
              </PieChart>
            </ChartContainer>
          </div>
        ) : (
          <p className="text-muted-foreground mt-4 text-sm">
            No completed launches yet.
          </p>
        )}
      </section>
    </div>
  );
}
