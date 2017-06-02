import React from "react";
import {StyleSheet, css} from "aphrodite";
import Rx from "rxjs";
import blurImage from "./white-blur.jpg";
import Library from './Library/Library';


const shiftTransition = {
  transition: 'all 1s ease-out',
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
      'width': '100%',
      'height': '100%',
      'overflow': 'hidden',
      'z-index': '-1',
      display: 'block',
      position: 'absolute',
      content: ' ',
    }
  },
  fade: {
    'background-image': "url('" + blurImage + "')",
    '-webkit-animation-name': {
      '0%': {
        opacity: '0',
        // transform: 'scale(1.05) rotate(4deg)'
      },
      '100%': {
        opacity: '1',
        // transform: 'scale(1.05) rotate(-4deg)'
      }
    },
    animationName: {
      '0%': {
        opacity: '0',
        // transform: 'scale(1.05) rotate(4deg)'
      },
      '100%': {
        opacity: '1',
        // transform: 'scale(1.05) rotate(-4deg)'
      }
    }
  },
  title: {
    'text-align': 'center',
    'padding-top': '25vh',
    'width': '65vw',
    position: 'absolute',
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
      // color: 'white',
      // 'background-color': 'black',
      'opacity': '.75'
    }
  }, shiftTransition),
  enterLabel: Object.assign({
    'font-family': 'Work Sans',
    'font-weight': '200',
    'font-size': '24px',
    cursor: 'pointer'
  }, shiftTransition),
  h1: Object.assign({
    'font-size': 64,
    'letter-spacing': 1.5
  }, shiftTransition),
  rule: Object.assign({
    width: 55,
  }, shiftTransition),
  overlay: {
    zIndex: '3',
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: '.3'
  },
  shiftOut: {
    // bottom: 900
    top: '-65vh',
    opacity: 0
  },
  abs: {
    width: '100%',
    height: '100%'
  },
  hide: {
    display: 'none'
  }

});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      entered: false,
      isLoggedIn: false,
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
    console.log('Entering the app!');
    this.setState({
      entered: !this.state.entered,
      isLoggedIn: true
    });
    setTimeout(() => {
      this.setState({hideTitle: true})
    }, 1000)
  };

  render() {

    return (
       <div className={css(styles.abs)}>
         <article className={this.state.entered ? css(styles.glass, styles.fade) : css(styles.glass)}>
           <div className={this.state.entered ? css(styles.overlay) : ''}></div>
           {/*status: {(this.state.entered) ? 'entered':'not'}*/}
         </article>

         <div className={this.state.hideTitle ? css(styles.title, styles.hide) : css(styles.title)}>
           <h1
              className={this.state.entered ? css(styles.lobster, styles.h1, styles.shiftOut) : css(styles.lobster, styles.h1)}>
             My Library</h1>
           <div className={this.state.entered ? css(styles.enterButton, styles.shiftOut) : css(styles.enterButton)}>
             <a className={css(styles.enterLabel)} onClick={this.enter.bind(this)}>Enter</a>
             <hr className={css(styles.rule)}/>
           </div>
         </div>
         <Library isLoggedIn={this.state.isLoggedIn}/>
       </div>
    )
  }
}

export default App;