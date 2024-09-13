import { useMutation, useQueryClient } from '@tanstack/react-query'

// Constants
import { QUERY_KEYS } from '@app/constants'

// Types
import { CartItem } from '@app/types'

// Services
import { updateItemInCartService } from '@app/services'

export const useUpdateItemInCart = () => {
  const queryClient = useQueryClient()

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ cartItemId, cartItemData }: { cartItemId: number; cartItemData: CartItem }) =>
      updateItemInCartService(cartItemId, cartItemData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART]
      })
    }
  })

  return {
    isUpdateItemInCartPending: isPending,
    updateItemInCart: mutateAsync
  }
}
