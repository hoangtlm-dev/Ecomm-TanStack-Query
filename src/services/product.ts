// Constants
import { API_PATHS, PAGINATION } from '@app/constants'

// Types
import { PaginationRequest, PaginationResponse, Product, QueryParams } from '@app/types'

// Utils
import { getEnvValue, httpRequest, updateQueryParams } from '@app/utils'

// Api urls
const productApiUrl = `${getEnvValue('VITE_BASE_API_URL')}/${API_PATHS.PRODUCTS}`
const paginationApiUrl = getEnvValue('VITE_PAGINATION_API_URL')

export const getProductsService = async (
  queryParams: QueryParams<Partial<Product>>
): Promise<PaginationResponse<Product>> => {
  const queryString = updateQueryParams(queryParams)

  const requestData: PaginationRequest = {
    publicDataUrl: `${productApiUrl}?${queryString}`,
    page: queryParams._page ?? 1,
    limit: queryParams._limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  return await httpRequest<PaginationRequest, PaginationResponse<Product>>(paginationApiUrl, 'POST', requestData)
}
