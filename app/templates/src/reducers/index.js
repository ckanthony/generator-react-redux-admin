import { combineReducers } from 'redux'
import app from './app'
import home from './home'
import login from './login'
import admin from './admin'

export default combineReducers({
  app,
  home,
  login,
  admin,
})
