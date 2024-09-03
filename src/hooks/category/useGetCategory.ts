import { useQuery } from '@tanstack/react-query'

// Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

// Types
import { Category, ExtendedQueryParams } from '@app/types'

// Services
import { getCategoriesService } from '@app/services'

export const useGetCategories = (params?: ExtendedQueryParams<Partial<Category>>) => {
  const defaultParams: ExtendedQueryParams<Partial<Category>> = {
    page: 1,
    _sort: 'id',
    _order: 'asc',
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  const { isPending, data, error } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, { ...defaultParams, ...params }],
    queryFn: () => getCategoriesService({ ...defaultParams, ...params })
  })

  return {
    isCategoriesPending: isPending,
    categories: data || {
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
    categoriesError: error
  }
}
