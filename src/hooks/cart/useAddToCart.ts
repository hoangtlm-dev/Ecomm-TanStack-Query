import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//Constants
import { MESSAGES, QUERY_KEYS } from '@app/constants'

// Types
import { CartItem } from '@app/types'

// Services
import { addToCartService } from '@app/services'

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  const toast = useToast()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (cartItem: CartItem) => addToCartService(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART]
      })
      toast({
        title: 'Success',
        description: MESSAGES.ADD_PRODUCT_SUCCESS,
        status: 'success'
      })
    },
    onError: () => {
      toast({
        title: 'Failed',
        description: MESSAGES.ADD_TO_CART_FAILED,
        status: 'error'
      })
    }
  })

  return {
    isAddToCartPending: isPending,
    addToCart: mutateAsync
  }
}
