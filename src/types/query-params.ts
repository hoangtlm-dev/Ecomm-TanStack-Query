export type QueryParams<T extends Record<string, string | number | boolean>> = {
  page?: number
  limit?: number
  q?: string
  _sort?: string
  _order?: 'asc' | 'desc'
  _start?: number
  _end?: number
} & T

export type OmitPageAndLimit<T> = Omit<T, 'page' | 'limit'>

type AddSuffix<T, Suffix extends string> = {
  [K in keyof T as `${Extract<K, string>}${Suffix}`]?: T[K] extends string[] ? string : T[K]
}

export type ExtendedQueryParams<T extends Record<string, string | number | boolean>> = QueryParams<T> &
  AddSuffix<T, '_ne'> &
  AddSuffix<T, '_gte'> &
  AddSuffix<T, '_lte'> &
  AddSuffix<T, '_like'>
