import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import { AppStateType } from "../redux/redux-store"

type MapStatePropsType = {
  isAuth: boolean
}

export function ConnectedWithAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

  function RedirectComponent(props: MapStatePropsType) {
    let {isAuth, ...restProps} = props
      if (!props.isAuth) {
        return <Navigate to={'/login'}/>
      }  else return <WrappedComponent  {...restProps as WCP}/> 
  }

  let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
  })
  
  let ConnectedAuthRedirectComponent = connect<MapStatePropsType, unknown, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}