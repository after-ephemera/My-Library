import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


export const initialState = {
  notifications: [],
};

export default combineReducers({
  routing: routerReducer,
  notification,
})