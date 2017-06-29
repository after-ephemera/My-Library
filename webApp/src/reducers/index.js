import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import notification from "./notification";


export const initialState = {
  notifications: [],
};

export default combineReducers({
  routing: routerReducer,
  notification,
})