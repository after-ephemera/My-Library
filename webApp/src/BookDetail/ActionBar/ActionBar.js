/**
 * Created by jk on 6/7/17.
 */
import React from 'react';
import {StyleSheet, css} from "aphrodite";
import StarRating from "../../StarRating/StarRating";

const styles = StyleSheet.create({
  flexParent: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  checkboxWrapper:{
    width: '1em',
    height: '1em',
    color: '#02CBD7',
  },
  check:{
    fontSize:'1.5em',
    position: 'relative',
    top: 3,
  },
  addedMessage:{
    opacity: 1,
    transition: '1s all ease',
    color: 'green',
  },
  hide:{
    opacity: 0,
  },
});

class ActionBar extends React.Component {

  addToWishlist(){
    console.log('Adding to wishlist');
    this.setState({addedToWishlist: !this.state.addedToWishlist});
  }

  constructor(props){
    super(props);
    this.state = {
      addedToLibrary: false,
      addedToWishlist: false,
      showAddedLibraryMessage: false,
      showAddedWishlistMessage: false,
    };
    this.addToWishlist = this.addToWishlist.bind(this);
    this.addToLibrary = this.props.onAddToLibrary;
    this.removeFromLibrary = this.props.onRemoveFromLibrary;
    this.setRating = this.props.onUpdateRating;
  }

  render(){
    if (this.props.owned) {
      return (
         <section className={css(styles.flexParent)}>
           <span><span className={css(styles.checkboxWrapper)}><span className={css(styles.check)}>&#x2713;</span></span> Owned</span>
           {this.props.numberOfCopies ? <span># of copies: {this.props.numberOfCopies}</span> : ''}
           <button>Loan</button>
           <button>I read it</button>
           <button onClick={this.removeFromLibrary}>Remove from Library</button>
           <StarRating starCount={this.props.rating} onUpdate={(rating) => this.setRating(rating)}/>
         </section>
      )
    } else {
      return (
         <section className={css(styles.flexParent)}>
           You don't own this book yet.
           {
             this.state.addedToLibrary ?
                <span className={this.state.showAddedLibraryMessage ? css(styles.addedMessage) : css(styles.hide)}>
                  Added to library!
                </span>
                : <button onClick={this.addToLibrary}>
                  Add to Library
                </button>}
           {this.state.addedToWishlist ? <span>Added to wishlist!</span> : <button onClick={this.addToWishlist}>Add to Wishlist</button>}
           <StarRating starCount={this.props.rating} onUpdate={(rating) => this.setRating(rating)}/>
         </section>
      )
    }
  }
}

export default ActionBar;