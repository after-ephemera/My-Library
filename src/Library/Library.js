import React from 'react';
import {StyleSheet, css} from "aphrodite";
import books from './books.data';

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
    library:{
        position:'absolute',
        top:0
    },
    shiftIn: {
        // bottom: 900
        top: 0,
        opacity: '1'
    },
    bookRow:{
        width: '100%',
        display: 'flex',
        // justifyContent: 'center',
        // flexDirection: 'row',
        flexWrap: 'noWrap',
        overflowX: 'scroll'
    }
});

class Library extends React.Component{
    constructor(){
        super();
    }

    // Dummy data
    books = books;

    // books1=this.books;
    books1 = shuffleArray(this.books.slice());
    books2 = shuffleArray(this.books.slice());
    books3 = shuffleArray(this.books.slice());

    render(){
        return <div
            className={this.props.isLoggedIn ?
                css(styles.libraryWrapper, styles.shiftIn) :
                css(styles.libraryWrapper)}>
            {/*{this.props.isLoggedIn ? "L" : "Not l"}ogged in.*/}
            <CardRow title="Featured" books={this.books1} isLoggedIn={this.props.isLoggedIn}/>
            {/*<CardRow title="New York Times Top List" books={shuffleArray(this.books2)} isLoggedIn={this.props.isLoggedIn}/>*/}
            {/*<CardRow title="Books your friends like" books={shuffleArray(this.books3)} isLoggedIn={this.props.isLoggedIn}/>*/}
        </div>
    }
}

export default Library;

const bookStyles = StyleSheet.create({
    wrapper:{
        minWidth: 150,
        maxWidth: 150,
        minHeight: 240,
        margin: 4,
        // backgroundColor: '#eee',
        borderRadius: 8,
        // opacity: '.6',
    },
    imageWrapper:{
        minWidth: 150,
        maxWidth: 150,
        minHeight: 230
    },
    thumbnail:{
        width: 140,
        margin: 5,
        transition: 'all .1s ease',
        ':after': {
            opacity: 1
        },
        ':hover':{
            // backgroundColor: '#bbb',
            filter: 'drop-shadow(8px 8px 10px #bbb)',
            transform: 'scale(1.05,1.05)'
        },
    },
    title:{
        float:'bottom',
        fontSize: 14,
        margin: 5
    }
});

let CardRow = (props) =>(
    <section>
        <h1>{props.title}</h1>
        <div className={css(styles.bookRow)}>
            {props.books.map(book => <BookCard key={book.key} book={book}/>)}
        </div>
    </section>
);

let BookCard = (props) => (
    <div className={css(bookStyles.wrapper)}>
        <div className={css(bookStyles.imageWrapper)}>
            <img className={css(bookStyles.thumbnail)}
                 src={props.book.coverThumb || 'http://vignette3.wikia.nocookie.net/vocaloid/images/6/6a/Book_placeholder.png/revision/latest?cb=20140717130031'}
                 alt={props.book.title}/>
        </div>
        <span className={css(bookStyles.title)}>{props.book.title}</span>
    </div>
);