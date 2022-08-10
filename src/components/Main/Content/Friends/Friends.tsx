import React from 'react';
import './Friends.css';


const Friends: React.FC<{}> = () => {
  return (
    <section className='App__friends'>
        <ul className='App__friends-list'>
          <li className='App__friends-item'>
            <div className='App_friends-fullname'>Sergey K.</div>
            <div className='App_friends-location'>
              <div className='App__friends-country'>Russia</div>
              <div className='App__friends-city'>Moscow</div>
            </div>
          </li>
          <li className='App__friends-item'>
            <div className='App_friends-fullname'>Rostislav P.</div>
            <div className='App_friends-location'>
              <div className='App__friends-country'>Russia</div>
              <div className='App__friends-city'>Voronezh</div>
            </div>
          </li>
          <li className='App__friends-item'>
            <div className='App_friends-fullname'>Igor V.</div>
            <div className='App_friends-location'>
              <div className='App__friends-country'>Russia</div>
              <div className='App__friends-city'>Moscow</div>
            </div>
          </li>
          <li className='App__friends-item'>
            <div className='App_friends-fullname'>Vladuslav U.</div>
            <div className='App_friends-location'>
              <div className='App__friends-country'>Russia</div>
              <div className='App__friends-city'>Moscow</div>
            </div>
          </li>
          <li className='App__friends-item'>
            <div className='App_friends-fullname'>Pavel P.</div>
            <div className='App_friends-location'>
              <div className='App__friends-country'>Russia</div>
              <div className='App__friends-city'>Voronezh</div>
            </div>
          </li>
        </ul>
        <button className='Api__friends-button'>Show more</button>
    </section>    
  )}

export default Friends;