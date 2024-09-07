import { useMutation, useQueryClient } from '@tanstack/react-query'

// Constants
import { QUERY_KEYS } from '@app/constants'

// Services
import { removeFromCartService } from '@app/services'

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (cartId: number) => removeFromCartService(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART]
      })
    }
  })

  return {
    isRemoveFromCartPending: isPending,
    removeFromCart: mutateAsync
  }
}
