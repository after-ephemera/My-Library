import React from 'react';
import {StyleSheet, css} from "aphrodite";
import avatarImage from '../avatar.png';
import {Link} from "react-router-dom";

const styles = StyleSheet.create({
  a:{
    cursor: 'pointer',
  },
  avatar: {
    width: 54,
    height: 54,
    backgroundImage: `url(${avatarImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    borderRadius: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 16,
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
    clip: 'rect(0 23px 15px -4px)',
    position: 'absolute',
    top: -15,
    left: 138,
    ':after':{
      content: '""',
      display:'block',
      width: 22,
      height: 22,
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
          <ul onClick={this.toggleMenu}>
            <li><Link  className={css(styles.a)} to={'/'}>Home</Link></li>
            <li><Link  className={css(styles.a)} to={'/detail/69045'}>Details</Link></li>
          </ul>
        </div>
      </section>
    )
  }
}

export default AvatarMenu;