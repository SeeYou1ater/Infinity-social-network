import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { DataProfileType, saveProfileThunkCreator, setUserProfileThunkCreator } from "../../../../redux/profileReducer";
import { AppStateType } from "../../../../redux/redux-store";
import { ProfileType } from "../../../../types/types";
import ProfileSettings from "./ProfileSettings";

type MapStatePropsType = {
  dataProfile: DataProfileType
  authUserId: number | null
}

type MapDispatchPropsType = {
  saveProfile: (editDataAboutMe: ProfileType) => void
  setUserProfile: (profileId: number) => void
}

const ProfileSettingsContainer: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

  const saveProfile = (editDataAboutMe: ProfileType) => {
    props.saveProfile(editDataAboutMe)
  }
  if (props.authUserId === null) { return <Navigate to={'/login'}/> } else {
    return (
      <>
        <ProfileSettings    profile={props.dataProfile.profile!}
                            setUserProfile={props.setUserProfile}
                            authUserId={props.authUserId}
                            saveProfile={saveProfile}/>
      </>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dataProfile: state.dataProfile,
    authUserId: state.auth.id,
  }
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType  => {
  return {
    saveProfile: (editDataAboutMe: ProfileType) => {
      dispatch(saveProfileThunkCreator(editDataAboutMe))
    },
    setUserProfile: (profileId: number) => {
      dispatch(setUserProfileThunkCreator(profileId))
    },
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps)(ProfileSettingsContainer);