import './Description.css';
import noPhoto from './../../../../../assets/images/no-photo.jpg';
import AboutMe from './AboutMe/AboutMe';
import uploadPhoto from './../../../../../assets/icons/white/uploadPhoto.png';

function Description(props) {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (   
      <div className='App__profile-info'>
        <div className='App__profile-first-block'>
          <div className='App__profile-photo-block'>
            <img className='App__profile-photo' src={props.profile.photos.large || noPhoto} alt="#" />
            <input id='input-changePhoto' className='input-changePhoto' type='file' onChange={onMainPhotoSelected}/>
            { props.isOwner && <label htmlFor='input-changePhoto'><img className='App__profile-photo-change' src={uploadPhoto} alt="" /></label> }
          </div>
        </div>
        <AboutMe isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      </div>
  )}

export default Description;