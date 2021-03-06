import React from 'react';
import './Reset.css';
import './App.css';
import Main from './components/Main/Main';
import HeaderContainer from './components/Header/HeaderContainer';
import { withRouter } from './hoc/withRouter';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/appReducer';
import { HashRouter, Route, Routes } from 'react-router-dom';
import store from './redux/redux-store';
import Footer from './components/Footer/Footer';
import GuestPage from './components/common/GuestPage/GuestPage';
import ContainerLogin from './components/common/Login/ContainerLogin';

class App extends React.Component {

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
                <Route path="/*" element={<Main state={this.props.state}/>}/>
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

const mapStateToProps = (state) => ({
  initializedApp: state.app.initialized,
  isAuth: state.auth.isAuth
})

const mapDispatchToProps = (dispatch) => ({
  initializeApp: () => {
    dispatch(initializeApp())
  },
})


let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(App);

const SocialApp = (props) => {
    return  <HashRouter>
              <Provider store={store}>
                <div className='App__wrapper'>
                  <AppContainer state={store.getState()}/>
                </div>
              </Provider>
            </HashRouter>
}

export default SocialApp


