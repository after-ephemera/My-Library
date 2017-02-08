import React from 'react';
import {StyleSheet, css} from "aphrodite";

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
        opacity: '0',
        zIndex: 20
    },
    library:{
        position:'absolute',
        top:0
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
        overflowX: 'scroll'
    }
});

class Library extends React.Component{
    constructor(){
        super();
    }

    books = [
        {
            title: 'The Hiitchiker\'s Guide to the Galaxy',
            coverThumb: '',
            key: 0
        },
        {
            title: 'Lord of the Rings',
            coverThumb: 'http://covers.openlibrary.org/b/ID/583487-M.jpg',
            key: 1
        },
        {
            title: 'The Book of Mormon',
            coverThumb: 'http://covers.openlibrary.org/b/ID/146516-M.jpg',
            key:2
        },
        {
            title: 'The Hiitchiker\'s Guide to the Galaxy',
            coverThumb: '',
            key: 3
        },
        {
            title: 'Lord of the Rings',
            coverThumb: 'http://covers.openlibrary.org/b/ID/583487-M.jpg',
            key: 4
        },
        {
            title: 'The Book of Mormon',
            coverThumb: 'http://covers.openlibrary.org/b/ID/146516-M.jpg',
            key:5
        },
        {
            title: 'The Hiitchiker\'s Guide to the Galaxy',
            coverThumb: '',
            key: 6
        },
        {
            title: 'Lord of the Rings',
            coverThumb: 'http://covers.openlibrary.org/b/ID/583487-M.jpg',
            key: 7
        },
        {
            title: 'The Book of Mormon',
            coverThumb: 'http://covers.openlibrary.org/b/ID/146516-M.jpg',
            key:8
        },
        {
            title: 'The Hiitchiker\'s Guide to the Galaxy',
            coverThumb: '',
            key: 9}
            ,
        {
            title: 'Lord of the Rings',
            coverThumb: 'http://covers.openlibrary.org/b/ID/583487-M.jpg',
            key: 10
        },
        {
            title: 'The Book of Mormon',
            coverThumb: 'http://covers.openlibrary.org/b/ID/146516-M.jpg',
            key:11
        },
        {
            title: 'The Hiitchiker\'s Guide to the Galaxy',
            coverThumb: '',
            key: 13
        },
        {
            title: 'Lord of the Rings',
            coverThumb: 'http://covers.openlibrary.org/b/ID/583487-M.jpg',
            key: 14
        },
        {
            title: 'The Book of Mormon',
            coverThumb: 'http://covers.openlibrary.org/b/ID/146516-M.jpg',
            key:15
        }
    ];

    books1 = shuffleArray(this.books.slice());
    books2 = shuffleArray(this.books.slice());
    books3 = shuffleArray(this.books.slice());

    render(){
        return <div
            className={this.props.isLoggedIn ?
                css(styles.libraryWrapper, styles.shiftIn) :
                css(styles.libraryWrapper)}>
            {/*{this.props.isLoggedIn ? "L" : "Not l"}ogged in.*/}
            <CardRow title="Featured" books={shuffleArray(this.books1)} isLoggedIn={this.props.isLoggedIn}/>
            <CardRow title="New York Times Top List" books={shuffleArray(this.books2)} isLoggedIn={this.props.isLoggedIn}/>
            <CardRow title="Books your friends like" books={shuffleArray(this.books3)} isLoggedIn={this.props.isLoggedIn}/>
        </div>
    }
}

export default Library;

const bookStyles = StyleSheet.create({
   wrapper:{
       minWidth: 150,
       maxWidth: 150,
       minHeight: 240,
       backgroundColor: '#ddd',
       margin: 4
   }
});

let CardRow = (props) =>(
    <section>
        {props.title}
        <div className={css(styles.bookRow)}>
            {props.books.map(book => <BookCard key={book.key} book={book}/>)}
        </div>
    </section>
);

let BookCard = (props) => (
    <div className={css(bookStyles.wrapper)}>
        <img src={props.book.coverThumb} alt={props.book.title}/>
        {props.book.title}
    </div>
);