import React, { Suspense } from 'react';
import './Content.css';
// import MessagesContainer from './Messages/MessagesContainer';
import { Route, Routes } from 'react-router-dom';
import FindUsersContainer from './FindUsers/FindUsersContainer';
// import ProfileContainer from './Profile/ProfileContainer';
import FriendsContainer from './Friends/FriendsContainer';
import Preloader from '../../common/Preloader/Preloader';
import ProfileSettingsContainer from './Settings/ProfileSettingsContainer';

const MessagesContainer = React.lazy(() => import('./Messages/MessagesContainer'));
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));

function Content(props) {
  return (
    <section className='App__content'>
      <Suspense fallback={<Preloader/>}>
        <Routes>
          <Route  path="/profile/:profileId" 
                  element={<ProfileContainer  dataProfile = {props.state.dataProfile}/>}/>                  
          <Route path="/messages/*" element={<MessagesContainer   dataMessages = {props.state.dataMessages}/>}/>
          <Route path="/friends/*" element={<FriendsContainer/>}/>
          <Route path="/findUsers/*" element={<FindUsersContainer/>}/>
          <Route path="/profile=settings/" element={<ProfileSettingsContainer/>}/>
        </Routes>
      </Suspense>  
    </section>    
  )}

export default Content;