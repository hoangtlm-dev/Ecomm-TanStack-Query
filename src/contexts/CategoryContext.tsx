import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { MESSAGES, PAGINATION } from '@app/constants'

// Types
import { Category, PaginationResponse, QueryParams } from '@app/types'

// Services
import { getCategoriesService } from '@app/services'

export interface ICategoryState {
  categoryList: PaginationResponse<Category>
  isCategoryListFetching: boolean
  error: string | null
}

enum ActionTypes {
  FETCH_CATEGORIES_PENDING,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
}

// Pending actions
export interface IRequestPendingAction {
  type: ActionTypes.FETCH_CATEGORIES_PENDING
}

// Success actions
export interface IFetchCategoriesSuccessAction {
  type: ActionTypes.FETCH_CATEGORIES_SUCCESS
  payload: PaginationResponse<Category>
}

// Failure actions
export interface IRequestFailureAction {
  type: ActionTypes.FETCH_CATEGORIES_FAILURE
  payload: string
}

export type ICategoryAction = IRequestPendingAction | IFetchCategoriesSuccessAction | IRequestFailureAction

const initialState: ICategoryState = {
  categoryList: {
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
  isCategoryListFetching: false,
  error: null
}

const categoryReducer = (state: ICategoryState, action: ICategoryAction): ICategoryState => {
  switch (action.type) {
    case ActionTypes.FETCH_CATEGORIES_PENDING:
      return { ...state, isCategoryListFetching: true, error: null }
    case ActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isCategoryListFetching: false, categoryList: action.payload }
    case ActionTypes.FETCH_CATEGORIES_FAILURE:
      return { ...state, isCategoryListFetching: false, error: action.payload }
    default:
      return state
  }
}

export interface ICategoryContextType {
  state: ICategoryState
  dispatch: Dispatch<ICategoryAction>
  fetchCategories: (params?: Partial<QueryParams<Category>>) => Promise<void>
}

export const CategoryContext = createContext<ICategoryContextType | null>(null)

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState)

  const fetchCategories = useCallback(async (params: Partial<QueryParams<Category>> = {}) => {
    dispatch({ type: ActionTypes.FETCH_CATEGORIES_PENDING })

    const defaultParams: QueryParams<Partial<Category>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'asc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      ...params
    }

    try {
      const response: PaginationResponse<Category> = await getCategoriesService(defaultParams)
      dispatch({ type: ActionTypes.FETCH_CATEGORIES_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_CATEGORIES_FAILURE, payload: MESSAGES.FETCH_CATEGORIES_FAILED })
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
