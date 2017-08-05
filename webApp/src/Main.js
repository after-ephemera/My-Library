import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Observable} from "rxjs";
import blurImage from "./white-blur.jpg";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import {Redirect, Route, Switch} from "react-router-dom";
import {history} from './store';
import {getLoggedIn} from "./reducers/index";
import store from './store';


const shiftTransition = (length)=> {
  return {
    transition: `all ${length}s ease-out`,
    position: 'relative',
    bottom: 0,
    top: 0,
    opacity: 1
  }
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    width: '100vw',
    height: '20vh',
    marginTop: '10vh',
    zIndex: '4',
    top: 0
  },
  lobster: {
    'font-family': 'Lobster',
  },
  hoverButton: Object.assign({
    width: 75,
    margin: 'auto',
    ':hover': {
      'opacity': '.75'
    }
  }, shiftTransition(.1)),
  enterLabel: Object.assign({
    fontFamily: 'Work Sans',
    fontWeight: 200,
    fontSize: 24,
    cursor: 'pointer',
    userSelect: 'none',
  }, shiftTransition(1)),
  signUpLabel: Object.assign({
    fontFamily: 'Work Sans',
    fontWeight: 200,
    fontSize: 14,
    cursor: 'pointer',
    userSelect: 'none',
  }),
  h1: Object.assign({
    'font-size': 64,
    'letter-spacing': 1.5
  }, shiftTransition(1)),
  rule: Object.assign({
    width: 55,
  }, shiftTransition(1)),
  shiftOut: {
    // bottom: 900
    top: '-65vh',
    opacity: 0
  },
  fullSize: {
    width: '100%',
    height: '100%',
  },
  hide: {
    display: 'none'
  },
  image: shiftTransition(1),
  fadeOut:{
    opacity: 0,
    height: 0,
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.match = props.match;
    this.title = props.title;
    this.state = {
      entered: false,
      isLoggedIn: false,
      loggingIn: false,
      signingUp: false,
      hideTitle: false
    };
    // HTTP Request test.
    Observable.ajax({url: `http://openlibrary.org/search.json?q=the+lord+of+the+rings`, crossDomain: true})
       .subscribe(res => {
         console.log(res.response);
       }, err => {
         console.error(err);
       });
    console.info(blurImage);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.enter = this.enter.bind(this);
    this.reset = this.reset.bind(this);
  }

  enter = () => {
    // if(checkLogin()){
    //   this.setState({
    //     entered: !this.state.entered,
    //     isLoggedIn: true,
    //     loggingIn: false,
    //   });
    // } else{
    //   console.log('Cant enter');
    //   this.setState({
    //     entered: !this.state.entered,
    //     isLoggedIn: false,
    //     loggingIn: false,
    //   })
    // }

    history.push('/library');

    // setTimeout(() => {
    //   this.setState({hideTitle: true})
    // }, 1000);
  };

  login(){
    // this.setState({loggingIn: true, signingIn: false});
    history.push(this.match.url + '/login');
  }

  signUp(){
    // this.setState({signingUp: true, loggingIn: false});
    history.push(this.match.url + '/sign-up');
  }

  reset(){
    // this.setState({loggingIn: false, signingUp: false});
    history.push('/home');
  }

  render() {

    return (
       <div className={css(styles.fullSize)}>
         {/* If the user is already authenticated, redirect them to their personal home page.*/}
         {getLoggedIn(store.getState()) ? <Redirect to="/library" />: ''}

         <div className={this.state.hideTitle ? css(styles.title, styles.hide) : css(styles.title)}>

           <h1 className={
                this.state.entered ?
                   css(styles.lobster, styles.h1, styles.shiftOut) :
                   css(styles.lobster, styles.h1)}>
             {this.title || 'Waterfall'}
           </h1>

           <div className={(this.state.loggingIn || this.state.signingUp) ? css(styles.fadeOut) : ''}>

             <a className={css(styles.hoverButton, styles.enterLabel)} onClick={this.login}>{'log in'}</a>
             <hr className={css(styles.rule)}/>
             <a className={css(styles.hoverButton, styles.signUpLabel)} onClick={this.signUp}>{'sign up'}</a>

           </div>
         </div>

         <Switch>
           <Route exact path={`${this.match.url}/login`} render={()=>(<Login show={true}  onLogin={this.enter} onCancel={this.reset}/>)}/>
           <Route exact path={`${this.match.url}/sign-up`} render={()=>(<SignUp show={true}  onCreate={this.enter} onCancel={this.reset}/>)}/>
         </Switch>


       </div>
    )
  }
}

export default Main;
