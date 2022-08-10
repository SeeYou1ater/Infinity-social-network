import React from 'react';
import './Reset.css';
import './App.css';
import Main from './components/Main/Main';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect, Provider } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/appReducer';
import { HashRouter, Route, Routes } from 'react-router-dom';
import store, { AppStateType } from './redux/redux-store';
import Footer from './components/Footer/Footer';
import GuestPage from './components/common/GuestPage/GuestPage';
import ContainerLogin from './components/common/Login/ContainerLogin';


type MapStateType = {
  isAuth: boolean
  initializedApp: boolean
}

type DispatchPropsType = {
  initializeApp: () => void
}

class SocialApp extends React.Component<MapStateType & DispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp()
  }

  render () {
    if (!this.props.initializedApp) { 
      return <Preloader/>
    } else return (
      <>
          <HeaderContainer/>
          <div className='main__wrapper'>
            <Routes>            
                <Route path="/*" element={<Main/>}/>
                <Route path="/guestpage" element={<GuestPage/>}/>
                <Route path="/login" element={<ContainerLogin/>}/>  
            </Routes>
            </div>
          <Footer/>
      </>
    )
  }
}
///////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state: AppStateType) => ({
  initializedApp: state.app.initialized,
  isAuth: state.auth.isAuth
})

const mapDispatchToProps = (dispatch: any) => ({
  initializeApp: () => {
    dispatch(initializeApp())
  },
})


let AppContainer = connect(mapStateToProps, mapDispatchToProps)(SocialApp);


const App: React.FC<{}> = () => {
    return  (<HashRouter>
              <Provider store={store}>
                <div className='App__wrapper'>
                  <AppContainer/>
                </div>
              </Provider>
            </HashRouter>)
}

export default App


