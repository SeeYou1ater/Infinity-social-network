import React from 'react';
import { connect } from 'react-redux';
import { logoutThunkCreator, setUserDataActionCreator } from '../../redux/authReducer';
import Header from './Header';
import './Header.css';

class HeaderContainer extends React.Component {

  render () {
    return (
      <Header {...this.props}/>
    )
  }
}

///////////////////////////////////////////////////////////////////////////////////////////
let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (userData) => {
      dispatch(setUserDataActionCreator(userData))
    },
    logout: () => {
      dispatch(logoutThunkCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);