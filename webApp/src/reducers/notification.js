
export const SHOW_TIMEOUT = 'SHOW_NOTIFICATION_TIMEOUT';
export const SHOW_PERSISTENT = 'SHOW_NOTIFICATION_PERSISTENT';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const initialState = {
  notifications: [],
};

export default (state = initialState, action) =>{
  switch(action.type){
    case SHOW_TIMEOUT:
      return {
         ...state,
        notifications:[
           ...state.notifications,
           action.notification
        ]
      };
    case SHOW_PERSISTENT:
      return {
         ...state,
      };
    case REMOVE_NOTIFICATION:
      let notifications = [
         ...state.notifications.slice(1, state.notifications.length+1)
      ];
      return {
         ...state,
        notifications,
      };
    default:
      return {
         ...state,
      };
  }
}

export const addTimeoutNotification = (notification) =>{
  console.log('Dispatching notification!', notification);
  return dispatch =>{
    dispatch({
      type: SHOW_TIMEOUT,
      notification,
    });

    setTimeout(()=>{
      dispatch({
        type: REMOVE_NOTIFICATION,
        id: notification.id
      })
    }, notification.length);
  }
};