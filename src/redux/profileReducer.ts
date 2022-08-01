import { ProfileType, postType, PhotosType } from './../types/types';
import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

const SET_USER_PROFILE = 'SET_USER_PROFILE',
      ADD_POST = 'ADD-POST',
      SET_STATUS = 'SET_STATUS',
      DELETE_POST = 'DELETE_POST',
      SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS',
      SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';


let initialState = {
  dataPosts: [
    { message: "Hello World!", likes: 3, id: 0 }, 
    { message: "Working...", likes: 7, id: 1 }, 
    { message: "Learning...", likes: 5, id: 2 }
  ] as Array<postType>,
  profile: null as ProfileType | null,
  status: '' as string
}

type initialStateType = typeof initialState

type DeletePostActionCreatorType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePostActionCreator = (postId: number): DeletePostActionCreatorType => {
  return {
    type: DELETE_POST,
    postId: postId
  }
}

type NewPostActionCreatorType = {
  type: typeof ADD_POST
  newPost: string
}

export const newPostActionCreator = (newPost: string): NewPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPost: newPost
  }
}

type SetUserProfileActionCreatorType = {
  type: typeof SET_USER_PROFILE
  dataProfile: ProfileType
}

export const setUserProfileActionCreator = (dataProfile: ProfileType): SetUserProfileActionCreatorType => {
  return {
    type: SET_USER_PROFILE,
    dataProfile: dataProfile
  }
}

type SetStatusProfileActionCreatorType = {
  type: typeof SET_STATUS
  status: string
}

export const setStatusProfileActionCreator = (status: string): SetStatusProfileActionCreatorType => {
  return {
    type: SET_STATUS,
    status: status
  }
}

type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos: photos
  }
}

type SaveProfileSuccessType = {
  type: typeof SAVE_PROFILE_SUCCESS
  dataProfile: ProfileType
}

export const saveProfileSuccess = (dataProfile: ProfileType): SaveProfileSuccessType => {
  return {
    type: SAVE_PROFILE_SUCCESS,
    dataProfile: dataProfile
  }
}

export const setUserProfileThunkCreator = (profileId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getProfile(profileId)
      dispatch(setUserProfileActionCreator(data))
  }
}

export const setUserStatusThunkCreator = (profileId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getStatus(profileId)
      dispatch(setStatusProfileActionCreator(data))
  }
}

export const updateStatusThunkCreator = (status: string) => {
  return async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status)
      if (data.resultCode === 0) {
      dispatch(setStatusProfileActionCreator(status))
    }
  }
}

export const savePhotoThunkCreator = (filePhoto: any) => {
  return async (dispatch: any) => {
    let data = await profileAPI.savePhoto(filePhoto)
      if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos))
    }
  }
}

export const saveProfileThunkCreator = (editDataAboutMe: ProfileType) => {
  return async (dispatch: any, getState: any) => {
    const authUserId = getState().auth.id
    const data = await profileAPI.saveProfile(editDataAboutMe)
      if (data.resultCode === 0) {
        dispatch(setUserProfileThunkCreator(authUserId))  
    } else {
        dispatch(stopSubmit('AboutMeEditForm', {_error: data.messages[0]}))
        return Promise.reject()
    }
  }
}

const profileReducer = (state = initialState, action: any): initialStateType => {

  switch (action.type) {

    case ADD_POST: {
      let newPost = {
        message: action.newPost,
        likes: 0,
      }
      let stateCopy = {...state}
      stateCopy.dataPosts = [...state.dataPosts]
      stateCopy.dataPosts.push(newPost)
      return stateCopy;
    }

    case SET_USER_PROFILE: {
      let stateCopy = {...state, profile: action.dataProfile}
      return stateCopy
    }

    case SET_STATUS: {
      let stateCopy = {...state, status: action.status}
      return stateCopy
    }

    case DELETE_POST: {
      let stateCopy = {...state, dataPosts: state.dataPosts.filter(p => p.id !== action.postId)}
      return stateCopy
    }

    case SAVE_PHOTO_SUCCESS: {
      let stateCopy = {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
      return stateCopy
    }

    case SAVE_PROFILE_SUCCESS: {
      let stateCopy = {...state, profile: action.dataProfile}
      return stateCopy
    }

    default: 
      return state;
    } 
}

export default profileReducer;