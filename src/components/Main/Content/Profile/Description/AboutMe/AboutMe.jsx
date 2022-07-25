import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileStatus from '../Status/ProfileStatus';
import './AboutMe.css';
import ContactItem from './ContactItem/ContactItem';

function AboutMe(props) {
  return (
    <div className='App__description-aboutMeform'>
      <h3 className='App_profile-fullName'>{props.profile.fullName}</h3>
      <ProfileStatus isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
      <div className='App__description-aboutMe-list'>
        <div>
          <p className='App__profile-contacts-title'><b>Contacts:</b></p>
          { props.isOwner && <NavLink to='/settings'><p className='App__description-editProfile'>Edit profile</p></NavLink>}
          <div className='App__contacts-list'>
            { Object.keys(props.profile.contacts).map( key => { return <ContactItem key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>}) }
          </div>
        </div>
        <div>
          <p><b>Looking for a job:</b>{props.profile.lookingForAJob ? 'yes' : 'no'}</p> 
        </div>
        <div>
          <p><b>About me:</b></p>{props.profile.aboutMe}
        </div>
        <div>
          <p><b>My proffesional skills:</b></p>{props.profile.lookingForAJobDescription}
        </div>   
      </div> 
    </div>
  )
}

export default AboutMe;