import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA',
      GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
}

export const setUserDataActionCreator = (id, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    userData: {id, email, login, isAuth}
  }
}

export const getCaptchaUrlSuccess = (url) => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    url: url
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

export const loginThunkCreator = (login, password, rememberMe, captcha) => {
  return async (dispatch) => {
    let data = await authAPI.login(login, password, rememberMe, captcha)
        if (data.resultCode === 0) {
            dispatch(isAuthThunkCreator())
          } else {
            if (data.resultCode === 10) {
              dispatch(getCaptchaUrlThunkCreator()) 
          } 
            if (data.resultCode > 0) { dispatch(stopSubmit('login', {_error: data.messages[0]}))}
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

export const getCaptchaUrlThunkCreator = () => {
  return async (dispatch) => {
    let dataCaptchaUrl = await securityAPI.getCaptchaUrl()        
      dispatch(getCaptchaUrlSuccess(dataCaptchaUrl))                 
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

    case GET_CAPTCHA_URL_SUCCESS: {
      let stateCopy = {
        ...state,
        captchaUrl: action.url
      }
      return stateCopy;
    }

    default: 
      return state;
    }
}



export default authReducer;