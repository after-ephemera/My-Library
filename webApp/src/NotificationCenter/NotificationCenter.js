import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {StyleSheet, css} from 'aphrodite';

const appear = {
  'from':{
    height: '0px'
  },
  'to':{
    height: '100px'
  }
}

const styles = StyleSheet.create({
  notification:{
    top: 0,
    position: 'absolute',
    width: '100vw',
    height:'100px',
    background: 'orange',
    color: 'white',
    zIndex: '2000',
    animationName: appear,
    animationDuration: '.3s',
  }
})

const NotificationCenter = (props) =>{
  return (
     <section>
     {/*<div>Notification Center</div>*/}
     {
       props.notifications.map(n =>{
         /*<Notification notification={n} />*/
         return <div className={css(styles.notification)}>{JSON.stringify(n)}</div>
       })
     }
     </section>
  )
};

const mapStateToProps = state => {
  console.log('Mapping state to props', state);
  return {
    notifications: state.notification.notifications
  }};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(NotificationCenter)
