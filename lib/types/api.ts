export type ApiError = Error & {
  status: number;
  statusText: string;
};
