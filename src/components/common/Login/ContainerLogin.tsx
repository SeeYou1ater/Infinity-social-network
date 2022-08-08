import React from "react";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../../redux/authReducer";
import { AppStateType } from "../../../redux/redux-store";
import Login from "./Login";

type MapStatePropsType = {
  isAuth: boolean
  authUserId: number | null
  captchaUrl: string | null | undefined
}

type MapDispatchPropsType = {
  login: (login: string, password: string, rememberMe: boolean, captcha: string | null | undefined) => void 
}

export type FormDataType = {
  login: string
  password: string
  rememberMe: boolean
  captchaUrl: string | null | undefined
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class ContainerLogin extends React.Component<PropsType> {
  
  onSubmit = (formData: FormDataType) => {
    this.props.login(formData.login, formData.password, formData.rememberMe, formData.captchaUrl)
  }

  render() {
    return (
      <Login  captchaUrl={this.props.captchaUrl}
              isAuth={this.props.isAuth}
              onSubmit={this.onSubmit}
              authUserId={this.props.authUserId}/>
    )
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    authUserId: state.auth.id,
    captchaUrl: state.auth.captchaUrl?.url
  }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    login: (login, password, rememberMe = false, captcha = null) => {
      dispatch(loginThunkCreator(login, password, rememberMe, captcha))
    }
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps)(ContainerLogin)