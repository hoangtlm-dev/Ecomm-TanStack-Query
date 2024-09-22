import { create } from 'zustand'

// Types
import { CartItem } from '@app/types'

interface ICartQuantityState {
  cartInStore: CartItem[]
  setCartInStore: (cart: CartItem[]) => void
  updateCartInStore: (cartItemId: number, action: 'increase' | 'decrease' | 'change', newQuantity?: number) => void
}

export const useCartQuantityStore = create<ICartQuantityState>((set) => ({
  cartInStore: [],
  setCartInStore: (cartInStore) => set({ cartInStore }),
  updateCartInStore: (cartItemId, action, newQuantity) =>
    set((state) => {
      const updatedCart = state.cartInStore.map((item) => {
        if (item.id === cartItemId) {
          switch (action) {
            case 'decrease':
              return { ...item, quantity: item.quantity - 1 }
            case 'increase':
              return { ...item, quantity: item.quantity + 1 }
            case 'change':
              return { ...item, quantity: newQuantity ?? item.quantity }
            default:
              return item
          }
        }
        return item
      })
      return { cartInStore: updatedCart }
    })
}))
