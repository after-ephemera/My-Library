import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { Provider } from 'react-redux'
import store from './store';
import {ApolloProvider, ApolloClient, createNetworkInterface} from "react-apollo";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({uri: 'http://localhost:3000/api',}),
});

ReactDOM.render(
   <ApolloProvider client={client} store={store}>
       <div>
         <App />
       </div>
   </ApolloProvider>,
   document.getElementById('root')
);