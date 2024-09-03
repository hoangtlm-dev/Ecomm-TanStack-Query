import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'

// Constants
import { MESSAGES, QUERY_KEYS } from '@app/constants'

// Services
import { removeFromCartServices } from '@app/services'

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const toast = useToast()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (cartId: number) => removeFromCartServices(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART]
      })
      toast({
        title: 'Success',
        description: MESSAGES.REMOVE_PRODUCT_SUCCESS,
        status: 'success'
      })
    },
    onError: () => {
      toast({
        title: 'Failed',
        description: MESSAGES.REMOVE_FROM_CART_FAILED,
        status: 'error'
      })
    }
  })

  return {
    isRemoveFromCartPending: isPending,
    removeFromCart: mutateAsync
  }
}
