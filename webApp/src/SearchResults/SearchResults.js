import React from 'react';
import Rx from "rxjs";
import CardRow from "../Library/CardRow/CardRow";

class SearchResults extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      query: decodeURIComponent(props.match.params.query),
      results: [],
    };
    Rx.Observable.ajax({url: `http://openlibrary.org/search.json?q=` + this.state.query, crossDomain: true})
       .map(res => res.response.docs)
       .map(books => {
         console.log(books);
         return books.map(book =>{
           let key = 'ID';
           let value = book.cover_i;
           let size = 'L';
           return {
             author: book.author_name? book.author_name[0] : 'Anonymous',
             title: book.title,
             coverThumb: (value) ? `http://covers.openlibrary.org/b/${key}/${value}-${size}.jpg` : undefined,
             isbn: book.isbn,
           }
         });
       })
       .flatMap(books =>{
         this.setState({results: books});
         // Get google books result for description.
         return Rx.Observable.ajax({url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${books[0].isbn[0]}`, crossDomain: true});
       })
       .subscribe(books => {
            console.log(books);
            this.setState({description: books.response.items[0].volumeInfo.description});
          },
          err=>{
            console.error('My Library Error: ', err);
       });
  }

  arrangeResults = (books) =>{
    let numRows = Math.ceil(books.length / 5) ;
    // [...Array(numRows).keys()]

  };

  render = ()=> {
    return (<section>
      {<CardRow books={row}/>}
    </section>)
  };
}
export default SearchResults;
