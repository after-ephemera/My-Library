import React from "react";
import {StyleSheet, css} from "aphrodite";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            entered: false
        };
    }

    update(e) {
        this.setState({txt: e.target.value});
    }

    render() {

        const divStyle = {
            // backgroundColor: "#ddd",
            height: '100vh',
            width: '100%'
        };

        let enter = ()=>{
            console.log('Entering the app!');
            this.setState({entered: true});
        };

        return (
            <div className={css(styles.glass)}>
                <div className={css(styles.title)}>
                    <h1 className={css(styles.lobster, styles.h1)}>My Library</h1>
                    <div className={css(styles.enterButton)}>
                        <a className={css(styles.enterLabel)} onClick={enter.bind(this)}>Enter</a>
                        <hr className={css(styles.rule)}/>
                    </div>
                </div>
                {/*status: {(this.state.entered) ? 'good':'darn'}*/}
            </div>
        )
    }
}

const styles = StyleSheet.create({
    glass: {
        position: 'relative',
        ':before':{
            'z-index': '-1',
            display: 'block',
            position: 'absolute',
            content: ' '
        }
    },
    fade: {

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
        'font-size': '24px'
    },
    h1:{
        'font-size': 64,
        'letter-spacing': 1.5
    },
    rule: {
        width: 55,
    }
});

export default App;
