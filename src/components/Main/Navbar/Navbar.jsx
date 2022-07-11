import React from 'react';
import { connect } from 'react-redux';
import './Navbar.css';
import NavBarItem from './NavBarItem/NavbarItem';

function Navbar (props) {
  return (
    <section className='App__nav'>
      <ul>
        <NavBarItem item="News" path="/news"/>
        <NavBarItem item="My profile" path={`/profile/${props.authId}`}/>
        <NavBarItem item="Find Users" path="/findUsers"/>
        <NavBarItem item="Friends" path="/friends"/>
        <NavBarItem item="Messages" path="/messages"/>
        <NavBarItem item="Music" path="/music"/>
        <NavBarItem item="Videos" path="/videos"/>
        <NavBarItem item="Games" path="/games"/>
        <NavBarItem item="Settings" path="/settings"/>
        <NavBarItem item="Exit" path="/exit"/>
      </ul>
    </section>
  )}

let mapStateToProps = (state) => {
  return {
    authId: state.auth.id
  }
}

export default connect(mapStateToProps, null)(Navbar);