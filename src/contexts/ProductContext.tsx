import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { MESSAGES, PAGINATION } from '@app/constants'

// Types
import { PaginationResponse, Product, QueryParams } from '@app/types'

// Services
import { getCurrentProductServices, getProductsService } from '@app/services'

export interface IProductState {
  productList: PaginationResponse<Product>
  currentProduct: Product | null
  isProductListFetching: boolean
  isCurrentProductFetching: boolean
  error: string | null
}

// Pending actions
export interface IRequestPendingAction {
  type: 'FETCH_PRODUCTS_PENDING' | 'FETCH_PRODUCT_DETAILS_PENDING'
}

// Success actions
export interface IFetchProductsSuccessAction {
  type: 'FETCH_PRODUCTS_SUCCESS'
  payload: PaginationResponse<Product>
}

export interface IFetchCurrentProductSuccessAction {
  type: 'FETCH_PRODUCT_DETAILS_SUCCESS'
  payload: Product
}

// Failure actions
export interface IRequestFailureAction {
  type: 'FETCH_PRODUCTS_FAILURE' | 'FETCH_PRODUCT_DETAILS_FAILURE'
  payload: string
}

export type IProductAction =
  | IRequestPendingAction
  | IFetchProductsSuccessAction
  | IFetchCurrentProductSuccessAction
  | IRequestFailureAction

const initialState: IProductState = {
  productList: {
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
  currentProduct: null,
  isProductListFetching: false,
  isCurrentProductFetching: false,
  error: null
}

const productReducer = (state: IProductState, action: IProductAction): IProductState => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_PENDING':
      return { ...state, isProductListFetching: true, error: null }
    case 'FETCH_PRODUCT_DETAILS_PENDING':
      return { ...state, isCurrentProductFetching: true, error: null }
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, isProductListFetching: false, productList: action.payload }
    case 'FETCH_PRODUCT_DETAILS_SUCCESS':
      return { ...state, isCurrentProductFetching: false, currentProduct: action.payload }
    case 'FETCH_PRODUCTS_FAILURE':
      return { ...state, isProductListFetching: false, error: action.payload }
    case 'FETCH_PRODUCT_DETAILS_FAILURE':
      return { ...state, isCurrentProductFetching: false, error: action.payload }
    default:
      return state
  }
}

export interface IProductContextType {
  state: IProductState
  dispatch: Dispatch<IProductAction>
  fetchProducts: (params?: Partial<QueryParams<Product>>) => Promise<void>
  fetchCurrentProduct: (productId: number) => Promise<void>
}

export const ProductContext = createContext<IProductContextType | null>(null)

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const fetchProducts = useCallback(async (params: Partial<QueryParams<Product>> = {}) => {
    dispatch({ type: 'FETCH_PRODUCTS_PENDING' })

    const defaultParams: QueryParams<Partial<Product>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'desc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      categoryId: params.categoryId ?? 1,
      ...params
    }

    try {
      const response: PaginationResponse<Product> = await getProductsService(defaultParams)
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response })
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: MESSAGES.FETCH_PRODUCTS_FAILED })
    }
  }, [])

  const fetchCurrentProduct = useCallback(async (productId: number) => {
    dispatch({ type: 'FETCH_PRODUCT_DETAILS_PENDING' })
    try {
      const response = await getCurrentProductServices(productId)
      dispatch({ type: 'FETCH_PRODUCT_DETAILS_SUCCESS', payload: response })
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCT_DETAILS_FAILURE', payload: MESSAGES.FETCH_PRODUCT_DETAILS_FAILED })
    }
  }, [])

  const productContextValue: IProductContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchProducts,
      fetchCurrentProduct
    }),
    [state, fetchProducts, fetchCurrentProduct]
  )

  return <ProductContext.Provider value={productContextValue}>{children}</ProductContext.Provider>
}

export default ProductProvider
