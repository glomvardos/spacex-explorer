import { queryData } from '@/lib/api/query-data';
import { endpoints } from '@/lib/constants/endpoints';
import type {
  LaunchCoreDetail,
  SpaceXCore,
  SpaceXLaunch,
  SpaceXLaunchCore,
  SpaceXLaunchpad,
  SpaceXPayload,
  SpaceXRocket,
} from '@/lib/types/launches';
import { uniqueIds } from '@/lib/utils/unique-ids';
import { withDynamicSegment } from '@/lib/utils/with-dynamic-segment';

const LAUNCH_DETAIL_REVALIDATE_SECONDS = 60 * 60;
const cachedLaunchDetailRequestInit = {
  cache: 'force-cache',
  next: {
    revalidate: LAUNCH_DETAIL_REVALIDATE_SECONDS,
  },
} satisfies RequestInit;

export function fetchLaunch(id: string) {
  return queryData<SpaceXLaunch>(
    withDynamicSegment(endpoints.launch, { id }),
    cachedLaunchDetailRequestInit,
  );
}

export function fetchRocket(id: string) {
  return queryData<SpaceXRocket>(
    withDynamicSegment(endpoints.rocket, { id }),
    cachedLaunchDetailRequestInit,
  );
}

export function fetchLaunchpad(id: string) {
  return queryData<SpaceXLaunchpad>(
    withDynamicSegment(endpoints.launchpad, { id }),
    cachedLaunchDetailRequestInit,
  );
}

function fetchPayload(id: string) {
  return queryData<SpaceXPayload>(
    withDynamicSegment(endpoints.payload, { id }),
    cachedLaunchDetailRequestInit,
  );
}

function fetchCore(id: string) {
  return queryData<SpaceXCore>(
    withDynamicSegment(endpoints.core, { id }),
    cachedLaunchDetailRequestInit,
  );
}

export function fetchPayloads(ids: string[]) {
  return Promise.all(uniqueIds(ids).map((id) => fetchPayload(id)));
}

export function fetchCoreDetails(
  launchCores: SpaceXLaunchCore[],
): Promise<LaunchCoreDetail[]> {
  return Promise.all(
    launchCores.map(async (launchCore) => ({
      core: launchCore.core ? await fetchCore(launchCore.core) : null,
      launchCore,
    })),
  );
}
