import type {
  SpaceXLaunch,
  SpaceXLaunchpad,
  SpaceXRocket,
} from '@/lib/types/launches';

export type CompareSide = 'a' | 'b';

export type CompareSelection = {
  a: string;
  b: string;
};

export type CompareColumn =
  | { status: 'empty' }
  | { id: string; status: 'not-found' }
  | { id: string; status: 'error' }
  | {
      id: string;
      launch: SpaceXLaunch;
      launchpad: SpaceXLaunchpad | null;
      rocket: SpaceXRocket | null;
      status: 'ready';
    };

export type ReadyCompareColumn = Extract<CompareColumn, { status: 'ready' }>;
