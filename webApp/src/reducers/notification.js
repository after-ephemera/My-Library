
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const SHOW_PERSISTENT = 'SHOW_NOTIFICATION_PERSISTENT';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const initialState = {
  notifications: [],
  currentNotificationIndex: 0,
};

let notificationIndexByKey = (notifications, key)=>{
  return notifications.map((o)=>{
    return o.key;
  }).indexOf(key);
};

export default (state = initialState, action) =>{
  switch(action.type){
    case SHOW_NOTIFICATION:
      const notificationToAdd = Object.assign({}, action.notification, {index: state.currentNotificationIndex});
      return {
         ...state,
        notifications:[
           ...state.notifications,
          notificationToAdd,
        ],
        currentNotificationIndex: state.currentNotificationIndex + 1,
      };
    case SHOW_PERSISTENT:
      return {
         ...state,
      };
    case REMOVE_NOTIFICATION:
      let keyIndex = notificationIndexByKey(state.notifications, action.notification.key);
      let notifications = [
         ...state.notifications.slice(0, keyIndex),
         ...state.notifications.slice(keyIndex + 1)
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
  // console.log('Dispatching notification!', notification);
  return dispatch =>{
    dispatch({
      type: SHOW_NOTIFICATION,
      notification,
    });

    setTimeout(()=>{
      dispatch({
        type: REMOVE_NOTIFICATION,
        notification,
      })
    }, notification.length);
  }
};

export const addPersistentNotification = (notification) =>{
  // console.log('Dispatching notification!', notification);
  return dispatch => {
    dispatch({
      type: SHOW_NOTIFICATION,
      notification,
    });
  }
};