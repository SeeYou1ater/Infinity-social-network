import React from 'react';
import './Post.css';

function Post(props) {
  return (
    <div> 
      <div className='post'>{props.message}</div>
      <div className='likes'>Likes {props.likes}</div>
    </div> 
  )}

export default Post;