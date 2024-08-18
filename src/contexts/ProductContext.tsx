import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { ACTION_TYPES, MESSAGES, PAGINATION } from '@app/constants'

// Types
import { IProductState, PaginationResponse, Product, ProductAction, QueryParams } from '@app/types'

// Services
import { getCurrentProductServices, getProductsService } from '@app/services'

// Reducers
import { productReducer } from '@app/reducers'

const initialState: IProductState = {
  // Product list
  isProductListLoading: true,
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
  productListError: null,

  // Product details
  isCurrentProductLoading: true,
  currentProduct: null,
  currentProductError: null
}

export interface IProductContextType {
  state: IProductState
  dispatch: Dispatch<ProductAction>
  fetchProducts: (params?: Partial<QueryParams<Product>>) => Promise<void>
  fetchCurrentProduct: (productId: number) => Promise<void>
}

export const ProductContext = createContext<IProductContextType | null>(null)

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const fetchProducts = useCallback(async (params: Partial<QueryParams<Product>> = {}) => {
    dispatch({ type: ACTION_TYPES.FETCH_PRODUCTS_PENDING })

    const defaultParams: QueryParams<Partial<Product>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'desc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      price_gte: params.price_gte ?? 0,
      price_lte: params.price_gte ?? 1000,
      ...params
    }

    try {
      const response: PaginationResponse<Product> = await getProductsService(defaultParams)
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCTS_ERROR, payload: MESSAGES.FETCH_PRODUCTS_FAILED })
    }
  }, [])

  const fetchCurrentProduct = useCallback(async (productId: number) => {
    dispatch({ type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_PENDING })
    try {
      const response = await getCurrentProductServices(productId)
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_ERROR, payload: MESSAGES.FETCH_PRODUCT_DETAILS_FAILED })
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
