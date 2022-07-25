import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { MaxLengthCreator } from '../../../../../utilities/validators/validators';
import { FormControl } from '../../../../common/FormControls/FormControls';
import './MyPosts.css';
import Post from './Post/Post';

function MyPosts(props) {

  const postsItems = props.posts.map((post) => <Post key={post.id} message={post.message} likes = {post.likes}/>)

  let addPost = (dataFormMessage) => {
    props.addPost(dataFormMessage.post)
  }

  return (
    <div className='App__posts-info'>
      <div className='App__posts-form'>
        <h3>My posts</h3>    
        <NewPostReduxForm onSubmit={addPost}/>
      </div>
      <div className='App__post-items'>
        {postsItems}
      </div>
    </div> 
  )}

  const maxLength10 = MaxLengthCreator(10)

  class NewPostForm extends React.Component {
    render() {
      return (
        <form onSubmit={this.props.handleSubmit}>
          <Field validate={maxLength10} placeholder={'Enter!'} component={FormControl} formType={'textarea'} type={"text"} name={'post'}/>
          <button>Add post</button>
        </form>
      )
    }
  }

  const NewPostReduxForm = reduxForm({
    form: 'addPost'
  })(NewPostForm)

export default MyPosts;