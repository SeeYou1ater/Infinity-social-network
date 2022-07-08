import React from 'react';
import { NavLink } from 'react-router-dom';
import './DialogItem.css';



const DialogItem = (props) => {
  let path = "/messages/" + props.id
  return (
    <div className="dialog">
      <NavLink to={path} className="dialog__link">{props.name}</NavLink>
    </div>
  )
}

export default DialogItem;