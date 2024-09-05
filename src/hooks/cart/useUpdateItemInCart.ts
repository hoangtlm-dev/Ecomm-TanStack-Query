import { useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

//Constants
import { MESSAGES, QUERY_KEYS } from '@app/constants'

// Types
import { CartItem } from '@app/types'

// Services
import { updateItemInCartService } from '@app/services'

export const useUpdateItemInCart = () => {
  const queryClient = useQueryClient()

  const toast = useToast()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ cartId, cartData }: { cartId: number; cartData: CartItem }) =>
      updateItemInCartService(cartId, cartData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART]
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
    isUpdateItemInCartPending: isPending,
    updateItemInCart: mutateAsync
  }
}
