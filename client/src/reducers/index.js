import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import queries from './queries'
export default combineReducers({
  alert,
  auth,
  queries,
})
