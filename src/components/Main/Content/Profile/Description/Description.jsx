import React from 'react';
import './Description.css';
import ProfileStatus from './Status/Status';
import ProfileStatusWithHooks from './Status/StatusWithHooks';

function Description(props) {
  return (
    <div>
      <div>
        <img className='photo' src={props.profile.photos.large} alt="#" />
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        <div className='profile-description'>Какое то описание профиля</div>
      </div>
    </div>
  )}

export default Description;