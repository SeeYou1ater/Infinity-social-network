import React, { useState } from 'react';
import './Description.css';
import noPhoto from './../../../../../assets/images/no-photo.jpg';
import ProfileStatusWithHooks from './Status/StatusWithHooks';
import AboutMe from './AboutMe/AboutMe';
import AboutMeEditForm from './AboutMe/AboutMeEditForm/AboutMeEditForm';

function Description(props) {

  const [editMode, setEditMode] = useState(false)

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const activateProfileEditMode = () => {
    setEditMode(true)
  }

  const onSubmit = (editDataAboutMe) => {
    props.saveProfile(editDataAboutMe).then( () => {
      setEditMode(false)
    })
  }

  return (   
      <>
        <img className='photo' src={props.profile.photos.large || noPhoto} alt="#" />
        { props.isOwner && <input type='file' onChange={onMainPhotoSelected} /> }
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        { editMode ? <AboutMeEditForm initialValues={props.profile} onSubmit={onSubmit} isOwner={props.isOwner} profile={props.profile}/> : <AboutMe activateProfileEditMode={activateProfileEditMode} isOwner={props.isOwner} profile={props.profile}/>}
      </>
  )}

export default Description;