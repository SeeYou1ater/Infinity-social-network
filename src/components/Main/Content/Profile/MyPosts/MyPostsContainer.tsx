import React from 'react';
import { PostType } from '../../../../../types/types';
import { FormPostDataType } from '../ProfileContainer';
import MyPosts from './MyPosts';

type MyPostsContainerPropsType = {
  isOwner: boolean
  dataProfile: any
  addNewPost: (formData: FormPostDataType) => void
  dataPosts: Array<PostType>
}

const MyPostsContainer: React.FC<MyPostsContainerPropsType> = (props) => {
    return (
      <>
        <MyPosts  isOwner={props.isOwner}
                  dataPosts={props.dataPosts} 
                  addNewPost={props.addNewPost}/>
      </>
    )
  }



export default MyPostsContainer

 