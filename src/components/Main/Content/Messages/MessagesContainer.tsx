import { connect } from 'react-redux'
import { actions, DialogType, MessageType } from '../../../../redux/dialogsReducer'
import Messages from './Messages'
import React from 'react'
import { ConnectedWithAuthRedirect } from '../../../../hoc/connectedWithAuthRedirect'
import { compose } from 'redux'
import { AppStateType } from '../../../../redux/redux-store'

type MapStatePropsType = {
  dataMessages: Array<MessageType>
  dataDialogs: Array<DialogType>
}

type MapDispatchPropsType = {
  sendNewMessage: (message: string) => void
}

export type FormMessageDataType = {
  message: string
}

class MessagesContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

  sendNewMessage = (formData: FormMessageDataType) => {
    this.props.sendNewMessage(formData.message)
  }

  render() {
    return <Messages  dataMessages={this.props.dataMessages}
                      dataDialogs={this.props.dataDialogs}
                      sendNewMessage={this.sendNewMessage}/>
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dataMessages: state.dataMessages.dataMessages,
    dataDialogs: state.dataMessages.dataDialogs
  }
}

let mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    sendNewMessage: (newMessage: string) => {
      dispatch(actions.sendMessageActionCreator(newMessage))
    }
  }
}

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, mapDispatchToProps),
  ConnectedWithAuthRedirect)
  (MessagesContainer)


 