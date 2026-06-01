import type { ApiError } from '../types/api';
import { apiErrorMessage } from '../utils/api-error-message';

export async function queryData<T>(
  endpoint: string,
  requestInit?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPACEX_API_URL}${endpoint}`,
    requestInit,
  );

  if (!response.ok) {
    const errorText = await response.text();
    const message = apiErrorMessage(errorText);

    throw Object.assign(new Error(message), {
      status: response.status,
      statusText: response.statusText,
    }) satisfies ApiError;
  }

  return response.json() as Promise<T>;
}
