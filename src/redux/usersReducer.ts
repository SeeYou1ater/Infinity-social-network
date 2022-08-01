import { UserType } from './../types/types';
import { UsersAPI } from "../api/api";

const FOLLOW = 'FOLLOW',
      UNFOLLOW = 'UNFOLLOW',
      SET_USERS = 'SET_USERS',
      SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
      SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
      SET_PROGRESS = 'SET_PROGRESS',
      TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS',
      ADD_MORE_USERS = 'ADD_MORE_USERS';

let initialState = {
  dataUsers: [] as Array<UserType>,
  pageSize: 5,
  currentPage: 1,
  inProgress: false,
  followingInProgress: [] as Array<number> // array of usersId
}

type InitialStateType = typeof initialState

type AddMoreUsersActionCreatorType = {
  type: typeof ADD_MORE_USERS
  dataUsers: Array<UserType>
  currentPage: number
}

export const addMoreUsersActionCreator = (currentPage: number, dataUsers: Array<UserType>): AddMoreUsersActionCreatorType => {
  return {
    type: ADD_MORE_USERS,
    dataUsers: dataUsers,
    currentPage: currentPage
  }
}

type SetProgressActionCreatorType = {
  type: typeof SET_PROGRESS
  inProgress: boolean
}

export const setProgressActionCreator = (inProgress: boolean): SetProgressActionCreatorType  => {
  return {
    type: SET_PROGRESS,
    inProgress: inProgress
  }
}

type FollowActionCreatorType = {
  type: typeof FOLLOW
  userId: number
}

export const followActionCreator = (userId: number): FollowActionCreatorType => {
  return {
    type: FOLLOW,
    userId: userId
  }
}

type UnfollowActionCreatorType = {
  type: typeof UNFOLLOW
  userId: number
}

export const unfollowActionCreator = (userId: number): UnfollowActionCreatorType => {
  return {
    type: UNFOLLOW,
    userId: userId
  }
}

type SetUsersActionCreatorType = {
  type: typeof SET_USERS
  dataUsers: Array<UserType>
}

export const setUsersActionCreator = (dataUsers: Array<UserType>): SetUsersActionCreatorType => {
  return {
    type: SET_USERS,
    dataUsers: dataUsers
  }
}

type SetTotalCountActionCreator = {
  type: typeof SET_TOTAL_COUNT
  totalCount: number
}

export const setTotalCountActionCreator = (totalCount: number): SetTotalCountActionCreator => {
  return {
    type: SET_TOTAL_COUNT,
    totalCount: totalCount
  }
}

type SetCurrentPageActionCreatorType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}

export const setCurrentPageActionCreator = (currentPage: number): SetCurrentPageActionCreatorType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
  }
}

type ToggleIsFollowingProgressActionCreatorType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  followingInProgress: boolean
  userId: number
}

export const toggleIsFollowingProgressActionCreator = (followingInProgress: boolean, userId: number): ToggleIsFollowingProgressActionCreatorType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress: followingInProgress,
    userId: userId
  }
}

export const addUsersThunkCreator = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setProgressActionCreator(true))
    let data = await UsersAPI.getUsers(currentPage, pageSize)
      dispatch(addMoreUsersActionCreator(currentPage, data.items))
      dispatch(setProgressActionCreator(false))
  }
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
  dispatch(setProgressActionCreator(true))
    let data = await UsersAPI.getUsers(currentPage, pageSize)
      dispatch(setUsersActionCreator(data.items))
      dispatch(setTotalCountActionCreator(data.totalCount))
      dispatch(setProgressActionCreator(false))
    }
}

export const onPageChangedThunkCreator = (pageNumber: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setProgressActionCreator(true))
    dispatch(setCurrentPageActionCreator(pageNumber))
    let data = await UsersAPI.getUsers(pageNumber, pageSize)
      dispatch(setUsersActionCreator(data.items))
      dispatch(setProgressActionCreator(false))
  }
}

export const FollowThunkCreator = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFollowingProgressActionCreator(true, userId))
    let data = await UsersAPI.followUser(userId)
      if (data.resultCode === 0) {
        dispatch(followActionCreator(userId))
      }
    dispatch(toggleIsFollowingProgressActionCreator(false, userId))
  }
}

export const UnfollowThunkCreator = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFollowingProgressActionCreator(true, userId))
    let data = await UsersAPI.unfollowUser(userId)
      if (data.resultCode === 0) {
      dispatch(unfollowActionCreator(userId))
    }
    dispatch(toggleIsFollowingProgressActionCreator(false, userId))
  }
}


/////////////////////////////////////////////////////////////////////////// STATE ////////////////////////////////////////////////

let usersReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {

    case FOLLOW: {
      let stateCopy = {
        ...state,
        dataUsers: state.dataUsers.map((user) => {
          if (user.id === action.userId) {
            return {...user, followed: true}
            }
          return user;
        })
      }
      return stateCopy
    }

    case UNFOLLOW: {
      let stateCopy = {
        ...state,
        dataUsers: state.dataUsers.map((user) => {                       
          if (user.id === action.userId) {
            return {...user, followed: false}             
            }
          return user;
        })
      }
      return stateCopy
    }

    case SET_USERS: {
      let stateCopy = {...state}
      stateCopy.dataUsers = [...state.dataUsers, ...action.dataUsers]
      return stateCopy
    }

    case SET_TOTAL_COUNT: {
      let stateCopy = {...state, totalUsersCount: action.totalCount}
      return stateCopy
    }
    
    case SET_CURRENT_PAGE: {
      let stateCopy = {...state, currentPage: action.currentPage}
      return stateCopy
    }

    case SET_PROGRESS: {
      let stateCopy = {...state, inProgress: action.inProgress}
      return stateCopy
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      let stateCopy = { ...state, 
                        followingInProgress: action.followingInProgress 
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId)
                      }
      return stateCopy
    }

    case ADD_MORE_USERS: {
      let stateCopy = {...state,
                        dataUsers: [...state.dataUsers, ...action.dataUsers],
                        currentPage: action.currentPage }
      return stateCopy
    }

    default:
      return state;
  }
}

export default usersReducer;