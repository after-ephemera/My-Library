import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createBrowserHistory from 'history/createBrowserHistory'
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom';

let TestComponent = (props) => (
   <section>
     I got a component!
   </section>
);

const browserHistory = createBrowserHistory();

ReactDOM.render(
   <Router history={browserHistory}>
     <div>
       <Route path="/" component={App} title="My Library again!" />
       <Route path="/about" component={TestComponent} />
     </div>
   </Router>,
   document.getElementById('root')
);
