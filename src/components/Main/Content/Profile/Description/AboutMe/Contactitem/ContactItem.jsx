import React from "react";
import './ContactItem.css';


function ContactItem (props) {
  return (
    <p>{props.contactTitle}: {props.contactValue}</p>
  )
} 

export default ContactItem;