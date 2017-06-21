import React from "react";
import {StyleSheet, css} from "aphrodite";
import Rx from "rxjs";
import blurImage from "./white-blur.jpg";
import Library from './Library/Library';
import {checkLogin} from "./utils/http/HTTP";
import Login from "./Login/Login";


const shiftTransition = {
  transition: 'all .3s ease-out',
  position: 'relative',
  bottom: 0,
  top: 0,
  opacity: 1
};

const styles = StyleSheet.create({
  glass: {
    position: 'relative',
    'animation-duration': '.75s',
    'animation-fill-mode': 'both',
    'background-size': 'cover',
    overflow: 'hidden',
    backgroundPosition: 'right',
    ':before': {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: '-1',
      display: 'block',
      position: 'absolute',
      content: ' ',
    }
  },
  fade: {
    // 'background-image': "url('" + blurImage + "')",
    '-webkit-animation-name': {
      '0%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      }
    },
    animationName: {
      '0%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      }
    }
  },
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
  enterButton: Object.assign({
    width: 75,
    margin: 'auto',
    ':hover': {
      'opacity': '.75'
    }
  }, shiftTransition),
  enterLabel: Object.assign({
    'font-family': 'Work Sans',
    'font-weight': '200',
    'font-size': '24px',
    cursor: 'pointer',
    userSelect: 'none',
  }, shiftTransition),
  h1: Object.assign({
    'font-size': 64,
    'letter-spacing': 1.5
  }, shiftTransition),
  rule: Object.assign({
    width: 55,
  }, shiftTransition),
  shiftOut: {
    // bottom: 900
    top: '-65vh',
    opacity: 0
  },
  abs: {
    width: '100%',
    height: '100%',
  },
  hide: {
    display: 'none'
  },
  image: shiftTransition,
  fadeOut:{
    opacity: 0,
  },
  hideLogin:{
    opacity: 0,
    transition: 'all .3s ease-out',
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
      });
    } else{
      this.setState({
        entered: !this.state.entered,
        isLoggedIn: false,
      })
    }

    setTimeout(() => {
      this.setState({hideTitle: true})
    }, 1000);
  };

  login(){
    this.setState({loggingIn: true});

    // setTimeout(() => {
    //   this.setState({hideTitle: true})
    // }, 1000);
  }

  render() {

    return (
       <div className={css(styles.abs)}>

         <div className={this.state.hideTitle ? css(styles.title, styles.hide) : css(styles.title)}>

           <h1
              className={this.state.entered ? css(styles.lobster, styles.h1, styles.shiftOut) : css(styles.lobster, styles.h1)}>
             {this.props.title || 'Waterfall'}</h1>

           <div className={this.state.loggingIn ? css(styles.enterButton, styles.fadeOut) : css(styles.enterButton)}>

             {/*<a className={css(styles.enterLabel)} onClick={this.enter.bind(this)}>{'log in'}</a>*/}
             <a className={css(styles.enterLabel)} onClick={this.login}>{'log in'}</a>
             <hr className={css(styles.rule)}/>

           </div>
         </div>
         <Login className={this.state.loggingIn ? css(styles.hideLogin) : css(styles.fadeOut)} />

         <Library isLoggedIn={this.state.isLoggedIn}/>

       </div>
    )
  }
}

export default App;
