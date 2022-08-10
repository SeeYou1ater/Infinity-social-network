import { FindUsersAPI } from './../api/findUsersApi';
import { CommonThunkActionType, InferActionsTypes } from './redux-store';
import { UserType } from './../types/types';

let initialState = {
  dataUsers: [] as Array<UserType>,
  pageSize: 5,
  currentPage: 1,
  inProgress: false,
  followingInProgress: [] as Array<number> // array of usersId
}

export type UsersReducerStateType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

type ThunkType = CommonThunkActionType<ActionTypes>

export const addUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setProgressActionCreator(true))
    let data = await FindUsersAPI.getUsers(currentPage, pageSize)
      dispatch(actions.addMoreUsersActionCreator(currentPage, data.items))
      dispatch(actions.setProgressActionCreator(false))
  }
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
  dispatch(actions.setProgressActionCreator(true))
    let data = await FindUsersAPI.getUsers(currentPage, pageSize)
      dispatch(actions.setUsersActionCreator(data.items))
      dispatch(actions.setTotalCountActionCreator(data.totalCount))
      dispatch(actions.setProgressActionCreator(false))
    }
}

export const onPageChangedThunkCreator = (pageNumber: number, pageSize: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.setProgressActionCreator(true))
    dispatch(actions.setCurrentPageActionCreator(pageNumber))
    let data = await FindUsersAPI.getUsers(pageNumber, pageSize)
      dispatch(actions.setUsersActionCreator(data.items))
      dispatch(actions.setProgressActionCreator(false))
  }
}

export const FollowThunkCreator = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingProgressActionCreator(true, userId))
    let data = await FindUsersAPI.followUser(userId)
      if (data.resultCode === 0) {
        dispatch(actions.followActionCreator(userId))
      }
    dispatch(actions.toggleIsFollowingProgressActionCreator(false, userId))
  }
}

export const UnfollowThunkCreator = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFollowingProgressActionCreator(true, userId))
    let data = await FindUsersAPI.unfollowUser(userId)
      if (data.resultCode === 0) {
      dispatch(actions.unfollowActionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgressActionCreator(false, userId))
  }
}

export const actions = {
  addMoreUsersActionCreator: (currentPage: number, dataUsers: Array<UserType>) => {
    return {
      type: 'ADD_MORE_USERS',
      dataUsers: dataUsers,
      currentPage: currentPage
    } as const
  },
  setProgressActionCreator: (inProgress: boolean) => {
    return {
      type: 'SET_PROGRESS',
      inProgress: inProgress
    } as const
  },
  followActionCreator: (userId: number) => {
    return {
      type: 'FOLLOW',
      userId: userId
    } as const
  },
  unfollowActionCreator: (userId: number) => {
    return {
      type: 'UNFOLLOW',
      userId: userId
    } as const
  },
  setUsersActionCreator: (dataUsers: Array<UserType>) => {
    return {
      type: 'SET_USERS',
      dataUsers: dataUsers
    } as const
  },
  setTotalCountActionCreator: (totalCount: number) => {
    return {
      type: 'SET_TOTAL_COUNT',
      totalCount: totalCount
    } as const
  },
  setCurrentPageActionCreator: (currentPage: number) => {
    return {
      type: 'SET_CURRENT_PAGE',
      currentPage: currentPage
    } as const
  },
  resetCurrentPageActionCreator: () => {
    return {
      type: 'RESET_CURRENT_PAGE',
      currentPageNumber: 1
    } as const
  },
  toggleIsFollowingProgressActionCreator: (followingInProgress: boolean, userId: number) => {
    return {
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      followingInProgress: followingInProgress,
      userId: userId
    } as const
  },
}

/////////////////////////////////////////////////////////////////////////// STATE ////////////////////////////////////////////////

let usersReducer = (state: UsersReducerStateType = initialState, action: ActionTypes): UsersReducerStateType => {

  switch (action.type) {

    case 'FOLLOW': {
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

    case 'UNFOLLOW': {
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

    case 'SET_USERS': {
      let stateCopy = { ...state,
                        dataUsers: [...action.dataUsers]}
      return stateCopy
    }

    case 'SET_TOTAL_COUNT': {
      let stateCopy = {...state, totalUsersCount: action.totalCount}
      return stateCopy
    }
    
    case 'SET_CURRENT_PAGE': {
      let stateCopy = {...state, currentPage: action.currentPage}
      return stateCopy
    }

    case 'RESET_CURRENT_PAGE': {
      let stateCopy = {...state, currentPage: action.currentPageNumber}
      return stateCopy
    }

    case 'SET_PROGRESS': {
      let stateCopy = {...state, inProgress: action.inProgress}
      return stateCopy
    }

    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      let stateCopy = { ...state, 
                        followingInProgress: action.followingInProgress 
                        ? [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id !== action.userId)
                      }
      return stateCopy
    }

    case 'ADD_MORE_USERS': {
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