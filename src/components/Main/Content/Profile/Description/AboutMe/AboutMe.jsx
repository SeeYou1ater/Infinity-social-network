import React from 'react';
import './AboutMe.css';
import ContactItem from './Contactitem/ContactItem';

function AboutMe(props) {
  return (
    <div className='App__description-aboutMeform'>
      { props.isOwner && <button onClick={props.activateProfileEditMode}>Edit profile</button> }
      <div className='App__description-aboutMe-list'>
        <div>
          <h3>Full name: {props.profile.fullName}</h3>
        </div >
        <div>
          <h3><b>Contacts:</b></h3>
          <div className='App__contacts-list'>
            { Object.keys(props.profile.contacts).map( key => { return <ContactItem key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>}) }
          </div>
        </div>
        <div>
          <h3><b>Looking for a job:</b>{props.profile.lookingForAJob ? 'yes' : 'no'}</h3> 
        </div>
        <div>
          <h3><b>About me:</b></h3>{props.profile.aboutMe}
        </div>
        <div>
          <h3><b>My proffesional skills:</b></h3>{props.profile.lookingForAJobDescription}
        </div>   
      </div> 
    </div>
  )
}

export default AboutMe;