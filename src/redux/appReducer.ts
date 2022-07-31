import { isAuthThunkCreator } from "./authReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialStateType = {
  initialized: boolean
}

let initialState: initialStateType = {
  initialized: false,
}

type setInitializedActionType = {
  type: typeof SET_INITIALIZED
}

export const setInitialized = (): setInitializedActionType => {
  return {
    type: SET_INITIALIZED,
  }
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(isAuthThunkCreator())
  promise.then( () => {
    dispatch(setInitialized())
  })
}

const appReducer = (state = initialState, action: any): initialStateType => {

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