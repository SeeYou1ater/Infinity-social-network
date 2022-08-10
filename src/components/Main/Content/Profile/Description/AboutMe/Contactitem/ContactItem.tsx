import React from "react";
import './ContactItem.css';

type PropsType = {
  contactTitle: string
  contactValue: string | undefined
}

const ContactItem: React.FC<PropsType> = (props) => {
  return (
    <div className="App__contacts-list-item">
      <p className="App__contacts-item">{props.contactTitle}:</p><p className="App__contacts-value">{props.contactValue}</p>
    </div>
  )
} 

export default ContactItem;