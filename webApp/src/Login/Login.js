import React from 'react';
import {StyleSheet, css} from "aphrodite";
import * as HTTP from '../utils/http/HTTP';

const styles = StyleSheet.create({
  wrapper:{
    display: 'flex',
    justifyContent: 'space-around',
  },
  login:{
    width: 400,
    height: 350,
    background: 'linear-gradient(#172a3c , whitesmoke)',
    // border: '1px solid #172a3c',
    borderRadius: 8,
    color: '#ffffff',
  },
  centerBox:{
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 44,
    width: 240,
  },

  inputLabel:{
    fontSize:'1.1em',
    display:'block',
    clear: 'both',
  },
  input:{
    width: 240,
    fontSize: '1.2em',
    borderRadius: 4,
    marginBottom: 28,
  },
  submitButton:{
    width: 150,
    fontSize: '1.2em',
    marginRight: 45,
    marginLeft: 45,
    marginTop: 28,
    border: 'none',
    background: '#FFD363',
    color: '#172a3c',
  }
});

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handleSubmit(event){
    let loggedIn = HTTP.login(this.state);
    console.log('Login submitted: ', loggedIn ? 'successfully' : 'unsuccessful', this.state);
    event.preventDefault();
  }

  render(){
    return (
     <div className={css(styles.wrapper)}>
       <div className={css(styles.login)}>
         <form className={css(styles.centerBox)} onSubmit={this.handleSubmit}>
           <label htmlFor="username">
             <span className={css(styles.inputLabel)}>Username</span>
            <input type="text"
                   name="username"
                   value={this.state.username}
                   onChange={this.handleUsernameChange}
                   className={css(styles.input)}
            />
           </label>
           <label htmlFor="pass">
             <span className={css(styles.inputLabel)}>Password</span>
            <input type="password"
                   name="pass"
                   value={this.state.password}
                   onChange={this.handlePasswordChange}
                   className={css(styles.input)}
            />
           </label>
           <input type="submit" value="Submit" className={css(styles.submitButton)}/>
         </form>
       </div>
     </div>)
  }
}

export default Login;