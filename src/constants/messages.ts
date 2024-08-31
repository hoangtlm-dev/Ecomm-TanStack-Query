// Types
import { EnvKey } from '@app/types'

export const MESSAGES = {
  // Check root element
  DOM_NOT_FOUND: 'Unable to find root element',

  // Http request
  ERROR_SENDING_REQUEST: 'Error while sending request',
  MISSING_ENV: (key: EnvKey) => `The required env ${key} is missing`,

  // Color not found
  COLOR_NOT_INCLUDE_FILTER: (colorName: string) => `The color with name ${colorName} is not started with 'filter'`,

  // Context
  CONTEXT_ERROR: (contextName: string) => `use${contextName}Context must be used within a ${contextName}Provider`,
  FETCH_PRODUCTS_FAILED: 'Failed to fetch product',
  FETCH_PRODUCT_DETAILS_FAILED: 'Failed to fetch product details',
  FETCH_CATEGORIES_FAILED: 'Failed to fetch categories',
  FETCH_CART_FAILED: 'Failed to fetch items in cart',
  ADD_TO_CART_FAILED: 'Failed to add product to cart',
  REMOVE_FROM_CART_FAILED: 'Failed to remove product from cart',

  // Toast
  ADD_PRODUCT_SUCCESS: 'A product was added to your cart',
  REMOVE_PRODUCT_SUCCESS: 'A product was removed from your cart',
  CHECKOUT_SUCCESS: 'Checkout successfully'
}
