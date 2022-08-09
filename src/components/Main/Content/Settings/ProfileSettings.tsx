import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Field } from "redux-form";
import { ProfileType } from "../../../../types/types";
import { FormControl } from "../../../common/FormControls/FormControls";
import Preloader from "../../../common/Preloader/Preloader";
import './ProfileSettings.css';


type ProfileSettingsPropsType = {
  saveProfile: (editDataAboutMe: ProfileType) => void
  profile: ProfileType | null
  setUserProfile: (profileId: number) => void
  authUserId: number
}

const ProfileSettings: React.FC<ProfileSettingsPropsType> = (props) => {

  let authUserId = props.authUserId
  const setUserProfile = props.setUserProfile

  useEffect( () => {
    setUserProfile(authUserId)
  }, [authUserId, setUserProfile])

  if (props.profile === null) { return <Preloader/> }

  if (props.authUserId === null) { 
    return <Navigate to={'/login'}/>
  } else { return <>
                    <ProfileSettingsWithReduxForm initialValues={props.profile} profile={props.profile} onSubmit={props.saveProfile}/>
                  </>  
                  }
}

type ProfileSettingsFormPropsType = {
  profile: ProfileType
  initialValues: ProfileType
}

class ProfileSettingsForm extends React.Component<InjectedFormProps<ProfileType, ProfileSettingsFormPropsType> & ProfileSettingsFormPropsType> {
  render(){
    return (
      <form className="App__editModeProfileForm" onSubmit={this.props.handleSubmit}>
      {this.props.error && <div className="stopSubmit-error">{this.props.error}</div> }
    <div className="App__editModeProfileForm-block">
      <div className="App__editModeProfileForm-fullname">
        <h3 className="App__editModeProfileForm-title"><b>Full name:</b></h3>
        <Field className='App__editModeProfileForm-fullName-input' component={FormControl} formType={'input'} type="text" name={'fullName'} placeholder={"Full name"}/>
      </div>
      <div className="App__editModeProfileForm-contacts">
        <h3 className="App__editModeProfileForm-title App__editModeProfileForm-contacts-title"><b>Contacts:</b></h3>
         <div className="App__editModeProfileForm-contacts-block">
          { Object.keys(this.props.profile.contacts).map( key => { return <div className="App__editModeProfileForm-contact-block" key={key}><p className='App__editModeProfileForm-contact-title'>{key}:</p><Field className="App__editModeProfileForm-contact-input" component={FormControl} 
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
    <button className="App__editModeProfileForm-buttonSave">Save</button>
  </form>
  )}
}


const ProfileSettingsWithReduxForm = reduxForm<ProfileType, ProfileSettingsFormPropsType>({
  form: 'AboutMeEditForm'
})(ProfileSettingsForm);

export default ProfileSettings;