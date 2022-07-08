import React from "react";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../../redux/authReducer";
import Login from "./Login";



class ContainerLogin extends React.Component {
  onSubmit = (formData) => {
    this.props.login(formData.login, formData.password, formData.rememberMe)
  }

  render() {
    return (
      <Login  
              logout={this.props.logout}
              isAuth={this.props.isAuth}
              onSubmit={this.onSubmit}/>
    )
  }
}
let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    login: (login, password, rememberMe) => {
      dispatch(loginThunkCreator(login, password, rememberMe))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerLogin)