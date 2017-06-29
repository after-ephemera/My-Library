import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Main from "./Main";
import BookDetail from "./BookDetail/BookDetail";
import NotificationCenter from "./NotificationCenter/NotificationCenter";

const App = () => (
   <div>
     <NotificationCenter />

     <main>
       <Route path="/" component={Main}/>
       <Route exact path="/detail/:bookID" component={BookDetail} />
       <Route exact path="/detail" render={() => (
             <Redirect to="/"/>
       )}/>
     </main>
   </div>
);

export default App;
