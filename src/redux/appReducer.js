import { isAuthThunkCreator } from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';


let initialState = {
  initialized: false,
}

export const setInitialized = () => {
  return {
    type: SET_INITIALIZED,
  }
}

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(isAuthThunkCreator())
  promise.then( () => {
    dispatch(setInitialized())
  })
}

const appReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_INITIALIZED: {
      let stateCopy = { ...state, 
                        initialized: true,
                      }
      return stateCopy;
    }

    default: 
      return state;
    }
}



export default appReducer;