import React from 'react';
import { NavLink } from 'react-router-dom';
import './User.css';

function User(props) {
    let user = props.user
    return (
          <li key={user.id} className='App__friends-item'>
            <div className='App__friends-itemPreview'>
              <NavLink to={'/profile/' + user.id}><div className='App__friends-itemPhoto'>Тут будет фото/Перейти на профиль по нажатию на фото</div></NavLink>
              {user.followed? <button onClick={() => {
                              props.onUnfollow(user.id)       
                            }} className='App__buttonUnFollow' disabled = {props.followingInProgress.some(id => id === user.id)}>UnFollow</button> 
                            : <button onClick={() => {
                              props.onFollow(user.id)
                              }} className='App__buttonFollow' disabled = {props.followingInProgress.some(id => id === user.id)}>Follow</button>}
            </div>
            <div className='App__friends-info'>
              <div className='App_friends-fullname'>{user.name}</div>
              <div className='App_friends-follow-value'>Follow Status: {user.followed ? 'followed' : 'unfollowed'}</div>
              <div className='App_friends-status'>{user.status}</div>
              <div className='App_friends-location'>
                <div className='App__friends-country'>{'Тут будет страна'}</div>
                <div className='App__friends-city'>{'А тут будет город'}</div>
              </div>
            </div>
          </li>
      )
}

export default User;