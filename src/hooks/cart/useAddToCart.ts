import { useMutation, useQueryClient } from '@tanstack/react-query'

//Constants
import { QUERY_KEYS } from '@app/constants'

// Types
import { CartItem } from '@app/types'

// Services
import { addToCartService } from '@app/services'

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (cartItem: CartItem) => addToCartService(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART]
      })
    }
  })

  return {
    isAddToCartLoading: isPending,
    addToCart: mutateAsync
  }
}
