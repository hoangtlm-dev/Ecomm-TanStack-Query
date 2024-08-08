import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { Cart, PaginationResponse, QueryParams } from '@app/types'

// Services
import { addToCartService, getCartsService } from '@app/services'

export interface ICartState {
  data: PaginationResponse<Cart>
  isFetching: boolean
  error: string | null
}

export interface ICartAction {
  type: 'REQUEST_PENDING' | 'ADD_TO_CART_SUCCESS' | 'FETCH_CARTS_SUCCESS' | 'REQUEST_FAILURE'
  payload?: PaginationResponse<Cart> | Cart | string
}

const initialState: ICartState = {
  data: {
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
    case 'REQUEST_PENDING':
      return { ...state, isFetching: true, error: null }

    case 'ADD_TO_CART_SUCCESS': {
      const newCartItem = action.payload as Cart

      // Check if the product is already in the cart
      const existingCartItemIndex = state.data.data.findIndex((item) => item.productId === newCartItem.productId)

      if (existingCartItemIndex > -1) {
        // Product exists, update the quantity
        const updatedCartData = state.data.data.map((item, index) =>
          index === existingCartItemIndex
            ? { ...item, quantity: item.quantity + newCartItem.quantity } // Update quantity
            : item
        )

        return {
          ...state,
          data: {
            ...state.data,
            data: updatedCartData
          }
        }
      }

      // Product does not exist, add to cart
      return {
        ...state,
        data: {
          ...state.data,
          data: [newCartItem, ...state.data.data]
        }
      }
    }

    case 'FETCH_CARTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        data: action.payload as PaginationResponse<Cart>
      }

    case 'REQUEST_FAILURE':
      return { ...state, isFetching: false, error: action.payload as string }

    default:
      return state
  }
}

export interface ICartContextType {
  state: ICartState
  dispatch: Dispatch<ICartAction>
  addToCart: (cart: Cart) => Promise<void>
  fetchCarts: (params?: Partial<QueryParams<Cart>>) => Promise<void>
}

export const CartContext = createContext<ICartContextType | null>(null)

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const fetchCarts = useCallback(async (params: Partial<QueryParams<Cart>> = {}) => {
    dispatch({ type: 'REQUEST_PENDING' })

    const defaultParams: QueryParams<Partial<Cart>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'asc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      ...params
    }

    try {
      const response: PaginationResponse<Cart> = await getCartsService(defaultParams)
      dispatch({ type: 'FETCH_CARTS_SUCCESS', payload: response })
    } catch (error) {
      dispatch({ type: 'REQUEST_FAILURE', payload: 'Failed to fetch Cart' })
    }
  }, [])

  const addToCart = useCallback(async (cart: Cart) => {
    try {
      const newCart = await addToCartService(cart)

      dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: newCart })

      fetchCarts()
    } catch (error) {
      dispatch({ type: 'REQUEST_FAILURE', payload: 'Failed to add to cart' })
    }
  }, [])

  const cartContextValue: ICartContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchCarts,
      addToCart
    }),
    [state, fetchCarts, addToCart]
  )

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
}

export default CartProvider
