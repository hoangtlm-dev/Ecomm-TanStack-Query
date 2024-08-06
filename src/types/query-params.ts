export type QueryParams<T extends Record<string, string | number | boolean>> = {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  _start?: number
  _end?: number
} & T

export type OmitPageAndLimit<T> = Omit<T, 'page' | 'limit'>

export type AllowedQueryKeys<T extends Record<string, string | number | boolean>> = keyof QueryParams<T>
