import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { reduxForm } from 'redux-form';
import { MaxLengthCreator } from '../../../../../utilities/validators/validators';
import { FormControl } from '../../../../common/FormControls/FormControls';
import './MyPosts.css';
import Post from './Post/Post';
import addPost from './../../../../../assets/icons/white/addPost.png';
import { PostType } from '../../../../../types/types';
import { FormPostDataType } from '../ProfileContainer';


type MyPostsFormValues = {
  isOwner: boolean
  dataPosts: Array<PostType>
  addNewPost: (formData: FormPostDataType) => void
}

const MyPosts:React.FC<MyPostsFormValues> = (props) => {

  const postsItems = props.dataPosts.map((post) => <Post key={post.id} message={post.postText} likes = {post.likes}/>)

  return (
    <div className='App__posts-info'>
      <div className='App__posts-form'>
        <h3 className='App__posts-title'><b>My posts</b></h3>    
        { props.isOwner && <NewPostReduxForm onSubmit={props.addNewPost}/>} 
      </div>
      <div className='App__post-items'>
        {postsItems}
      </div>
    </div> 
  )
}

const maxLength10 = MaxLengthCreator(10)

type NewPostFormOwnPropsType = {}

const NewPostForm: React.FC<InjectedFormProps<FormPostDataType, NewPostFormOwnPropsType> & NewPostFormOwnPropsType> = (props) => {
    return (
      <form className='App__posts-addPost-form' onSubmit={props.handleSubmit}>
        <Field className='App__posts-addPost-textarea' validate={maxLength10} placeholder={'Write post message here...'} component={FormControl} formType={'textarea'} type={"text"} name={'postText'}/>
        <button className='App__posts-addPost-button'><img src={addPost} alt=""/></button>
      </form>
    )
}

const NewPostReduxForm = reduxForm<FormPostDataType, NewPostFormOwnPropsType>({
  form: 'addPost'
})(NewPostForm)

export default MyPosts;



