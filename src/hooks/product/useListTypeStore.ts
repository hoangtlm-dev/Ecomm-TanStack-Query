import { persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

interface IListTypeState {
  listType: 'grid' | 'list'
  setListType: (listType: 'grid' | 'list') => void
}

export const useListTypeStore = createWithEqualityFn(
  persist<IListTypeState>(
    (set) => ({
      listType: 'grid',
      setListType: (listType: 'grid' | 'list') => set({ listType })
    }),
    {
      name: 'listType'
    }
  )
)
