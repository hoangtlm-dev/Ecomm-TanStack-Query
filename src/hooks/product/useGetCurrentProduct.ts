import { useQuery } from '@tanstack/react-query'

// Constants
import { QUERY_KEYS } from '@app/constants'

// Services
import { getCurrentProductService } from '@app/services'

export const useGetCurrentProduct = (productId: number) => {
  const { isPending, data, error } = useQuery({
    queryKey: [QUERY_KEYS.CURRENT_PRODUCT, productId],
    queryFn: () => getCurrentProductService(productId)
  })

  return {
    isCurrentProductPending: isPending,
    currentProduct: data || {
      id: 0,
      name: '',
      description: '',
      colors: [''],
      price: 0,
      currencyUnit: '',
      quantity: 0,
      discount: 0,
      image: '',
      ratingStar: 0,
      reviewNumber: 0,
      isHotDeal: false,
      categoryId: 0,
      categoryName: ''
    },
    currentProductError: error
  }
}
