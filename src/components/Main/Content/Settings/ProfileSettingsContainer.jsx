import React from "react";
import { connect } from "react-redux";
import { saveProfileThunkCreator, setUserProfileThunkCreator } from "../../../../redux/profileReducer";
import ProfileSettingsWithReduxForm from "./ProfileSettings";


function ProfileSettingsContainer(props) {

  const onSubmit = (editDataAboutMe) => {
    props.saveProfile(editDataAboutMe)
  }

  return (
    <>
      <ProfileSettingsWithReduxForm saveProfile={props.saveProfile}
                                    profile={props.dataProfile.profile}
                                    setUserProfile={props.setUserProfile}
                                    authUserId={props.authUserId}
                                    onSubmit={onSubmit}
                                    initialValues={props.dataProfile.profile}/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    dataProfile: state.dataProfile,
    authUserId: state.auth.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveProfile: (editDataAboutMe) => {
      dispatch(saveProfileThunkCreator(editDataAboutMe))
    },
    setUserProfile: (profileId) => {
      dispatch(setUserProfileThunkCreator(profileId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettingsContainer);