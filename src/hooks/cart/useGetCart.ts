import { useQuery } from '@tanstack/react-query'

// Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

/// Types
import { CartItem, ExtendedQueryParams } from '@app/types'

// Services
import { getCartService } from '@app/services'

export const useGetCart = (params?: ExtendedQueryParams<Partial<CartItem>>) => {
  const defaultParams: ExtendedQueryParams<Partial<CartItem>> = {
    page: 1,
    _sort: 'id',
    _order: 'desc',
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  const { isPending, data, error } = useQuery({
    queryKey: [QUERY_KEYS.CART, { ...defaultParams, ...params }],
    queryFn: () => getCartService({ ...defaultParams, ...params })
  })

  return {
    isCartListPending: isPending,
    cartList: data || {
      data: [],
      limit: 0,
      page: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
      totalItems: 0,
      totalPages: 0
    },
    cartListError: error
  }
}
