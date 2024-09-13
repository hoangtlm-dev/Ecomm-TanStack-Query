import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'

// Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

// Types
import { CartItem, ExtendedQueryParams, PaginationResponse } from '@app/types'

// Services
import { removeFromCartService } from '@app/services'

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const defaultParams: ExtendedQueryParams<Partial<CartItem>> = {
    page: 1,
    _sort: 'id',
    _order: 'desc',
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (cartId: number) => removeFromCartService(cartId),

    onMutate: (cartItemId: number) => {
      return { cartItemId }
    },
    onSuccess: (_data, _variables, context) => {
      const removeCartItemId = context?.cartItemId

      queryClient.setQueryData(
        [QUERY_KEYS.CART, { ...defaultParams }],
        (oldData: InfiniteData<PaginationResponse<CartItem>>) => {
          const cartListInCache = oldData?.pages.flatMap((page) => page.data)
          const updatedCartList = cartListInCache.filter((cartItem) => cartItem.id !== removeCartItemId)

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: updatedCartList,
              totalItems: updatedCartList.length
            }))
          }
        }
      )
    }
  })

  return {
    isRemoveFromCartPending: isPending,
    removeFromCart: mutateAsync
  }
}
