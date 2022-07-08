import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

let store = {
  _state: {
    dataProfile: {
      dataPosts: [
        { message: "Hello World!", likes: '3' }, { message: "Working...", likes: '7' }, { message: "Learning...", likes: '5' }
      ],
      newPostText: 'Yo!'
    },
    dataMessages: {
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
      ],
      newMessageText: 'Common!'
    },
  },
  _rerenderTree: '',
  getState(){
    return this._state
  },
  ////////////////////////////////////////////////////////////
  subscribe(observer){
  this._rerenderTree = observer;
  },
  ////////////////////////////////////////////////////////////
  dispatch(action){
    this._state.dataProfile = profileReducer(this._state.dataProfile, action);
    this._state.dataMessages = dialogsReducer(this._state.dataMessages, action);

    this._rerenderTree(this._state)
  }
}

window.store = store;
export default store;
