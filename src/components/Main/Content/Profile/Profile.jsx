import React from 'react';
import './Profile.css';
import Description from './Description/Description';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../../../common/Preloader/Preloader';

function Profile(props) {
  if (!props.dataProfile.profile) {
    return <Preloader/>
  }
  
  return (
    <div className='App__profile'>
      <Description savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.dataProfile.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer   dataProfile = {props.dataProfile}/> 
      </div>
  )}
  
export default Profile;