import React from "react";
import {StyleSheet, css} from "aphrodite";
import {Observable} from "rxjs";
import blurImage from "./white-blur.jpg";
import Library from './Library/Library';
import {checkLogin} from "./utils/http/HTTP";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import AvatarMenu from "./AvatarMenu/AvatarMenu";
import {Route} from "react-router-dom";
import {history} from './store';


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
    console.log('Entering the app!', this.props);
    if(checkLogin()){
      this.setState({
        entered: !this.state.entered,
        isLoggedIn: true,
        loggingIn: false,
      });
    } else{
      console.log('Cant enter');
      this.setState({
        entered: !this.state.entered,
        isLoggedIn: false,
        loggingIn: false,
      })
    }

    setTimeout(() => {
      this.setState({hideTitle: true})
    }, 1000);
  };

  login(){
    this.setState({loggingIn: true, signingIn: false});
    history.push('/login');
  }

  signUp(){
    this.setState({signingUp: true, loggingIn: false});
    history.push('/sign-up');
  }

  reset(){
    this.setState({loggingIn: false, signingUp: false});
    history.push('/');
  }

  render() {

    return (
       <div className={css(styles.fullSize)}>
         <AvatarMenu/>

         <div className={this.state.hideTitle ? css(styles.title, styles.hide) : css(styles.title)}>

           <h1 className={
                this.state.entered ?
                   css(styles.lobster, styles.h1, styles.shiftOut) :
                   css(styles.lobster, styles.h1)}>
             {this.props.title || 'Waterfall'}
           </h1>

           <div className={(this.state.loggingIn || this.state.signingUp) ? css(styles.fadeOut) : ''}>

             <a className={css(styles.hoverButton, styles.enterLabel)} onClick={this.login}>{'log in'}</a>
             <hr className={css(styles.rule)}/>
             <a className={css(styles.hoverButton, styles.signUpLabel)} onClick={this.signUp}>{'sign up'}</a>

           </div>
         </div>

         <Route path={`${this.props.match.url}login`} render={()=>(<Login show={true}  onLogin={this.enter} onCancel={this.reset}/>)}/>
         <Route path={`${this.props.match.url}sign-up`} render={()=>(<SignUp show={true}  onCreate={()=>true} onCancel={this.reset}/>)}/>

         <Library isLoggedIn={this.state.isLoggedIn}/>

       </div>
    )
  }
}

export default Main;
