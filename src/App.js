import React from "react";
import {StyleSheet, css} from "aphrodite";
import Rx from "rxjs";
import blurImage from "./white-blur.jpg"



const styles = StyleSheet.create({
    glass: {
        position: 'relative',
        'animation-duration': '.25s',
        'animation-fill-mode': 'both',
        'background-size': 'cover',
        overflow: 'hidden',
        backgroundPosition: 'right',
        ':before':{
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
        'background-image': "url('"+blurImage+"')",
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
        'width': '65vw'
    },
    lobster: {
        'font-family': 'Lobster',
    },
    enterButton:{
        width: 75,
        margin: 'auto',
        ':hover':{
            // color: 'white',
            // 'background-color': 'black',
            'opacity': '.75'
        }
    },
    enterLabel: {
        'font-family': 'Work Sans',
        'font-weight': '200',
        'font-size': '24px',
        transition: '1s ease',
        opacity: 1
    },
    h1:{
        'font-size': 64,
        'letter-spacing': 1.5,
        transition: '1s ease',
        opacity: 1
    },
    rule: {
        width: 55,
        transition: '1s ease',
        opacity: 1
    },
    overlay:{
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: '.3'
    },
    fading: {
        opacity: 0
    }
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            entered: false
        };
        // HTTP Request test.
        Rx.Observable.ajax({url:`http://openlibrary.org/search.json?q=the+lord+of+the+rings`,crossDomain: true})
            .subscribe(res =>{
                console.log(res.response);
            }, err =>{
                console.error(err);
            });
        console.info(blurImage);

    }

    update(e) {
        let newState = {txt: e.target.value, entered: !this.state.entered};
        console.log('New state: ', newState);
        this.setState(newState);

    }

    render() {

        let enter = ()=>{
            console.log('Entering the app!');
            this.setState({entered: !this.state.entered});
        };

        return (
            <article className={this.state.entered ? css(styles.glass, styles.fade) : css(styles.glass)}>
                <div className={this.state.entered ? css(styles.title, styles.fading) : css(styles.title)}>
                    <h1 className={css(styles.lobster, styles.h1)}>My Library</h1>
                    <div className={css(styles.enterButton)}>
                        <a className={css(styles.enterLabel)} onClick={enter.bind(this)}>Enter</a>
                        <hr className={css(styles.rule)}/>
                    </div>
                </div>
                <div className={this.state.entered ? css(styles.overlay) : ' '}></div>
                {/*status: {(this.state.entered) ? 'entered':'not'}*/}
            </article>
        )
    }
}

export default App;
