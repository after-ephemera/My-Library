import React from 'react';
import {StyleSheet, css} from "aphrodite";
import * as HTTP from '../utils/http/HTTP';

const styles = StyleSheet.create({
  wrapper:{
    display: 'flex',
    justifyContent: 'space-around',
    transition: 'all .4s ease',
    position: 'relative',
  },
  hide:{
    top: '5vh',
    opacity: 0,
  },
  show:{
    top:0,
    opacity: 1,
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
    height: 48,
    fontSize: '1.2em',
    marginRight: 45,
    marginLeft: 45,
    marginTop: 28,
    border: 'none',
    background: '#FFD363',
    color: '#172a3c',
    borderRadius: 4,
    transition: 'background .3s ease',
    ':hover':{
      background: '#ffe677',
    }
  },
  cancelButton:{
    marginTop: 8,
    width: '100%',
  }
});

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    switch(event.target.name){
      case 'username':
        this.setState({password: event.target.value});
        break;
      case 'pass':
        this.setState({password: event.target.value});
        break;
      default:
        break;
    }
  }

  handleSubmit(event){
    let loggedIn = HTTP.login(this.state);
    console.log('Login submitted: ', loggedIn ? 'successfully' : 'unsuccessful', this.state);
    event.preventDefault();
    this.props.onLogin();
  }

  render(){
    return (
     <div className={this.props.show ? css(styles.show, styles.wrapper) : css(styles.hide, styles.wrapper)}>
       <div className={css(styles.login)}>
         <form className={css(styles.centerBox)} onSubmit={this.handleSubmit}>
           <label htmlFor="username">
             <span className={css(styles.inputLabel)}>Username</span>
            <input type="text"
                   name="username"
                   value={this.state.username}
                   onChange={this.handleInputChange}
                   className={css(styles.input)}
            />
           </label>
           <label htmlFor="pass">
             <span className={css(styles.inputLabel)}>Password</span>
            <input type="password"
                   name="pass"
                   value={this.state.password}
                   onChange={this.handleInputChange}
                   className={css(styles.input)}
            />
           </label>
           <input type="submit" value="submit" className={css(styles.submitButton)}/>
           <button className={"waterfall-button " + css(styles.cancelButton)}>Cancel</button>
         </form>
       </div>
     </div>)
  }
}

export default Login;