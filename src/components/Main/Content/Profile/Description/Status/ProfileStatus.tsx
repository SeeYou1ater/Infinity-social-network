import React, { ChangeEvent, useEffect, useState } from "react";
import './ProfileStatus.css';
import statusChange from './../../../../../../assets/icons/white/changeStatus.png';


export type PropsType = {
  status: string 
  isOwner: boolean
  updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect( () => { 
    setStatus(props.status); 
  }, [props.status])

  const activateEditMode = ():void => {
    setEditMode(true)
  }

  const deactivateEditMode = ():void => {
    setEditMode(false)
    props.updateStatus(status) 
  }

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div className='App__status-wrapper'>
      {!editMode ?
      <div className='App__profileStatus'>
        { props.isOwner ? <span onDoubleClick={ activateEditMode }>{ props.status || 'No status' }</span> :
        <span>{ props.status || 'No status' }</span> }
        { props.isOwner && <button className="App__profileStatus-changeButton" onClick={ activateEditMode }><img src={statusChange} alt='#'/></button> }
      </div> :
      <div className='App__status-input-block'>
        <input className='App__status-input' onChange={ onStatusChange } autoFocus={true} onBlur={ deactivateEditMode } value={ status }/> 
      </div>}
    </div>
  )
}


export default ProfileStatus;