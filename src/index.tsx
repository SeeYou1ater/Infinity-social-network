import React from 'react';
import ReactDOM from 'react-dom/client';
import SocialApp from './App';
import store from './redux/redux-store';


const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render (
              <SocialApp/>     
)

