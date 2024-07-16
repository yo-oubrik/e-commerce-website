export function truncTitle(title: string): string {
  return title.length > 30 ? title.substring(0, 30) + '...' : title;
}
