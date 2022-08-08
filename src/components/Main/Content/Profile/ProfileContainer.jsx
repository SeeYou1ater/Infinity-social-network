import React from 'react';
import './Profile.css';
import Profile from './Profile';
import { connect } from 'react-redux';
import { savePhotoThunkCreator, setUserProfileThunkCreator, setUserStatusThunkCreator, updateStatusThunkCreator } from '../../../../redux/profileReducer';
import { withRouter } from '../../../../hoc/withRouter';
import { compose } from 'redux';
import { ConnectedWithAuthRedirect } from '../../../../hoc/connectedWithAuthRedirect';
import { useParams } from 'react-router-dom';



class ProfileContainer extends React.Component {
  refreshPage() {
    let profileId = useParams()
    if (!profileId) {
      profileId = this.props.authorizedUserId;
    }
    this.props.setUserProfile(profileId)
    this.props.setUserStatus(profileId)
  }

  componentDidMount() {
    this.refreshPage()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.router.params.profileId !== this.props.router.params.profileId) {
      this.refreshPage()
    }
  }

  render () {
    return (
      <div className='App__profile'>
        <Profile  dataProfile = {this.props.dataProfile}
                  isOwner={Number(this.props.router.params.profileId) === this.props.authorizedUserId}
                  savePhoto={this.props.savePhoto}
                  isAuth={this.props.isAuth}
                  status={this.props.status}
                  updateStatus={this.props.updateStatus}/>
      </div>
    )
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let mapStateToProps = (state) => ({
  dataProfile: state.dataProfile,
  status: state.dataProfile.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth
})

let mapDispatchToProps = (dispatch) => ({
  setUserProfile: (profileId) => {
    dispatch(setUserProfileThunkCreator(profileId))
  },
  setUserStatus: (profileId) => {
    dispatch(setUserStatusThunkCreator(profileId))
  },
  updateStatus: (status) => {
    dispatch(updateStatusThunkCreator(status))
  },
  savePhoto: (filePhoto) => {
    dispatch(savePhotoThunkCreator(filePhoto))
  },
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  ConnectedWithAuthRedirect)
  (ProfileContainer)