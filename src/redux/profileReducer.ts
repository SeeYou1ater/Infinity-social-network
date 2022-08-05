import { InferActionsTypes, AppStateType } from './redux-store';
import { ProfileType, PostType, PhotosType } from './../types/types';
import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";

let initialState = {
  dataPosts: [
    { message: "Hello World!", likes: 3, id: 0 }, 
    { message: "Working...", likes: 7, id: 1 }, 
    { message: "Learning...", likes: 5, id: 2 }
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '' as string
}

type InitialStateType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

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

export const setUserProfileThunkCreator = (profileId: number | null) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getProfile(profileId)
      dispatch(actions.setUserProfileActionCreator(data))
  }
}

export const setUserStatusThunkCreator = (profileId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getStatus(profileId)
      dispatch(actions.setStatusProfileActionCreator(data))
  }
}

export const updateStatusThunkCreator = (status: string) => {
  return async (dispatch: any) => {
    let data = await profileAPI.updateStatus(status)
      if (data.resultCode === 0) {
      dispatch(actions.setStatusProfileActionCreator(status))
    }
  }
}

export const savePhotoThunkCreator = (filePhoto: any) => {
  return async (dispatch: any) => {
    let data = await profileAPI.savePhoto(filePhoto)
      if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos))
    }
  }
}

export const saveProfileThunkCreator = (editDataAboutMe: ProfileType) => {
  return async (dispatch: any, getState: () => AppStateType) => {
    const authUserId = getState().auth.id
    const data = await profileAPI.saveProfile(editDataAboutMe)
      if (data.resultCode === 0) {
        dispatch(setUserProfileThunkCreator(authUserId))  
    } else {
        dispatch(stopSubmit('AboutMeEditForm', {_error: data.messages[0]}))
    }
  }
}

const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

  switch (action.type) {

    case 'ADD_POST': {
      let newPost = {
        message: action.newPost,
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