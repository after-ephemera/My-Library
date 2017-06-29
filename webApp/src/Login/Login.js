import React from 'react';
import {StyleSheet, css} from "aphrodite";
import * as HTTP from '../utils/http/HTTP';
import {AuthService} from '../utils/auth/Auth';
import {fadeInFromBelow, fadeOutToBelow} from "../utils/style/styleUtils";
import {addTimeoutNotification} from "../reducers/notification";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const styles = StyleSheet.create({
  wrapper:{
    display: 'flex',
    justifyContent: 'space-around',
    // transition: 'top .5s ease, opacity .8s ease-in-out',
    position: 'absolute',
    left: 'calc(50vw - 200px)',
  },
  hide:{
    top: '102vh',
    animationName: fadeOutToBelow,
    animationDuration: '.5s',
    animationIterationCount: '1',
    // opacity: 0,
  },
  show:{
    top: '26vh',
    // opacity: 1,
    animationName: fadeInFromBelow,
    animationDuration: '.5s',
    animationIterationCount: '1',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexWrap:'wrap',

    marginRight: 'auto',
    marginLeft: 'auto',
    height: '100%',
    padding: '5%',
  },

  inputLabel:{
    fontSize:'1.1em',
    display:'block',
    clear: 'both',
  },
  field:{
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  input:{
    width: 240,
    fontSize: '1.2em',
    borderRadius: 4,
  },
  submitButton:{
    width: 150,
    height: 48,
    fontSize: '1.2em',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 44,
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
    width: '100%',
    ':focus':{
      outline: 'none'
    }
  }
});

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: '',
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

  handleSubmit(){
    console.log('Submitted!');
    HTTP.login(this.state)
       .catch(err =>{
         console.error('Login error: ', err);
         // Show an error message.
         alert('Bad email/password.');
       })
       .subscribe(response =>{
         AuthService.token = response.token;
         AuthService.user = response.user;
         console.log('Login submitted: successfully', this.state);

         this.props.addTimeoutNotification({id: 0, length: 2000, message: 'You did it!'});
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
         <form className={css(styles.centerBox)} onSubmit={(e) => {e.preventDefault();this.handleSubmit();}}>
           <label htmlFor="email" className={css(styles.field)}>
             <span className={css(styles.inputLabel)}>email</span>
            <input type="text"
                   name="email"
                   value={this.state.email}
                   onChange={this.handleInputChange}
                   className={css(styles.input)}
            />
           </label>
           <label htmlFor="pass" className={css(styles.field)}>
             <span className={css(styles.inputLabel)}>password</span>
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

const mapStateToProps = state => {
   console.log('Mapping state to props', state);
   return {
  notifications: state.notification.notifications,
  addTimeoutNotification: state.notification.addTimeoutNotification,
  // count: state.counter.count,
  // isIncrementing: state.counter.isIncrementing,
  // isDecrementing: state.counter.isDecrementing
}};

const mapDispatchToProps = dispatch => bindActionCreators({
  addTimeoutNotification,
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Login)

// export default Login;