const numberFormatter = new Intl.NumberFormat('en');

export function formatNumber(value: number) {
  return numberFormatter.format(value);
}
