import React from 'react';
import { NavLink } from 'react-router-dom';
import { ContactsType, ProfileType } from '../../../../../../types/types';
import ProfileStatus from '../Status/ProfileStatus';
import './AboutMe.css';
import ContactItem from './ContactItem/ContactItem';

type AboutMePropsType = {
  profile: ProfileType | null
  isOwner: boolean
  status: string
  updateStatus: (status: string) => void
}

const AboutMe: React.FC<AboutMePropsType> = (props) => {
  return (
    <div className='App__description-aboutMeform'>
      <h3 className='App__profile-fullName'>{props.profile?.fullName}</h3>
      <ProfileStatus isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
      <div className='App__description-aboutMe-list'>
        <div>
          <p className='App__profile-contacts-title'><b>Contacts</b></p>
          { props.isOwner && <NavLink to='/profile-settings'><p className='App__description-editProfile'>Edit profile</p></NavLink>}
          <div className='App__contacts-list'>
            { Object.keys(props.profile!.contacts).map(key => { return <ContactItem key={key} contactTitle={key} contactValue={props.profile?.contacts[key as keyof ContactsType]}/>}) }
          </div>
        </div>
      </div>
      <div>
        <p className='App__description-aboutMeform-item'><b>Looking for a job</b></p><p className='App__description-aboutMeform-valueItem'>{props.profile?.lookingForAJob ? 'Yes' : 'No'}</p>
      </div>
      <div>
        <p className='App__description-aboutMeform-item'><b>My proffesional skills</b></p><p className='App__description-aboutMeform-valueItem'>{props.profile?.lookingForAJobDescription}</p>
      </div> 
      <div>
        <p className='App__description-aboutMeform-item'><b>About me</b></p><p className='App__description-aboutMeform-valueItem'>{props.profile?.aboutMe}</p>
      </div>  
    </div> 
  )
}

export default AboutMe;