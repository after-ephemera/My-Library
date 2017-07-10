import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import notification from './notification';
import auth, * as fromAuth from './auth';


export default combineReducers({
  routing: routerReducer,
  notification,
  auth,
})

export const getLoggedIn = (state)=>{
  return fromAuth.getLoggedIn(state.auth);
};