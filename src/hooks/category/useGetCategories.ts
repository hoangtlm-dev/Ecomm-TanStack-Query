import { useInfiniteQuery } from '@tanstack/react-query'

// Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

/// Types
import { Category, ExtendedQueryParams } from '@app/types'

// Services
import { getCategoriesService } from '@app/services'

export const useGetCategories = (params?: ExtendedQueryParams<Partial<Category>>) => {
  // Define default parameters
  const defaultParams: ExtendedQueryParams<Partial<Category>> = {
    page: 1,
    _sort: 'id',
    _order: 'asc',
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  const { isPending, data, ...rest } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, { ...defaultParams, ...params }],
    queryFn: () => getCategoriesService({ ...defaultParams, ...params }),
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
  const categories = data?.pages.flatMap((page) => page.data) || []
  const totalItems = Number(lastPage?.totalItems)
  const itemsPerPage = Number(lastPage?.limit)
  const currentPage = Number(lastPage?.page)

  return {
    isCategoriesLoading: isPending,
    categories,
    lastPage,
    totalItems,
    itemsPerPage,
    currentPage,
    ...rest
  }
}
