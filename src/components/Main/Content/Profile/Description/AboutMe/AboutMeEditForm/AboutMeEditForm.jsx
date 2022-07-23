import React from "react";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { FormControl } from "../../../../../../common/FormControls/FormControls";
import './AboutMeEditForm.css';


function AboutMeEditForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <button>Save</button>
      {props.error && <div className="stopSubmit-error">{props.error}</div> }
      <div>
        <div>
          <h3>Full name:</h3>
          <Field className='App__editModeProfileForm-fullName-input' component={FormControl} validators={[]} formType={'input'} type="text" name={'fullName'} placeholder={"Full name"}/>
        </div >
        <div>
          <h3><b>Contacts:</b></h3>
          <div>
            { Object.keys(props.profile.contacts).map( key => { return <div key={key}>{key}:<Field className="App__editMode-contact-input" component={FormControl} validators={[]} formType={'input'} type="text" name={'contacts.' + key} placeholder={key}/></div>}) }
          </div>
        </div>
        <div>
          <h3><b>Looking for a job:</b></h3>
          <Field className='App__editModeProfileForm-lookingForAJob-input' component={FormControl} validators={[]} formType={'input'} type="checkbox" name={'lookingForAJob'}/> 
        </div>
        <div>
          <h3><b>About me:</b></h3>
          <Field className='App__editModeProfileForm-aboutMe-input' component={FormControl} validators={[]} formType={'textarea'} type="text" name={'aboutMe'} placeholder={"You can write something here about yourself..."}/>
        </div>
        <div>
          <h3><b>My professional skills:</b></h3>
          <Field className='App__editModeProfileForm-lookingForAJobDescription-input' component={FormControl} validators={[]} formType={'textarea'} type="text" name={'lookingForAJobDescription'} placeholder={"You can write something here about your professional skills..."}/>
        </div>   
      </div>
    </form>
  )
}

const AboutMeEditReduxForm = reduxForm({
  form: 'AboutMeEditForm'
})(AboutMeEditForm)

export default AboutMeEditReduxForm;