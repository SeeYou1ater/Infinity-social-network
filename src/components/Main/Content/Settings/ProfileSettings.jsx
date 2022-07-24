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
  <form onSubmit={props.handleSubmit}>
    {props.error && <div className="stopSubmit-error">{props.error}</div> }
    <div>
      <div>
        <h3>Full name:</h3>
        <Field className='App__editModeProfileForm-fullName-input' component={FormControl} formType={'input'} type="text" name={'fullName'} placeholder={"Full name"}/>
      </div>
      <div>
        <h3><b>Contacts:</b></h3>
         <div>
          { Object.keys(props.profile.contacts).map( key => { return <div key={key}>{key}:<Field className="App__editMode-contact-input" component={FormControl} 
          formType={'input'} type="text" name={'contacts.' + key} placeholder={key}/></div>}) }
        </div> 
      </div>
      <div>
        <h3><b>Looking for a job:</b></h3>
        <Field className='App__editModeProfileForm-lookingForAJob-input' component={FormControl} formType={'input'} type="checkbox" name={'lookingForAJob'}/> 
      </div>
      <div>
        <h3><b>About me:</b></h3>
        <Field className='App__editModeProfileForm-aboutMe-input' component={FormControl} formType={'textarea'} type="text" name={'aboutMe'} placeholder={"You can write something here about yourself..."}/>
      </div>
      <div>
        <h3><b>My professional skills:</b></h3>
        <Field className='App__editModeProfileForm-lookingForAJobDescription-input' component={FormControl} formType={'textarea'} type="text" name={'lookingForAJobDescription'} placeholder={"You can write something here about your professional skills..."}/>
      </div>   
    </div>
    <button>Save</button>
  </form>
)}


const ProfileSettingsWithReduxForm = reduxForm({
  form: 'AboutMeEditForm'
})(ProfileSettings);

export default ProfileSettingsWithReduxForm;