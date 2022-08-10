import React from 'react';
import { connect } from 'react-redux';
import { logoutThunkCreator } from '../../redux/authReducer';
import { AppStateType } from '../../redux/redux-store';
import Header from './Header';
import './Header.css';

type MapStateType = {
  isAuth: boolean
  login: string | null
}

type MapDispatchType = {
  logout: () => void
}

const HeaderContainer: React.FC<MapStateType & MapDispatchType> = (props) => {

    return (
      <Header {...props}/>
    )

}

///////////////////////////////////////////////////////////////////////////////////////////
let mapStateToProps = (state: AppStateType): MapStateType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

let mapDispatchToProps = (dispatch: any): MapDispatchType => {
  return {
    logout: () => {
      dispatch(logoutThunkCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);