import Rx from "rxjs";
import { history } from '../../store';

export const SERVER_URL = `http://localhost:3001`;

/**
 * Universal http error handler. This function is used to deal with displaying error messages and redirecting
 * as necessary.
 */
const handleHttpError = (err)=>{
  const status = err.status;
  if(!status || status.toString() === '200'){
    console.error('Unknown Error');
  } else if(status.toString() === '500'){
    console.error('500 - Internal server error');
  } else if(status.toString() === '401'){
    console.error('401 - Not authorized');
    // Redirect the user back to the home page.
    history.push('/');
  } else if(status.toString() === '404'){
    console.error('404 - Not Found');
  } else{
    console.error('HTTP error with status code ', status);
  }

  return Rx.Observable.throw(err);
};


/**
 * Sends a request to check if the user is logged in (likely based on a token of some sort, TBD) and returns a
 * boolean value representing logged in status.
 */
export function checkLogin(){
  return true;
}

/**
 * Sends a request to login
 * @returns {boolean}
 */
export function login(credentials){
  return Rx.Observable.ajax({url: SERVER_URL + '/login', crossDomain: true, method:'POST', body: credentials})
     .catch(handleHttpError)
     .map(res => {
       let status =  res.status;
       console.log(status);
       console.log('Response: ', res);
       return res.response;
     });
}