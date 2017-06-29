import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store';

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Redirect.md
ReactDOM.render(
   <Provider store={store}>
     <ConnectedRouter history={history}>
       <div>
         <App />
       </div>
     </ConnectedRouter>
   </Provider>,
   document.getElementById('root')
);

// {/*<Router>*/}
// {/*<div>*/}
// {/*<AvatarMenu/>*/}
// {/*<Route exact path="/" component={App} />*/}
// {/*<Route path="/detail/:bookID" component={BookDetail} />*/}
// {/*</div>*/}
// {/*</Router>,*/}