/**
 * Created by jk on 6/7/17.
 */
import React from 'react';
import star from '../../public/ic_star_black_24px.svg';
import emptyStar from '../../public/ic_star_border_black_24px.svg';
import {StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
  wrapper:{
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  }
});

class StarRating extends React.Component{

  setTemp(val){
    this.setState({starCount: val});
  }

  reset(){
    this.setState({starCount: this.props.starCount});
  }

  constructor(props){
    super(props);
    this.state ={
      starCount: this.props.starCount,
    };
    this.setTemp = this.setTemp.bind(this);
    this.reset = this.reset.bind(this);
    this.updateStarCount = this.props.onUpdate
  }

  render(){
    return (
       <section className={css(styles.wrapper)}>
         <img src={this.state.starCount >= 1 ? star : emptyStar} alt="Star 1" onMouseOver={() => this.setTemp(1)} onMouseLeave={this.reset}  onClick={()=> this.updateStarCount(1)} />
         <img src={this.state.starCount >= 2 ? star : emptyStar} alt="Star 2" onMouseOver={() => this.setTemp(2)} onMouseLeave={this.reset}  onClick={()=> this.updateStarCount(2)} />
         <img src={this.state.starCount >= 3 ? star : emptyStar} alt="Star 3" onMouseOver={() => this.setTemp(3)} onMouseLeave={this.reset}  onClick={()=> this.updateStarCount(3)} />
         <img src={this.state.starCount >= 4 ? star : emptyStar} alt="Star 4" onMouseOver={() => this.setTemp(4)} onMouseLeave={this.reset}  onClick={()=> this.updateStarCount(4)} />
       </section>
    )
  }
};

export default StarRating;