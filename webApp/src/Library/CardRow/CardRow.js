import React from 'react';
import {StyleSheet, css} from "aphrodite";
import BookCard from './BookCard/BookCard';

const styles = StyleSheet.create({
  bookRow: {
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'row',
    flexWrap: 'noWrap',
    justifyContent: 'space-around',
  }
});

let CardRow = (props) => (
   <section>
     <h1>{props.title}</h1>
     <div className={css(styles.bookRow)}>
       {props.books.map(book => <BookCard key={book.key} book={book}/>)}
     </div>
   </section>
);

export default CardRow;