import React from "react";
import {StyleSheet, css} from "aphrodite";
import Rx from "rxjs";
import blurImage from "./white-blur.jpg";
import Library from './Library/Library';
import {checkLogin} from "./utils/http/HTTP";
import Login from "./Login/Login";


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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      entered: false,
      isLoggedIn: false,
      loggingIn: false,
      hideTitle: false
    };
    // HTTP Request test.
    Rx.Observable.ajax({url: `http://openlibrary.org/search.json?q=the+lord+of+the+rings`, crossDomain: true})
       .subscribe(res => {
         console.log(res.response);
       }, err => {
         console.error(err);
       });
    console.info(blurImage);
    this.login = this.login.bind(this);
    this.enter = this.enter.bind(this);
  }

  update(e) {
    let newState = {
      txt: e.target.value, entered: !this.state.entered,
      isLoggedIn: true
    };
    console.log('New state: ', newState);
    this.setState(newState);
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
    this.setState({loggingIn: true});
  }

  render() {

    return (
       <div className={css(styles.fullSize)}>

         <div className={this.state.hideTitle ? css(styles.title, styles.hide) : css(styles.title)}>

           <h1 className={
                this.state.entered ?
                   css(styles.lobster, styles.h1, styles.shiftOut) :
                   css(styles.lobster, styles.h1)}>
             {this.props.title || 'Waterfall'}
           </h1>

           <div className={this.state.loggingIn ? css(styles.fadeOut) : ''}>

             <a className={css(styles.hoverButton, styles.enterLabel)} onClick={this.login}>{'log in'}</a>
             <hr className={css(styles.rule)}/>
             <a className={css(styles.hoverButton, styles.signUpLabel)} onClick={this.login}>{'sign up'}</a>

           </div>
         </div>
         <Login show={this.state.loggingIn}  onLogin={this.enter}/>

         <Library isLoggedIn={this.state.isLoggedIn}/>

       </div>
    )
  }
}

export default App;
