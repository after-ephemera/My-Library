import React from 'react';
import {StyleSheet, css} from "aphrodite";
import books from './books.data';
import CardRow from './CardRow/CardRow';
import {truncateStringByWord} from '../utils/utils';

// A simple helper for the randomization of our card rows (so it looks more like real data).
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const styles = StyleSheet.create({
  libraryWrapper: {
    width: '100%',
    height: '100%',
    transition: 'all 1s ease-out',
    position: 'absolute',
    // bottom: 0,
    top: '100vh',
    zIndex: 20,
    overflow: 'scroll',
    opacity: '0',
    marginTop: 50,
  },
  library: {
    position: 'absolute',
    top: 0
  },
  shiftIn: {
    top: 0,
    opacity: '1',
  }
});

class Library extends React.Component {

  // Dummy data
  books = books;

  constructor(props) {
    super(props);

    for (let book of books) {
      book.title = truncateStringByWord(book.title, 24, true);
    }
    console.log('Props: ', this.props);
  }

  // books1=this.books;
  books1 = shuffleArray(this.books.slice());
  books2 = shuffleArray(this.books.slice());
  // books3 = shuffleArray(this.books.slice());

  render() {
    return (
      <section>
        <div
          className={this.props.isLoggedIn ?
          css(styles.libraryWrapper, styles.shiftIn) :
          css(styles.libraryWrapper)}>

          {this.props.isLoggedIn ? (
            <section>
              <CardRow title="Featured" books={this.books1} isLoggedIn={this.props.isLoggedIn}/>
              <CardRow title="Your List" books={this.books2} isLoggedIn={this.props.isLoggedIn}/>
            </section>
          ) : (<div>not logged in</div>)}
        </div>
        {/*<h1>{this.props.isLoggedIn ? 'Logged in' : 'Logged out'}</h1>*/}
      </section>)
  }
}

export default Library;