import React from 'react';
import './Message.css';

const Message: React.FC<{message: string}> = (props) => {
  return (
    <div className="message">{props.message}</div>
  )
}

export default Message;