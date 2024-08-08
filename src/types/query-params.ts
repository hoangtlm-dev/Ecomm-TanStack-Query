export type QueryParams<T extends Record<string, string | number | boolean>> = {
  page?: number
  limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  _start?: number
  _end?: number
  id_ne?: number
} & T

export type OmitPageAndLimit<T> = Omit<T, 'page' | 'limit'>

export type AllowedQueryKeys<T extends Record<string, string | number | boolean>> = keyof QueryParams<T>
