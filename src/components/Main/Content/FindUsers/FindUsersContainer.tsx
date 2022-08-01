import React from 'react';
import { connect } from 'react-redux';
import { getUsersThunkCreator, FollowThunkCreator, UnfollowThunkCreator, addUsersThunkCreator, resetCurrentPageActionCreator} from '../../../../redux/usersReducer';
import FindUsers from './FindUsers';
import './FindUsersContainer.css';
import Preloader from '../../../common/Preloader/Preloader';
import { getCurrentPage, getFollowingInProgress, getInProgress, getPageSize, getUsers } from '../../../../redux/usersSelectors';
import { UserType } from '../../../../types/types';
import { AppStateType } from '../../../../redux/redux-store';


type MapStatePropsType = { 
  pageSize: number
  currentPage: number 
  inProgress: boolean
  followingInProgress: Array<number>
  dataUsers: Array<UserType>
}

type MapDispatchPropsType = {
  showMoreUsers: (currentPage: number, pageSize: number) => void
  getUsers: (currentPage: number, pageSize: number) => void
  resetCurrentPage: () => void
  onUnfollow: (userId: number) => void
  onFollow: (userId: number) => void
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class FindUsersContainer extends React.Component<PropsType> {  

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  componentWillUnmount() {
    this.props.resetCurrentPage()
  }

  render() {
    return (<>
            {this.props.inProgress ? <Preloader/> : null}
              <h2>{this.props.pageTitle}</h2>
              <FindUsers  dataUsers = {this.props.dataUsers} 
                          pageSize = {this.props.pageSize}
                          currentPage = {this.props.currentPage}
                          onUnfollow = {this.props.onUnfollow}
                          onFollow = {this.props.onFollow}
                          inProgress = {this.props.inProgress}
                          followingInProgress = {this.props.followingInProgress}
                          showMoreUsers = {this.props.showMoreUsers}/>
            </>)
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dataUsers: getUsers(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    inProgress: getInProgress(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
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
    },
    resetCurrentPage: () => {
      dispatch(resetCurrentPageActionCreator())
    }
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(FindUsersContainer) 
