import React from 'react';
import {StyleSheet, css} from "aphrodite";
import Rx from 'rxjs';
import BookNotes from "./BookNotes/BookNotes";

const styles = StyleSheet.create({
  title:{
    margin: 0,
  },
  author:{
    marginTop: 0,
  },
  coverImage:{
    minHeight: '45vh',
    maxWidth: '100%',
    // marginTop: 20,
    padding: '0 10px',
  },
  flexParent:{
    display: 'flex',
    flexWrap: 'wrap',
  },
  flexHorizontal:{
    marginTop: 24,
    justifyContent: 'space-around',
  },
  flexVertical:{
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50vw',
    padding: '0 20px',
  },
  loadingImage:{
    width: 350,
    height: 519,
    backgroundColor: 'beige',
    margin: '0 10px',
    display: 'inline-block',
  },
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
         // Get google books result for description.
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
       <section className={css(styles.flexParent, styles.flexHorizontal)}>
         {
           this.state.coverUrl ?
              <img src={this.state.coverUrl} className={css(styles.coverImage)} alt='Cover' />
              :
              <div className={css(styles.loadingImage)}>Loading...</div>
         }
         <div className={css(styles.flexParent, styles.flexVertical)}>
           {(this.state.title && this.state.author) ? (
              <section>
                <h3 className={css(styles.title)}>{this.state.title}</h3>
                <h4 className={css(styles.author)}>by {this.state.author}</h4>
              </section>) : 'Loading...'
           }
           <span>{this.state.description}</span>
           {this.owned ? <BookNotes editing="true" label="Private Notes" content={this.state.notes} />: ''}
         </div>
         {/*<BookActionBox />*/}
       </section>
    )
  }
}

export default BookDetail;