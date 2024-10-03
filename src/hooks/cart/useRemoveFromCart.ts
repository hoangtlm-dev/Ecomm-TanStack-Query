import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'

// Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

// Types
import { CartItem, ExtendedQueryParams, PaginationResponse } from '@app/types'

// Services
import { removeFromCartService } from '@app/services'

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const defaultParams: Partial<ExtendedQueryParams<CartItem>> = {
    page: 1,
    _sort: 'id',
    _order: 'desc',
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (cartItemId: number) => removeFromCartService(cartItemId),
    onMutate: (cartItemId: number) => {
      return { cartItemId }
    },
    onSuccess: (_data, _variables, context) => {
      const removeCartItemId = context?.cartItemId

      queryClient.setQueryData(
        [QUERY_KEYS.CART, { ...defaultParams }],
        (oldData: InfiniteData<PaginationResponse<CartItem>>) => {
          const cartInCache = oldData?.pages.flatMap((page) => page.data)
          const updatedCart = cartInCache.filter((cartItem) => cartItem.id !== removeCartItemId)

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: updatedCart,
              totalItems: updatedCart.length
            }))
          }
        }
      )
    }
  })

  return {
    isRemoveFromCartLoading: isPending,
    removeFromCart: mutateAsync
  }
}
