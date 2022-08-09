import { InferActionsTypes, CommonThunkActionType } from './redux-store';
import { ProfileType, PostType, PhotosType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from '../api/profileApi';

let initialState = {
  dataPosts: [
    { postText: "Hello World!", likes: 3, id: 0 }, 
    { postText: "Working...", likes: 7, id: 1 }, 
    { postText: "Learning...", likes: 5, id: 2 }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ''
}

type InitialStateType = typeof initialState

export type DataProfileType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

type ThunkType = CommonThunkActionType<ActionTypes | FormAction>

export const actions = {
  deletePostActionCreator: (postId: number) => {
    return {
      type: 'DELETE_POST',
      postId: postId
    } as const
  },
  newPostActionCreator: (newPost: string) => {
    return {
      type: 'ADD_POST',
      newPost: newPost
    } as const
  },
  setUserProfileActionCreator: (dataProfile: ProfileType) => {
    return {
      type: 'SET_USER_PROFILE',
      dataProfile: dataProfile
    } as const
  },
  setStatusProfileActionCreator: (status: string) => {
    return {
      type: 'SET_STATUS',
      status: status
    } as const
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return {
      type: 'SAVE_PHOTO_SUCCESS',
      photos: photos
    } as const
  },
  saveProfileSuccess: (dataProfile: ProfileType) => {
    return {
      type: 'SAVE_PROFILE_SUCCESS',
      dataProfile: dataProfile
    } as const
  },
}

export const setUserProfileThunkCreator = (profileId: number): ThunkType => {
  return async (dispatch) => {
      let data = await profileAPI.getProfile(profileId)
      dispatch(actions.setUserProfileActionCreator(data))
  }
}

export const setUserStatusThunkCreator = (profileId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(profileId)
      dispatch(actions.setStatusProfileActionCreator(data))
  }
}

export const updateStatusThunkCreator = (status: string): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
      if (data.resultCode === 0) {
      dispatch(actions.setStatusProfileActionCreator(status))
    }
  }
}

export const savePhotoThunkCreator = (filePhoto: File): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(filePhoto)
      if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos))
    }
  }
}

export const saveProfileThunkCreator = (editDataAboutMe: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const authUserId = getState().auth.id
    const data = await profileAPI.saveProfile(editDataAboutMe)
      if (data.resultCode === 0) {
        if (authUserId !== null) {
          dispatch(setUserProfileThunkCreator(authUserId))
        } else {
          throw new Error('UserID can\'t be NULL!')
        }     
    } else {
        dispatch(stopSubmit('AboutMeEditForm', {_error: data.messages[0]}))
    }
  }
}

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

  switch (action.type) {

    case 'ADD_POST': {
      let newPost = {
        postText: action.newPost,
        likes: 0,
      }
      let stateCopy = {...state}
      stateCopy.dataPosts = [...state.dataPosts]
      stateCopy.dataPosts.push(newPost)
      return stateCopy;
    }

    case 'SET_USER_PROFILE': {
      let stateCopy = {...state, profile: action.dataProfile}
      return stateCopy
    }

    case 'SET_STATUS': {
      let stateCopy = {...state, status: action.status}
      return stateCopy
    }

    case 'DELETE_POST': {
      let stateCopy = {...state, dataPosts: state.dataPosts.filter(p => p.id !== action.postId)}
      return stateCopy
    }

    case 'SAVE_PHOTO_SUCCESS': {
      let stateCopy = {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
      return stateCopy
    }

    case 'SAVE_PROFILE_SUCCESS': {
      let stateCopy = {...state, profile: action.dataProfile}
      return stateCopy
    }

    default: 
      return state;
    } 
}

export default profileReducer;