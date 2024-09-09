import { create } from 'zustand'

interface IProductQuantityState {
  currentProductQuantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
  setQuantity: (quantity: number) => void
}

export const useProductQuantityStore = create<IProductQuantityState>((set) => ({
  currentProductQuantity: 1,
  increaseQuantity: () =>
    set((state) => ({
      currentProductQuantity: state.currentProductQuantity + 1
    })),
  decreaseQuantity: () =>
    set((state) => ({
      currentProductQuantity:
        state.currentProductQuantity > 1 ? state.currentProductQuantity - 1 : state.currentProductQuantity
    })),
  setQuantity: (quantity: number) => set({ currentProductQuantity: quantity })
}))
