import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { reduxForm } from "redux-form";
import { Field } from "redux-form";
import { FormControl } from "../../../common/FormControls/FormControls";
import Preloader from "../../../common/Preloader/Preloader";
import './ProfileSettings.css';

function ProfileSettings(props) {

  useEffect( () => {
    props.setUserProfile(props.authUserId)
  }, [])

  if (props.profile === null) { return <Preloader/> }

  if (props.authUserId === null) { 
    return <Navigate to={'/login'}/>
  } else return (
  <form className="App__editModeProfileForm" onSubmit={props.handleSubmit}>
    {props.error && <div className="stopSubmit-error">{props.error}</div> }
    <div className="App__editModeProfileForm-block">
      <div className="App__editModeProfileForm-fullname">
        <h3 className="App__editModeProfileForm-title"><b>Full name:</b></h3>
        <Field className='App__editModeProfileForm-fullName-input' component={FormControl} formType={'input'} type="text" name={'fullName'} placeholder={"Full name"}/>
      </div>
      <div className="App__editModeProfileForm-contacts">
        <h3 className="App__editModeProfileForm-title App__editModeProfileForm-contacts-title"><b>Contacts:</b></h3>
         <div className="App__editModeProfileForm-contacts-block">
          { Object.keys(props.profile.contacts).map( key => { return <div className="App__editModeProfileForm-contact-block" key={key}><p className='App__editModeProfileForm-contact-title'>{key}:</p><Field className="App__editModeProfileForm-contact-input" component={FormControl} 
          formType={'input'} type="text" name={'contacts.' + key} placeholder={key}/></div>}) }
        </div> 
      </div>
      <div className="App__editModeProfileForm-lookingForAJob">
        <h3 className="App__editModeProfileForm-title">Looking for a job:</h3>
        <Field className='App__editModeProfileForm-lookingForAJob-input' component={FormControl} formType={'input'} type="checkbox" name={'lookingForAJob'}/> 
      </div>
      <div className="App__editModeProfileForm-aboutMe">
        <h3 className="App__editModeProfileForm-title App__editModeProfileForm-aboutMe-title">About me:</h3>
        <Field className=' App__editModeProfileForm-textarea-input' component={FormControl} formType={'textarea'} type="text" name={'aboutMe'} placeholder={"You can write something here about yourself..."}/>
      </div>
      <div className="App__editModeProfileForm-skills">
        <h3 className="App__editModeProfileForm-title App__editModeProfileForm-skills-title">My professional skills:</h3>
        <Field className='App__editModeProfileForm-textarea-input' component={FormControl} formType={'textarea'} type="text" name={'lookingForAJobDescription'} placeholder={"You can write something here about your professional skills..."}/>
      </div>   
    </div>
    <button>Save</button>
  </form>
)}


const ProfileSettingsWithReduxForm = reduxForm({
  form: 'AboutMeEditForm'
})(ProfileSettings);

export default ProfileSettingsWithReduxForm;