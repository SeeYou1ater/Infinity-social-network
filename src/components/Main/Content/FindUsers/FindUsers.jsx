import React from 'react';
import './FindUsers.css';
import User from './User';


function FindUsers(props) {
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