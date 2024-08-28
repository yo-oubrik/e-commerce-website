import queryString, { StringifiableRecord } from "query-string";

export function generateUrl(
  baseUrl: string,
  queryParams: StringifiableRecord,
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
