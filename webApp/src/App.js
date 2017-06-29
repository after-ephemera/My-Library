import React from 'react';
import { Route, Link } from 'react-router-dom';
import Main from "./Main";
import BookDetail from "./BookDetail/BookDetail";

const App = () => (
   <div>
     <header>
       <Link to="/">Home</Link>
       <Link to="/detail/:bookID">Details</Link>
     </header>

     <main>
       <Route exact path="/" component={Main} />
       <Route exact path="/detail/:bookID" component={BookDetail} />
     </main>
   </div>
);

export default App;
