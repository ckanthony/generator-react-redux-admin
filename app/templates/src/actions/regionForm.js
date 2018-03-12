import * as ActionTypes from '../constants/actionTypes'
import api from '../utils/api'
import getFieldFromItem from '../utils/getFieldFromItem'

export const keys = [
  'index',
  'title',
  'subtitle',
  'cover_image_url',
  'description',
  'currency_code',
  'currency_sign',
]

export const editForm = formFieldsChange => ({
  type: ActionTypes.<%= actionName =%>FORM_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const reset = () => ({
  type: ActionTypes.<%= actionName =%>FORM_ENTER_RESET,
})

export const fetchItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.<%= actionName =%>FORM_FETCHITEM_LOAD })
  try {
    const item = await api.get(`<%= urlPath =%>/${params.id}`)
    dispatch({
      type: ActionTypes.<%= actionName =%>FORM_FETCHITEM_SUCCEED,
      item,
    })
    const field = getFieldFromItem(
      item,
      keys,
    )
    dispatch({
      type: ActionTypes.<%= actionName =%>FORM_EDITFORM_CHANGE,
      field,
    })
  } catch (error) {
    console.log(error.message)
    console.log(error.name)
    dispatch({
      type: ActionTypes.<%= actionName =%>FORM_FETCHITEM_FAIL,
      fetchItemError: error.message,
    })
  }
}

export const createItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.<%= actionName =%>FORM_CREATEITEM_LOAD })
  try {
    await api.create(`<%= urlPath =%>`, params)
    dispatch({ type: ActionTypes.<%= actionName =%>LIST_CHANGETABLE_CHANGE })
    dispatch({ type: ActionTypes.<%= actionName =%>FORM_CREATEITEM_SUCCEED })
    dispatch({ type: ActionTypes.<%= actionName =%>FORM_ENTER_RESET })
  } catch (error) {
    dispatch({
      type: ActionTypes.<%= actionName =%>FORM_CREATEITEM_FAIL,
      createItemError: error.message,
    })
  }
}

export const editItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.<%= actionName =%>FORM_EDITITEM_LOAD })
  try {
    await api.patch(`<%= urlPath =%>/${params.id}`, params)
    dispatch({ type: ActionTypes.<%= actionName =%>FORM_EDITITEM_SUCCEED })
  } catch (error) {
    dispatch({
      type: ActionTypes.<%= actionName =%>FORM_EDITITEM_FAIL,
      editItemError: error.message,
    })
  }
}

export const deleteItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.<%= actionName =%>FORM_DELETEITEM_LOAD })
  try {
    await api.delete(`<%= urlPath =%>/${params.id}`)
    dispatch({ type: ActionTypes.<%= actionName =%>FORM_DELETEITEM_SUCCEED })
    dispatch({ type: ActionTypes.<%= actionName =%>FORM_ENTER_RESET })
  } catch (error) {
    dispatch({
      type: ActionTypes.<%= actionName =%>FORM_DELETEITEM_FAIL,
      deleteItemError: error.message,
    })
  }
}
