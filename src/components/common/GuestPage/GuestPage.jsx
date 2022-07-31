import React from 'react';
import './GuestPage.css'
import ContainerLogin from '../Login/ContainerLogin';

class GuestPage extends React.Component {
  render() { 
    return (
      <div className='App__guestpage container'>
        <div className='App__guestpage-content'>Here, will be content for guest</div>
        <ContainerLogin/>
      </div>
  )}
}

export default GuestPage;