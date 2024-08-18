// Constants
import { ACTION_TYPES } from '@app/constants'

// Types
import { CartAction, ICartState } from '@app/types'

export const cartReducer = (state: ICartState, action: CartAction): ICartState => {
  switch (action.type) {
    // Add to cart
    case ACTION_TYPES.ADD_TO_CART_PENDING:
      return { ...state, isAddToCartLoading: true, addToCartError: null }
    case ACTION_TYPES.ADD_TO_CART_SUCCESS: {
      const newCart = action.payload
      const existedProductFound = state.cartList.data.find((cartItem) => cartItem.productId === newCart.productId)

      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: existedProductFound
            ? state.cartList.data.map((cartItem) =>
                cartItem.productId === newCart.productId
                  ? { ...cartItem, quantity: cartItem.quantity + newCart.quantity }
                  : cartItem
              )
            : [newCart, ...state.cartList.data],
          totalItems: existedProductFound ? state.cartList.totalItems : state.cartList.totalItems + 1
        },
        isAddToCartLoading: false,
        addToCartError: null
      }
    }
    case ACTION_TYPES.ADD_TO_CART_FAILED:
      return { ...state, isAddToCartLoading: false, addToCartError: action.payload }

    // Fetch cart
    case ACTION_TYPES.FETCH_CART_PENDING:
      return { ...state, isCartListLoading: true, cartListError: null }

    case ACTION_TYPES.FETCH_CART_SUCCESS:
      return {
        ...state,
        isCartListLoading: false,
        cartList: action.payload
      }

    case ACTION_TYPES.FETCH_CART_FAILED:
      return { ...state, isCartListLoading: false, cartListError: action.payload }

    // Quantity control
    case ACTION_TYPES.INCREASE_QUANTITY_IN_CART: {
      const updatedCartData = state.cartList.data.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      )
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: updatedCartData
        }
      }
    }

    case ACTION_TYPES.DECREASE_QUANTITY_IN_CART: {
      const updatedCartData = state.cartList.data.map((item) =>
        item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: updatedCartData
        }
      }
    }

    case ACTION_TYPES.CHANGE_QUANTITY_IN_CART: {
      const { cartId, quantity } = action.payload
      const updatedCartData = state.cartList.data.map((item) => (item.id === cartId ? { ...item, quantity } : item))
      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: updatedCartData
        }
      }
    }

    // Remove from cart
    case ACTION_TYPES.REMOVE_FROM_CART_PENDING:
      return { ...state, isRemoveFromCartLoading: true, removeFromCartError: null }

    case ACTION_TYPES.REMOVE_FROM_CART_SUCCESS: {
      const cartId = action.payload

      const updatedCartList = state.cartList.data.filter((cartItem) => cartItem.id !== cartId)

      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: updatedCartList,
          totalItems: state.cartList.totalItems - 1
        },
        isRemoveFromCartLoading: false,
        removeFromCartError: null
      }
    }

    case ACTION_TYPES.REMOVE_FROM_CART_FAILED:
      return {
        ...state,
        isRemoveFromCartLoading: false,
        removeFromCartError: action.payload
      }

    default:
      return state
  }
}
