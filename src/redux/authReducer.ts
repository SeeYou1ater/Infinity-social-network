import { InferActionsTypes, CommonThunkActionType } from './redux-store';
import { FormAction, stopSubmit } from "redux-form";
import { authAPI } from '../api/authApi';
import { ResultCodeCaptchaEnum, ResultCodesEnum } from '../api/api';
import { securityAPI } from '../api/securityApi';

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as {url: string} | null
}

type initialStateType = typeof initialState

export type UserDataType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

type ThunkType = CommonThunkActionType<ActionTypes | FormAction>

export const actions = {
  getCaptchaUrlSuccessActionCreator: (url: {url: string}) => {
    return {
      type: 'GET_CAPTCHA_URL_SUCCESS',
      url: url 
    } as const 
  },
  setUserDataActionCreator: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
      type: 'SET_USER_DATA',
      userData: {id, email, login, isAuth}
    } as const
  },
}

export const isAuthThunkCreator = (): ThunkType => {
  return async (dispatch) => {
    let data = await authAPI.authMe()
      if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = data.data
        dispatch(actions.setUserDataActionCreator(id, email, login, true))
        }
  }
}

export const loginThunkCreator = (login: string, password: string, rememberMe: boolean, captcha: null | string): ThunkType => {
  return async (dispatch) => {
    let data = await authAPI.login(login, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(isAuthThunkCreator())
          } else {
            if (data.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
              dispatch(getCaptchaUrlThunkCreator()) 
          } 
            if (data.resultCode > ResultCodesEnum.Success) { dispatch(stopSubmit('login', {_error: data.messages[0]}))}
          }
  }
}

export const logoutThunkCreator = (): ThunkType => {
  return async (dispatch) => {
    let data = await authAPI.logout()
        if (data.resultCode === 0) {
          dispatch(actions.setUserDataActionCreator(null, null, null, false))
          }
  }
}

export const getCaptchaUrlThunkCreator = (): ThunkType => {
  return async (dispatch) => {
    let dataCaptchaUrl = await securityAPI.getCaptchaUrl()        
      dispatch(actions.getCaptchaUrlSuccessActionCreator(dataCaptchaUrl))                 
  }
}



const authReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {

  switch (action.type) {

    case 'SET_USER_DATA': {
      let stateCopy = { ...state, 
                        ...action.userData
                        }
      return stateCopy;
    }

    case 'GET_CAPTCHA_URL_SUCCESS': {
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