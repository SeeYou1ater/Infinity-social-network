import React from 'react';
import './Profile.css';
import Description from './Description/Description';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../../../common/Preloader/Preloader';
import { PostType, ProfileType } from '../../../../types/types';
import { FormPostDataType } from './ProfileContainer';
import { DataProfileType } from '../../../../redux/profileReducer';

type ProfilePropsType = {
  isAuth: boolean
  isOwner: boolean
  dataProfile: DataProfileType
  dataPosts: Array<PostType>
  savePhoto: (filePhoto: any) => void
  status: string
  updateStatus: (status: string) => void
  addNewPost: (dataFormMessage: FormPostDataType) => void
}

const Profile: React.FC<ProfilePropsType> = (props) => {
  if (!props.dataProfile.profile) {
    return <Preloader/>
  } 
  
  return (
    <>
      <Description savePhoto={props.savePhoto} isOwner={props.isOwner} dataProfile={props.dataProfile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer isOwner={props.isOwner} dataPosts={props.dataPosts} dataProfile={props.dataProfile} addNewPost={props.addNewPost}/>
    </> 
  )}
  
export default Profile;