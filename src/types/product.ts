export type Product = {
  id: number
  name: string
  description: string
  colors: string[]
  price: number
  currencyUnit: string
  quantity: number
  discount: number
  image: string
  ratingStar: number
  reviewNumber: number
  isHotDeal: boolean
  categoryId: number
  categoryName: string
}

export type ProductParams = {
  [K in keyof Product]: Product[K] extends string[] ? string : Product[K]
}
