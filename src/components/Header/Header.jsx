import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.png';
import './Header.css';

function Header (props) {
  
  return (
      <header className='App__header'>
        <div className="header__container container">
          <div className='header__logoup'>
            <img className='logo' src={logo} alt="#" />
            <h1>INFINITY</h1>
          </div>
          <div className='login-block'>
             { props.isAuth 
              ? <div className='login-items'>
                  <div>{props.login}</div>
                  <button onClick={props.logout}>Logout</button>
                </div>  
              : <NavLink to={'/login'}>Login</NavLink> }
          </div>
        </div>
      </header>
  )}

export default Header;