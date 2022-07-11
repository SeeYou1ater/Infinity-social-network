import React from 'react';
import { connect } from 'react-redux';
import './Navbar.css';
import NavBarItem from './NavBarItem/NavbarItem';
import appNews from './../../../assets/icons/white/appNews.png';
import appMyProfile from './../../../assets/icons/white/appMyProfile.png';
import appFindUsers from './../../../assets/icons/white/appFindUsers.png';
import appFriends from './../../../assets/icons/white/appFriends.png';
import appMessages from './../../../assets/icons/white/appMessages.png';
import appMusic from './../../../assets/icons/white/appMusic.png';
import appVideos from './../../../assets/icons/white/appVideos.png';
import appGames from './../../../assets/icons/white/appGames.png';
import appSettings from './../../../assets/icons/white/appSettings.png';
import appOutput from './../../../assets/icons/white/appOutput.png';

function Navbar (props) {
  return (
    <section className='App__nav'>
      <ul>
        <NavBarItem icon={appNews} item="News" path="/news"/>
        <NavBarItem icon={appMyProfile} item="My profile" path={`/profile/${props.authId}`}/>
        <NavBarItem icon={appFindUsers} item="Find Users" path="/findUsers"/>
        <NavBarItem icon={appFriends} item="Friends" path="/friends"/>
        <NavBarItem icon={appMessages} item="Messages" path="/messages"/>
        <NavBarItem icon={appMusic} item="Music" path="/music"/>
        <NavBarItem icon={appVideos} item="Videos" path="/videos"/>
        <NavBarItem icon={appGames} item="Games" path="/games"/>
        <NavBarItem icon={appSettings} item="Settings" path="/settings"/>
        <NavBarItem icon={appOutput} item="Exit" path="/exit"/>
      </ul>
    </section>
  )}

let mapStateToProps = (state) => {
  return {
    authId: state.auth.id
  }
}

export default connect(mapStateToProps, null)(Navbar);