import React from 'react';
import { connect } from 'react-redux';
import { getUsersThunkCreator, FollowThunkCreator, UnfollowThunkCreator, addUsersThunkCreator} from '../../../../redux/usersReducer';
import FindUsers from './FindUsers';
import './FindUsersContainer.css';
import Preloader from '../../../common/Preloader/Preloader';
import { getCurrentPage, getFollowingInProgress, getInProgress, getPageSize, getUsers, getUsersCount } from '../../../../redux/usersSelectors';


class FindUsersContainer extends React.Component {  

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  render() {
    return (<>
            {this.props.inProgress ? <Preloader/> : null}
              <FindUsers  dataUsers = {this.props.dataUsers} 
                          pageSize = {this.props.pageSize}
                          currentPage = {this.props.currentPage}
                          onPageChanged = {this.onPageChanged}
                          onUnfollow = {this.props.onUnfollow}
                          onFollow = {this.props.onFollow}
                          inProgress = {this.props.inProgress}
                          followingInProgress = {this.props.followingInProgress}
                          showMoreUsers = {this.props.showMoreUsers}/>
            </>)
  }
}

let mapStateToProps = (state) => {
  return {
    dataUsers: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getUsersCount(state),
    currentPage: getCurrentPage(state),
    inProgress: getInProgress(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onUnfollow: (userId) => {
      dispatch(UnfollowThunkCreator(userId))
    },
    onFollow: (userId) => {
      dispatch(FollowThunkCreator(userId))
    },
    getUsers: (currentPage, pageSize) => {
      dispatch(getUsersThunkCreator(currentPage, pageSize))
    },
    showMoreUsers: (currentPage, pageSize) => {
      dispatch(addUsersThunkCreator(currentPage, pageSize))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindUsersContainer) 
