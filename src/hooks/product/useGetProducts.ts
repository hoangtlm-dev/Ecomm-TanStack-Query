import { useInfiniteQuery } from '@tanstack/react-query'

// Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

/// Types
import { ExtendedQueryParams, ProductParams } from '@app/types'

// Services
import { getProductsService } from '@app/services'

// Hooks
import { useQueryParams } from '@app/hooks'

// Utils
import { convertColorParamsToCamelCase, getIdFromSlug } from '@app/utils'

export const useGetProducts = (params?: Partial<ExtendedQueryParams<ProductParams>>) => {
  const queryParams = useQueryParams()

  const categorySlug = queryParams.brand
  const categoryId = categorySlug && getIdFromSlug(categorySlug)

  // Define default parameters
  const defaultParams: Partial<ExtendedQueryParams<ProductParams>> = {
    categoryId: Number(categoryId),
    page: queryParams.page ? Number(queryParams.page) : 1,
    _sort: queryParams.sort ?? 'id',
    _order: queryParams.order === 'asc' || queryParams.order === 'desc' ? queryParams.order : 'desc',
    limit: queryParams.limit ? Number(queryParams.limit) : PAGINATION.DEFAULT_ITEMS_PER_PAGE,
    price_gte: queryParams.min_price ? Number(queryParams.min_price) : 0,
    price_lte: queryParams.max_price ? Number(queryParams.max_price) : 1000,
    colors_like: queryParams.color ? convertColorParamsToCamelCase(queryParams.color) : ''
  }

  const { isPending, data, ...rest } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, { ...defaultParams, ...params }],
    queryFn: () => getProductsService({ ...defaultParams, ...params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.page + 1 : undefined)
  })

  const lastPage = data?.pages[data?.pages?.length - 1] || {
    data: [],
    limit: 0,
    page: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
    totalItems: 0,
    totalPages: 0
  }
  const productList = data?.pages.flatMap((page) => page.data) || []
  const totalItems = Number(lastPage?.totalItems)
  const itemsPerPage = Number(lastPage?.limit)
  const currentPage = Number(lastPage?.page)

  return {
    isProductListLoading: isPending,
    productList,
    lastPage,
    totalItems,
    itemsPerPage,
    currentPage,
    ...rest
  }
}
