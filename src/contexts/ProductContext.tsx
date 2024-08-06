import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { PaginationResponse, Product, QueryParams } from '@app/types'

// Services
import { getCurrentProductServices, getProductsService } from '@app/services'

export interface IProductState {
  data: PaginationResponse<Product>
  currentProduct: Product | null
  isFetching: boolean
  error: string | null
}

export interface IProductAction {
  type: 'REQUEST_PENDING' | 'FETCH_PRODUCTS_SUCCESS' | 'FETCH_CURRENT_PRODUCT_SUCCESS' | 'REQUEST_FAILURE'
  payload?: PaginationResponse<Product> | Product | string
}

const initialState: IProductState = {
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
  currentProduct: null,
  isFetching: false,
  error: null
}

const productReducer = (state: IProductState, action: IProductAction): IProductState => {
  switch (action.type) {
    case 'REQUEST_PENDING':
      return { ...state, isFetching: true, error: null }
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, isFetching: false, data: action.payload as PaginationResponse<Product> }
    case 'FETCH_CURRENT_PRODUCT_SUCCESS':
      return { ...state, isFetching: false, currentProduct: action.payload as Product }
    case 'REQUEST_FAILURE':
      return { ...state, isFetching: false, error: action.payload as string }
    default:
      return state
  }
}

export interface IProductContextType {
  state: IProductState
  dispatch: Dispatch<IProductAction>
  fetchProducts: (params: Partial<QueryParams<Product>>) => Promise<void>
  fetchCurrentProduct: (productId: number) => Promise<void>
}

export const ProductContext = createContext<IProductContextType | null>(null)

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const fetchProducts = useCallback(async (params: Partial<QueryParams<Product>> = {}) => {
    dispatch({ type: 'REQUEST_PENDING' })

    const defaultParams: QueryParams<Partial<Product>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'desc',
      _limit: params._limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      categoryId: params.categoryId ?? 1,
      ...params
    }

    try {
      const response: PaginationResponse<Product> = await getProductsService(defaultParams)
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response })
    } catch (error) {
      dispatch({ type: 'REQUEST_FAILURE', payload: 'Failed to fetch product' })
    }
  }, [])

  const fetchCurrentProduct = useCallback(async (productId: number) => {
    dispatch({ type: 'REQUEST_PENDING' })
    try {
      const response = await getCurrentProductServices(productId)
      dispatch({ type: 'FETCH_CURRENT_PRODUCT_SUCCESS', payload: response })
    } catch (error) {
      dispatch({ type: 'REQUEST_FAILURE', payload: 'Failed to fetch product details' })
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
