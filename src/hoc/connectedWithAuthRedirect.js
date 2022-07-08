import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export const ConnectedWithAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render(){
      if (!this.props.isAuth) {
        return <Navigate to={'/login'}/>
      }  else  return <Component  {...this.props}/>
    }
  }

  let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
  })
  
  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}