// Types
import { EnvKey } from '@app/types'

export const MESSAGES = {
  // Http request
  ERROR_SENDING_REQUEST: 'Error while sending request',
  MISSING_ENV: (key: EnvKey) => `The required env ${key} is missing`,

  // Context
  CONTEXT_ERROR: (contextName: string) => `use${contextName}Context must be used within a ${contextName}Provider`,
  FETCH_PRODUCTS_FAILED: 'Failed to fetch product',
  FETCH_PRODUCT_DETAILS_FAILED: 'Failed to fetch product details',
  FETCH_CATEGORIES_FAILED: 'Failed to fetch categories',
  FETCH_CARTS_FAILED: 'Failed to fetch items in cart',
  ADD_TO_CART_FAILED: 'Failed to add product to cart',

  // Toast
  ADD_PRODUCT_SUCCESS: 'A product was added to your cart'
}
