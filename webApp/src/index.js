import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { Provider } from 'react-redux'
import store from './store';
import {ApolloProvider, ApolloClient, createNetworkInterface} from "react-apollo";


const networkInterface = createNetworkInterface({uri: 'http://localhost:3001/api',});

// Afterware to handle errors.
networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (response.status === 401) {
      // logout();
      console.log('Error Will Robinson');
      return;
    }
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface: networkInterface,
});

ReactDOM.render(
   <ApolloProvider client={client} store={store}>
       <div>
         <App />
       </div>
   </ApolloProvider>,
   document.getElementById('root')
);