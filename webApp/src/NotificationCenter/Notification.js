import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {removePersistentNotification} from "../reducers/notification";

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
      width: '96vw',
      height: '100px',
      background: n.color || '#FFD363',
      color: 'white',
      zIndex: '2000',
      animationName: appear,
      animationDuration: '.3s',
      margin: '2vw 2vh 0 2vw',
      borderRadius: 8,

    }
  });
};

class Notification extends React.Component{

  constructor(props){
    super(props);
    this.state = props;
  }
  render = ()=> (
    <div className={css(style(108 * this.props.index, this.props.notification).notification)}
         onClick={()=>this.props.removePersistentNotification(this.props.notification)}>
      {this.props.notification.message}
    </div>
  )
}


const mapStateToProps = state => {
  console.log('Mapping state to props', state);
  return {
    removePersistentNotification: state.notification.removePersistentNotification
  }};

const mapDispatchToProps = dispatch => bindActionCreators({
  removePersistentNotification,
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Notification)
