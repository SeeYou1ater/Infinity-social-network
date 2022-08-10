import React, { Suspense } from 'react';
import './Content.css';
import { Route, Routes } from 'react-router-dom';
import FindUsersContainer from './FindUsers/FindUsersContainer';
import FriendsContainer from './Friends/FriendsContainer';
import Preloader from '../../common/Preloader/Preloader';
import ProfileSettingsContainer from './Settings/ProfileSettingsContainer';

const MessagesContainer = React.lazy(() => import('./Messages/MessagesContainer'));
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));

function Content() {
  return (
    <section className='App__content'>
      <Suspense fallback={<Preloader/>}>
        <Routes>
          <Route  path="/profile/:profileId" 
                  element={<ProfileContainer/>}/>                  
          <Route path="/messages/*" element={<MessagesContainer/>}/>
          <Route path="/friends/*" element={<FriendsContainer/>}/>
          <Route path="/findUsers/*" element={<FindUsersContainer pageTitle='Find users'/>}/>
          <Route path="/profile-settings/" element={<ProfileSettingsContainer/>}/>
        </Routes>
      </Suspense>  
    </section>    
  )}

export default Content;