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
  dataUsers: [],
  pageSize: 5,
  currentPage: 1,
  inProgress: false,
  followingInProgress: []
}

export const addMoreUsers = (currentPage, dataUsers) => {
  return {
    type: ADD_MORE_USERS,
    dataUsers: dataUsers,
    currentPage: currentPage
  }
}

export const setProgressActionCreator = (inProgress) => {
  return {
    type: SET_PROGRESS,
    inProgress: inProgress
  }
}

export const followActionCreator = (userId) => {
  return {
    type: FOLLOW,
    userId: userId
  }
}

export const unfollowActionCreator = (userId) => {
  return {
    type: UNFOLLOW,
    userId: userId
  }
}

export const setUsersActionCreator = (dataUsers) => {
  return {
    type: SET_USERS,
    dataUsers: dataUsers
  }
}

export const setTotalCountActionCreator = (totalCount) => {
  return {
    type: SET_TOTAL_COUNT,
    totalCount: totalCount
  }
}

export const setCurrentPageActionCreator = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
  }
}

export const toggleIsFollowingProgressActionCreator = (followingInProgress, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress: followingInProgress,
    userId: userId
  }
}

export const addUsersThunkCreator = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(setProgressActionCreator(true))
    let data = await UsersAPI.getUsers(currentPage, pageSize)
      dispatch(addMoreUsers(currentPage, data.items))
      dispatch(setProgressActionCreator(false))
  }
}

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return async (dispatch) => {
  dispatch(setProgressActionCreator(true))
    let data = await UsersAPI.getUsers(currentPage, pageSize)
      dispatch(setUsersActionCreator(data.items))
      dispatch(setTotalCountActionCreator(data.totalCount))
      dispatch(setProgressActionCreator(false))
    }
}

export const onPageChangedThunkCreator = (pageNumber, pageSize) => {
  return async (dispatch) => {
    dispatch(setProgressActionCreator(true))
    dispatch(setCurrentPageActionCreator(pageNumber))
    let data = await UsersAPI.getUsers(pageNumber, pageSize)
      dispatch(setUsersActionCreator(data.items))
      dispatch(setProgressActionCreator(false))
  }
}

export const FollowThunkCreator = (userId) => {
  return async (dispatch) => {
    dispatch(toggleIsFollowingProgressActionCreator(true, userId))
    let data = await UsersAPI.followUser(userId)
      if (data.resultCode === 0) {
        dispatch(followActionCreator(userId))
      }
    dispatch(toggleIsFollowingProgressActionCreator(false, userId))
  }
}

export const UnfollowThunkCreator = (userId) => {
  return async (dispatch) => {
    dispatch(toggleIsFollowingProgressActionCreator(true, userId))
    let data = await UsersAPI.unfollowUser(userId)
      if (data.resultCode === 0) {
      dispatch(unfollowActionCreator(userId))
    }
    dispatch(toggleIsFollowingProgressActionCreator(false, userId))
  }
}


/////////////////////////////////////////////////////////////////////////// STATE ////////////////////////////////////////////////

let usersReducer = (state = initialState, action) => {

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
      /*let stateCopy = {
        ...state,
        dataUsers: [...state.dataUsers, ...action.dataUsers] //Тут добавляются пользователи в массив
      }*/
      let stateCopy = {...state}
      stateCopy.dataUsers = [...action.dataUsers]
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