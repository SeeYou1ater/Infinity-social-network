import React from 'react';
import Content from './Content/Content';
import Navbar from './Navbar/Navbar';
import './Main.css';

function Main (props) {
  return (
      <div className='main container'>
        <Navbar/>
        <Content  state = {props.state}/>
      </div>
  )}

export default Main;