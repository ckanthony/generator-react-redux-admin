import {
  <%= actionName %>FORM_FETCHITEM_LOAD,
  <%= actionName %>FORM_FETCHITEM_SUCCEED,
  <%= actionName %>FORM_FETCHITEM_FAIL,
  <%= actionName %>FORM_EDITFORM_CHANGE,
  <%= actionName %>FORM_ENTER_RESET,
  <%= actionName %>FORM_CREATEITEM_LOAD,
  <%= actionName %>FORM_CREATEITEM_SUCCEED,
  <%= actionName %>FORM_CREATEITEM_FAIL,
  <%= actionName %>FORM_EDITITEM_LOAD,
  <%= actionName %>FORM_EDITITEM_SUCCEED,
  <%= actionName %>FORM_EDITITEM_FAIL,
  <%= actionName %>FORM_DELETEITEM_LOAD,
  <%= actionName %>FORM_DELETEITEM_SUCCEED,
  <%= actionName %>FORM_DELETEITEM_FAIL,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case <%= actionName %>FORM_FETCHITEM_LOAD:
      return { ...state, isFetchItemLoading: true, fetchItemError: null }
    case <%= actionName %>FORM_FETCHITEM_SUCCEED:
      return { ...state, isFetchItemLoading: false, item: action.item }
    case <%= actionName %>FORM_FETCHITEM_FAIL:
      return { ...state, isFetchItemLoading: false, fetchItemError: action.fetchItemError }
    case <%= actionName %>FORM_ENTER_RESET:
      return {}
    case <%= actionName %>FORM_EDITFORM_CHANGE:
      return { ...state, formFieldValues: { ...state.formFieldValues, ...action.field } }
    case <%= actionName %>FORM_CREATEITEM_LOAD:
      return {
        ...state,
        isCreateItemLoading: true,
        isCreateItemSuccess: false,
        createItemError: null,
      }
    case <%= actionName %>FORM_CREATEITEM_SUCCEED:
      return { ...state, isCreateItemLoading: false, isCreateItemSuccess: true }
    case <%= actionName %>FORM_CREATEITEM_FAIL:
      return { ...state, isCreateItemLoading: false, createItemError: action.createItemError }
    case <%= actionName %>FORM_EDITITEM_LOAD:
      return {
        ...state,
        isEditItemLoading: true,
        isEditItemSuccess: false,
        editItemError: null,
      }
    case <%= actionName %>FORM_EDITITEM_SUCCEED:
      return { ...state, isEditItemLoading: false, isEditItemSuccess: true }
    case <%= actionName %>FORM_EDITITEM_FAIL:
      return { ...state, isEditItemLoading: false, editItemError: action.editItemError }
    case <%= actionName %>FORM_DELETEITEM_LOAD:
      return {
        ...state,
        isDeleteItemLoading: true,
        isDeleteItemSuccess: false,
        deleteItemError: null,
      }
    case <%= actionName %>FORM_DELETEITEM_SUCCEED:
      return { ...state, isDeleteItemLoading: false, isDeleteItemSuccess: true }
    case <%= actionName %>FORM_DELETEITEM_FAIL:
      return { ...state, isDeleteItemLoading: false, deleteItemError: action.deleteItemError }
    default:
      return state
  }
}
