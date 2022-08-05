import { InferActionsTypes } from './redux-store';

type dialogType = {
  name: string
  id: number
}

type messageType = {
  message: string
  id: number
}

let initialState = {
  dataDialogs: [
    {name: 'Ekaterina', id: 0}, 
    {name: 'Rostislav', id: 1}, 
    {name: 'Igor', id: 2}, 
    {name: 'Vladislav', id: 3}, 
    {name: 'Pasha', id: 4}
  ] as Array<dialogType>,
  dataMessages: [
    {message: 'Hi!', id: 0}, 
    {message: 'Hello!', id: 1}, 
    {message: 'How Are you?', id: 2}, 
    {message: 'I,m fine!', id: 3}
  ] as Array<messageType>
}

type InitialStateType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
  sendMessageActionCreator: (newMessage: string) => {
    return {
      type: 'ADD_MESSAGE',
      newMessage: newMessage
    } as const 
  }
}



const dialogsReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

  switch (action.type) {

    case 'ADD_MESSAGE': {
      let newMessage = {
        message: action.newMessage,
        id: 6
      }
      let stateCopy = {...state}
      stateCopy.dataMessages = [...state.dataMessages]
      stateCopy.dataMessages.push(newMessage)
      return stateCopy;
    }

    default: 
      return state;
    }
}



export default dialogsReducer;