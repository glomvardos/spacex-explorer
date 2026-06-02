import { CompareEmptyState } from '@/components/launches/compare/compare-empty-state';
import { CompareTable } from '@/components/launches/compare/compare-table';

import { loadCompareColumn } from '@/lib/data/compare-launches';
import type { CompareSelection } from '@/lib/types/compare';

type CompareContentProps = {
  selection: CompareSelection;
};

export async function CompareContent({ selection }: CompareContentProps) {
  const [columnA, columnB] = await Promise.all([
    loadCompareColumn(selection.a),
    loadCompareColumn(selection.b),
  ]);

  if (columnA.status === 'empty' && columnB.status === 'empty') {
    return <CompareEmptyState />;
  }

  return <CompareTable columnA={columnA} columnB={columnB} />;
}
