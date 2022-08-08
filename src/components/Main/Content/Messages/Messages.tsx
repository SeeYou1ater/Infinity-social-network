import React from 'react';
import './Messages.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { FormControl } from '../../../common/FormControls/FormControls';
import { MaxLengthCreator, requiredField } from '../../../../utilities/validators/validators';
import { DialogType, MessageType } from '../../../../redux/dialogsReducer';
import { FormMessageDataType } from './MessagesContainer';


type MessageOwnPropsType = {
  dataMessages: Array<MessageType>
  dataDialogs: Array<DialogType>
  onSubmit: (formData: FormMessageDataType) => void
}

function Messages(props: MessageOwnPropsType) {
  
  const dialogElements = props.dataDialogs
                        .map((user) => <DialogItem key={user.id} name={user.name} id={user.id}/>)

  const messageElements = props.dataMessages
                        .map((message) => <Message key={message.id} message={message.message}/>)
  
  
  return (
    <section className='App__messages messages'>
      <div className="dialogs">
        {dialogElements}
      </div>
      <div className="dialog">
        <div className='dialog__window'>
          {messageElements}
        </div>
        <AddMessageReduxForm onSubmit={props.onSubmit}/>
      </div>
    </section>
  )}
  
  let maxLength100 = MaxLengthCreator(100);

  type AddMessageFormOwnPropsType = {
    
  }

  class AddMessageForm extends React.Component<InjectedFormProps<FormMessageDataType, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType> {
    render(){
      return (
        <form onSubmit={this.props.handleSubmit} className='dialog__sendMessage'>
          <Field validate={[requiredField, maxLength100]} component={FormControl} formType='textarea' name='message' type='text' placeholder='Enter your message...'></Field>
          <button>Send</button>
        </form>
    )}
  }

  const AddMessageReduxForm = reduxForm<FormMessageDataType, AddMessageFormOwnPropsType>({
    form: 'addMessage'
  })(AddMessageForm)

export default Messages;