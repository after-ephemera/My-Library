
export const SHOW_TIMEOUT = 'SHOW_NOTIFICATION_TIMEOUT';
export const SHOW_PERSISTENT = 'SHOW_NOTIFICATION_PERSISTENT';

const initialState = {
  notifications: [],
};

export default (state = initialState, action) =>{
  switch(action){
    case SHOW_TIMEOUT:
      return state;
    case SHOW_PERSISTENT:
      return state;
    default:
      return state;
  }
}