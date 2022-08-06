import { InferActionsTypes, CommonThunkActionType } from './redux-store';
import { isAuthThunkCreator } from "./authReducer";

let initialState = {
  initialized: false,
}

type InitialStateType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

type ThunkType = CommonThunkActionType<ActionTypes>

export const initializeApp = (): ThunkType => { 
  return async (dispatch) => {
    await dispatch(isAuthThunkCreator())
          dispatch(actions.setInitialized())
  }
}

const actions = {
  setInitialized: () => {
    return {
      type: 'SET_INITIALIZED',
    } as const
  }
}

const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

  switch (action.type) {

    case 'SET_INITIALIZED': {
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