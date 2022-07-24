import React from 'react';
import { NavLink } from 'react-router-dom';
import './User.css';
import noPhoto from './../../../../assets/images/no-photo.jpg';

function User(props) {
    let user = props.user
    return (
          <li key={user.id} className='App__friends-item'>
            <div className='App__friends-itemPreview'>
              <NavLink to={'/profile/' + user.id}><div className='App__friends-itemPhoto'><img className='App__users-photo' src={ noPhoto || user.photos.small} alt="#" /></div>
              </NavLink>
              {user.followed? <button  onClick={() => {
                              props.onUnfollow(user.id)       
                            }} className='App__button-UnFollow' disabled = {props.followingInProgress.some(id => id === user.id)}>UnFollow</button> 
                            : <button onClick={() => {
                              props.onFollow(user.id)
                              }} className='App__button-Follow' disabled = {props.followingInProgress.some(id => id === user.id)}>Follow</button>}
            </div>
            <div className='App__friends-info'>
              <div className='App_friends-fullname'>{user.name}</div>
              <div className='App_friends-status'>{user.status}</div>
              <div className='App_friends-location'>
                <div className='App__friends-country'>{'Here will be country'}</div>
                <div className='App__friends-city'>{'Here will be city'}</div>
              </div>
            </div>
          </li>
      )
}

export default User;