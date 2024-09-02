// Constants
import { ACTION_TYPES } from '@app/constants'

// Types
import { PaginationResponse, Category } from '@app/types'

export interface ICategoryState {
  isCategoryListLoading: boolean
  categoryList: PaginationResponse<Category>
  categoryListError: string | null
}

// Pending actions
export type CategoryRequestPendingAction = {
  type: ACTION_TYPES.FETCH_CATEGORIES_PENDING
}

// Success actions
export type CategoryRequestSuccessAction = {
  type: ACTION_TYPES.FETCH_CATEGORIES_SUCCESS
  payload: PaginationResponse<Category>
}

// Failure actions
export type CategoryRequestFailureAction = {
  type: ACTION_TYPES.FETCH_CATEGORIES_FAILURE
  payload: string
}

export type CategoryAction = CategoryRequestPendingAction | CategoryRequestSuccessAction | CategoryRequestFailureAction
