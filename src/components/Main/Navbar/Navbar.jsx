import React from 'react';
import './Navbar.css';
import NavBarItem from './NavBarItem/NavbarItem';

function Navbar () {
  return (
    <section className='App__nav'>
      <ul>
        <NavBarItem item="News" path="/news"/>
        <NavBarItem item="Profile" path="/profile"/>
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

export default Navbar;