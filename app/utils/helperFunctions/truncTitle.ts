export function truncTitle(title: string,nbrOfChars:number = 36): string {
  return title.length > nbrOfChars? title.substring(0, nbrOfChars) + '...' : title;
}
