import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Main from "./Main";
import BookDetail from "./BookDetail/BookDetail";
import NotificationCenter from "./NotificationCenter/NotificationCenter";
import {addTimeoutNotification, addPersistentNotification} from "./reducers/notification";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const colors=['orange','blue','black','silver','whitesmoke','green','pink','red'];


class App extends React.Component {

  constructor(props){
    super(props);
    this.showNotification = this.showNotification.bind(this);
    this.index = 0;
  }

  showNotification = () => {
    this.props.addTimeoutNotification(
       {
         id: 0,
         length: 2500,
         message: 'You did it! ' + ++this.index,
         color: colors[this.index % colors.length],
         key: this.index,
       });
  };

  showPersistentNotification = () => {
    this.props.addPersistentNotification(
       {
         id: 0,
         length: 2500,
         message: 'You did it! ' + ++this.index,
         color: colors[this.index % colors.length],
         key: this.index,
       });
  };


  render = () => (<div>
       <NotificationCenter />

       <main>
         <Route path="/" component={Main}/>
         <Route exact path="/detail/:bookID" component={BookDetail}/>
         <Route exact path="/detail" render={() => (
            <Redirect to="/"/>
         )}/>
       </main>
       <div onClick={this.showNotification}>Click me for a new timeout notification</div>
       <hr/>
       <div onClick={this.showPersistentNotification}>Click me for a new persistent notification</div>
     </div>
  );
}

const mapStateToProps = state => {
  console.log('Mapping state to props', state);
  return {
    notifications: state.notification.notifications,
    addTimeoutNotification: state.notification.addTimeoutNotification,
    addPersistentNotification: state.notification.addPersistentNotification,
  }};

const mapDispatchToProps = dispatch => bindActionCreators({
  addTimeoutNotification,
  addPersistentNotification,
}, dispatch);

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(App)