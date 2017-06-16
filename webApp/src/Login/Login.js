import React from 'react';
import {StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
  wrapper:{
    display: 'flex',
    justifyContent: 'space-around',
  },
  login:{
    width: 400,
    height: 350,
    background: 'linear-gradient(#172a3c , white)', /* Standard syntax */
    // border: '1px solid #172a3c',
    borderRadius: 8,
  }
});

let Login = (props)=>{

  return (
     <div className={css(styles.wrapper)}>
       <div className={css(styles.login)}>
        Login
       </div>
     </div>
  )
};

export default Login;