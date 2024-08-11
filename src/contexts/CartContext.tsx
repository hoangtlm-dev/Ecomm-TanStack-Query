import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { MESSAGES, PAGINATION } from '@app/constants'

// Types
import { Cart, PaginationResponse, QueryParams } from '@app/types'

// Services
import { addToCartService, getCartsService, removeFromCartServices } from '@app/services'

export interface ICartState {
  cartList: PaginationResponse<Cart>
  isFetching: boolean
  error: string | null
}

enum ActionTypes {
  // Add to cart
  ADD_TO_CART_PENDING,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAILED,

  // Fetch carts
  FETCH_CARTS_PENDING,
  FETCH_CARTS_SUCCESS,
  FETCH_CARTS_FAILED,

  // Delete from cart
  REMOVE_FROM_CART_PENDING,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAILED,

  INCREASE_QUANTITY,
  DECREASE_QUANTITY
}

// Pending actions
export interface IRequestPendingAction {
  type: ActionTypes.ADD_TO_CART_PENDING | ActionTypes.FETCH_CARTS_PENDING | ActionTypes.REMOVE_FROM_CART_PENDING
}

// Success actions
export interface IAddToCartsSuccessAction {
  type: ActionTypes.ADD_TO_CART_SUCCESS
  payload: Cart
}

export interface IFetchCartsSuccessAction {
  type: ActionTypes.FETCH_CARTS_SUCCESS
  payload: PaginationResponse<Cart>
}

export interface IDeleteFromCartSuccessAction {
  type: ActionTypes.REMOVE_FROM_CART_SUCCESS
  payload: number
}

export interface IIncreaseQuantityAction {
  type: ActionTypes.INCREASE_QUANTITY
  payload: number
}

export interface IDecreaseQuantityAction {
  type: ActionTypes.DECREASE_QUANTITY
  payload: number
}

// Failure actions
export interface IRequestFailureAction {
  type: ActionTypes.ADD_TO_CART_FAILED | ActionTypes.FETCH_CARTS_FAILED | ActionTypes.REMOVE_FROM_CART_FAILED
  payload: string
}

export type ICartAction =
  | IRequestPendingAction
  | IAddToCartsSuccessAction
  | IFetchCartsSuccessAction
  | IDeleteFromCartSuccessAction
  | IIncreaseQuantityAction
  | IDecreaseQuantityAction
  | IRequestFailureAction

const initialState: ICartState = {
  cartList: {
    data: [],
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE,
    page: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: null,
    totalItems: 0,
    totalPages: 0
  },
  isFetching: false,
  error: null
}

const cartReducer = (state: ICartState, action: ICartAction): ICartState => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART_PENDING:
    case ActionTypes.FETCH_CARTS_PENDING:
    case ActionTypes.REMOVE_FROM_CART_PENDING:
      return { ...state, isFetching: true, error: null }

    case ActionTypes.ADD_TO_CART_SUCCESS: {
      const newCartItem = action.payload

      const existingCartItemIndex = state.cartList.data.findIndex((item) => item.productId === newCartItem.productId)

      if (existingCartItemIndex > -1) {
        const updatedCartData = state.cartList.data.map((item, index) =>
          index === existingCartItemIndex ? { ...item, quantity: item.quantity + newCartItem.quantity } : item
        )

        return {
          ...state,
          cartList: {
            ...state.cartList,
            data: updatedCartData
          }
        }
      }

      return {
        ...state,
        cartList: {
          ...state.cartList,
          data: [newCartItem, ...state.cartList.data]
        }
      }
    }

    case ActionTypes.FETCH_CARTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cartList: action.payload
      }

    case ActionTypes.REMOVE_FROM_CART_SUCCESS: {
      const updatedCartData = state.cartList.data.filter((item) => item.id !== action.payload)

      return {
        ...state,
        isFetching: false,
        cartList: {
          ...state.cartList,
          data: updatedCartData
        }
      }
    }

    case ActionTypes.INCREASE_QUANTITY: {
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
    case ActionTypes.DECREASE_QUANTITY: {
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

    case ActionTypes.ADD_TO_CART_FAILED:
    case ActionTypes.FETCH_CARTS_FAILED:
    case ActionTypes.REMOVE_FROM_CART_FAILED:
      return { ...state, isFetching: false, error: action.payload }

    default:
      return state
  }
}

export interface ICartContextType {
  state: ICartState
  dispatch: Dispatch<ICartAction>
  addToCart: (cart: Cart) => Promise<void>
  fetchCarts: (params?: Partial<QueryParams<Cart>>) => Promise<void>
  removeFromCart: (cartId: number) => Promise<void>
  increaseQuantity: (cartId: number) => void
  decreaseQuantity: (cartId: number) => void
}

export const CartContext = createContext<ICartContextType | null>(null)

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const fetchCarts = useCallback(async (params: Partial<QueryParams<Cart>> = {}) => {
    dispatch({ type: ActionTypes.FETCH_CARTS_PENDING })

    const defaultParams: QueryParams<Partial<Cart>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'asc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      ...params
    }

    try {
      const response: PaginationResponse<Cart> = await getCartsService(defaultParams)
      dispatch({ type: ActionTypes.FETCH_CARTS_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_CARTS_FAILED, payload: MESSAGES.FETCH_CARTS_FAILED })
    }
  }, [])

  const addToCart = useCallback(
    async (cart: Cart) => {
      try {
        const newCart = await addToCartService(cart)

        dispatch({ type: ActionTypes.ADD_TO_CART_SUCCESS, payload: newCart })

        fetchCarts()
      } catch (error) {
        dispatch({ type: ActionTypes.FETCH_CARTS_FAILED, payload: MESSAGES.ADD_TO_CART_FAILED })
      }
    },
    [fetchCarts]
  )

  const removeFromCart = useCallback(
    async (cartId: number) => {
      dispatch({ type: ActionTypes.REMOVE_FROM_CART_PENDING })

      try {
        await removeFromCartServices(cartId)
        dispatch({ type: ActionTypes.REMOVE_FROM_CART_SUCCESS, payload: cartId })

        fetchCarts() // Optionally refetch the cart list after deletion
      } catch (error) {
        dispatch({ type: ActionTypes.REMOVE_FROM_CART_FAILED, payload: MESSAGES.REMOVE_FROM_CART_FAILED })
      }
    },
    [fetchCarts]
  )

  const increaseQuantity = useCallback((cartId: number) => {
    dispatch({ type: ActionTypes.INCREASE_QUANTITY, payload: cartId })
  }, [])

  const decreaseQuantity = useCallback((cartId: number) => {
    dispatch({ type: ActionTypes.DECREASE_QUANTITY, payload: cartId })
  }, [])

  const cartContextValue: ICartContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchCarts,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity
    }),
    [state, fetchCarts, addToCart, removeFromCart]
  )

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
}

export default CartProvider
