const ADD_MESSAGE = 'ADD-MESSAGE';


let initialState = {
  dataDialogs: [
    {name: 'Ekaterina', id: '1'}, 
    {name: 'Rostislav', id: '2'}, 
    {name: 'Igor', id: '3'}, 
    {name: 'Vladislav', id: '4'}, 
    {name: 'Pasha', id: '5'}
  ],
  dataMessages: [
    {message: 'Hi!'}, 
    {message: 'Hello!'}, 
    {message: 'How Are you?'}, 
    {message: 'I,m fine!'}
  ]
}

export let sendMessageActionCreator = (newMessage) => {
  return {
    type: ADD_MESSAGE,
    newMessage: newMessage
  }
}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {

    case ADD_MESSAGE: {
      let newMessage = {
        message: action.newMessage,
        likes: 0
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