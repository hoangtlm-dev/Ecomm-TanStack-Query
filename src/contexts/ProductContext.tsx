import { createContext, Dispatch, ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { PaginationResponse, Product, QueryParams } from '@app/types'

// Services
import { getProductsService } from '@app/services'

export interface IProductState {
  data: PaginationResponse<Product>
  isFetching: boolean
  error: string | null
}

export interface IProductAction {
  type: 'REQUEST_PENDING' | 'FETCH_PRODUCTS_SUCCESS' | 'REQUEST_FAILURE'
  payload?: PaginationResponse<Product> | string
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
  isFetching: false,
  error: null
}

const productReducer = (state: IProductState, action: IProductAction): IProductState => {
  switch (action.type) {
    case 'REQUEST_PENDING':
      return { ...state, isFetching: true, error: null }
    case 'FETCH_PRODUCTS_SUCCESS':
      return { ...state, isFetching: false, data: action.payload as PaginationResponse<Product> }
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
}

export const ProductContext = createContext<IProductContextType | null>(null)

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const fetchProducts = useCallback(async (params: Partial<QueryParams<Product>> = {}) => {
    dispatch({ type: 'REQUEST_PENDING' })

    const defaultParams: QueryParams<Product> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'desc',
      id: params.id ?? 0,
      name: params.name ?? '',
      description: params.description ?? '',
      price: params.price ?? 0,
      unitPrice: params.unitPrice ?? '',
      quantity: params.quantity ?? 0,
      discount: params.discount ?? 0,
      image: params.image ?? '',
      ratingStar: params.ratingStar ?? 0,
      reviewNumber: params.reviewNumber ?? 0,
      isHotDeal: params.isHotDeal ?? false,
      categoryId: params.categoryId ?? 1,
      categoryName: params.categoryName ?? '',
      ...params
    }

    try {
      const response: PaginationResponse<Product> = await getProductsService(defaultParams)
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response })
    } catch (error) {
      dispatch({ type: 'REQUEST_FAILURE', payload: 'Failed to fetch todos' })
    }
  }, [])

  useEffect(() => {
    fetchProducts({})
  }, [fetchProducts])

  const productContextValue: IProductContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchProducts
    }),
    [state, fetchProducts]
  )

  return <ProductContext.Provider value={productContextValue}>{children}</ProductContext.Provider>
}

export default ProductProvider
