import type { ApiError } from '../types/api';
import { apiErrorMessage } from '../utils/api-error-message';

const MAX_RETRIES = 2;
const BASE_RETRY_DELAY_MS = 500;
const MAX_RETRY_DELAY_MS = 4_000;

function isRetryableStatus(status: number) {
  return status === 429 || status >= 500;
}

function getRetryDelay(retryIndex: number) {
  return Math.min(BASE_RETRY_DELAY_MS * 2 ** retryIndex, MAX_RETRY_DELAY_MS);
}

function sleep(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function fetchWithRetry(url: string, requestInit?: RequestInit) {
  for (let retryIndex = 0; retryIndex < MAX_RETRIES; retryIndex += 1) {
    const response = await fetch(url, requestInit);

    if (!isRetryableStatus(response.status)) {
      return response;
    }

    await response.body?.cancel();
    await sleep(getRetryDelay(retryIndex));
  }

  return fetch(url, requestInit);
}

export async function queryData<T>(
  endpoint: string,
  requestInit?: RequestInit,
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_SPACEX_API_URL}${endpoint}`;
  const response = await fetchWithRetry(url, requestInit);

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
