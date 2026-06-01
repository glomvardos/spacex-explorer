export function apiErrorMessage(message?: string) {
  if (message) {
    return safeParseErrorDetail(message);
  }

  return 'Something went wrong';
}

function safeParseErrorDetail(errorDetail: string) {
  return errorDetail.replace(/[^a-zA-Z0-9@: ]/g, '');
}
