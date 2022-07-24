import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.png';
import './Header.css';
import Applogout from './../../assets/icons/white/appLogout.png'

function Header (props) {
  
  return (
      <header className='App__header'>
        <div className="header__container container">
            <NavLink className='header__logoup' to={'/'}>
              <img className='logo' src={logo} alt="#" />
              <h1>INFINITY</h1>
            </NavLink> 
          <div className='login-block'>
             { props.isAuth 
              ? <div className='login-items'>
                  <div>{props.login}</div>
                  <img className='App__button-logout' src={Applogout} onClick={props.logout} alt="" />
                </div>  
              : <NavLink className='App__button-login green-button' to={'/login'}>Login</NavLink> }
          </div>
        </div>
      </header>
  )}

export default Header;