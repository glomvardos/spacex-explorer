import { notFound } from 'next/navigation';

import { fetchLaunch } from '@/lib/data/launch-details';
import { isApiError } from '@/lib/utils/is-api-error';

export async function getLaunchDetailPageData(id: string) {
  try {
    return await fetchLaunch(id);
  } catch (error) {
    if (isApiError(error) && error.status === 404) {
      notFound();
    }

    throw error;
  }
}
