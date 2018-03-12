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
  type: ActionTypes.REGIONFORM_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const reset = () => ({
  type: ActionTypes.REGIONFORM_ENTER_RESET,
})

export const fetchItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.REGIONFORM_FETCHITEM_LOAD })
  try {
    const item = await api.get(`regions/${params.id}`)
    dispatch({
      type: ActionTypes.REGIONFORM_FETCHITEM_SUCCEED,
      item,
    })
    const field = getFieldFromItem(
      item,
      keys,
    )
    dispatch({
      type: ActionTypes.REGIONFORM_EDITFORM_CHANGE,
      field,
    })
  } catch (error) {
    console.log(error.message)
    console.log(error.name)
    dispatch({
      type: ActionTypes.REGIONFORM_FETCHITEM_FAIL,
      fetchItemError: error.message,
    })
  }
}

export const createItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.REGIONFORM_CREATEITEM_LOAD })
  try {
    await api.create(`regions`, params)
    dispatch({ type: ActionTypes.REGIONLIST_CHANGETABLE_CHANGE })
    dispatch({ type: ActionTypes.REGIONFORM_CREATEITEM_SUCCEED })
    dispatch({ type: ActionTypes.REGIONFORM_ENTER_RESET })
  } catch (error) {
    dispatch({
      type: ActionTypes.REGIONFORM_CREATEITEM_FAIL,
      createItemError: error.message,
    })
  }
}

export const editItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.REGIONFORM_EDITITEM_LOAD })
  try {
    await api.patch(`regions/${params.id}`, params)
    dispatch({ type: ActionTypes.REGIONFORM_EDITITEM_SUCCEED })
  } catch (error) {
    dispatch({
      type: ActionTypes.REGIONFORM_EDITITEM_FAIL,
      editItemError: error.message,
    })
  }
}

export const deleteItem = params => async (dispatch) => {
  dispatch({ type: ActionTypes.REGIONFORM_DELETEITEM_LOAD })
  try {
    await api.delete(`regions/${params.id}`)
    dispatch({ type: ActionTypes.REGIONFORM_DELETEITEM_SUCCEED })
    dispatch({ type: ActionTypes.REGIONFORM_ENTER_RESET })
  } catch (error) {
    dispatch({
      type: ActionTypes.REGIONFORM_DELETEITEM_FAIL,
      deleteItemError: error.message,
    })
  }
}
