import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { MaxLengthCreator, requiredField } from '../../../../../utilities/validators/validators';
import { FormControl } from '../../../../common/FormControls/FormControls';
import './MyPosts.css';
import Post from './Post/Post';

function MyPosts(props) {

  const postsItems = props.posts.map((post) => <Post message={post.message} likes = {post.likes}/>)

  let addPost = (dataFormMessage) => {
    props.addPost(dataFormMessage.post)
  }

  return (
    <div>
      <div className='posts'>
        My posts
        <NewPostReduxForm onSubmit={addPost}/>
      </div>
      {postsItems}
    </div> 
  )}

  const maxLength10 = MaxLengthCreator(10)

  class NewPostForm extends React.Component {
    render() {
      return (
        <form onSubmit={this.props.handleSubmit}>
          <Field validate={[requiredField, maxLength10]} placeholder={'Enter!'} component={FormControl} formType={'textarea'} type={"text"} name={'post'}/>
          <button>Add post</button>
        </form>
      )
    }
  }

  const NewPostReduxForm = reduxForm({
    form: 'addPost'
  })(NewPostForm)

export default MyPosts;