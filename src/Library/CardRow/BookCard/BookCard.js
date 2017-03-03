import React from 'react';
import {StyleSheet, css} from "aphrodite";

const bookStyles = StyleSheet.create({
    wrapper:{
        minWidth: 170,
        flexGrow:'4',
        minHeight: 240,
        margin: 4,
        borderRadius: 8,
        textAlign:'center'
    },
    imageWrapper:{
        minWidth: 150,
        // maxWidth: 150,
        minHeight: 230
    },
    thumbnail:{
        width: 140,
        margin: 5,
        transition: 'all .1s ease',
        ':after': {
            opacity: 1
        },
    },
    hoverZoom:{
        ':hover':{
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

let BookCard = (props) => (
    <div className={css(bookStyles.wrapper)}>
        <div className={css(bookStyles.imageWrapper)}>
            <img className={props.book.coverThumb ? css(bookStyles.thumbnail, bookStyles.hoverZoom) : css(bookStyles.thumbnail)}
                 src={props.book.coverThumb || 'http://vignette3.wikia.nocookie.net/vocaloid/images/6/6a/Book_placeholder.png/revision/latest?cb=20140717130031'}
                 alt={props.book.title}/>
        </div>
        <span className={css(bookStyles.title)}>{props.book.title}</span>
    </div>
);

export default BookCard;