import React from 'react';
import {StyleSheet, css} from "aphrodite";
import books from './books.data';
import CardRow from './CardRow/CardRow';
import {truncateStringByWord} from '../utils/utils';
import AvatarMenu from "../AvatarMenu/AvatarMenu";

// A simple helper for the randomization of our card rows (so it looks more like real data).
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const styles = StyleSheet.create({
  libraryWrapper: {
    // color: 'blue',
    // backgroundColor: 'orange',
    width: '100%',
    height: '100%',
    transition: 'all 1s ease-out',
    position: 'absolute',
    // bottom: 0,
    top: '100vh',
    zIndex: 20,
    overflow: 'scroll',
    opacity: '0'
  },
  library: {
    position: 'absolute',
    top: 0
  },
  shiftIn: {
    // bottom: 900
    top: 0,
    opacity: '1'
  }
});

class Library extends React.Component {

  // Dummy data
  books = books;

  constructor() {
    super();

    for (let book of books) {
      book.title = truncateStringByWord(book.title, 24, true);
    }
  }

  // books1=this.books;
  books1 = shuffleArray(this.books.slice());
  books2 = shuffleArray(this.books.slice());
  // books3 = shuffleArray(this.books.slice());

  render() {
    return this.props.isLoggedIn ? (
       <div
       className={this.props.isLoggedIn ?
          css(styles.libraryWrapper, styles.shiftIn) :
          css(styles.libraryWrapper)}>
       <AvatarMenu/>
      <CardRow title="Featured" books={this.books1} isLoggedIn={this.props.isLoggedIn}/>
      <CardRow title="Your List" books={this.books2} isLoggedIn={this.props.isLoggedIn}/>
      {/*<CardRow title="Books your friends like" books={shuffleArray(this.books3)} isLoggedIn={this.props.isLoggedIn}/>*/}
    </div>
  ) : (<div>not logged in</div>)
  }
}

export default Library;