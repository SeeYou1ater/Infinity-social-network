import './Description.css';
import noPhoto from './../../../../../assets/images/no-photo.jpg';
import ProfileStatusWithHooks from './Status/StatusWithHooks';
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
        { props.isOwner && <input type='file' onChange={onMainPhotoSelected} /> }
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        <AboutMe isOwner={props.isOwner} profile={props.profile}/>
      </>
  )}

export default Description;