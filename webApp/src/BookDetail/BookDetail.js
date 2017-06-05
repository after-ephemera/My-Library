import React from 'react';
import {StyleSheet, css} from "aphrodite";
import Rx from 'rxjs';

const styles = StyleSheet.create({
  coverImage:{
    maxHeight: '80vh',
    minHeight: '60vh',
  },
  flexParent:{
    display: 'flex',
  },
  flexVertical:{
    flexDirection: 'column'
  },

  notes:{
    boxShadow: '0 1px 2px rgba(0,0,0,.25), 0 0 1px rgba(0,0,0,.35)',
    border: 'none',
  }
});

class BookDetail extends React.Component {
  books = [];
  owned = true;

  constructor(){
    super();
    this.state = {
    };
    Rx.Observable.ajax({url: `http://openlibrary.org/search.json?q=enders+in+exile`, crossDomain: true})
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
             coverUrl: `http://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`,
             isbn: book.isbn,
           }
         });
       })
       .flatMap(books =>{
         this.setState(books[0]);
         return Rx.Observable.ajax({url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${books[0].isbn[0]}`, crossDomain: true});
       })
       .subscribe(books => {
         console.log(books);
         this.setState({description: books.response.items[0].volumeInfo.description});
       },
       err=>{
         console.error('My Library Error: ', err);
       })
  }

  render(){
    return(
       <section className={css(styles.flexParent)}>
         <img src={this.state.coverUrl} className={css(styles.coverImage)} alt={this.state.coverUrl ? 'Cover Image' : 'No Cover Image'} />
         <div className={css(styles.flexParent, styles.flexVertical)}>
           <h3>{this.state.title} by {this.state.author}</h3>
           <span>{this.state.description}</span>
           {this.owned ? <textarea className={css(styles.notes)}></textarea>: ''}
         </div>
         {/*<BookActionBox />*/}
       </section>
    )
  }
}

export default BookDetail;