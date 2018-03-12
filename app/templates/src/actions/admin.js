import * as ActionTypes from '../constants/actionTypes'

export const openChangeMenu = openKeys => ({
  type: ActionTypes.ADMIN_OPENSUBMENU_CHANGE,
  openKeys,
})

export const toggleSider = () => ({
  type: ActionTypes.ADMIN_TOGGLESIDER_CHANGE,
})

