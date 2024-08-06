// Types
import { OmitPageAndLimit, QueryParams } from '@app/types'

export const updateQueryParams = <T extends Record<string, string | number | boolean>>(
  params: QueryParams<T>
): string => {
  // Destructure to separate page and limit from the rest
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page, limit, ...rest } = params

  // Convert the rest properties into query string format
  const queryString = Object.keys(rest as OmitPageAndLimit<typeof params>)
    .filter((key) => !!rest[key as keyof OmitPageAndLimit<typeof params>])
    .map(
      (key) => `_${encodeURIComponent(key)}=${encodeURIComponent(rest[key as keyof OmitPageAndLimit<typeof params>])}`
    )
    .join('&')

  return queryString
}
