// Constants
import { ACTION_TYPES } from '@app/constants'

// Types
import { CategoryAction, ICategoryState } from '@app/types'

export const categoryReducer = (state: ICategoryState, action: CategoryAction): ICategoryState => {
  switch (action.type) {
    // Category list
    case ACTION_TYPES.FETCH_CATEGORIES_PENDING:
      return { ...state, isCategoryListLoading: true, categoryListError: null }
    case ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isCategoryListLoading: false, categoryList: action.payload }
    case ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return { ...state, isCategoryListLoading: false, categoryListError: action.payload }
    default:
      return state
  }
}
