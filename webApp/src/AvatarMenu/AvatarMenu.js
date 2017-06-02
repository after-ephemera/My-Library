import React from 'react';
import {StyleSheet, css} from "aphrodite";
import avatarImage from '../avatar.png';

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    backgroundImage: `url(${avatarImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    borderRadius: 100,
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 10
  },
  hideMenu:{
    display: 'none'
  },
  showMenu:{
    display: 'inherit',
    position: 'absolute',
    right: 24,
    backgroundColor: 'white',
    top: 68,
  },
  triangle:{
    width: 60,
    height: 30,
    borderBottom: 'solid 30px white',
    borderLeft: 'solid 30px transparent',
    borderRight: 'solid 30px transparent',
    margin: '0 5px',
    position: 'relative',
    top: '-29px',
    left: '55px',
  },
});

class AvatarMenu extends React.Component {

  constructor(){
    super();
    this.state = {
      showMenu: false
    }
  }

  toggleMenu = ()=>{
    console.log('Toggling');
    this.setState({showMenu: !this.state.showMenu})
  };

  render(){
    return(
      <section>
        <div className={css(styles.avatar)}  onClick={this.toggleMenu}/>
        <div className={this.state.showMenu ? css(styles.showMenu): css(styles.hideMenu)}>
          <div className={css(styles.triangle)} />
          <ul>
            <li>Something</li>
            <li>Something</li>
            <li>Something</li>
            <li>Something</li>
          </ul>
        </div>
      </section>
    )
  }
}

export default AvatarMenu;