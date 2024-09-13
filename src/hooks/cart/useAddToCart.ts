import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'

//Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

// Types
import { CartItem, ExtendedQueryParams, PaginationResponse } from '@app/types'

// Services
import { addToCartService } from '@app/services'

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  const defaultParams: ExtendedQueryParams<Partial<CartItem>> = {
    page: 1,
    _sort: 'id',
    _order: 'desc',
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (cartItem: CartItem) => addToCartService(cartItem),
    onSuccess: (newCartItem: CartItem) => {
      queryClient.setQueryData(
        [QUERY_KEYS.CART, { ...defaultParams }],
        (oldData: InfiniteData<PaginationResponse<CartItem>>) => {
          const cartInCache = oldData?.pages.flatMap((page) => page.data)
          const isProductExisted = cartInCache.find((cartItem) => cartItem.productId === newCartItem.productId)

          const updatedCart = isProductExisted
            ? cartInCache.map((cartItem) =>
                cartItem.productId === newCartItem.productId
                  ? { ...cartItem, quantity: cartItem.quantity + newCartItem.quantity }
                  : cartItem
              )
            : [newCartItem, ...cartInCache]

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  data: updatedCart,
                  totalItems: updatedCart.length
                }
              }
              return page
            })
          }
        }
      )
    }
  })

  return {
    isAddToCartLoading: isPending,
    addToCart: mutateAsync
  }
}
