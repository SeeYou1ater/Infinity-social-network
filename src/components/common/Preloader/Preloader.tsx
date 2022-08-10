import React from 'react';
import preloader from './../../../assets/images/infinity-progress.svg';
import './Preloader.css'


const Preloader: React.FC<{}> = () => {
  return (
    <div className='progress-wrapper'><img alt='#' src={preloader}/></div>
  )
}

export default Preloader;