import React from 'react';
import Rx from "rxjs";
import * as _ from 'lodash';
import CardRow from "../Library/CardRow/CardRow";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

class SearchResults extends React.Component {

  constructor(props){
    console.error("something here");
    super(props);
    this.state = {
      query: decodeURIComponent(props.query),
      results: [],
      chunks: [],
    };
    this.arrangeResults = this.arrangeResults.bind(this);
    this.getBooks= this.getBooks.bind(this);
    this.getBooks();
  }

  getBooks = (query)=>{
    this.setState({chunks: []});
    // this.setState({query:this.props.query});
    Rx.Observable.ajax({url: `http://openlibrary.org/search.json?q=` + decodeURIComponent(query), crossDomain: true})
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
  };

  arrangeResults = (books) =>{
    let numRows = Math.ceil(books.length / 5) ;
    //Divide the results list into rows of 5.
    this.setState({chunks: _.chunk(books, 5)});
  };

  render = ()=> {
    // this.setState({query: this.props.query});
    return (<section>
      <AvatarMenu searchCallback={(query)=>this.getBooks(query)} />
      <section style={{overflow: 'scroll'}}>
        {(()=>{
          if(this.state.chunks.length === 0){
            // Show loading icon
            // return <section>loading...</section>
            return (<LoadingIcon/>);
          }else {
            return this.state.chunks.map((chunk, index) => <CardRow key={index} books={chunk}/>);
          }
        })()}
      </section>
    </section>)
  };
}
export default SearchResults;
