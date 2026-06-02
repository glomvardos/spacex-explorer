import type { ReactNode } from 'react';

import { LaunchStatusBadge } from '@/components/launches/launch-status-badge';
import { LaunchPatch } from '@/components/launches/list/launch-patch';

import type { CompareColumn, ReadyCompareColumn } from '@/lib/types/compare';
import { formatLaunchDate } from '@/lib/utils/format-launch-date';

type CompareTableProps = {
  columnA: CompareColumn;
  columnB: CompareColumn;
};

type CompareRow = {
  key: string;
  label: string;
  render: (column: ReadyCompareColumn) => ReactNode;
};

function Unavailable() {
  return <span className="text-muted-foreground">Unavailable</span>;
}

const compareRows: CompareRow[] = [
  {
    key: 'status',
    label: 'Status',
    render: (column) => <LaunchStatusBadge launch={column.launch} />,
  },
  {
    key: 'date',
    label: 'Launch date',
    render: (column) => (
      <time dateTime={column.launch.date_utc}>
        {formatLaunchDate(column.launch.date_utc)}
      </time>
    ),
  },
  {
    key: 'flight-number',
    label: 'Flight number',
    render: (column) => `#${column.launch.flight_number}`,
  },
  {
    key: 'rocket',
    label: 'Rocket',
    render: (column) => (column.rocket ? column.rocket.name : <Unavailable />),
  },
  {
    key: 'rocket-success-rate',
    label: 'Rocket success rate',
    render: (column) =>
      column.rocket ? `${column.rocket.success_rate_pct}%` : <Unavailable />,
  },
  {
    key: 'launchpad',
    label: 'Launchpad',
    render: (column) =>
      column.launchpad ? column.launchpad.full_name : <Unavailable />,
  },
  {
    key: 'launchpad-region',
    label: 'Region',
    render: (column) =>
      column.launchpad ? column.launchpad.region : <Unavailable />,
  },
];

function ColumnHeader({ column }: { column: CompareColumn }) {
  if (column.status === 'ready') {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <LaunchPatch launch={column.launch} />
        <span className="font-semibold">{column.launch.name}</span>
      </div>
    );
  }

  const message =
    column.status === 'not-found'
      ? 'Launch not found'
      : column.status === 'error'
        ? 'Could not load launch'
        : 'No launch selected';

  return <span className="text-muted-foreground font-medium">{message}</span>;
}

function CompareCell({
  column,
  render,
}: {
  column: CompareColumn;
  render: (column: ReadyCompareColumn) => ReactNode;
}) {
  if (column.status !== 'ready') {
    return <span className="text-muted-foreground">—</span>;
  }

  return render(column);
}

export function CompareTable({ columnA, columnB }: CompareTableProps) {
  return (
    <div className="bg-card overflow-x-auto rounded-md border">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">
          Side-by-side comparison of two SpaceX launches
        </caption>
        <thead>
          <tr className="border-b">
            <th
              scope="col"
              className="text-muted-foreground w-40 px-4 py-4 text-left align-bottom text-xs font-medium tracking-wide uppercase"
            >
              Attribute
            </th>
            <th scope="col" className="border-l px-4 py-4 align-bottom">
              <ColumnHeader column={columnA} />
            </th>
            <th scope="col" className="border-l px-4 py-4 align-bottom">
              <ColumnHeader column={columnB} />
            </th>
          </tr>
        </thead>
        <tbody>
          {compareRows.map((row) => (
            <tr key={row.key} className="border-b last:border-b-0">
              <th
                scope="row"
                className="text-muted-foreground px-4 py-3 text-left font-medium"
              >
                {row.label}
              </th>
              <td className="border-l px-4 py-3 align-top">
                <CompareCell column={columnA} render={row.render} />
              </td>
              <td className="border-l px-4 py-3 align-top">
                <CompareCell column={columnB} render={row.render} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
