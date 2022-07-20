import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
}

export const setUserDataActionCreator = (id, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    userData: {id, email, login, isAuth}
  }
}

export const isAuthThunkCreator = () => {
  return async (dispatch) => {
    let data = await authAPI.authMe()
      if (data.resultCode === 0) {
        let {id, email, login} = data.data
        dispatch(setUserDataActionCreator(id, email, login, true))
        }
  }
}

export const loginThunkCreator = (login, password, rememberMe) => {
  return async (dispatch) => {
    let data = await authAPI.login(login, password, rememberMe)
        if (data.resultCode === 0) {
            dispatch(isAuthThunkCreator())
          } else {
            dispatch(stopSubmit('login', {_error: data.messages[0]}))
          }
  }
}

export const logoutThunkCreator = () => {
  return async (dispatch) => {
    let data = await authAPI.logout()
        if (data.resultCode === 0) {
          dispatch(setUserDataActionCreator(null, null, null, false))
          }
  }
}



const authReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_USER_DATA: {
      let stateCopy = { ...state, 
                        ...action.userData
                        }
      return stateCopy;
    }
    default: 
      return state;
    }
}



export default authReducer;