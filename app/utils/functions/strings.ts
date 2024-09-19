import { SearchParams } from "@/app/product/utils/types";
import queryString from "query-string";

export function truncTitle(title: string, nbrOfChars: number = 36): string {
  return title.length > nbrOfChars
    ? title.substring(0, nbrOfChars) + "..."
    : title;
}
export const generateUrl = (
  baseUrl: string,
  queryParams: SearchParams,
  skipNull = true,
  skipEmptyString = true
) => {
  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query: queryParams,
    },
    {
      skipNull: skipNull,
      skipEmptyString: skipEmptyString,
    }
  );
};
