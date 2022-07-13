import React from "react";
import { Navigate } from "react-router-dom";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { requiredField } from "../../../utilities/validators/validators";
import { FormControl } from "../FormControls/FormControls";
import './Login.css';



class Login extends React.Component {
  render() {
    if (this.props.isAuth) { return <Navigate to={`/profile/${this.props.authUserId}`}/>} else {
    return (
      <div className='App__login-uniform'>
        <div className='App__login-block'>
          <h1>
            Login <br /><br />

            Test login and password: <br /><br />  LOGIN: free@samuraijs.com <br /><br /> PASSWORD: free
          </h1>
          <LoginReduxForm onSubmit={this.props.onSubmit}/>
        </div>
      </div>
    )}
  }
}

class LoginForm extends React.Component {
  render() {
    return (
        <form onSubmit={this.props.handleSubmit} className='App__login-form' action="">
            <Field component={FormControl} validate={[requiredField]} formType={'input'} type="text" name={'login'} placeholder={"login"}/>
            <Field component={FormControl} validate={[requiredField]} formType={'input'} type="password" name={'password'} placeholder={"password"}/>
            <Field component={FormControl} name={'rememberMe'} type="checkbox" formType={'input'}/>Remember me
             {this.props.error && <div className="stopSubmit-error">{this.props.error}</div> }
            <button>Log in</button>
        </form>
    )
  }
}

const LoginReduxForm = reduxForm({
  form: 'login'
})(LoginForm)


export default Login;