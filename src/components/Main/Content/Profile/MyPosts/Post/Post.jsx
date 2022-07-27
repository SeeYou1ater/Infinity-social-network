import React from 'react';
import './Post.css';
import postLike from './../../../../../../assets/icons/white/heartNotLike.png';

function Post(props) {
  return (
    <div> 
      <div className='App__profile-postItem'>{props.message}</div>
      <div className='App__profile-likesItem'><img src={postLike} alt="" />{props.likes}</div>
    </div> 
  )}

export default Post;