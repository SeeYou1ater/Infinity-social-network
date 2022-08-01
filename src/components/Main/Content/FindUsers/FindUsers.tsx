import React from 'react';
import { UserType } from '../../../../types/types';
import './FindUsers.css';
import User from './User';


type PropsType = {
  dataUsers: Array<UserType> 
  pageSize: number
  currentPage: number 
  onUnfollow: (userId: number) => void
  onFollow: (userId: number) => void
  inProgress: boolean
  followingInProgress: Array<number>
  showMoreUsers: (currentPage: number, pageSize: number) => void
}

function FindUsers(props: PropsType){
    return (
        <section className='App__friends'>
          <ul>
          {props.dataUsers.map((user) =>
            <User key={user.id}
                  user={user} 
                  onUnfollow={props.onUnfollow} 
                  onFollow={props.onFollow}
                  followingInProgress={props.followingInProgress}/>)}
          </ul>
    
          <button className='App__findUsers__showMoreButton' onClick={() => { props.showMoreUsers(props.currentPage + 1, props.pageSize) }}>Show more</button>
    
        </section>
      )
}

export default FindUsers;