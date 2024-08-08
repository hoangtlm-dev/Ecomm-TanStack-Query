import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { Category, PaginationResponse, QueryParams } from '@app/types'

// Services
import { getCategoriesService } from '@app/services'

export interface ICategoryState {
  data: PaginationResponse<Category>
  isFetching: boolean
  error: string | null
}

export interface ICategoryAction {
  type: 'REQUEST_PENDING' | 'FETCH_CATEGORIES_SUCCESS' | 'REQUEST_FAILURE'
  payload?: PaginationResponse<Category> | string
}

const initialState: ICategoryState = {
  data: {
    data: [],
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE,
    page: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: null,
    totalItems: 0,
    totalPages: 0
  },
  isFetching: false,
  error: null
}

const categoryReducer = (state: ICategoryState, action: ICategoryAction): ICategoryState => {
  switch (action.type) {
    case 'REQUEST_PENDING':
      return { ...state, isFetching: true, error: null }
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, isFetching: false, data: action.payload as PaginationResponse<Category> }
    case 'REQUEST_FAILURE':
      return { ...state, isFetching: false, error: action.payload as string }
    default:
      return state
  }
}

export interface ICategoryContextType {
  state: ICategoryState
  dispatch: Dispatch<ICategoryAction>
  fetchCategories: (params: Partial<QueryParams<Category>>) => Promise<void>
}

export const CategoryContext = createContext<ICategoryContextType | null>(null)

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState)

  const fetchCategories = useCallback(async (params: Partial<QueryParams<Category>> = {}) => {
    dispatch({ type: 'REQUEST_PENDING' })

    const defaultParams: QueryParams<Partial<Category>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'asc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      ...params
    }

    try {
      const response: PaginationResponse<Category> = await getCategoriesService(defaultParams)
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: response })
    } catch (error) {
      dispatch({ type: 'REQUEST_FAILURE', payload: 'Failed to fetch category' })
    }
  }, [])

  const categoryContextValue: ICategoryContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchCategories
    }),
    [state, fetchCategories]
  )

  return <CategoryContext.Provider value={categoryContextValue}>{children}</CategoryContext.Provider>
}

export default CategoryProvider
