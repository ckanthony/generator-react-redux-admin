import {
  REGIONFORM_FETCHITEM_LOAD,
  REGIONFORM_FETCHITEM_SUCCEED,
  REGIONFORM_FETCHITEM_FAIL,
  REGIONFORM_EDITFORM_CHANGE,
  REGIONFORM_ENTER_RESET,
  REGIONFORM_CREATEITEM_LOAD,
  REGIONFORM_CREATEITEM_SUCCEED,
  REGIONFORM_CREATEITEM_FAIL,
  REGIONFORM_EDITITEM_LOAD,
  REGIONFORM_EDITITEM_SUCCEED,
  REGIONFORM_EDITITEM_FAIL,
  REGIONFORM_DELETEITEM_LOAD,
  REGIONFORM_DELETEITEM_SUCCEED,
  REGIONFORM_DELETEITEM_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case REGIONFORM_FETCHITEM_LOAD:
      return { ...state, isFetchItemLoading: true, fetchItemError: null }
    case REGIONFORM_FETCHITEM_SUCCEED:
      return { ...state, isFetchItemLoading: false, item: action.item }
    case REGIONFORM_FETCHITEM_FAIL:
      return { ...state, isFetchItemLoading: false, fetchItemError: action.fetchItemError }
    case REGIONFORM_ENTER_RESET:
      return {}
    case REGIONFORM_EDITFORM_CHANGE:
      return { ...state, formFieldValues: { ...state.formFieldValues, ...action.field } }
    case REGIONFORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemError: null,
      }
    case REGIONFORM_CREATEITEM_SUCCEED:
      return { ...state, isCreateItemLoading: false, isCreateItemSuccess: true }
    case REGIONFORM_CREATEITEM_FAIL:
      return { ...state, isCreateItemLoading: false, createItemError: action.createItemError }
    case REGIONFORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemError: null,
      }
    case REGIONFORM_EDITITEM_SUCCEED:
      return { ...state, isEditItemLoading: false, isEditItemSuccess: true }
    case REGIONFORM_EDITITEM_FAIL:
      return { ...state, isEditItemLoading: false, editItemError: action.editItemError }
    case REGIONFORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemError: null,
      }
    case REGIONFORM_DELETEITEM_SUCCEED:
      return { ...state, isDeleteItemLoading: false, isDeleteItemSuccess: true }
    case REGIONFORM_DELETEITEM_FAIL:
      return { ...state, isDeleteItemLoading: false, deleteItemError: action.deleteItemError }
    default:
      return state
  }
}
