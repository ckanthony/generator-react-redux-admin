import {
  ADMIN_OPENSUBMENU_CHANGE,
  ADMIN_TOGGLESIDER_CHANGE,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ADMIN_OPENSUBMENU_CHANGE:
      return {
        ...state,
        openKeys: action.openKeys,
      }
    case ADMIN_TOGGLESIDER_CHANGE:
      return {
        ...state,
        collapsed: !state.collapsed,
      }
    default:
      return state
  }
}
