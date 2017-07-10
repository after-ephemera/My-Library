
export const SET_TOKEN = 'SET_TOKEN';

const initialState = {
  token: false,
};

export default (state = initialState, action) =>{
  switch(action.type){
    case SET_TOKEN:
      return {
         ...state,
        token: action.token,
      };
    default:
      return state;
  }
}

export const setToken = (token) =>{
  return dispatch =>{
    console.log('Setting token: ', token);
    localStorage.setItem('auth-token', token);
    dispatch({
      type: SET_TOKEN,
      token
    })
  }
};

export const getLoggedIn = (state) => {
  if(state.token){
    return state.token;
  } else{
    return false;
  }
};
