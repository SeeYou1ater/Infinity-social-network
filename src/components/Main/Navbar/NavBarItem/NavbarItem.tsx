import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarItem.css';

type PropsType = {
  icon: any
  path: string
  item: string
}

const NavBarItem: React.FC<PropsType> = (props) => {
  return (
    <li>
      <NavLink to={props.path} className='item'>
        <img className='item-image' src={props.icon} alt="" />{props.item}
      </NavLink>
    </li>
  )
} 


export default NavBarItem;