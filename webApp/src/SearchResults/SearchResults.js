import React from 'react';
import Rx from "rxjs";
import * as _ from 'lodash';
import CardRow from "../Library/CardRow/CardRow";

class SearchResults extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      query: decodeURIComponent(props.match.params.query),
      results: [],
      chunks: [],
    };
    this.arrangeResults = this.arrangeResults.bind(this);
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
       .map(books =>{
         this.setState({results: books});
         return books.map((book, index) =>{
           book.key = index;
           return book;
         });
       })
       .subscribe(books => {
            console.log(books);
            // this.setState({description: books.response.items[0].volumeInfo.description});
            this.arrangeResults(this.state.results);
          },
          err=>{
            console.error('My Library Error: ', err);
       });
  }

  arrangeResults = (books) =>{
    let numRows = Math.ceil(books.length / 5) ;
    //Divide the results list into rows of 5.
    this.setState({chunks: _.chunk(books, 5)});
  };

  render = ()=> {
    return (<section>
      {this.state.chunks.map(chunk => <CardRow books={chunk} />)}
    </section>)
  };
}
export default SearchResults;
