// Constants
import { mockProductImage, PAGINATION } from '@app/constants'

// Types
import { CartItem } from '@app/types'

export const MOCK_CART: CartItem = {
  id: 0,
  productId: 1,
  productName: 'Nike Airmax 270 React',
  productPrice: 539.99,
  productUnitPrice: '$',
  productQuantity: 100,
  productDiscount: 20,
  productImage: mockProductImage,
  quantity: 2
}

export const MOCK_CARTS = (length?: number): CartItem[] =>
  Array.from({ length: length ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE }, (_, index) => ({
    ...MOCK_CART,
    id: index + 1
  }))
