import React from 'react';
import {StyleSheet, css} from "aphrodite";
import avatarImage from '../avatar.png';
import {Link} from "react-router-dom";

const styles = StyleSheet.create({
  wrapper:{
    fontSize: '1em',
  },
  menuList:{
    paddingLeft: '0',
    display: 'flex',
    flexDirection: 'column',
  },
  li:{
    listStyle: 'none',
    listStylePosition: 'outside',
  },
  a:{
    cursor: 'pointer',
    color: '#424242',
    textDecoration: 'none'
  },
  hrWrapper:{
    height: 12,
    color: '#dddddd',
    listStyle: 'none',
    listStylePosition: 'outside',
    ':after':{
      color: '#dddddd',
      height:'0px',
      content: '""',
      display: 'block',
    }
  },
  hr:{
    // color: '#dddddd',
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
    right: 'calc(50% - 150px)',
    backgroundColor: 'white',
    top: 71,
    minHeight: 200,
    minWidth: 300,
    width: 300,
    maxWidth: 300,
    borderRadius: 8,
    boxShadow: '0 1px 2px rgba(0,0,0,.25), 0 0 1px rgba(0,0,0,.35)',
    zIndex: 22,
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
  },
  overlay:{
    width: '100vw',
    height: '100vh',
    // opacity: .3,
    // backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchBar:{
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: '1em',
    fontWeight: '200',
    padding: ' 4px 12px',
    borderRadius: 23,
    minWidth: 240,
    position: 'relative',
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
      <section className={css(styles.wrapper)}>
        {/*<h2 style={{position:'absolute'}}>{JSON.stringify(location.href.split('3000').pop() || 'no location')}</h2>*/}
        <div className={css(styles.avatar)}  onClick={this.toggleMenu}/>
        <div className={this.state.showMenu ? css(styles.overlay) : ''} onClick={this.toggleMenu} />
        <div className={this.state.showMenu ? css(styles.showMenu): css(styles.hideMenu)}>
          <div className={css(styles.popoverArrow)} />
            <ul className={css(styles.menuList)}>

              <input type="text" placeholder="search by title, author, etc." className={css(styles.searchBar)} />

              <li className={css(styles.hrWrapper)}><hr className={css(styles.hr)} /></li>

              <li onClick={this.toggleMenu} className={css(styles.li)}>
                <Link className={css(styles.a)} to={'/'}>My Library</Link>
              </li>

              <li onClick={this.toggleMenu} className={css(styles.li)}>
                <Link className={css(styles.a)} to={'/detail/69045'}>Details</Link>
              </li>

            </ul>
        </div>
      </section>
    )
  }
}

export default AvatarMenu;