export type PaginationRequest = {
  publicDataUrl: string
  limit: number
  page: number
}

export type PaginationResponse<T> = {
  data: T[]
  limit: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
  totalItems: number
  totalPages: number
}
