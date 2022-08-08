import React from 'react';
import Content from './Content/Content';
import Navbar from './Navbar/Navbar';
import './Main.css';

const Main: React.FC = () => {
  return (
      <div className='main container'>
        <Navbar/>
        <Content/>
      </div>
  )}

export default Main;