import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarItem.css';

const NavBarItem = (props) => {
  return (
    <li>
      <NavLink to={props.path} className='item'>
        <img className='item-image' src={props.icon} alt="" />{props.item}
      </NavLink>
    </li>
  )
} 


export default NavBarItem;