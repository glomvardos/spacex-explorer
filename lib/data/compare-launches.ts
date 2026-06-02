import {
  fetchLaunch,
  fetchLaunchpad,
  fetchRocket,
} from '@/lib/data/launch-details';
import type { CompareColumn } from '@/lib/types/compare';
import { isApiError } from '@/lib/utils/is-api-error';

export async function loadCompareColumn(id: string): Promise<CompareColumn> {
  if (!id) {
    return { status: 'empty' };
  }

  try {
    const launch = await fetchLaunch(id);
    const [rocket, launchpad] = await Promise.all([
      fetchRocket(launch.rocket).catch(() => null),
      fetchLaunchpad(launch.launchpad).catch(() => null),
    ]);

    return { id, launch, launchpad, rocket, status: 'ready' };
  } catch (error) {
    if (isApiError(error) && error.status === 404) {
      return { id, status: 'not-found' };
    }

    return { id, status: 'error' };
  }
}
