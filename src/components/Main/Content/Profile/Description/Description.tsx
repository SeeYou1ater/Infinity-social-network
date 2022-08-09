import './Description.css';
import noPhoto from './../../../../../assets/images/no-photo.jpg';
import AboutMe from './AboutMe/AboutMe';
import uploadPhoto from './../../../../../assets/icons/white/uploadPhoto.png';
import { ChangeEvent } from 'react';
import { DataProfileType } from '../../../../../redux/profileReducer';


type DescriptionPropsType = {
  isOwner: boolean
  savePhoto: (filePhoto: any) => void
  dataProfile: DataProfileType
  status: string
  updateStatus: (status: string) => void
}

const Description: React.FC<DescriptionPropsType> = (props) => {

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (   
      <div className='App__profile-info'>
        <div className='App__profile-first-block'>
          <div className='App__profile-photo-block'>
            <img className='App__profile-photo' src={props.dataProfile.profile?.photos.large || noPhoto} alt="#" />
            <input id='input-changePhoto' className='input-changePhoto' type='file' onChange={onMainPhotoSelected}/>
            { props.isOwner && <label htmlFor='input-changePhoto'><img className='App__profile-photo-change' src={uploadPhoto} alt="" /></label> }
          </div>
        </div>
        <AboutMe isOwner={props.isOwner} profile={props.dataProfile.profile} status={props.status} updateStatus={props.updateStatus}/>
      </div>
  )}

export default Description