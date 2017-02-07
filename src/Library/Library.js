import React from 'react';
import {StyleSheet, css} from "aphrodite";

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
        opacity: '0'
    },
    shiftIn: {
        // bottom: 900
        top: 0,
        opacity: '.6'
    },
    bookRow:{
        width: '100%',
        display: 'flex',
        // justifyContent: 'center',
        // flexDirection: 'row',
        // flexWrap: 'noWrap',
        overflow: 'scroll'
    }
});

class Library extends React.Component{
    constructor(){
        super();
    }

    books = [
        {title: 'The Hiitchiker\'s Guide to the Galaxy', key: 0},
        {title: 'Lord of the Rings', key: 1},
        {title: 'The Book of Mormon', key:2},
        {title: 'The Hiitchiker\'s Guide to the Galaxy', key: 3},
        {title: 'Lord of the Rings', key: 4},
        {title: 'The Book of Mormon', key:5},
        {title: 'The Hiitchiker\'s Guide to the Galaxy', key: 6},
        {title: 'Lord of the Rings', key: 7},
        {title: 'The Book of Mormon', key:8},
        {title: 'The Hiitchiker\'s Guide to the Galaxy', key: 9},
        {title: 'Lord of the Rings', key: 10},
        {title: 'The Book of Mormon', key:11},
        {title: 'The Hiitchiker\'s Guide to the Galaxy', key: 13},
        {title: 'Lord of the Rings', key: 14},
        {title: 'The Book of Mormon', key:15}
    ];

    render(){
        return <div>
            {/*{this.props.isLoggedIn ? "L" : "Not l"}ogged in.*/}
            <CardRow title="Featured" books={this.books} isLoggedIn={this.props.isLoggedIn}/>
            {/*<CardRow title="New York Times Top List" books={this.books} isLoggedIn={this.props.isLoggedIn}/>*/}
            {/*<CardRow title="Books your friends like" books={this.books} isLoggedIn={this.props.isLoggedIn}/>*/}
        </div>
    }
}

export default Library;

const bookStyles = StyleSheet.create({
   wrapper:{
       minWidth: 150,
       maxWidth: 150,
       height: 240,
       backgroundColor: 'silver',
       margin: 4
   }
});

let CardRow = (props) =>(
    <div
        className={props.isLoggedIn ?
            css(styles.libraryWrapper, styles.shiftIn) :
            css(styles.libraryWrapper)}>
        {props.title}
        <div className={css(styles.bookRow)}>
            {props.books.map(book => <BookCard key={book.key} book={book.title}/>)}
        </div>
    </div>
);

let BookCard = (props) => (
    <div className={css(bookStyles.wrapper)}>
        {props.book}
    </div>
);