const regexSpecialCharacters = /[.*+?^${}()|[\]\\]/g;

export function escapeRegExp(value: string) {
  return value.replace(regexSpecialCharacters, '\\$&');
}
