import type { ApiError } from '@/lib/types/api';

export function isApiError(error: unknown): error is ApiError {
  return (
    error instanceof Error &&
    'status' in error &&
    typeof error.status === 'number'
  );
}
