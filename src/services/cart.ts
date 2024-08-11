// Constants
import { API_PATHS, PAGINATION } from '@app/constants'

// Types
import { Cart, PaginationRequest, PaginationResponse, QueryParams } from '@app/types'

// Utils
import { getEnvValue, httpRequest, updateQueryParams } from '@app/utils'

// Api urls
const cartApiUrl = `${getEnvValue('VITE_BASE_API_URL')}/${API_PATHS.CARTS}`
const paginationApiUrl = getEnvValue('VITE_PAGINATION_API_URL')

export const addToCartService = async (cartData: Cart): Promise<Cart> => {
  if (!cartData.id) {
    return await httpRequest<Omit<Cart, 'id'>, Cart>(cartApiUrl, 'POST', cartData)
  }
  return await httpRequest<Cart, Cart>(`${cartApiUrl}/${cartData.id}`, 'PUT', cartData)
}

export const getCartsService = async (queryParams: QueryParams<Partial<Cart>>): Promise<PaginationResponse<Cart>> => {
  const queryString = updateQueryParams(queryParams)

  const requestData: PaginationRequest = {
    publicDataUrl: `${cartApiUrl}?${queryString}`,
    page: queryParams.page ?? 1,
    limit: queryParams.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  return await httpRequest<PaginationRequest, PaginationResponse<Cart>>(paginationApiUrl, 'POST', requestData)
}

export const removeFromCartServices = async (cartId: number): Promise<void> =>
  await httpRequest(`${cartApiUrl}/${cartId}`, 'DELETE')
