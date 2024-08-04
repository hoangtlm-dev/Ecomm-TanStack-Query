import { Category } from './category'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  unitPrice: string
  quantity: number
  discount: number
  image: string
  ratingStar: number
  reviewNumber: number
  isHotDeal: boolean
  category: Category
}
