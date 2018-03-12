import * as ActionTypes from '../constants/actionTypes'
import { login } from './app'
import api from '../utils/api'

export const changeFormFields = formFieldsChange => ({
  type: ActionTypes.LOGIN_EDITFORM_CHANGE,
  field: formFieldsChange,
})

export const sendLoginRequest = values => async (dispatch) => {
  dispatch({ type: ActionTypes.LOGIN_LOGIN_LOAD })
  const params = {
    ...values,
    strategy: 'administrators',
  }
  try {
    const result = await api.login(params)
    dispatch({ type: ActionTypes.LOGIN_LOGIN_SUCCEED })
    dispatch(login({ accessToken: result.accessToken }))
  } catch (error) {
    dispatch({
      type: ActionTypes.LOGIN_LOGIN_FAIL,
      loginError: error.message,
    })
  }
}
