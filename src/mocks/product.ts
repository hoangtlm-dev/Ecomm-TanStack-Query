// Constants
import { mockProductImage, PAGINATION } from '@app/constants'

// Types
import { Product } from '@app/types'

export const MOCK_PRODUCT = {
  id: 0,
  name: 'Nike Airmax 270 React',
  description:
    'Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lectus lorem nunc leifend laorevtr istique et congue. Vivamus adipiscin vulputate g nisl ut dolor. Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lectus lorem nunc leifend laorevtr istique et congue. Vivamus adipiscin vulputate g nisl ut dolor. Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lectus lorem nunc leifend laorevtr istique et congue. Vivamus adipiscin vulputate g nisl ut dolor. Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis vulputate, tristique ut lectus. Sed et lectus lorem nunc leifend laorevtr istique et congue. Vivamus adipiscin vulputate g nisl ut dolor .',
  price: 539.99,
  currencyUnit: '$',
  quantity: 100,
  discount: 20,
  image: mockProductImage,
  ratingStar: 3.7,
  reviewNumber: 2,
  isHotDeal: true,
  categoryId: 1,
  categoryName: 'Nike'
}

export const MOCK_PRODUCTS = (length?: number): Product[] =>
  Array.from({ length: length ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE }, (_, index) => ({
    ...MOCK_PRODUCT,
    id: index + 1
  }))
