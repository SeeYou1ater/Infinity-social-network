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

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//@ts-ignore
window.store = store

export default store