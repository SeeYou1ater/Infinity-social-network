import React from 'react';
import './Post.css';
import postLike from './../../../../../../assets/icons/white/heartNotLike.png';

type PropsType = {
  message: string
  likes: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div> 
      <div className='App__profile-postItem'>{props.message}</div>
      <div className='App__profile-likesItem'><img src={postLike} alt="" />{props.likes}</div>
    </div> 
  )}

export default Post;