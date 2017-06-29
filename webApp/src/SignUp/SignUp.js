import React from 'react';
import {StyleSheet, css} from "aphrodite";
import * as HTTP from '../utils/http/HTTP';
import {AuthService} from '../utils/auth/Auth'

const styles = StyleSheet.create({
  wrapper:{
    display: 'flex',
    justifyContent: 'space-around',
    transition: 'all .4s ease',
    position: 'absolute',
    left: 'calc(50vw - 200px)',
  },
  hide:{
    top: '95vh',
    opacity: 0,
  },
  show:{
    top: '35vh',
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

class SignUp extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInputChange = (event) => {
    console.log(event.target.name);
    switch(event.target.name){
      case 'email':
        this.setState({email: event.target.value});
        break;
      case 'pass':
        this.setState({password: event.target.value});
        break;
      default:
        break;
    }
  };

  handleSubmit(event){
    // User needs the following:
    // su: Boolean!
    //    firstName: String!
    //    lastName: String!
    //    email: String!
    //    password: String!
    //    preferencesId: ObjID

    HTTP.login(this.state)
       .catch(err =>{
         console.error('Error: ', err, event);
         alert('Bad email/password.')
         // Show an error message.
       })
       .subscribe(response =>{
         AuthService.token = response.token;
         AuthService.user = response.user;
         console.log('Login submitted: ', 'successfully', this.state);

         this.props.onLogin();
       });
    return false;
  }

  handleCancel(event){
    console.log('Handlecancel');
    event.preventDefault();
    event.stopPropagation();
    this.props.onCancel();
  }

  render(){
    return (
       <div className={this.props.show ? css(styles.show, styles.wrapper) : css(styles.hide, styles.wrapper)}>
         <div className={css(styles.login)}>
           sign up
           <form className={css(styles.centerBox)} onSubmit={(e) => {e.preventDefault();this.handleSubmit();}}>
             <label htmlFor="firstName">
               <span className={css(styles.inputLabel)}>first name</span>
               <input type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                      className={css(styles.input)}
               />
             </label>
             <label htmlFor="lastName">
               <span className={css(styles.inputLabel)}>last name</span>
               <input type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                      className={css(styles.input)}
               />
             </label>
             <label htmlFor="email">
               <span className={css(styles.inputLabel)}>email</span>
               <input type="text"
                      name="email"
                      value={this.state.email}
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
             <button className={"waterfall-button " + css(styles.cancelButton)}  onClick={this.handleCancel}>Cancel</button>
           </form>
         </div>
       </div>)
  }
}

export default SignUp;