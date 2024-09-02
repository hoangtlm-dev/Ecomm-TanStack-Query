import { useQuery } from '@tanstack/react-query'

// Constants
import { PAGINATION } from '@app/constants'

/// Types
import { ExtendedQueryParams, PaginationResponse, Product, ProductParams } from '@app/types'

// Services
import { getCurrentProductServices, getProductsService } from '@app/services'

// Hooks
import { useQueryParams } from '@app/hooks'

// Utils
import { getIdFromSlug } from '@app/utils'

export const useGetProducts = (params?: ExtendedQueryParams<Partial<ProductParams>>) => {
  const queryParams = useQueryParams()

  const categorySlug = queryParams.brand
  const categoryId = categorySlug && getIdFromSlug(categorySlug)
  const categoryIdParam = categoryId ?? null

  // Define default parameters
  const defaultParams: ExtendedQueryParams<Partial<ProductParams>> = {
    categoryId: Number(categoryIdParam),
    page: queryParams.page ? Number(queryParams.page) : 1,
    _sort: queryParams.sort ?? 'id',
    _order: queryParams.order === 'asc' || queryParams.order === 'desc' ? queryParams.order : 'desc',
    limit: queryParams.limit ? Number(queryParams.limit) : PAGINATION.DEFAULT_ITEMS_PER_PAGE,
    price_gte: queryParams.min_price ? Number(queryParams.min_price) : 0,
    price_lte: queryParams.max_price ? Number(queryParams.max_price) : 1000,
    colors_like: queryParams.color ? queryParams.color : ''
  }

  const { isPending, data, error } = useQuery<PaginationResponse<Product>>({
    queryKey: ['products', { ...defaultParams, ...params }],
    queryFn: () => getProductsService({ ...defaultParams, ...params })
  })

  return {
    isProductListPending: isPending,
    productList: data || {
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
    productListError: error
  }
}

export const useGetCurrentProduct = (productId: number) => {
  const { isPending, data, error } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => getCurrentProductServices(productId)
  })

  return {
    isCurrentProductPending: isPending,
    currentProduct: data,
    currentProductError: error
  }
}
