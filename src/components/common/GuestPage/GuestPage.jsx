import React from 'react';
import './GuestPage.css'
import HeaderContainer from '../../Header/HeaderContainer';
import Footer from './../../Footer/Footer';
import ContainerLogin from '../Login/ContainerLogin';

class GuestPage extends React.Component {
  render() { 
    return (
        <>
          <HeaderContainer/>
            <div className='main__wrapper'>
              <div className='App__guestpage container'>
                <div></div>
                <ContainerLogin/>
              </div>
            </div>
          <Footer/>
        </>
  )}
}

export default GuestPage;