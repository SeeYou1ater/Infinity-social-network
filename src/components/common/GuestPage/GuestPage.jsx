import React from 'react';
import HeaderContainer from '../../Header/HeaderContainer';
import Footer from './../../Footer/Footer';
import ContainerLogin from '../Login/ContainerLogin';

class GuestPage extends React.Component {
  render() { 
    return (
        <>
          <HeaderContainer/>
          <p>Class</p>
          <ContainerLogin/>
          <Footer/>
        </>
  )}
}

export default GuestPage;