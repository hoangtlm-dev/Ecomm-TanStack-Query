import { persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

// Constants
import { STORAGE_KEYS } from '@app/constants'

// Types
import { ListView } from '@app/types'

interface IListViewState {
  listView: ListView
  setListView: (listView: ListView) => void
}

export const useListViewStore = createWithEqualityFn(
  persist<IListViewState>(
    (set) => ({
      listView: 'grid',
      setListView: (listView: ListView) => set({ listView })
    }),
    {
      name: STORAGE_KEYS.LIST_VIEW
    }
  )
)
