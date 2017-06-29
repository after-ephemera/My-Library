import React from 'react';
import {StyleSheet, css} from 'aphrodite';

const appear = {
  'from':{
    height: '0px'
  },
  'to':{
    height: '100px'
  }
};


const style = (top, n) => {
  console.log(' Top is : ', top);
  return StyleSheet.create({
    notification: {
      top: top,
      position: 'absolute',
      width: '100vw',
      height: '100px',
      background: n.color,
      color: 'white',
      zIndex: '2000',
      animationName: appear,
      animationDuration: '.3s',
      border: '1px solid black',
    }
  });
};

class Notification extends React.Component{

  constructor(props){
    super(props);
    this.state = props;
  }
  render = ()=> (
    <div className={css(style(100 * this.props.index, this.props.notification).notification)}>{JSON.stringify(this.props.notification)}</div>
  )
}

export default Notification;
