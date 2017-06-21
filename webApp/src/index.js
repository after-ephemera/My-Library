import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import BookDetail from "./BookDetail/BookDetail";
import AvatarMenu from "./AvatarMenu/AvatarMenu";

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Redirect.md
ReactDOM.render(
   <Router>
     <div>
       <AvatarMenu/>
       <Route exact path="/" component={App} />
       <Route path="/detail/:bookID" component={BookDetail} />
     </div>
   </Router>,
   document.getElementById('root')
);
