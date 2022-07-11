import React from "react";
import { Navigate } from "react-router-dom";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { requiredField } from "../../../utilities/validators/validators";
import { FormControl } from "../../common/FormControls/FormControls";
import './Login.css';



class Login extends React.Component {
  render() {
    if (this.props.isAuth) { return <Navigate to={`/profile/${this.props.authUserId}`}/>} else {
    return (
      <div className='login-page'>
        <h1>
          Login
        </h1>
        <LoginReduxForm onSubmit={this.props.onSubmit}/>
      </div>
    )}
  }
}

class LoginForm extends React.Component {
  render() {
    return (
        <form onSubmit={this.props.handleSubmit} className='login-form' action="">
            <Field component={FormControl} validate={[requiredField]} formType={'input'} type="text" name={'login'} placeholder={"login"}/>
            <Field component={FormControl} validate={[requiredField]} formType={'input'} type="password" name={'password'} placeholder={"password"}/>
            <Field component={FormControl} name={'rememberMe'} type="checkbox" formType={'input'}/>Remember me
             {this.props.error && <div className="stopSubmit-error">{this.props.error}</div> }
            <button>Login</button>
        </form>
    )
  }
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)


export default Login;