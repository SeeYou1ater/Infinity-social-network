import React from 'react';
import { connect } from 'react-redux';
import { getUsersThunkCreator, FollowThunkCreator, UnfollowThunkCreator, addUsersThunkCreator, actions, FilterType} from '../../../../redux/usersReducer';
import FindUsers from './FindUsers';
import Preloader from '../../../common/Preloader/Preloader';
import { getCurrentPage, getFilter, getFollowingInProgress, getInProgress, getPageSize, getUsers } from '../../../../redux/usersSelectors';
import { UserType } from '../../../../types/types';
import { AppStateType } from '../../../../redux/redux-store';


type MapStatePropsType = { 
  pageSize: number
  currentPage: number 
  inProgress: boolean
  followingInProgress: Array<number>
  dataUsers: Array<UserType>
  filter: FilterType
}

type MapDispatchPropsType = {
  showMoreUsers: (currentPage: number, pageSize: number, term: string) => void
  getUsers: (currentPage: number, pageSize: number, term: string) => void
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
    this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter.term)
  }

  componentWillUnmount() {
    this.props.resetCurrentPage()
  }

  onFilterChanged = (filter: FilterType) => {
    this.props.getUsers(this.props.currentPage, this.props.pageSize, filter.term)
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
                          showMoreUsers = {this.props.showMoreUsers}
                          onFilterChanged = {this.onFilterChanged}
                          filter = {this.props.filter}/>
                          
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
    filter: getFilter(state)
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
    getUsers: (currentPage, pageSize, term) => {
      dispatch(getUsersThunkCreator(currentPage, pageSize, term))
    },
    showMoreUsers: (currentPage, pageSize, term) => {
      dispatch(addUsersThunkCreator(currentPage, pageSize, term))
    },
    resetCurrentPage: () => {
      dispatch(actions.resetCurrentPageActionCreator())
    }
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(FindUsersContainer) 
