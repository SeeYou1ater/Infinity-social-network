import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux"
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer} from 'redux-form'
import appReducer from "./appReducer"

let rootReducer = combineReducers({
  dataProfile: profileReducer,
  dataMessages: dialogsReducer,
  dataFindUsers: usersReducer,
  app: appReducer,
  auth: authReducer,
  form: formReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//@ts-ignore
window.store = store

export default store