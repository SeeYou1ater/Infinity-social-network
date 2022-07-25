import './Description.css';
import noPhoto from './../../../../../assets/images/no-photo.jpg';
import AboutMe from './AboutMe/AboutMe';

function Description(props) {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (   
      <>
        <img className='photo' src={props.profile.photos.large || noPhoto} alt="#" />
        {props.isOwner && <input className='input-changePhoto' type='file' onChange={onMainPhotoSelected}/>}
        <AboutMe isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      </>
  )}

export default Description;