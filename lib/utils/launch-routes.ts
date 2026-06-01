import { routePaths } from '@/lib/constants/route-paths';
import { withDynamicSegment } from '@/lib/utils/with-dynamic-segment';

export function createLaunchDetailUrl(launchId: string) {
  return withDynamicSegment(routePaths.launchDetail, {
    id: launchId,
  });
}
