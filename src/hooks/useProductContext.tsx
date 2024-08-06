import { useContext } from 'react'

// Context
import { ProductContext } from '@app/contexts/ProductContext'

export const useProductContext = () => {
  const productContext = useContext(ProductContext)

  if (!productContext) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }

  return productContext
}
