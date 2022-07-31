import React from "react";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../../redux/authReducer";
import Login from "./Login";



class ContainerLogin extends React.Component {
  onSubmit = (formData) => {
    this.props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
  }

  render() {
    return (
      <Login  captchaUrl={this.props.captchaUrl}
              logout={this.props.logout}
              isAuth={this.props.isAuth}
              onSubmit={this.onSubmit}
              authUserId={this.props.authUserId}/>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    authUserId: state.auth.id,
    captchaUrl: state.auth.captchaUrl?.url
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    login: (login, password, rememberMe = false, captcha = null) => {
      dispatch(loginThunkCreator(login, password, rememberMe, captcha))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerLogin)