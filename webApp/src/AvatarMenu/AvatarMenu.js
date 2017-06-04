import React from 'react';
import {StyleSheet, css} from "aphrodite";
import avatarImage from '../avatar.png';

const styles = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    backgroundImage: `url(${avatarImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    borderRadius: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10
  },
  hideMenu:{
    display: 'none'
  },
  showMenu:{
    display: 'inherit',
    position: 'absolute',
    // right: 24,
    right: 'calc(50% - 150px)',
    backgroundColor: 'white',
    top: 71,
    minHeight: 200,
    minWidth: 300,
    width: 300,
    maxWidth: 300,
    borderRadius: 8,
    boxShadow: '0 1px 2px rgba(0,0,0,.25), 0 0 1px rgba(0,0,0,.35)',
  },
  popoverArrow:{
    clip: 'rect(0 18px 14px -4px)',
    position: 'absolute',
    top: -14,
    left: 142,
    ':after':{
      content: '""',
      display:'block',
      width: 14,
      height: 14,
      background: '#fff',
      transform: 'rotate(45deg) translate(6px,6px)',
      boxShadow: '-1px -1px 1px -1px rgba(0,0,0,.44)',
    }
  }
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
          <div className={css(styles.popoverArrow)} />
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