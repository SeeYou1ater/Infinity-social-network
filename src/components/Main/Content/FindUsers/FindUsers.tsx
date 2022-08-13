import React from 'react';
import { FilterType } from '../../../../redux/usersReducer';
import { UserType } from '../../../../types/types';
import './FindUsers.css';
import User from './User';
import UsersSearchForm from './UsersSearchForm';


type PropsType = {
  dataUsers: Array<UserType> 
  pageSize: number
  currentPage: number 
  onUnfollow: (userId: number) => void
  onFollow: (userId: number) => void
  inProgress: boolean
  followingInProgress: Array<number>
  showMoreUsers: (currentPage: number, pageSize: number, term: string) => void
  onFilterChanged: (filter: FilterType) => void
  filter: FilterType
}

function FindUsers(props: PropsType){
    return (
        <section className='App__friends'>
          <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
          <ul>
          {props.dataUsers.map((user) =>
            <User key={user.id}
                  user={user} 
                  onUnfollow={props.onUnfollow} 
                  onFollow={props.onFollow}
                  followingInProgress={props.followingInProgress}/>)}
          </ul>
    
          <button className='App__findUsers__showMoreButton' onClick={() => { props.showMoreUsers(props.currentPage + 1, props.pageSize, props.filter.term) }}>Show more</button>
    
        </section>
      )
}

export default FindUsers;