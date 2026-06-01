export function withDynamicSegment(
  path: string,
  dynamicSegment: Record<string, string>,
) {
  return Object.entries(dynamicSegment).reduce(
    (result, [key, value]) => result.replace(new RegExp(`:${key}`, 'g'), value),
    path,
  );
}
