import React from 'react';
import './Description.css';
import noPhoto from './../../../../../assets/images/no-photo.jpg';
import ProfileStatusWithHooks from './Status/StatusWithHooks';

function Description(props) {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  return (   
      <>
        <img className='photo' src={props.profile.photos.large || noPhoto} alt="#" />
        { props.isOwner && <input type='file' onChange={onMainPhotoSelected} /> }
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        <div className='profile-description'>Какое то описание профиля</div>
      </>
  )}

export default Description;