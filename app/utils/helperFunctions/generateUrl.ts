import { SearchParams } from "@/app/product/utils/types";
import queryString from "query-string";

export function generateUrl(
  baseUrl: string,
  queryParams: SearchParams,
  skipNull = true,
  skipEmptyString = true
) {
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
}
