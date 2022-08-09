import React, { useEffect } from 'react';
import './Profile.css';
import Profile from './Profile';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ConnectedWithAuthRedirect } from '../../../../hoc/connectedWithAuthRedirect';
import { useParams } from 'react-router-dom';
import { actions, DataProfileType, savePhotoThunkCreator, setUserProfileThunkCreator, setUserStatusThunkCreator, updateStatusThunkCreator } from '../../../../redux/profileReducer';
import { AppStateType } from '../../../../redux/redux-store';
import { PostType } from '../../../../types/types';
import Preloader from '../../../common/Preloader/Preloader';

export type FormPostDataType = {
  postText: string
  likes: number
  id: number
}

type MapStatePropsType = {
  dataProfile: DataProfileType
  dataPosts: Array<PostType>
  status: string
  authorizedUserId: number | null
  isAuth: boolean
}

type MapDispatchPropsType = {
  setUserProfile: (profileId: number) => void
  setUserStatus: (profileId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (filePhoto: any) => void
  addNewPost: (postText: string) => void
}

type OwnPropsType = {}

const ProfileContainer: React.FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = (props) => {

  let { profileId } = useParams<{profileId: string}>()
  let userId = Number(profileId)

  const refreshPage = () => {
      if (!userId) {
        console.log('UserId should be number!')
      } else {
        props.setUserProfile(userId)
        props.setUserStatus(userId)
      }
  }

  const addNewPost = (formData: FormPostDataType) => {
    props.addNewPost(formData.postText)
  }
  
  useEffect( () => {
    refreshPage()
  }, [profileId])

  if (!props.dataProfile.profile) {
    return <Preloader/>
  } else {
    return (
      <div className='App__profile'>
        <Profile  dataProfile = {props.dataProfile}
                  isOwner={Number(profileId) === props.authorizedUserId}
                  savePhoto={props.savePhoto}
                  isAuth={props.isAuth}
                  status={props.status}
                  updateStatus={props.updateStatus}
                  dataPosts={props.dataPosts}
                  addNewPost={addNewPost}/>
      </div>
    )
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  dataPosts: state.dataProfile.dataPosts,
  dataProfile: state.dataProfile,
  status: state.dataProfile.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth
})

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => ({
  setUserProfile: (profileId: number) => {
    dispatch(setUserProfileThunkCreator(profileId))
  },
  setUserStatus: (profileId: number) => {
    dispatch(setUserStatusThunkCreator(profileId))
  },
  updateStatus: (status: string) => {
    dispatch(updateStatusThunkCreator(status))
  },
  savePhoto: (filePhoto: any) => {
    dispatch(savePhotoThunkCreator(filePhoto))
  },
  addNewPost: (postText: string) => {
    dispatch(actions.newPostActionCreator(postText))
  }
})

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
  ConnectedWithAuthRedirect)
  (ProfileContainer)