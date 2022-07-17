import { profileAPI } from "../api/api";

const SET_USER_PROFILE = 'SET_USER_PROFILE',
      ADD_POST = 'ADD-POST',
      SET_STATUS = 'SET_STATUS',
      DELETE_POST = 'DELETE_POST',
      SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';


let initialState = {
  dataPosts: [
    { message: "Hello World!", likes: '3', id: 0 }, { message: "Working...", likes: '7', id: 1 }, { message: "Learning...", likes: '5', id: 2 }
  ],
  profile: null,
  status: ''
}

export const deletePostActionCreator = (postId) => {
  return {
    type: DELETE_POST,
    postId: postId
  }
}
      
export const newPostActionCreator = (newPost) => {
  return {
    type: ADD_POST,
    newPost: newPost
  }
}

export const setUserProfileActionCreator = (dataProfile) => {
  return {
    type: SET_USER_PROFILE,
    dataProfile: dataProfile
  }
}

export const setStatusProfileActionCreator = (status) => {
  return {
    type: SET_STATUS,
    status: status
  }
}

export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos: photos
  }
}

export const setUserProfileThunkCreator = (profileId) => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(profileId)
      dispatch(setUserProfileActionCreator(data))
  }
}

export const setUserStatusThunkCreator = (profileId) => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(profileId)
      dispatch(setStatusProfileActionCreator(data))
  }
}

export const updateStatusThunkCreator = (status) => {
  return async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
      if (data.resultCode === 0)
      dispatch(setStatusProfileActionCreator(status))
  }
}

export const savePhotoThunkCreator = (filePhoto) => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(filePhoto)
      if (data.resultCode === 0)
      dispatch(savePhotoSuccess(data.data.photos))
  }
}

const profileReducer = (state = initialState, action) => {

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
      let stateCopy = {...state, profile: {...state.profile, photos: action.photos}}
      return stateCopy
    }

    default: 
      return state;
    } 
}

export default profileReducer;