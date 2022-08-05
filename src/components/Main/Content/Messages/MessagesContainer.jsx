import { connect } from 'react-redux';
import { actions } from '../../../../redux/dialogsReducer';
import Messages from './Messages';
import React from 'react';
import { ConnectedWithAuthRedirect } from '../../../../hoc/connectedWithAuthRedirect';
import { compose } from 'redux';


class MessagesContainer extends React.Component {

  render() {
    return <Messages  dataMessages={this.props.dataMessages}
                      sendMessage={this.props.sendMessage}
                      isAuth={this.props.isAuth}/>
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

let mapStateToProps = (state) => {
  return {
    dataMessages: state.dataMessages,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessage) => {
      dispatch(actions.sendMessageActionCreator(newMessage))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ConnectedWithAuthRedirect)
  (MessagesContainer)


 