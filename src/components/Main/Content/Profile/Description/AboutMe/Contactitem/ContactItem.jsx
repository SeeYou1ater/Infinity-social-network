import React from "react";
import './ContactItem.css';


function ContactItem (props) {
  return (
    <div className="App__contacts-list-item">
      <p className="App__contacts-item">{props.contactTitle}:</p><p className="App__contacts-value">{props.contactValue}</p>
    </div>
  )
} 

export default ContactItem;