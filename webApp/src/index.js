import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import BookDetail from "./BookDetail/BookDetail";
import AvatarMenu from "./AvatarMenu/AvatarMenu";


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
