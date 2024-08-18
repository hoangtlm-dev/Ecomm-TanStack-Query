// Constants
import { ACTION_TYPES } from '@app/constants'

// Types
import { IProductState, ProductAction } from '@app/types'

export const productReducer = (state: IProductState, action: ProductAction): IProductState => {
  switch (action.type) {
    // Product list
    case ACTION_TYPES.FETCH_PRODUCTS_PENDING:
      return { ...state, isProductListLoading: true, productListError: null }
    case ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return { ...state, isProductListLoading: false, productList: action.payload }
    case ACTION_TYPES.FETCH_PRODUCTS_ERROR:
      return { ...state, isProductListLoading: false, productListError: action.payload }

    // Product details
    case ACTION_TYPES.FETCH_PRODUCT_DETAILS_PENDING:
      return { ...state, isCurrentProductLoading: true, currentProductError: null }
    case ACTION_TYPES.FETCH_PRODUCT_DETAILS_SUCCESS:
      return { ...state, isCurrentProductLoading: false, currentProduct: action.payload }
    case ACTION_TYPES.FETCH_PRODUCT_DETAILS_ERROR:
      return { ...state, isCurrentProductLoading: false, currentProductError: action.payload }
    default:
      return state
  }
}
