import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Notification from "./Notification";


class NotificationCenter extends React.Component{

  render = ()=> (
     <section>
     {
       this.props.notifications.map((n, i) =>{
         return <Notification notification={n} index={i} key={i}/>
       })
     }
     </section>
  )
}

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
