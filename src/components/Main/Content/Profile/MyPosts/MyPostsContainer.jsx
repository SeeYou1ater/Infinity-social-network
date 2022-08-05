import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/profileReducer';
import MyPosts from './MyPosts';

class MyPostsContainer extends React.Component {
  render() {
    return (
      <>
        <MyPosts  isOwner={this.props.isOwner}
                  posts={this.props.posts} 
                  addPost={this.props.addPost}/>
      </>
    )
  }
}

  let mapStateToProps = (state) => {
    return {
      posts: state.dataProfile.dataPosts
    }
  }
  
  let mapDispatchToProps = (dispatch) => {
    return {
      addPost: (newPost) => {
        dispatch(actions.newPostActionCreator(newPost))
      }
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(MyPostsContainer);

 