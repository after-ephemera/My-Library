import Rx from "rxjs";

const SERVER_URL = `http://localhost:3000`;
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
     .map(res => {
       console.log('Response: ', res);
       return res.response;
     }, err => {
       console.error('Error: ', err);
       return err;
     });
}